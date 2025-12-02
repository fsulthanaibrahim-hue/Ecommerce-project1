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
import UserManagement from "./admin/UserManagement";

function Layout({ children }) {
  const location = useLocation();

  const hideLayoutRoutes = ["/login", "/register"];
  const isAuthPage = hideLayoutRoutes.includes(location.pathname);
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAuthPage && !isAdminPage && <Navbar />}
      <main className="min-h-screen">{children}</main>
      {!isAuthPage && !isAdminPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* PUBLIC ROUTES */}
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

          {/* PROTECTED USER ROUTES */}
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

          {/* CATEGORIES */}
          <Route path="/men" element={<Products category="Men" />} />
          <Route path="/women" element={<Products category="Women" />} />
          <Route path="/kids" element={<Products category="Kids" />} />

          {/* FIXED ADMIN ROUTES */}
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <AdminDashboard /> {/* Contains <Outlet /> */}
              </AdminProtectedRoute>
            }
          >
            <Route index element={<DashboardContent />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="orders-management" element={<OrdersManagement />} />
            <Route path="products-management" element={<ProductsManagement />} />
            <Route path="revenue-chart" element={<RevenueChart />} />
            <Route path="user-management" element={<UserManagement />} />
          </Route>

          {/* 404 */}
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
