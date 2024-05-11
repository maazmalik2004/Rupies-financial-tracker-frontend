import React, { useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function CheckboxLabels({ onRecurringChange }) {
  const [isRecurring, setIsRecurring] = useState(false);

  const handleRecurringChange = (event) => {
    const newValue = event.target.checked;
    setIsRecurring(newValue);

    // Notify the parent component about the recurring state change
    if (onRecurringChange) {
      onRecurringChange(newValue);
    }
  };

  return (
    <FormGroup>
      <FormControlLabel style={{color:"black"}}
        control={
          <Checkbox checked={isRecurring} onChange={handleRecurringChange} />
        }
        label="Recurring ?"
      />
    </FormGroup>
  );
}
