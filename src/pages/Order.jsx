import React, { useEffect, useState } from "react";

const Orders = () => {
  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};
  const [orders, setOrders] = useState([]);
  const [expandedOrders, setExpandedOrders] = useState({});
  const [toast, setToast] = useState(null);

  const stages = ["Pending", "Packed", "Shipped", "Delivered"];

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    if (!loggedUser?.id) return;
    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];

    const userOrders = allOrders
      .filter((o) => o.userId === loggedUser.id)
      .map((o) => {
        const normalizedStatus =
          (o.status || "Pending").trim().toLowerCase();

        const fixedStatus =
          normalizedStatus.charAt(0).toUpperCase() +
          normalizedStatus.slice(1);

        return {
          ...o,
          status: fixedStatus,
          timestamps: o.timestamps || { Pending: o.date },
          products: o.products || [],
          ShippingAddress: o.ShippingAddress || o.address || {},
        };
      });

    setOrders([...userOrders].reverse());
  }, [loggedUser?.id]);

  useEffect(() => {
    const interval = setInterval(() => {
      setOrders((prev) =>
        prev.map((order) => {
          if (
            order.status === "Cancelled" ||
            order.status === "Delivered" ||
            order.status === "Returned"
          )
            return order;

          const index = stages.indexOf(order.status);
          const next = stages[index + 1];
          if (!next) return order;

          return {
            ...order,
            status: next,
            timestamps: {
              ...order.timestamps,
              [next]: new Date().toLocaleString(),
            },
          };
        })
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const toggleExpand = (id) => {
    setExpandedOrders((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const cancelOrder = (orderId) => {
    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const updatedAllOrders = allOrders.map((o) =>
      o.id === orderId
        ? {
            ...o,
            status: "Cancelled",
            timestamps: {
              ...o.timestamps,
              Cancelled: new Date().toLocaleString(),
            },
          }
        : o
    );

    localStorage.setItem("orders", JSON.stringify(updatedAllOrders));

    setOrders((prevOrders) =>
      prevOrders.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status: "Cancelled",
              timestamps: {
                ...o.timestamps,
                Cancelled: new Date().toLocaleString(),
              },
            }
          : o
      )
    );

    showToast("Order Cancelled Successfully!");
  };

  const returnOrder = (orderId) => {
    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const updatedAllOrders = allOrders.map((o) =>
      o.id === orderId
        ? {
            ...o,
            status: "Returned",
            timestamps: {
              ...o.timestamps,
              Returned: new Date().toLocaleString(),
            },
          }
        : o
    );

    localStorage.setItem("orders", JSON.stringify(updatedAllOrders));

    setOrders((prevOrders) =>
      prevOrders.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status: "Returned",
              timestamps: {
                ...o.timestamps,
                Returned: new Date().toLocaleString(),
              },
            }
          : o
      )
    );

    showToast("Return Initiated Successfully!");
  };

  const computeProgress = (status) => {
    if (status === "Cancelled") return 0;
    if (status === "Returned") return 100;
    const idx = Math.max(0, stages.indexOf(status));
    return ((idx + 1) / stages.length) * 100;
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      Pending: "bg-yellow-100 text-yellow-800",
      Packed: "bg-blue-100 text-blue-800",
      Shipped: "bg-purple-100 text-purple-800",
      Delivered: "bg-green-100 text-green-800",
      Cancelled: "bg-red-100 text-red-800",
      Returned: "bg-orange-100 text-orange-800",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${
          statusStyles[status] || "bg-gray-100 text-gray-800"
        }`}
      >
        {status}
      </span>
    );
  };

  const getStageIcon = (stage) => {
    const icons = {
      Pending: "📅",
      Packed: "📦",
      Shipped: "🚚",
      Delivered: "✅",
    };
    return icons[stage] || "•";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 mt-8">
      {/* Custom Toast Notification */}
      {toast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse">
          {toast}
        </div>
      )}

      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">📦 My Orders</h1>
        {orders.length === 0 ? (
          <p className="text-center text-gray-500">No orders yet.</p>
        ) : (
          orders.map((order) => {
            const products = order.products || [];
            const totalAmount = products.reduce(
              (sum, p) => sum + p.price * p.quantity,
              0
            );
            const progressPct = computeProgress(order.status);

            return (
              <div
                key={order.id}
                className="bg-white border rounded-xl shadow-sm mb-10"
              >
                <div className="md:flex justify-between items-center p-6">
                  <div className="flex items-start gap-4">
                    <img
                      src={products[0]?.image}
                      alt="image"
                      className="w-20 h-20 object-cover rounded-lg border"
                    />

                    <div>
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="text-lg font-semibold">
                          {products[0]?.name}
                          {products.length > 1 && (
                            <span className="text-sm text-gray-500 ml-2">
                              +{products.length - 1} more
                            </span>
                          )}
                        </h3>
                        {getStatusBadge(order.status)}
                      </div>

                      <p className="font-medium mt-1">
                        ₹{totalAmount.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Order ID: {order.id}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleExpand(order.id)}
                    className="border px-3 py-2 rounded-md text-sm text-purple-700 hover:bg-purple-50 mt-4 md:mt-0"
                  >
                    {expandedOrders[order.id] ? "Hide Details" : "View Details"}
                  </button>
                </div>

                <div className="px-6 pb-4">
                  {order.status !== "Cancelled" && order.status !== "Returned" && (
                    <div className="relative py-6">
                      <div className="absolute left-6 right-6 top-1/2 h-1 bg-gray-200 rounded-full -translate-y-1/2"></div>

                      <div
                        className="absolute left-6 top-1/2 h-1 bg-green-500 rounded-full transition-all duration-700 ease-in-out -translate-y-1/2"
                        style={{ width: `${progressPct}%` }}
                      />

                      <div className="relative z-10 flex justify-between">
                        {stages.map((stage, index) => {
                          const completed =
                            progressPct >= ((index + 1) / stages.length) * 100;
                          const isCurrent =
                            stages.indexOf(order.status) === index;

                          return (
                            <div key={stage} className="text-center">
                              <div
                                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 text-xl
                                ${
                                  completed
                                    ? "bg-green-500 border-green-500 text-white"
                                    : isCurrent
                                    ? "bg-green-100 border-green-500 text-green-600"
                                    : "bg-white border-gray-300 text-gray-300"
                                }`}
                              >
                                {getStageIcon(stage)}
                              </div>

                              <p className="text-sm mt-2">{stage}</p>

                              {order.timestamps?.[stage] && (
                                <p className="text-xs text-gray-400 mt-1">
                                  {order.timestamps[stage]}
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {order.status === "Cancelled" && (
                    <div className="py-6 text-center">
                      <div className="flex items-center justify-center gap-2 text-red-600">
                        <span className="text-2xl">❌</span>
                        <p className="font-semibold">Order Cancelled</p>
                      </div>
                      {order.timestamps?.Cancelled && (
                        <p className="text-sm text-gray-500 mt-2">
                          Cancelled on {order.timestamps.Cancelled}
                        </p>
                      )}
                    </div>
                  )}

                  {order.status === "Returned" && (
                    <div className="py-6 text-center">
                      <div className="flex items-center justify-center gap-2 text-orange-600">
                        <span className="text-2xl">🔄</span>
                        <p className="font-semibold">Return Initiated</p>
                      </div>
                      {order.timestamps?.Returned && (
                        <p className="text-sm text-gray-500 mt-2">
                          Returned on {order.timestamps.Returned}
                        </p>
                      )}
                    </div>
                  )}

                  {order.status !== "Delivered" &&
                    order.status !== "Cancelled" &&
                    order.status !== "Returned" && (
                      <div className="flex justify-end pr-2">
                        <button
                          onClick={() => cancelOrder(order.id)}
                          className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700 transition"
                        >
                          Cancel Order
                        </button>
                      </div>
                    )}

                  {order.status === "Delivered" && (
                    <div className="flex justify-end pr-2">
                      <button
                        onClick={() => returnOrder(order.id)}
                        className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm hover:bg-orange-700 transition flex items-center gap-2"
                      >
                        <span>🔄</span>
                        Return Order
                      </button>
                    </div>
                  )}
                </div>

                <div
                  className="px-6 overflow-hidden transition-all duration-500"
                  style={{
                    maxHeight: expandedOrders[order.id] ? "1200px" : "0px",
                  }}
                >
                  <div className="pt-0 pb-6 mt-2">
                    <div className="bg-gray-50 p-4 rounded-lg border">
                      <h3 className="font-semibold mb-2">Shipping Address</h3>
                      <p>{order.ShippingAddress?.fullname}</p>
                      <p>{order.ShippingAddress?.address}</p>
                      <p>
                        {order.ShippingAddress?.city} -{" "}
                        {order.ShippingAddress?.pinCode}
                      </p>
                      <p>
                        {order.ShippingAddress?.state},{" "}
                        {order.ShippingAddress?.country}
                      </p>
                    </div>

                    <div className="mt-4 space-y-3">
                      {products.map((p, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center p-3 border rounded-md"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={p.image}
                              className="w-14 h-14 object-cover rounded"
                              alt={p.name}
                            />
                            <div>
                              <p className="font-medium">{p.name}</p>
                              <p className="text-sm text-gray-500">
                                Qty: {p.quantity} × ₹{p.price}
                              </p>
                            </div>
                          </div>

                          <p className="font-semibold">
                            ₹{(p.price * p.quantity).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>

                    <p className="text-right font-bold text-lg mt-4">
                      Total: ₹{totalAmount.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Orders;