import React,{useState} from "react";
import "./navbar.css";
import TabsSegmentedControls from "./TabsSegmentedControls";
import CustomizableDateModule from "./CustomizableDateModule";
import BasicAvatars from "./BasicAvatars";
import SwitchControlled from "./SwitchControlled";
import { useAppState } from "../AppStateContext";

function Navbar() {
  const { selectedTab, setSelectedTab} =
    useAppState();
  const [isHovering, setIsHovering] = useState(false);
  const { setLoggedIn } = useAppState();


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

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  // Function to handle mouse leave
  const handleMouseLeave = () => {
    
    setIsHovering(false);
  };

  const handleLogOut=()=>{
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) 
    {
      setLoggedIn(false);
    }
  };

  //returning component
  return (
    <div className="nav">
        <CustomizableDateModule />
        <TabsSegmentedControls
          tabs={["dashboard", "categories", "planner", "help"]}
          onSelect={handleTabSelect}
          currentTab={selectedTab}
        />
      <div className="right" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleLogOut}>
        {/* <SwitchControlled isChecked={userTheme} onSelect={handleSwitchSelect} /> */}
        <div className="navbarverticalflex">
          <p>{isHovering ? "log  out" : sessionStorage.getItem("username")}</p>
        </div>
        <BasicAvatars
          name={sessionStorage.getItem('username')}
          image="https://picsum.photos/200"
          onClick={handleProfileClick}
        />
      </div>
    </div>
  );
}

export default Navbar;
