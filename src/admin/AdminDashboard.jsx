// import React, { useEffect, useMemo, useState } from "react";
// import {
//   Users,
//   Box,
//   ShoppingCart,
//   LogOut,
//   Activity,
//   IndianRupee,
//   BarChart3,
//   TrendingUp,
//   TrendingDown,
//   Search,
//   Menu,
//   X,
// } from "lucide-react";
// import toast, { Toaster } from "react-hot-toast";
// import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
// import { useNavigate } from "react-router-dom";

// /*
//   Notes about API:
//   - Base URL: http://localhost:5000
//   - Expected collections in db.json: products, users, order
// */

// const API = "http://localhost:5000";

// // ---------- Helpers ----------
// const safeLocale = (n) => (typeof n === "number" ? n.toLocaleString() : String(n || 0));
// const fmtDate = (iso) => {
//   try {
//     if(!iso) return "-";
//     return new Date(iso).toLocaleString();
//   } catch {
//     return iso || "-";
//   }
// };

// // ---------- Topbar ----------
// function Topbar({ isMobile, toggleSidebar, onLogout }) {

//   return (
//     <header className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800">
//       <div className="flex items-center gap-3">
//         {isMobile && (
//           <button onClick={toggleSidebar} className="text-gray-400 hover:text-white">
//             <Menu className="w-6 h-6" />
//           </button>
//         )}
        
//         <div className=" bg-[#0F172A] py-1 text-center border-b border-[#1E293B]">
//           <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
//           TRENDORA
//           </h1>
//         </div>
//       </div>

//       <div className="flex items-center gap-4">
//         {/* <div className="hidden sm:flex items-center bg-slate-800 px-4 py-2 rounded-lg">
//           <Search className="w-4 h-4 text-gray-400 mr-2" />
//           <input placeholder="Search..." className="bg-transparent outline-none text-sm text-gray-300 w-48" />
//         </div> */}

//         <button
//           onClick={onLogout}
//           className="flex items-center gap-2 text-gray-400 hover:text-white transition px-3 py-2 rounded-lg hover:bg-slate-800"
//         >
//           <LogOut className="w-5 h-5" />
//         </button>
//       </div>
//     </header>
//   );
// }

// // ---------- Sidebar ----------
// function Sidebar({ activeTab, setActiveTab, isOpen, toggleSidebar, isMobile }) {
//   const changeTab = (tab) => {
//     if (activeTab !== tab) setActiveTab(tab);
//     if (isMobile) toggleSidebar;
//   };

// const navigate = useNavigate();


//   const handleLogout = () => {
//     localStorage.removeItem("admin");
//     localStorage.removeItem("isAdmin");
//     localStorage.removeItem("isLoggedIn");
//     localStorage.removeItem("loggedInUser");
//     window.location.href = "/login";
//   };

//   const NavItem = ({ keyName, Icon, label }) => (
//     <button
//       onClick={() => changeTab(keyName)}
//       className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all ${
//         activeTab === keyName   
//           ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg" 
//           : "text-gray-400 hover:bg-slate-800 hover:text-white"
//       }`}
//     >
//       <Icon className="w-5 h-5" />
//       <span className="font-medium">{label}</span>
//     </button>
//   );


//   return (
//     <>
//       {isMobile && isOpen && 
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleSidebar} />}
//        <aside className={`${
//         isMobile 
//           ? `fixed top-0 left-0 h-full z-50 transform transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}` 
//           : 'relative'
//       } w-64 p-6 bg-slate-900 flex-shrink-0 flex flex-col`}>

//           {/* <div className="flex items-center justify-between mb-12">
//             <h2 className="text-xl font-bold text-white">Dashboard</h2>
//           </div> */}
          

//             {/* <div className="flex items-center gap-2">
//               <BarChart3 className="w-8 h-8 text-orange-500" />
//             </div>
//             {isMobile && (
//               <button onClick={toggleSidebar} className="text-gray-400 hover:text-white">
//                 <X className="w-6 h-6" />
//               </button>
//             )}
//           </div> */}
//       {/* 
//           <div className="space-y-2">
//             <NavItem keyName="dashboard" Icon={BarChart3} label="Dashboard" />
//             <NavItem keyName="products" Icon={Box} label="Products" />
//             <NavItem keyName="users" Icon={Users} label="Users" />
//           </div> */}

//          <div className="space-y-2 flex-1 mt-20">
//            <NavItem keyName="dashboard" Icon={BarChart3} label="Dashboard" />
//            <NavItem keyName="products" Icon={Box} label="Products" />
//            <NavItem keyName="users" Icon={Box} label="Users" />
//            <NavItem keyName="orders" Icon={ShoppingCart} label="Orders" />
 

//            <button
//             onClick={handleLogout}
//             className="flex items-center gap-3 px-4 py-2 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition mt-4"
//            >
//             <LogOut size={20} />
//             <span className="font-medium">Logout</span>
//            </button>
//           </div>  
//       </aside>
//     </>
//   );
// }

// // ---------- StatsCard ----------
// function StatsCard({ title, value, change, Icon, gradientFrom, gradientTo }) {
//   const isPositive = typeof change === "string" && change.includes("+");
//   const isNegative = typeof change === "string" && change.includes("-");
  
//   return (
//     <div className={`p-6 rounded-2xl bg-gradient-to-br ${gradientFrom} ${gradientTo} shadow-xl hover:shadow-2xl transition-all`}>
//       <div className="flex justify-between items-start">
//         <div className="flex-1">
//           <p className="text-sm font-medium text-white/80 mb-2">{title}</p>
//           <p className="text-3xl font-bold text-white">{value}</p>
//         </div>
//         <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm">
//           <Icon className="w-6 h-6 text-white" />
//         </div>
//       </div>

