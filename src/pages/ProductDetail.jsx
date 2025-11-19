import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, clearCart } from "../redux/CartSlice";
import toast from "react-hot-toast";
import fetchProducts from "../services/api";
import { addToWishlist, removeFromWishlist } from "../redux/WishlistSlice";
import { Heart, Plus, Minus } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart.items);
  const wishlist = useSelector((state) => state.wishlist.items);

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  const sizes = ["S", "M", "L", "XL"];

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProducts();
        const found = data.find((p) => String(p.id) === String(id));
        setProduct(found || null);
      } catch (err) {
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!user) {
      toast.error("Please login first!");
      return;
    }

    if (!selectedSize) {
      toast.error("Please select a size!");
      return;
    }

    const exists = cart.find(
      (item) => item.id === product.id && item.size === selectedSize
    );

    if (exists) {
      toast.error("Already in cart!");
      return;
    }

    dispatch(addToCart({ ...product, size: selectedSize, quantity }));
    toast.success("Added to cart!");
    navigate("/cart");
  };

  const handleBuyNow = () => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!user) {
      toast.error("Please login first!");
      return;
    }

    if (!selectedSize) {
      toast.error("Please select a size!");
      return;
    }

    dispatch(clearCart());
    dispatch(addToCart({ ...product, size: selectedSize, quantity }));
    navigate("/checkout");
  };

  const handleWishlist = () => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!user) {
      toast.error("Please login first!");
      return;
    }

    const exists = wishlist.find((item) => item.id === product.id);

    if (exists) {
      dispatch(removeFromWishlist(product.id));
      toast.success("Removed from wishlist");
    } else {
      dispatch(addToWishlist(product));
      toast.success("Added to wishlist");
    }
  };

  const isWishlisted = wishlist.some((item) => item.id === product?.id);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!product) return <p className="text-center mt-10">Product Not Found</p>;

  return (
    <div className="p-10 max-w-6xl mx-auto flex flex-col md:flex-row gap-10">
      
  
      <div className="relative w-full md:w-1/2">
        <img
          src={product.image}
          className="w-full rounded-lg shadow-lg"
          alt={product.name}
        />

        <button
          onClick={handleWishlist}
          className="absolute top-4 right-4 bg-white/80 p-2 rounded-full"
        >
          {isWishlisted ? (
            <Heart fill="red" className="text-red-500" size={24} />
          ) : (
            <Heart className="text-gray-700" size={24} />
          )}
        </button>
      </div>


      <div className="md:w-1/2 flex flex-col">
        <h1 className="text-4xl font-bold mb-3">{product.name}</h1>
        <p className="text-xl text-blue-600 font-semibold mb-2">₹{product.price}</p>
        <p className="text-gray-600 mb-5">{product.description}</p>


        <div className="mb-5">
          <p className="font-medium mb-1">Select Size:</p>
          <div className="flex gap-3">
            {sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSize(s)}
                className={`px-4 py-2 border rounded-md ${
                  selectedSize === s
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>


        <div className="mb-5">
          <p className="font-medium mb-1">Quantity:</p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="p-2 border rounded-md"
            >
              <Minus size={18} />
            </button>

            <span className="px-4 py-2 border rounded-md">{quantity}</span>

            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="p-2 border rounded-md"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-6 py-3 rounded-lg"
          >
            Add to Cart
          </button>

          <button
            onClick={handleBuyNow}
            className="border px-6 py-3 rounded-lg"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
