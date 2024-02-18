// Import statements
import React, { useState, useEffect } from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";

// Component function
function TabsSegmentedControls(props) {
  // State hook
  const [selectedTab, setSelectedTab] = useState();

  // Handler function
  function handleTabSelect(tab) {
    setSelectedTab(tab);
    props.onSelect(tab);
  }

  // Allows us to change the tabs from a parent function
  useEffect(
    function currentTab() {
      // Update the selectedTab when the currentTab value changes
      setSelectedTab(props.currentTab);
    },
    [props.currentTab]
  );

  return (
    <Tabs
      aria-label="tabs"
      value={props.tabs.indexOf(selectedTab)}
      onChange={function (event, newValue) {
        handleTabSelect(props.tabs[newValue]);
      }}
      sx={{ bgcolor: "rgba(0, 0, 0, 0)" }}
    >
      <TabList
        disableUnderline
        sx={{
          p: 0.5,
          gap: 0.5,
          borderRadius: "xl",
          bgcolor: "rgba(0, 0, 0, 0)",
          "& .MuiTab-root": {
            color: "white",
            transition: "color 0.3s ease, opacity 0.3s ease",
            borderRadius: "12px",
            "&:hover": {
              color: "#ddd",
              opacity: 0.8,
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            },
          },
          [`& .${tabClasses.root}[aria-selected="true"]`]: {
            boxShadow: "sm",
            bgcolor: "#555",
            color: "white",
            transition: "color 0.3s ease, background-color 0.3s ease",
            "&:hover": {
              color: "white",
            },
          },
        }}
      >
        {props.tabs.map(function (tab, index) {
          return (
            <Tab
              key={index}
              onSelect={function () {
                handleTabSelect(tab);
              }}
            >
              {tab}
            </Tab>
          );
        })}
      </TabList>
    </Tabs>
  );
}

export default TabsSegmentedControls;