//       {change && (
//         <div className={`mt-4 text-sm flex items-center font-medium ${
//           isPositive ? "text-green-200" : isNegative ? "text-red-200" : "text-white/70"
//         }`}>
//           {isPositive && <TrendingUp className="w-4 h-4 mr-1" />}
//           {isNegative && <TrendingDown className="w-4 h-4 mr-1" />}
//           {change}
//         </div>
//       )}
//     </div>
//   );
// }

// // ---------- DashboardContent ----------
// function DashboardContent({ products = [], users = [], orders = [] }) {
//   const salesData = [
//     { month: 'Nov', value1: 30, value2: 25 },
//     { month: 'Nov', value1: 35, value2: 30 },
//     { month: 'Nov', value1: 42, value2: 35 },
//     { month: 'Nov', value1: 38, value2: 40 },
//     { month: 'Nov', value1: 45, value2: 42 },
//     { month: 'Nov', value1: 52, value2: 48 },
//   ];

//   const orderStatusData = [
//     { month: 'Nov', orders: 10 },
//     { month: 'Nov', orders: 14 },
//     { month: 'Nov', orders: 12 },
//     { month: 'Nov', orders: 16 },
//     { month: 'Nov', orders: 18 },
//     { month: 'Nov', orders: 15 },
//   ];

//   const stats = useMemo(() => {
//     const totalOrders = Array.isArray(orders) ? orders.length : 0;
//     const totalRevenue = Array.isArray(orders) ? orders.reduce((s, o) => s + (Number(o.total) || 0), 0) : 0;
//     const newUsers = Array.isArray(users) ? users.length : 0;
//     const returns = Array.isArray(orders) ? orders.filter((o) => {
//       const st = String(o.status || "").toLowerCase();
//       return st === "cancelled" || st === "returned";
//     }).length : 0;

//     return {
//       totalOrders,
//       ordersChange: "+25% this month",
//       totalRevenue,
//       revenueChange: "+15% this month",
//       newUsers,
//       usersChange: "-16% this month",
//       returns,
//       returnsChange: "-4% this month",
//     };
//   }, [products, users, orders]);

//   return (
//     <div className="space-y-6">
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         <StatsCard 
//           title="Total Orders" 
//           value={safeLocale(stats.totalOrders)} 
//           change={stats.ordersChange} 
//           Icon={ShoppingCart} 
//           gradientFrom="from-orange-600" 
//           gradientTo="to-orange-800" 
//         />
//         <StatsCard 
//           title="Total Revenue" 
//           value={`₹${(stats.totalRevenue).toLocaleString()}`} 
//           change={stats.revenueChange} 
//           Icon={IndianRupee} 
//           gradientFrom="from-green-600" 
//           gradientTo="to-green-800" 
//         />
//         <StatsCard 
//           title="New Users" 
//           value={safeLocale(stats.newUsers)} 
//           change={stats.usersChange} 
//           Icon={Users} 
//           gradientFrom="from-blue-600" 
//           gradientTo="to-blue-800" 
//         />
//         <StatsCard 
//           title="Total Returns" 
//           value={safeLocale(stats.returns)} 
//           change={stats.returnsChange} 
//           Icon={Activity} 
//           gradientFrom="from-red-600" 
//           gradientTo="to-red-800" 
//         />
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
//         <div className="bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-700">
//           <h3 className="text-xl font-bold text-white mb-6">Sales Overview</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <AreaChart data={salesData}>
//               <defs>
//                 <linearGradient id="colorValue1" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
//                   <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
//                 </linearGradient>
//                 <linearGradient id="colorValue2" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
//                   <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
//                 </linearGradient>
//               </defs>
//               <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
//               <XAxis dataKey="month" stroke="#9ca3af" />
//               <YAxis stroke="#9ca3af" />
//               <Tooltip 
//                 contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
//                 labelStyle={{ color: '#fff' }}
//               />
//               <Area type="monotone" dataKey="value1" stroke="#f59e0b" fillOpacity={1} fill="url(#colorValue1)" />
//               <Area type="monotone" dataKey="value2" stroke="#3b82f6" fillOpacity={1} fill="url(#colorValue2)" />
//             </AreaChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-700">
//           <h3 className="text-xl font-bold text-white mb-6">Order Status</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={orderStatusData}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
//               <XAxis dataKey="month" stroke="#9ca3af" />
//               <YAxis stroke="#9ca3af" />
//               <Tooltip 
//                 contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
//                 labelStyle={{ color: '#fff' }}
//               />
//               <Bar dataKey="orders" fill="#ec4899" radius={[8, 8, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ---------- Users Management ----------
// function UsersPage({ users = [], onDelete, onToggleBlock }) {
//   if (!Array.isArray(users)) return <p className="text-white">Loading users...</p>;

//   return (
//     <div>
//       <h2 className="text-2xl font-semibold mb-4 text-white">Users</h2>
//       <div className="overflow-x-auto bg-slate-800 p-4 rounded-2xl border border-slate-700">
//         <table className="w-full text-left">
//           <thead className="text-sm text-gray-400 border-b border-slate-700">
//             <tr>
//               <th className="p-3">ID</th>
//               <th className="p-3">Name</th>
//               <th className="p-3">Email</th>
//               <th className="p-3">Status</th>
//               <th className="p-3">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {users.map((u) => {
//               const isBlocked = u.status === "blocked" || u.blocked;

//               return (
//                 <tr key={u.id} className="border-t border-slate-700 text-white hover:bg-slate-700/50 transition">
//                   <td className="p-3 text-sm">{u.id}</td>
//                   <td className="p-3 text-sm">{u.name}</td>
//                   <td className="p-3 text-sm">{u.email}</td>

