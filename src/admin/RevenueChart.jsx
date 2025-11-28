import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import axios from "axios";

const RevenueChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchRevenue();
  }, []);

  const fetchRevenue = async () => {
    const res = await axios.get("http://localhost:5000/orders"); 
    const chartData = res.data.map((order) => ({
      date: new Date(order.createdAt).toLocaleDateString(),
      revenue: order.total,
    }));
    setData(chartData);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Revenue Status</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;



