// import React, { useEffect, useState } from "react";
// import { Truck, Package, CheckCircle, XCircle, Calendar } from "lucide-react";
// import toast, { Toaster } from "react-hot-toast";

// const Orders = () => {
//   const loggedUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};
//   const [orders, setOrders] = useState([]);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   const stages = ["Pending", "Packed", "Shipped", "Delivered"];
//   const returnStages = ["Return Requested", "Return Picked Up", "Return Received", "Refund Processed"];
  
//   const stageIcons = {
//     Pending: Calendar,
//     Packed: Package,
//     Shipped: Truck,
//     Delivered: CheckCircle,
//     Cancelled: XCircle,
//     Returned: XCircle,
//     "Return Requested": XCircle,
//     "Return Picked Up": Truck,
//     "Return Received": Package,
//     "Refund Processed": CheckCircle,
//   };

//   // Load orders from localStorage (DESCENDING ORDER FIXED ✓)
//   useEffect(() => {
//       const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
//     if (!loggedUser?.id) {
//       setOrders([]);
//       return;
//     }

//     const allOrders = JSON.parse(localStorage.getItem("orders")) || [];

//     const userOrders = allOrders
//       .filter((o) => o.userId === loggedUser.id && o.items?.length > 0)
//       .map((o) => ({
//         ...o,
//         id: o.id || `order-${Date.now()}-${Math.random()}`,
//         products: o.items,
//         date: o.orderDate || o.date || new Date().toLocaleString(),
//         status: o.status || "Pending",
//         isReturning: o.isReturning || false,
//         timestamps:
//           o.timestamps || {
//             Pending: o.orderDate || o.date || new Date().toLocaleString(),
//           },
//       }))
//       .sort((a, b) => new Date(b.date) - new Date(a.date)); // DESCENDING 

//     setOrders(userOrders);
//   }, []);

