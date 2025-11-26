import React from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  const handleViewOrders = () => {
    navigate("/orders");
  };

  const handleContinueShopping = () => {
    navigate("/"); // Go to home/shop page
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-4">
      {/* Animated green circle with tick */}
      <div className="mb-6">
        <svg
          className="w-32 h-32"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="60"
            cy="60"
            r="55"
            stroke="#22c55e"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray="345"
            strokeDashoffset="345"
            className="animate-draw-circle"
          />
          <path
            d="M40 60 L55 75 L80 50"
            stroke="#22c55e"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="70"
            strokeDashoffset="70"
            className="animate-draw-check"
          />
        </svg>
      </div>

      <h1 className="text-4xl font-bold text-green-700 mb-4">Orders Successful!🎉</h1>
      <p className="text-lg text-gray-700 mb-6 text-center">
        Your order has been placed successfully.
      </p>

      <button
        type="button"
        onClick={handleContinueShopping}
        className="bg-green-500 border text-white px-6 py-3 rounded-md hover:bg-green-600 transition cursor-pointer"
      >
        Continue Shopping
      </button>

      <button 
        type="button"
        onClick={handleViewOrders}
        className="bg-white-600 border text-black mt-2 px-12 py-3 rounded-md hover:bg-gray-200 transition cursor-pointer"
      >
        View Orders
      </button>   

      {/* Tailwind CSS animations */}
      <style>
        {`
          @keyframes draw-circle {
            to { stroke-dashoffset: 0; }
          }
          @keyframes draw-check {
            to { stroke-dashoffset: 0; }
          }
          .animate-draw-circle {
            stroke-dashoffset: 345;
            animation: draw-circle 0.8s ease-out forwards;
          }
          .animate-draw-check {
            stroke-dashoffset: 70;
            animation: draw-check 0.5s 0.8s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default Success;
