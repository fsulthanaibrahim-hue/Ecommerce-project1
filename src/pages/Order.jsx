
import React, { useEffect, useState } from "react";
import { Truck, Package, CheckCircle, XCircle, Calendar } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const Orders = () => {
  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};
  const [orders, setOrders] = useState([]);
  const [animateOrders, setAnimateOrders] = useState([]);

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

    userOrders.forEach((order, index) => {
      setTimeout(() => {
        setAnimateOrders((prev) => [...prev, order]);
      }, index * 200);
    });
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

        setAnimateOrders(updatedOrders);
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
      setAnimateOrders(updatedOrders);
      localStorage.setItem("orders", JSON.stringify(updatedOrders));
      toast.success("Order Cancelled!");
      return updatedOrders;
    });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <Toaster position="top-right" />
      <h2 className="text-3xl font-bold mb-8 text-center">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        animateOrders.map((order) => {
          const lastCompletedIndex =
            order.status === "Cancelled"
              ? -1
              : stages.indexOf(order.status);

          return (
            <div
              key={order.id}
              className="border p-6 rounded-xl mb-10 shadow-sm bg-white"
            >
              <div className="flex flex-col md:flex-row gap-6 mb-6 items-center">
                <img
                  src={order.products[0].image}
                  alt={order.products[0].name}
                  className="w-24 h-24 object-cover rounded-md border"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">
                    {order.products[0].name}
                  </h3>
                  <p className="text-gray-600">
                    ₹{order.products[0].price.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Order ID: <span className="font-medium">{order.id}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Ordered At: <span className="font-medium">{order.date}</span>
                  </p>
                  {order.timestamps.Delivered && (
                    <p className="text-sm text-gray-500">
                      Delivered At:{" "}
                      <span className="font-medium">
                        {order.timestamps.Delivered}
                      </span>
                    </p>
                  )}
                  <p className="text-sm text-gray-500 mt-2">
                    Status: <span className="font-medium">{order.status}</span>
                  </p>
                </div>
              </div>

              <div className="relative flex flex-col md:flex-row items-center justify-between mb-6">
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
                        {current && (
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
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg w-full hover:bg-red-600"
                  onClick={() => cancelOrder(order.id)}
                >
                  Cancel Order
                </button>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default Orders;
