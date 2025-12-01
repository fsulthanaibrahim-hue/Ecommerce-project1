import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Box, Users as UsersIcon, ShoppingCart, LogOut, BarChart3, X } from "lucide-react";
import toast from "react-hot-toast";

export default function Sidebar({ activeTab, setActiveTab, isOpen, toggleSidebar, isMobile }) {
  const handleLogout = () => {
    localStorage.removeItem("admin");
    window.location.href = "/login";
  };


  const NavItem = ({ keyName, Icon, label }) => (
    <button
      onClick={() => { setActiveTab(keyName); if (isMobile) toggleSidebar(); }}
      className={`flex items-center gap-3 w-full p-3 rounded-lg transition ${activeTab === keyName ? "bg-yellow-500 text-white shadow-lg" : "text-gray-300 hover:bg-gray-700 hover:text-yellow-400"}`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <>
      {isMobile && isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleSidebar} />}
      <aside className={`${isMobile ? `fixed top-0 left-0 h-full z-50 transform transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}` : 'relative'} w-64 p-4 border-r border-gray-700 bg-gray-800 flex-shrink-0 shadow-2xl flex flex-col justify-between`}>
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-extrabold text-white">Rocker Admin</h2>
            {isMobile && (
              <button onClick={toggleSidebar} className="text-gray-300 hover:text-yellow-400">
                <X className="w-6 h-6" />
              </button>
            )}
          </div>

          <div className="space-y-2">
            <NavItem keyName="/admin" Icon={BarChart3} label="Dashboard" />
            <NavItem keyName="/admin/products" Icon={Box} label="Products" />
            <NavItem keyName="/admin/users" Icon={UsersIcon} label="Users" />
            <NavItem keyName="/admin/orders" Icon={ShoppingCart} label="Orders" />
            <button 
              onClick={handleLogout} 
              className="flex items-center gap-3 w-full p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-yellow-400">
              <LogOut size={20} /> <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>

        <div className="text-xs text-gray-400 mt-6">© {new Date().getFullYear()} Rocker</div>
      </aside>
    </>
  );
}




