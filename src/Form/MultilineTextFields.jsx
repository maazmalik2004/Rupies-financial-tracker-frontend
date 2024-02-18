import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function MultilineTextFields({ onDescriptionChange }) {
  const [description, setDescription] = React.useState("");

  const handleDescriptionChange = (event) => {
    const newValue = event.target.value;
    setDescription(newValue);

    // Notify the parent component about the change
    if (onDescriptionChange) {
      onDescriptionChange(newValue);
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
          id="outlined-multiline-flexible"
          label="Description"
          multiline
          maxRows={4}
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>
    </Box>
  );
}
