import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const API = "http://localhost:5000";

const currency = (num) =>
  typeof num === "number" ? `₹${Number(num).toLocaleString()}` : num;

const OrdersManagement = ({ onRefresh }) => {
  const [orders, setOrders] = useState([]);
  const [q, setQ] = useState("");

  const load = async () => {
    try {
      const res = await axios.get(`${API}/order`);
      setOrders(res.data);
    } catch (e) {
      console.error(e);
      toast.error("Failed to load orders");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (order, status) => {
    try {
      await axios.patch(`${API}/order/${order.id}`, { status });
      toast.success("Order updated");
      load();
      onRefresh?.();
    } catch (e) {
      console.error(e);
      toast.error("Update failed");
    }
  };

  const filtered = orders.filter(
    (o) =>
      o.id?.toString().includes(q) ||
      o.userId?.toLowerCase().includes(q.toLowerCase()) ||
      (o.address?.name || "").toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700 min-h-[70vh]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-yellow-400">Orders</h2>
        <input
          placeholder="Search by order id / user / name"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              {["Order ID", "User", "Total", "Status", "Date", "Actions"].map((h) => (
                <th key={h} className="px-4 py-2 text-left text-xs text-gray-300 uppercase">{h}</th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {filtered.map((o) => (
              <tr key={o.id} className="hover:bg-gray-700">
                <td className="px-4 py-2 text-yellow-400 font-bold">{o.id}</td>
                <td className="px-4 py-2">{o.userId}</td>
                <td className="px-4 py-2 text-green-300">{currency(o.total)}</td>
                <td className="px-4 py-2">{o.status}</td>
                <td className="px-4 py-2">{new Date(o.date).toLocaleString()}</td>
                <td className="px-4 py-2">
                  {o.status !== "delivered" && o.status !== "returned" && (
                    <>
                      <button onClick={() => updateStatus(o, "packed")} className="mr-2 text-indigo-400 hover:text-indigo-600">Pack</button>
                      <button onClick={() => updateStatus(o, "shipped")} className="mr-2 text-indigo-400 hover:text-indigo-600">Ship</button>
                      <button onClick={() => updateStatus(o, "delivered")} className="text-green-400 hover:text-green-600">Deliver</button>
                    </>
                  )}
                  {o.status !== "returned" && (
                    <button onClick={() => updateStatus(o, "returned")} className="ml-2 text-red-400 hover:text-red-600">Return</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersManagement;
