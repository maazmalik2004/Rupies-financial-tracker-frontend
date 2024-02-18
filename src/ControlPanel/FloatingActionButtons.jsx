import React, { useState } from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import NavigationIcon from "@mui/icons-material/Add";

export default function FloatingActionButtons({ onClick }) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    // Pass the click event to the parent component
    if (onClick) {
      onClick();
    }

    // Reset isClicked state after 1 second (adjust the time as needed)
    setTimeout(() => {
      setIsClicked(false);
    }, 1);
  };

  return (
    <Box sx={{ "& > :not(style)": { m: 0 }, marginY: 2 }}>
      <Fab
        variant="extended"
        onClick={handleClick}
        sx={{
          backgroundColor: isClicked ? "darkblue" : "blue",
          color: isClicked ? "white" : "black",
        }}
      >
        <NavigationIcon sx={{ mr: 1 }} />
        Log new
      </Fab>
    </Box>
  );
}
