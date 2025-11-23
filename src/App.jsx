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

// Admin Pages 
import AdminDashboard from "./admin/AdminDashboard";
import AdminProducts from "./admin/AdminProducts";
import AdminUsers from "./admin/AdminUsers";
import RevenueChart from "./admin/RevenueChart";
import AdminProtectedRoute from "./admin/AdminProtectedRoute";
import OrdersManagement from "./admin/OrdersManagement";
import ProductsManagement from "./admin/ProductsManagement";
import UsersManagement from "./admin/UserManagement";

import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import OTP from "./pages/Otp";

function Layout({ children }) {
  const location = useLocation();
  const hideLayout = ["/login", "/register"].includes(location.pathname);

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

          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />

          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="otp" element={<OTP />} />

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
 
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            }
          >
            <Route path="products" element={<AdminProducts />} />
            <Route path="users" element={<AdminUsers />} />
            <Route index element={<RevenueChart />} />
            <Route path="orders" element={<OrdersManagement />} />
            <Route path="products" element={<ProductsManagement />} />
            <Route path="users" element={<UsersManagement />} />
          </Route>

          <Route path="*" element={<h1 className="text-center mt-10">404 - Page Not Found</h1>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
