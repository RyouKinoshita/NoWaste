import React from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell, Label } from 'recharts';

const UserRoleBuyer = ({ users }) => {
    const buyerCount = users.filter(user => user.role === 'buyer').length;

    const data = [
        { name: 'Buyers', value: buyerCount },
    ];

    return (
        <div style={{ width: '100%', height: 225 }}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#F1948A "
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={['#F1948A ', '#82ca9d'][index % 2]} />
                        ))}
                        <Label value={`${buyerCount} Buyers`} position="up" fill="white" />
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default UserRoleBuyer;