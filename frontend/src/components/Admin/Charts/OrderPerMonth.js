import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const OrderPerMonth = ({ orders }) => {
    const [orderData, setOrderData] = useState([]);

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                // Group orders by month
                const ordersByMonth = orders.reduce((acc, order) => {
                    const monthYear = new Date(order.createdAt).toLocaleString('default', { month: 'short', year: 'numeric' });
                    acc[monthYear] = acc[monthYear] ? acc[monthYear] + 1 : 1;
                    return acc;
                }, {});

                // Convert object to array for chart
                const chartData = Object.keys(ordersByMonth).map(monthYear => ({
                    name: monthYear,
                    orders: ordersByMonth[monthYear]
                }));

                setOrderData(chartData);
            } catch (error) {
                console.error('Error fetching order data:', error);
            }
        };

        fetchOrderData();
    }, [orders]);

    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart
                data={orderData}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="orders" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default OrderPerMonth;