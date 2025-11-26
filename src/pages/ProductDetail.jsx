  import React, { useEffect, useState } from "react";
  import { useParams, useNavigate } from "react-router-dom";
  import { useDispatch, useSelector } from "react-redux";
  import { addToCart, clearCart } from "../redux/CartSlice";
  import { addToWishlist, removeFromWishlist } from "../redux/WishlistSlice";
  import toast from "react-hot-toast";
  import fetchProducts from "../services/api";
  import { Heart, Plus, Minus, Star, ShoppingCart, Truck, Shield, RotateCcw } from "lucide-react";

  const RatingStars = ({ rating }) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      const full = rating >= i;
      const half = rating >= i - 0.5 && rating < i;

      stars.push(
        <Star
          key={i}
          size={16}
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

    return <div className="flex items-center gap-0.5">{stars}</div>;
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
    const [relatedProducts, setRelatedProducts] = useState([]);

    const sizes = ["S", "M", "L", "XL"];

    useEffect(() => {
      window.scrollTo(0, 0);
      
      const loadProduct = async () => {
        try {
          const data = await fetchProducts();
          const found = data.find((p) => String(p.id) === String(id));
          setProduct(found || null);
          
          if (found) {
            const related = data
              .filter((p) => p.category === found.category && String(p.id) !== String(id))
              .slice(0, 4);
            setRelatedProducts(related);
          }
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

      dispatch(addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: selectedSize,
        quantity,
    })
    );
      toast.success("Added to cart!");
    };

   const handleBuyNow = () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user) return toast.error("Please login first!");
  if (!selectedSize) return toast.error("Please select a size!");

  // Store the single Buy Now product temporarily
  const buyNowProduct = {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    size: selectedSize,
    quantity,
  };

  // Save to localStorage
  localStorage.setItem("buyNowItem", JSON.stringify(buyNowProduct));

  // Redirect to checkout
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

    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-lg text-gray-600">Loading...</div>
        </div>
      );
    }

    if (!product) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-xl text-gray-700 mb-4">Product Not Found</p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Go Back
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white min-h-screen mt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-180 object-contain rounded-lg border border-gray-200 bg-gray-50"
              />
              <button
                onClick={handleWishlist}
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition"
              >
                <Heart
                  size={22}
                  fill={isWishlisted ? "red" : "none"}
                  className={isWishlisted ? "text-red-500" : "text-gray-600"}
                />
              </button>
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-3">
                {product.name}
              </h1>

              <div className="flex items-center gap-2 mb-4">
                <RatingStars rating={avgRating} />
                <span className="text-sm text-gray-600">
                  {avgRating} ({totalReviews} reviews)
                </span>
              </div>

              <div className="mb-6">
                <span className="text-2xl font-bold text-gray-900">
                  ₹{product.price}
                </span>
                <p className="text-sm text-green-600 mt-1">Inclusive of all taxes</p>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  Product Details
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {product.description || "High-quality product designed for comfort and style. Perfect for everyday wear with premium materials and excellent craftsmanship."}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Select Size
                </h3>
                <div className="flex gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-11 h-11 border rounded flex items-center justify-center font-medium text-sm transition ${
                        selectedSize === size
                          ? "border-black bg-gray-500 text-gray"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Quantity
                </h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-12 h-10 border border-gray-300 rounded flex items-center justify-center font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              <div className="flex gap-3 mb-6">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-300-500 text-black  border py-3 rounded font-semibold hover:bg-gray-500 transition flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-gray-500 text-white py-3 rounded font-semibold hover:bg-gray-700 transition"
                >
                  Buy Now
                </button>
              </div>

              <div className="border-t pt-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <Truck size={20} className="text-gray-600" />
                    <span>Free delivery on orders above ₹500</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <RotateCcw size={20} className="text-gray-600" />
                    <span>Easy 14-day return and exchange</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <Shield size={20} className="text-gray-600" />
                    <span>100% secure payments</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {relatedProducts.length > 0 && (
            <div className="border-t pt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Related Products
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {relatedProducts.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => navigate(`/product/${item.id}`)}
                    className="cursor-pointer group"
                  >
                    <div className="relative overflow-hidden rounded-lg border border-gray-200 mb-3 bg-gray-50">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-64 object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-sm font-medium text-gray-900 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-base font-bold text-gray-900">
                      ₹{item.price}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  export default ProductDetail;

