import React, { useState, useEffect } from "react";

const SlotMachineDigit = ({ value, type, index }) => {
  const [currentValue, setCurrentValue] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const initialValue = Number(value);
    const duration = 1500; // Total duration in milliseconds
    const steps = 30; // Number of steps

    const increment = (initialValue - currentValue) / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      setCurrentValue(prevValue => {
        const newValue = Math.round(prevValue + increment);
        currentStep++;
        if (currentStep >= steps || newValue === initialValue) {
          clearInterval(interval);
          setCurrentValue(initialValue);
          setIsComplete(true);
          stabilizeNextDigit();
        }
        return newValue;
      });
    }, duration / steps);

    const stabilizeNextDigit = () => {
      const delay = index * 100; // Calculate delay based on index
      setTimeout(() => {
        setIsComplete(false);
        setCurrentValue(initialValue);
      }, delay);
    };

    return () => clearInterval(interval);
  }, [value, index]);

  // Determine the color based on the type prop
  let textColor;
  switch (type) {
    case "income":
      textColor = { color: "turquoise" };
      break;
    case "expense":
      textColor = { color: "red" }; // Change green to turquoise
      break;
    case "balance":
      textColor = { color: value <= 0 ? "red" : "turquoise" }; // Change green to turquoise
      break;
    case "default":
    default:
      textColor = { color: "white" };
  }

  return (
    <h1 style={{ ...textColor, display: "inline-block" }}>
      ₹ {currentValue}
    </h1>
  );
};

export default SlotMachineDigit;
