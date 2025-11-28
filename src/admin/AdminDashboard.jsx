import React, { useEffect, useMemo, useState } from "react";
import {
  Users as UsersIcon,
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
  Sun,
  Moon,
  Trash2,
  Edit2,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

/*
  Notes about API:
  - Base URL: http://localhost:5000
  - Expected collections in db.json: products, users, order
    (you provided `order` not `orders` — this file uses that exact key)
*/

const API = "http://localhost:5000";

// ---------- Helpers ----------
const safeLocale = (n) => (typeof n === "number" ? n.toLocaleString() : String(n || 0));
const fmtDate = (iso) => {
  try { return new Date(iso).toLocaleString(); } catch { return iso || "-"; }
};

// ---------- Topbar ----------
function Topbar({ isMobile, toggleSidebar, onLogout, dark, setDark }) {
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

        <button onClick={onLogout} className="flex items-center gap-2 text-red-400 hover:text-red-300 transition px-2 py-1 rounded">
          <LogOut className="w-5 h-5" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}

// ---------- Sidebar ----------
function Sidebar({ activeTab, setActiveTab, isOpen, toggleSidebar, isMobile }) {
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
            <button onClick={() => { toast('Logging out'); }} className="flex items-center gap-3 w-full p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-yellow-400">
              <LogOut className="w-5 h-5" /> <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>

        <div className="text-xs text-gray-400 mt-6">© {new Date().getFullYear()} Rocker</div>
      </aside>
    </>
  );
}

