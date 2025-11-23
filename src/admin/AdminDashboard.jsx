import React, { useState, useMemo } from 'react';
import { Users, Box, DollarSign, BarChart3, TrendingUp, ShoppingCart, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie, Legend } from 'recharts';


const salesData = [
  { name: 'Mon', Visits: 25, Sales: 32 },
  { name: 'Tue', Visits: 38, Sales: 22 },
  { name: 'Wed', Visits: 22, Sales: 45 },
  { name: 'Thu', Visits: 48, Sales: 35 },
  { name: 'Fri', Visits: 30, Sales: 42 },
  { name: 'Sat', Visits: 45, Sales: 38 },
  { name: 'Sun', Visits: 35, Sales: 55 },
];

const ordersData = [
  { name: 'Jan', Orders: 10, pv: 2400, amt: 2400 },
  { name: 'Feb', Orders: 14, pv: 1398, amt: 2210 },
  { name: 'Mar', Orders: 12, pv: 9800, amt: 2290 },
  { name: 'Apr', Orders: 16, pv: 3908, amt: 2000 },
  { name: 'May', Orders: 18, pv: 4800, amt: 2181 },
  { name: 'Jun', Orders: 15, pv: 3800, amt: 2500 },
];

const productCategoryData = [
    { name: 'Nokia', value: 30, color: '#f59e0b' },
    { name: 'Apple', value: 45, color: '#3b82f6' },
    { name: 'Samsung', value: 25, color: '#10b981' },
];


const Topbar = () => (
  <header className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700 shadow-md">
    <div className="text-xl font-semibold text-yellow-400">Rocker Admin</div>
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        className="py-2 px-4 w-64 bg-gray-700 border border-gray-600 rounded-full text-sm text-white focus:ring-yellow-500 focus:border-yellow-500 transition duration-150"
      />
      <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
    </div>
    <div className="flex items-center space-x-4">
      <div className="h-8 w-8 bg-purple-500 rounded-full flex items-center justify-center text-xs font-bold">PB</div>
      <span className="text-sm">Pauline Seitz</span>
    </div>
  </header>
);

