import "./loghistory.css";
import Log from "./Log";
import { useEffect } from "react";
import { useAppState } from "../../AppStateContext";

function LogHistory() {
  const { graphData } = useAppState();

  function handleClick(event) {
    console.log("log history was clicked", event);
  }

  return (
    <div className="log-history" onClick={handleClick} >
      {/* Use map function to render Log component for each log entry */}
      {graphData &&
        graphData.data.map((log, index) => (
          <div key={index} style={{ width: "100%" }}>
            <Log
              amount={log.amount}
              category={log.category}
              timestamp={log.date}
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
