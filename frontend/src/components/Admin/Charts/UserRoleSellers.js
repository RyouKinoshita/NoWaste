import React from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell, Label } from 'recharts';

const UserRoleSellers = ({ users }) => {
    const sellerCount = users.filter(user => user.role === 'seller').length;

    const data = [
        { name: 'Sellers', value: sellerCount },
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
                        fill="#8884d8"
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={['#F39C12', '#82ca9d'][index % 2]} />
                        ))}
                        <Label value={`${sellerCount} Sellers`} position="up" fill="white" />
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default UserRoleSellers