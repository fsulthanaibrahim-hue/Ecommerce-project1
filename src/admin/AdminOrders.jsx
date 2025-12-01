// import { useEffect, useState } from "react";
// import { FaTrash, FaEye, FaEyeSlash, FaArrowRight } from "react-icons/fa";
// import toast from "react-hot-toast";

// const API_URL = "http://localhost:5000/order";

// export default function AdminOrders() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [expanded, setExpanded] = useState(null);

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(API_URL);
//       const data = await res.json();
//       setOrders(Array.isArray(data) ? data.reverse() : []);
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//       toast.error("Failed to load orders!");
//     } 
//       setLoading(false);
//   };

//   const nextStatus = {
//     pending: "shipped",
//     shipped: "delivered",
//     delivered: null,
//   };

//   const handleAdvance = async (id) => {
//     const order = orders.find((o) => o.id === id);
//     if (!order) return;

//     const newStatus = nextStatus[order.status];
//     if(!newStatus) return toast("Order already delivered!");
   
//     try {
//         await fetch(`${API_URL}/${id}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ status: newStatus }),
//      });

//      setOrders((prev) =>
//       prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o)) 
//     );

//     toast.dismiss();
//     toast.success(`Order moved to ${newStatus}!`);
//   } catch (error) {
//     toast.error("Updated failed!");
//   }
// }; 

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this order permanently?")) return;

//     try {
//       await fetch(`${API_URL}/${id}`, { method: "DELETE" });
//       setOrders((prev) => prev.filter((o) => o.id !== id));
//       toast.success("Order deleted!")
//     } catch {
//       toast.error("Delete failed!");
//     }
//   };

//   const toggleExpand = (id) => {
//     setExpanded(expanded === id ? null : id);
//   };

//   const badgeStyle = (status) => 
//   ({
//     pending: "bg-yellow-500/20 text-yellow-400",
//     shipped: "bg-blue-500/20 text-blue-400",
//     delivered: "bg-green-500/20 text-green-400",
//   }[status]);

//   return (
//     <div className="min-h-screen bg-slate-900 p-6">
//       {/* Header */}
//         <h1 className="text-3xl font-bold text-white mb-1">Orders Overview</h1>
//         <p className="text-2xl font-semibold text-gray-300">Manage all customer orders here</p>

//         {loading ? (
//           <div className="text-center text-gray-400">Loading orders...</div>
//         ) : orders.length === 0 ? (
//           <div className="text-center text-gray-400">No orders found...</div>
//         ) : (
//           <div className="space-y-4">
//             {orders.map((order) => {
//               const next = nextStatus[order.status];

//               return (
//                 <div 
//                   key={order.id}
//                   className="bg-slate-800 border border-slate-700 p-6 rounded-xl hover:border-orange-500 transition"
//                 >
//              {/* Header */}
//               <div className="flex justify-between items-start">
//                 <div>
//                   <h3 className="text-lg text-white font-semibold">
//                     {order.id} — {order.customerName || "Guest User"}
//                   </h3>
//                     <p className="text-gray-400 text-sm">
//                       {order.date || new Date().toLocaleString()}
//                     </p>
//                     <span
//                       className={`inline-block mt-3 px-3 py-1 text-xs rounded-full ${badgeStyle(
//                         order.status
//                       )}`}
//                     >
//                       {order.status.toUpperCase()}
//                     </span>
//                   </div>

//                 <div className="text-right">
//                   <p className="text-orange-400 font-bold text-xl">
//                     ₹{Number(order.total || 0).toLocaleString()}
//                   </p>
//                    {next ? (
//                     <button 
//                       onClick={() => handleAdvance(order.id)}
//                       className="mt-3 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm transition flex items-center gap-2"
//                     >
//                       Advance to {next}
//                       <FaArrowRight />
//                     </button>  
//                   ) : (
//                     <p className="mt-3 text-green-400 font-semibold">✔ Delivered</p>
//                   )}
//                 </div>
//               </div>

//                <div className="flex gap-3 mt-4">
//                   <button
//                     onClick={() => toggleExpand(order.id)}
//                     className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm flex items-center gap-2"
//                   >
//                     {expanded === order.id ? <FaEyeSlash /> : <FaEye />}
//                     {expanded === order.id ? "Hide Details" : "View Details"}
//                   </button>

//                   <button
//                     onClick={() => handleDelete(order.id)}
//                     className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm flex items-center gap-2"
//                   >
//                     <FaTrash /> Delete
//                   </button>
//                 </div>

//                 {/* Expanded Items */}
//                 {expanded === order.id && (
//                   <div className="mt-5 border-t border-slate-700 pt-4">
//                     <h4 className="text-white font-semibold mb-2">Order Items</h4>

//                     {order.items?.map((item, index) => (
//                       <div
//                         key={index}
//                         className="flex justify-between bg-slate-700/40 p-3 rounded-lg text-sm mb-2"
//                       >
//                         <span className="text-gray-300">{item.name}</span>
//                         <span className="text-gray-400">
//                           ₹{item.price} × {item.quantity} = ₹
//                           {(item.price * item.quantity).toLocaleString()}
//                         </span>
//                       </div>
//                      ))}
//                    </div>
//                   )}
//                 </div>
//                );
//              })}
//           </div>
//          )}
//        </div>
//      );
//  } 











// import { useEffect, useState } from "react";
// import { FaTrash, FaEye, FaEyeSlash, FaArrowRight } from "react-icons/fa";
// import toast from "react-hot-toast";

// const API_URL = "http://localhost:5000/order";

// export default function AdminOrders() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [expanded, setExpanded] = useState(null);

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(API_URL);
//       const data = await res.json();
//       setOrders(Array.isArray(data) ? data.reverse() : []);
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//       toast.error("Failed to load orders!");
//     }
//     setLoading(false);
//   };

