import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const DatePickerComponent = ({
  startDate,
  maxDate,
  minDate,
  onDateChange,
}: any) => {
  //   const [startDate, setStartDate] = useState(new Date("1990-01-01"));

  //   const maxDate = new Date("2012-01-01");
  //   const minDate = new Date("1980-01-01");

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: any) => onDateChange(date)}
      className="bg-[#e5e7eb] h-[45px] w-[100%] pl-2 rounded-sm"
      dateFormat="dd/MM/YYYY"
      maxDate={maxDate}
      minDate={minDate}
      showMonthDropdown
      showYearDropdown
    />
  );
};
export default DatePickerComponent;