//   // Auto-progress status every 3 sec
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setOrders((prevOrders) => {
//         const updatedOrders = prevOrders.map((order) => {
//           if (["Cancelled", "Refund Processed"].includes(order.status))
//             return order;

//           // Handle return process (ORANGE LINE)
//           if (order.isReturning) {
//             const returnIndex = returnStages.indexOf(order.status);
//             const nextReturn = returnStages[returnIndex + 1];
//             if (!nextReturn) return order;

//             return {
//               ...order,
//               status: nextReturn,
//               timestamps: {
//                 ...order.timestamps,
//                 [nextReturn]: new Date().toLocaleString(),
//               },
//             };
//           }

//           // Handle normal delivery process (GREEN LINE)
//           const index = stages.indexOf(order.status);
//           const next = stages[index + 1];
//           if (!next) return order;

//           return {
//             ...order,
//             status: next,
//             timestamps: {
//               ...order.timestamps,
//               [next]: new Date().toLocaleString(),
//             },
//           };
//         });

//         localStorage.setItem("orders", JSON.stringify(updatedOrders));
//         return updatedOrders;
//       });
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);

//   // Cancel Order
//   const cancelOrder = (orderId) => {
//     setOrders((prev) => {
//       const updated = prev.map((order) =>
//         order.id === orderId
//           ? {
//               ...order,
//               status: "Cancelled",
//               timestamps: {
//                 ...order.timestamps,
//                 Cancelled: new Date().toLocaleString(),
//               },
//             }
//           : order
//       );
//       localStorage.setItem("orders", JSON.stringify(updated));
//       toast.error("Order Cancelled!");
//       return updated;
//     });
//   };

//   // Return Order (START ORANGE TIMELINE)
//   const returnOrder = (orderId) => {
//     setOrders((prev) => {
//       const updated = prev.map((order) =>
//         order.id === orderId
//           ? {
//               ...order,
//               status: "Return Requested",
//               isReturning: true,
//               timestamps: {
//                 ...order.timestamps,
//                 "Return Requested": new Date().toLocaleString(),
//               },
//             }
//           : order
//       );
//       localStorage.setItem("orders", JSON.stringify(updated));
//       toast.success("Return Initiated!");
//       return updated;
//     });
//   };

//   // Clear Cancelled Orders
//   const clearCancelledOrders = () => {
//     const updated = orders.filter((o) => o.status !== "Cancelled");
//     setOrders(updated);
//     localStorage.setItem("orders", JSON.stringify(updated));
//     toast.success("Cancelled Orders Cleared!");
//   };

//   return (
//     <div className="p-6 max-w-6xl mx-auto bg-gray-50 min-h-screen">
//       <Toaster position="top-right" />
      
//       <div className="mb-8 mt-20">
//         <h2 className="text-4xl font-bold text-gray-900 mb-2">📦 My Orders</h2>
//         <p className="text-gray-600">View and manage your order history</p>
//       </div>

//       <div className="flex justify-end mb-6">
//         <button
//           onClick={clearCancelledOrders}
//           className="bg-red-600 text-white px-6 py-2.5 rounded-lg hover:bg-red-700 transition-colors shadow-sm font-medium"
//         >
//           Clear Cancelled Orders
//         </button>
//       </div>

//       {orders.length === 0 ? (
//         <div className="text-center py-20 bg-white rounded-xl shadow-sm">
//           <Package size={64} className="mx-auto text-gray-300 mb-4" />
//           <p className="text-gray-500 text-lg">No orders found.</p>
//         </div>
//       ) : (
//         orders.map((order) => {
//           const isReturning = order.isReturning;
//           const currentStages = isReturning ? returnStages : stages;
//           const lastIndex =
//             order.status === "Cancelled"
//               ? -1
//               : currentStages.indexOf(order.status);
//           const progressColor = isReturning ? "orange" : "green";

//           return (
//             <div
//               key={order.id}
//               className="border border-gray-200 p-8 rounded-2xl mb-8 shadow-sm bg-white hover:shadow-md transition-shadow"
//             >
//          {/* Header Section */}
//               <div className="flex justify-between items-start mb-6 pb-4 border-b border-gray-100">
//                 <div>
//                   <p className="text-sm text-gray-500 mb-1">Order ID: {order.id}</p>
//                   <p className="text-sm text-gray-500">Placed on {order.date}</p>
//                 </div>
//                 <div className="text-right">
//                   <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold ${
//                     order.status === "Delivered" 
//                       ? "bg-green-100 text-green-700"
//                       : order.status === "Cancelled"
//                       ? "bg-red-100 text-red-700"
//                       : isReturning
//                       ? "bg-orange-100 text-orange-700"
//                       : "bg-blue-100 text-blue-700"
//                   }`}>
//                     {order.status}
//                   </span>
//                 </div>
//               </div>

//               {/* Product Section */}
//               <div className="flex flex-col md:flex-row gap-6 mb-8 items-start">
//                 <div className="relative">
//                   <img
//                     src={order.products[0].image}
//                     alt={order.products[0].name}
//                     className="w-32 h-32 object-cover rounded-xl border border-gray-200 shadow-sm"
//                   />
//                   {order.status === "Cancelled" && (
//                     <div className="absolute inset-0 bg-black bg-opacity-40 rounded-xl flex items-center justify-center">
//                       <XCircle className="text-white" size={40} />
//                     </div>
//                   )}
//                 </div>
//                 <div className="flex-1">
//                   <h3
//                     className={`text-xl font-bold mb-2 ${
//                       order.status === "Cancelled"
//                         ? "line-through text-gray-400"
//                         : "text-gray-900"
//                     }`}
//                   >
//                     {order.products[0].name}
//                   </h3>

//                   <p className="text-2xl font-bold text-gray-900 mb-3">
//                     ₹{order.products[0].price.toLocaleString()}
//                   </p>

//                   {order.timestamps.Delivered && !isReturning && (
//                     <p className="text-sm text-green-600 font-medium mb-1">
//                       ✓ Delivered on {order.timestamps.Delivered}
//                     </p>
//                   )}

//                   {order.timestamps.Cancelled && (
//                     <p className="text-sm text-red-600 font-medium">
//                       ✗ Cancelled on {order.timestamps.Cancelled}
//                     </p>
//                   )}

//                   {order.timestamps["Refund Processed"] && (
//                     <p className="text-sm text-orange-600 font-medium">
//                       ✓ Refund Processed on {order.timestamps["Refund Processed"]}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               {/* Timeline Section - ORANGE for Return, GREEN for Delivery */}
//               {order.status !== "Cancelled" && (
//                 <div className="bg-gray-50 rounded-xl p-6 mb-6">
//                   <h4 className="text-sm font-semibold text-gray-700 mb-6 uppercase tracking-wide">
//                     {isReturning ? "🔄 Return Progress" : "📦 Order Progress"}
//                   </h4>
//                   <div className="relative flex flex-col md:flex-row items-center justify-between">
//                     {/* Progress Line Background - Desktop */}
//                     <div className="absolute top-6 left-8 right-8 h-1 bg-gray-200 hidden md:block rounded-full"></div>
                    
//                     {/* Progress Line Active - Desktop */}
//                     <div
//                       className={`absolute top-6 left-8 h-1 ${
//                         progressColor === "orange" ? "bg-orange-500" : "bg-green-500"
//                       } hidden md:block rounded-full transition-all duration-500`}
//                       style={{
//                         width: `calc(${
//                           lastIndex >= 0
//                             ? (lastIndex / (currentStages.length - 1)) * 100
//                             : 0
//                         }% - 2rem)`,
//                       }}
//                     ></div>

//                     {/* Progress Line Background - Mobile */}
//                     <div className="absolute left-6 top-0 bottom-0 w-1 bg-gray-200 md:hidden rounded-full"></div>
                    
//                     {/* Progress Line Active - Mobile */}
//                     <div
//                       className={`absolute left-6 top-0 w-1 ${
//                         progressColor === "orange" ? "bg-orange-500" : "bg-green-500"
//                       } md:hidden rounded-full transition-all duration-500`}
//                       style={{
//                         height: `${
//                           lastIndex >= 0
//                             ? ((lastIndex + 1) / currentStages.length) * 100
//                             : 0
//                         }%`,
//                       }}
//                     ></div>

//                     {currentStages.map((stage, idx) => {
//                       const Icon = stageIcons[stage];
//                       const completed = idx <= lastIndex;
//                       const current = idx === lastIndex;

//                       return (
//                         <div
//                           key={idx}
//                           className="flex flex-row md:flex-col items-center md:items-center mb-8 md:mb-0 relative z-10 gap-4 md:gap-0"
//                         >
//                           <div
//                             className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-300 shadow-sm ${
//                               completed
//                                 ? progressColor === "orange"
//                                   ? "bg-orange-500 border-orange-500"
//                                   : "bg-green-500 border-green-500"
//                                 : current
//                                 ? progressColor === "orange"
//                                   ? "bg-orange-100 border-orange-500 animate-pulse"
//                                   : "bg-green-100 border-green-500 animate-pulse"
//                                 : "bg-white border-gray-300"
//                             }`}
//                           >
//                             <Icon
//                               size={24}
//                               className={`${
//                                 completed
//                                   ? "text-white"
//                                   : current
//                                   ? progressColor === "orange"
//                                     ? "text-orange-600"
//                                     : "text-green-600"
//                                   : "text-gray-400"
//                               }`}
//                             />
//                           </div>
//                           <div className="text-left md:text-center mt-0 md:mt-3">
//                             <span className={`text-sm font-semibold block ${
//                               completed || current ? "text-gray-900" : "text-gray-400"
//                             }`}>
//                               {stage}
//                             </span>
//                             {order.timestamps[stage] && (
//                               <span className="text-xs text-gray-500 mt-1 block">
//                                 {order.timestamps[stage]}
//                               </span>
//                             )}
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}

