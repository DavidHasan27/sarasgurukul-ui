import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const DatePickerComponent = ({
  startDate,
  maxDate,
  minDate,
  onDateChange,
  className,
  placeholder,
  disabled,
  calendarClassName,
  scrollableYearDropdown = true,
  yearDropdownItemNumber = 100,
}: any) => {
  const calendarCls = ["sg-react-datepicker-calendar", calendarClassName]
    .filter(Boolean)
    .join(" ");

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: any) => onDateChange(date)}
      className={
        className ? className : "bg-[#e5e7eb] h-[45px] w-[100%] pl-2 rounded-sm"
      }
      dateFormat="dd/MM/YYYY"
      maxDate={maxDate}
      minDate={minDate}
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
      scrollableYearDropdown={scrollableYearDropdown}
      yearDropdownItemNumber={yearDropdownItemNumber}
      calendarClassName={calendarCls}
      popperClassName="sg-react-datepicker-popper"
      placeholderText={placeholder}
      disabled={disabled}
    />
  );
};
export default DatePickerComponent;