//                   <td className="p-3 text-sm">
//                     <span
//                       className={`px-2 py-1 rounded-full text-xs ${
//                         isBlocked
//                           ? "bg-red-500/20 text-red-400"
//                           : "bg-green-500/20 text-green-400"
//                       }`}
//                     >
//                       {isBlocked ? "blocked" : "active"}
//                     </span>
//                   </td>

//                   <td className="p-3 text-sm">
//                     <div className="flex gap-2">
//                     <button
//                       onClick={() => onToggleBlock && onToggleBlock(u.id)}
//                       className={`px-3 py-1 rounded-lg text-white text-sm transition ${
//                         isBlocked
//                           ? "bg-green-600 hover:bg-green-700"
//                           : "bg-red-600 hover:bg-red-700"
//                       }`}
//                     >
//                       {isBlocked ? "Unblock" : "Block"}
//                     </button>
//                   </div>  
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>

//         </table>
//       </div>
//     </div>
//   );
// }


      
// //------------Products management----------------------
// function ProductsPage({ products = [], onDeleteProduct, onAddProduct, onUpdateProduct }) {
//   const [showForm, setShowForm] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [formData, setFormData] = useState({ name: "", price: "", stock: "", image: "", description: "", category: "" });

//   const startEdit = (product) => {
//     setEditingId(product.id);
//     setFormData({ ...product });
//     setShowForm(true);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.name || !formData.price) return toast.error("Name & Price required");

//     const payload = { ...formData, price: Number(formData.price), stock: Number(formData.stock || 0) };

//     if (editingId) {
//       onUpdateProduct && onUpdateProduct  (editingId, payload);
//       toast.success("Product updated!");
//     } else {
//      onAddProduct &&   onAddProduct(payload);
//     }

//     setFormData({ name: "", price: "", stock: "", image: "", description: "", category: "" });
//     setEditingId(null);
//     setShowForm(false);
//   };

//   return (
//     <div className="p-4 text-white">
//       <div className="flex justify-between mb-4">
//         <h2 className="text-2xl font-semibold">Products</h2>
//         <button onClick={() => { setShowForm(!showForm); setEditingId(null); }} className="px-4 py-2 bg-green-600 rounded-lg">
//           {showForm ? "Close" : "Add product"}
//         </button>
//       </div>

//       {showForm && (
//         <form onSubmit={handleSubmit} className="bg-slate-800 p-6 rounded-2xl mb-6 border border-slate-700">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//             <input placeholder="Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="p-3 bg-slate-700 rounded-lg" />
//             <input placeholder="Price" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} className="p-3 bg-slate-700 rounded-lg" />
//             <input placeholder="Stock" value={formData.stock} onChange={e => setFormData({ ...formData, stock: e.target.value })} className="p-3 bg-slate-700 rounded-lg" />
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
//             <input placeholder="Image URL" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} className="p-3 bg-slate-700 rounded-lg" />
//             <input placeholder="Category" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="p-3 bg-slate-700 rounded-lg" />
//           </div>
//           <input placeholder="Description" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="input mt-3" />
//           {formData.image && <img src={formData.image} alt="preview" className="mt-4 w-32 h-32 rounded-lg object-cover border border-slate-600" />}
//           <button type="submit" className="mt-4 px-4 py-2 bg-indigo-600 rounded-lg">{editingId ? "Update Product" : "Save Product"}</button>
//         </form>
//       )}

//       <div className="overflow-auto rounded-lg border border-slate-700">
//         <table className="min-w-full bg-slate-800 text-left text-white text-sm">
//           <thead className="bg-slate-700 text-gray-300 uppercase text-xs">
//             <tr>
//               <th className="p-4">Image</th>
//               <th className="p-4">Name</th>
//               <th className="p-4">Category</th>
//               <th className="p-4">Price</th>
//               <th className="p-4">Stock</th>
//               <th className="p-4">Status</th>
//               <th className="p-4 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map(p => (
//               <tr key={p.id} className="border-b border-slate-700 hover:bg-slate-700/50">
//                 <td className="p-3"><img src={p.image} className="w-12 h-12 rounded-lg" /></td>
//                 <td className="p-3">{p.name}</td>
//                 <td className="p-3">{p.category ?? "_"}</td>
//                 <td className="p-3 text-orange-400 font-bold">₹{Number(p.price).toLocaleString()}</td>
//                 <td className="p-3">{p.stock ?? 0}</td>
//                 <td className="p-3">{(p.stock ?? 0) > 0 ? "In Stock" : "Out"}</td>
//                 <td className="p-3">
//                   <div className="flex justify-center gap-2">
//                     <button onClick={() => startEdit(p)} className="px-3 py-1 bg-blue-600 rounded text-white text-xs">Edit</button>
//                     <button onClick={() => onDeleteProduct(p.id)} className="px-3 py-1 bg-red-600 rounded text-white text-xs">Delete</button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//             {products.length === 0 && (
//               <tr>
//                 <td colSpan={7} className="p-6 text-center text-gray-400">No products found.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// // ---------- Orders Management ----------
// function OrdersPage({ orders = [], onAdvanceOrder }) {
//   if (!Array.isArray(orders)) {
//     return <p className="text-white">Loading orders...</p>;
//   }

//   return (
//     <div>
//       <h2 className="text-2xl font-semibold mb-4 text-white">Orders</h2>
//       <div className="space-y-3">
//         {orders.length === 0 && (
//           <div className="p-6 bg-slate-800 rounded-2xl border border-slate-700 text-gray-400">No orders available</div>
//         )}

