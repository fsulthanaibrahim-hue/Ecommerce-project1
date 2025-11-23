import React from "react";
import { Users, Box, DollarSign, BarChart3 } from "lucide-react";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const NavItem = ({ tabKey, icon: Icon, label }) => (
    <button
      onClick={() => setActiveTab(tabKey)}
      className={`flex items-center w-full gap-3 p-3 rounded-lg transition duration-200
        ${activeTab === tabKey
          ? "bg-yellow-600 text-white shadow-lg"
          : "text-gray-300 hover:bg-gray-700 hover:text-yellow-400"
        }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <aside className="w-64 p-4 border-r border-gray-800 bg-gray-800 flex-shrink-0 shadow-2xl hidden md:block">
      <h2 className="text-2xl font-extrabold mb-8 text-white">Rocker Admin</h2>
      
      <div className="space-y-2">
        <NavItem tabKey="dashboard" icon={BarChart3} label="Dashboard" />
        <NavItem tabKey="products" icon={Box} label="Products" />
        <NavItem tabKey="users" icon={Users} label="Users" />
      </div>
      
      <div className="mt-8 pt-4 border-t border-gray-700">
        <h3 className="text-xs uppercase font-semibold text-gray-500 mb-2">Reports</h3>
        <div className="space-y-2">
          <button className="flex items-center w-full gap-3 p-3 text-gray-400 hover:bg-gray-700 rounded-lg transition duration-200">
            <DollarSign className="w-5 h-5" />
            <span className="font-medium">Revenue</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