//               {/* Action Buttons */}
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <button
//                   className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm flex-1"
//                   onClick={() => {
//                     setSelectedOrder(order);
//                     setShowModal(true);
//                   }}
//                 >
//                   View Details
//                 </button>

//                 {order.status !== "Delivered" &&
//                   order.status !== "Cancelled" &&
//                   !isReturning && (
//                     <button
//                       className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors font-medium shadow-sm flex-1"
//                       onClick={() => cancelOrder(order.id)}
//                     >
//                       Cancel Order
//                     </button>
//                   )}

//                 {order.status === "Delivered" && !isReturning && (
//                   <button
//                     className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium shadow-sm flex-1"
//                     onClick={() => returnOrder(order.id)}
//                   >
//                     Return Order
//                   </button>
//                 )}
//               </div>
//             </div>
//           );
//         })
//       )}

//       {/* MODAL */}
//       {showModal && selectedOrder && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl p-8 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
//             <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
//               <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
//               <button
//                 className="text-gray-400 hover:text-gray-600 transition-colors"
//                 onClick={() => setShowModal(false)}
//               >
//                 <XCircle size={28} />
//               </button>
//             </div>

//             {/* Order Status Badge */}
//             <div className="mb-6">
//               <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
//                 selectedOrder.status === "Delivered" 
//                   ? "bg-green-100 text-green-700"
//                   : selectedOrder.status === "Cancelled"
//                   ? "bg-red-100 text-red-700"
//                   : selectedOrder.isReturning
//                   ? "bg-orange-100 text-orange-700"
//                   : "bg-blue-100 text-blue-700"
//               }`}>
//                 {selectedOrder.status}
//               </span>
//             </div>
//    {/* Products List */}
//             <div className="space-y-4 mb-6">
//               <h3 className="text-lg font-semibold text-gray-900">Items</h3>
//               {selectedOrder.products.map((prod, i) => (
//                 <div
//                   key={i}
//                   className="flex items-center gap-4 border border-gray-200 p-4 rounded-xl hover:shadow-md transition-shadow bg-gray-50"
//                 >
//                   <img
//                     src={prod.image}
//                     alt={prod.name}
//                     className="w-20 h-20 object-cover rounded-lg border border-gray-200"
//                   />
//                   <div className="flex-1">
//                     <p className="font-semibold text-gray-900 mb-1">{prod.name}</p>
//                     <p className="text-xl font-bold text-gray-900">
//                       ₹{prod.price.toLocaleString()}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Order Information */}
//             <div className="bg-gray-50 rounded-xl p-6 space-y-3">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Information</h3>
//               <div className="grid grid-cols-1 gap-3 text-sm">
//                 <div className="flex justify-between py-2 border-b border-gray-200">
//                   <span className="text-gray-600 font-medium">Order ID:</span>
//                   <span className="text-gray-900 font-mono">{selectedOrder.id}</span>
//                 </div>
//                 <div className="flex justify-between py-2 border-b border-gray-200">
//                   <span className="text-gray-600 font-medium">Placed On:</span>
//                   <span className="text-gray-900">{selectedOrder.date}</span>
//                 </div>
//                 <div className="flex justify-between py-2 border-b border-gray-200">
//                   <span className="text-gray-600 font-medium">Status:</span>
//                   <span className="text-gray-900 font-semibold">{selectedOrder.status}</span>
//                 </div>

