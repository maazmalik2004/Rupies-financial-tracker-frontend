import React, { useState, useEffect } from "react";

const MenuSelect = ({ onSelect, currentSelect, menu }) => {
  const [selectedItem, setSelectedItem] = useState(currentSelect);

  useEffect(() => {
    setSelectedItem(currentSelect);
  }, [currentSelect]);

  const handleSelect = (item) => {
    setSelectedItem(item);
    onSelect(item);
  };

  return (
    <div style={menuContainerStyle}>
      {menu.map((option) => (
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