// ---------- StatsCard ----------
function StatsCard({ title, value, change, Icon, colorClass, bgColor }) {
  const positive = typeof change === "string" && change.includes("+");
  return (
    <div className={`p-6 rounded-xl shadow-xl ${bgColor} bg-opacity-20 border border-gray-700 backdrop-blur-sm hover:shadow-2xl transition`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-400 uppercase tracking-wide">{title}</p>
          <p className="text-3xl font-bold text-white mt-2">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${colorClass} shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>

      {change && (
        <div className={`mt-4 text-sm flex items-center font-semibold ${positive ? "text-green-400" : "text-red-400"}`}>
          {positive ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
          {change} this month
        </div>
      )}
    </div>
  );
}

// ---------- DashboardContent (uses real db.json data) ----------
function DashboardContent({ products, users, orders }) {
  // compute stats from data
  const stats = useMemo(() => {
    const totalOrders = Array.isArray(orders) ? orders.length : 0;
    const totalRevenue = Array.isArray(orders) ? orders.reduce((s, o) => s + (Number(o.total) || 0), 0) : 0;
    const newUsers = Array.isArray(users) ? users.length : 0;
    const returns = 0; // your db.json doesn't have returns - placeholder
    // simple percent changes are not available, show 0%
    return {
      totalOrders,
      ordersChange: "+0%",
      totalRevenue,
      revenueChange: "+0%",
      newUsers,
      usersChange: "+0%",
      returns,
      returnsChange: "+0%",
    };
  }, [products, users, orders]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Orders" value={stats.totalOrders} change={stats.ordersChange} Icon={ShoppingCart} colorClass="bg-yellow-500" bgColor="bg-yellow-900" />
        <StatsCard title="Total Revenue" value={`₹${safeLocale(stats.totalRevenue)}`} change={stats.revenueChange} Icon={IndianRupee} colorClass="bg-green-500" bgColor="bg-green-900" />
        <StatsCard title="New Users" value={stats.newUsers} change={stats.usersChange} Icon={UsersIcon} colorClass="bg-blue-500" bgColor="bg-blue-900" />
        <StatsCard title="Total Returns" value={stats.returns} change={stats.returnsChange} Icon={Activity} colorClass="bg-red-500" bgColor="bg-red-900" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700">
          <h3 className="text-xl font-bold text-yellow-400 mb-4">Recent Orders</h3>
          <div className="space-y-3 max-h-96 overflow-auto">
            {Array.isArray(orders) && orders.length > 0 ? orders.slice(0, 8).map((order) => (
              <div key={order.id} className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                <div>
                  <p className="text-white font-medium">{order.id}</p>
                  <p className="text-gray-400 text-sm">{order.address?.name || order.userId || "-"}</p>
                </div>
                <div className="text-right">
                  <p className="text-yellow-400 font-bold">₹{safeLocale(Number(order.total) || 0)}</p>
                  <p className="text-sm text-gray-400">{order.status}</p>
                </div>
              </div>
            )) : <p className="text-gray-400">No recent orders</p>}
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700">
          <h3 className="text-xl font-bold text-yellow-400 mb-4">Top Products</h3>
          <div className="space-y-3 max-h-96 overflow-auto">
            {Array.isArray(products) && products.length > 0 ? products.slice(0, 12).map((p) => (
              <div key={p.id} className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                <div>
                  <p className="text-white font-medium">{p.name}</p>
                  <p className="text-gray-400 text-sm">{p.category || "-"}</p>
                </div>
                <div className="text-right">
                  <p className="text-yellow-400 font-bold">₹{safeLocale(Number(p.price) || 0)}</p>
                  <p className="text-sm text-gray-400">Stock: {String(p.stock ?? "-")}</p>
                </div>
              </div>
            )) : <p className="text-gray-400">No products</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- Users Management ----------
function UsersPage({ users, onDelete, onToggleBlock }) {
  if (!Array.isArray(users)) return <p className="text-white">Loading users...</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-white">Users</h2>
      <div className="overflow-x-auto bg-gray-800 p-3 rounded">
        <table className="w-full text-left">
          <thead className="text-sm text-gray-400">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t border-gray-700">
                <td className="p-3 text-sm">{u.id}</td>
                <td className="p-3 text-sm">{u.name}</td>
                <td className="p-3 text-sm">{u.email}</td>
                <td className="p-3 text-sm">{u.status ?? (u.blocked ? "blocked" : "active")}</td>
                <td className="p-3 text-sm">
                  <div className="flex gap-2">
                    <button onClick={() => onToggleBlock(u.id)} className="px-2 py-1 rounded bg-indigo-600 text-white text-sm"><Edit2 className="w-4 h-4 inline-block mr-1"/>Toggle</button>
                    <button onClick={() => onDelete(u.id)} className="px-2 py-1 rounded bg-red-600 text-white text-sm"><Trash2 className="w-4 h-4 inline-block mr-1"/>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ---------- Products Management ----------
function ProductsPage({ products, onDeleteProduct, onAddProduct }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", price: "", stock: "", image: "", description: "" });

  if (!Array.isArray(products)) return <p className="text-white">Loading products...</p>;

  const submit = (e) => {
    e.preventDefault();
    // minimal validation
    if (!form.name || !form.price) return toast.error("Name and price required");
    onAddProduct({ ...form, price: Number(form.price), stock: Number(form.stock || 0) });
    setForm({ name: "", price: "", stock: "", image: "", description: "" });
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-white">Products</h2>
        <button onClick={() => setShowForm((s) => !s)} className="px-3 py-1 rounded bg-green-600 text-white">{showForm ? "Close" : "Add product"}</button>
      </div>

      {showForm && (
        <form onSubmit={submit} className="bg-gray-800 p-4 rounded mb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder="Name" className="p-2 bg-gray-700 rounded" />
            <input value={form.price} onChange={(e) => setForm({...form, price: e.target.value})} placeholder="Price" className="p-2 bg-gray-700 rounded" />
            <input value={form.stock} onChange={(e) => setForm({...form, stock: e.target.value})} placeholder="Stock" className="p-2 bg-gray-700 rounded" />
          </div>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
            <input value={form.image} onChange={(e) => setForm({...form, image: e.target.value})} placeholder="Image URL" className="p-2 bg-gray-700 rounded" />
            <input value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} placeholder="Short description" className="p-2 bg-gray-700 rounded" />
          </div>
          <div className="mt-2">
            <button className="px-3 py-1 bg-indigo-600 rounded text-white">Save</button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p.id} className="p-3 bg-gray-800 rounded">
            <div className="flex justify-between items-center mb-2">
              <div className="font-semibold text-white">{p.name}</div>
              <div className="text-yellow-400 font-bold">₹{safeLocale(Number(p.price) || 0)}</div>
            </div>
            <div className="text-sm text-gray-400 mb-2">Stock: {String(p.stock ?? "-")}</div>
            <div className="flex gap-2">
              <button onClick={() => onDeleteProduct(p.id)} className="px-2 py-1 rounded bg-red-600 text-white text-sm">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- Orders Management ----------
function OrdersPage({ orders, onAdvanceOrder }) {
  if (!Array.isArray(orders)) return <p className="text-white">Loading orders...</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-white">Orders</h2>
      <div className="space-y-2">
        {orders.map((o) => (
          <div key={o.id} className="flex items-center justify-between p-3 bg-gray-800 rounded">
            <div>
              <div className="font-medium text-white">{o.id} — {o.address?.name || o.userId}</div>
              <div className="text-sm text-gray-400">{fmtDate(o.date)}</div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-yellow-400">₹{safeLocale(Number(o.total) || 0)}</div>
              <div className="text-sm text-gray-400">{o.status}</div>
              <div className="mt-2">
                <button onClick={() => onAdvanceOrder(o.id)} className="px-2 py-1 bg-indigo-600 text-white rounded text-sm">Advance</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- Settings ----------
function SettingsPage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-white">Settings</h2>
      <div className="bg-gray-800 p-4 rounded">
        <p className="text-gray-300">General app settings can be added here.</p>
      </div>
    </div>
  );
}

// ---------- Main Admin Dashboard (connects to db.json) ----------
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth < 768 : false);
  const [dark, setDark] = useState(true);

  // data
  const [products, setProducts] = useState(null);
  const [users, setUsers] = useState(null);
  const [orders, setOrders] = useState(null);

  // fetch helpers
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // load data once
  useEffect(() => {
    fetchAll();
  }, []);

  async function fetchAll() {
    fetchProducts();
    fetchUsers();
    fetchOrders();
  }

  async function fetchProducts() {
    try {
      const res = await fetch(`${API}/products`);
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("fetchProducts:", err);
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
      setUsers([]);
    }
  }

  async function fetchOrders() {
    try {
      // your db.json key is "order"
      const res = await fetch(`${API}/order`);
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("fetchOrders:", err);
      setOrders([]);
    }
  }

  // CRUD-ish operations (use json-server endpoints)
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
      // json-server will assign id if missing; but we provide
      await fetch(`${API}/products`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      toast.success("Product added");
      fetchProducts();
    } catch (err) {
      toast.error("Failed to add product");
    }
  }

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
      // fetch user, toggle blocked/status, then PUT
      const res = await fetch(`${API}/users/${id}`);
      const user = await res.json();
      const updated = { ...user, blocked: !user.blocked, status: user.blocked ? "active" : "blocked" };
      await fetch(`${API}/users/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(updated) });
      toast.success("User updated");
      fetchUsers();
    } catch (err) {
      toast.error("Failed to update user");
    }
  }

  async function advanceOrder(id) {
    try {
      const res = await fetch(`${API}/order/${id}`);
      const order = await res.json();
      const nextStatus = order.status === "Packed" ? "Shipped" : order.status === "Shipped" ? "Delivered" : order.status;
      const updated = { ...order, status: nextStatus };
      await fetch(`${API}/order/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(updated) });
      toast.success("Order advanced");
      fetchOrders();
    } catch (err) {
      toast.error("Failed to advance order");
    }
  }

  // UI state
  const toggleSidebar = () => setSidebarOpen((s) => !s);
  const handleLogout = () => toast("Logged out (demo)");

  // Render content switch
  const renderContent = useMemo(() => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardContent products={products} users={users} orders={orders} />;
      case "products":
        return <ProductsPage products={products} onDeleteProduct={deleteProduct} onAddProduct={addProduct} />;
      case "users":
        return <UsersPage users={users} onDelete={deleteUser} onToggleBlock={toggleBlockUser} />;
      case "orders":
        return <OrdersPage orders={orders} onAdvanceOrder={advanceOrder} />;
      case "settings":
        return <SettingsPage />;
      default:
        return <DashboardContent products={products} users={users} orders={orders} />;
    }
  }, [activeTab, products, users, orders]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="flex min-h-screen bg-gray-900 font-sans">
      <Toaster />
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} isOpen={sidebarOpen} toggleSidebar={toggleSidebar} isMobile={isMobile} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar isMobile={isMobile} toggleSidebar={toggleSidebar} onLogout={handleLogout} dark={dark} setDark={setDark} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-gray-900 overflow-y-auto">
          <h1 className="text-3xl font-bold mb-8 text-white capitalize">{activeTab} Overview</h1>
          {renderContent}
        </main>
      </div>
    </div>
  );
}










