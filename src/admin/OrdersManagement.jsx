import React, { useState, useEffect } from "react";

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [q, setQ] = useState("");

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "{}");

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:5000/users").then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      }),
      fetch("http://localhost:5000/order").then((res) => {
        if (!res.ok) throw new Error("Failed to fetch orders");
        return res.json();
      }),
    ])
      .then(([usersData, ordersData]) => {
        console.log("Users fetched:", usersData);
        console.log("Orders fetched:", ordersData);
        
        // Debug: Check each order's userId
        if (ordersData && ordersData.length > 0) {
          console.log("Sample order structure:", ordersData[0]);
          ordersData.forEach((order, idx) => {
            console.log(`Order ${idx} userId:`, order.userId, typeof order.userId);
          });
        }
        
        setUsers(Array.isArray(usersData) ? usersData : []);
        setOrders(Array.isArray(ordersData) ? ordersData : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const getUserName = (userId) => {
    if (!userId) return "Unknown User";
    
    const user = users.find((u) => {
      return u.id === userId || 
             u.id === String(userId) || 
             String(u.id) === String(userId);
    });
    
    if (user) {
      console.log(`Found user for userId ${userId}:`, user.name || user.email);
      return user.name || user.email || `User ${userId}`;
    }
    
    console.warn(`No user found for userId: ${userId}`);
    return `User ${userId}`;
  };

  const getOrderAge = (orderDate) => {
    if (!orderDate) return "-";
    const diff = Math.floor(
      (new Date() - new Date(orderDate)) / (1000 * 60 * 60 * 24)
    );
    return diff === 0 ? "Today" : `${diff} day${diff > 1 ? "s" : ""} ago`;
  };

  // Filter orders based on search query (SHOW ALL ORDERS)
  const filteredOrders = orders.filter((o) => {
    if (!q) return true; // Show all if no search query
    
    const userName = getUserName(o.userId).toLowerCase();
    const orderId = String(o.id || "").toLowerCase();
    const userId = String(o.userId || "").toLowerCase();
    const searchLower = q.toLowerCase();
    
    return (
      orderId.includes(searchLower) ||
      userId.includes(searchLower) ||
      userName.includes(searchLower)
    );
  });

  // Log filtered results for debugging
  useEffect(() => {
    console.log(`Displaying ${filteredOrders.length} of ${orders.length} total orders`);
  }, [filteredOrders.length, orders.length]);

  if (loading) {
    return <p className="text-white text-center mt-4">Loading orders...</p>;
  }

  if (error) {
    return (
      <div className="bg-red-900 p-6 rounded-xl text-white">
        <h3 className="font-bold mb-2">Error Loading Orders</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700 overflow-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-yellow-400 text-2xl font-bold">
          All Orders ({orders.length} total)
        </h2>
        <input
          type="text"
          placeholder="Search by Order ID, User ID, or Name..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white w-80 border border-gray-600 focus:outline-none focus:border-yellow-400"
        />
      </div>

      {filteredOrders.length === 0 && orders.length > 0 && (
        <p className="text-gray-400 mb-4">
          No orders match your search. Showing 0 of {orders.length} orders.
        </p>
      )}

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
                const isLoggedInUser = 
                  order.userId === loggedInUser.id || 
                  String(order.userId) === String(loggedInUser.id);
                
                return (
                  <tr
                    key={order.id}
                    className={`hover:bg-gray-700 border-b border-gray-600 align-top transition-colors ${
                      isLoggedInUser ? "bg-gray-600" : ""
                    }`}
                  >
                    <td className="p-2 font-mono text-sm">{order.id}</td>
                    <td className="p-2 text-gray-400 text-sm font-mono">
                      {order.userId || "N/A"}
                    </td>
                    <td className="p-2">
                      {getUserName(order.userId)}
                      {isLoggedInUser && (
                        <span className="ml-2 text-xs bg-yellow-500 text-black px-2 py-0.5 rounded">
                          You
                        </span>
                      )}
                    </td>
                    <td className="p-2 text-yellow-400 font-bold">
                      ₹{order.total?.toFixed(2) || "0.00"}
                    </td>
                    <td className="p-2">
                      <span
                        className={`capitalize px-2 py-1 rounded text-xs ${
                          order.status === "delivered"
                            ? "bg-green-600"
                            : order.status === "pending"
                            ? "bg-yellow-600"
                            : "bg-blue-600"
                        }`}
                      >
                        {order.status || "pending"}
                      </span>
                    </td>
                    <td className="p-2 text-sm">
                      {order.date
                        ? new Date(order.date).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="p-2 text-gray-300 text-sm">
                      {getOrderAge(order.date)}
                    </td>
                    <td className="p-2">
                      {order.products && order.products.length > 0 ? (
                        <ul className="text-sm">
                          {order.products.map((prod, idx) => (
                            <li key={prod.id || idx} className="mb-1">
                              {prod.name || "Unknown Product"} x {prod.quantity || 1}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-gray-400 text-sm">No products</span>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8" className="p-4 text-center text-gray-400">
                  {orders.length === 0
                    ? "No orders found in the system."
                    : "No orders match your search."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Debug info */}
      <div className="mt-4 p-3 bg-gray-900 rounded text-xs text-gray-400">
        <p>Debug Info: {filteredOrders.length} orders displayed | Logged in as: {loggedInUser.name || loggedInUser.email || "Unknown"} (ID: {loggedInUser.id})</p>
      </div>
    </div>
  );
};

export default OrdersManagement;