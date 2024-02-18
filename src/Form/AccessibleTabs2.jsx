import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

export default function AccessibleTabs2({ onTabChange }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (onTabChange) {
      onTabChange(newValue);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        onChange={handleChange}
        value={value}
        aria-label="Tabs where each tab needs to be selected manually"
      >
        <Tab label="Income" />
        <Tab label="Expense" />
      </Tabs>
    </Box>
  );
}
