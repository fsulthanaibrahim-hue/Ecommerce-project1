
  import React, { useEffect, useState } from "react";
  import { useParams, useNavigate } from "react-router-dom";
  import { useDispatch, useSelector } from "react-redux";
  import { addToCart, clearCart } from "../redux/CartSlice";
  import { addToWishlist, removeFromWishlist } from "../redux/WishlistSlice";
  import toast from "react-hot-toast";
  import fetchProducts from "../services/api";
  import { Heart, Plus, Minus, Star } from "lucide-react";

  const RatingStars = ({ rating }) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      const full = rating >= i;
      const half = rating >= i - 0.5 && rating < i;

      stars.push(
        <Star
          key={i}
          size={18}
          className={`${
            full
              ? "fill-yellow-400 text-yellow-400"
              : half
              ? "fill-yellow-300 text-yellow-300"
              : "text-gray-300"
          }`}
        />
      );
    }

    return <div className="flex items-center gap-1">{stars}</div>;
  };

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

    const avgRating = product?.rating ?? 4.5;
    const totalReviews = product?.reviewsCount ?? 120;

    const handleAddToCart = () => {
      const user = JSON.parse(localStorage.getItem("loggedInUser"));
      if (!user) return toast.error("Please login first!");
      if (!selectedSize) return toast.error("Please select a size!");

      const exists = cart.find(
        (item) => item.id === product.id && item.size === selectedSize
      );
      if (exists) return toast.error("Already in cart!");

      dispatch(addToCart({ ...product, size: selectedSize, quantity }));
      toast.success("Added to cart!");
      navigate("/cart");
    };

    const handleBuyNow = () => {
      const user = JSON.parse(localStorage.getItem("loggedInUser"));
      if (!user) return toast.error("Please login first!");
      if (!selectedSize) return toast.error("Please select a size!");

      dispatch(clearCart());
      dispatch(addToCart({ ...product, size: selectedSize, quantity }));
      navigate("/checkout");
    };

    const handleWishlist = () => {
      const user = JSON.parse(localStorage.getItem("loggedInUser"));
      if (!user) return toast.error("Please login first!");

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
      <div className="p-6 max-w-6xl mx-auto flex flex-col md:flex-row gap-10 m-16">
        <div className="relative w-full md:w-1/2">
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-lg shadow-lg object-cover"
          />
          <button
            onClick={handleWishlist}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white"
          >
            <Heart
              size={24}
              fill={isWishlisted ? "red" : "none"}
              className={isWishlisted ? "text-red-500" : "text-gray-700"}
            />
          </button>
        </div>

        <div className="md:w-1/2 flex flex-col gap-5">
          <h1 className="text-4xl font-bold">{product.name}</h1>

          <div className="flex items-center gap-3">
            <RatingStars rating={avgRating} />
            <span className="font-semibold">{avgRating}</span>
            <span className="text-gray-500 text-sm">
              ({totalReviews} reviews)
            </span>
          </div>

          <p className="text-xl text-blue-600 font-semibold">₹{product.price}</p>
          <p className="text-gray-600">
            {product.description || "No description available."}
          </p>

          <div>
            <p className="font-medium mb-2">Select Size:</p>
            <div className="flex gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-md ${
                    selectedSize === size
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="font-medium mb-2">Quantity:</p>
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

          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <button
              onClick={handleAddToCart}
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="border px-6 py-3 rounded-lg hover:bg-gray-100"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default ProductDetail;
