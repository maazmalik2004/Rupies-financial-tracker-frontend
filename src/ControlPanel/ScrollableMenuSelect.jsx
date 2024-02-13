import React, { useState } from "react";

const ScrollableMenuSelect = ({ months, onSelect }) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;

  const [selectedItem, setSelectedItem] = useState(months[currentMonth - 1]);

  const handleSelect = (item) => {
    setSelectedItem(item);
    onSelect(item);
  };

  return (
    <div style={menuContainerStyle}>
      {months.map((month) => (
        <div
          key={month}
          style={menuItemStyle(selectedItem === month)}
          onClick={() => handleSelect(month)}
        >
          {month}
        </div>
      ))}
    </div>
  );
};

const menuContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "transparent",
  border: "1px solid white",
  borderRadius: "8px",
  padding: "8px",
  height: "200px",
  overflowY: "auto",
};

const menuItemStyle = (isSelected) => ({
  color: "white",
  cursor: "pointer",
  marginBottom: "8px",
  padding: "8px",
  borderRadius: "4px",
  border: `2px solid ${isSelected ? "#fff" : "transparent"}`,
});

export default ScrollableMenuSelect;
