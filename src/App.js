import React from "react";
import { useAppState } from "./AppStateContext";
import "./styles.css";
import Navbar from "./Navbar/Navbar.jsx";
import ControlPanel from "./ControlPanel/ControlPanel.jsx";
import Dashboard from "./Dashboard/Dashboard.jsx";
import Form from "./Form/Form";
import Categories from "./Categories/Categories.jsx";
import Chatbot from "./Chatbot/Chatbot.jsx";
import Login from "./Login/Login.jsx";
import RetirementPlanner from "./planner/planner.jsx";

function App() {
  const { loggedIn } = useAppState();
  const { selectedTab } = useAppState();
  const { isFormActive } = useAppState();

  if (loggedIn == true) {
    document.body.style.backgroundColor = "#1D1D2D";
  } else {
    document.body.style.backgroundColor = "turquoise";
  }

  return (
    <>
      {!loggedIn && <Login />}
      {loggedIn && (
        <div className="app">
          <Chatbot />
          <div className="navbar">
            <Navbar />
          </div>

          {selectedTab === "dashboard" && (
            <>
              <div className="control-panel">
                <ControlPanel />
                <img src={require("./logo.png")} alt="Logo" className="logo" />
              </div>

              <div className="dashboard">
                <Dashboard />
              </div>
            </>
          )}

          {isFormActive === true && (
            <div className="form-layer">
              <Form className="form" />
            </div>
          )}

          {selectedTab === "categories" && <Categories />}
          {selectedTab === "planner" && <RetirementPlanner />}
        </div>
      )}
    </>
  );
}

export default App;
