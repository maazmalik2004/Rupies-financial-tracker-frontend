//import statements
import React from "react";
import "./navbar.css";
import TabsSegmentedControls from "./TabsSegmentedControls";
import CustomizableDateModule from "./CustomizableDateModule";
import BasicAvatars from "./BasicAvatars";
import SwitchControlled from "./SwitchControlled";
import { useAppState } from "../AppStateContext";

function Navbar() {
  //global states
  const { selectedTab, setSelectedTab, userTheme, setUserTheme } =
    useAppState();
  //TabsSegmentedControls attrributes

  //handler function for TabsSegmentedControls
  const handleTabSelect = function (tab) {
    console.log("Selected Tab:", tab);
    setSelectedTab(tab);
  };

  function handleSwitchSelect(newState) {
    setUserTheme(newState);
    console.log(newState);
    // Perform any other actions based on the new state if needed
  }

  //handler function for profile click
  function handleProfileClick(event) {
    console.log("profile click occurred");
    setSelectedTab("profile");
  }

  //returning component
  return (
    <div className="nav">
      <div>
        <CustomizableDateModule />
      </div>
      <div>
        <TabsSegmentedControls
          tabs={["dashboard", "categories", "about", "help"]}
          onSelect={handleTabSelect}
          currentTab={selectedTab}
        />
      </div>
      <div className="right">
        <SwitchControlled isChecked={userTheme} onSelect={handleSwitchSelect} />
        <BasicAvatars
          name="Maaz Malik"
          image="https://picsum.photos/200"
          onClick={handleProfileClick}
        />
      </div>
    </div>
  );
}

export default Navbar;