//                 {selectedOrder.timestamps.Delivered && (
//                   <div className="flex justify-between py-2 border-b border-gray-200">
//                     <span className="text-gray-600 font-medium">Delivered On:</span>
//                     <span className="text-green-600 font-semibold">
//                       {selectedOrder.timestamps.Delivered}
//                     </span>
//                   </div>
//                 )}
                
//                 {selectedOrder.timestamps.Cancelled && (
//                   <div className="flex justify-between py-2 border-b border-gray-200">
//                     <span className="text-gray-600 font-medium">Cancelled On:</span>
//                     <span className="text-red-600 font-semibold">
//                       {selectedOrder.timestamps.Cancelled}
//                     </span>
//                   </div>
//                 )}

//                 {selectedOrder.timestamps["Return Requested"] && (
//                   <div className="flex justify-between py-2 border-b border-gray-200">
//                     <span className="text-gray-600 font-medium">Return Requested:</span>
//                     <span className="text-orange-600 font-semibold">
//                       {selectedOrder.timestamps["Return Requested"]}
//                     </span>
//                   </div>
//                 )}

//                 {selectedOrder.timestamps["Return Picked Up"] && (
//                   <div className="flex justify-between py-2 border-b border-gray-200">
//                     <span className="text-gray-600 font-medium">Return Picked Up:</span>
//                     <span className="text-orange-600 font-semibold">
//                       {selectedOrder.timestamps["Return Picked Up"]}
//                     </span>
//                   </div>
//                 )}

