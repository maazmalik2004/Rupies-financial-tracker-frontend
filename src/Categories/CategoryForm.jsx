import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

function CategoryForm({ onClose, onSubmit }) {
  const [state, setState] = useState({
    name: "",
    budget: "",
    type: ""
  });

  const setCategoryState = (newState) => {
    setState(prevState => ({ ...prevState, ...newState }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Log the form values to the console
    console.log("Category Name:", state.name);
    console.log("Category Type:", state.type);
    console.log("Category Budget:", state.budget);
    // Call the onSubmit function passed as a prop with the form data
    onSubmit({ ...state });
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Category Name"
          value={state.name}
          onChange={(e) => setCategoryState({ name: e.target.value })}
          margin="normal"
          required
        />
        <FormControl fullWidth margin="normal" required>
          <InputLabel id="category-type-label">Category Type</InputLabel>
          <Select
            labelId="category-type-label"
            value={state.type}
            onChange={(e) => setCategoryState({ type: e.target.value })}
          >
            <MenuItem value="income">Income</MenuItem>
            <MenuItem value="expense">Expense</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Category Budget"
          type="number"
          value={state.budget}
          onChange={(e) => setCategoryState({ budget: e.target.value })}
          margin="normal"
          required
        />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="outlined"
            startIcon={<CloseIcon />}
            onClick={onClose}
          >
            Close
          </Button>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default CategoryForm;
