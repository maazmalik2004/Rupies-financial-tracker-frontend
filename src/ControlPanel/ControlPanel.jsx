import React, { useState, useEffect } from "react";
import "./controlpanel.css";
import MenuSelect from "./MenuSelect";
import ScrollableMenuSelect from "./ScrollableMenuSelect";
import { useAppState } from "../AppStateContext";
import FloatingActionButtons from "./FloatingActionButtons";
import axios from "axios";

function ControlPanel({ onTermSelect, onMonthSelect }) {
  const { termSelect, setTermSelect } = useAppState();
  const { monthSelect, setMonthSelect } = useAppState();
  const { setIsFormActive } = useAppState();

  const requestStats = async () => {
    try {
      const url = `http://localhost:3000/dashboard/${termSelect}/`;
      const response = await axios.get(url);

      const data = response.data;
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Error fetching data! Please check your internet connection");
    }
  };

  const handleTermSelect = (event) => {
    console.log(event);
    setTermSelect(event);
  };

  useEffect(() => {
    requestStats();
  }, [termSelect]);

  const handleMonthSelect = (event) => {
    console.log(event);
    setMonthSelect(event);
  };

  const handleButtonClick = () => {
    console.log("Button clicked!");
    setIsFormActive(true);
  };

  return (
    <>
      <div className="control-panel">
        <MenuSelect
          onSelect={handleTermSelect}
          currentSelect={termSelect}
          menu={["daily", "weekly", "monthly", "yearly"]}
        />
        <br />
        {termSelect === "monthly" && (
          <ScrollableMenuSelect
            onSelect={handleMonthSelect}
            currentSelect={monthSelect}
            menu={[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ]}
          />
        )}
        <div className="log-new">
          <FloatingActionButtons onClick={handleButtonClick} />
        </div>
      </div>
    </>
  );
}

export default ControlPanel;
