import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Close";

export default function FloatingActionButtons({ onClick }) {
  const handleClick = () => {
    // Call the parent callback function with a click message
    onClick("Button clicked!");
  };

  return (
    <Box sx={{ "& > :not(style)": { m: 0 } }}>
      <Fab
        aria-label="add"
        onClick={handleClick}
        sx={{
          backgroundColor: "#30D5C8", // Turquoise color
          "&:hover": {
            backgroundColor: "#28BDB3", // Darker shade of turquoise for hover effect
          },
          color: "white", // Inner content color set to white
        }}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}
