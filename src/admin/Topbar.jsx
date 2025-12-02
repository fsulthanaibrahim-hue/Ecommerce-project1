import React from "react";
import { Search, Menu, X, Sun, Moon, LogOut } from "lucide-react";

export default function Topbar({ isMobile, toggleSidebar, onLogout, dark, setDark }) {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700 shadow">
      <div className="flex items-center gap-3">
        {isMobile && (
          <button onClick={toggleSidebar} className="text-gray-300 hover:text-yellow-400">
            <Menu className="w-6 h-6" />
          </button>
        )}
        <div className="text-xl font-bold text-yellow-400">Rocker Admin</div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center bg-gray-700 px-3 py-1 rounded">
          <Search className="w-4 h-4 text-gray-300 mr-2" />
          <input placeholder="Search..." className="bg-transparent outline-none text-sm text-gray-200" />
        </div>

        <button
          onClick={() => setDark((d) => !d)}
          className="p-2 rounded hover:bg-gray-700 text-gray-300"
          title="Toggle theme"
        >
          {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
{/* 
        <button onClick={onLogout} className="flex items-center gap-2 text-red-400 hover:text-red-300 transition px-2 py-1 rounded">
          <LogOut className="w-5 h-5" />
          <span className="hidden sm:inline">Logout</span>
        </button> */}
      </div>
    </header>
  );
}










