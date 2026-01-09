import * as React from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";

export default function HighlightCalendar({ highlightedDates }) {

  const renderDay = (day, _value, DayComponentProps) => {
    const isHighlighted = highlightedDates.some(
      date => day.isSame(dayjs(date), "day")
    );

    return (
      <PickersDay
        {...DayComponentProps}
        sx={{
          backgroundColor: isHighlighted ? "#0d6efd" : "inherit",
          color: isHighlighted ? "#fff" : "inherit",
          "&:hover": {
            backgroundColor: isHighlighted ? "#0b5ed7" : ""
          }
        }}
      />
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        defaultValue={dayjs()}
        slots={{ day: renderDay }}
      />
    </LocalizationProvider>
  );
}
