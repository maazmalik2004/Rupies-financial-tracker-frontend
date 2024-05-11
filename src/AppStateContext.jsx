import React, { createContext, useContext, useState, useEffect } from "react";

const AppStateContext = createContext();

export function AppStateProvider({ children }) {
  // navbar
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [userTheme, setUserTheme] = useState(true); // true is dark theme, false is light theme

  // dashboard
  const [dashboardState, setDashboardState] = useState({
    income: 0,
    expense: 0,
    balance: 0,
    graphImage: "https://picsum.photos/200",
  });
  
  const [isFormActive, setIsFormActive] = React.useState(false);

  const [logHistory, setLogHistory] = React.useState();

  const [incomeSources, setIncomeSources]=useState([
  ]);

  const [expenseSources, setExpenseSources] = useState([
  ]);

  const [loggedIn, setLoggedIn] = useState(() => {
    const storedIsLoggedIn = sessionStorage.getItem('loggedIn');
    return storedIsLoggedIn ? JSON.parse(storedIsLoggedIn) : false;
});
useEffect(() => {
  sessionStorage.setItem('loggedIn', JSON.stringify(loggedIn));
}, [loggedIn]);

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  console.log('formatted date : ',`${year}-${month}-${day}`);
  return `${year}-${month}-${day}`;
};

const [formState, setFormState] = useState(() => {
  const storedFormState = sessionStorage.getItem('formState');
  return storedFormState
    ? JSON.parse(storedFormState)
    : {
        selectedOption: 'both',
        allTimeCheckbox: false,
        startDate: formatDate(new Date(new Date().setMonth(new Date().getMonth() - 1))),
    endDate: formatDate(new Date()),
        amountRangeCheckbox: false,
        startingAmount: '',
        endingAmount: '',
        includeRecurringCheckbox: false,
      };
});

useEffect(() => {
  sessionStorage.setItem('formState', JSON.stringify(formState));
}, [formState]);

const [graphData, setGraphData] = useState(() => {
  const storedGraphData = sessionStorage.getItem('graphData');
  return storedGraphData ? JSON.parse(storedGraphData) : null;
});

useEffect(() => {
  sessionStorage.setItem('graphData', JSON.stringify(graphData));
}, [graphData]);

const [chartType, setChartType] = useState('bar'); // Default chart type is 'pie'

  return (
    <AppStateContext.Provider
      value={{
        selectedTab,setSelectedTab,
        userTheme,setUserTheme,
        dashboardState,setDashboardState,
        isFormActive,setIsFormActive,
        logHistory, setLogHistory,
        incomeSources, setIncomeSources,
        expenseSources,setExpenseSources,
        loggedIn,setLoggedIn,
        formState, setFormState,
        graphData, setGraphData,
        chartType, setChartType,
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
