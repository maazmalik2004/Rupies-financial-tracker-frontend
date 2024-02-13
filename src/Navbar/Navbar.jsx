import React from "react";
import "./navbar.css";
import TabsSegmentedControls from "./TabsSegmentedControls";
import CustomizableDateModule from "./CustomizableDateModule";
import BasicAvatars from "./BasicAvatars";
import SwitchControlled from "./SwitchControlled";

function Navbar(props) {
  const { setTab } = props;

  const customTabs = [
    { label: "dashboard" },
    { label: "categories" },
    { label: "feed" },
    { label: "help" },
  ];

  function handleTabSelect(event) {
    console.log("tab selection occurred", event);
    // Call the callback function passed from the parent
    setTab(event);
  }

  function handleProfileClick(event) {
    console.log("profile click occurred");
    console.log(event);
  }

  return (
    <div className="nav">
      <div className="nav-item">
        <CustomizableDateModule format="ddd, MMM D, YYYY" />
      </div>
      <div className="nav-item">
        <TabsSegmentedControls onSelect={handleTabSelect} tabs={customTabs} />
      </div>
      <div className="flex-container">
        <SwitchControlled />
        <BasicAvatars
          name="Maaz Malik"
          image="/static/images/avatar/1.jpg"
          onClick={handleProfileClick}
        />
      </div>
    </div>
  );
}

export default Navbar;
