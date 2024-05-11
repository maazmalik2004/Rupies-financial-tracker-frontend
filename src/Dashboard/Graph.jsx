import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, BarChart, Bar } from 'recharts';
import { useAppState } from "../AppStateContext";

const ChartComponent = ({chartType}) => {
  const { graphData } = useAppState();
  const [chartData, setChartData]=useState(null);
  //const [minDate, setMinDate] = useState(null);
  //const [maxDate, setMaxDate] = useState(null);

  // Define colors for the pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#19A0FF', '#FF197F'];
  
  // Calculate totalIncome, totalExpense, and balance
  useEffect(() => {
    if (graphData) {
      const totalIncome = calculateTotalIncome(graphData.data);
      const totalExpense = calculateTotalExpense(graphData.data);
      const balance = totalIncome - totalExpense;
      setChartData(graphData ? convertGroupedDataToArray(groupDataByCategory(graphData.data)) : []);

      sessionStorage.setItem('dashboardIncome',totalIncome);
      sessionStorage.setItem('dashboardExpense', totalExpense);
      sessionStorage.setItem('dashboardBalance', balance);
    }
  }, [graphData]);//everytime graph data is updated, values are recalculated

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

  // Custom hook to find the minimum date in the data
// Custom hook to find the minimum date in the data
const useMinDate = (data) => {
  const [minDate, setMinDate] = useState(null);

  useEffect(() => {
    if (data && data.length > 0) {
      const dates = data.map(entry => new Date(entry.date));
      const min = new Date(Math.min(...dates));
      console.log("min date is", min);
      setMinDate(min);
    }
  }, [data]);

  return minDate;
};

// Custom hook to find the maximum date in the data
const useMaxDate = (data) => {
  const [maxDate, setMaxDate] = useState(null);

  useEffect(() => {
    if (data && data.length > 0) {
      const dates = data.map(entry => new Date(entry.date));
      const max = new Date(Math.max(...dates));
      console.log("max date is", max);
      setMaxDate(max);
    }
  }, [data]);

  return maxDate;
};


// Usage in your component
const minDate = useMinDate(graphData && graphData.data);
const maxDate = useMaxDate(graphData && graphData.data);

  return (
    <div>
      {
        (() => {
          switch (chartType) {
            case 'pie':
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
                    nameKey="category"
                  >
                    {chartData && chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              );
              case 'scatter':
              return (
                <ScatterChart width={500} height={300}>
  <CartesianGrid />
  <XAxis 
    dataKey="date" 
    type="category" 
    domain={[minDate, maxDate]} // Set domain based on minDate and maxDate
  />
  <YAxis 
    dataKey="amount" 
    type="number" 
    domain={['auto', 'auto']} // Set domain to 'auto' for the Y-axis
  />
  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
  <Scatter name="Income" data={graphData && graphData.data.filter(entry => entry.type === 'income')} fill="#00C49F" />
  <Scatter name="Expense" data={graphData && graphData.data.filter(entry => entry.type === 'expense')} fill="#FF8042" />
  <Legend />
</ScatterChart>

              );
              case 'bar':
              return (
                <BarChart width={500} height={300} data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="amount" fill="#8884d8" />
                </BarChart>
              );
            default:
              return null; // or render a default component
          }
        })()
      }
    </div>
  );
  
};

export default ChartComponent;
