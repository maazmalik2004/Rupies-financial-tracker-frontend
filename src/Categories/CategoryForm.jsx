// CategoryForm.js
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";

function CategoryForm({ onClose, onSubmit }) {
  const [categoryName, setCategoryName] = useState("");
  const [categoryType, setCategoryType] = useState("");
  const [categoryBudget, setCategoryBudget] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ categoryName, categoryType, categoryBudget });
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Category Type"
          value={categoryType}
          onChange={(e) => setCategoryType(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Category Budget"
          type="number"
          value={categoryBudget}
          onChange={(e) => setCategoryBudget(e.target.value)}
          margin="normal"
          required
        />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="outlined" startIcon={<CloseIcon />} onClick={onClose}>
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
