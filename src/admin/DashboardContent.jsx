// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie, Legend } from "recharts";
// import { ShoppingCart, DollarSign, Users, TrendingUp } from "lucide-react";
// import toast from "react-hot-toast";

// const API = "http://localhost:5000"; // Change to your backend URL

// // Small overview card
// const StatsCard = ({ title, value, change, icon: Icon, colorClass, bgColor }) => (
//   <div className={`p-4 rounded-xl shadow-lg ${bgColor} bg-opacity-30 border border-gray-700 backdrop-blur-sm`}>
//     <div className="flex justify-between items-start">
//       <div>
//         <p className="text-sm font-medium text-gray-300">{title}</p>
//         <p className="text-3xl font-bold text-white mt-1">{value}</p>
//       </div>
//       <div className={`p-3 rounded-full ${colorClass} bg-opacity-70 shadow-xl`}>
//         <Icon className="w-6 h-6 text-white" />
//       </div>
//     </div>
//     <div className={`mt-3 text-sm flex items-center ${change.includes('+') ? 'text-green-400' : 'text-red-400'}`}>
//       <TrendingUp className={`w-4 h-4 mr-1 ${change.includes('+') ? 'rotate-0' : 'rotate-180'}`} />
//       {change} this month
//     </div>
//   </div>
// );

// const DashboardContent = () => {
//   const [ordersData, setOrdersData] = useState([]);
//   const [salesData, setSalesData] = useState([]);
//   const [usersData, setUsersData] = useState([]);
//   const [productCategoryData, setProductCategoryData] = useState([]);

//   // Fetch data from backend
//   const fetchDashboardData = async () => {
//     try {
//       const ordersRes = await axios.get(`${API}/order`);
//       const usersRes = await axios.get(`${API}/users`);
//       const productsRes = await axios.get(`${API}/products`);

//       // Orders chart per month
//       const ordersPerMonth = Array.from({ length: 12 }, (_, i) => {
//         const month = i + 1;
//         const totalOrders = ordersRes.data.filter(o => new Date(o.date).getMonth() + 1 === month).length;
//         return { name: new Date(0, i).toLocaleString('default', { month: 'short' }), Orders: totalOrders };
//       });
//       setOrdersData(ordersPerMonth);

//       // Sales chart per day (last 7 days)
//       const today = new Date();
//       const last7Days = Array.from({ length: 7 }, (_, i) => {
//         const day = new Date();
//         day.setDate(today.getDate() - i);
//         const dayOrders = ordersRes.data.filter(o => {
//           const d = new Date(o.date);
//           return d.toDateString() === day.toDateString();
//         });
//         const totalSales = dayOrders.reduce((sum, o) => sum + (o.total || 0), 0);
//         return { name: day.toLocaleDateString('en-US', { weekday: 'short' }), Sales: totalSales };
//       }).reverse();
//       setSalesData(last7Days);

//       // Users count
//       setUsersData(usersRes.data);

//       // Product categories
//       const categories = {};
//       productsRes.data.forEach(p => {
//         categories[p.category] = (categories[p.category] || 0) + 1;
//       });
//       setProductCategoryData(Object.entries(categories).map(([name, value], idx) => ({
//         name,
//         value,
//         color: ['#f59e0b', '#3b82f6', '#10b981', '#8b5cf6'][idx % 4],
//       })));