//   const nextStatus = {
//     pending: "shipped",
//     shipped: "delivered",
//     delivered: null,
//   };

//   const handleAdvance = async (id) => {
//     const order = orders.find((o) => o.id === id);
//     if (!order) return;

//     const current = order.status.toLowerCase().trim();
//     const newStatus = nextStatus[order.status];

//     if (!newStatus) return toast("Order already delivered!");

//     try {
//       await fetch(`${API_URL}/${id}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ status: newStatus }),
//       });

//       setOrders((prev) =>
//         prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
//       );

//       toast.success(`Order moved to ${newStatus}!`);
//     } catch {
//       toast.error("Update failed!");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this order permanently?")) return;

//     try {
//       await fetch(`${API_URL}/${id}`, { method: "DELETE" });
//       setOrders((prev) => prev.filter((o) => o.id !== id));
//       toast.success("Order deleted!");
//     } catch {
//       toast.error("Delete failed!");
//     }
//   };

//   const toggleExpand = (id) => {
//     setExpanded(expanded === id ? null : id);
//   };

//   const badgeStyle = (status) =>
//     ({
//       pending: "bg-yellow-500/20 text-yellow-400",
//       shipped: "bg-blue-500/20 text-blue-400",
//       delivered: "bg-green-500/20 text-green-400",
//     }[status]);

//   return (
//     <div className="min-h-screen bg-slate-900 p-6">
//       <h1 className="text-3xl font-bold text-white mb-1">Orders Overview</h1>
//       <p className="text-2xl font-semibold text-gray-300 mb-6">
//         Manage all customer orders here
//       </p>

//       {loading ? (
//         <div className="text-center text-gray-400">Loading orders...</div>
//       ) : orders.length === 0 ? (
//         <div className="text-center text-gray-400">No orders found...</div>
//       ) : (
//         <div className="space-y-4">
//           {orders.map((order) => {
//             const next = nextStatus[order.status];

//   // Extract name + date safely
//             const customerName =
//               order.address?.name ||
//               order.shippingAddress?.name ||
//               "Guest User";

//             const orderDate = order.orderDate || order.date || new Date();


//             return (
//               <div
//                 key={order.id}
//                 className={`
//                   p-6 rounded-xl transition-all 
//                   bg-slate-800 border
//                   ${expanded === order.id
//                     ? "border-orange-500 shadow-[0_0_15px_rgba(255, 124, 32, 0.4)]"
//                     : "border-slate-700"}
//                 `}
//               >
//                 <div className="flex justify-between items-start">

//                 {/* Header */}
//                   <div>
//                     <h3 className="text-lg text-white font-semibold">
//                       {customerName}
//                     </h3>

//                     <p className="text-gray-400 text-sm">
//                       {new Date(orderDate).toLocaleString()}
//                     </p>

//                     <span
//                       className={`
//                         inline-block mt-3 px-3 py-1 text-xs font-semibold rounded-full 
//                         ${order.status === "pending" ? "bg-blue-600/30 text-blue-300" : ""}
//                         ${order.status === "shipped" ? "bg-yellow-500/30 text-yellow-300" : ""}
//                         ${order.status === "delivered" ? "bg-green-500/30 text-green-300" : ""}
//                       `}
//                     >
//                       {order.status.toUpperCase()}
//                     </span>
//                   </div>

//                   {/* Right side */}
//                   <div className="text-right">
//                     <p className="text-orange-400 font-bold text-xl">
//                       ₹{Number(order.total || 0).toLocaleString()}
//                     </p>

//                     {next ? (
//                       <button
//                         onClick={() => handleAdvance(order.id)}
//                         className="mt-3 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm flex items-center gap-2 transition-all"
//                       >
//                         Advance to {next}
//                       </button>
//                     ) : (
//                       <p className="mt-3 px-3 py-1 text-sm rounded-lg bg-green-700/40 text-green-400">
//                         ✔ Delivered
//                       </p>
//                     )}
//                   </div>
//                 </div>

//                 {/* Buttons */}
//                 <div className="flex gap-3 mt-4">
//                   <button
//                     onClick={() => toggleExpand(order.id)}
//                     className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm flex items-center gap-2"
//                   >
//                       {expanded === order.id ? "Hide Details" : "View Details"}
//                   </button>

//                   <button
//                     onClick={() => handleDelete(order.id)}
//                     className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm flex items-center gap-2"
//                   >
//                        Delete
//                   </button>
//                 </div>

//                 {/* Expanded order items */}
//                 {expanded === order.id && (
//                   <div className="mt-5 border-t border-slate-700 pt-4">
//                     <h4 className="text-white font-semibold mb-3">
//                       Order Items
//                     </h4>

//                     {order.items?.map((item, index) => (
//                       <div
//                         key={index}
//                         className="flex justify-between bg-slate-700/40 p-3 rounded-lg text-sm mb-2"
//                       >
//                         <span className="text-gray-300">{item.name}</span>
//                         <span className="text-gray-400">
//                           ₹{item.price} × {item.quantity} = ₹
//                           {(item.price * item.quantity).toLocaleString()}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }











import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/order";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error(err));
  }, []);

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
            {orders.map((order, idx) => (
              <tr key={idx} className="border-b">
                <td className="py-2 px-4">{order.customerName}</td>
                <td className="py-2 px-4">{new Date(order.date).toLocaleString()}</td>
                <td className="py-2 px-4">₹{order.amount}</td>
                <td className={`py-2 px-4 font-semibold ${order.status === "DELIVERED" ? "text-green-600" : "text-red-600"}`}>
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
