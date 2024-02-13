import React, { useState } from "react";
import "./controlpanel.css";
import MenuSelect from "./MenuSelect";
import ScrollableMenuSelect from "./ScrollableMenuSelect";

function ControlPanel({ onTermSelect, onMonthSelect }) {
  const [termSelection, setTermSelection] = useState("monthly");

  const handleTermSelect = (event) => {
    setTermSelection(event);
    onTermSelect(event);
  };

  const handleMonthSelect = (event) => {
    onMonthSelect(event);
  };

  return (
    <div className="control-panel">
      <MenuSelect
        onSelect={handleTermSelect}
        options={["daily", "weekly", "monthly", "yearly"]}
      />
      <br />
      {termSelection === "monthly" && (
        <ScrollableMenuSelect
          onSelect={handleMonthSelect}
          months={[
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
    </div>
  );
}

export default ControlPanel;
