import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useAppState } from "../AppStateContext";


const data = [
  { type: 'income', category: 'Rent', amount: 2000 },
  { type: 'expense', category: 'Rent', amount: 1000 },
  { type: 'income', category: 'Groceries', amount: 1000 },
  { type: 'expense', category: 'Groceries', amount: 500 },
  { type: 'income', category: 'Entertainment', amount: 500 },
  { type: 'expense', category: 'Entertainment', amount: 200 },
  { type: 'income', category: 'Transportation', amount: 800 },
  { type: 'expense', category: 'Transportation', amount: 300 },
  { type: 'income', category: 'Utilities', amount: 1200 },
  { type: 'expense', category: 'Utilities', amount: 700 },
  { type: 'income', category: 'Dining Out', amount: 600 },
  { type: 'expense', category: 'Dining Out', amount: 400 },
  { type: 'income', category: 'Shopping', amount: 1500 },
  { type: 'expense', category: 'Shopping', amount: 1000 },
  // Add more data points as needed...
];

const HorizontalStackedBarChart = () => {
  const {formState, setFormState}=useAppState();
  
  const groupedData = data.reduce((acc, curr) => {
    const { type, category, amount } = curr;
    if (!acc[category]) {
      acc[category] = { category, income: 0, expense: 0 };
    }
    acc[category][type] += amount;
    return acc;
  }, {});

  // Convert grouped data into an array of objects
  const chartData = Object.values(groupedData);

  return (
    <BarChart
      width={800}
      height={400}
      data={chartData}
      layout="vertical"
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis type="number" />
      <YAxis dataKey="category" type="category" />
      <Tooltip />
      <Legend />
      <Bar dataKey="income" stackId="stack" fill="#82ca9d" />
      <Bar dataKey="expense" stackId="stack" fill="#ff4f4f" />
    </BarChart>
  );
};

export default HorizontalStackedBarChart;
