
import React, { useEffect, useState } from "react";
import { Truck, Package, CheckCircle, XCircle, Calendar, ArrowLeft } from "lucide-react";

const OrderDetail = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching order data
    setTimeout(() => {
      const mockOrder = {
        id: "ORD-2024-12345",
        date: "2024-11-28T10:30:00",
        status: "Shipped",
        products: [
          {
            id: 1,
            name: "Wireless Bluetooth Headphones",
            price: 2999,
            qty: 1,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop"
          },
          {
            id: 2,
            name: "Smart Watch Series 5",
            price: 15999,
            qty: 2,
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop"
          },
          {
            id: 3,
            name: "USB-C Fast Charger",
            price: 1499,
            qty: 1,
            image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=200&h=200&fit=crop"
          }
        ],
        ShippingAddress: {
          fullname: "Rajesh Kumar",
          address: "123, MG Road, Koramangala",
          city: "Bangalore",
          state: "Karnataka",
          pinCode: "560034",
          country: "India"
        },
        subtotal: 37496,
        shipping: 0,
        total: 37496
      };
      setOrder(mockOrder);
      setLoading(false);
    }, 500);
  }, []);

  const statusIcons = {
    Pending: Calendar,
    Packed: Package,
    Shipped: Truck,
    Delivered: CheckCircle,
    Cancelled: XCircle
  };

  const handleBackToOrders = () => {
    alert("Navigating back to orders list...");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <XCircle className="mx-auto h-16 w-16 text-red-500 mb-4" />
          <p className="text-xl text-gray-800">Order not found</p>
          <button 
            onClick={handleBackToOrders}
            className="mt-4 text-blue-600 hover:text-blue-700 underline"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button 
            onClick={handleBackToOrders}
            className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-2 mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Orders
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Order #{order.id}</h1>
          <p className="text-sm text-gray-600 mt-1">
            Placed on {new Date(order.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Order Status */}
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">Order Status</h2>
            <div className="flex justify-between items-center">
              {Object.keys(statusIcons).map((stage, idx) => {
                const Icon = statusIcons[stage];
                const currentStageIndex = Object.keys(statusIcons).indexOf(order.status);
                const thisStageIndex = idx;
                const completed = thisStageIndex <= currentStageIndex;
                const isLast = idx === Object.keys(statusIcons).length - 1;
                const isCancelled = order.status === "Cancelled";

                return (
                  <React.Fragment key={stage}>
                    <div className="flex flex-col items-center relative">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        isCancelled && stage === "Cancelled" 
                          ? "bg-red-600 text-white" 
                          : completed 
                          ? "bg-blue-600 text-white" 
                          : "bg-white border-2 border-gray-300 text-gray-400"
                      }`}>
                        <Icon size={20} />
                      </div>
                      <span className={`text-xs mt-2 font-medium text-center ${
                        isCancelled && stage === "Cancelled"
                          ? "text-red-600"
                          : completed 
                          ? "text-gray-900" 
                          : "text-gray-500"
                      }`}>
                        {stage}
                      </span>
                    </div>
                    {!isLast && (
                      <div className={`flex-1 h-0.5 mx-2 -mt-8 ${
                        isCancelled ? "bg-gray-300" : completed ? "bg-blue-600" : "bg-gray-300"
                      }`} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Order Items */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.products.map((product, i) => (
                <div key={i} className="flex gap-4 items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded border border-gray-200"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600 mt-1">Quantity: {product.qty}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">₹{(product.price * product.qty).toLocaleString()}</p>
                    <p className="text-sm text-gray-500 mt-1">₹{product.price.toLocaleString()} each</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping & Summary Section */}
          <div className="grid md:grid-cols-2 gap-6 p-6">
            {/* Shipping Address */}
            <div>
              <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Shipping Address</h2>
              <div className="text-sm text-gray-600 leading-relaxed">
                <p className="font-medium text-gray-900">{order.ShippingAddress.fullname}</p>
                <p className="mt-2">{order.ShippingAddress.address}</p>
                <p>{order.ShippingAddress.city}, {order.ShippingAddress.state} {order.ShippingAddress.pinCode}</p>
                <p>{order.ShippingAddress.country}</p>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Order Summary</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">₹{order.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="font-bold text-lg text-gray-900">₹{order.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-6 bg-gray-50 border-t border-gray-200 flex gap-3">
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
              Track Shipment
            </button>
            <button className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors">
              Contact Support
            </button>
          </div>
        </div>

        {/* Need Help Section */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-1">Need help with your order?</h3>
          <p className="text-sm text-blue-700">Our customer support team is available 24/7 to assist you with any questions or concerns.</p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;