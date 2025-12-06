
// import { useState, useEffect } from "react";
// import { Star, TrendingUp, Truck, Shield } from "lucide-react";
// import men from "../assets/men.png";
// import women from "../assets/women.png";
// import kids from "../assets/kids.png";
// import { Link, useLocation } from "react-router-dom";

// const Home = () => {
//   const [scrolled, setScrolled] = useState(false);
//   const [featured, setFeatured] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const location = useLocation();

//   const searchParams = new URLSearchParams(location.search);
//   const categoryQuery = searchParams.get("category")?.toLowerCase() || null;

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     setLoading(true);
//     setError(null);

//     fetch("http://localhost:5000/products")
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch products");
//         return res.json();
//       })
//       .then((data) => {
//         let products = Array.isArray(data) ? data : [];
//         if (categoryQuery) {
//           products = products.filter(
//             (p) => p.category && p.category.toLowerCase() === categoryQuery
//           );
//         }

//         setFeatured(products.slice(0, 10));
//       })
//       .catch((err) => {
//         console.error(err);
//         setError("Could not load products. Is your json-server running?");
//       })
//       .finally(() => setLoading(false));
//   }, [categoryQuery]);

//   const placeholderImage =
//     "https://via.placeholder.com/600x800?text=No+Image";

//     const heroImages = [   
//         "https://www.westside.com/cdn/shop/files/Woman-Web_fc468136-54bc-43a9-a4d8-6845e5b80adf.jpg?v=1763707730",
//         "https://www.westside.com/cdn/shop/files/Kids-Web_b62c3641-5114-4112-9d13-36432c22264d.jpg?v=1763708515",
//         "https://cdn.shopify.com/s/files/1/0266/6276/4597/files/Layer_Up_in_Style_The_Ultimate_Men_s_Jacket_Edit.png?v=1763370915",
//         "https://cdn.shopify.com/s/files/1/0266/6276/4597/files/Untitled_design_-_2025-09-11T110943.797.png?v=1757569295",
//     ];

//     const [currentIndex, setCurrentIndex] = useState(0);

//     useEffect(() => {
//       const interval = setInterval(() => {
//         setCurrentIndex(prev => (prev + 1) % heroImages.length);
//       }, 2000);
//       return () => clearInterval(interval);
//     }, []);

//   return (
//     <div className="text-center bg-gradient-to-b from-gray-50 to-white">
//       <div className="relative w-full h-[110vh]  flex items-center justify-center bg-cover bg-center overflow-hidden">
//         <img
//         src={heroImages[currentIndex]}
//         alt="fashion store"
//           className="absolute inset-0 w-full h-full object-cover tansition-all duration-[1500ms]ease-in-out"
//         />

//         <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/50 to-transparent"></div>
//         <div className="relative z-10 text-white px-6 animate-[fadeIn_1s_ease-in]">
          
//           <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
//             Discover Your Style
//           </h1>
//           <p className="text-lg md:text-2xl mb-8 font-light">New Arrivals for Men, Women & Kids</p>
//           <Link
//             to="/products"
//             className="group inline-flex items-center gap-2 bg-white text-black font-semibold px-8 py-4 rounded-full hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl"
//           >
//             Shop Now
//             <span className="group-hover:translate-x-1 transition-transform">→</span>
//           </Link>
//         </div>
//         {/* Minimal Slider Dots */}
//          <div className="absolute bottom-6 w-full flex justify-center gap-1.5 z-20">
//            {heroImages.map((_, index) => (
//            <button
//              key={index}
//              onClick={() => setCurrentIndex(index)}
//              className={`w-2 h-2 rounded-full transition-all duration-300 ${
//              currentIndex === index ? "bg-white" : "bg-white/50"
//             }`}
//            ></button>
//            ))}
//           </div>
//       </div>

//       <div className="bg-black from-purple-600 via-pink-600 to-red-600 text-white py-3 px-6 overflow-hidden">
//         <div className="animate-[scroll_15s_linear_infinite] whitespace-nowrap">
//           <span className="inline-block mx-8"> FREE SHIPPING ON ORDERS OVER ₹999</span>
//           <span className="inline-block mx-8"> UP TO 50% OFF ON SELECTED ITEMS</span>
//           <span className="inline-block mx-8"> NEW ARRIVALS EVERY WEEK</span>
//           <span className="inline-block mx-8"> FREE SHIPPING ON ORDERS OVER ₹999</span>
//         </div>
//       </div>

