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
      <Fab color="primary" aria-label="add" onClick={handleClick}>
        <AddIcon />
      </Fab>
    </Box>
  );
}
