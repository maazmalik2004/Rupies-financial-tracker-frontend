import React, { createContext, useContext, useState } from "react";

const AppStateContext = createContext();

export function AppStateProvider({ children }) {
  // navbar
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [userTheme, setUserTheme] = useState(true); // true is dark theme, false is light theme

  // control panel
  const [termSelect, setTermSelect] = useState("monthly");
  const currentMonth = new Date().toLocaleString("default", { month: "long" });
  const [monthSelect, setMonthSelect] = useState(currentMonth);

  // dashboard
  const [dashboardState, setDashboardState] = useState({
    income: 0,
    expense: 0,
    balance: 0,
    graphImage: "https://picsum.photos/200",
  });

  const [incomeSources, setIncomeSources] = useState([
    "source 1",
    "source 2",
    "source 3",
  ]);
  const [expenseSources, setExpenseSources] = useState([
    "source 1",
    "source 2",
    "source 3",
  ]);

  const [isFormActive, setIsFormActive] = React.useState(true);

  return (
    <AppStateContext.Provider
      value={{
        selectedTab,
        setSelectedTab,
        userTheme,
        setUserTheme,
        termSelect,
        setTermSelect,
        monthSelect,
        setMonthSelect,
        // dashboard properties
        dashboardState,
        setDashboardState,
        isFormActive,
        setIsFormActive,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within an AppStateProvider");
  }
  return context;
}
