import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const PredictiveChart = () => {
  // Sample historical data
  const historicalData = [
    { month: 1, carrots: 10, tomatoes: 5, onions: 8 },
    { month: 2, carrots: 12, tomatoes: 6, onions: 9 },
    { month: 3, carrots: 14, tomatoes: 8, onions: 10 },
    { month: 4, carrots: 11, tomatoes: 7, onions: 12 },
    { month: 5, carrots: 9, tomatoes: 4, onions: 11 },
    { month: 6, carrots: 15, tomatoes: 9, onions: 14 },
    { month: 7, carrots: 13, tomatoes: 7, onions: 11 },
    { month: 8, carrots: 14, tomatoes: 6, onions: 10 },
    { month: 9, carrots: 12, tomatoes: 8, onions: 9 },
    { month: 10, carrots: 10, tomatoes: 5, onions: 8 },
    { month: 11, carrots: 11, tomatoes: 6, onions: 9 },
    { month: 12, carrots: 13, tomatoes: 7, onions: 10 },
  ];

  // Create a simple linear prediction for the next year
  const nextYearMonths = Array.from(
    { length: 12 },
    (_, i) => i + 1 + historicalData.length
  );
  const predictedData = nextYearMonths.map((month) => ({
    month,
    carrots: 15 - month * 0.5, // Adjust the formula as needed
    tomatoes: 8 - month * 0.3, // Adjust the formula as needed
    onions: 10 - month * 0.2, // Adjust the formula as needed
  }));

  // Combine historical and predicted data
  const chartData = [...historicalData, ...predictedData];

  return (
    <LineChart
      width={700}
      height={400}
      data={chartData}
      margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="carrots" stroke="#8884d8" name="Carrots" />
      <Line
        type="monotone"
        dataKey="tomatoes"
        stroke="#82ca9d"
        name="Tomatoes"
      />
      <Line type="monotone" dataKey="onions" stroke="#ffc658" name="Onions" />
    </LineChart>
  );
};

export default PredictiveChart;