const Sidebar = ({ activeTab, setActiveTab }) => {
    const NavItem = ({ tabKey, icon: Icon, label }) => (
        <button
            onClick={() => setActiveTab(tabKey)}
            className={`flex items-center w-full gap-3 p-3 rounded-lg transition duration-200
                ${activeTab === tabKey
                    ? 'bg-yellow-600 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-yellow-400'
                }`}
        >
          <Icon className="w-5 h-5" />
          <span className="font-medium">{label}</span>
        </button>
    );

    return (
        <aside className="w-64 p-4 border-r border-gray-800 bg-gray-800 flex-shrink-0 shadow-2xl">
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


const StatsCard = ({ title, value, change, icon: Icon, colorClass, bgColor }) => (
  <div className={`p-4 rounded-xl shadow-lg ${bgColor} bg-opacity-30 border border-gray-700 backdrop-blur-sm`}>
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-gray-300">{title}</p>
        <p className="text-3xl font-bold text-white mt-1">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${colorClass} bg-opacity-70 shadow-xl`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
    <div className={`mt-3 text-sm flex items-center ${change.includes('+') ? 'text-green-400' : 'text-red-400'}`}>
      <TrendingUp className={`w-4 h-4 mr-1 ${change.includes('+') ? 'rotate-0' : 'rotate-180'}`} />
      {change} this month
    </div>
  </div>
);

const StatsCards = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
    <StatsCard
      title="Total Orders"
      value="8,052"
      change="+25%"
      icon={ShoppingCart}
      colorClass="bg-yellow-500"
      bgColor="bg-yellow-900"
    />
    <StatsCard
      title="Total Revenue"
      value="$6.2K"
      change="+15%"
      icon={DollarSign}
      colorClass="bg-green-500"
      bgColor="bg-green-900"
    />
    <StatsCard
      title="New Users"
      value="1.3K"
      change="-16%"
      icon={Users}
      colorClass="bg-blue-500"
      bgColor="bg-blue-900"
    />
    <StatsCard
      title="Total Returns"
      value="170"
      change="-4%"
      icon={Activity}
      colorClass="bg-red-500"
      bgColor="bg-red-900"
    />
  </div>
);

const SalesOverviewChart = () => (
  <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700 h-96">
    <h3 className="text-lg font-semibold mb-4 text-white">Sales Overview</h3>
    <ResponsiveContainer width="100%" height="85%">
      <AreaChart
        data={salesData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="name" stroke="#9ca3af" />
        <YAxis stroke="#9ca3af" />
        <Tooltip
          contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #4b5563', borderRadius: '8px' }}
          labelStyle={{ color: '#f59e0b' }}
        />
        <Area type="monotone" dataKey="Visits" stroke="#3b82f6" fillOpacity={1} fill="url(#colorVisits)" />
        <Area type="monotone" dataKey="Sales" stroke="#f59e0b" fillOpacity={1} fill="url(#colorSales)" />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

const OrdersChart = () => (
  <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700 h-96">
    <h3 className="text-lg font-semibold mb-4 text-white">Order Status</h3>
    <ResponsiveContainer width="100%" height="85%">
      <BarChart
        data={ordersData}
        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        barSize={30}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="name" stroke="#9ca3af" />
        <YAxis stroke="#9ca3af" />
        <Tooltip
          contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #4b5563', borderRadius: '8px' }}
          labelStyle={{ color: '#f59e0b' }}
        />
        <Bar dataKey="Orders">
          {ordersData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={'#ec4899'} /> // Pink color for the bars
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
);

const ProductCategoryChart = () => (
    <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700 flex flex-col justify-center items-center h-96">
        <h3 className="text-lg font-semibold mb-4 text-white">Product Category Share</h3>
        <ResponsiveContainer width="100%" height="85%">
            <PieChart>
                <Pie
                    data={productCategoryData}
                    cx="50%"
                    cy="45%"
                    innerRadius={60}
                    outerRadius={90}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    labelLine={false}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                    {productCategoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip
                    contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #4b5563', borderRadius: '8px' }}
                    labelStyle={{ color: '#f59e0b' }}
                />
                <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ color: '#9ca3af' }} />
            </PieChart>
        </ResponsiveContainer>
    </div>
);


const DashboardContent = () => (
    <div className="space-y-6">
        <StatsCards />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <SalesOverviewChart />
            </div>
            
            <div className="lg:col-span-1">
                <OrdersChart />
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
                <ProductCategoryChart />
            </div>
            <div className="lg:col-span-2">
                 <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700 h-96 flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-5xl font-extrabold text-white">45,321</p>
                        <p className="text-gray-400 text-xl mt-2">Total Visits</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const ProductsManagement = () => (
  <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700 min-h-[70vh]">
    <h2 className="text-2xl font-bold mb-6 text-yellow-400">Product Management</h2>
    <p className="text-gray-400 mb-4">A list of all products in your inventory. Use this view to edit, add, or remove products.</p>
    
    <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
            <thead>
                <tr>
                    {['Product Name', 'Category', 'Stock', 'Price', 'Status'].map(header => (
                        <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider bg-gray-700 rounded-t-lg">
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
                {[
                    { name: 'Wireless Headphones', cat: 'Electronics', stock: 150, price: '$79.99', status: 'In Stock' },
                    { name: 'Mechanical Keyboard', cat: 'Peripherals', stock: 0, price: '$120.00', status: 'Out of Stock' },
                    { name: '4K Monitor', cat: 'Displays', stock: 45, price: '$450.00', status: 'Low Stock' },
                    { name: 'Gaming Mouse', cat: 'Peripherals', stock: 200, price: '$49.99', status: 'In Stock' },
                ].map((product, index) => (
                    <tr key={index} className="hover:bg-gray-700 transition duration-150">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{product.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{product.cat}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{product.stock}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-400">{product.price}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                product.status === 'In Stock' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                                product.status === 'Out of Stock' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                                'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                            }`}>
                                {product.status}
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  </div>
);

const UsersManagement = () => (
  <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700 min-h-[70vh]">
    <h2 className="text-2xl font-bold mb-6 text-yellow-400">User Management</h2>
    <p className="text-gray-400 mb-4">View and manage all registered users. You can edit roles or suspend accounts here.</p>
    
    <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
            <thead>
                <tr>
                    {['Name', 'Email', 'Role', 'Status', 'Date Joined'].map(header => (
                        <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider bg-gray-700 rounded-t-lg">
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
                {[
                    { name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', joined: '2023-01-15' },
                    { name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', joined: '2023-03-22' },
                    { name: 'Pauline Seitz', email: 'pauline@example.com', role: 'Designer', status: 'Suspended', joined: '2024-05-10' },
                    { name: 'Mark Wilson', email: 'mark@example.com', role: 'User', status: 'Active', joined: '2023-11-01' },
                ].map((user, index) => (
                    <tr key={index} className="hover:bg-gray-700 transition duration-150">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{user.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-400">{user.role}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                user.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                                'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                            }`}>
                                {user.status}
                            </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.joined}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  </div>
);


const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = useMemo(() => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardContent />;
      case "products":
        return <ProductsManagement />;
      case "users":
        return <UsersManagement />;
      default:
        return <DashboardContent />;
    }
  }, [activeTab]);

  return (
    <div className="flex min-h-screen bg-gray-900 font-sans">
      
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />


      <div className="flex-1 flex flex-col overflow-y-auto">
        <Topbar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-gray-900">
            <h1 className="text-3xl font-bold mb-8 text-white capitalize">{activeTab} Overview</h1>
            {renderContent}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;




