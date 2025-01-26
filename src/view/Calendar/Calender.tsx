/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/img-redundant-alt */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ParentLayout from "../../component/app-component/Parent";
import {
  faBirthdayCake,
  faCalendar,
  faEllipsisVertical,
  faFaceGrinHearts,
  faPhotoFilm,
  faTrailer,
} from "@fortawesome/free-solid-svg-icons";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useEffect, useMemo, useState } from "react";
import ImageViewer from "react-simple-image-viewer";

import { getSchoolsForSelection } from "../../redux/schools/schoolSlice";

import {
  getImageTags,
  getImages,
  updateImageActions,
  resetNewHoliday,
  getCalenderEvents,
} from "../../redux/admin/adminSlice";

import Pagination from "../../component/app-component/Pagination";
import WarningDialog from "../../component/app-component/WarningDialog";
import OutsideClickHandler from "react-outside-click-handler";

import { IMAGE_TAG } from "../../utils/constants";
import { clone } from "lodash";

import { Calendar as CalendarView, momentLocalizer } from "react-big-calendar";
import moment, { now } from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import styles from "./cal.scss";

const localizer = momentLocalizer(moment);

const events = [
  /* {
    id: 0,
    title: 'All Day Event very long title',
    allDay: true,
    start: new Date(2015, 3, 0),
    end: new Date(2015, 3, 1),
  }, */
  {
    id: 1,
    title: "Shivajayanti",
    allDay: true,
    start: new Date(2025, 0, 26),
    end: new Date(2025, 0, 26),
  },
  {
    id: 1,
    title: "Exam",
    start: new Date(2025, 0, 26),
    end: new Date(2025, 0, 26),
  },
  {
    id: 1,
    title: "test",
    start: new Date(2025, 0, 26),
    end: new Date(2025, 0, 26),
  },
  {
    id: 1,
    title: "test",
    start: new Date(2025, 0, 26),
    end: new Date(2025, 0, 26),
  },
  {
    id: 1,
    title: "test",
    start: new Date(2025, 0, 26),
    end: new Date(2025, 0, 26),
  },
];

