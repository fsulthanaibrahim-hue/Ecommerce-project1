// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Heart, ShoppingBag, User, Menu, X } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { clearCart } from "../redux/CartSlice";
// import logo from "../assets/logo.png";


// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [userOpen, setUserOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

// // Get cart and wishlist data from Redux
//   const cartItems = useSelector((state) => state.cart.items);
//   const wishlistItems = useSelector((state) => state.wishlist.items);

//   useEffect(() => {
//     const loggedIn = localStorage.getItem("isLoggedIn") === "true";
//     setIsLoggedIn(loggedIn);
//   }, []);

//   const handleLogout = () => {
//     ["user", "token", "wishlist", "cart", "isLoggedIn", "cartItems"].forEach((item) =>
//       localStorage.removeItem(item)
//     );

//     dispatch(clearCart());
//     setIsLoggedIn(false);
//     setUserOpen(false);
//     setMenuOpen(false);
//     navigate("/login");
//   };

//   return (
//     <nav className="w-full shadow-md bg-white fixed top-0 left-0 z-50">
//       <div className="flex justify-between items-center px-6 py-4">

//         <Link to="/" className="text-2xl font-bold tracking-wide text-gray-800">
//           <img src={logo} alt="TRENDORA logo" className="h-6 w-auto" />
//         </Link>

//         <div className="hidden md:flex items-center space-x-6">
//           {isLoggedIn && (
//             <>
            
//              {/* Wishlist with count */}
//               <Link to="/wishlist" className="relative text-gray-600 hover:text-black">
//                 <Heart className="w-6 h-6" />
//                 {wishlistItems.length > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-black text-white text-xs px-1 rounded-full">
//                     {wishlistItems.length}
//                   </span>
//                 )}
//               </Link>

//               {/* Cart with count */}
//               <Link to="/cart" className="relative text-gray-600 hover:text-black">
//                 <ShoppingBag className="w-6 h-6" />
//                 {cartItems.length > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-black text-white text-xs px-1 rounded-full">
//                     {cartItems.length}
//                   </span>
//                 )}
//               </Link>
//             </>
//           )}

//           {/* User Dropdown */}
//           <div className="relative">
//             <button
//               onClick={() => setUserOpen(!userOpen)}
//               className="text-gray-600 hover:text-black"
//             >
//               <User className="w-6 h-6" />
//             </button>

//             {userOpen && (
//               <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg p-2">
//                 {isLoggedIn ? (
//                   <>
//                     <Link
//                       to="/profile"
//                       className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
//                       onClick={() => setUserOpen(false)}
//                     >
//                       Profile
//                     </Link>
//                     <Link
//                       to="/orders"
//                       className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
//                       onClick={() => setUserOpen(false)}
//                     >
//                       Orders
//                     </Link>
//                     <button
//                       onClick={handleLogout}
//                       className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded"
//                     >
//                       Logout
//                     </button>
//                   </>
//                 ) : (
//                   <Link
//                     to="/login"
//                     className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
//                     onClick={() => setUserOpen(false)}
//                   >
//                     Login
//                   </Link>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Mobile Menu Button */}
//         <button
//           className="md:hidden text-gray-700"
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           {menuOpen ? <X size={28} /> : <Menu size={28} />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="md:hidden bg-white px-6 pb-4 shadow-md">
//           {isLoggedIn && (
//             <>
//               {/* Wishlist Mobile */}
//               <Link
//                 to="/wishlist"
//                 className="flex items-center gap-3 py-2 text-gray-700 hover:text-black"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 <Heart />
//                 Wishlist
//                 {wishlistItems.length > 0 && (
//                   <span className="ml-auto bg-black text-white text-xs px-2 rounded-full">
//                     {wishlistItems.length}
//                   </span>
//                 )}
//               </Link>

//               {/* Cart Mobile */}
//               <Link
//                 to="/cart"
//                 className="flex items-center gap-3 py-2 text-gray-700 hover:text-black"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 <ShoppingBag />
//                 Cart
//                 {cartItems.length > 0 && (
//                   <span className="ml-auto bg-black text-white text-xs px-2 rounded-full">
//                     {cartItems.length}
//                   </span>
//                 )}
//               </Link>
//             </>
//           )}

//           <hr className="my-2" />

//           {isLoggedIn ? (
//             <>
//               <Link
//                 to="/profile"
//                 className="block py-2 text-gray-700 hover:text-black"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 Profile
//               </Link>
//               <Link
//                 to="/orders"
//                 className="block py-2 text-gray-700 hover:text-black"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 Orders
//               </Link>
//               <button
//                 onClick={handleLogout}
//                 className="block w-full text-left py-2 text-red-600 hover:text-red-800"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <Link
//               to="/login"
//               className="block py-2 text-gray-700 hover:text-black"
//               onClick={() => setMenuOpen(false)}
//             >
//               Login
//             </Link>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;






















import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Heart, ShoppingBag, User, Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../redux/CartSlice";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // detect admin page
  const isAdminPage = location.pathname.startsWith("/admin");

  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogout = () => {
    ["user", "token", "wishlist", "cart", "isLoggedIn", "cartItems"].forEach((item) =>
      localStorage.removeItem(item)
    );
    dispatch(clearCart());
    setIsLoggedIn(false);
    setUserOpen(false);
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <nav className="w-full shadow-md bg-white fixed top-0 left-0 z-50">
      <div className="flex justify-between items-center px-6 py-4">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide text-gray-800">
          <img src={logo} alt="TRENDORA logo" className="h-6 w-auto" />
        </Link>

        {/* Desktop Items */}
        <div className="hidden md:flex items-center space-x-6">

          {/* ✔ Hide Wishlist & Cart on Admin Page */}
          {!isAdminPage && isLoggedIn && (
            <>
              <Link to="/wishlist" className="relative text-gray-600 hover:text-black">
                <Heart className="w-6 h-6" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs px-1 rounded-full">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              <Link to="/cart" className="relative text-gray-600 hover:text-black">
                <ShoppingBag className="w-6 h-6" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs px-1 rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            </>
          )}

          {/* User Icon */}
          <div className="relative">
            <button
              onClick={() => setUserOpen(!userOpen)}
              className="text-gray-600 hover:text-black"
            >
              <User className="w-6 h-6" />
            </button>

            {userOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg p-2">
                {isLoggedIn ? (
                  <>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                      onClick={() => setUserOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                      onClick={() => setUserOpen(false)}
                    >
                      Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                    onClick={() => setUserOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
