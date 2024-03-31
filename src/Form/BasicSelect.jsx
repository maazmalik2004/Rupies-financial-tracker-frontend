import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect({ selectedValue, onValueChange }) {
  const handleChange = (event) => {
    const newValue = event.target.value;
    onValueChange(newValue);
  };

  return (
    <Box sx={{ minWidth: 300 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Term</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedValue}
          label="Term"
          onChange={handleChange}
        >
          <MenuItem value="monthly">Monthly</MenuItem>
          <MenuItem value="quarterly">Quarterly</MenuItem>
          <MenuItem value="halfYearly">Half Yearly</MenuItem>
          <MenuItem value="annually">Annually</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
