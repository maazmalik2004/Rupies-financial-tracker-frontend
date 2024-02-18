import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function ControllableStates({
  selectedValue,
  onValueChange,
  options,
}) {
  const [inputValue, setInputValue] = React.useState("");

  return (
    <div>
      <Autocomplete
        value={selectedValue}
        onChange={(event, newValue) => {
          if (onValueChange) {
            onValueChange(newValue);
          }
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={options}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Category" />}
      />
    </div>
  );
}