//       <div className="p-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-12 animate-[fadeIn_1s_ease-in]">
//             <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
//               Explore Collections
//             </h2>
//             <p className="text-gray-600 text-lg">Curated styles for every occasion</p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
//             <div className="relative group overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
//               <img
//                 src={men}
//                 alt="Men"
//                 className="w-full h-150 object-cover rounded-2xl transition-transform duration-700 group-hover:scale-110"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-center justify-end pb-8 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
//                 <h2 className="text-white mb-4 text-3xl font-bold ">Men's Collection</h2>
//                 <p className="text-gray-200 mb-4 px-4 text-sm">Discover premium menswear</p>
//                 <Link
//                   to="/products?category=Men"
//                   className="text-black bg-white rounded-full px-6 py-3 font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg"
//                 >
//                   Shop Now
//                 </Link>
//               </div>
//             </div>

//             <div className="relative group overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
//               <img
//                 src={women}
//                 alt="Women"
//                 className="w-full h-150 object-cover transition-transform duration-700 group-hover:scale-110"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-center justify-end pb-8 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
//                 <h2 className="text-white text-3xl font-bold mb-4">Women's Collection</h2>
//                 <p className="text-gray-200 mb-4 px-4 text-sm">Elegant & trendy styles</p>
//                 <Link
//                   to="/products?category=Women"
//                   className="text-black bg-white rounded-full px-6 py-3 font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg"
//                 >
//                   Shop Now
//                 </Link>
//               </div>
//             </div>

//             <div className="relative group overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
//               <img
//                 src={kids}
//                 alt="Kids"
//                 className="w-full h-150 object-cover transition-transform duration-700 group-hover:scale-110"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-center justify-end pb-8 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
//                 <h2 className="text-white text-3xl font-bold mb-4">Kids' Collection</h2>
//                 <p className="text-gray-200 mb-4 px-4 text-sm">Fun & comfortable wear</p>
//                 <Link
//                   to="/products?category=kids"
//                   className="text-black bg-white rounded-full px-6 py-3 font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg"
//                 >
//                   Shop Now
//                 </Link>
//               </div>
//             </div>
//           </div>

//           <div className="mb-10">
//             <div className="flex items-center justify-center gap-3 mb-8">
//               <TrendingUp className="text-pink-600" size={32} />
//               <h2 className="text-3xl md:text-4xl font-bold">Trending Now</h2>
//             </div>

//             {loading ? (
//               <div className="py-12">
//                 <div className="text-gray-500">Loading products...</div>
//               </div>
//             ) : error ? (
//               <div className="py-12">
//                 <div className="text-red-500">{error}</div>
//                 <div className="mt-4 text-sm text-gray-600">
//                   Make sure json-server is running: <code>json-server --watch db.json --port 3000</code>
//                 </div>
//               </div>
//             ) : featured.length === 0 ? (
//               <div className="py-12 text-gray-600">No products to show.</div>
//             ) : (
//               <div className="flex gap-6 overflow-x-auto scrollbar-hide py-4 px-2">
//                 {featured.map((item) => (
//                   <div
//                     key={item.id}
//                     className="min-w-[220px] bg-white rounded-2xl shadow-lg hover:shadow-2xl cursor-pointer flex-shrink-0 transition-all duration-300 transform hover:-translate-y-2 group"
//                   >
//                     <div className="relative overflow-hidden rounded-t-2xl">
//                       <img
//                         src={item.image || placeholderImage}
//                         alt={item.name || "Product"}
//                         onError={(e) => (e.currentTarget.src = placeholderImage)}
//                         className="w-full h-90 object-cover transition-transform duration-500 group-hover:scale-110"
//                       />
//                       {item.badge && (
//                         <div className="absolute top-3 left-3">
//                           <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-purple-500">
//                             {item.badge}
//                           </span>
//                         </div>
//                       )}
//                     </div>

//                     <div className="p-4">
//                       <h3 className="font-semibold text-sm mb-2 line-clamp-2 h-10">{item.name}</h3> 
//                       <div className="flex items-center gap-1 mb-2">
//                         <Star size={14} className="fill-yellow-400 text-yellow-400" />
//                         <span className="text-sm font-medium">{item.rating ?? "4.5"}</span>
//                         <span className="text-xs text-gray-500">(120+ reviews)</span>
//                       </div> 