//         {orders.map((o) => {
//           // FIX: Correct Name
//           const customerName = o.address?.name || o.shippingAddress?.name || o.userId || "Unknown";
//           // FIX: Correct Date
//           const orderDate = o.orderDate || o.date || createdAt;
//           const statusLower = String(o.status || "").toLowerCase();

//           return (
//             <div
//               key={o.id}
//               className="flex items-center justify-between p-4 bg-slate-800 rounded-2xl border border-slate-700 hover:border-orange-500 transition"
//             >
//               {/* LEFT SIDE */}
//               <div>
//                 <div className="font-medium text-white">
//                  {customerName}
//                 </div>

//                 <div className="text-sm text-gray-400 mt-1">
//                   {fmtDate(orderDate)}
//                 </div>
//               </div>

//               {/* RIGHT SIDE */}
//               <div className="text-right">
//                 <div className="font-semibold text-orange-400">
//                   ₹{safeLocale(Number(o.total) || Number(o.totalPrice) || 0)}
//                 </div>

//                 <div className="text-sm text-gray-400 mt-1">
//                   {String (o.status || "").toUpperCase()}
//                 </div>

//                 <div className="mt-2">
//                  <button 
//                    className={`px-3 py-1 rounded-lg text-sm text-white transition ${
//                     o.status === "pending"
//                      ? "bg-indigo-600"
//                      : statusLower === "packed"
//                      ? "bg-yellow-600"
//                      : statusLower === "shipped"
//                      ? "bg-green-600"
//                      : "bg-gray-600"
//                    }`}
//                   disabled={statusLower === "delivered"}
//                   onClick={() => onAdvanceOrder && onAdvanceOrder(o.id)}
//                  >
//                   {typeof o.status === "string"
//                     ? o.status.charAt(0).toUpperCase() + o.status.slice(1)
//                     : "Unknown"}
//                  </button> 
//                 </div>
//               </div>
//             </div>
//           );
//         })}

//       </div>
//     </div>
//   );
// }

// // ---------- Main Admin Dashboard ----------

// export default function AdminDashboard() {
//   const [activeTab, setActiveTab] = useState("dashboard");
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(typeof window !=="undefined" ? window.innerWidth < 768 : false);

//   const [products, setProducts] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [orders, setOrders] = useState([]);

//  //Detect mobile resize 
//   useEffect(() => {
//     const onResize = () => setIsMobile(window.innerWidth < 768);
//     window.addEventListener("resize", onResize);
//     return () => window.removeEventListener("resize", onResize);
//   }, []);

//   useEffect(() => {
//     fetchAll();
//   }, []);

//   async function fetchAll() {
//     fetchProducts();
//     fetchUsers();
//     fetchOrders();
//   }

//   async function fetchProducts() {
//     try {
//       const res = await fetch(`${API}/products`);
//       const data = await res.json();
//       setProducts(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error("fetchProducts:", err);
//       toast.error("Failed to fetch products");
//       setProducts([]);
//     }
//   }

//   async function fetchUsers() {
//     try {
//       const res = await fetch(`${API}/users`);
//       const data = await res.json();
//       setUsers(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error("fetchUsers:", err);
//       toast.error("Failed to fetch users");
//       setUsers([]);
//     }
//   }

//   async function fetchOrders() {
//     try {
//       const res = await fetch(`${API}/order`);
//       const data = await res.json();
//       setOrders(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error("fetchOrders:", err);
//       toast.error("Failed to fetch orders");
//       setOrders([]);
//     }
//   }

// //Product actions  
//   async function deleteProduct(id) {
//     try {
//       await fetch(`${API}/products/${id}`, { method: "DELETE" });
//       toast.success("Product deleted");
//       fetchProducts();
//     } catch (err) {
//       toast.error("Failed to delete product"); 
//     }
//   }

//   async function addProduct(payload) {
//     try {
//       await fetch(`${API}/products`, {
//           method: "POST", 
//           headers: { "Content-Type": "application/json" }, 
//           body: JSON.stringify(payload), 
//         });
//       toast.success("Product added");
//       fetchProducts();
//     } catch (err) {
//       toast.error("Failed to add product");
//     }
//   }

// //User actions  
//   async function deleteUser(id) {
//     try {
//       await fetch(`${API}/users/${id}`, { method: "DELETE" });
//       toast.success("User deleted");
//       fetchUsers();
//     } catch (err) {
//       toast.error("Failed to delete user");
//     }
//   }

//   // async function updateProduct(id, payload) {
//   //   try {
//   //     await fetch(`${API}/products/${id}`, {
//   //       method: "PUT", 
//   //       headers: { "Content-Type": "application/json" },
//   //       body: JSON.stringify(payload)
//   //     });
//   //     toast.success("Product updated!");
//   //     fetchProducts();
//   //   } catch {
//   //     toast.error("Failed to update product");
//   //   }
//   // }

//   async function toggleBlockUser(id) {
//     try {
//       const res = await fetch(`${API}/users/${id}`);
//       const user = await res.json();

//       if(!user || typeof user.blocked === "undefined") {
//         toast.error("Invalid user data");
//         return;
//       }

//       const newStatus = !user.blocked;
 
//       const updated = { 
//         ...user, 
//         blocked: newStatus, 
//         status: newStatus ? "blocked" : "active" 
//       };

//       await fetch(`${API}/users/${id}`, { 
//         method: "PUT", 
//         headers: { "Content-Type": "application/json" }, 
//         body: JSON.stringify(updated) 
//       });

//       toast.dismiss();
//       toast.success(newStatus ? "User blocked   " : "User unblocked ");

//       fetchUsers();
//     } catch (err) {
//       toast.dismiss()
//       toast.error("Failed to update user");
//     }
//   }

