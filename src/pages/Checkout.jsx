import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../redux/CartSlice";
import toast, { Toaster } from "react-hot-toast";
import { Truck, CreditCard, Shield } from "lucide-react";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};

  // READ BUY NOW ITEM
  const buyNowItem = JSON.parse(localStorage.getItem("buyNowItem"));
  // Redux cart
  const reduxCart = useSelector((state) => state.cart.items) || [];

  // FINAL CART ITEMS (BuyNow → Cart)
  // const [cartItems, setCartItems] = useState(() => {
  //   if (buyNowItem) return [buyNowItem]; // Use Buy Now item only
  //   if (reduxCart.length) return reduxCart;

  //   return JSON.parse(localStorage.getItem("cartItems")) || [];
  // });

   const [cartItems, setCartItems] = useState(() => {
    if (buyNowItem) return [{ ...buyNowItem, quantity: buyNowItem.quantity || 1 }];
    if (reduxCart.length)
      return reduxCart.map((item) => ({ ...item, quantity: item.quantity || 1 }));
    return (JSON.parse(localStorage.getItem("cartItems")) || []).map((item) => ({
      ...item,
      quantity: item.quantity || 1,
    }));
  });

  // Address data
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

  
  // ✅ Reactive totals
  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const newSubtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const newShipping = newSubtotal > 500 ? 0 : 50;
    const newTotal = newSubtotal + newShipping;

    setSubtotal(newSubtotal);
    setShipping(newShipping);
    setTotalAmount(newTotal);
  }, [cartItems]);

  // Redirect if not logged in
  useEffect(() => {
    if (!loggedUser?.id) {
      toast.error("Please login first!");
      navigate("/login");
    }
  }, [loggedUser, navigate]);

  // Increase/Decrease quantity
  const adjustQuantity = (id, value) => {
    const updated = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + value) }
        : item
    );
    setCartItems(updated);
    // Save in localStorage for cart (not needed for BuyNow, but harmless)
    if (!buyNowItem) localStorage.setItem("cartItems", JSON.stringify(updated));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handlePlaceOrder = async () => {
  if (!cartItems.length) return toast.error("Cart is empty!");

  if (
    !formData.fullname ||
    !formData.email ||
    !formData.address ||
    !formData.city ||
    !formData.state ||
    !formData.pinCode
  ) {
    toast.error("Please fill all required fields!");
    return;
  }

  const newOrder = {
    id: uuidv4(),
    userId: loggedUser.id,
    userEmail: loggedUser.email,
    items: cartItems,
    status: "pending",
    orderDate: new Date().toISOString(),

    shippingAddress: {
      name: formData.fullname,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      pincode: formData.pinCode,
      country: formData.country,
    },

    total: totalAmount,
  };

  try {
      await fetch("http://localhost:5000/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newOrder), 
    });


    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    existingOrders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(existingOrders));

    // Clear cart or Buy Now item
    if (buyNowItem) {
      localStorage.removeItem("buyNowItem");
    } else {
      dispatch(clearCart());
      localStorage.removeItem("cartItems");
    }

    toast.success("Order placed successfully!");

    setTimeout(() => navigate("/order-success"), 1000);

  } catch (err) {
    toast.error("Order failed. Try again!");
  }
};

  // const subtotal = cartItems.reduce(
  //   (sum, item) => sum + item.price * item.quantity,
  //   0
  // );
  // const shipping = subtotal > 500 ? 0 : 50;
  // const totalAmount = subtotal + shipping;

  return (
    <div className="bg-gray-50 min-h-screen py-8 mt-16">
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-3">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Address + Payment */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address */}
            <div className="bg-white p-6 shadow border rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <Truck size={22} /> <h2>Shipping Address</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: "fullname", label: "Full Name" },
                  { name: "email", label: "Email" },
                  { name: "address", label: "Address" },
                  { name: "city", label: "City" },
                  { name: "state", label: "State" },
                  { name: "pinCode", label: "PIN Code" },
                  { name: "country", label: "Country" },
                ].map((f) => (
                  <div
                    key={f.name}
                    className={
                      ["fullname", "email", "address"].includes(f.name)
                        ? "md:col-span-2"
                        : ""
                    }
                  >
                    <label className="block mb-1">{f.label}</label>
                    <input
                      name={f.name}
                      placeholder={f.name}
                      value={formData[f.name]}
                      onChange={handleChange}
                      className="w-full p-3 border rounded"
                      required
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white p-6 shadow border rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard size={22} /> <h2>Payment Method</h2>
              </div>

              {["cod", "card", "upi"].map((m) => (
                <label
                  key={m}
                  className="flex items-center gap-3 p-3 border rounded mb-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={m}
                    checked={formData.paymentMethod === m}
                    onChange={handleChange}
                  />
                  {m === "cod"
                    ? "Cash on Delivery"
                    : m === "card"
                    ? "Card Payment"
                    : "UPI Payment"}
                </label>
              ))}
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="bg-white p-4 shadow border rounded-lg sticky">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 border-b pb-4 mb-4">
                <img
                  src={item.image}
                  className="w-20 h-20 object-contain bg-gray-100 rounded"
                />
                <div className="flex-1">
                  <h3 className="text-sm font-semibold">{item.name}</h3>

                  {/* 🔹 Quantity Buttons Enabled for ALL */}
                  <div className="flex items-center gap-2 my-2">
                    <button
                      onClick={() => adjustQuantity(item.id, -1)}
                      className="w-7 h-7 border rounded cursor-pointer"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => adjustQuantity(item.id, 1)}
                      className="w-7 h-7 border rounded cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <p className="font-bold">₹{item.price * item.quantity}</p>
                </div>
              </div>
            ))}

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold">₹{subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
              </div>

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full bg-black text-white py-3 rounded-lg mt-6 cursor-pointer"
            >
              Place Order
            </button>

            <div className="mt-4 text-sm text-gray-600 flex gap-2 items-center">
              <Shield size={16} /> Secure Checkout
            </div>
            <div className="mt-4 text-sm text-gray-600 flex gap-2 items-center">
              <Truck size={16} /> Free shipping 
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
