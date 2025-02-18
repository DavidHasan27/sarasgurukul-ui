import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ParentLayout from "../../component/app-component/Parent";
import {
  faEye,
  faTrash,
  faPencil,
  faSchool,
  faFaceGrinHearts,
  faBriefcase,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useEffect, useState } from "react";
import {
  getSchoolList,
  activeDeactiveSchool,
  resetActivateDeactivateSchool,
  getSchoolsForSelection,
} from "../../redux/schools/schoolSlice";

import {
  getSchoolYear,
  getSchoolHolidays,
  activeDeactiveSchoolHoliday,
  getWorksheet,
  downloadFile,
  activeDeactiveWorksheet,
} from "../../redux/admin/adminSlice";

import Pagination from "../../component/app-component/Pagination";
import WarningDialog from "../../component/app-component/WarningDialog";
import OutsideClickHandler from "react-outside-click-handler";
import Select1 from "react-select";
import { clone, find } from "lodash";
import moment from "moment";
import { getClassListBySchoolForDropdown } from "../../redux/class/classSlice";
import { getUserDetails } from "../../utils";
import {
  ROLE_ADMIN,
  ROLE_PRINCIPAL,
  ROLE_TEACHER,
  SUPER_ADMIN_MENU_LIST,
} from "../../utils/constants";

