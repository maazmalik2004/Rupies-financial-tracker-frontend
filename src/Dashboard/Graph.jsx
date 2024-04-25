import React, { useEffect } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import { useAppState } from "../AppStateContext";

const PieChartComponent = () => {
  const { formState, setFormState } = useAppState();

  // Retrieve data from session storage
  const sessionData = JSON.parse(sessionStorage.getItem('graphData'));

  // Extract transaction data from session data
  const data = sessionData.data;

  // Calculate sum of all incomes and sum of all expenses
  const totalIncome = data.reduce((acc, curr) => {
    if (curr.type === 'income') {
      return acc + parseFloat(curr.amount);
    }
    return acc;
  }, 0);

  const totalExpense = data.reduce((acc, curr) => {
    if (curr.type === 'expense') {
      return acc + parseFloat(curr.amount);
    }
    return acc;
  }, 0);

  // Calculate balance (total income - total expense)
  const balance = totalIncome - totalExpense;

  // Store calculated values as session variables
  useEffect(() => {
    sessionStorage.setItem('dashboardIncome', totalIncome);
    sessionStorage.setItem('dashboardExpense', totalExpense);
    sessionStorage.setItem('dashboardBalance', balance);
  }, [totalIncome, totalExpense, balance]);

  // Group data by category and calculate total amount for each category
  const groupedData = data.reduce((acc, curr) => {
    const { category, amount } = curr;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += parseFloat(amount);
    return acc;
  }, {});

  // Convert grouped data into an array of objects
  const chartData = Object.keys(groupedData).map(category => ({
    category,
    amount: groupedData[category],
  }));

  // Define colors for the pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#19A0FF', '#FF197F'];

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={chartData}
        cx="50%"
        cy="50%"
        labelLine={false}
        outerRadius={150}
        fill="#8884d8"
        dataKey="amount"
        nameKey="category" // Set the nameKey to "category"
      >
        {chartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default PieChartComponent;
