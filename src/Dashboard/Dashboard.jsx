import React, { useEffect, useState } from "react";
import "./dashboard.css";
import PropTypes from "prop-types";

import LogHistory from "./LogHistory/LogHistory";
import Graph from "./Graph";
import { useAppState } from "../AppStateContext";
import SlotMachineDigit from "./slotmachine.jsx";


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
        <SlotMachineDigit value={dashboardIncome} type="income"/>
      </div>
      <div className="card">
        <p>EXPENSE</p>
        <SlotMachineDigit value={dashboardExpense} type="expense"/>
        </div>
      <div className="card">
        <p>BALANCE</p>
        <SlotMachineDigit value={dashboardBalance} type="balance"/>
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
