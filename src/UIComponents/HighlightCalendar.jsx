import React, { useState } from "react";
import dayjs from "dayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";

export default function HighlightCalendar({ highlightedDates }) {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const renderDay = (props) => {
    const today = dayjs().startOf("day");
    const day = props.day.startOf("day");

    const isToday = day.isSame(today, "day");
    const isHighlighted = highlightedDates.some(date =>
      day.isSame(dayjs(date).startOf("day"), "day")
    );
    return (
      <PickersDay
        {...props}
        disableMargin
        sx={{
          backgroundColor: isHighlighted
            ? "#2cb8cd"   
            : isToday
            ? "#fff"   
            : undefined,
          color: isHighlighted
            ? "#fff"
            : isToday
            ? "#000"
            : undefined,
          borderRadius: "50%",
          "&.MuiPickersDay-today": {
            backgroundColor: isToday ? "#fff" : undefined,
            color: isToday ? "#000" : undefined
          }
        }}
      />
    );
  };

  return (
    <DateCalendar
      value={selectedDate} 
      onChange={(newDate) => setSelectedDate(newDate)}
      slots={{ day: renderDay }}
    />
  );
}
