import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-orange-600 rounded-lg p-4 text-white shadow">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{title}</h3>
        <div>{icon}</div>
      </div>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}

const DashboardContent = ({ orders, users, products }) => {
  if (!orders || !users || !products) {
    return <p className="text-white">Loading...</p>
  }
}


export default DashboardContent;