//                       <div className="flex items-center justify-between">
//                         <p className="text-gray-900 font-bold text-lg">₹{item.price}</p>
//                         <Link
//                           to={`/product/${item.id}`}
//                           className="text-white bg-black text-xs px-4 py-2 rounded-full hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
//                         >
//                           View
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="relative w-full h-[90vh] my-16 overflow-hidden">
//         <video autoPlay muted loop className="w-full h-full">
//           <source
//           src="https://media.istockphoto.com/id/2192541214/video/young-woman-checking-her-smartphone-while-holding-shopping-bags-in-a-bustling-mall-enjoying-a.mp4?s=mp4-640x640-is&k=20&c=NGhKw881u_51CNqarkAKeAZ0lUE2SjZx7mgxTkQz044="
//             // src="https://media.istockphoto.com/id/2079695162/video/fashionable-hispanic-woman-in-a-dress-going-over-some-trendy-outfits-in-a-clothing-rack.mp4?s=mp4-640x640-is&k=20&c=a0qD-NFUaURpvV43_9OiqKLKXVM9qKj6kFcDG3BRHbw="
//             type="video/mp4"
//           />
//           Your browser does not support the video tag.
//         </video>
//         <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-center items-center text-white">
//           <h2 className="text-5xl md:text-6xl font-bold mb-4 animate-[fadeIn_1s_ease-in]">Modern Fashion</h2>
//           <p className="text-xl mb-6 font-light">Elegance. Comfort. Confidence.</p>
//           <Link
//             to="/products"
//             className="bg-white text-black font-semibold px-8 py-4 rounded-full hover:bg-gray-300 transition-all duration-300 transform hover:scale-105 shadow-2xl"
//           >
//             Explore Now
//           </Link>
//         </div>
//       </div>

//       <div className="my-20 px-6 md:px-20 max-w-7xl mx-auto">
//         <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">About Trendora</h2>
//         <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto mb-8 rounded-full"></div>
//         <p className="text-gray-700 text-center max-w-3xl mx-auto text-lg leading-relaxed mb-16">
//           At <span className="font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Trendora</span>, we believe fashion is more 
//           than just clothing - it's a lifestyle, a way to express yourself, and a form
//           of confidence. Our mission is to bring you the latest and trendiest styles
//           for <span className="font-medium">Men, Women, and Kids</span> with premium
//           quality, comfort, and affordability.
//         </p>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           <div className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
//             <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
//               <Shield className="text-purple-600" size={32} />
//             </div>
//             <h3 className="text-xl font-semibold mb-3">Premium Quality</h3>
//             <p className="text-gray-600 leading-relaxed">
//               Every product is carefully selected with quality fabrics and long-lasting comfort.
//             </p>
//           </div>

//           <div className="p-8 bg-gradient-to-br from-pink-50 to-red-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
//             <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
//               <TrendingUp className="text-pink-600" size={32} />
//             </div>
//             <h3 className="text-xl font-semibold mb-3">Latest Trends</h3>
//             <p className="text-gray-600 leading-relaxed">
//               Stay ahead of the fashion game with our curated trending collections.
//             </p>
//           </div>

//           <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
//             <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
//               <Truck className="text-blue-600" size={32} />
//             </div>
//             <h3 className="text-xl font-semibold mb-3">Fast Delivery</h3>
//             <p className="text-gray-600 leading-relaxed">Quick and secure delivery at your doorstep, hassle-free every time.</p>
//           </div>
//         </div>
//       </div>