const Worksheets = () => {
  const navigate = useNavigate();
  const user = getUserDetails();
  const dispatch = useAppDispatch();
  const { loading, error, success } = useAppSelector(
    (state: any) => state.school
  );

  const [pageIndex, setPageIndex] = useState(1);
  const [warningDialog, setWarningDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [searchString, setSearchString] = useState<any>("");

  const [YearMenu, setYearMenu] = useState<any>();
  const [selectedYear, setSelectedYear] = useState<any>();

  const [school, setSchools] = useState<any>();
  const [schoolMenu, setSchoolMenu] = useState<any>();

  const [classL, setClass] = useState<any>();
  const [classMenu, setClassMenu] = useState<any>();
  const { optionSchoolList } = useAppSelector((state: any) => state.school);
  const { yearList, worksheets } = useAppSelector((state: any) => state.admin);
  const { optionClassList } = useAppSelector((state: any) => state.class);

  // console.log("worksheets List ::", worksheets);

  useEffect(() => {
    dispatch(getSchoolsForSelection());
    dispatch(getSchoolYear());
  }, []);

  useEffect(() => {
    if (yearList && yearList.length > 0) {
      const year = find(yearList, (item: any) => item.active);
      setSelectedYear(year);
      getWorksheetData(undefined, year.id);
    }
  }, [yearList]);

  useEffect(() => {
    if (selectedYear) {
      getWorksheetData(
        classL ? classL.id : undefined,
        selectedYear.id,
        true,
        pageIndex,
        searchString
      );
    }
  }, [pageIndex]);

  const onActivateDeactivateSchool = () => {
    setWarningDialog(false);
    const body = {
      id: selectedItem.id,
      active: !selectedItem.active,
    };
    dispatch(activeDeactiveWorksheet(body));
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

  const getWorksheetData = (
    classId: any = undefined,
    yearId: any = undefined,
    active: any = true,
    page: any = 0,
    search: any = ""
  ) => {
    const body: any = {
      page: page,
      size: 1000,
      active: active,
    };

    body["yearId"] = yearId;

    if (classId) {
      body["classId"] = classId;
    }

    if (search && search.trim()) {
      body["search"] = search;
    }

    dispatch(getWorksheet(body));
  };

  const formatOptionLabel = ({ value, label }: any) => {
    return (
      <div
        className="flex flex-col text-left px-3 border-b-[1px] border-gray-400 "
        onClick={() => {
          if (!school || school.id !== value.id) {
            setSchools(value);
            getClassList(school);
            setPageIndex(1);
          }
          setSchoolMenu(false);
          setClass("");
        }}
      >
        <div className="text-blue-gray-900 text-[16px]"> {label}</div>
        <div className="text-gray-500 text-[12px] -mt-[5px]">
          Branch: {value.branch}
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
          getWorksheetData(school ? school.id : undefined, value.id, true);
          setPageIndex(1);
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
      </div>
    );
  };

  const formatOptionLabelClass = ({ value, label }: any) => {
    return (
      <div
        className="flex flex-col text-left px-3 border-b-[1px] border-gray-400 "
        onClick={() => {
          if (!classL || value.id != classL.id) {
            setClass(value);
            getWorksheetData(value.id, selectedYear.id, true, 0, searchString);
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

  const getClassName = (classList: any) => {
    let name = "";
    for (let i = 0; i < classList.length; i++) {
      if (name) {
        name =
          name +
          ", " +
          classList[i].className +
          " (" +
          classList[i].classIdentity +
          ")";
      } else {
        name = classList[i].className + " (" + classList[i].classIdentity + ")";
      }
    }
    return name;
  };

  const getImageURL = (item: any) => {
    if (item && item.imageURL) {
      const imageData = item.imageURL.split("|");
      return (
        "https://" +
        imageData[0] +
        ".s3.ap-south-1.amazonaws.com/" +
        imageData[1]
      );
    }
    return null;
  };

  const getClassList = (school: any) => {
    const body = [];
    if (school) {
      body.push(school.id);
    }
    dispatch(getClassListBySchoolForDropdown(body));
  };

  const getFiles = (files: any) => {
    const fileObj = [];
    for (let i = 0; i < files.length; i++) {
      const fileArray = files[i].split("|");
      // console.log("Array ", fileArray[2] ? fileArray[2] : fileArray[1]);
      const fileo = {
        name: fileArray[2] ? fileArray[2] : fileArray[1],
        bucket: fileArray[0],
        fileKey: fileArray[1],
      };
      fileObj.push(fileo);
    }
    return fileObj;
  };

  return (
    <ParentLayout
      loading={loading}
      error={error}
      success={success}
      onCloseSuccessAlert={() => dispatch(resetActivateDeactivateSchool())}
    >
      <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
        <main className="w-full flex-grow p-6">
          <h1 className="text-3xl text-black pb-6">Worksheets</h1>

          <div className="w-full mt-6">
            <div className="w-full flex flex-row justify-between items-center">
              <p className="text-xl pb-3 flex items-center">
                <i className="fas fa-list mr-3"></i> Worksheet List
              </p>
              <div className="flex flex-row  mb-2 ">
                <div className="relative flex w-full ">
                  <div className=" h-10 w-full  flex flex-row ">
                    <OutsideClickHandler
                      onOutsideClick={() => {
                        setYearMenu(false);
                      }}
                    >
                      <Select1
                        name="schoolsYear"
                        placeholder="Select Year"
                        options={yearList}
                        getOptionLabel={(option: any) => getOptionLabel(option)}
                        getOptionValue={(option) => option}
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            backgroundColor: "#e5e7eb",
                            borderColor: state.isFocused
                              ? "#0f58bf"
                              : "#e1e4e8",
                            textAlign: "left",
                            marginRight: 3,
                            paddingTop: 1,
                            paddingBottom: 1,
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

                    <OutsideClickHandler
                      onOutsideClick={() => {
                        setSchoolMenu(false);
                      }}
                    >
                      <Select1
                        name="role"
                        placeholder="Select School"
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
                            width: 250,
                            marginRight: 3,
                            paddingTop: 1,
                            paddingBottom: 1,
                          }),
                          option: (baseStyles, state) => ({
                            ...baseStyles,
                            textAlign: "left",
                          }),
                        }}
                        classNamePrefix="Select School"
                        onChange={(event) => {
                          if (!event) {
                            setPageIndex(1);
                            setSchools("");
                            setClass("");
                            getClassList(undefined);
                            getWorksheetData(undefined, selectedYear.id);
                            getWorksheetData(
                              classL ? classL.id : undefined,
                              selectedYear.id,
                              true,
                              pageIndex,
                              searchString
                            );
                          }
                        }}
                        value={school}
                        components={{ Option: formatOptionLabel }}
                        menuIsOpen={schoolMenu}
                        onMenuOpen={() => setSchoolMenu(true)}
                        closeMenuOnScroll={true}
                        isClearable
                      />
                    </OutsideClickHandler>

                    <OutsideClickHandler
                      onOutsideClick={() => {
                        setClassMenu(false);
                      }}
                    >
                      <Select1
                        name="role"
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
                            width: 250,
                            marginRight: 3,
                            // paddingTop: 1,
                            // paddingBottom: 1,
                          }),
                          option: (baseStyles, state) => ({
                            ...baseStyles,
                            textAlign: "left",
                          }),
                        }}
                        classNamePrefix="Select School"
                        onChange={(event) => {
                          if (!event) {
                            getWorksheetData(undefined, selectedYear.id);
                            setPageIndex(1);
                            setClass("");
                          }
                        }}
                        value={classL}
                        components={{ Option: formatOptionLabelClass }}
                        menuIsOpen={classMenu}
                        onMenuOpen={() => setClassMenu(true)}
                        closeMenuOnScroll={true}
                        isClearable
                      />
                    </OutsideClickHandler>

                    <div className="relative h-10 w-60 ">
                      <input
                        className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded"
                        id="search"
                        name="search"
                        type="search"
                        placeholder="Search by title"
                        aria-label="Phone2"
                        value={searchString}
                        onChange={(event) => {
                          const value = event.target.value;
                          setSearchString(value);
                          if (!value || !value.trim()) {
                            setPageIndex(1);
                            getWorksheetData(
                              classL ? classL.id : undefined,
                              selectedYear.id,
                              true,
                              0,
                              null
                            );
                          }
                        }}
                      />
                      {/* <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                      Seach by name, branch, phone email
                    </label> */}
                    </div>
                    <Button
                      className="flex items-center justify-center gap-3 ml-1"
                      placeholder={"Add New Worksheets"}
                      color="blue"
                      size="sm"
                      onClick={() => {
                        setPageIndex(1);
                        getWorksheetData(
                          classL ? classL.id : undefined,
                          selectedYear.id,
                          true,
                          0,
                          searchString
                        );
                      }}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      Search
                    </Button>
                  </div>
                </div>
                {user.role == ROLE_ADMIN ||
                  user.role == ROLE_TEACHER ||
                  user.role == SUPER_ADMIN_MENU_LIST ||
                  (user.role == ROLE_PRINCIPAL && (
                    <Button
                      className="flex items-center justify-center min-w-[200px] p-0 ml-2"
                      placeholder={"Add New Worksheets"}
                      color="blue"
                      size="sm"
                      onClick={() => navigate("/app/addWorksheets")}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
                      Add New Worksheets
                    </Button>
                  ))}
              </div>
            </div>
            {(!worksheets ||
              !worksheets.content ||
              worksheets.content.length === 0) &&
            !loading ? (
              <div>
                <FontAwesomeIcon
                  icon={faSchool}
                  size="6x"
                  className="text-gray-400 mt-[10%]"
                />

                <Typography
                  variant="h5"
                  className="text-gray-400 mt-10"
                  placeholder={""}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  No Worksheet Found
                </Typography>
              </div>
            ) : (
              <div className="bg-white overflow-auto">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-800 text-white">
                    {/* 1/7+1/5+1/8+1/8+1/5+1/7+1/9 */}
                    <tr>
                      <th className="w-1/7 text-left py-3 px-4 uppercase font-semibold text-sm">
                        Title
                      </th>
                      <th className="w-1/5 text-left py-3 px-4 uppercase font-semibold text-sm">
                        Description
                      </th>
                      <th className="w-1/8 text-left py-3 px-4 uppercase font-semibold text-sm">
                        Start Date
                      </th>

                      <th className="w-1/8 text-left py-3 px-4 uppercase font-semibold text-sm">
                        End Date
                      </th>
                      <th className="w-1/5 text-left py-3 px-4 uppercase font-semibold text-sm">
                        Class
                      </th>
                      <th className="w-1/7 text-left py-3 px-4 uppercase font-semibold text-sm">
                        files
                      </th>
                      <th className="w-1/9 text-left py-3 px-4 uppercase font-semibold text-sm">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {worksheets &&
                      worksheets.content.map((item: any, index: number) => {
                        const imgURL: any = getImageURL(item);
                        const fileList = getFiles(item.file);
                        return (
                          <tr
                            className={`${index % 2 != 0 ? "bg-gray-200" : ""}`}
                          >
                            <td
                              className={`w-1/7 text-left py-3 px-4 ${
                                !item.active ? "opacity-35" : "opacity-100"
                              }`}
                            >
                              <div className="flex flex-row items-center">
                                {item.title}
                              </div>
                            </td>
                            <td
                              className={`w-1/5 text-left py-3 px-4 ${
                                !item.active ? "opacity-35" : "opacity-100"
                              }`}
                            >
                              {item.description}
                            </td>
                            <td
                              className={`w-1/8 text-left py-3 px-4 ${
                                !item.active ? "opacity-35" : "opacity-100"
                              }`}
                            >
                              {moment(item.startDate).format("DD MMM YYYY")}
                            </td>
                            <td
                              className={`w-1/8 text-left py-3 px-4 ${
                                !item.active ? "opacity-35" : "opacity-100"
                              }`}
                            >
                              {moment(item.endDate).format("DD MMM YYYY")}
                            </td>

                            <td
                              className={`w-1/5 text-left py-3 px-4 ${
                                !item.active ? "opacity-35" : "opacity-100"
                              }`}
                            >
                              {getClassName(item.schoolClasses)}
                            </td>

                            <td
                              className={`w-1/7 text-left py-3 px-4 ${
                                !item.active ? "opacity-35" : "opacity-100"
                              }`}
                            >
                              {fileList && fileList.length > 0 ? (
                                <div className="flex flex-wrap flex-row">
                                  {fileList.map((obj: any, index: number) => {
                                    return (
                                      <div
                                        className="flex flex-row p-1 bg-blue-500 text-white mr-1 mt-1 rounded items-center px-2 hover:bg-blue-600 cursor-pointer"
                                        onClick={() => {
                                          downloadFile({
                                            bucketName: obj.bucket,
                                            fileName: obj.fileKey,
                                            name: obj.name,
                                          });
                                        }}
                                      >
                                        {obj.name}
                                        <FontAwesomeIcon
                                          icon={faDownload}
                                          className="ml-2"
                                        />
                                      </div>
                                    );
                                  })}
                                </div>
                              ) : null}
                            </td>

                            <td className="w-1/8 text-left py-3 px-4">
                              <Tooltip content="Active/Deactive School">
                                <IconButton
                                  placeholder={"View"}
                                  className="h-[30px] w-[30px] bg-blue-800 ml-2"
                                  onClick={() => {
                                    setSelectedItem(item);
                                    setWarningDialog(true);
                                  }}
                                  onPointerEnterCapture={undefined}
                                  onPointerLeaveCapture={undefined}
                                >
                                  <FontAwesomeIcon icon={faTrash} />
                                </IconButton>
                              </Tooltip>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            )}
            {!worksheets ||
            !worksheets.content ||
            worksheets.content.length == 0 ? (
              <></>
            ) : (
              <div className="mt-2 flex flex-row justify-end">
                <Pagination
                  count={worksheets.totalPages}
                  onPageChange={(pageIndex: number) => setPageIndex(pageIndex)}
                  pageIndex={pageIndex}
                />
              </div>
            )}
          </div>
        </main>
      </div>
      {selectedItem && selectedItem.title && (
        <WarningDialog
          open={warningDialog}
          onOkClick={() => onActivateDeactivateSchool()}
          onCloseDialog={() => setWarningDialog(false)}
          header={"Warning !"}
          message={
            selectedItem.active
              ? `Are you sure? you want to remove."
            ${selectedItem?.title}" worksheet`
              : `Are you sure? you want to activate."
            ${selectedItem?.schoolName}" School`
          }
          subMessage={
            selectedItem.active
              ? "Once you remove this worksheet, You wont get back it and it will delete all files related to worksheet"
              : "Once you activate the school , school will be available for all your activities"
          }
        />
      )}
    </ParentLayout>
  );
};
export default Worksheets;
