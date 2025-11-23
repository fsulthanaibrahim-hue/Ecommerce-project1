  import React, { useState} from "react";
  import { useNavigate } from "react-router-dom";
  import { addToWishlist, removeFromWishlist } from "../redux/WishlistSlice";
  import { useDispatch, useSelector } from "react-redux";
  import { addToCart } from "../redux/CartSlice";
  import { Heart, ShoppingBag } from "lucide-react";

  const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const wishlist = useSelector((state) => state.wishlist.items);
    const isInWishlist = wishlist.some((item) => item.id === product.id);

    const [addedToCart, setAddedToCart] = useState(false);

    const toggleWishlist = (e) => {
      e.stopPropagation();
      if(isInWishlist) {
        dispatch(removeFromWishlist(product.id));
        toast("Removed from wishlist");
      } else {
        dispatch(addToWishlist(product));
        toast("Added to wishlist");
      }
    };

    const handleAddToCart = (e) => {
      e.stopPropagation();
      dispatch(addToCart(product));
      setAddedToCart(true);
      toast.success("Added to cart 🛒");
    };

      return (
            <div 
              onClick={() => navigate(`/product/${product.id}`)}
              className="relative border rounded-xl p-4 transition cursor-pointer flex flex-col hover:shadow-lg hover:scale-[1.02] duration-300"
            >
              <img 
                src={product.image}
                alt={product.name}
                className="w-full h-90 object-cover rounded-lg mb-3"
              />

              <button 
                onClick={toggleWishlist}
                className="absolute top-3 right-3 p-2 rounded-full shadow-md transition-transform"
              >
                <Heart 
                  className={`w-5 h-5 transition-all  duration-300 ${
                    isInWishlist ? "fill-red-500 text-red-500" : "text-gray-500 "
                  }`}
                />  
              </button>  

              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-500">{product.category}</p> 
              <p className="text-blue-600 font-bold mt-1">₹{product.price}</p>

          </div>
      );
  };
  export default ProductCard;




