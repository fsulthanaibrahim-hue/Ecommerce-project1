  import React, { useEffect, useState } from "react";
  import axios from "axios";
  import toast from "react-hot-toast";

  const API_URL = "http://localhost:5000/order";

  const STATUS_OPTIONS = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

  export default function AdminOrders() {
    const [orders, setOrders] = useState([]);

    const loadOrders = async () => {
      try {
        const res = await axios.get(API_URL);
        const sorted = res.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setOrders(sorted);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load orders");
      }
    };

    useEffect(() => {
      loadOrders();
    }, []);

    const handleStatusChange = async (orderId, newStatus) => {
      try {
        await axios.patch(`${API_URL}/${orderId}`, { status: newStatus.toLowerCase() });
        toast.success(`Order status updated to ${newStatus}`);
        loadOrders();
      } catch (err) {
        console.error(err);
        toast.error("Failed to update order status");
      }
    };

    const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "text-yellow-600 border-yellow-600";
      case "processing":
        return "text-blue-600 border-blue-600";
      case "shipped":
        return "text-indigo-600 border-indigo-600";
      case "delivered":
        return "text-green-600 border-green-600";
      case "cancelled":
        return "text-red-600 border-red-600";
      default:
        return "text-gray-600 border-gray-600";
    }
  };




    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Orders Overview</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 text-left">Customer</th>
                <th className="py-2 px-4 text-left">Date</th>
                <th className="py-2 px-4 text-left">Amount</th>
                <th className="py-2 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id ?? order._id} className="border-b">
                  <td className="py-2 px-4">{order.customerName}</td>
                  <td className="py-2 px-4">{new Date(order.date).toLocaleString()}</td>
                  <td className="py-2 px-4">₹{order.amount}</td>
                  <td className="py-2 px-4">
                    <select 
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id ?? order._id, e.target.value)}
                      className={`px-2 py-1 rounded text-sm font-semibold border ${getStatusColor(order.status)}`} 
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>{s.toUpperCase()}</option>
                      ))}
                    </select>  
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={4} className="tetx-center py-6 text-gray-400">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
