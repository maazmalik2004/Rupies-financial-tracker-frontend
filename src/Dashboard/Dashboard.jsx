import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./dashboard.css";
import LogHistory from "./LogHistory/LogHistory";
import Graph from "./Graph";
import { ZAxis } from "recharts";
import { useAppState } from "../AppStateContext";

const Dashboard = ({ income, expense, balance, graphImageUrl }) => {

  const {chartType,setChartType}=useAppState();

  return (
    <div className="dashboard-container">
      <div className="card">
        <p>INCOME</p>
        <h1 style={{color:"green"}}> ₹ {sessionStorage.getItem('dashboardIncome')}</h1>
      </div>
      <div className="card">
      <p>EXPENSE</p>
      <h1 style={{color:"red"}}> ₹ {sessionStorage.getItem('dashboardExpense')}</h1>
      </div>
      <div className="card">
      <p>BALANCE</p>
        <h1 style={balance>0 ?{color:"green"}:{color:"red"}}>₹ {sessionStorage.getItem('dashboardBalance')}</h1>
        </div>
      <div className="graph">
        {/*<img src={graphImageUrl} alt="Graph" className="graph-image" />*/}
        <Graph chartType={chartType}/>
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
