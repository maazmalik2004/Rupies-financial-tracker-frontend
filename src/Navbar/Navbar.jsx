import React from "react";
import "./navbar.css";
import TabsSegmentedControls from "./TabsSegmentedControls";
import CustomizableDateModule from "./CustomizableDateModule";
import BasicAvatars from "./BasicAvatars";
import SwitchControlled from "./SwitchControlled";
import { useAppState } from "../AppStateContext";

function Navbar() {
  const { selectedTab, setSelectedTab, userTheme, setUserTheme } =
    useAppState();

  const handleTabSelect = function (tab) {
    console.log("Selected Tab:", tab);
    setSelectedTab(tab);
  };

  function handleSwitchSelect(newState) {
    setUserTheme(newState);
    console.log(newState);
  }

  function handleProfileClick(event) {
    console.log("profile click occurred");
    setSelectedTab("profile");
  }

  //returning component
  return (
    <div className="nav">
        <CustomizableDateModule />
        <TabsSegmentedControls
          tabs={["dashboard", "categories", "about", "help"]}
          onSelect={handleTabSelect}
          currentTab={selectedTab}
        />
      <div className="right">
        {/*<SwitchControlled isChecked={userTheme} onSelect={handleSwitchSelect} />*/}
        <div className="navbarverticalflex">
        <p>Maaz Malik</p>
        </div>
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
