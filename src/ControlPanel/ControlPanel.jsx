import React, { useState } from "react";
import "./controlpanel.css";
import MenuSelect from "./MenuSelect";
import ScrollableMenuSelect from "./ScrollableMenuSelect";
import { useAppState } from "../AppStateContext";
import FloatingActionButtons from "./FloatingActionButtons";

function ControlPanel({ onTermSelect, onMonthSelect }) {
  const { termSelect, setTermSelect } = useAppState();
  const { monthSelect, setMonthSelect } = useAppState();
  const { setIsFormActive } = useAppState();

  const handleTermSelect = (event) => {
    console.log(event);
    setTermSelect(event);
  };

  const handleMonthSelect = (event) => {
    console.log(event);
    setMonthSelect(event);
  };

  const handleButtonClick = () => {
    console.log("Button clicked!");
    setIsFormActive(true);
  };

  return (
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
      <div>
        <FloatingActionButtons onClick={handleButtonClick} />
      </div>
    </div>
  );
}

export default ControlPanel;