//     } catch (e) {
//       console.error(e);
//       toast.error("Failed to fetch dashboard data");
//     }
//   };

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   return (
//     <div className="space-y-6">
//       {/* Stats cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//         <StatsCard title="Total Orders" value={ordersData.reduce((sum, o) => sum + o.Orders, 0)} change="+15%" icon={ShoppingCart} colorClass="bg-yellow-500" bgColor="bg-yellow-900" />
//         <StatsCard title="Total Revenue" value={`₹${ordersData.reduce((sum, o) => sum + o.Orders * 1000, 0)}`} change="+10%" icon={DollarSign} colorClass="bg-green-500" bgColor="bg-green-900" />
//         <StatsCard title="New Users" value={usersData.length} change="+8%" icon={Users} colorClass="bg-blue-500" bgColor="bg-blue-900" />
//         <StatsCard title="Total Products" value={productCategoryData.reduce((sum, c) => sum + c.value, 0)} change="+5%" icon={ShoppingCart} colorClass="bg-purple-500" bgColor="bg-purple-900" />
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-2 bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700 h-96">
//           <h3 className="text-lg font-semibold mb-4 text-white">Sales (Last 7 Days)</h3>
//           <ResponsiveContainer width="100%" height="85%">
//             <AreaChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
//               <defs>
//                 <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
//                   <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
//                 </linearGradient>
//               </defs>
//               <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
//               <XAxis dataKey="name" stroke="#9ca3af" />
//               <YAxis stroke="#9ca3af" />
//               <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #4b5563', borderRadius: '8px' }} labelStyle={{ color: '#f59e0b' }} />
//               <Area type="monotone" dataKey="Sales" stroke="#f59e0b" fill="url(#colorSales)" fillOpacity={1} />
//             </AreaChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="lg:col-span-1 bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700 h-96">
//           <h3 className="text-lg font-semibold mb-4 text-white">Orders (Monthly)</h3>
//           <ResponsiveContainer width="100%" height="85%">
//             <BarChart data={ordersData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }} barSize={30}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
//               <XAxis dataKey="name" stroke="#9ca3af" />
//               <YAxis stroke="#9ca3af" />
//               <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #4b5563', borderRadius: '8px' }} labelStyle={{ color: '#f59e0b' }} />
//               <Bar dataKey="Orders">
//                 {ordersData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={'#ec4899'} />
//                 ))}
//               </Bar>
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* Product Categories */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-1 bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700 h-96 flex flex-col justify-center items-center">
//           <h3 className="text-lg font-semibold mb-4 text-white">Product Category Share</h3>
//           <ResponsiveContainer width="100%" height="85%">
//             <PieChart>
//               <Pie data={productCategoryData} cx="50%" cy="45%" innerRadius={50} outerRadius={80} paddingAngle={5} dataKey="value" label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}>
//                 {productCategoryData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={entry.color} />
//                 ))}
//               </Pie>
//               <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #4b5563', borderRadius: '8px' }} labelStyle={{ color: '#f59e0b' }} />
//               <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ color: '#9ca3af' }} />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//         <div className="lg:col-span-2 bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700 h-96 flex items-center justify-center">
//           <div className="text-center">
//             <p className="text-5xl font-extrabold text-white">{ordersData.reduce((sum, o) => sum + o.Orders, 0)}</p>
//             <p className="text-gray-400 text-xl mt-2">Total Orders</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardContent;











import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

const salesData = [
  { month: "Jan", sales: 30, returns: 10 },
  { month: "Feb", sales: 45, returns: 14 },
  { month: "Mar", sales: 40, returns: 12 },
  { month: "Apr", sales: 50, returns: 16 },
  { month: "May", sales: 60, returns: 18 },
  { month: "Jun", sales: 55, returns: 15 },
];

const productData = [
  { name: "Dress", stock: 13 },
  { name: "Cape Coat", stock: 11 },
  { name: "Wool Coat", stock: 9 },
  { name: "Blouse", stock: 6 },
];

const DashboardContent = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>

      {/* Your summary cards here (Total Orders, Revenue, etc.) */}
      <div className="grid grid-cols-4 gap-6">
        {/* ... cards as before */}
      </div>

      <div className="flex space-x-6">
        {/* Sales Overview Line Chart */}
        <div className="flex-1 bg-gray-800 rounded p-4 text-white h-96">
          <h3 className="font-semibold mb-4">Sales Overview</h3>
          <ResponsiveContainer width="100%" height="85%">
            <LineChart data={salesData}>
              <CartesianGrid stroke="#444" />
              <XAxis dataKey="month" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#facc15" strokeWidth={3} />
              <Line type="monotone" dataKey="returns" stroke="#ef4444" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Product Stock Bar Chart */}
        <div className="flex-1 bg-gray-800 rounded p-4 text-white h-96">
          <h3 className="font-semibold mb-4">Top Products Stock</h3>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={productData} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid stroke="#444" />
              <XAxis type="number" stroke="#ccc" />
              <YAxis dataKey="name" type="category" stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="stock" fill="#facc15" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
