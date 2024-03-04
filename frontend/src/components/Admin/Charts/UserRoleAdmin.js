import React from "react";
import { PieChart, Pie, ResponsiveContainer, Cell, Label } from "recharts";
const UserRoleAdmin = ({ users }) => {
  const adminCount = users.filter((user) => user.role === "admin").length;

  const data = [{ name: "admin", value: adminCount }];
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
              <Cell key={`cell-${index}`} />
            ))}
            <Label value={`${adminCount} Admin`} position="up" fill="white" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserRoleAdmin;
