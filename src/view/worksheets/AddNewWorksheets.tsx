import ParentLayout from "../../component/app-component/Parent";
import { useDropzone } from "react-dropzone";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Button, Chip } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faFaceGrinHearts,
  faSchool,
  faUserPlus,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { isEmailValid, isMobileValid } from "../../utils";

import Select from "react-select";

import { getSchoolsForSelection } from "../../redux/schools/schoolSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { BLOODGROUP, RELATIONSHIP } from "../../utils/constants";
import DatePicker from "../../component/app-component/DatePicker";
import {
  getClassList,
  getClassListBySchoolForDropdown,
} from "../../redux/class/classSlice";
import OutsideClickHandler from "react-outside-click-handler";
import {
  createNewStudent,
  resetNewStudent,
} from "../../redux/students/studentSlice";
import {
  createNewHoliday,
  createNewWorksheet,
  getSchoolYear,
  resetNewHoliday,
} from "../../redux/admin/adminSlice";
import { clone, find } from "lodash";
import moment from "moment";

const AddNewWorksheets = () => {
  const [school, setSchool] = useState<any>([]);
  const [schoolError, setSchoolError] = useState<any>("");

  const [title, setTitle] = useState<any>();
  const [titleError, setTitleError] = useState<any>("");

  const [startDate, setStartDate] = useState<any>("");
  const [startDateError, setStartDateError] = useState<any>("");

  const [endDate, setEndDate] = useState<any>("");
  const [endDateError, setEndDateError] = useState<any>("");

  const [description, setDescription] = useState("");
  const [file, setFile] = useState<any>([]);
  const [fileError, setFileError] = useState<any>([]);

  const [schoolMenu, setSchoolMenu] = useState<any>();
  const [YearMenu, setYearMenu] = useState<any>();
  const [selectedYear, setSelectedYear] = useState<any>();
  const [yearError, setYearError] = useState<any>("");

  const [classL, setClass] = useState<any>([]);
  const [classError, setClassError] = useState<any>("");
  const [classMenu, setClassMenu] = useState<any>();
  const dispatch = useAppDispatch();

  const { optionSchoolList } = useAppSelector((state: any) => state.school);
  const { yearList, loading, error, newWorksheet } = useAppSelector(
    (state: any) => state.admin
  );
  const { optionClassList } = useAppSelector((state: any) => state.class);

  console.log("optionClassList", optionClassList);

  useEffect(() => {
    if (yearList && yearList.length > 0) {
      const year = find(yearList, (item: any) => item.active);
      setSelectedYear(year);
    }
  }, [yearList]);

  useEffect(() => {
    dispatch(getSchoolsForSelection());
    dispatch(getSchoolYear());
  }, []);

  useEffect(() => {
    console.log("file >>>", file.length, file);
  }, [file]);

  // const onDrop = useCallback((acceptedFiles: any) => {
  //   console.log("File Length ::", file.length);
  //   const tempFileList = clone(file);
  //   for (let i = 0; i < acceptedFiles.length; i++) {
  //     var totalSizeMB = acceptedFiles[i].size / Math.pow(1024, 2);
  //     if (totalSizeMB > 1) {
  //       alert(acceptedFiles[i].name + " file size is more than 1MB");
  //       break;
  //     } else {
  //       const fileObj = tempFileList.find(
  //         (obj: any) =>
  //           obj.name === acceptedFiles[i].name &&
  //           obj.size === acceptedFiles[i].name
  //       );
  //       if (!fileObj) {
  //         tempFileList.push(acceptedFiles[i]);
  //       }
  //     }
  //     setFile(tempFileList);
  //   }
  //   // Do something with the files
  // }, []);

  const onDrop = (acceptedFiles: any) => {
    console.log("File Length ::", file.length, acceptedFiles);
    const tempFileList = clone(file);

    for (let i = 0; i < acceptedFiles.length; i++) {
      var totalSizeMB = acceptedFiles[i].size / Math.pow(1024, 2);
      if (totalSizeMB > 1) {
        alert(acceptedFiles[i].name + " file size is more than 1MB");
        break;
      } else {
        const fileObj = tempFileList.find(
          (obj: any) =>
            obj.name === acceptedFiles[i].name &&
            obj.size === acceptedFiles[i].size
        );
        if (!fileObj) {
          tempFileList.push(acceptedFiles[i]);
        }
      }
    }
    setFile(tempFileList);
    setFileError("");
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    multiple: true,
    maxFiles: 3,
    disabled: file.length == 3,
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
    if (newWorksheet) {
      // navigate("/app/dash", { replace: true });
      resetAllData();
    }
  }, [newWorksheet]);

  const resetAllData = () => {
    setSchoolError("");
    setSchool([]);
    setStartDate(null);
    setDescription("");
    setTitle("");
    setFile([]);
    setClass([]);
    setClassError("");
    setEndDate(null);
    setEndDateError("");
  };

  const getClassList = (schooList: any) => {
    const body = [];
    for (let i = 0; i < schooList.length; i++) {
      body.push(schooList[i].id);
    }
    dispatch(getClassListBySchoolForDropdown(body));
  };

  const onSubmitWorksheet = () => {
    let isError = false;

    if (!selectedYear) {
      setSelectedYear("Please select school year");
      isError = true;
    }

    if (!school || school.length == 0) {
      setSchoolError("Please select school");
      isError = true;
    }

    if (!classL || classL.length == 0) {
      setClassError("Please select class");
      isError = true;
    }

    if (!title || !title.trim()) {
      setTitleError("Please enter title");
      isError = true;
    }

    if (!startDate) {
      setStartDateError("Please select start date");
      isError = true;
    }

    if (!endDate) {
      setEndDateError("Please select end date");
      isError = true;
    }

    if (!file || file.length === 0) {
      setFileError("Please select atleast one worksheet file");
      isError = true;
    }

    if (isError) {
      return;
    }

    const classList = [];

    for (let i = 0; i < classL.length; i++) {
      const classObj = {
        id: classL[i].id,
      };
      classList.push(classObj);
    }
    const fileList = [];
    for (let i = 0; i < file.length; i++) {
      const fileObj = {
        type: "worksheet",
        bucket: "saras-worksheet",
        subtype: title.replaceAll(/\s/g, ""),
        file: file[i],
      };
      fileList.push(fileObj);
    }

    const body: any = {
      title: title,
      description: description,
      startDate: startDate,
      endDate: endDate,
      years: {
        id: selectedYear.id,
      },
      schoolClasses: classList,
      file: fileList,
    };

    console.log("Body >>>", body);

    dispatch(createNewWorksheet(body));
  };

  const formatOptionLabel = ({ value, label }: any) => {
    return (
      <div
        className="flex flex-col text-left px-3 border-b-[1px] border-gray-400 "
        onClick={() => {
          const tempSchools = clone(school);
          const obj = find(tempSchools, (obj: any) => obj.id === value.id);
          if (!obj) {
            tempSchools.push(value);
            getClassList(tempSchools);
            setSchool(tempSchools);
            setSchoolError("");
            setClass([]);
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
            setClassError("");
          }
          setClassMenu(false);
        }}
      >
        <div className="text-blue-gray-900 text-[16px]"> {label}</div>
        <div className="text-gray-500 text-[12px] -mt-[12px]">
          School: {value.schools.schoolName + ", " + value.schools.branch}
        </div>
      </div>
    );
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

  const getOptionLabel = (option: any) => {
    return (
      option.startMonth +
      " " +
      option.startYear +
      " - " +
      option.endMonth +
      " " +
      option.endYear
    );
  };

  return (
    <ParentLayout
      loading={loading}
      error={error}
      success={newWorksheet ? "New Worksheet created successfully" : ""}
      onCloseSuccessAlert={() => dispatch(resetNewHoliday())}
      onCloseAlert={() => dispatch(resetNewHoliday())}
    >
      <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
        <main className="w-full flex-grow p-6">
          <span>
            <FontAwesomeIcon icon={faBriefcase} className="mr-2 fa-4x p-0" />
            <h1 className="w-full text-3xl text-black ">Add New Worksheets</h1>
          </span>

          <div className="flex justify-center items-center ">
            <div className="w-full lg:w-1/2 my-1 pr-0 lg:pr-2 mt-2 ">
              <p className="text-xl flex items-center">
                <i className="fas fa-list mr-3"></i> Worksheet Info
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
                            getOptionLabel(option)
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
                            setClass(event);
                            if (event.length !== 0) {
                              setSchoolError("");
                            }
                          }}
                          value={school}
                          components={{ Option: formatOptionLabel }}
                          menuIsOpen={schoolMenu}
                          onMenuOpen={() => setSchoolMenu(true)}
                          closeMenuOnScroll={true}
                          isMulti
                        />
                      </OutsideClickHandler>
                      <label className="block text-sm text-left text-red-600 h-4">
                        {schoolError ? schoolError : ""}
                      </label>
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
                          classNamePrefix="Select Class"
                          onChange={(event: any) => {
                            console.log("event :::1", event);
                            setClass(event);
                            if (event.length !== 0) {
                              setClassError("");
                              setClass([]);
                            }
                          }}
                          value={classL}
                          components={{ Option: formatOptionLabelClass }}
                          menuIsOpen={classMenu}
                          onMenuOpen={() => setClassMenu(true)}
                          closeMenuOnScroll={true}
                          isMulti
                          isDisabled={school.length == 0}
                        />
                      </OutsideClickHandler>
                      <label className="block text-sm text-left text-red-600 h-4">
                        {classError ? classError : ""}
                      </label>
                    </div>

                    <div className="inline-block mt-2 w-full pr-1">
                      <label className="block text-sm text-gray-600 text-left">
                        Title
                      </label>
                      <div className="flex flex-col">
                        <input
                          className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded"
                          id="title"
                          name="title"
                          required
                          placeholder="Worksheet Title"
                          aria-label="title"
                          value={title}
                          onChange={(event) => {
                            setTitle(event.target.value);
                            setTitleError("");
                          }}
                          disabled={
                            school.length == 0 ||
                            !selectedYear ||
                            classL.length == 0
                          }
                        />
                        <div className="block text-[12px] mt-[-5px] mb-2 text-left text-red-600 h-4">
                          {titleError && titleError}
                        </div>
                      </div>
                    </div>

                    <div className="inline-block  w-1/2 pr-1">
                      <label className="block text-sm text-gray-600 text-left">
                        Start Date
                      </label>
                      <div className="flex flex-col">
                        <DatePicker
                          startDate={startDate}
                          minDate={new Date(moment().year() + "-01-01")}
                          onDateChange={(date: any) => {
                            setStartDate(date);
                            setStartDateError("");
                          }}
                          disabled={!school || !selectedYear}
                        />
                        <div className="block text-[12px] mt-[-5px] mb-2 text-left text-red-600 h-4">
                          {startDateError && startDateError}
                        </div>
                      </div>
                    </div>

                    <div className="inline-block  w-1/2 pr-1">
                      <label className="block text-sm text-gray-600 text-left">
                        End Date
                      </label>
                      <div className="flex flex-col">
                        <DatePicker
                          startDate={endDate}
                          minDate={new Date(moment().year() + "-01-01")}
                          onDateChange={(date: any) => {
                            setEndDate(date);
                            setEndDateError("");
                          }}
                          disabled={!school || !selectedYear}
                        />
                        <div className="block text-[12px] mt-[-5px] mb-2 text-left text-red-600 h-4">
                          {endDateError && endDateError}
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

                  <div className="inline-block w-full mt-4 ">
                    <label className="block text-sm text-gray-600 text-left">
                      Worksheet Files
                    </label>
                    <div
                      {...getRootProps(style)}
                      className={`bg-[#e5e7eb] flex flex-col items-center border-2 rounded-sm border-[#9c9c9c] border-dashed text-[#B5B5B5] hover:border-[#8f8f8f] p-3`}
                    >
                      <input {...getInputProps()} />
                      <>
                        {isDragActive ? (
                          <p>Drop the files here ...</p>
                        ) : (
                          <p>Drop the files here or Click to select files</p>
                        )}
                      </>
                    </div>
                    <div className="block text-[12px] mt-[-5px] mb-2 text-left text-red-600 h-4">
                      {fileError && fileError}
                    </div>
                    <div className="flex flex-wrap flex-row">
                      {file.map((obj: any, index: any) => {
                        return (
                          <>
                            <Chip
                              open={true}
                              value={obj.name}
                              onClose={() => {
                                const fileList = clone(file);
                                fileList.splice(index, 1);
                                setFile(fileList);
                              }}
                              className={`${
                                index != 0 ? "ml-0" : ""
                              } mt-2 mr-2`}
                              color="teal"
                            />
                          </>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex flex-row-reverse items-end w-full mt-[10px]">
                    <Button
                      variant="gradient"
                      color="blue"
                      placeholder={"Submit"}
                      onClick={() => onSubmitWorksheet()}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      <FontAwesomeIcon
                        icon={faBriefcase}
                        className="mr-2 fa-1x p-0"
                      />
                      Add New Worksheet
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

export default AddNewWorksheets;
