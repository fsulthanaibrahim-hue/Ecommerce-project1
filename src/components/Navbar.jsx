import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingBag, User } from "lucide-react";  
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/CartSlice";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
 
    useEffect(() => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedIn);
    }, []);

    const handleLogout = () => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("wishlist");
      localStorage.removeItem("cart");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("cartItems");

      dispatch(clearCart());
      setIsLoggedIn(false);
      setOpen(false);
      navigate("/login");
    };

    return (
       <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md relative z-50">
            <Link to="/" className="text-2xl font-bold tracking-wide text-gray-800">Trendora</Link>


            <div className="flex items-center space-x-5">
          
            {isLoggedIn && (
               <Link to="/wishlist" className="hover:text-black text-gray-600">
                  <Heart className="w-6 h-6" />
               </Link> 
            )} 

            {isLoggedIn && (
                <Link to="/cart" className="hover:text-black text-gray-600">
                   <ShoppingBag className="w-6 h-6" />
               </Link>
            )}  
               

              <div className="relative">
                  <button 
                  onClick={() => setOpen(!open)}
                  className="hover:text-black text-gray-600 focus:outline-none"
                >
                    <User className="w-6 h-6" />
                </button>
                
                {open && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg p-2">
                    {isLoggedIn ? (
                      <>
                        <Link 
                         to="/profile"
                         className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                         onClick={() => setOpen(false)}
                        >
                          Profile
                        </Link> 

                        <Link 
                         to="/orders"
                         className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                         onClick={() => setOpen(false)}
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
                      <>
                       <Link 
                        to="/login"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                        onClick={() => setOpen(false)}
                       >
                        Login
                       </Link>  

                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </nav>
      );
  };
export default Navbar;        
