import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart, increaseQty, decreaseQty, setCart, clearCart } from "../redux/CartSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { syncCartToDB } from "../redux/CartSlice";

const Cart = () => {
  const cart = useSelector(state => state.cart?.items || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userFromRedux = useSelector(state => state.user?.currentUser);
  const user = userFromRedux || JSON.parse(localStorage.getItem("loggedInUser"));


  useEffect(() => {
    if (!user) {
      toast.error("Please login first to view your cart!");
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return <p className="text-center mt-10">Redirecting to login...</p>;

  const total = cart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);

  const syncCart = async (userId, updatedCart) => {
    await fetch(`http://localhost:5000/cart${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: updatedCart })
    });
    // if (user?.id) syncCartToDB(user.id, updatedCart);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    const updatedCart = [...cart];
    syncCartToDB(updatedCart);
  };

  const handleIncrease = (item) => {
    dispatch(increaseQty(item.id));
    const updatedCart = cart.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
    syncCart(updatedCart);
  };
  
  const handleDecrease = (item) => {
    if (item.quantity === 1) return;
    dispatch(decreaseQty(item.id));
    const updatedCart = cart.map(i => i.id === item.id ? { ...i, quantity: i.quantity - 1} : i);
    syncCart(updatedCart);
  };

  const handleRemove = (item) => {
    dispatch(removeFromCart(item.id));
    const updatedCart = cart.filter(i => i.id !== item.id);
    syncCart(updatedCart);
  };

  const handleCheckout = async  () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    const order = {
      userId: user.id,
      items: cart,
      total: cart.reduce((sum, i) => sum + (i.price * i.quantity), 0),
      status: "pending",
      createAt: new Date().toISOString()
    };

    try {
      await fetch("http://localhost:5000/order", {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify(order)
      });

      await syncCartToDB(user.id, []);
      dispatch(clearCart());

    // cart.forEach(item => dispatch(removeFromCart(item.id)));
    // syncCart([]);
    toast.success("Order placed successfully! Thank you for shopping.");

    setTimeout(() => navigate("/orders"), 1500);

    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Something went wrong. Please try again!");
    } 
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center mt-10 text-gray-600">
          <p className="text-lg">No items in your cart.</p>
          <button
            onClick={() => navigate("/products")}
            className="mt-4 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Browse products
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {cart.map(item => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b pb-3"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-gray-600">₹{item.price}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => dispatch(decreaseQty(item.id))}
                  className="cursor-pointer px-2 py-1 border rounded hover:bg-gray-100"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => dispatch(increaseQty(item.id))}
                  className="cursor-pointer px-2 py-1 border rounded hover:bg-gray-100"
                >
                  +
                </button>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-red-600 cursor-pointer"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <h2 className="text-right text-2xl font-bold mt-6">
            Total: ₹{total.toFixed(2)}
          </h2>

          <div className="text-right mt-6">
            <button
              onClick={handleCheckout}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
