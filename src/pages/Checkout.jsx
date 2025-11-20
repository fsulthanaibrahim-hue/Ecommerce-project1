import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import toast, { Toaster } from "react-hot-toast";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );

  const profileAddress = location.state?.address || loggedUser.address || {};

  const [formData, setFormData] = useState({
    fullname: loggedUser.name || "",
    email: loggedUser.email || "",
    address: profileAddress.address || "",
    city: profileAddress.city || "",
    state: profileAddress.state || "",
    pinCode: profileAddress.pincode || "",
    country: profileAddress.country || "India",
    paymentMethod: "cod",
  });

  useEffect(() => {
    if (!loggedUser?.id) {
      toast.error("Please login first!");
      navigate("/login");
    }
  }, [loggedUser, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      toast.error("Cart is empty!");
      return;
    }

    const newOrder = {
      id: uuidv4(),
      userId: loggedUser.id,
      products: cartItems,
      status: "Pending",
      date: new Date().toLocaleString(),
      timestamps: { Pending: new Date().toLocaleString() },
      total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),

      ShippingAddress: { 
        fullname: formData.fullname,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pinCode: formData.pinCode,
        country: formData.country,  
      }, 
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    localStorage.setItem("orders", JSON.stringify([...existingOrders, newOrder]));

    localStorage.removeItem("cartItems");
    setCartItems([]);

    toast.success("Order placed successfully!");
    setTimeout(() => navigate("/orders"), 1000);
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Toaster position="top-right" />
      <h2 className="text-3xl font-bold mb-6 text-center">Checkout</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="border p-4 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Billing Information</h3>

          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            className="w-full p-2 border rounded mb-3"
            value={formData.fullname}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 border rounded mb-3"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="w-full p-2 border rounded mb-3"
            value={formData.address}
            onChange={handleChange}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            className="w-full p-2 border rounded mb-3"
            value={formData.city}
            onChange={handleChange}
          />
          <input 
            type="text"
            name="state"
            placeholder="State"
            className="w-full p-2 border rounded mb-3"
            value={formData.state}
            onChange={handleChange}
          />  
          <input
            type="text"
            name="pinCode"
            placeholder="Pin Code"
            className="w-full p-2 border rounded mb-3"
            value={formData.pinCode}
            onChange={handleChange}
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            className="w-full p-2 border rounded mb-3"
            value={formData.country}
            onChange={handleChange}
          />
        </div>

        <div className="border p-4 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

          {cartItems.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div className="border-t pt-2 flex justify-between font-bold">
                <span>Total:</span>
                <span>₹{totalAmount.toLocaleString()}</span>
              </div>
            </div>
          )}

          <div className="mt-4">
            <h4 className="font-semibold mb-2">Payment Method</h4>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="cod">Cash on Delivery</option>
              <option value="card">Credit/Debit Card</option>
              <option value="upi">UPI</option>
            </select>
          </div>

          <button
            className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>

        </div>
      </div>
    </div>
  );
};

export default Checkout;