//   async function advanceOrder(id) {
//     try {
//       const res = await fetch(`${API}/order/${id}`);
//       const order = await res.json();

//       const statusFlow = ["Pending", "Processing", "Shipped", "Delivered"];
//       const currentIndex = statusFlow.indexOf(String(order.status || "").toLowerCase());

//       if (currentIndex === statusFlow.length   - 1) {
//         toast("Order already delivered");
//         return;
//       }

//       const nextStatus = statusFlow[currentIndex + 1];
//       const updatedOrder = { ...order, status: nextStatus };

//       await fetch(`${API}/order/${id}`, { 
//         method: "PUT", 
//         headers: { "Content-Type": "application/json" }, 
//         body: JSON.stringify(updatedOrder), 
//       });

//       setOrders(prev => 
//         prev.map((o) => (o.id === id ? updatedOrder : o)));
//         toast.success(`Order moved to ${nextStatus}`);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to update order");
//     }
//   }

//   const toggleSidebar = () => setSidebarOpen((s) => !s);
//   const handleLogout = () => {
//     localStorage.removeItem("admin");
//     localStorage.removeItem("isAdmin");
//     localStorage.removeItem("isLoggedIn");
//     localStorage.removeItem("loggedInUser");
//     toast.success("Logged out");
//     window.location.href = "/";
//   };

//   const renderContent = useMemo(() => {
//     switch (activeTab) {
//       case "dashboard":
//         return <DashboardContent products={products} users={users} orders={orders} />;
//       case "products":
//         return <ProductsPage products={products} onDeleteProduct={deleteProduct} onAddProduct={addProduct} onUpdateProduct={updateProduct} />;
//       case "users":
//         return <UsersPage users={users} onDelete={deleteUser} onToggleBlock={toggleBlockUser} />;
//       case "orders":
//         return <OrdersPage orders={orders} onAdvanceOrder={advanceOrder} />;
//       default:
//         return <DashboardContent products={products} users={users} orders={orders} />;
//     }
//   }, [activeTab, products, users, orders]);

//   return (
//     <div className="flex min-h-screen bg-slate-950 font-sans">
//       <Toaster />
//       <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} isOpen={sidebarOpen} toggleSidebar={toggleSidebar} isMobile={isMobile} />

//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Topbar isMobile={isMobile} toggleSidebar={toggleSidebar} onLogout={handleLogout} />

//         <main className="flex-1 p-6 sm:p-6 lg:p-8 bg-slate-950 overflow-y-auto">
//           <h1 className="text-3xl font-bold mb-8 text-white capitalize">{activeTab} Overview</h1>
//           {renderContent}
//         </main>
//       </div>
//     </div>
//   );
// }








import React, { useEffect, useMemo, useState } from "react";
import {
  Users,
  Box,
  ShoppingCart,
  LogOut,
  Activity,
  IndianRupee,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Search,
  Menu,
  X,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEye, FaBan, FaCheck } from "react-icons/fa";

/*
  Notes about API:
  - Base URL: http://localhost:5000
  - Expected collections in db.json: products, users, order (endpoint: /products, /users, /order)
*/

const API = "http://localhost:5000";

// ---------- Helpers ----------
const safeLocale = (n) => (typeof n === "number" ? n.toLocaleString() : String(n || 0));
const fmtDate = (iso) => {
  try {
    if (!iso) return "-";
    return new Date(iso).toLocaleString();
  } catch {
    return iso || "-";
  }
};

const detectOrderDate = (order) => {
  // Robustly detect a date field on an order object.
  return (
    order?.orderDate ||
    order?.date ||
    order?.createdAt ||
    order?.timestamp ||
    order?.orderedOn ||
    null
  );
};

const capitalize = (s) => (typeof s === "string" && s.length ? s.charAt(0).toUpperCase() + s.slice(1) : s);

// ---------- Topbar ----------
function Topbar({ isMobile, toggleSidebar, onLogout }) {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800">
      <div className="flex items-center gap-3">
        {isMobile && (
          <button onClick={toggleSidebar} className="text-gray-400 hover:text-white">
            <Menu className="w-6 h-6" />
          </button>
        )}

        {/* TOP LOGO - full width top */}
        <div className="ml-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
            TRENDORA
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* optional search (commented) */}
        {/* <div className="hidden sm:flex items-center bg-slate-800 px-4 py-2 rounded-lg">
          <Search className="w-4 h-4 text-gray-400 mr-2" />
          <input placeholder="Search..." className="bg-transparent outline-none text-sm text-gray-300 w-48" />
        </div> */}

        <button
          onClick={onLogout}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition px-3 py-2 rounded-lg hover:bg-slate-800"
        >
          <LogOut className="w-5 h-5" />
          <span className="hidden sm:inline text-sm">Logout</span>
        </button>
      </div>
    </header>
  );
}

