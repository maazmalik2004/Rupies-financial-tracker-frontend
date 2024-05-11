import React, { useEffect, useState } from "react";
import "./dashboard.css";
import PropTypes from "prop-types";

import LogHistory from "./LogHistory/LogHistory";
import Graph from "./Graph";
import { useAppState } from "../AppStateContext";

const Dashboard = () => {
  const { chartType, setChartType } = useAppState();
  const {
    dashboardIncome,
    setDashboardIncome,
    dashboardExpense,
    setDashboardExpense,
    dashboardBalance,
    setDashboardBalance,
  } = useAppState();

  return (
    <div className="dashboard-container">
      <div className="card">
        <p>INCOME</p>
        <h1 style={{ color: "turquoise" }}> ₹ {dashboardIncome}</h1>
      </div>
      <div className="card">
        <p>EXPENSE</p>
        <h1 style={{ color: "red" }}> ₹ {dashboardExpense}</h1>
      </div>
      <div className="card">
        <p>BALANCE</p>
        <h1
          style={dashboardBalance > 0 ? { color: "turquoise" } : { color: "red" }}
        >
          ₹ {dashboardBalance}
        </h1>
      </div>
      <div className="graph">
        <Graph chartType={chartType} />
      </div>
      <div className="card">
        <LogHistory />
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  income: PropTypes.number.isRequired,
  expense: PropTypes.number.isRequired,
  balance: PropTypes.number.isRequired,
  graphImageUrl: PropTypes.string.isRequired,
};

export default Dashboard;
