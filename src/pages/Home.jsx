import React from "react";
import men from "../assets/men.png";
import women from "../assets/women.png";
import kids from "../assets/kids.png";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="p-8 text-center">
            <div 
               className="relative w-full h-[80vh] flex items-center justify-center bg-cover bg-center" >
                <img src="https://media.istockphoto.com/id/653003428/photo/fashionable-clothes-in-a-boutique-store-in-london.jpg?s=612x612&w=0&k=20&c=UafU4a4xSbepJow4kvNu0q-LD4hFUoli7q3fvwkp79s=" 
                alt="fashion store" 
                 className="absolute inset-0 w-screen h-full"
                />
                 
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative z-10 text-white px-6">
                   <h1 className="text-5xl md:text-6xl font-bold mb-4">
                     Discover Your Style
                   </h1> 
                   <p className="text-lg md:text-xl mb-6">
                     New Arrivals for Men, Women & Kids
                   </p>
                   <Link 
                      to="/products"
                   className="bg-black text-gray font-semibold px-6 py-3 rounded-full hover:bg-white hover:text-black transition">
                     Shop Now
                   </Link>
                </div>
            </div>
            {/* <h1 className="text-3xl font-bold mb-8 ">Welcome to Trendora</h1> */}

            {/* <div>
               <h2 className="text-3xl font-bold mb-3">New one</h2>
               <img 
                src="zias-ecom/src/assets/hero.mp4" alt="hero"
                className="w-full h-[90vh] object-cover"
               /> 
                </div> */}


            <div className="p-8">
               <h2 className="text-3xl font-bold mb-8">Explore Collections</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="relative group overflow-hidden rounded-lg shadow-md">
                 <img
                    src={men} 
                    alt="Men" 
                    className="w-full h-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-110" 
                  />
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <h2 className="text-white mb-3 text-2xl font-semibold">Men</h2>
                  <Link 
                   to="/products?category=men"
                   className="text-black bg-white rounded-full px-4 py-2 font-medium hover:bg-gray-400 transition relative z-10 pointer-events-auto">
                     Shop Now
                  </Link>
                </div> 
               </div> 

               <div className="relative group overflow-hidden rounded-lg shadow-md">
                <img 
                  src={women} 
                  alt="Women" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <h2 className="text-white text-2xl font-semibold mb-3">Women</h2>
                  <Link
                   to="/products?category=women"
                   className="text-black bg-white rounded-full px-4 py-2 rounded-full font-medium hover:bg-gray-400 transition relative z-10 pointer-events-auto">
                     Shop Now
                  </Link>  
                </div>
               </div>

               <div className="relative group overflow-hidden rounded-lg shadow-md">
                <img 
                  src={kids} 
                  alt="Kids" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <h2 className="text-white text-2xl font-semibold mb-3">Kids</h2>
                  <Link 
                  to="/products?category=kids"
                  className="text-black bg-white rounded-full px-4 py-2 rounded-full font-medium hover:bg-gray-400 transition relative z-10 pointer-events-auto">
                     Shop Now 
                  </Link>
                </div>
              </div>
            </div>

            
                <div className="relative w-full h-[90vh] my-8">
                  <video
                    autoPlay
                    muted
                    loop
                    className="w-full h-full onject-cover rounded-lg"
                  >
                     <source src="https://media.istockphoto.com/id/2079695162/video/fashionable-hispanic-woman-in-a-dress-going-over-some-trendy-outfits-in-a-clothing-rack.mp4?s=mp4-640x640-is&k=20&c=a0qD-NFUaURpvV43_9OiqKLKXVM9qKj6kFcDG3BRHbw=" type="" />
                     Your browser does not support the video tag.
                  </video>  
                  <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Modern Fashion</h2>
                    <p className="tetx-lg mb-4">Elegance. Comfort. Confidence.</p>
                    <Link 
                      to="/products"
                      className="bg-white text-black font-semibold px-6 py-3 rounded-full hover:bg-gray-400 transition"
                     >
                        Explore Now
                     </Link> 
                  </div>
             </div>
        </div>  
    );
}
export default Home;




