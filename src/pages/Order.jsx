
import React, { useEffect, useState } from "react";
import { Truck, Package, CheckCircle, XCircle, Calendar, ArrowLeft, Clock, MapPin, CreditCard } from "lucide-react";

const Orders = () => {
  const [orders, setOrders] = useState([]);   
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  const stages = ["Pending", "Packed", "Shipped", "Delivered"];
  const returnStages = ["Return Requested", "Return Picked Up", "Return Received", "Refund Processed"];

  const stageIcons = {
    Pending: Calendar,
    Packed: Package,
    Shipped: Truck,
    Delivered: CheckCircle,
    Cancelled: XCircle,
    Returned: XCircle,
    "Return Requested": XCircle,
    "Return Picked Up": Truck,
    "Return Received": Package,
    "Refund Processed": CheckCircle,
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3000);
  };

  // Load orders from localStorage
  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};
    if (!loggedUser.id) {
      setOrders();
      return;
    }

    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const userOrders = allOrders
      .filter((o) => o.userId === loggedUser.id && o.items?.length > 0)
      .map((o) => ({
        ...o,
        id: o.id || `order-${Date.now()}-${Math.random()}`,
        products: o.items.map((p) => ({
          ...p,
          qty: p.qty || p.quantity || 1,
        })),
        date: o.orderDate || o.date || new Date().toLocaleString(),
        status: o.status || "Pending",
        isReturning: o.isReturning || false,
        timestamps: o.timestamps || { Pending: o.orderDate || o.date || new Date().toLocaleString() },
      }))
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    setOrders(userOrders);
  }, []);

  // Auto-progress status every 5 sec (demo purposes)
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders((prevOrders) => {
        const updatedOrders = prevOrders.map((order) => {
          if (["Cancelled", "Refund Processed"].includes(order.status)) return order;

          const currentStages = order.isReturning ? returnStages : stages;
          const currentIndex = currentStages.indexOf(order.status);
          const nextStage = currentStages[currentIndex + 1];
          if (!nextStage) return order;

          return {
            ...order,
            status: nextStage,
            timestamps: {
              ...order.timestamps,
              [nextStage]: new Date().toLocaleString(),
            },
          };
        });

        localStorage.setItem("orders", JSON.stringify(updatedOrders));
        return updatedOrders;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const cancelOrder = (orderId) => {
    const updated = orders.map((order) =>
      order.id === orderId
        ? { 
            ...order, 
            status: "Cancelled", 
            timestamps: { ...order.timestamps, Cancelled: new Date().toLocaleString() } 
          }
        : order
    );
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
    showNotification("Order cancelled successfully", "error");
  };

  const returnOrder = (orderId) => {
    const updated = orders.map((order) =>
      order.id === orderId
        ? {
            ...order,
            status: "Return Requested",
            isReturning: true,
            timestamps: { ...order.timestamps, "Return Requested": new Date().toLocaleString() },
          }
        : order
    );
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
    showNotification("Return request submitted successfully", "success");
  };

  const clearCancelledOrders = () => {
    const updated = orders.filter((o) => o.status !== "Cancelled");
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
    showNotification("Cancelled orders cleared", "success");
  };

  return (
    <div className="min-h-screen mt-10 bg-gray-50">
      {/* Notification Toast */}
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg ${
          notification.type === "success" ? "bg-green-600" : "bg-red-600"
        } text-white font-medium animate-fade-in`}>
          {notification.message}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">📦My Orders</h1>
          <p className="text-gray-600">Track and manage your orders</p>
        </div>

        {/* Actions Bar */}
        <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">{orders.length}</span> total orders
          </div>
          <button 
            onClick={clearCancelledOrders} 
            className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors font-medium border border-red-200"
          >
            Clear Cancelled Orders
          </button>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow-sm border border-gray-200">
            <Package size={64} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg font-medium">No orders found</p>
            <p className="text-gray-400 text-sm mt-2">Your orders will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const isReturning = order.isReturning;
              const currentStages = isReturning ? returnStages : stages;
              const lastIndex = order.status === "Cancelled" ? -1 : currentStages.indexOf(order.status);

              return (
                <div 
                  key={order.id} 
                  className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all overflow-hidden"
                >
                  {/* Order Header */}
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex flex-wrap justify-between items-center gap-4">
                    <div className="flex flex-wrap gap-6 text-sm">
                      <div>
                        <span className="text-gray-500 block mb-1">Order ID</span>
                        <span className="font-semibold text-gray-900">{order.id}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block mb-1">Order Date</span>
                        <span className="font-semibold text-gray-900">
                          {new Date(order.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500 block mb-1">Total Amount</span>
                        <span className="font-semibold text-gray-900">
                          ₹{((order.products[0].price || 0) * (order.products[0].qty || 1)).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : isReturning
                          ? "bg-orange-100 text-orange-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  {/* Order Content */}
                  <div className="p-6">
                    {/* Product Info */}
                    <div className="flex gap-6 mb-6">
                      <div className="relative flex-shrink-0">
                        <img 
                          src={order.products[0].image} 
                          alt={order.products[0].name} 
                          className="w-24 h-24 object-cover rounded-lg border border-gray-200" 
                        />
                        {order.status === "Cancelled" && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                            <XCircle className="text-white" size={32} />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`text-lg font-semibold mb-2 ${
                          order.status === "Cancelled" ? "line-through text-gray-400" : "text-gray-900"
                        }`}>
                          {order.products[0].name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-1">Quantity: {order.products[0].qty || 1}</p>
                        <p className="text-lg font-bold text-gray-900">
                          ₹{((order.products[0].price || 0) * (order.products[0].qty || 1)).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Progress Timeline - Only for non-cancelled orders */}
                    {order.status !== "Cancelled" && (
                      <div className="bg-gray-50 rounded-lg p-6 mb-4">
                        <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-4">
                          {isReturning ? "Return Progress" : "Order Progress"}
                        </h4>
                        <div className="relative">
                          {/* Desktop Timeline */}
                          <div className="hidden md:flex justify-between items-start">
                            {currentStages.map((stage, idx) => {
                              const Icon = stageIcons[stage];
                              const completed = idx <= lastIndex;
                              const isLast = idx === currentStages.length - 1;

                              return (
                                <React.Fragment key={stage}>
                                  <div className="flex flex-col items-center flex-1">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all mb-2 ${
                                      completed 
                                        ? isReturning 
                                          ? "bg-orange-600 text-white" 
                                          : "bg-blue-600 text-white"
                                        : "bg-white border-2 border-gray-300 text-gray-400"
                                    }`}>
                                      <Icon size={20} />
                                    </div>
                                    <span className={`text-xs font-medium text-center ${
                                      completed ? "text-gray-900" : "text-gray-500"
                                    }`}>
                                      {stage}
                                    </span>
                                    {order.timestamps[stage] && (
                                      <span className="text-xs text-gray-400 mt-1 text-center">
                                        {new Date(order.timestamps[stage]).toLocaleDateString('en-US', {
                                          month: 'short',
                                          day: 'numeric'
                                        })}
                                      </span>
                                    )}
                                  </div>
                                  {!isLast && (
                                    <div className={`flex-1 h-0.5 mt-5 mx-2 ${
                                      idx < lastIndex
                                        ? isReturning ? "bg-orange-600" : "bg-blue-600"
                                        : "bg-gray-300"
                                    }`} />
                                  )}
                                </React.Fragment>
                              );
                            })}
                          </div>

                          {/* Mobile Timeline */}
                          <div className="md:hidden space-y-4">
                            {currentStages.map((stage, idx) => {
                              const Icon = stageIcons[stage];
                              const completed = idx <= lastIndex;

                              return (
                                <div key={stage} className="flex items-start gap-4">
                                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                                    completed 
                                      ? isReturning 
                                        ? "bg-orange-600 text-white" 
                                        : "bg-blue-600 text-white"
                                      : "bg-white border-2 border-gray-300 text-gray-400"
                                  }`}>
                                    <Icon size={20} />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className={`text-sm font-medium ${
                                      completed ? "text-gray-900" : "text-gray-500"
                                    }`}>
                                      {stage}
                                    </p>
                                    {order.timestamps[stage] && (
                                      <p className="text-xs text-gray-400 mt-1">
                                        {new Date(order.timestamps[stage]).toLocaleString('en-US', {
                                          month: 'short',
                                          day: 'numeric',
                                          hour: '2-digit',
                                          minute: '2-digit'
                                        })}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3">
                      <button
                        className="flex-1 min-w-[200px] bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowModal(true);
                        }}
                      >
                        View Details
                      </button>

                      {order.status !== "Delivered" && order.status !== "Cancelled" && !isReturning && (
                        <button 
                          className="flex-1 min-w-[200px] border border-red-300 text-red-600 px-6 py-3 rounded-lg hover:bg-red-50 transition-colors font-medium" 
                          onClick={() => cancelOrder(order.id)}
                        >
                          Cancel Order
                        </button>
                      )}

                      {order.status === "Delivered" && !isReturning && (
                        <button 
                          className="flex-1 min-w-[200px] border border-orange-300 text-orange-600 px-6 py-3 rounded-lg hover:bg-orange-50 transition-colors font-medium" 
                          onClick={() => returnOrder(order.id)}
                        >
                          Return Order
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-3xl shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Order Details</h2>
                <p className="text-sm text-gray-600 mt-1">{selectedOrder.id}</p>
              </div>
              <button 
                className="text-gray-400 hover:text-gray-600 transition-colors" 
                onClick={() => setShowModal(false)}
              >
                <XCircle size={28} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Status */}
              <div className="mb-6">
                <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                  selectedOrder.status === "Delivered"
                    ? "bg-green-100 text-green-700"
                    : selectedOrder.status === "Cancelled"
                    ? "bg-red-100 text-red-700"
                    : selectedOrder.isReturning
                    ? "bg-orange-100 text-orange-700"
                    : "bg-blue-100 text-blue-700"
                }`}>
                  {selectedOrder.status}
                </span>
              </div>

              {/* Products */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">Order Items</h3>
                <div className="space-y-3">
                  {selectedOrder.products.map((prod, i) => (
                    <div key={i} className="flex gap-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                      <img 
                        src={prod.image} 
                        alt={prod.name} 
                        className="w-20 h-20 object-cover rounded border border-gray-200" 
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 mb-1">{prod.name}</p>
                        <p className="text-sm text-gray-600">Quantity: {prod.qty || 1}</p>
                        <p className="text-lg font-bold text-gray-900 mt-2">₹{prod.price.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                          ₹{((prod.price || 0) * (prod.qty || 1)).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Timeline */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">Order Timeline</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  {Object.entries(selectedOrder.timestamps).map(([stage, timestamp]) => (
                    <div key={stage} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0">
                      <span className="text-sm font-medium text-gray-700">{stage}</span>
                      <span className="text-sm text-gray-600">
                        {new Date(timestamp).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">
                      ₹{((selectedOrder.products[0].price || 0) * (selectedOrder.products[0].qty || 1)).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  <div className="border-t border-gray-300 pt-2 mt-2">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-900">Total</span>
                      <span className="font-bold text-lg text-gray-900">
                        ₹{((selectedOrder.products[0].price || 0) * (selectedOrder.products[0].qty || 1)).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <button 
                className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold" 
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;