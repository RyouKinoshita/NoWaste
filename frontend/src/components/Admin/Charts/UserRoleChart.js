import React from "react";
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
  Label,
  LabelList,
} from "recharts";
const UserRoleAdmin = ({ users }) => {
  const adminCount = users.filter((user) => user.role === "admin").length;
  const buyerCount = users.filter((user) => user.role === "buyer").length;
  const sellerCount = users.filter((user) => user.role === "seller").length;

  const data = [
    { name: "Admins", value: adminCount },
    { name: "Buyers", value: buyerCount },
    { name: "Sellers", value: sellerCount },
  ];

  const colors = ["#1ABC9C", "#3498DB", "#F39C12"];

  return (
    <div style={{ width: "100%", height: 225 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#1ABC9C"
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
            <LabelList dataKey="name" position="inside" fill="black" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserRoleAdmin;