const Calendar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { success, loading, error, calenderEvents, updateImageMessage } =
    useAppSelector((state: any) => state.admin);

  const [holidayDateList, setHolidaysDateList] = useState<any>([]);
  const [plannerDateList, setPlannerDateList] = useState<any>([]);
  const [eventList, setEventList] = useState<any>([]);

  const { views, ...otherProps } = useMemo(
    () => ({
      views: {
        month: true,
      },
    }),
    []
  );

  useEffect(() => {
    dispatch(getCalenderEvents());
  }, []);

  useEffect(() => {
    if (calenderEvents) {
      console.log("Calender Events ", calenderEvents);
      const holidayDateList = [];
      const plannerList = [];
      const event = [];
      for (let i = 0; i < calenderEvents.schoolHolidays.length; i++) {
        const date = new Date(calenderEvents.schoolHolidays[i].date);
        holidayDateList.push(date);
        const eventObj = {
          id: calenderEvents.schoolHolidays[i].id,
          title: calenderEvents.schoolHolidays[i].title,
          allDay: true,
          start: date,
          end: date,
          image: faFaceGrinHearts,
        };
        event.push(eventObj);
      }
      setHolidaysDateList(holidayDateList);

      for (let i = 0; i < calenderEvents.planner.length; i++) {
        const date = new Date(calenderEvents.planner[i].date);
        plannerList.push(date);
        const eventObj = {
          id: calenderEvents.planner[i].id,
          title: calenderEvents.planner[i].title,
          allDay: true,
          start: date,
          end: date,
          image: faCalendar,
        };
        event.push(eventObj);
      }
      setPlannerDateList(plannerList);
      setEventList(event);

      for (let i = 0; i < calenderEvents.student.length; i++) {
        const date = new Date(calenderEvents.student[i].birthDate);
        const eventObj = {
          id: calenderEvents.student[i].id,
          title:
            calenderEvents.student[i].firstName +
            " " +
            calenderEvents.student[i].lastName,
          allDay: true,
          start: date,
          end: date,
          image: faBirthdayCake,
        };
        event.push(eventObj);
      }
    }
  }, [calenderEvents]);

  const isHolidayDate = (value: Date) => {
    let dateFound = false;
    for (let i = 0; i < holidayDateList.length; i++) {
      if (
        holidayDateList[i].getFullYear() === value.getFullYear() &&
        holidayDateList[i].getMonth() === value.getMonth() &&
        holidayDateList[i].getDate() === value.getDate()
      ) {
        dateFound = true;
        break;
      }
    }

    return dateFound;
  };

  const isPlannerDate = (value: Date) => {
    let dateFound = false;
    for (let i = 0; i < plannerDateList.length; i++) {
      if (
        plannerDateList[i].getFullYear() === value.getFullYear() &&
        plannerDateList[i].getMonth() === value.getMonth() &&
        plannerDateList[i].getDate() === value.getDate()
      ) {
        dateFound = true;
        break;
      }
    }

    return dateFound;
  };

  const calendarStyle = (date: any, resorceId: any) => {
    let currentDate = `${new Date().getDate()} ${
      new Date().getMonth() + 1
    } ${new Date().getFullYear()}`;
    let allDate = `${date.getDate()} ${
      date.getMonth() + 1
    } ${date.getFullYear()}`;

    if (allDate === currentDate)
      return {
        style: {
          backgroundColor: "#88C9E8",
          border: "1px solid gray",
          margin: 0,
          padding: 0,
        },
      };
  };

  const eventWrapper = ({ value }: any) => {
    return (
      <div>
        <IconButton
          // onClick={() => schedulePost(value)}
          // className={classes.positon}
          placeholder={undefined}
        >
          <FontAwesomeIcon fontSize="small" icon={faPhotoFilm} />
        </IconButton>
      </div>
    );
  };

  const customDayPropGetter = (date: any) => {
    const isHoliday = isHolidayDate(date);
    const isPlannner = isPlannerDate(date);
    if (isHoliday || isPlannner) {
      return {
        className: `${isHoliday ? "bg-[#FF7081]" : "bg-[#ffa347]"}`,
        style: {
          // border: "solid 3px " + (date.getDate() === 7 ? "#faa" : "#afa"),
          // color: "text-white",
        },
      };
    } else return {};
  };

  const customSlotPropGetter = (date: any) => {
    console.log("Date ::", date);
    if (date.getDate() === 7 || date.getDate() === 15)
      return {
        // className: styles.specialDay,
        style: {
          border: "solid 3px " + (date.getDate() === 7 ? "#faa" : "#afa"),
        },
      };
    else return {};
  };

  function EventAgenda({ event }: any) {
    console.log("EVENTS ::", event);
    return (
      <span>
        <em style={{ color: "pink" }}>{event.title}</em>
        <p>{event.desc}</p>
      </span>
    );
  }

  const getImageURL = (urlString: any) => {
    const imageData = urlString.split("|");
    return (
      "https://" + imageData[0] + ".s3.ap-south-1.amazonaws.com/" + imageData[1]
    );
  };

  function Event({ event }: any) {
    console.log("EVENTS ::", event);
    return (
      <span className="flex flex-row items-center text-sm">
        <FontAwesomeIcon icon={event.image} className="mr-1" />
        <strong className="text-sm">{event.title}</strong>
      </span>
    );
  }

  const { components, defaultDate } = useMemo(
    () => ({
      components: {
        agenda: {
          event: EventAgenda,
        },
        event: Event,
      },
      defaultDate: new Date(),
    }),
    []
  );

  return (
    <ParentLayout
      loading={loading}
      error={error}
      success={success && updateImageMessage ? updateImageMessage : ""}
      onCloseSuccessAlert={() => dispatch(resetNewHoliday())}
      onCloseAlert={() => dispatch(resetNewHoliday())}
    >
      <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
        <main className="w-full flex-grow p-6 h-screen">
          <h1 className="text-3xl text-black pb-6 ">Schools Calendar</h1>
          <form className="p-10 bg-white rounded shadow-xl min-h-[470px] flex flex-row">
            <CalendarView
              localizer={localizer}
              // events={myEventsList}
              // components={components}
              startAccessor="start"
              endAccessor="end"
              style={{ height: "70vh", width: "60%" }}
              views={views}
              dayPropGetter={customDayPropGetter}
              events={eventList}
              popup
              components={{
                event: Event,
              }}
            />

            <div className="w-[40%] h-[10] p-4">
              <div className="flex flex-row items-center mt-4">
                <div className="h-[40px] w-[70px]  bg-[#FF7081] border-1 border-gray-600"></div>
                <label className="font-bold ml-2">School Holidays</label>
              </div>

              <div className="flex flex-row items-center mt-4">
                <div className="h-[40px] w-[70px]  bg-[#ffa347] border-1 border-gray-600"></div>
                <label className="font-bold ml-2">School Plans</label>
              </div>
            </div>
          </form>
        </main>
      </div>
    </ParentLayout>
  );
};
export default Calendar;
