import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close"; // Importing the Close icon

export default function FloatingActionButtons({ icon = <AddIcon /> }) {
  return (
    <Box sx={{ "& > :not(style)": { m: 1 } }}>
      <Fab
        aria-label="action-button"
        sx={{
          backgroundColor: "#28BDB3", // Default background color
          color: "white", // Default text color
          "&:hover": {
            backgroundColor: "white", // Background color on hover
            color: "#28BDB3", // Text color on hover
          },
        }}
      >
        {icon} {/* Displaying the passed icon */}
      </Fab>
    </Box>
  );
}
