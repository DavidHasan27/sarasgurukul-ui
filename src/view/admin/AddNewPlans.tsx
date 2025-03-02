import ParentLayout from "../../component/app-component/Parent";
import { useDropzone } from "react-dropzone";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faArrowLeft,
  faBackward,
  faCalendarDay,
  faFaceGrinHearts,
  faSchool,
  faUserPlus,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { getOptionYearLabel, isEmailValid, isMobileValid } from "../../utils";

import Select from "react-select";

import { getSchoolsForSelection } from "../../redux/schools/schoolSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { BLOODGROUP, RELATIONSHIP } from "../../utils/constants";
import DatePicker from "../../component/app-component/DatePicker";
import { getClassListBySchoolForDropdown } from "../../redux/class/classSlice";
import OutsideClickHandler from "react-outside-click-handler";

import {
  createNewHoliday,
  createNewPlannes,
  getSchoolYear,
  resetNewHoliday,
} from "../../redux/admin/adminSlice";
import { clone, find } from "lodash";
import moment from "moment";

const AddNewPlans = () => {
  const [school, setSchool] = useState<any>([]);
  const [classL, setClass] = useState<any>([]);
  const [title, setTitle] = useState<any>();
  const [titleError, setTitleError] = useState<any>("");

  const [holidaysDate, setHolidaysDate] = useState<any>("");
  const [holidaysDateError, setHolidaysDateError] = useState<any>("");

  const [description, setDescription] = useState("");
  const [file, setFile] = useState<any>();

  const [schoolMenu, setSchoolMenu] = useState<any>();
  const [classMenu, setClassMenu] = useState<any>();
  const [YearMenu, setYearMenu] = useState<any>();
  const [selectedYear, setSelectedYear] = useState<any>();
  const [yearError, setYearError] = useState<any>("");
  const dispatch = useAppDispatch();
  const [yearStartDate, setYearStartDate] = useState<any>("");
  const [yearEndDate, setYearEndDate] = useState<any>("");

  const { optionSchoolList } = useAppSelector((state: any) => state.school);
  const { yearList, newPlans, loading, error } = useAppSelector(
    (state: any) => state.admin
  );

  const { optionClassList } = useAppSelector((state: any) => state.class);

  useEffect(() => {
    if (yearList && yearList.length > 0) {
      const year = find(yearList, (item: any) => item.active);
      setSelectedYear(year);

      let yearStartDate = new Date(year.startYear + "-04-01");
      let yearEndDate = new Date(year.endYear + "-03-31");

      console.log(
        "yearStartDate :",
        yearStartDate,
        "yearEndDate : ",
        yearEndDate
      );
      setYearStartDate(yearStartDate);
      setYearEndDate(yearEndDate);
    }
  }, [yearList]);

  useEffect(() => {
    dispatch(getSchoolsForSelection());
    dispatch(getSchoolYear());
  }, []);

  const formatBytes = (bytes: any, decimals: any = 2) => {
    if (!+bytes) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = [
      "Bytes",
      "KiB",
      "MiB",
      "GiB",
      "TiB",
      "PiB",
      "EiB",
      "ZiB",
      "YiB",
    ];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  };

  const onDrop = useCallback((acceptedFiles: any) => {
    // Do something with the files
    var totalSizeMB = acceptedFiles[0].size / Math.pow(1024, 2);
    if (totalSizeMB > 1) {
      alert("Maximum size for file is 1MB");
    } else {
      setFile(acceptedFiles[0]);
    }
  }, []);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
      "image/heic": [],
      "image/jfif": [],
    },
    multiple: false,
  });

  const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    height: 60,
    transition: "border .24s ease-in-out",
  };

  const focusedStyle = {
    borderColor: "#2196f3",
  };

  const acceptStyle = {
    borderColor: "#00e676",
  };

  const rejectStyle = {
    borderColor: "#ff1744",
  };

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  useEffect(() => {
    if (newPlans) {
      // navigate("/app/dash", { replace: true });
      resetAllData();
    }
  }, [newPlans]);

  const resetAllData = () => {
    setSchool([]);
    setHolidaysDate(null);
    setDescription("");
    setTitle("");
    setFile("");
    setClass([]);
  };

  const onSubmitSchool = () => {
    let isError = false;

    if (!selectedYear) {
      setSelectedYear("Please select school year");
      isError = true;
    }

    if (!title || !title.trim()) {
      setTitleError("Please enter title");
      isError = true;
    }

    if (!holidaysDate) {
      setHolidaysDateError("Please select date");
      isError = true;
    }

    if (isError) {
      return;
    }

    const classList = [];
    const schoolsList = [];

    for (let i = 0; i < school.length; i++) {
      schoolsList.push(school[i].id);
    }

    for (let i = 0; i < classL.length; i++) {
      classList.push(classL[i].id);
    }

    const fileObj = {
      type: "planner",
      bucket: "saras-holiday",
      subtype: title.replaceAll(/\s/g, ""),
      file: file,
    };

    const plannerBody = [
      {
        title: title,
        description: description,
        date: holidaysDate,
        years: {
          id: selectedYear.id,
        },
        schoolId: schoolsList,
        classId: classList,
        active: true,
        fileObj: file ? fileObj : null,
      },
    ];
    dispatch(createNewPlannes(plannerBody));
  };

  const formatOptionLabel = ({ value, label }: any) => {
    return (
      <div
        className="flex flex-col text-left px-3 border-b-[1px] border-gray-400 "
        onClick={() => {
          console.log("event :::2", value);

          const tempSchools = clone(school);
          const obj = find(tempSchools, (obj: any) => obj.id === value.id);
          if (!obj) {
            tempSchools.push(value);
            setSchool(tempSchools);
            getClassList(tempSchools);
          }
          setSchoolMenu(false);
        }}
      >
        <div className="text-blue-gray-900 text-[16px]"> {label}</div>
        <div className="text-gray-500 text-[12px] -mt-[12px]">
          Branch: {value.branch}
        </div>
      </div>
    );
  };

  const getClassList = (scools: any) => {
    const idList = [];
    for (let i = 0; i < scools.length; i++) {
      idList.push(scools[i].id);
    }
    dispatch(getClassListBySchoolForDropdown(idList));
  };

  const formatOptionLabelForYear = ({ value, label }: any) => {
    return (
      <div
        className="flex flex-col text-left  border-b-[1px] border-gray-400 "
        onClick={() => {
          setSelectedYear(value);
          setYearMenu(false);
        }}
      >
        <div
          className={`text-blue-gray-900 text-[16px] ${
            value.active ? "bg-blue-gray-100" : ""
          }  px-3`}
        >
          {" "}
          {label}
        </div>
        {/* <div className="text-gray-500 text-[12px] -mt-[12px]">
          Branch: {value.branch}
        </div> */}
      </div>
    );
  };

  const formatOptionLabelClass = ({ value, label }: any) => {
    return (
      <div
        className="flex flex-col text-left px-3 border-b-[1px] border-gray-400 "
        onClick={() => {
          const tempClass = clone(classL);
          const obj = find(tempClass, (obj: any) => obj.id === value.id);
          if (!obj) {
            tempClass.push(value);
            setClass(tempClass);
          }
          setClassMenu(false);
        }}
      >
        <div className="text-blue-gray-900 text-[16px]"> {label}</div>
        <div className="text-gray-500 text-[12px] my-[1px] leading-none pb-2">
          School: {value.schools.schoolName + ", " + value.schools.branch}
        </div>
      </div>
    );
  };

  return (
    <ParentLayout
      loading={loading}
      error={error}
      success={newPlans ? "New Plan created successfully" : ""}
      onCloseSuccessAlert={() => dispatch(resetNewHoliday())}
      onCloseAlert={() => dispatch(resetNewHoliday())}
    >
      <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
        <main className="w-full flex-grow p-6">
          <div className="flex flex-row w-full justify-between">
            <div className="flex flex-row w-24 ">
              <a
                className="text-gray-800 hover:text-blue-600 hover:font-semibold"
                href="/app/planner"
              >
                <FontAwesomeIcon
                  icon={faAngleLeft}
                  className="mr-2 fa-1x p-0"
                />
                Planner
              </a>
            </div>
            <span>
              <FontAwesomeIcon
                icon={faCalendarDay}
                className="mr-2 fa-4x p-0"
              />
              <h1 className="w-full text-3xl text-black ">Add New Plans</h1>
            </span>
            <div className="flex flex-row  w-24"></div>
          </div>

          <div className="flex justify-center items-center ">
            <div className="w-full lg:w-1/2 my-1 pr-0 lg:pr-2 mt-2 ">
              <p className="text-xl flex items-center">
                <i className="fas fa-list mr-3"></i> Plan Info
              </p>
              <div className="leading-loose">
                <form className="p-10 bg-white rounded shadow-xl min-h-[470px]">
                  <div className="">
                    <div className="inline-block mt-2 w-full pr-1">
                      <label className="block text-sm text-gray-600 text-left mb-0">
                        Select School Year
                      </label>
                      <OutsideClickHandler
                        onOutsideClick={() => {
                          setYearMenu(false);
                        }}
                      >
                        <Select
                          name="schoolsYear"
                          placeholder="Select Year"
                          options={yearList}
                          getOptionLabel={(option: any) =>
                            getOptionYearLabel(option)
                          }
                          getOptionValue={(option) => option}
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              backgroundColor: "#e5e7eb",
                              borderColor: state.isFocused
                                ? "#0f58bf"
                                : "#e1e4e8",
                              textAlign: "left",
                            }),
                            option: (baseStyles, state) => ({
                              ...baseStyles,
                              textAlign: "left",
                            }),
                            multiValue: (styles, { data }) => {
                              return {
                                ...styles,
                                backgroundColor: "white",
                                borderWidth: "1px",
                                borderColor: "black",
                                borderStyle: "#c4cad2",
                              };
                            },
                          }}
                          classNamePrefix="Select Schools"
                          onChange={(event: any) => {
                            setSelectedYear(event);
                          }}
                          value={selectedYear}
                          components={{ Option: formatOptionLabelForYear }}
                          menuIsOpen={YearMenu}
                          onMenuOpen={() => setYearMenu(true)}
                          closeMenuOnScroll={true}
                        />
                      </OutsideClickHandler>
                      <label className="block text-sm text-left text-red-600 h-4">
                        {yearError ? yearError : ""}
                      </label>
                    </div>

                    <div className="inline-block mt-2 w-full pr-1">
                      <label className="block text-sm text-gray-600 text-left mb-0">
                        Schools
                      </label>
                      <OutsideClickHandler
                        onOutsideClick={() => {
                          setSchoolMenu(false);
                        }}
                      >
                        <Select
                          name="schools"
                          placeholder="Select Schools"
                          options={optionSchoolList}
                          getOptionLabel={(option: any) => option.schoolName}
                          getOptionValue={(option) => option}
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              backgroundColor: "#e5e7eb",
                              borderColor: state.isFocused
                                ? "#0f58bf"
                                : "#e1e4e8",
                              textAlign: "left",
                            }),
                            option: (baseStyles, state) => ({
                              ...baseStyles,
                              textAlign: "left",
                            }),
                            multiValue: (styles, { data }) => {
                              return {
                                ...styles,
                                backgroundColor: "white",
                                borderWidth: "1px",
                                borderColor: "black",
                                borderStyle: "#c4cad2",
                              };
                            },
                          }}
                          classNamePrefix="Select Schools"
                          onChange={(event: any) => {
                            console.log("event :::1", event);
                            setSchool(event);
                            getClassList(event);
                            setClass([]);
                          }}
                          value={school}
                          components={{ Option: formatOptionLabel }}
                          menuIsOpen={schoolMenu}
                          onMenuOpen={() => setSchoolMenu(true)}
                          closeMenuOnScroll={true}
                          isMulti
                        />
                      </OutsideClickHandler>
                    </div>

                    <div className="inline-block mt-2 w-full pr-1">
                      <label className="block text-sm text-gray-600 text-left mb-0">
                        Class
                      </label>
                      <OutsideClickHandler
                        onOutsideClick={() => {
                          setClassMenu(false);
                        }}
                      >
                        <Select
                          name="class"
                          placeholder="Select Class"
                          options={optionClassList}
                          getOptionLabel={(option: any) =>
                            option.className + "(" + option.classIdentity + ")"
                          }
                          getOptionValue={(option) => option}
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              backgroundColor: "#e5e7eb",
                              borderColor: state.isFocused
                                ? "#0f58bf"
                                : "#e1e4e8",
                              textAlign: "left",
                            }),
                            option: (baseStyles, state) => ({
                              ...baseStyles,
                              textAlign: "left",
                            }),
                            multiValue: (styles, { data }) => {
                              return {
                                ...styles,
                                backgroundColor: "white",
                                borderWidth: "1px",
                                borderColor: "black",
                                borderStyle: "#c4cad2",
                              };
                            },
                          }}
                          classNamePrefix="Select Schools"
                          onChange={(event: any) => {
                            console.log("event :::1", event);
                            setClass(event);
                          }}
                          value={classL}
                          components={{ Option: formatOptionLabelClass }}
                          menuIsOpen={classMenu}
                          onMenuOpen={() => setClassMenu(true)}
                          closeMenuOnScroll={true}
                          isMulti
                          isDisabled={!school || school.length == 0}
                        />
                      </OutsideClickHandler>
                    </div>
                    <div className="inline-block mt-2 w-1/2 pr-1">
                      <label className="block text-sm text-gray-600 text-left">
                        Title
                      </label>
                      <div className="flex flex-col">
                        <input
                          className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded"
                          id="title"
                          name="title"
                          required
                          placeholder="Plans Title"
                          aria-label="title"
                          value={title}
                          onChange={(event) => {
                            setTitle(event.target.value);
                            setTitleError("");
                          }}
                          disabled={!school || !selectedYear}
                        />
                        <div className="block text-[12px] mt-[-5px] mb-2 text-left text-red-600 h-4">
                          {titleError && titleError}
                        </div>
                      </div>
                    </div>

                    <div className="inline-block  w-1/2 pr-1">
                      <label className="block text-sm text-gray-600 text-left">
                        Plan Date
                      </label>
                      <div className="flex flex-col">
                        <DatePicker
                          startDate={holidaysDate}
                          minDate={yearStartDate}
                          maxDate={yearEndDate}
                          onDateChange={(date: any) => {
                            setHolidaysDate(date);
                            setHolidaysDateError("");
                          }}
                          disabled={!school || !selectedYear}
                          placeholder={"Plans Date"}
                        />
                        <div className="block text-[12px] mt-[-5px] mb-2 text-left text-red-600 h-4">
                          {holidaysDateError && holidaysDateError}
                        </div>
                      </div>
                    </div>

                    <div className="mt-1">
                      <label className="block text-sm text-gray-600 text-left">
                        Description
                      </label>
                      <textarea
                        className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded"
                        id="description"
                        name="description"
                        rows={3}
                        required
                        placeholder="Description"
                        aria-label="description"
                        value={description}
                        onChange={(event) => {
                          setDescription(event.target.value);
                        }}
                        disabled={!school || !selectedYear}
                      ></textarea>
                    </div>
                  </div>

                  <div className="inline-block w-1/4 mt-4">
                    <label className="block text-sm text-gray-600 text-left">
                      Plan Photo(Optional)
                    </label>
                    <div
                      {...getRootProps(style)}
                      className={`bg-[#e5e7eb] flex flex-col items-center border-2 rounded-sm border-[#9c9c9c] border-dashed text-[#B5B5B5] hover:border-[#8f8f8f] ${
                        file ? "" : "p-5"
                      }`}
                    >
                      <input {...getInputProps()} />
                      {!file ? (
                        <>
                          {isDragActive ? (
                            <p>Drop the files here ...</p>
                          ) : (
                            <p>Click to select files</p>
                          )}
                        </>
                      ) : (
                        <div className="relative p-2">
                          <FontAwesomeIcon
                            icon={faXmarkCircle}
                            className="p-0 h-[20px] text-right absolute right-1 top-1"
                            color="#fff"
                            onClick={() => setFile(undefined)}
                          />
                          <img
                            src={URL.createObjectURL(file)}
                            //   height={200}
                            width={200}
                            alt="img"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-row-reverse items-end w-full mt-[10px]">
                    <Button
                      variant="gradient"
                      color="blue"
                      placeholder={"Submit"}
                      onClick={() => onSubmitSchool()}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      <FontAwesomeIcon
                        icon={faCalendarDay}
                        className="mr-2 fa-1x p-0"
                      />
                      Add New Plans
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Parent Info */}
        </main>
      </div>
    </ParentLayout>
  );
};

export default AddNewPlans;