// ---------- Sidebar ----------
function Sidebar({ activeTab, setActiveTab, isOpen, toggleSidebar, isMobile }) {
  const navigate = useNavigate?.() || (() => {});
  const changeTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
    if (isMobile && typeof toggleSidebar === "function") toggleSidebar(); // close on mobile
  };

  const handleLogout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInUser");
    window.location.href = "/login";
  };

  const NavItem = ({ keyName, Icon, label }) => (
    <button
      onClick={() => changeTab(keyName)}
      className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all ${
        activeTab === keyName
          ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg"
          : "text-gray-400 hover:bg-slate-800 hover:text-white"
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <>
      {isMobile && isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleSidebar} />}

      <aside
        className={`${
          isMobile
            ? `fixed top-0 left-0 h-full z-50 transform transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"}`
            : "relative"
        } w-64 p-6 bg-slate-900 flex-shrink-0 flex flex-col`}
      >
        {/* top area (optional) */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-8 h-8 text-orange-500" />
            <h3 className="text-lg font-bold text-white">Admin</h3>
          </div>

          {isMobile && (
            <button onClick={toggleSidebar} className="text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          )}
        </div>

        <div className="space-y-2 flex-1 mt-2">
          <NavItem keyName="dashboard" Icon={BarChart3} label="Dashboard" />
          <NavItem keyName="products" Icon={Box} label="Products" />
          <NavItem keyName="users" Icon={Users} label="Users" />
          <NavItem keyName="orders" Icon={ShoppingCart} label="Orders" />

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition mt-4"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

// ---------- StatsCard ----------
function StatsCard({ title, value, change, Icon, gradientFrom, gradientTo }) {
  const isPositive = typeof change === "string" && change.includes("+");
  const isNegative = typeof change === "string" && change.includes("-");

  return (
    <div className={`p-6 rounded-2xl bg-gradient-to-br ${gradientFrom} ${gradientTo} shadow-xl hover:shadow-2xl transition-all`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <p className="text-sm font-medium text-white/80 mb-2">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
        </div>
        <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm">
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>

      {change && (
        <div
          className={`mt-4 text-sm flex items-center font-medium ${
            isPositive ? "text-green-200" : isNegative ? "text-red-200" : "text-white/70"
          }`}
        >
          {isPositive && <TrendingUp className="w-4 h-4 mr-1" />}
          {isNegative && <TrendingDown className="w-4 h-4 mr-1" />}
          {change}
        </div>
      )}
    </div>
  );
}

// ---------- DashboardContent ----------
function DashboardContent({ products = [], users = [], orders = [] }) {
  const salesData = [
    { month: "Nov", value1: 30, value2: 25 },
    { month: "Nov", value1: 35, value2: 30 },
    { month: "Nov", value1: 42, value2: 35 },
    { month: "Nov", value1: 38, value2: 40 },
    { month: "Nov", value1: 45, value2: 42 },
    { month: "Nov", value1: 52, value2: 48 },
  ];

  const orderStatusData = [
    { month: "Nov", orders: 10 },
    { month: "Nov", orders: 14 },
    { month: "Nov", orders: 12 },
    { month: "Nov", orders: 16 },
    { month: "Nov", orders: 18 },
    { month: "Nov", orders: 15 },
  ];

  const stats = useMemo(() => {
    const totalOrders = Array.isArray(orders) ? orders.length : 0;
    const totalRevenue = Array.isArray(orders) ? orders.reduce((s, o) => s + (Number(o.total) || Number(o.totalPrice) || 0), 0) : 0;
    const newUsers = Array.isArray(users) ? users.length : 0;
    const returns = Array.isArray(orders)
      ? orders.filter((o) => {
          const st = String(o.status || "").toLowerCase();
          return st === "cancelled" || st === "returned";
        }).length
      : 0;

    return {
      totalOrders,
      ordersChange: "+25% this month",
      totalRevenue,
      revenueChange: "+15% this month",
      newUsers,
      usersChange: "-16% this month",
      returns,
      returnsChange: "-4% this month",
    };
  }, [products, users, orders]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Orders"
          value={safeLocale(stats.totalOrders)}
          change={stats.ordersChange}
          Icon={ShoppingCart}
          gradientFrom="from-orange-600"
          gradientTo="to-orange-800"
        />
        <StatsCard
          title="Total Revenue"
          value={`₹${(stats.totalRevenue).toLocaleString()}`}
          change={stats.revenueChange}
          Icon={IndianRupee}
          gradientFrom="from-green-600"
          gradientTo="to-green-800"
        />
        <StatsCard
          title="New Users"
          value={safeLocale(stats.newUsers)}
          change={stats.usersChange}
          Icon={Users}
          gradientFrom="from-blue-600"
          gradientTo="to-blue-800"
        />
        <StatsCard
          title="Total Returns"
          value={safeLocale(stats.returns)}
          change={stats.returnsChange}
          Icon={Activity}
          gradientFrom="from-red-600"
          gradientTo="to-red-800"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-6">Sales Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="colorValue1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorValue2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px" }} labelStyle={{ color: "#fff" }} />
              <Area type="monotone" dataKey="value1" stroke="#f59e0b" fillOpacity={1} fill="url(#colorValue1)" />
              <Area type="monotone" dataKey="value2" stroke="#3b82f6" fillOpacity={1} fill="url(#colorValue2)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-6">Order Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={orderStatusData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px" }} labelStyle={{ color: "#fff" }} />
              <Bar dataKey="orders" fill="#ec4899" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// ---------- Users Management ----------
function UsersPage({ users = [], onDelete, onToggleBlock, onView }) {
  if (!Array.isArray(users)) return <p className="text-white">Loading users...</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-white">Users</h2>

      <div className="overflow-x-auto bg-slate-800 p-4 rounded-2xl border border-slate-700">
        <table className="w-full text-left">
          <thead className="text-sm text-gray-400 border-b border-slate-700">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => {
              const id = u.id ?? u._id;
              const isBlocked = u.status === "blocked" || u.blocked;

              return (
                <tr key={u.id ?? u._id} className="border-t border-slate-700 text-white hover:bg-slate-700/50 transition">
                  <td className="p-3 text-sm">{id}</td>
                  <td className="p-3 text-sm">{u.name}</td>
                  <td className="p-3 text-sm">{u.email}</td>

                  <td className="p-3 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${isBlocked ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"}`}>
                      {isBlocked ? "blocked" : "active"}
                    </span>
                  </td>

                  <td className="p-3 text-sm">
                    <div className="flex justify-center gap-3">

                      <button 
                        onClick={() => onView && onView(id)}
                        className="text-blue-400 hover:text-blue-500 transition"
                        title="View"
                      >
                        <FaEye size={20} />
                      </button>  

                      <button
                        onClick={() => onToggleBlock && onToggleBlock(id)}
                        className={`transition ${
                          isBlocked 
                          ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`}
                          title={isBlocked ? "Unblock User" : "Block"}
                      >
                        {isBlocked ? <FaCheck size={20} /> : <FaBan size={20} />}
                      </button>

                      <button 
                         onClick={() => onDelete && onDelete(id)} 
                         className="text-gray-400 hover:text-gray-200 transition"
                         title="Delete"
                      >
                        <FaTrash size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ---------- Products management ----------
