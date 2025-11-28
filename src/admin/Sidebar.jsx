// import React, { useState, useMemo } from "react";
// import { Users, Box, BarChart3, ShoppingCart, LogOut, IndianRupee } from "lucide-react";

// import UsersManagement from "./UsersManagement";
// import ProductsManagement from "./ProductsManagement";
// import OrdersManagement from "./OrdersManagement"; 
// import Topbar from "./Topbar";

// const Sidebar = ({ activeTab, setActiveTab, onLogout }) => {
//   const NavItem = ({ tabKey, icon: Icon, label }) => (
//     <button
//       onClick={() => {
//         if (tabKey === "logout") {
//           onLogout();
//         } else {
//           setActiveTab(tabKey);
//         }
//       }}
//       className={`flex items-center w-full gap-3 p-3 rounded-lg transition duration-200
//         ${activeTab === tabKey && tabKey !== "logout"
//           ? "bg-yellow-600 text-white shadow-lg"
//           : "text-gray-300 hover:bg-gray-700 hover:text-yellow-400"
//         }`}
//     >
//       <Icon className="w-5 h-5" />
//       <span className="font-medium">{label}</span>
//     </button>
//   );

//   return (
//     <aside className="w-64 p-4 border-r border-gray-800 bg-gray-800 flex-shrink-0 shadow-2xl flex flex-col justify-between">
//       <div>
//         <h2 className="text-2xl font-extrabold mb-8 text-white">Rocker Admin</h2>
//         {/* <div className="space-y-2">
//           <NavItem tabKey="/admin/dashboard" icon={BarChart3} label="Dashboard" />
//           <NavItem tabKey="/admin/products" icon={Box} label="Products" />
//           <NavItem tabKey="/users" icon={Users} label="Users" />
//           <NavItem tabKey="/orders" icon={ShoppingCart} label="Orders" />
//           <NavItem tabKey="/logout" icon={LogOut} label="Logout" />

        
//         </div> */}

//          {/* <button 
//           className="text-red"
//           onClick={() => 
//             useNavigate("/admin/products")
//           }>
//             Products
//           </button> */}


//       </div>

       

//       <div className="mt-8 pt-4 border-t border-gray-700">
//         <h3 className="text-xs uppercase font-semibold text-gray-500 mb-2">Reports</h3>
//         <button className="flex items-center w-full gap-3 p-3 text-gray-400 hover:bg-gray-700 rounded-lg transition duration-200">
//           <IndianRupee className="w-5 h-5" />
//           <span className="font-medium">Revenue</span>
//         </button>
//       </div>
//     </aside>
//   );
// };

// const DashboardContent = () => (
//   <div>
//     <h2 className="text-2xl text-white font-bold mb-4">Welcome to Admin Dashboard</h2>
//     <p className="text-gray-400">Select a tab from the sidebar to manage your site.</p>
//   </div>
// );

// const AdminDashboard = () => {
//   const [activeTab, setActiveTab] = useState("dashboard");

//   // Handle logout
//   const handleLogout = () => {
//     localStorage.removeItem("loggedInUser"); // or your token
//     window.location.href = "/login"; // redirect to login page
//   };

//   const renderContent = useMemo(() => {
//     switch (activeTab) {
//       case "dashboard":
//         return <DashboardContent />;
//       case "products":
//         return <ProductsManagement />;
//       case "users":
//         return <UsersManagement />;
//       case "orders":
//         return <OrdersManagement />;
//       default:
//         return <DashboardContent />;
//     }
//   }, [activeTab]);

//   return (
//     <div className="flex min-h-screen bg-gray-900 font-sans">
//       <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />
//       <div className="flex-1 flex flex-col overflow-y-auto">
//         <Topbar />
//         <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-gray-900">
//           <h1 className="text-3xl font-bold mb-8 text-white capitalize">{activeTab} Overview</h1>
//           {renderContent}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;








import React from "react";
import { Box, Users as UsersIcon, ShoppingCart, LogOut, BarChart3 } from "lucide-react";
import toast from "react-hot-toast";

export default function Sidebar({ activeTab, setActiveTab, isOpen, toggleSidebar, isMobile }) {
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
            <NavItem keyName="dashboard" Icon={BarChart3} label="Dashboard" />
            <NavItem keyName="products" Icon={Box} label="Products" />
            <NavItem keyName="users" Icon={UsersIcon} label="Users" />
            <NavItem keyName="orders" Icon={ShoppingCart} label="Orders" />
            <button onClick={() => toast('Logging out')} className="flex items-center gap-3 w-full p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-yellow-400">
              <LogOut className="w-5 h-5" /> <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>

        <div className="text-xs text-gray-400 mt-6">© {new Date().getFullYear()} Rocker</div>
      </aside>
    </>
  );
}




