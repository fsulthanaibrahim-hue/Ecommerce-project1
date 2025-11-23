import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const email = localStorage.getItem("resetEmail");

  const handleReset = () => {
    if (!password) {
      toast.error("Enter new password");
      return;
    }

    fetch(`http://localhost:5000/users?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        const user = data[0];

        fetch(`http://localhost:5000/users/${user.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        });

        toast.success("Password Updated Successfully!");
        localStorage.removeItem("resetEmail");
        navigate("/login");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Reset Your Password</h2>

        <input
          type="password"
          placeholder="Enter new password"
          className="w-full border p-3 rounded-lg mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleReset}
          className="w-full bg-black text-white py-3 rounded-lg"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
