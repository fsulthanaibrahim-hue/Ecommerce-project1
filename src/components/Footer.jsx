import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-200 py-8 mt-10">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <h2 className="text-2xl font-bold mb-3">Trendora</h2>
                    <p className="text-sm text-gray-400">
                        Discover the latest trends in fashion for Men, Women & Kids.
                    </p>
                </div>

                <div>
                   <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
                   <ul className="space-y-2 text-gray-400">
                     <li><a href="/" className="hover:text-white">Home</a></li>
                     <li><a href="/men" className="hover:text-white">Men</a></li>
                     <li><a href="/women" className="hover:text-white">Women</a></li>
                     <li><a href="/kids" className="hover:text-white">Kids</a></li>
                   </ul> 
                </div>

                <div>
                   <h3 className="text-lg font-semibold mb-3">Follow Us</h3> 
                   <div className="flex space-x-4">
                    <a href="#" className="hover:text-white"><Facebook /></a>
                    <a href="#" className="hover:text-white"><Instagram /></a>
                    <a href="#" className="hover:text-white"><Twitter /></a>
                   </div>
                </div>
            </div>

            <div className="text-center text-gray-500 text-sm mt-8 border-t border-gray-700 pt-4">
                © {new Date().getFullYear()} Trendora. All rights reserved.
            </div>
        </footer>
    );
};
export default Footer;



