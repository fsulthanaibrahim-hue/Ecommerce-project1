import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CartSlice";
import toast from "react-hot-toast";
import fetchProducts from "../services/api";
import { addToWishlist, removeFromWishlist } from "../redux/WishlistSlice";
import { Heart } from "lucide-react"

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.items);
  const wishlist = useSelector(state => state.wishlist.items);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true); 
      setError("");
      try {
        const data = await fetchProducts();
        const found = data.find(p => String(p.id) === String(id));
        if (!found) { 
          setError("Product not found."); 
          setProduct(null); 
        } else setProduct(found);
      } catch (err) {
        setError("Failed to load product.");
      } finally { 
        setLoading(false); 
      }
    };
    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) {
      toast.error("Please login first to add items to cart!");
      return;
    }
    const exists = cart.find(item => item.id === product.id);
    if (exists) { 
      toast.error("This item is already in your cart!"); 
      return; 
    }
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlist = () => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if(!user) {
      toast.error("Please login first to add items to wishlist!");
      return;
    }
    const exists = wishlist.find(item => item.id === product.id);
    if(exists) {
      dispatch(removeFromWishlist(product.id));
      toast.success(`${product.name} removed from wishlist.`);
    } else {
      dispatch(addToWishlist(product));
      toast.success(`${product.name} added to wishlist.`);
    }
  };

  const isWishlisted = wishlist.some(item => item.id === product?.id);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;
  if (!product) return <p className="text-center mt-10">No product data.</p>;


  return (
    <div className="p-10 max-w-6xl mx-auto flex flex-col md:flex-row gap-10">
      <div className="relative w-full md:w-1/2">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full rounded-lg shadow-lg object-cover" 
        />
        <button 
          onClick={handleWishlist}
          className="absolute top-4 right-4 bg-white/80 p-2 rounded-full hover:bg-white transition"
        >
          {isWishlisted ? (
            <Heart className="text-red-500" fill="red" size={24} />
          ) : (
            <Heart className="text-gray-700" size={24} />
          )}
        </button>  
      </div>

      <div className="flex flex-col justify-start md:w-1/2">
        <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
        <p className="text-gray-700 mb-2 text-lg">
          Category: <span className="font-medium">{product.category}</span>
        </p>
        <p className="text-2xl font-semibold text-blue-600 mb-4">
          ₹{product.price}
        </p>
        <p className="text-gray-600 text-base mb-6 leading-relaxed text-justify">
          {product.description}
        </p>
        <button 
           onClick={handleAddToCart} 
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
