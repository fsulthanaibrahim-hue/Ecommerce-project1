// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { Truck, Package, CheckCircle, XCircle, Calendar } from "lucide-react";

// const OrderDetail = () => {
//   const { orderId } = useParams(); 
//   const [order, setOrder] = useState(null);

//   useEffect(() => {
//     fetch(`http://localhost:5000/order/${orderId}`)
//       .then((res) => res.json())
//       .then((data) => setOrder(data))
//       .catch((err) => console.error("Error fetching order:", err));
//   }, [orderId]);

//   if (!order) {
//     return <p className="text-center mt-10">Loading order details...</p>;
//   }

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h2 className="text-3xl font-bold mb-6 text-center">Order Details</h2>

//       <div className="border p-5 rounded-xl shadow-sm bg-white">
//         {order.products?.map((item, index) => (
//           <div key={index} className="flex gap-4 mb-6">
//             <img 
//               src={item.image}
//               alt={item.name}
//               className="w-24 h-24 object-cover rounded-md border"
//             />  
//            <div className="flex-1">
//             <h3 className="text-lg font-semibold">{item.name}</h3> 
//             <p className="text-gray-600">
//               ₹{item.price.toLocaleString()}
//             </p>
//             <p className="text-sm text-gray-500">
//               Qty: {item.quantity || 1}
//             </p>
//           </div>
//         </div>  
//       ))}

//       <div className="space-y-3">
//         <div className="flex items-center gap-2">
//           <Calendar size={20} className="text-gray-500" />
//           <span>
//             Ordered On: <strong>{order.date || "N/A"}</strong>
//           </span>
//         </div>

//         {order.packedDate && (
//           <div className="flex items-center gap-2">
//            <Package size={20} className="text-orange-600" />
//            <span>
//             Packed On: <strong>{order.packedDate}</strong>
//            </span> 
//           </div> 
//         )}

//         {order.shippedDate && (
//           <div className="flex items-center gap-2">
//            <Truck size={20} className="text-blue-600" />
//            <span>
//             Shipped On: <strong>{order.shippedDate}</strong>
//            </span> 
//           </div> 
//         )}

//         {order.deliveredDate && (
//           <div className="flex items-center gap-2">
//            <CheckCircle size={20} className="text-green-600" />
//            <span>
//             Delivered On: <strong>{order.deliveredDate}</strong>
//            </span> 
//           </div> 
//         )}

//         {order.status === "Cancelled" && (
//           <div className="flex items-center gap-2">
//             <XCircle size={20} className="text-red-600" />
//             <span>
//               Cancelled On: <strong>{order.cancelledDate || "N/A"}</strong>
//             </span>
//           </div>
//         )}
//       </div>

//       <div className="mt-6 border-t pt-4">
//         <h3 className="text-lg font-semibold mb-2">Shipping Address:</h3>
//           <p className="text-gray-700 leading-6">
//             {order.shippingAddress?.fullName && `${order.shippingAddress.fullName}, `}
//             {order.shippingAddress?.address && `${order.shippingAddress.address}, `}
//             {order.shippingAddress?.city && `${order.shippingAddress.city}, `}
//             {order.shippingAddress?.state && `${order.shippingAddress.state}, `}
//             {order.shippingAddress?.pincode && `${order.shippingAddress.pincode}, `}
//             {order.shippingAddress?.country}
//           </p>
//       </div>

//       <div className="mt-6 border-t pt-4">
//         <h3 className="text-lg font-semibold mb-1">Total Amount:</h3>
//           <p className="text-xl font-bold">
//             ₹{order.total.toLocaleString()}
//           </p>
//       </div>
      
//         {/* <div className="flex gap-4 mb-6">
//           <img
//             src={order.products[0].image}
//             alt={order.products[0].name}
//             className="w-24 h-24 object-cover rounded-md border"
//           /> */}
//           {/* <div className="flex-1">
//             <h3 className="text-lg font-semibold">{order.products[0].name}</h3>
//             <p className="text-gray-600">₹{order.products[0].price.toLocaleString()}</p>
//             <p className="text-sm text-gray-500 mt-2">
//               Order ID: <span className="font-medium">{order.id}</span>
//             </p>
//             <p className="text-sm text-gray-500">
//               Current Status: <span className="font-medium">{order.status}</span>
//             </p>
//           </div>
//         </div> */}

