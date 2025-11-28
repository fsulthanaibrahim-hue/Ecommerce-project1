import { useEffect, useState } from "react";
import { FaTrash, FaEye, FaEyeSlash } from "react-icons/fa";

const API_URL = "http://localhost:5000/order";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();

      const validOrders = Array.isArray(data) ? data : [];
      setOrders(validOrders);

      const total = validOrders.reduce((sum, o) => sum + Number(o.total || 0), 0);
      setTotalRevenue(total);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const order = orders.find((o) => o.id === id);
      if (!order) return;

      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...order, status: newStatus }),
      });

      fetchOrders();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchOrders();
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto font-[Inter]">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-4xl font-semibold text-gray-900 tracking-tight mb-1">
          Manage Orders
        </h2>
        <p className="text-gray-500 text-sm">
          Track, manage, and fulfill customer orders efficiently.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="p-6 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200 shadow-sm hover:shadow-md transition">
          <h3 className="text-gray-800 font-medium text-sm">Total Revenue</h3>
          <p className="text-3xl font-bold mt-2 text-green-700">
            ₹{totalRevenue.toLocaleString()}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 shadow-sm hover:shadow-md transition">
          <h3 className="text-gray-800 font-medium text-sm">Total Orders</h3>
          <p className="text-3xl font-bold mt-2 text-blue-700">{orders.length}</p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto bg-white/70 backdrop-blur-md shadow-xl border border-gray-200 rounded-2xl">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100/70 text-gray-600 uppercase text-xs font-semibold tracking-wide">
            <tr>
              <th className="py-3 px-6 text-left">Order ID</th>
              <th className="py-3 px-6 text-left">Customer</th>
              <th className="py-3 px-6 text-left">Total</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 text-gray-800">
            {orders.map((o) => (
              <>
                <tr
                  key={o.id}
                  className="hover:bg-gray-50/80 transition duration-150 ease-in-out"
                >
                  <td className="py-4 px-6 font-semibold text-gray-900">#{o.id}</td>
                  <td className="py-4 px-6">{o.customerName || "Guest User"}</td>
                  <td className="py-4 px-6 font-semibold text-gray-700">
                    ₹{Number(o.total || 0).toLocaleString()}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        o.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : o.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {o.status || "Pending"}
                    </span>
                  </td>

                  {/* Action Buttons */}
                  <td className="py-4 px-6 text-center flex justify-center gap-3">
                    <select
                      value={o.status || "Pending"}
                      onChange={(e) => handleStatusChange(o.id, e.target.value)}
                      className="border border-gray-300 rounded-lg px-2 py-1 text-sm bg-white focus:ring-2 focus:ring-gray-700 transition"
                    >
                      <option>Pending</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                    </select>

                    <button
                      onClick={() => handleDelete(o.id)}
                      className="text-gray-600 hover:text-red-600 transition text-lg"
                      title="Delete Order"
                    >
                      <FaTrash />
                    </button>

                    <button
                      onClick={() => toggleExpand(o.id)}
                      className="text-gray-600 hover:text-black transition text-lg"
                      title={expanded === o.id ? "Hide Details" : "View Details"}
                    >
                      {expanded === o.id ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </td>
                </tr>

                {/* Expanded Order Products */}
                {expanded === o.id && o.items && o.items.length > 0 && (
                  <tr className="bg-gray-50">
                    <td colSpan="5" className="py-4 px-10">
                      <h4 className="text-gray-800 font-semibold mb-2">
                        Ordered Products
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        {o.items.map((item, index) => (
                          <li
                            key={index}
                            className="flex justify-between border-b border-gray-200 pb-2"
                          >
                            <span>{item.name}</span>
                            <span>
                              ₹{item.price} × {item.quantity}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>

        {loading && (
          <div className="py-8 text-center text-gray-500">
            Loading orders...
          </div>
        )}
        {!loading && orders.length === 0 && (
          <div className="py-8 text-center text-gray-500">No orders found.</div>
        )}
      </div>
    </div>
  );
}




