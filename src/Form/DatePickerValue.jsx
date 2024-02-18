import React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function ControlledDatePicker({ onEndDateChange }) {
  const currentDate = dayjs(); // Get the current date
  const [endDate, setEndDate] = React.useState(
    currentDate.format("YYYY-MM-DD")
  );

  const handleEndDateChange = (newDate) => {
    setEndDate(newDate.format("YYYY-MM-DD"));
    onEndDateChange(newDate.format("YYYY-MM-DD"));
  };

  React.useEffect(() => {
    onEndDateChange(currentDate.format("YYYY-MM-DD"));
  }, [endDate]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker", "DatePicker"]}>
        <DatePicker
          label="End date"
          value={dayjs(endDate)}
          onChange={handleEndDateChange}
          shouldDisableDate={(day) => dayjs(day) < currentDate}
          disablePast
          sx={{ width: 300 }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