//         {/* <div className="space-y-3">
//           <div className="flex items-center gap-2">
//             <Calendar size={20} className="text-gray-500" />
//             <span>
//               Ordered On: <strong>{order.date || "N/A"}</strong>
//             </span>
//           </div>
//           {order.packedDate && (
//             <div className="flex items-center gap-2">
//               <Package size={20} className="text-orange-600" />
//               <span>
//                 Packed On: <strong>{order.packedDate}</strong>
//               </span>
//             </div>
//           )}
//           {order.shippedDate && (
//             <div className="flex items-center gap-2">
//               <Truck size={20} className="text-blue-600" />
//               <span>
//                 Shipped On: <strong>{order.shippedDate}</strong>
//               </span>
//             </div>
//           )}
//           {order.deliveredDate && (
//             <div className="flex items-center gap-2">
//               <CheckCircle size={20} className="text-green-600" />
//               <span>
//                 Delivered On: <strong>{order.deliveredDate}</strong>
//               </span>
//             </div>
//           )}
//           {order.status === "Cancelled" && (
//             <div className="flex items-center gap-2">
//               <XCircle size={20} className="text-red-600" />
//               <span>
//                 Cancelled On: <strong>{order.cancelledDate || "N/A"}</strong>
//               </span>
//             </div>
//           )}
//         </div> */}

//         <Link
//           to="/orders"
//           className="mt-6 inline-block text-blue-600 underline"
//         >
//           ← Back to Orders
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default OrderDetail;




import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Truck, Package, CheckCircle, XCircle, Calendar } from "lucide-react";

const OrderDetail = () => {
  const { orderId } = useParams(); 
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const selectedOrder = allOrders.find(o => o.id === orderId);
    setOrder(selectedOrder || null);
  }, [orderId]);

  if (!order) return <p className="text-center mt-10">Loading order details...</p>;

  const statusIcons = {
    Pending: Calendar,
    Packed: Package,
    Shipped: Truck,
    Delivered: CheckCircle,
    Cancelled: XCircle
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Order Details</h2>

      <div className="bg-white p-6 rounded-2xl shadow-lg border space-y-6">
        {order.products.map((item, idx) => (
          <div key={idx} className="flex gap-4 items-center">
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-md border"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-600">₹{item.price.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
            <p className="font-medium">
              ₹{(item.price * item.quantity).toLocaleString()}
            </p>
          </div>
        ))}

        {/* Status Timeline */}
        <div className="flex justify-between items-center mt-4">
          {Object.keys(statusIcons).map((stage) => {
            const Icon = statusIcons[stage];
            const completed = order.status === stage || stage === "Delivered";

            return (
              <div key={stage} className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${completed ? "bg-green-500 border-green-500 text-white" : "bg-white border-gray-300 text-gray-300"}`}>
                  <Icon size={24} />
                </div>
                <span className="text-sm mt-1 font-medium">{stage}</span>
              </div>
            );
          })}
        </div>

        {/* Shipping Address */}
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold mb-2">Shipping Address:</h3>
          <p className="text-gray-700 leading-6">
            {order.ShippingAddress?.fullname}, {order.ShippingAddress?.address}, {order.ShippingAddress?.city}, {order.ShippingAddress?.state}, {order.ShippingAddress?.pinCode}, {order.ShippingAddress?.country}
          </p>
        </div>

        {/* Total Amount */}
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold mb-1">Total Amount:</h3>
          <p className="text-xl font-bold">₹{order.total.toLocaleString()}</p>
        </div>

        <Link to="/orders" className="mt-6 inline-block text-blue-600 underline">
          ← Back to Orders
        </Link>
      </div>
    </div>
  );
};

export default OrderDetail;

