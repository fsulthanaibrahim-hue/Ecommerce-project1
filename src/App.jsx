import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import ProtectedRoute from "./components/ProtectedRoute";
import Orders from "./pages/Order";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import OrderDetails from "./pages/OrderDetails";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import OTP from "./pages/Otp";
import OrderSuccess from "./pages/OrderSuccess";

// Admin Pages
import AdminProtectedRoute from "./admin/AdminProtectedRoute";
import AdminDashboard from "./admin/AdminDashboard";
import AdminOrders from "./admin/AdminOrders";
import AdminProducts from "./admin/AdminProducts";
import AdminUsers from "./admin/AdminUser";
import DashboardContent from "./admin/DashboardContent";
import OrdersManagement from "./admin/OrdersManagement";
import ProductsManagement from "./admin/ProductsManagement";
import RevenueChart from "./admin/RevenueChart";
import Sidebar from "./admin/Sidebar";
import Topbar from "./admin/Topbar";
import UserManagement from "./admin/UserManagement";

function Layout({ children }) {
  const location = useLocation();

  const hideLayoutRoutes = ["/login", "/register"];
  const isAuthPage = hideLayoutRoutes.includes(location.pathname);
  const isAdminPage = location.pathname.startsWith("/admin");

  const hideLayout = isAuthPage || isAdminPage;
  return (
    <>
      {!hideLayout && <Navbar />}
      <main className="min-h-screen">{children}</main>
      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/otp" element={<OTP />} />
          <Route path="/order-success" element={<OrderSuccess />} />

          {/* Protected User Routes */}
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route path="/order-details/:id" element={<OrderDetails />} />
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route path="/men" element={<Products category="Men" />} />
          <Route path="/women" element={<Products category="Women" />} />
          <Route path="/kids" element={<Products category="Kids" />} />

          {/* Admin Routes */}
           <Route 
             path="/admin"
             element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
             }
            />

            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/products" element={<AdminProducts />} /> 
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin-dashboard-content" element={<DashboardContent />} />
            <Route path="/admin/orders-management" element={<OrdersManagement />} />
            <Route path="/admin/products-management" element={<ProductsManagement />} />
            <Route path="/admin/revenue-chart" element={<RevenueChart />} />
            <Route path="/admin/sidebar" element={<Sidebar />} />
            <Route path="/admin/topbar" element={<Topbar />} />
            <Route path="/admin/user-management" element={<UserManagement />} />

          
          {/* 404 Fallback */}
          <Route
            path="*"
            element={<h1 className="text-center mt-10 text-white">404 - Page Not Found</h1>}
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
