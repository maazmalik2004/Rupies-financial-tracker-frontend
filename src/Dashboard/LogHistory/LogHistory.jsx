import "./loghistory.css";
import Log from "./Log";
import { useEffect } from "react";
import { useAppState } from "../../AppStateContext";

function LogHistory() {
  const { logHistory, setLogHistory } = useAppState();

  useEffect(() => {
    setLogHistory([
      {
        amount: 10,
        category: "Expense",
        timestamp: "2024-02-19",
        recurring: false,
        description: "Groceries",
      },
      {
        amount: 50,
        category: "Income",
        timestamp: "2024-02-20",
        recurring: true,
        description: "Part-time job",
      },
      {
        amount: 50,
        category: "Income",
        timestamp: "2024-02-20",
        recurring: true,
        description:
          "Part-time job aalu aalu aalu aalu aalu aalu  aalu aalu aalu aalu aalu  aalu aalu aalu aalu aalu",
      },
      {
        amount: 50,
        category: "Income",
        timestamp: "2024-02-20",
        recurring: true,
        description: "Part-time job",
      },
      {
        amount: 50,
        category: "Income",
        timestamp: "2024-02-20",
        recurring: true,
        description: "Part-time job",
      },
      // Add more log entries as needed
    ]);
  }, []);

  function handleClick(event) {
    console.log("log history was clicked", event);
  }

  return (
    <div className="log-history" onClick={handleClick} >
      {/* Use map function to render Log component for each log entry */}
      {logHistory &&
        logHistory.map((log, index) => (
          <div key={index} style={{ width: "100%" }}>
            <Log
              amount={log.amount}
              category={log.category}
              timestamp={log.timestamp}
              recurring={log.recurring}
              description={log.description}
              key={index}
            />
          </div>
        ))}
    </div>
  );
}

export default LogHistory;
