// TabsSegmentedControls.jsx

import * as React from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";

export default function TabsSegmentedControls(props) {
  const handleChange = (event, newValue) => {
    const selectedTab = props.tabs[newValue];
    props.onSelect(selectedTab.label);
  };

  return (
    <Tabs
      aria-label="tabs"
      onChange={handleChange}
      sx={{ bgcolor: "rgba(0, 0, 0, 0)" }}
    >
      <TabList
        disableUnderline
        sx={{
          p: 0.5,
          gap: 0.5,
          borderRadius: "xl",
          bgcolor: "rgba(0, 0, 0, 0)", // Transparent background color
          "& .MuiTab-root": {
            color: "white", // Text color for non-selected tabs
          },
          [`& .${tabClasses.root}[aria-selected="true"]`]: {
            boxShadow: "sm",
            bgcolor: "#555", // Darker background color for selected tab
            color: "white", // Text color for selected tab
          },
        }}
      >
        {props.tabs.map((tab, index) => (
          <Tab key={index} onSelect={() => props.onSelect(index)}>
            {tab.label}
          </Tab>
        ))}
      </TabList>
    </Tabs>
  );
}
