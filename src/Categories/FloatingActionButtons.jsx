import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

export default function FloatingActionButtons() {
  return (
    <Box sx={{ "& > :not(style)": { m: 1 } }}>
      <Fab
        aria-label="add"
        sx={{
          backgroundColor: "#28BDB3", // Default background color
          color: "white", // Default text color
          "&:hover": {
            backgroundColor: "white", // Background color on hover
            color: "#28BDB3", // Text color on hover
          },
        }}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}
