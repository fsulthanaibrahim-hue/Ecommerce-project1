
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/CartSlice";
import toast, { Toaster } from "react-hot-toast";
import { ShoppingBag, Truck, CreditCard, Shield } from "lucide-react";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems"))?.map(item => ({
      ...item,
      quantity: item.quantity || 1,
      price: item.price || 0,
    })) || []
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

  const adjustQuantity = (id, value) => {
    const updated = cartItems.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + value) }
        : item
    );
    setCartItems(updated);
    localStorage.setItem("cartItems", JSON.stringify(updated));
  };

  const handlePlaceOrder = () => {
    if (!cartItems.length) {
      toast.error("Cart is empty!");
      return;
    }

    // Validate form
    if (!formData.fullname || !formData.email || !formData.address || !formData.city || !formData.state || !formData.pinCode) {
      toast.error("Please fill all required fields!");
      return;
    }

    const newOrder = {
      id: uuidv4(),
      userId: loggedUser.id,
      products: cartItems,
      status: "Pending",
      date: new Date().toLocaleString(),
      timestamps: { Pending: new Date().toLocaleString() },
      total: cartItems.reduce(
        (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
        0
      ),
      ShippingAddress: { ...formData },
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    localStorage.setItem("orders", JSON.stringify([...existingOrders, newOrder]));

    dispatch(clearCart());
    localStorage.removeItem("cartItems");
    setCartItems([]);

    toast.success("Order placed successfully!");
    setTimeout(() => navigate("/orders"), 1000);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );
  const shipping = subtotal > 500 ? 0 : 50;
  const totalAmount = subtotal + shipping;

  return (
    <div className="bg-gray-50 min-h-screen py-8 mt-16">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600">Complete your order</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-6">
                <Truck size={24} className="text-gray-700" />
                <h2 className="text-xl font-semibold text-gray-900">Shipping Address</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name 
                  </label>
                  <input
                    name="fullname"
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.fullname}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address 
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address 
                  </label>
                  <input
                    name="address"
                    type="text"
                    placeholder="House no., Street, Area"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City 
                  </label>
                  <input
                    name="city"
                    type="text"
                    placeholder="City"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State 
                  </label>
                  <input
                    name="state"
                    type="text"
                    placeholder="State"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    PIN Code 
                  </label>
                  <input
                    name="pinCode"
                    type="text"
                    placeholder="PIN Code"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.pinCode}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country 
                  </label>
                  <input
                    name="country"
                    type="text"
                    placeholder="Country"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-6">
                <CreditCard size={24} className="text-gray-700" />
                <h2 className="text-xl font-semibold text-gray-900">Payment Method</h2>
              </div>

              <div className="space-y-3">
                <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 transition">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === "cod"}
                    onChange={handleChange}
                    className="mr-3"
                  />
                  <div>
                    <p className="font-medium text-gray-900">Cash on Delivery</p>
                    <p className="text-sm text-gray-500">Pay when you receive</p>
                  </div>
                </label>

                <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 transition">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === "card"}
                    onChange={handleChange}
                    className="mr-3"
                  />
                  <div>
                    <p className="font-medium text-gray-900">Credit / Debit Card</p>
                    <p className="text-sm text-gray-500">Secure payment gateway</p>
                  </div>
                </label>

                <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 transition">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={formData.paymentMethod === "upi"}
                    onChange={handleChange}
                    className="mr-3"
                  />
                  <div>
                    <p className="font-medium text-gray-900">UPI</p>
                    <p className="text-sm text-gray-500">Pay via UPI apps</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

              {cartItems.length === 0 ? (
                <div className="bg-gray-50 p-6 text-center rounded-lg text-gray-500">
                  Your cart is empty
                </div>
              ) : (
                <>
                  {/* Cart Items */}
                  <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-4 pb-4 border-b last:border-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-contain bg-gray-50 rounded"
                        />
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-gray-900 mb-2">
                            {item.name || "Unnamed Product"}
                          </h3>
                          <div className="flex items-center gap-3 mb-2">
                            <button
                              onClick={() => adjustQuantity(item.id, -1)}
                              className="w-7 h-7 border border-gray-300 rounded flex items-center justify-center text-gray-600 hover:bg-gray-100"
                            >
                              -
                            </button>
                            <span className="text-sm font-medium">{item.quantity}</span>
                            <button
                              onClick={() => adjustQuantity(item.id, 1)}
                              className="w-7 h-7 border border-gray-300 rounded flex items-center justify-center text-gray-600 hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>
                          <p className="text-base font-semibold text-gray-900">
                            ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-4 py-6 border-t border-b mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Subtotal</span>
                      <span className="font-semibold text-gray-900">₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Shipping</span>
                      <span className="font-semibold">
                        {shipping === 0 ? (
                          <span className="text-green-600">FREE</span>
                        ) : (
                          <span className="text-gray-900">₹{shipping}</span>
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-xl font-bold pt-2">
                      <span>Total</span>
                      <span>₹{totalAmount.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Place Order Button */}
                  <button
                    onClick={handlePlaceOrder}
                    className="w-full bg-black text-white py-4 rounded-lg text-base font-semibold hover:bg-gray-800 transition mb-6"
                  >
                    Place Order
                  </button>

                  {/* Trust Badges */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Shield size={18} className="text-green-600" />
                      <span>Secure checkout</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Truck size={18} className="text-blue-600" />
                      <span>Free shipping</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;