//       <div className="bg-gradient-to-r from-gray-300 via-gray-700 to-black text-white py-16 px-6 my-16">
//         <div className="max-w-3xl mx-auto text-center">
//           <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
//           <p className="text-lg mb-8 opacity-90">Subscribe to get exclusive deals and early access to new collections</p>
//           <div className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="flex-1 px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/50"
//             />
//             <button className="bg-white text-purple-600 font-semibold px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
//               Subscribe
//             </button>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes zoom {
//           from { transform: scale(1); }
//           to { transform: scale(1.1); }
//         }
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes scroll {
//           from { transform: translateX(0); }
//           to { transform: translateX(-50%); }
//         }
//         .scrollbar-hide::-webkit-scrollbar { display: none; }
//         .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
//       `}</style>
//     </div>
//   );
// };

// export default Home;









import { useState, useEffect } from "react";
import { Star, TrendingUp, Truck, Shield } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

// Import your images
import men from "../assets/men.png";
import women from "../assets/women.png";
import kids from "../assets/kids.png";

const Home = () => {
  // State Management
  const [scrolled, setScrolled] = useState(false);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryQuery = searchParams.get("category")?.toLowerCase() || null;

  // Configuration
  const API_URL = "http://localhost:5000/products";
  const placeholderImage = "https://via.placeholder.com/600x800?text=No+Image";
  
  const heroImages = [
    "https://www.westside.com/cdn/shop/files/Woman-Web_fc468136-54bc-43a9-a4d8-6845e5b80adf.jpg?v=1763707730",
    "https://www.westside.com/cdn/shop/files/Kids-Web_b62c3641-5114-4112-9d13-36432c22264d.jpg?v=1763708515",
    "https://cdn.shopify.com/s/files/1/0266/6276/4597/files/Layer_Up_in_Style_The_Ultimate_Men_s_Jacket_Edit.png?v=1763370915",
    "https://cdn.shopify.com/s/files/1/0266/6276/4597/files/Untitled_design_-_2025-09-11T110943.797.png?v=1757569295",
  ];

  const categories = [
    {
      title: "Men's Collection",
      description: "Discover premium menswear",
      image: men,
      link: "/products?category=Men",
    },
    {
      title: "Women's Collection",
      description: "Elegant & trendy styles",
      image: women,
      link: "/products?category=Women",
    },
    {
      title: "Kids' Collection",
      description: "Fun & comfortable wear",
      image: kids,
      link: "/products?category=kids",
    },
  ];

  const features = [
    {
      icon: Shield,
      title: "Premium Quality",
      description: "Every product is carefully selected with quality fabrics and long-lasting comfort.",
      gradient: "from-purple-50 to-pink-50",
      iconColor: "text-purple-600",
    },
    {
      icon: TrendingUp,
      title: "Latest Trends",
      description: "Stay ahead of the fashion game with our curated trending collections.",
      gradient: "from-pink-50 to-red-50",
      iconColor: "text-pink-600",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Quick and secure delivery at your doorstep, hassle-free every time.",
      gradient: "from-blue-50 to-indigo-50",
      iconColor: "text-blue-600",
    },
  ];

  // Effects
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [categoryQuery]);

  // API Calls
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch products");
      
      let data = await res.json();
      let products = Array.isArray(data) ? data : [];
      
      if (categoryQuery) {
        products = products.filter(
          (p) => p.category && p.category.toLowerCase() === categoryQuery
        );
      }

      setFeatured(products.slice(0, 10));
    } catch (err) {
      console.error(err);
      setError("Could not load products. Is your json-server running?");
    } finally {
      setLoading(false);
    }
  };

  // Components
  const HeroSection = () => (
    <div className="relative w-full h-[120vh] flex items-center justify-center overflow-hidden bg-gray-900">
      <img
        src={heroImages[currentIndex]}
        alt="fashion store"
        className="absolute inset-0 w-full h-full object-cover opacity-40 transition-opacity duration-1000"
      />
      
      <div className="relative z-10 text-white px-6 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
          Elevate Your Fashion
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
          Discover premium collections for every style
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-white text-black font-semibold px-8 py-3.5 rounded-md hover:bg-gray-400 transition-all duration-200"
        >
          Shop Now
          <span>→</span>
        </Link>
      </div>

      <div className="absolute bottom-8 w-full flex justify-center gap-2 z-20">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentIndex === index ? "bg-white w-8" : "bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );

  const AnnouncementBar = () => (
    <div className="bg-black text-white py-3 px-6 overflow-hidden">
      <div className="animate-[scroll_15s_linear_infinite] whitespace-nowrap">
        <span className="inline-block mx-8">FREE SHIPPING ON ORDERS OVER ₹999</span>
        <span className="inline-block mx-8">UP TO 50% OFF ON SELECTED ITEMS</span>
        <span className="inline-block mx-8">NEW ARRIVALS EVERY WEEK</span>
        <span className="inline-block mx-8">FREE SHIPPING ON ORDERS OVER ₹999</span>
      </div>
    </div>
  );

  const CategoryCard = ({ title, description, image, link }) => (
    <div className="relative group overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
      <img
        src={image}
        alt={title}
        className="w-full h-150 object-cover rounded-2xl transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-center justify-end pb-8 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
        <h2 className="text-white mb-4 text-3xl font-bold">{title}</h2>
        <p className="text-gray-200 mb-4 px-4 text-sm">{description}</p>
        <Link
          to={link}
          className="text-black bg-white rounded-full px-6 py-3 font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );

  const ProductCard = ({ item }) => (
    <div className="min-w-[220px] bg-white rounded-2xl shadow-lg hover:shadow-2xl cursor-pointer flex-shrink-0 transition-all duration-300 transform hover:-translate-y-2 group">
      <div className="relative overflow-hidden rounded-t-2xl">
        <img
          src={item.image || placeholderImage}
          alt={item.name || "Product"}
          onError={(e) => (e.currentTarget.src = placeholderImage)}
          className="w-full h-90 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {item.badge && (
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-purple-500">
              {item.badge}
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-sm mb-2 line-clamp-2 h-10">{item.name}</h3>
        <div className="flex items-center gap-1 mb-2">
          <Star size={14} className="fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{item.rating ?? "4.5"}</span>
          <span className="text-xs text-gray-500">(120+ reviews)</span>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-gray-900 font-bold text-lg">₹{item.price}</p>
          <Link
            to={`/product/${item.id}`}
            className="text-white bg-black text-xs px-4 py-2 rounded-full hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );

  const TrendingSection = () => (
    <div className="mb-10">
      <div className="flex items-center justify-center gap-3 mb-8">
        <TrendingUp className="text-pink-600" size={32} />
        <h2 className="text-3xl md:text-4xl font-bold">Trending Now</h2>
      </div>

      {loading ? (
        <div className="py-12">
          <div className="text-gray-500">Loading products...</div>
        </div>
      ) : error ? (
        <div className="py-12">
          <div className="text-red-500">{error}</div>
          <div className="mt-4 text-sm text-gray-600">
            Make sure json-server is running: <code>json-server --watch db.json --port 5000</code>
          </div>
        </div>
      ) : featured.length === 0 ? (
        <div className="py-12 text-gray-600">No products to show.</div>
      ) : (
        <div className="flex gap-6 overflow-x-auto scrollbar-hide py-4 px-2">
          {featured.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );

  const VideoSection = () => (
    <div className="relative w-full h-[90vh] my-16 overflow-hidden">
      <video autoPlay muted loop className="w-full h-full object-cover">
        <source
          src="https://media.istockphoto.com/id/2192541214/video/young-woman-checking-her-smartphone-while-holding-shopping-bags-in-a-bustling-mall-enjoying-a.mp4?s=mp4-640x640-is&k=20&c=NGhKw881u_51CNqarkAKeAZ0lUE2SjZx7mgxTkQz044="
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-center items-center text-white">
        <h2 className="text-5xl md:text-6xl font-bold mb-4 animate-[fadeIn_1s_ease-in]">
          Modern Fashion
        </h2>
        <p className="text-xl mb-6 font-light">Elegance. Comfort. Confidence.</p>
        <Link
          to="/products"
          className="bg-white text-black font-semibold px-8 py-4 rounded-full hover:bg-gray-300 transition-all duration-300 transform hover:scale-105 shadow-2xl"
        >
          Explore Now
        </Link>
      </div>
    </div>
  );

  const FeatureCard = ({ icon: Icon, title, description, gradient, iconColor }) => (
    <div className={`p-8 bg-gradient-to-br ${gradient} rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group`}>
      <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
        <Icon className={iconColor} size={32} />
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );

  const AboutSection = () => (
    <div className="my-20 px-6 md:px-20 max-w-7xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">About Trendora</h2>
      <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto mb-8 rounded-full"></div>
      <p className="text-gray-700 text-center max-w-3xl mx-auto text-lg leading-relaxed mb-16">
        At <span className="font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Trendora</span>, 
        we believe fashion is more than just clothing - it's a lifestyle, a way to express yourself, and a form of confidence. 
        Our mission is to bring you the latest and trendiest styles for <span className="font-medium">Men, Women, and Kids</span> with 
        premium quality, comfort, and affordability.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </div>
  );

  const NewsletterSection = () => (
    <div className="bg-gradient-to-r from-gray-300 via-gray-700 to-black text-white py-16 px-6 my-16">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
        <p className="text-lg mb-8 opacity-90">
          Subscribe to get exclusive deals and early access to new collections
        </p>
        <div className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/50"
          />
          <button className="bg-white text-purple-600 font-semibold px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );

  // Main Render
  return (
    <div className="text-center bg-gradient-to-b from-gray-50 to-white">
      <HeroSection />
      <AnnouncementBar />

      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-[fadeIn_1s_ease-in]">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
              Explore Collections
            </h2>
            <p className="text-gray-600 text-lg">Curated styles for every occasion</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {categories.map((category, index) => (
              <CategoryCard key={index} {...category} />
            ))}
          </div>

          <TrendingSection />
        </div>
      </div>

      <VideoSection />
      <AboutSection />
      <NewsletterSection />

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Home;