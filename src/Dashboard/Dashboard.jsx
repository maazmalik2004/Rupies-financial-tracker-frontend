import React from "react";
import PropTypes from "prop-types";
import "./dashboard.css";
import Card from "./Card";

const Dashboard = ({ income, expense, balance, graphImageUrl }) => {
  return (
    <div className="dashboard-container">
      <div>
        <Card title="INCOME" content={`₹${income}`} buttonText="" />
      </div>
      <div>
        <Card title="EXPENSE" content={`₹${expense}`} buttonText="" />
      </div>
      <div>
        <Card title="BALANCE" content={`₹${balance}`} buttonText="" />
      </div>
      <div className="graph">
        <img src={graphImageUrl} alt="Graph" className="graph-image" />
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
