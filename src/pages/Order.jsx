import React, { useEffect, useState } from "react";

const Orders = () => {
    const [order, setOrders] = useState([]);

    useEffect(() => {
        const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
        setOrders(storedOrders);
    }, []);

    return (
        <div className="p-8">
           <h1 className="txt-2xl font-bold mb-6">My Orders</h1>
           {orders.length === 0 ? (
            <p>No past purchases</p>
           ) : (
            <ul className="space-y-3">
                {orders.map((item, index) => (
                <li key={index} className="border p-3 rounded">
                   <p className="font-semibold">{item.name}</p>
                   <p>Category: {item.category}</p>
                   <p>Quantity: {item.quantity}</p>
                   <p>Price: ₹{item.price}</p>
                </li>
                ))}
            </ul>
           )}
        </div>
    );
};
export default Orders;



 