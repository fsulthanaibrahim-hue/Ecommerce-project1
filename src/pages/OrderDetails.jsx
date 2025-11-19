import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Truck, Package, CheckCircle, XCircle, Calendar } from "lucide-react";

const OrderDetail = () => {
  const { orderId } = useParams(); 
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/order/${orderId}`)
      .then((res) => res.json())
      .then((data) => setOrder(data))
      .catch((err) => console.error("Error fetching order:", err));
  }, [orderId]);

  if (!order) {
    return <p className="text-center mt-10">Loading order details...</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Order Details</h2>
      <div className="border p-5 rounded-xl shadow-sm bg-white">
        <div className="flex gap-4 mb-6">
          <img
            src={order.products[0].image}
            alt={order.products[0].name}
            className="w-24 h-24 object-cover rounded-md border"
          />
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{order.products[0].name}</h3>
            <p className="text-gray-600">₹{order.products[0].price.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-2">
              Order ID: <span className="font-medium">{order.id}</span>
            </p>
            <p className="text-sm text-gray-500">
              Current Status: <span className="font-medium">{order.status}</span>
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Calendar size={20} className="text-gray-500" />
            <span>
              Ordered On: <strong>{order.date || "N/A"}</strong>
            </span>
          </div>
          {order.packedDate && (
            <div className="flex items-center gap-2">
              <Package size={20} className="text-orange-600" />
              <span>
                Packed On: <strong>{order.packedDate}</strong>
              </span>
            </div>
          )}
          {order.shippedDate && (
            <div className="flex items-center gap-2">
              <Truck size={20} className="text-blue-600" />
              <span>
                Shipped On: <strong>{order.shippedDate}</strong>
              </span>
            </div>
          )}
          {order.deliveredDate && (
            <div className="flex items-center gap-2">
              <CheckCircle size={20} className="text-green-600" />
              <span>
                Delivered On: <strong>{order.deliveredDate}</strong>
              </span>
            </div>
          )}
          {order.status === "Cancelled" && (
            <div className="flex items-center gap-2">
              <XCircle size={20} className="text-red-600" />
              <span>
                Cancelled On: <strong>{order.cancelledDate || "N/A"}</strong>
              </span>
            </div>
          )}
        </div>

        <Link
          to="/orders"
          className="mt-6 inline-block text-blue-600 underline"
        >
          ← Back to Orders
        </Link>
      </div>
    </div>
  );
};

export default OrderDetail;