//                 {selectedOrder.timestamps["Return Received"] && (
//                   <div className="flex justify-between py-2 border-b border-gray-200">
//                     <span className="text-gray-600 font-medium">Return Received:</span>
//                     <span className="text-orange-600 font-semibold">
//                       {selectedOrder.timestamps["Return Received"]}
//                     </span>
//                   </div>
//                 )}

//                 {selectedOrder.timestamps["Refund Processed"] && (
//                   <div className="flex justify-between py-2">
//                     <span className="text-gray-600 font-medium">Refund Processed:</span>
//                     <span className="text-orange-600 font-semibold">
//                       {selectedOrder.timestamps["Refund Processed"]}
//                     </span>
//                   </div>
//                 )}
//               </div>
//             </div>

//             <button
//               className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold shadow-sm"
//               onClick={() => setShowModal(false)}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Orders;




















import React, { useEffect, useState } from "react";
import { Truck, Package, CheckCircle, XCircle, Calendar } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const stages = ["Pending", "Packed", "Shipped", "Delivered"];
  const returnStages = ["Return Requested", "Return Picked Up", "Return Received", "Refund Processed"];

  const stageIcons = {
    Pending: Calendar,
    Packed: Package,
    Shipped: Truck,
    Delivered: CheckCircle,
    Cancelled: XCircle,
    Returned: XCircle,
    "Return Requested": XCircle,
    "Return Picked Up": Truck,
    "Return Received": Package,
    "Refund Processed": CheckCircle,
  };

  // Load orders from localStorage
  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};
    if (!loggedUser.id) return;

    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];

    const userOrders = allOrders
      .filter((o) => o.userId === loggedUser.id && o.items?.length > 0)
      .map((o) => ({
        ...o,
        id: o.id || `order-${Date.now()}-${Math.random()}`,
        products: o.items,
        date: o.orderDate || o.date || new Date().toLocaleString(),
        status: o.status || "Pending",
        isReturning: o.isReturning || false,
        timestamps: o.timestamps || { Pending: o.orderDate || o.date || new Date().toLocaleString() },
      }))
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    setOrders(userOrders);
  }, []);

  // Auto-progress status every 3 sec
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders((prevOrders) => {
        const updatedOrders = prevOrders.map((order) => {
          if (["Cancelled", "Refund Processed"].includes(order.status)) return order;

          const currentStages = order.isReturning ? returnStages : stages;
          const currentIndex = currentStages.indexOf(order.status);
          const nextStage = currentStages[currentIndex + 1];
          if (!nextStage) return order;

          return {
            ...order,
            status: nextStage,
            timestamps: {
              ...order.timestamps,
              [nextStage]: new Date().toLocaleString(),
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
    const updated = orders.map((order) =>
      order.id === orderId
        ? { ...order, status: "Cancelled", timestamps: { ...order.timestamps, Cancelled: new Date().toLocaleString() } }
        : order
    );
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
    toast.error("Order Cancelled!");
  };

  const returnOrder = (orderId) => {
    const updated = orders.map((order) =>
      order.id === orderId
        ? {
            ...order,
            status: "Return Requested",
            isReturning: true,
            timestamps: { ...order.timestamps, "Return Requested": new Date().toLocaleString() },
          }
        : order
    );
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
    toast.success("Return Initiated!");
  };

  const clearCancelledOrders = () => {
    const updated = orders.filter((o) => o.status !== "Cancelled");
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
    toast.success("Cancelled Orders Cleared!");
  };

  const TimestampRow = ({ stage, timestamp }) => (
    <div className="flex justify-between py-2 border-b border-gray-200">
      <span className="text-gray-600 font-medium">{stage}:</span>
      <span className={`${stage.includes("Return") ? "text-orange-600" : stage === "Delivered" ? "text-green-600" : stage === "Cancelled" ? "text-red-600" : "text-gray-900"} font-semibold`}>
        {timestamp}
      </span>
    </div>
  );

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-50 min-h-screen">
      <Toaster position="top-right" />
      <div className="mb-8 mt-20">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">📦 My Orders</h2>
        <p className="text-gray-600">View and manage your order history</p>
      </div>

      <div className="flex justify-end mb-6">
        <button onClick={clearCancelledOrders} className="bg-red-600 text-white px-6 py-2.5 rounded-lg hover:bg-red-700 transition-colors shadow-sm font-medium">
          Clear Cancelled Orders
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl shadow-sm">
          <Package size={64} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">No orders found.</p>
        </div>
      ) : (
        orders.map((order) => {
          const isReturning = order.isReturning;
          const currentStages = isReturning ? returnStages : stages;
          const lastIndex = order.status === "Cancelled" ? -1 : currentStages.indexOf(order.status);
          const progressColor = isReturning ? "orange" : "green";

          return (
            <div key={order.id} className="border border-gray-200 p-8 rounded-2xl mb-8 shadow-sm bg-white hover:shadow-md transition-shadow">
              {/* Header */}
              <div className="flex justify-between items-start mb-6 pb-4 border-b border-gray-100">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Order ID: {order.id}</p>
                  <p className="text-sm text-gray-500">Placed on {order.date}</p>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Cancelled"
                        ? "bg-red-100 text-red-700"
                        : isReturning
                        ? "bg-orange-100 text-orange-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Product */}
              <div className="flex flex-col md:flex-row gap-6 mb-8 items-start">
                <div className="relative">
                  <img src={order.products[0].image} alt={order.products[0].name} className="w-32 h-32 object-cover rounded-xl border border-gray-200 shadow-sm" />
                  {order.status === "Cancelled" && (
                    <div className="absolute inset-0 bg-black bg-opacity-40 rounded-xl flex items-center justify-center">
                      <XCircle className="text-white" size={40} />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className={`text-xl font-bold mb-2 ${order.status === "Cancelled" ? "line-through text-gray-400" : "text-gray-900"}`}>
                    {order.products[0].name}
                  </h3>
                  <p className="text-2xl font-bold text-gray-900 mb-3">₹{order.products[0].price.toLocaleString()}</p>
                  {order.timestamps.Delivered && !isReturning && <p className="text-sm text-green-600 font-medium mb-1">✓ Delivered on {order.timestamps.Delivered}</p>}
                  {order.timestamps.Cancelled && <p className="text-sm text-red-600 font-medium">✗ Cancelled on {order.timestamps.Cancelled}</p>}
                  {order.timestamps["Refund Processed"] && <p className="text-sm text-orange-600 font-medium">✓ Refund Processed on {order.timestamps["Refund Processed"]}</p>}
                </div>
              </div>

              {/* Timeline */}
              {order.status !== "Cancelled" && (
                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-6 uppercase tracking-wide">{isReturning ? "🔄 Return Progress" : "📦 Order Progress"}</h4>
                  <div className="relative flex flex-col md:flex-row items-center justify-between">
                    <div className="absolute top-6 left-8 right-8 h-1 bg-gray-200 hidden md:block rounded-full"></div>
                    <div
                      className={`absolute top-6 left-8 h-1 ${progressColor === "orange" ? "bg-orange-500" : "bg-green-500"} hidden md:block rounded-full transition-all duration-500`}
                      style={{ width: `calc(${lastIndex >= 0 ? (lastIndex / (currentStages.length - 1)) * 100 : 0}% - 2rem)` }}
                    ></div>
                    <div className="absolute left-6 top-0 bottom-0 w-1 bg-gray-200 md:hidden rounded-full"></div>
                    <div
                      className={`absolute left-6 top-0 w-1 ${progressColor === "orange" ? "bg-orange-500" : "bg-green-500"} md:hidden rounded-full transition-all duration-500`}
                      style={{ height: `${lastIndex >= 0 ? ((lastIndex + 1) / currentStages.length) * 100 : 0}%` }}
                    ></div>

                    {currentStages.map((stage, idx) => {
                      const Icon = stageIcons[stage];
                      const completed = idx <= lastIndex;
                      const current = idx === lastIndex;
                      return (
                        <div key={idx} className="flex flex-row md:flex-col items-center md:items-center mb-8 md:mb-0 relative z-10 gap-4 md:gap-0">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-300 shadow-sm ${
                              completed ? (progressColor === "orange" ? "bg-orange-500 border-orange-500" : "bg-green-500 border-green-500") : current ? (progressColor === "orange" ? "bg-orange-100 border-orange-500 animate-pulse" : "bg-green-100 border-green-500 animate-pulse") : "bg-white border-gray-300"
                            }`}
                          >
                            <Icon size={24} className={`${completed ? "text-white" : current ? progressColor === "orange" ? "text-orange-600" : "text-green-600" : "text-gray-400"}`} />
                          </div>
                          <div className="text-left md:text-center mt-0 md:mt-3">
                            <span className={`text-sm font-semibold block ${completed || current ? "text-gray-900" : "text-gray-400"}`}>{stage}</span>
                            {order.timestamps[stage] && <span className="text-xs text-gray-500 mt-1 block">{order.timestamps[stage]}</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm flex-1"
                  onClick={() => {
                    setSelectedOrder(order);
                    setShowModal(true);
                  }}
                >
                  View Details
                </button>

                {order.status !== "Delivered" && order.status !== "Cancelled" && !isReturning && (
                  <button className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors font-medium shadow-sm flex-1" onClick={() => cancelOrder(order.id)}>
                    Cancel Order
                  </button>
                )}

                {order.status === "Delivered" && !isReturning && (
                  <button className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium shadow-sm flex-1" onClick={() => returnOrder(order.id)}>
                    Return Order
                  </button>
                )}
              </div>
            </div>
          );
        })
      )}

      {/* Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
              <button className="text-gray-400 hover:text-gray-600 transition-colors" onClick={() => setShowModal(false)}>
                <XCircle size={28} />
              </button>
            </div>

            {/* Status Badge */}
            <div className="mb-6">
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                selectedOrder.status === "Delivered"
                  ? "bg-green-100 text-green-700"
                  : selectedOrder.status === "Cancelled"
                  ? "bg-red-100 text-red-700"
                  : selectedOrder.isReturning
                  ? "bg-orange-100 text-orange-700"
                  : "bg-blue-100 text-blue-700"
              }`}>
                {selectedOrder.status}
              </span>
            </div>

            {/* Products */}
            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Items</h3>
              {selectedOrder.products.map((prod, i) => (
                <div key={i} className="flex items-center gap-4 border border-gray-200 p-4 rounded-xl hover:shadow-md transition-shadow bg-gray-50">
                  <img src={prod.image} alt={prod.name} className="w-20 h-20 object-cover rounded-lg border border-gray-200" />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 mb-1">{prod.name}</p>
                    <p className="text-xl font-bold text-gray-900">₹{prod.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Info */}
            <div className="bg-gray-50 rounded-xl p-6 space-y-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Information</h3>
              {["Order ID", "Placed On", "Status", "Delivered", "Cancelled", "Return Requested", "Return Picked Up", "Return Received", "Refund Processed"].map((stage) => {
                const key = stage.replace(/\s/g, "");
                const timestampKey = stage.includes("Return") || stage === "Delivered" || stage === "Cancelled" || stage === "Refund Processed" ? stage : null;
                const ts = timestampKey ? selectedOrder.timestamps[timestampKey] : null;
                if (timestampKey && !ts) return null;
                return <TimestampRow key={stage} stage={stage} timestamp={timestampKey ? ts : selectedOrder[key.toLowerCase().replace(" ", "")]} />;
              })}
            </div>

            <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold shadow-sm" onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
