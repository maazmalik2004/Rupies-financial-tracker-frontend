import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'January', income: 4000, expense: 2000 },
  { month: 'February', income: 3000, expense: 1500 },
  { month: 'March', income: 3500, expense: 1800 },
  { month: 'April', income: 4000, expense: 2500 },
  { month: 'May', income: 4500, expense: 2200 },
  { month: 'June', income: 4800, expense: 2600 },
  { month: 'July', income: 5000, expense: 3000 },
];

const Graph = () => {
  return (
<div style={{ width: '100%', height: '400px', position: 'relative', zIndex: '0' }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="income" stroke="#82ca9d" fill="#82ca9d" />
          <Area type="monotone" dataKey="expense" stroke="#ff4f4f" fill="#ff4f4f" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;
