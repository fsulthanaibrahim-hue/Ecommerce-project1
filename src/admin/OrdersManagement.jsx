import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [q, setQ] = useState("");

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "{}");

  const STATUS_FLOW = ["pending", "processing", "shipped", "delivered", "cancelled"];

  const getNextStatus = (currentStatus) => {
    const idx = STATUS_FLOW.indexOf(currentStatus?.toLowerCase());
    return idx >= 0 && idx < STATUS_FLOW.length - 1 ? STATUS_FLOW[idx + 1] : null;
  };

  const getStatusColor = (status) => {
    switch ((status || "").toLowerCase()) {
      case "pending":
        return "bg-yellow-600";
      case "processing":
        return "bg-blue-600";
      case "shipped":
        return "bg-indigo-600";
      case "delivered":
        return "bg-green-600";
      case "cancelled":
        return "bg-red-600";
      default:
        return "bg-gray-500";
    }
  };

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:5000/users").then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      }),
      fetch("http://localhost:5000/order/" + userId).then((res) => {
        if (!res.ok) throw new Error("Failed to fetch orders");
        return res.json();
      }),
    ])
      .then(([usersData, ordersData]) => {
        setUsers(Array.isArray(usersData) ? usersData : []);
        setOrders(Array.isArray(ordersData) ? ordersData : []);
        setLoading(false);
      })
       .catch((err) => {
        console.erro("Error fetch data:", err);
        setError(err.message);
        setLoading(false);  
       });
  }, []);


  const getUserName = (userId) => {
    if (!userId) return "Unknown User";
    
    const user = users.find(
      (u) => u.id === userId || String(u.id) === String(userId)
    );
      return user ? user.name || user.email || `User ${userId}` : `User ${userId}`;
    };
    
  const getOrderAge = (orderDate) => {
    if (!orderDate) return "-";
    const diff = Math.floor(
      (new Date() - new Date(orderDate)) / (1000 * 60 * 60 * 24)
    );
    return diff === 0 ? "Today" : `${diff} day${diff > 1 ? "s" : ""} ago`;
  };

   const handleAdvanceStatus = async (orderId, nextStatus) => {
    try {
      const res = await fetch(`http://localhost:5000/order/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
    });

    if (!res.ok) throw new Error("Failed to update status");

    setOrders((prev) => 
     prev.map((o) => (o.id === orderId ? { ...o, status: nextStatus } : o))
    );

    toast.success(`Order ${orderId} status updated to ${nextStatus.toUpperCase()}`);
  } catch (err) {
    console.error(err);
    toast.error("Failed to update order status");
  }
}; 

  // Filter orders based on search query (SHOW ALL ORDERS)
  const filteredOrders = orders.filter((o) => {
    if (!q) return true; 
    
    const userName = getUserName(o.userId).toLowerCase();
    const orderId = String(o.id || "").toLowerCase();
    const searchLower = q.toLowerCase();
    return orderId.includes(searchLower) || userName.includes(searchLower);
  });  

  if (loading) return <p className="text-white text-center mt-4">Loading orders...</p>;

  if (error) {
    return (
      <div className="bg-red-900 p-6 rounded-xl text-white">
        <h3 className="font-bold mb-2">Error Loading Orders</h3>
        <p>{error}</p>
      </div>
    );


  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700 overflow-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-yellow-400 text-2xl font-bold">
          All Orders ({orders.length} total)
        </h2>
        <input
          type="text"
          placeholder="Search by Order ID, or Name..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white w-80 border border-gray-600 focus:outline-none focus:border-yellow-400"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-white table-auto">
          <thead>
            <tr className="bg-gray-900">
              <th className="p-2 border-b border-gray-600 text-left">Order ID</th>
              <th className="p-2 border-b border-gray-600 text-left">User ID</th>
              <th className="p-2 border-b border-gray-600 text-left">User Name</th>
              <th className="p-2 border-b border-gray-600 text-left">Total</th>
              <th className="p-2 border-b border-gray-600 text-left">Status</th>
              <th className="p-2 border-b border-gray-600 text-left">Date</th>
              <th className="p-2 border-b border-gray-600 text-left">Age</th>
              <th className="p-2 border-b border-gray-600 text-left">Products</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => {
                const userName = getUserName(order.userId);
                const isLoggedInUser = String(order.userId) === String(loggedInUser.id);
                const nextStatus = getNextStatus(order.status);
                
                return (
                  <tr
                    key={order.id}
                    className={`hover:bg-gray-700 border-b border-gray-600 align-top transition-colors ${
                      isLoggedInUser ? "bg-gray-600" : ""
                    }`}
                  >
                    <td className="p-2 font-mono text-sm">{order.id}</td>
                    <td className="p-2">{userName}{isLoggedInUser && <span className="ml-2 text-xs bg-yellow-500 text-black px-4 py-0.5 rounded">You</span>}</td>
                    <td className="p-2 text-yellow-400 font-bold">₹{order.total?.toFixed(2) || "0.00"}</td>
                    <td className="p-2">
                      <span className={`capitalize px-2 py-1 rounded text-xs ${getStatusColor(order.status)}`}>
                        {order.status || "pending"}
                      </span>
                    </td>
                    <td className="p-2 text-sm">{order.date ? new Date(order.date).toLocaleString() : "-"}</td>
                    <td className="p-2 tetx-gray-300 text-sm">{getOrderAge(order.date)}</td>
                    <td className="p-2">
                      {order.products?.length > 0 ? (
                        <ul className="text-sm">
                          {order.products.map((prod, idx) => (
                            <li key={prod.id || idx} className="mb-1">{prod.name || "Unknown Product"} x {prod.quantity || 1}</li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-gray-400 text-sm">No Products</span>
                      )}
                    </td>
                    <td className="p-2">
                      {nextStatus ? (
                        <button 
                          className={`px-2 py-1 rounded text-white text-xs ${getStatusColor(order.status)}`}
                          onClick={() => handleAdvanceStatus(order.id, nextStatus)}
                        >
                          Move to {nextStatus.toUpperCase()}
                        </button>  
                      ) : (
                        <span className={`px-2 py-1 rounded text-xs text-white ${getStatusColor(order.status)}`}>
                          {order.status?.toUpperCase() || "N/A"}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8" className="p-4 text-center text-gray-400">
                  {orders.length === 0
                    ? "No orders found."
                    : "No orders match your search."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
};

export default OrdersManagement;
