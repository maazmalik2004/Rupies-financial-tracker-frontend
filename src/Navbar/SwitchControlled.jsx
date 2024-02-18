import React, { useState, useEffect } from "react";
import Switch from "@mui/joy/Switch";

export default function SwitchControlled(props) {
  const { isChecked, onSelect } = props;
  const [internalChecked, setInternalChecked] = useState(isChecked);

  useEffect(() => {
    setInternalChecked(isChecked);
  }, [isChecked]);

  function handleSwitchSelect(event) {
    const value = event.target.checked;
    setInternalChecked(value);
    onSelect(value);
  }

  return <Switch checked={internalChecked} onChange={handleSwitchSelect} />;
}
