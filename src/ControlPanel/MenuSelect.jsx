import React, { useState } from "react";

const MenuSelect = ({ onSelect, options }) => {
  const [selectedItem, setSelectedItem] = useState("monthly");

  const handleSelect = (item) => {
    setSelectedItem(item);
    onSelect(item);
  };

  return (
    <div style={menuContainerStyle}>
      {options.map((option) => (
        <div
          key={option}
          style={menuItemStyle(selectedItem === option)}
          onClick={() => handleSelect(option)}
        >
          {capitalizeFirstLetter(option)}
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
};

const menuItemStyle = (isSelected) => ({
  color: "white",
  cursor: "pointer",
  marginBottom: "8px",
  padding: "8px",
  borderRadius: "4px",
  border: `2px solid ${isSelected ? "#fff" : "transparent"}`,
});

const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

export default MenuSelect;