function ProductsPage({ products = [], onDeleteProduct, onAddProduct, onUpdateProduct }) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: "", price: "", stock: "", image: "", description: "", category: "" });

  const startEdit = (product) => {
    setEditingId(product.id ?? product._id);
    setFormData({ ...product });
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return toast.error("Name & Price required");

    const payload = { ...formData, price: Number(formData.price), stock: Number(formData.stock || 0) };

    if (editingId) {
      onUpdateProduct ? onUpdateProduct(editingId, payload) : toast.error("updateProduct not implemented");
      toast.success("Product updated!");
    } else {
      onAddProduct ? onAddProduct(payload) : toast.error("addProduct not implemented");
    }

    setFormData({ name: "", price: "", stock: "", image: "", description: "", category: "" });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="p-4 text-white">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-semibold">Products</h2>
        <button onClick={() => { setShowForm(!showForm); setEditingId(null); }} className="px-4 py-2 bg-green-600 rounded-lg">
          {showForm ? "Close" : "Add product"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-slate-800 p-6 rounded-2xl mb-6 border border-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input placeholder="Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="p-3 bg-slate-700 rounded-lg" />
            <input placeholder="Price" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} className="p-3 bg-slate-700 rounded-lg" />
            <input placeholder="Stock" value={formData.stock} onChange={e => setFormData({ ...formData, stock: e.target.value })} className="p-3 bg-slate-700 rounded-lg" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
            <input placeholder="Image URL" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} className="p-3 bg-slate-700 rounded-lg" />
            <input placeholder="Category" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="p-3 bg-slate-700 rounded-lg" />
          </div>
          <input placeholder="Description" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="input mt-3 w-full p-3 bg-slate-700 rounded-lg" />
          {formData.image && <img src={formData.image} alt="preview" className="mt-4 w-32 h-32 rounded-lg object-cover border border-slate-600" />}
          <button type="submit" className="mt-4 px-4 py-2 bg-indigo-600 rounded-lg">{editingId ? "Update Product" : "Save Product"}</button>
        </form>
      )}

      <div className="overflow-auto rounded-lg border border-slate-700">
        <table className="min-w-full bg-slate-800 text-left text-white text-sm">
          <thead className="bg-slate-700 text-gray-300 uppercase text-xs">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id ?? p._id} className="border-b border-slate-700 hover:bg-slate-700/50">
                <td className="p-3"><img src={p.image} className="w-12 h-12 rounded-lg object-cover" alt={p.name} /></td>
                <td className="p-3">{p.name}</td>
                <td className="p-3">{p.category ?? "_"}</td>
                <td className="p-3 text-orange-400 font-bold">₹{Number(p.price || 0).toLocaleString()}</td>
                <td className="p-3">{p.stock ?? 0}</td>
                <td className="p-3">{(p.stock ?? 0) > 0 ? "In Stock" : "Out"}</td>
                <td className="p-3">
                  <div className="flex justify-center gap-2">
                    <button onClick={() => startEdit(p)} className="px-3 py-1 bg-blue-600 rounded text-white text-xs">Edit</button>
                    <button onClick={() => onDeleteProduct && onDeleteProduct(p.id ?? p._id)} className="px-3 py-1 bg-red-600 rounded text-white text-xs">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={7} className="p-6 text-center text-gray-400">No products found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ---------- Orders Management ----------
