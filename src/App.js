import React from "react";
import "./styles.css";
import Navbar from "./Navbar/Navbar.jsx";
import ControlPanel from "./ControlPanel/ControlPanel.jsx";
import Dashboard from "./Dashboard/Dashboard.jsx";
import { useAppState } from "./AppStateContext";
import Form from "./Form/Form";

function App() {
  // Global states
  const { selectedTab, setSelectedTab } = useAppState();
  const { dashboardState, setDashboardState } = useAppState();
  const { income, expense, balance, graphImage } = dashboardState;
  const { isFormActive, setIsFormActive } = useAppState();

  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>

      {selectedTab === "dashboard" && (
        <>
          <div className="control-panel">
            <ControlPanel />
          </div>

          <div className="dashboard">
            <Dashboard
              income={income}
              expense={expense}
              balance={balance}
              graphImageUrl={graphImage}
            />
          </div>
        </>
      )}
      {isFormActive === true && (
        <div className="form-layer">
          <Form className="form" />
        </div>
      )}
    </div>
  );
}

export default App;
