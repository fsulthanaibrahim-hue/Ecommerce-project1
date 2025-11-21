
// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { v4 as uuidv4 } from "uuid";
// import { useDispatch } from "react-redux";
// import { clearCart } from "../redux/CartSlice";
// import toast, { Toaster } from "react-hot-toast";

// const Checkout = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();

//   const loggedUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};
//   const [cartItems, setCartItems] = useState(
//     JSON.parse(localStorage.getItem("cartItems")) || []
//   );

//   const profileAddress = location.state?.address || loggedUser.address || {};

//   const [formData, setFormData] = useState({
//     fullname: loggedUser.name || "",
//     email: loggedUser.email || "",
//     address: profileAddress.address || "",
//     city: profileAddress.city || "",
//     state: profileAddress.state || "",
//     pinCode: profileAddress.pincode || "",
//     country: profileAddress.country || "India",
//     paymentMethod: "cod",
//   });

//   useEffect(() => {
//     if (!loggedUser?.id) {
//       toast.error("Please login first!");
//       navigate("/login");
//     }
//   }, [loggedUser, navigate]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handlePlaceOrder = () => {
//     if (cartItems.length === 0) {
//       toast.error("Cart is empty!");
//       return;
//     }

//     const newOrder = {
//       id: uuidv4(),
//       userId: loggedUser.id,
//       products: cartItems,
//       status: "Pending",
//       date: new Date().toLocaleString(),
//       timestamps: { Pending: new Date().toLocaleString() },
//       total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),

//       ShippingAddress: {
//         fullname: formData.fullname,
//         email: formData.email,
//         address: formData.address,
//         city: formData.city,
//         state: formData.state,
//         pinCode: formData.pinCode,
//         country: formData.country,
//       },
//     };

//     const existing = JSON.parse(localStorage.getItem("orders")) || [];
//     localStorage.setItem("orders", JSON.stringify([...existing, newOrder]));

//     // -------------------------
//     // ✅ CLEAR CART PROPERLY
//     // -------------------------
//     dispatch(clearCart());              // Redux
//     localStorage.removeItem("cartItems");  // LocalStorage
//     setCartItems([]);                      // Local state
//     // -------------------------

//     toast.success("Order placed successfully!");
//     setTimeout(() => navigate("/orders"), 1000);
//   };

//   const totalAmount = cartItems.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <Toaster position="top-right" />
//       <h2 className="text-3xl font-bold mb-6 text-center">Checkout</h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//         {/* Billing Info */}
//         <div className="border p-4 rounded-lg shadow-sm">
//           <h3 className="text-xl font-semibold mb-4">Billing Information</h3>

//           <input
//             name="fullname"
//             placeholder="Full Name"
//             className="w-full p-2 border rounded mb-3"
//             value={formData.fullname}
//             onChange={handleChange}
//           />
//           <input
//             name="email"
//             placeholder="Email"
//             className="w-full p-2 border rounded mb-3"
//             value={formData.email}
//             onChange={handleChange}
//           />
//           <input
//             name="address"
//             placeholder="Address"
//             className="w-full p-2 border rounded mb-3"
//             value={formData.address}
//             onChange={handleChange}
//           />
//           <input
//             name="city"
//             placeholder="City"
//             className="w-full p-2 border rounded mb-3"
//             value={formData.city}
//             onChange={handleChange}
//           />
//           <input
//             name="state"
//             placeholder="State"
//             className="w-full p-2 border rounded mb-3"
//             value={formData.state}
//             onChange={handleChange}
//           />
//           <input
//             name="pinCode"
//             placeholder="Pin Code"
//             className="w-full p-2 border rounded mb-3"
//             value={formData.pinCode}
//             onChange={handleChange}
//           />
//           <input
//             name="country"
//             placeholder="Country"
//             className="w-full p-2 border rounded mb-3"
//             value={formData.country}
//             onChange={handleChange}
//           />

//         </div>

//         {/* Order Summary */}
//         <div className="border p-4 rounded-lg shadow-sm">
//           <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

//           {cartItems.length === 0 ? (
//             <p className="text-gray-500">Your cart is empty.</p>
//           ) : (
//             <div className="space-y-3">
//               {cartItems.map((item) => (
//                 <div key={item.id} className="flex justify-between">
//                   <span>
//                     {item.name} x {item.quantity}
//                   </span>
//                   <span>₹{(item.price * item.quantity).toLocaleString()}</span>
//                 </div>
//               ))}
//               <div className="border-t pt-2 flex justify-between font-bold">
//                 <span>Total:</span>
//                 <span>₹{totalAmount.toLocaleString()}</span>
//               </div>
//             </div>
//           )}

//           <div className="mt-4">
//             <h4 className="font-semibold mb-2">Payment Method</h4>
//             <select
//               name="paymentMethod"
//               value={formData.paymentMethod}
//               onChange={handleChange}
//               className="w-full p-2 border rounded"
//             >
//               <option value="cod">Cash on Delivery</option>
//               <option value="card">Credit/Debit Card</option>
//               <option value="upi">UPI</option>
//             </select>
//           </div>

//           <button
//             className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
//             onClick={handlePlaceOrder}
//           >
//             Place Order
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/CartSlice";
import toast, { Toaster } from "react-hot-toast";

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

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 flex justify-center">
      <Toaster position="top-right" />
      <div className="w-full max-w-6xl">
        <h2 className="text-3xl font-bold mt-8 mb-4 text-center">Checkout</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Billing Information */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <h3 className="text-2xl font-semibold mb-6">Billing Information</h3>
            <div className="space-y-4">
              {["fullname","email","address","city","state","pinCode","country"].map(field => (
                <input
                  key={field}
                  name={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-gray-200 focus:outline-none transition"
                  value={formData[field] || ""}
                  onChange={handleChange}
                />
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Order Summary</h3>

              {cartItems.length === 0 ? (
                <div className="bg-gray-100 p-6 text-center rounded-lg text-gray-500">
                  Your cart is empty.
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <span className="font-medium">{item.name || "Unnamed Product"}</span>
                        <div className="flex items-center border rounded-lg overflow-hidden">
                          <button
                            onClick={() => adjustQuantity(item.id, -1)}
                            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 transition"
                          >
                            -
                          </button>
                          <span className="px-4">{item.quantity || 1}</span>
                          <button
                            onClick={() => adjustQuantity(item.id, 1)}
                            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 transition"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <span className="font-semibold">
                        ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString()}
                      </span>
                    </div>
                  ))}

                  <div className="border-t pt-4 flex justify-between font-bold text-lg">
                    <span>Total Amount:</span>
                    <span>₹{totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              )}

              {/* Payment Method */}
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Payment Method</h4>
                <select
                  name="paymentMethod"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-gray-200 focus:outline-none transition"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                >
                  <option value="cod">Cash on Delivery</option>
                  <option value="card">Credit / Debit Card</option>
                  <option value="upi">UPI</option>
                </select>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              className="mt-8 w-full py-4 bg-black text-white rounded-lg text-lg font-semibold hover:bg-gray-900 transition"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
