import React, { useState, useEffect } from "react";
import "./styles.css";
import Navbar from "./Navbar/Navbar.jsx";
import ControlPanel from "./ControlPanel/ControlPanel.jsx";
import Dashboard from "./Dashboard/Dashboard.jsx";

function App() {
  const [currentTab, setCurrentTab] = useState("dashboard");
  const [selectedTerm, setSelectedTerm] = useState("monthly");
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [financialData, setFinancialData] = useState({
    income: 0,
    expense: 0,
    balance: 0,
    graphImageUrl: "default-graph-url.jpg", // Provide a default image URL
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/data");
        const data = await response.json();
        setFinancialData(data);
      } catch (error) {
        console.error("Error fetching financial data:", error);
        setError("Error fetching financial data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // Call the fetchData function
  }, [loading]); // Add the loading dependency to useEffect

  function handleTabSelect(event) {
    setCurrentTab(event);
    console.log("Tab selected:", event);
  }

  function handleTermSelect(term) {
    setSelectedTerm(term);
    console.log("Term selected:", term);
  }

  function handleMonthSelect(month) {
    setSelectedMonth(month);
    console.log("Month selected:", month);
  }

  return (
    <div className="app">
      <div className="navbar">
        <Navbar setTab={handleTabSelect} />
      </div>

      {currentTab === "dashboard" && (
        <>
          <div className="control-panel">
            <ControlPanel
              onTermSelect={handleTermSelect}
              onMonthSelect={handleMonthSelect}
            />
          </div>

          <div className="display-area">
            <Dashboard
              selectedTerm={selectedTerm}
              selectedMonth={selectedMonth}
              income={financialData.income}
              expense={financialData.expense}
              balance={financialData.balance}
              graphImageUrl={financialData.graphImageUrl}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
