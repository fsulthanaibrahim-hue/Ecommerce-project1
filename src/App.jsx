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
        <Route path="/orders" element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
          } />

          <Route path="order-details/:id" element={<OrderDetails />} />
          
        <Route path="/wishlist" element={
          <ProtectedRoute>
             <Wishlist />
          </ProtectedRoute>
        } />
        <Route path="/cart" element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />

        <Route path="/men" element={<Products category="Men" />} />
        <Route path="/women" element={<Products category="Women" />} />
        <Route path="/kids" element={<Products category="Kids" />} />
      </Routes>
      </Layout>
    </Router>
  );
}

export default App;
