import * as React from "react";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";

export default function BasicAvatars(props) {
  function handleClick(event) {
    props.onClick(event);
  }
  const { name, image } = props;
  return (
    <div onClick={handleClick}>
      <Box sx={{ display: "flex", gap: "10"}}>
        <Avatar alt={name} src={image} />
      </Box>
    </div>
  );
}
