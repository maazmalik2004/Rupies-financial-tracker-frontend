import "./loghistory.css";
import { useState } from "react";

function Log(prop) {
  const [isExpanded, setIsExpanded] = useState(false);

  function handleLogClick(event) {
    console.log("tab was clicked", event);
    setIsExpanded(!isExpanded);
  }

  return (
    <div className="log" onClick={handleLogClick}>
      {isExpanded && <div className="amount">₹ {prop.amount}</div>}
      {isExpanded && <div className="category">{prop.category}</div>}
      {isExpanded && <div className="timestamp">{prop.timestamp}</div>}
      {isExpanded && (
        <div className="recurring">{prop.recurring && "recurring"}</div>
      )}
      <div className="description">{prop.description}</div>
    </div>
  );
}

export default Log;
