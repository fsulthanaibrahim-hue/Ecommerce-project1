import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../redux/WishlistSlice";
import { addToCart } from "../redux/CartSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";

const Wishlist = () => {
  const wishlist = useSelector(state => state.wishlist?.items || []);
  const cart = useSelector(state => state.cart?.items || []);

  const userFromRedux = useSelector(state => state.user?.currentUser);
  const userFromStorage = JSON.parse(localStorage.getItem("loggedInUser"));
  const user = userFromRedux || userFromStorage;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Redirecting to login...</p>
      </div>
    );
  }

  const handleMoveToCart = (item) => {
    const exists = cart.find(i => i.id === item.id);
    if (exists) {
      toast.error("Item already in cart!");
      return;
    }
    dispatch(addToCart({ ...item, quantity: 1 }));
    dispatch(removeFromWishlist(item.id));
    toast.success(`${item.name} moved to cart!`);
  };

  const handleRemove = (id) => {
    dispatch(removeFromWishlist(Number(id)));
    toast.success("Removed from wishlist!");
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 mt-14">
      <div className="max-w-7xl mx-auto px-4 ">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Heart size={28} className="text-red-500" />
            <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
          </div>
          <p className="text-gray-600">
            {wishlist.length} {wishlist.length === 1 ? "item" : "items"} in your wishlist
          </p>
        </div>

        {/* Wishlist Content */}
        {wishlist.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <Heart size={64} className="mx-auto mb-4 text-gray-300" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Your wishlist is empty
            </h3>
            <p className="text-gray-600 mb-6">
              Start adding items you love to your wishlist
            </p>
            <button
              onClick={() => navigate("/products")}
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition group"
              >
                {/* Product Image */}
                <div 
                  className="relative bg-gray-50 cursor-pointer"
                  onClick={() => navigate(`/product/${item.id}`)}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-64 object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(item.id);
                    }}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition"
                  >
                    <Heart size={18} fill="red" className="text-red-500" />
                  </button>
                </div>

                {/* Product Details */}
                <div className="p-4">
                  <h3 
                    className="font-semibold text-gray-900 mb-1 truncate cursor-pointer hover:text-blue-600"
                    onClick={() => navigate(`/product/${item.id}`)}
                  >
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                  <p className="text-lg font-bold text-gray-900 mb-4">₹{item.price}</p>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <button
                      onClick={() => handleMoveToCart(item)}
                      className="w-full flex items-center justify-center gap-2 bg-gray text-black border py-2.5 rounded-lg hover:bg-gray-600 transition text-sm font-medium"
                    >
                      <ShoppingCart size={16} />
                      Move to Cart
                    </button>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-2.5 rounded-lg hover:bg-gray-500 transition text-sm font-medium"
                    >
                      <Trash2 size={16} />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;