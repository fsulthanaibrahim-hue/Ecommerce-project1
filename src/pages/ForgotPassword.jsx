import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSendLink = () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    fetch(`http://localhost:5000/users?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          toast.error("Email not found!");
          return;
        }

        // Store email for reset page
        localStorage.setItem("resetEmail", email);

        toast.success("Password reset link sent!");
        navigate("/reset-password");
      })
      .catch(() => toast.error("Server error!"));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter your registered email"
          className="w-full border p-3 rounded-lg mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleSendLink}
          className="w-full bg-black text-white py-3 rounded-lg"
        >
          Send Reset Link
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
