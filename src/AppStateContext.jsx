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
  
  const [isFormActive, setIsFormActive] = React.useState(true);

  const [logHistory, setLogHistory] = React.useState();

  const [incomeSources, setIncomeSources]=useState([
    { name: 'Salary', budget: 5000 },
    { name: 'Freelance Income', budget: 2000 },
    { name: 'Side Business', budget: 1500 },
    { name: 'Investments', budget: 1000 },
  ]);

  const [expenseSources, setExpenseSources] = useState([
    { name: 'Rent', budget: 1200 },
    { name: 'Utilities', budget: 200 },
    { name: 'Groceries', budget: 300 },
    { name: 'Transportation', budget: 150 },
  ]);

  const [formSubmissionBuffer, setFormSubmissionBuffer] = useState([]);

  return (
    <AppStateContext.Provider
      value={{
        selectedTab,setSelectedTab,
        userTheme,setUserTheme,
        termSelect,setTermSelect,
         monthSelect,setMonthSelect,
        dashboardState,setDashboardState,
        isFormActive,setIsFormActive,
        logHistory, setLogHistory,
        incomeSources, setIncomeSources,
        expenseSources,setExpenseSources,
        formSubmissionBuffer, setFormSubmissionBuffer,
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
