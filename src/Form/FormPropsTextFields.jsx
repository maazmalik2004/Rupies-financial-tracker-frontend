import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

export default function FormPropsTextFields({ onAmountChange }) {
  const [amount, setAmount] = React.useState("");

  const handleAmountChange = (event) => {
    const newValue = event.target.value;
    setAmount(newValue);

    // Notify the parent component about the amount change
    if (onAmountChange) {
      onAmountChange(newValue);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 0, width: "300px" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-number"
          label="Amount"
          type="number"
          value={amount}
          onChange={handleAmountChange}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
          }}
        />
      </div>
    </Box>
  );
}
