import React from "react";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-200 mt-auto">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-4">Trendora</h2>
                        <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                            Discover the latest trends in fashion for Men, Women & Kids. Quality meets style.
                        </p>
                        <div className="flex space-x-3">
                            <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors">
                                <Twitter size={18} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="/" className="text-slate-400 hover:text-white transition-colors text-sm">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="/men" className="text-slate-400 hover:text-white transition-colors text-sm">
                                    Men's Collection
                                </a>
                            </li>
                            <li>
                                <a href="/women" className="text-slate-400 hover:text-white transition-colors text-sm">
                                    Women's Collection
                                </a>
                            </li>
                            <li>
                                <a href="/kids" className="text-slate-400 hover:text-white transition-colors text-sm">
                                    Kids Collection
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Customer Service</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">
                                    Shipping Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">
                                    Returns & Exchanges
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="cursor-pointer">
                        <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-slate-400 text-sm">
                                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                                <span>123 Fashion Street, New York</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-400 text-sm">
                                <Phone size={18} className="flex-shrink-0" />
                                <span>+91 9087654321</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-400 text-sm">
                                <Mail size={18} className="flex-shrink-0" />
                                <span>support@trendora.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-sm">
                        © {new Date().getFullYear()} Trendora. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm">
                        <a href="#" className="text-slate-500 hover:text-white transition-colors">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-slate-500 hover:text-white transition-colors">
                            Terms of Service
                        </a>
                        <a href="#" className="text-slate-500 hover:text-white transition-colors">
                            Cookie Policy
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;