import React, { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../redux/WishlistSlice";
import { addToCart } from "../redux/CartSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Wishlist = () => {
    const wishlist = useSelector(state => state.wishlist?.items || []);
    const cart =  useSelector(state => state.cart?.items || []);

    const userFromRedux = useSelector(state => state.user?.currentUser);
    const userFromStorage = JSON.parse(localStorage.getItem("loggedInUser"));
    const user = userFromRedux || userFromStorage;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      if(!user)  navigate("/login");
    }, [user, navigate]);

    if(!user) return <p className="text-center mt-10">Redirecting to login...</p>;

    const handleMoveTocart = (item) => {
      const exists = cart.find(i => i.id === item.id);
      if (exists) {
        toast.error("Item already in cart!");
        return;
      }
      dispatch(addToCart(item));
      dispatch(removeFromWishlist(item.id));
      toast.success(`${item.name} moved to cart!`);
    };

    const handleRemove = (id) => {
      dispatch(removeFromWishlist(id));
      toast.success("Removed from wishlist!");
    }

    return (
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>

          {wishlist.length === 0 ? (
            <p className="text-gray-500">Your wishlist is empty.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {wishlist.map((item) => (
                <div 
                    key={item.id}
                    className="border p-4 rounded-lg shadow hover:shadow-lg transition">

                <div className="w-full h-90 flex justify-center items-center overflow-hidden mb-1">
                  <img 
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded" />   
                </div>    

                  <h3 className="font-semibold text-lg truncate">{item.name}</h3>
                  <p className="text-gray-600 mb-2 text-sm">{item.category}</p>
                  <p className="text-gray-600 mb-2 text-sm">₹{item.price}</p>

                  <button 
                    onClick={() => handleMoveTocart(item)}
                    className="text-sm text-white bg-green-500 px-3 py-1 rounded hover:bg-green-600 w-full mt-2"
                  >
                    Move to Cart
                  </button>  

                  <button
                    onClick={() => dispatch(removeFromWishlist(item.id))}
                    className="text-sm text-white bg-red-500 px-3 py-1 rounded hover:bg-red-600 w-full mt-3"
                  >
                    Remove
                  </button>   
                </div>       
              ))}  
            </div>  
          )}
        </div>
    );
};
export default Wishlist;


