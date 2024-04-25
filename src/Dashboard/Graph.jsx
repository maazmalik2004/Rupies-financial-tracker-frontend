import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import { useAppState } from "../AppStateContext";

const PieChartComponent = () => {
  const { graphData } = useAppState();
  
  // Calculate totalIncome, totalExpense, and balance
  useEffect(() => {
    if (graphData) {
      const totalIncome = calculateTotalIncome(graphData.data);
      const totalExpense = calculateTotalExpense(graphData.data);
      const balance = calculateBalance(totalIncome, totalExpense);
      
      sessionStorage.setItem('dashboardIncome', totalIncome);
      sessionStorage.setItem('dashboardExpense', totalExpense);
      sessionStorage.setItem('dashboardBalance', balance);
    }
  }, [graphData]);

  const calculateTotalIncome = (data) => {
    return data.reduce((acc, curr) => {
      if (curr.type === 'income') {
        return acc + parseFloat(curr.amount);
      }
      return acc;
    }, 0);
  };
  
  const calculateTotalExpense = (data) => {
    return data.reduce((acc, curr) => {
      if (curr.type === 'expense') {
        return acc + parseFloat(curr.amount);
      }
      return acc;
    }, 0);
  };
  
  const calculateBalance = (totalIncome, totalExpense) => {
    return totalIncome - totalExpense;
  };
  
  // Group data by category and calculate total amount for each category
  const groupDataByCategory = (data) => {
    return data.reduce((acc, curr) => {
      const { category, amount } = curr;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += parseFloat(amount);
      return acc;
    }, {});
  };
  
  const convertGroupedDataToArray = (groupedData) => {
    return Object.keys(groupedData).map(category => ({
      category,
      amount: groupedData[category],
    }));
  };

  // Define colors for the pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#19A0FF', '#FF197F'];

  // Calculate chart data based on graphData
  const chartData = graphData ? convertGroupedDataToArray(groupDataByCategory(graphData.data)) : [];

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
