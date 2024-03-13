import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SellersOrderPerMonth = ({ orders }) => {
  const accumulatedSalesData = orders.reduce((acc, order) => {
    const date = new Date(order.createdAt);
    const month = date.toLocaleString('en-us', { month: 'long', day: 'numeric' }); // Get month name and day
    const sales = order.totalPrice;
    const accumulatedSales = (acc.length > 0 ? acc[acc.length - 1].accumulatedSales : 0) + sales;

    acc.push({ month, accumulatedSales });
    return acc;
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={accumulatedSalesData}
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
        <Tooltip formatter={(value, name, props) => [`₱${value}`, name]} />
        <Legend />
        <Line type="monotone" dataKey="accumulatedSales" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}


export default SellersOrderPerMonth;
