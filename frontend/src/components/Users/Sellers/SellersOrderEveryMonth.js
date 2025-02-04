import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SellersOrderEveryMonth = ({ allOrders }) => {
  // Function to count the number of orders per month
  const countOrdersPerMonth = (orders) => {
    const ordersPerMonth = {};
    orders.forEach(order => {
      const month = new Date(order.createdAt).toLocaleString('en-us', { month: 'long' });
      ordersPerMonth[month] = (ordersPerMonth[month] || 0) + 1;
    });
    return ordersPerMonth;
  };

  // Get the count of orders per month
  const ordersPerMonth = countOrdersPerMonth(allOrders);

  // Convert ordersPerMonth object into an array of objects
  const data = Object.keys(ordersPerMonth).map(month => ({
    month,
    orders: ordersPerMonth[month],
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="orders" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default SellersOrderEveryMonth;
