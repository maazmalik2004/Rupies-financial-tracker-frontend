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


function App() {
  const { loggedIn} = useAppState();
  const { selectedTab} = useAppState();
  const { dashboardState} = useAppState();
  const { income, expense, balance, graphImage } = dashboardState;
  const { isFormActive} = useAppState();

  if(loggedIn==true)
  {
    document.body.style.backgroundColor = "black";
  }
  else{
    document.body.style.backgroundColor = "turquoise";
  }

  return (
    <>
    {!loggedIn && <Login/>}
    {loggedIn && (
    <div className="app">
      <Chatbot/>
      <div className="navbar">
        <Navbar />
      </div>

      {selectedTab === "dashboard" && (
        <>
          <div className="control-panel">
            <ControlPanel/>
            <img src={require('./logo.png')} alt="Logo" className="logo"/>
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

      
      {selectedTab === "categories" && <Categories />}

    </div>)}
    </>
  );
}

export default App;
