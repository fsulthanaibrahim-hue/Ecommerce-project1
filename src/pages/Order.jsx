import React, { useEffect, useState } from "react";
import { Truck, Package, CheckCircle, XCircle, Calendar } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const Orders = () => {
  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};
  const [orders, setOrders] = useState([]);
  const [expandedOrders, setExpandedOrders] = useState({});

  const stages = ["Pending", "Packed", "Shipped", "Delivered"];
  const stageIcons = {
    Pending: Calendar,
    Packed: Package,
    Shipped: Truck,
    Delivered: CheckCircle,
    Cancelled: XCircle,
  };

  useEffect(() => {
    if (!loggedUser?.id) return;

    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const userOrders = allOrders
      .filter((o) => o.userId === loggedUser.id)
      .map((o) => ({
        ...o,
        timestamps: o.timestamps || { Pending: o.date },
      }));

    setOrders(userOrders);
  }, [loggedUser.id]);

  useEffect(() => {
    const interval = setInterval(() => {
      setOrders((prevOrders) => {
        const updatedOrders = prevOrders.map((order) => {
          if (order.status === "Cancelled" || order.status === "Delivered")
            return order;

          const currentIndex = stages.indexOf(order.status);
          const nextStatus = stages[currentIndex + 1];

          return {
            ...order,
            status: nextStatus,
            timestamps: {
              ...order.timestamps,
              [nextStatus]: new Date().toLocaleString(),
            },
          };
        });

        localStorage.setItem("orders", JSON.stringify(updatedOrders));
        return updatedOrders;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const cancelOrder = (orderId) => {
    setOrders((prevOrders) => {
      const updatedOrders = prevOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: "Cancelled",
              timestamps: {
                ...order.timestamps,
                Cancelled: new Date().toLocaleString(),
              },
            }
          : order
      );

      localStorage.setItem("orders", JSON.stringify(updatedOrders));
      toast.success("Order Cancelled!");
      return updatedOrders;
    });
  };

  const toggleExpand = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <Toaster position="top-right" />
      <h2 className="text-3xl font-bold mb-8 text-center">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        orders.map((order) => {
          const lastCompletedIndex =
            order.status === "Cancelled"
              ? -1
              : stages.indexOf(order.status);

          const totalAmount = order.products.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );

          return (
            <div
              key={order.id}
              className="border p-6 rounded-xl mb-10 shadow-sm bg-white"
            >
              <div className="flex flex-col md:flex-row gap-6 mb-4 items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={order.products[0].image}
                    alt={order.products[0].name}
                    className="w-24 h-24 object-cover rounded-md border"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">
                      {order.products[0].name} {order.products.length > 1 && `+${order.products.length - 1} more`}
                    </h3>
                    <p className="text-gray-600">₹{totalAmount.toLocaleString()}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Order ID: <span className="font-medium">{order.id}</span>
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => toggleExpand(order.id)}
                  className="text-purple-700 font-semibold"
                >
                  {expandedOrders[order.id] ? "Hide Details" : "View Details"}
                </button>
              </div>

              <div className="relative flex flex-col md:flex-row items-center justify-between mb-4">
                <div className="absolute md:top-1/2 md:left-6 md:right-6 h-1 bg-gray-300 hidden md:block"></div>
                <div className="absolute left-6 top-12 bottom-0 w-1 bg-gray-300 md:hidden"></div>

                <div
                  className="absolute md:top-1/2 md:left-6 md:h-1 bg-green-500 transition-all duration-1000 ease-in-out hidden md:block"
                  style={{
                    width: `${
                      lastCompletedIndex >= 0
                        ? (lastCompletedIndex / (stages.length - 1)) * 100
                        : 0
                    }%`,
                  }}
                />
                <div
                  className="absolute left-6 top-12 w-1 bg-green-500 transition-all duration-1000 ease-in-out md:hidden"
                  style={{
                    height: `${
                      lastCompletedIndex >= 0
                        ? (lastCompletedIndex / (stages.length - 1)) * 100 + "%"
                        : 0
                    }`,
                  }}
                />

                {stages.map((stage, idx) => {
                  const Icon = stageIcons[stage];
                  const completed = idx < lastCompletedIndex;
                  const current = idx === lastCompletedIndex;

                  return (
                    <div
                      key={idx}
                      className="flex flex-col items-center mb-6 md:mb-0 relative z-10"
                    >
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center border-2 relative overflow-hidden
                        ${completed ? "bg-green-500 border-green-500" : current ? "bg-green-200 border-green-500" : "bg-white border-gray-300"}`}
                      >
                        <Icon
                          size={24}
                          className={`${
                            completed
                              ? "text-white"
                              : current
                              ? "text-green-500"
                              : "text-gray-300"
                          } transition-colors duration-500`}
                        />
                        {current && completed && (
                          <span className="absolute w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                        )}
                      </div>
                      <span className="text-sm mt-1 font-medium">{stage}</span>
                      {order.timestamps[stage] && (
                        <span className="text-xs text-gray-500 mt-1 text-center">
                          {order.timestamps[stage]}
                        </span>
                      )}
                    </div>
                  );
                })}

                {order.status === "Cancelled" && (
                  <div className="flex flex-col items-center relative z-10">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-red-500 text-red-500">
                      <XCircle size={24} />
                    </div>
                    <span className="text-sm mt-1 font-medium">Cancelled</span>
                    {order.timestamps.Cancelled && (
                      <span className="text-xs text-gray-500 mt-1">
                        {order.timestamps.Cancelled}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {order.status !== "Delivered" && order.status !== "Cancelled" && (
                <button
                  className="mt-2 bg-red-500 text-white px-4 py-2 rounded-lg w-full hover:bg-red-600"
                  onClick={() => cancelOrder(order.id)}
                >
                  Cancel Order
                </button>
              )}

              {expandedOrders[order.id] && (
                <div className="mt-4 border-t pt-4 space-y-3">
                  <p className="font-semibold">Shipping Address:</p>
                  <p className="text-gray-600">
                    {order.address
                      ? `${order.address.street}, ${order.address.city}, ${order.address.state}, ${order.address.zip}, ${order.address.country}`
                      : "N/A"}
                  </p>

                  {order.products.map((p, idx) => (
                    <div key={idx} className="flex justify-between items-center p-2 border rounded">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <p>{p.name}</p>
                          <p className="text-sm text-gray-500">
                            Qty: {p.quantity} x ₹{p.price}
                          </p>
                        </div>
                      </div>
                      <p className="font-medium">₹{(p.price * p.quantity).toLocaleString()}</p>
                    </div>
                  ))}

                  <p className="font-semibold text-right mt-2">
                    Total: ₹{totalAmount.toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default Orders;