function OrdersPage({ orders = [], onAdvanceOrder }) {
  if (!Array.isArray(orders)) {
    return <p className="text-white">Loading orders...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-white">Orders</h2>
      <div className="space-y-3">
        {orders.length === 0 && (
          <div className="p-6 bg-slate-800 rounded-2xl border border-slate-700 text-gray-400">No orders available</div>
        )}

        {orders.map((o) => {
          const customerName = o.address?.name || o.shippingAddress?.name || o.userId || "Unknown";
          const orderDate = detectOrderDate(o);
          const statusLower = String(o.status || "").toLowerCase();

          return (
            <div
              key={o.id ?? o._id}
              className="flex items-center justify-between p-4 bg-slate-800 rounded-2xl border border-slate-700 hover:border-orange-500 transition"
            >
              {/* LEFT SIDE */}
              <div>
                <div className="font-medium text-white">{customerName}</div>
                <div className="text-sm text-gray-400 mt-1">{fmtDate(orderDate)}</div>
              </div>

              {/* RIGHT SIDE */}
              <div className="text-right">
                <div className="font-semibold text-orange-400">₹{safeLocale(Number(o.total) || Number(o.totalPrice) || 0)}</div>
                <div className="text-sm text-gray-400 mt-1">{String(o.status || "").toUpperCase()}</div>

                <div className="mt-2">
                  <button
                    className={`px-3 py-1 rounded-lg text-sm text-white transition ${
                      statusLower === "pending"
                        ? "bg-indigo-600"
                        : statusLower === "processing"
                        ? "bg-yellow-600"
                        : statusLower === "shipped"
                        ? "bg-green-600"
                        : "bg-gray-600"
                    }`}
                    disabled={statusLower === "delivered"}
                    onClick={() => onAdvanceOrder && onAdvanceOrder(o.id ?? o._id)}
                  >
                    {typeof o.status === "string" ? capitalize(o.status) : "Unknown"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------- Main Admin Dashboard ----------
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth < 768 : false);

  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  // Detect mobile resize
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    fetchAll();
  }, []);

  async function fetchAll() {
    await Promise.all([fetchProducts(), fetchUsers(), fetchOrders()]);
  }

  async function fetchProducts() {
    try {
      const res = await fetch(`${API}/products`);
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("fetchProducts:", err);
      toast.error("Failed to fetch products");
      setProducts([]);
    }
  }

  async function fetchUsers() {
    try {
      const res = await fetch(`${API}/users`);
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("fetchUsers:", err);
      toast.error("Failed to fetch users");
      setUsers([]);
    }
  }

  async function fetchOrders() {
    try {
      const res = await fetch(`${API}/order`);
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("fetchOrders:", err);
      toast.error("Failed to fetch orders");
      setOrders([]);
    }
  }

  // Product actions
  async function deleteProduct(id) {
    try {
      await fetch(`${API}/products/${id}`, { method: "DELETE" });
      toast.success("Product deleted");
      fetchProducts();
    } catch (err) {
      toast.error("Failed to delete product");
    }
  }

  async function addProduct(payload) {
    try {
      await fetch(`${API}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      toast.success("Product added");
      fetchProducts();
    } catch (err) {
      toast.error("Failed to add product");
    }
  }

  async function updateProduct(id, payload) {
    try {
      await fetch(`${API}/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      toast.success("Product updated");
      fetchProducts();
    } catch (err) {
      toast.error("Failed to update product");
    }
  }

  // User actions
  async function deleteUser(id) {
    try {
      await fetch(`${API}/users/${id}`, { method: "DELETE" });
      toast.success("User deleted");
      fetchUsers();
    } catch (err) {
      toast.error("Failed to delete user");
    }
  }

  async function toggleBlockUser(id) {
    try {
      const res = await fetch(`${API}/users/${id}`);
      const user = await res.json();

      if (!user || typeof user.blocked === "undefined") {
        toast.error("Invalid user data");
        return;
      }

      const newStatus = !user.blocked;

      const updated = {
        ...user,
        blocked: newStatus,
        status: newStatus ? "blocked" : "active",
      };

      await fetch(`${API}/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });

      toast.dismiss();
      toast.success(newStatus ? "User blocked" : "User unblocked");

      fetchUsers();
    } catch (err) {
      toast.dismiss();
      toast.error("Failed to update user");
    }
  }

  // Orders: advance status (robust case-insensitive)
  async function advanceOrder(id) {
    try {
      const res = await fetch(`${API}/order/${id}`);
      const order = await res.json();

      if (!order) {
        toast.error("Order not found");
        return;
      }

      // canonical lowercase status flow
      const statusFlow = ["pending", "processing", "shipped", "delivered"];
      const currentStatus = String(order.status || "").toLowerCase();
      let currentIndex = statusFlow.indexOf(currentStatus);

      // if current status not found, try to infer based on common names
      if (currentIndex === -1) {
        // naive fallback: if includes substrings
        if (currentStatus.includes("pend")) currentIndex = 0;
        else if (currentStatus.includes("proc")) currentIndex = 1;
        else if (currentStatus.includes("ship")) currentIndex = 2;
        else if (currentStatus.includes("deliv")) currentIndex = 3;
        else currentIndex = 0;
      }

      if (currentIndex >= statusFlow.length - 1) {
        toast("Order already delivered");
        return;
      }

      const nextStatus = statusFlow[currentIndex + 1]; // lowercase next
      const updatedOrder = { ...order, status: capitalize(nextStatus) };

      await fetch(`${API}/order/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedOrder),
      });

      setOrders((prev) =>
        prev.map((o) => {
          const oid = o.id ?? o._id;
          if (oid === id || String(oid) === String(id)) return { ...o, status: capitalize(nextStatus) };
          return o;
        }),
      );
      toast.success(`Order moved to ${capitalize(nextStatus)}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update order");
    }
  }

  const toggleSidebar = () => setSidebarOpen((s) => !s);
  const handleLogout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInUser");
    toast.success("Logged out");
    window.location.href = "/";
  };

  const renderContent = useMemo(() => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardContent products={products} users={users} orders={orders} />;
      case "products":
        return <ProductsPage products={products} onDeleteProduct={deleteProduct} onAddProduct={addProduct} onUpdateProduct={updateProduct} />;
      case "users":
        return <UsersPage users={users} onDelete={deleteUser} onToggleBlock={toggleBlockUser} />;
      case "orders":
        return <OrdersPage orders={orders} onAdvanceOrder={advanceOrder} />;
      default:
        return <DashboardContent products={products} users={users} orders={orders} />;
    }
  }, [activeTab, products, users, orders]);

  return (
    <div className="flex min-h-screen bg-slate-950 font-sans">
      <Toaster />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar — TRENDORA on top */}
        <Topbar isMobile={isMobile} toggleSidebar={toggleSidebar} onLogout={handleLogout} />

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} isOpen={sidebarOpen} toggleSidebar={toggleSidebar} isMobile={isMobile} />

          {/* Main content */}
          <main className="flex-1 p-6 sm:p-6 lg:p-8 bg-slate-950 overflow-y-auto">
            <h1 className="text-3xl font-bold mb-8 text-white capitalize">{activeTab} Overview</h1>
            {renderContent}
          </main>
        </div>
      </div>
    </div>
  );
}

