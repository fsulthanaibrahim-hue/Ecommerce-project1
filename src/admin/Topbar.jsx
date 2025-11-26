import React from "react";
import { LogOut, Menu, X } from "lucide-react";

const Topbar = ({ onLogout, toggleSidebar, isMobile }) => (
  <header className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700 shadow-lg">
    <div className="flex items-center gap-3">
      {isMobile && (
        <button onClick={toggleSidebar} className="text-gray-300 hover:text-yellow-400">
          <Menu className="w-6 h-6" />
        </button>
      )}
      <div className="text-xl font-bold text-yellow-400">Rocker Admin</div>
    </div>
    <div className="flex items-center space-x-4">
      <span className="text-gray-300 hidden sm:block">Hello, Admin</span>
      <button onClick={onLogout} className="flex items-center gap-2 text-red-400 hover:text-red-300 transition">
        <LogOut className="w-5 h-5" />
        <span className="hidden sm:inline">Logout</span>
      </button>
    </div>
  </header>
);

export default Topbar;

