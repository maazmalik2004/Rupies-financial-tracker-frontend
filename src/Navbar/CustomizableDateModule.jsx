import React, { useState, useEffect } from "react";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthsOfYear = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const CustomizableDateModule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000 * 60); // Update every minute

    return () => clearInterval(intervalId);
  }, []);

  const formatDate = () => {
    const dayOfWeek = daysOfWeek[currentDate.getDay()];
    const month = monthsOfYear[currentDate.getMonth()];
    const dayOfMonth = currentDate.getDate();
    const year = currentDate.getFullYear();

    const formattedDate = "ddd, MMM D, YYYY"
      .replace("ddd", dayOfWeek)
      .replace("MMM", month)
      .replace("D", dayOfMonth)
      .replace("YYYY", year);

    return formattedDate;
  };

  return (
    <div>
      <p>{formatDate()}</p>
    </div>
  );
};

export default CustomizableDateModule;
