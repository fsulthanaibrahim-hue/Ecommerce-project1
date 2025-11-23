import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const OTP = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleVerify = () => {
    const savedOtp = localStorage.getItem("resetOTP");

    if (otp === savedOtp) {
      toast.success("OTP Verified!");
      navigate("/reset-password");
    } else {
      toast.error("Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Enter OTP</h2>

        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full border p-3 rounded-lg mb-4"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button
          onClick={handleVerify}
          className="w-full bg-black text-white py-3 rounded-lg"
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
};

export default OTP;
