import React, { createContext, useContext, useState, useEffect } from "react";

const AppStateContext = createContext();

export function AppStateProvider({ children }) {
  // navbar
  const [selectedTab, setSelectedTab] = useState("dashboard");

  //dashboard parameters
  const [dashboardIncome, setDashboardIncome] = useState(0);
  const [dashboardExpense, setDashboardExpense] = useState(0);
  const [dashboardBalance, setDashboardBalance] = useState(0);

  //transaction log form
  const [isFormActive, setIsFormActive] = React.useState(false);

  //log hisory corresponding to graph data
  const [logHistory, setLogHistory] = React.useState();

  //an array of income sources and expense sources
  const [incomeSources, setIncomeSources] = useState([]);
  const [expenseSources, setExpenseSources] = useState([]);

  //logged in state
  const [loggedIn, setLoggedIn] = useState(() => {
    const storedIsLoggedIn = sessionStorage.getItem("loggedIn");
    return storedIsLoggedIn ? JSON.parse(storedIsLoggedIn) : false;
  });
  useEffect(() => {
    sessionStorage.setItem("loggedIn", JSON.stringify(loggedIn));
  }, [loggedIn]);

  //returns a date one month ago in the required format
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    console.log("formatted date : ", `${year}-${month}-${day}`);
    return `${year}-${month}-${day}`;
  };

  //initializes the filter form
  const [formState, setFormState] = useState(() => {
    const storedFormState = sessionStorage.getItem("formState");
    return storedFormState
      ? JSON.parse(storedFormState)
      : {
          selectedOption: "both",
          allTimeCheckbox: false,
          startDate: formatDate(
            new Date(new Date().setMonth(new Date().getMonth() - 1))
          ),
          endDate: formatDate(new Date()),
          amountRangeCheckbox: false,
          startingAmount: "",
          endingAmount: "",
          includeRecurringCheckbox: false,
        };
  });
  useEffect(() => {
    sessionStorage.setItem("formState", JSON.stringify(formState));
  }, [formState]);

  //stores data logs required for the construction of graph
  const [graphData, setGraphData] = useState(() => {
    const storedGraphData = sessionStorage.getItem("graphData");
    return storedGraphData ? JSON.parse(storedGraphData) : null;
  });
  useEffect(() => {
    sessionStorage.setItem("graphData", JSON.stringify(graphData));
  }, [graphData]);

  //keeps track of the type of chart being displayed
  const [chartType, setChartType] = useState("bar"); // Default chart type is 'pie'

  return (
    <AppStateContext.Provider
      value={{
        selectedTab,
        setSelectedTab,
        isFormActive,
        setIsFormActive,
        logHistory,
        setLogHistory,
        incomeSources,
        setIncomeSources,
        expenseSources,
        setExpenseSources,
        loggedIn,
        setLoggedIn,
        formState,
        setFormState,
        graphData,
        setGraphData,
        chartType,
        setChartType,
        dashboardIncome,
        setDashboardIncome,
        dashboardExpense,
        setDashboardExpense,
        dashboardBalance,
        setDashboardBalance,
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
