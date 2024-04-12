import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import NavigationIcon from "@mui/icons-material/Navigation";

export default function SubmitButton({ onClick }) {
  const handleButtonClick = (buttonLabel) => {
    // Trigger the callback function with the button label
    if (onClick) {
      onClick(buttonLabel);
    }
  };

  return (
    <Box sx={{ "& > :not(style)": { m: 1 } }}>
      <Fab
        variant="extended"
        onClick={() => handleButtonClick("submit")}
        sx={{
          backgroundColor: "#28BDB3", // Default background color
          color: "white", // Default text color
          "&:hover": {
            backgroundColor: "white", // Background color on hover
            color: "#28BDB3", // Text color on hover
          },
        }}
      >
        <NavigationIcon sx={{ mr: 1 }} />
        Submit
      </Fab>
    </Box>
  );
}
