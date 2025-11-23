import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { email, password } = form;

      if (!email || !password) {
        toast.error("Please fill in both fields!");
        setLoading(false);
        return;
      }

      const res = await fetch(`http://localhost:5000/users?email=${form.email}`);
      const users = await res.json();

      if (users.length === 0) {
        toast.error("No account found with this email. Please register first!");
        setLoading(false);
        return;
      }

      const user = users[0];

      if (user.password !== password) {
        toast.error("Incorrect password. Please try again!");
        setLoading(false);
        return;
      }

// Save user info
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("loggedInUser", JSON.stringify(user));

      toast.success(`Welcome back, ${user.name}!`);

// Role-based redirection
      if (user.role === "admin") {
        navigate("/admin"); 
      } else {
        navigate("/products"); 
      }

    } catch (err) {
      console.error("Login failed:", err);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[90%] sm:w-[400px]">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Welcome back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-black focus:ring-1"
            value={form.email}
            onChange={handleChange}
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-black focus:ring-1"
              value={form.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black cursor-pointer"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition cursor-pointer"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-black font-semibold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
