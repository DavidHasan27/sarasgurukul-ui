import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ParentLayout from "../../component/app-component/Parent";
import {
  faEye,
  faTrash,
  faSchool,
  faCalendarDay,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import "react-toggle/style.css";
import Toggle from "react-toggle";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import React, { useEffect, useRef, useState } from "react";
import Select1 from "react-select";
import Pagination from "../../component/app-component/Pagination";
import WarningDialog from "../../component/app-component/WarningDialog";
import { getSchoolsForSelection } from "../../redux/schools/schoolSlice";
import OutsideClickHandler from "react-outside-click-handler";
import moment from "moment";
import { useReactToPrint } from "react-to-print";
import {
  activeDeactiveClass,
  getClassList,
  getClassListBySchoolForDropdown,
  resetActivateDeactivateClass,
} from "../../redux/class/classSlice";
import { getOptionYearLabel, getUserDetails } from "../../utils";
import {
  activeDeactivePlanner,
  getPlans,
  getSchoolYear,
  resetNewHoliday,
} from "../../redux/admin/adminSlice";
import { find } from "lodash";
import logoImage from "../../view/assets/sidebar_image.png";
import {
  ROLE_ADMIN,
  ROLE_PRINCIPAL,
  ROLE_TEACHER,
  SUPER_ADMIN_MENU_LIST,
} from "../../utils/constants";

const Planner = () => {
  const ref = useRef(null);
  const reference = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = getUserDetails();
  const { optionSchoolList } = useAppSelector((state: any) => state.school);

  const { yearList, loading, success, error, planner, planDelete } =
    useAppSelector((state: any) => state.admin);

  const { optionClassList } = useAppSelector((state: any) => state.class);
  const [pageIndex, setPageIndex] = useState(1);
  const [warningDialog, setWarningDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [searchString, setSearchString] = useState<any>("");
  const [school, setSchools] = useState<any>();
  const [schoolMenu, setSchoolMenu] = useState<any>();
  const [active, setActive] = useState<boolean>(true);
  const [YearMenu, setYearMenu] = useState<any>();
  const [selectedYear, setSelectedYear] = useState<any>();

  const [classL, setClass] = useState<any>();
  const [classMenu, setClassMenu] = useState<any>();

  const handleOnAfterPrint = React.useCallback(() => {
    console.log("`onAfterPrint` called"); // tslint:disable-line no-console
  }, []);

  const printPlanner = useReactToPrint({
    contentRef: reference,
    onBeforePrint: () => {
      return new Promise((resolve) => {
        // console.log("In Before Printing :", resolve);
        resolve();
      });
    },
    onAfterPrint: handleOnAfterPrint,
  });

  useEffect(() => {
    dispatch(getSchoolsForSelection());
    dispatch(getSchoolYear());
    // getClassData();
  }, []);

  useEffect(() => {
    if (yearList && yearList.length > 0) {
      const year = find(yearList, (item: any) => item.active);
      setSelectedYear(year);

      getPlannerData(0, undefined, undefined, searchString, true, year.id);
    }
  }, [yearList]);

  // useEffect(() => {
  //   getPlannerData(undefined, pageIndex - 1, searchString, active);
  // }, [pageIndex]);

  const onActivateDeactivatePlanner = () => {
    setWarningDialog(false);
    const body = {
      id: selectedItem.id,
      active: !selectedItem.active,
    };
    dispatch(activeDeactivePlanner(body));
  };

  const formatOptionLabel = ({ value, label }: any) => {
    return (
      <div
        className="flex flex-col text-left px-3 border-b-[1px] border-gray-400 leading-5"
        onClick={() => {
          if (!school || school.id !== value.id) {
            setSchools(value);
            setPageIndex(1);
            setClass("");
            dispatch(getClassListBySchoolForDropdown([value.id]));
            getPlannerData(
              0,
              value.id,
              undefined,
              searchString,
              true,
              selectedYear.id
            );
          }
          setSchoolMenu(false);
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
          setPageIndex(1);
          getPlannerData(
            0,
            school ? school.id : undefined,
            classL ? classL.id : undefined,
            searchString,
            true,
            value.id
          );
        }}
      >
        <div
          className={`text-blue-gray-900 text-[16px] ${
            value.active ? "bg-blue-gray-100" : ""
          }  px-3 leading-5`}
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
          setClass(value);
          setClassMenu(false);
          getPlannerData(
            0,
            school ? school.id : undefined,
            value.id,
            searchString,
            true,
            selectedYear.id
          );
          setPageIndex(1);
        }}
      >
        <div className="text-blue-gray-900 text-[16px]"> {label}</div>
        <div className="text-gray-500 text-[12px] my-[1px] leading-none pb-2">
          School: {value.schools.schoolName + ", " + value.schools.branch}
        </div>
      </div>
    );
  };

  const getImageURL = (item: any) => {
    if (item && item.imageUrl) {
      const imageData = item.imageUrl.split("|");
      return (
        "https://" +
        imageData[0] +
        ".s3.ap-south-1.amazonaws.com/" +
        imageData[1]
      );
    }
    return null;
  };
  const getPlannerData = (
    page: any = 0,
    schoolId: any = undefined,
    classId: any = undefined,
    search: any = undefined,
    active: boolean = true,
    yearId: any = selectedYear.id
  ) => {
    const body: any = {
      page: page,
      size: 10,
      active: active,
      yearId: yearId,
    };

    if (schoolId) {
      body["schoolId"] = schoolId;
    }

    if (search) {
      body["search"] = search;
    }

    if (classId) {
      body["classId"] = classId;
    }

    dispatch(getPlans(body));
  };

  const preparePrintComponents = () => {
    if (planner && planner.content.length > 0) {
      // console.log("printInstallment >>>", printInstallment); style={{ display: "none" }}

      return (
        <div>
          <div className="w-full print-component" ref={reference}>
            <label className=" text-5xl text-gray-400 text-center font-extrabold  origin-center rotate-45 absolute opacity-10 top-10 mt-96">
              SARA'S GURUKUL PRI PRIMARY SCHOOL
            </label>

            <form className="p-4 bg-white rounded  min-h-[470px] w-full">
              <div>
                <div className="flex flex-row justify-center mb-3">
                  <img src={logoImage} className="h-[100px] text-center" />
                </div>
                <label className="block text-xl text-gray-900 text-center mb-0 font-extrabold mb-0 ">
                  SARA'S GURUKUL PRI PRIMARY SCHOOL
                </label>
                <label className="block text-1xl text-gray-800 text-center mt-2 font-extrabold mb-2 underline">
                  Planner List
                </label>
              </div>
              <table className="w-full border-collapse border-[2px] border-gray-900 print-component mt-2">
                <thead>
                  <tr className="h-[40px] border-b border-gray-900 bg-blue-gray-100">
                    <th className="pl-4 w-[30%] border-r border-gray-900 ">
                      <label className="block text-base text-gray-900 text-left font-extrabold ">
                        Planner Title
                      </label>
                    </th>
                    <th className="pl-4 w-[50%] border-r border-gray-900 ">
                      <label className="block text-base text-gray-900 text-left font-extrabold ">
                        About Planner
                      </label>
                    </th>
                    <th className="pl-4 w-[20%] ">
                      <label className="block text-base text-gray-900 text-center font-extrabold ">
                        Planner Date
                      </label>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {planner.content.map((obj: any, index: number) => {
                    return (
                      <tr className="min-h-[50px] border-b border-gray-900">
                        <td className="pl-4 py-2 w-[30%] border-r  border-gray-900">
                          <label className="block text-base text-gray-900 text-left font-normal ">
                            {obj.title}
                          </label>
                        </td>

                        <td className="pl-4 py-2 w-[50%] border-r  border-gray-900">
                          <label className="block text-base text-gray-900 text-left font-normal ">
                            {obj.description}
                          </label>
                        </td>

                        <td className="pl-4 py-2 w-[20%]">
                          <label className="block text-base text-gray-900 text-center font-normal ">
                            {moment(obj.date).format("DD MMM YYYY")}
                          </label>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className="mt-[70px] pr-10">
                <label className="block text-base text-gray-900 text-right font-semibold ">
                  Principal
                </label>
              </div>
            </form>
          </div>
        </div>
      );
    } else {
      return "";
    }
  };

  return (
    <ParentLayout
      loading={loading}
      error={error}
      success={planDelete}
      onCloseSuccessAlert={() => dispatch(resetNewHoliday())}
      onCloseAlert={() => dispatch(resetNewHoliday())}
    >
      <div
        className="w-full h-screen overflow-x-hidden border-t flex flex-col"
        ref={ref}
      >
        <main className="w-full flex-grow p-6">
          <h1 className="text-3xl text-black pb-6">School Planner</h1>

          <div className="w-full mt-6">
            <div className="w-full flex flex-row justify-between items-center">
              <p className="text-xl pb-3 flex items-center">
                <i className="fas fa-list mr-3"></i> List
              </p>
              <div className="flex flex-row  mb-2 ">
                <div className="relative flex w-full mr-2">
                  <OutsideClickHandler
                    onOutsideClick={() => {
                      setYearMenu(false);
                    }}
                  >
                    <Select1
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
                          borderColor: state.isFocused ? "#0f58bf" : "#e1e4e8",
                          textAlign: "left",
                          width: 200,
                          paddingTop: 1,
                          paddingBottom: 1,
                          marginRight: 5,
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
                          borderColor: state.isFocused ? "#0f58bf" : "#e1e4e8",
                          textAlign: "left",
                          width: 200,
                          marginRight: 5,
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
                        console.log("Schoo Group >>>>>", event);
                        if (!event) {
                          getPlannerData(
                            0,
                            undefined,
                            undefined,
                            searchString,
                            true,
                            selectedYear.id
                          );
                          setClass("");
                          setSchools(event);
                          setPageIndex(1);
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
                          borderColor: state.isFocused ? "#0f58bf" : "#e1e4e8",
                          textAlign: "left",
                          width: 200,
                          marginRight: 5,
                          paddingTop: 1,
                          paddingBottom: 1,
                        }),
                        option: (baseStyles, state) => ({
                          ...baseStyles,
                          textAlign: "left",
                        }),
                      }}
                      classNamePrefix="Select Class"
                      onChange={(event) => {
                        console.log("Schoo Group >>>>>", event);
                        if (!event) {
                          getPlannerData(
                            0,
                            school ? school.id : undefined,
                            undefined,
                            searchString,
                            true,
                            selectedYear.id
                          );
                          setPageIndex(1);
                        }
                        setClass(event);
                      }}
                      value={classL}
                      components={{ Option: formatOptionLabelClass }}
                      menuIsOpen={classMenu}
                      onMenuOpen={() => setClassMenu(true)}
                      closeMenuOnScroll={true}
                      isClearable
                    />
                  </OutsideClickHandler>
                  <div className="relative h-10 w-full min-w-[200px]">
                    <input
                      className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded"
                      id="search"
                      name="search"
                      type="search"
                      placeholder="Search By Title "
                      aria-label="title"
                      value={searchString}
                      onChange={(event) => {
                        const value = event.target.value;
                        setSearchString(value);
                        if (!value || !value.trim()) {
                          setPageIndex(1);
                          getPlannerData(
                            0,
                            school ? school.id : undefined,
                            classL ? classL.id : undefined,
                            "",
                            true,
                            selectedYear.id
                          );
                        }
                      }}
                    />
                    {/* <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                      Seach by name, branch, phone email
                    </label> */}
                  </div>
                </div>
                <Button
                  className="flex items-center justify-center gap-3 mr-2"
                  placeholder={"Search"}
                  color="blue"
                  size="sm"
                  onClick={() => {
                    getPlannerData(
                      0,
                      school ? school.id : undefined,
                      classL ? classL.id : undefined,
                      searchString,
                      true,
                      selectedYear.id
                    );
                    setPageIndex(1);
                  }}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Search
                </Button>
                {(user.role == ROLE_ADMIN ||
                  user.role == ROLE_TEACHER ||
                  user.role == SUPER_ADMIN_MENU_LIST ||
                  user.role == ROLE_PRINCIPAL) && (
                  <Button
                    className="flex items-center justify-center gap-3 min-w-[170px]"
                    placeholder={"Add New Plans"}
                    color="blue"
                    size="sm"
                    onClick={() => navigate("/app/addPlans")}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    <FontAwesomeIcon icon={faCalendarDay} />
                    Add New Plan
                  </Button>
                )}
              </div>
            </div>
            {(!planner || !planner.content || planner.content.length === 0) &&
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
                  No Plans Found
                </Typography>
              </div>
            ) : (
              <div className="bg-white overflow-auto">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">
                        Title
                      </th>
                      <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                        Description
                      </th>
                      <th className="w-1/5 text-left py-3 px-4 uppercase font-semibold text-sm">
                        Date
                      </th>
                      <th className="w-1/5 text-left py-3 px-4 uppercase font-semibold text-sm">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {planner &&
                      planner.content.map((item: any, index: number) => {
                        const imgURL: any = getImageURL(item);
                        return (
                          <tr
                            className={`${index % 2 != 0 ? "bg-gray-200" : ""}`}
                          >
                            <td
                              className={`w-1/4 text-left py-3 px-4 ${
                                !item.active ? "opacity-35" : "opacity-100"
                              }`}
                            >
                              <div className="flex flex-row items-center">
                                {imgURL && (
                                  <img
                                    src={imgURL}
                                    height={50}
                                    className="h-[40px] border-2 border-indigo-600 w-[80px] mr-2"
                                    alt={"img"}
                                  />
                                )}
                                {item.title}
                              </div>
                            </td>
                            <td
                              className={`w-1/3 text-left py-3 px-4 ${
                                !item.active ? "opacity-35" : "opacity-100"
                              }`}
                            >
                              {item.description}
                            </td>
                            <td
                              className={`w-1/5 text-left py-3 px-4 ${
                                !item.active ? "opacity-35" : "opacity-100"
                              }`}
                            >
                              {item.date}
                            </td>

                            <td className="w-1/5 text-left py-3 px-4">
                              <Tooltip content="Delete Plan">
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
                              {/* <Tooltip content="Edit Details">
                              <IconButton
                                placeholder={"View"}
                                className="h-[30px] w-[30px] bg-blue-800 ml-2"
                              >
                                <FontAwesomeIcon icon={faPencil} />
                              </IconButton>
                            </Tooltip> */}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            )}
            {!planner || !planner.content || planner.content.length == 0 ? (
              <></>
            ) : (
              <div className="mt-2 flex flex-row justify-end">
                <Pagination
                  count={planner.totalPages}
                  onPageChange={(pageIndex: number) => {
                    setPageIndex(pageIndex);
                    getPlannerData(
                      pageIndex - 1,
                      school ? school.id : undefined,
                      classL ? classL.id : undefined,
                      searchString,
                      true,
                      selectedYear.id
                    );
                  }}
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
          onOkClick={() => onActivateDeactivatePlanner()}
          onCloseDialog={() => setWarningDialog(false)}
          header={"Warning !"}
          message={
            selectedItem.active
              ? `Are you sure? you want to delete."
            ${selectedItem?.title}" Plan`
              : `Are you sure? you want to activate."
            ${selectedItem?.title}" Plane`
          }
          subMessage={
            selectedItem.active
              ? "Once you deactivate this Plan,  You wont back it."
              : "Once you activate the class , class will be available for all your activities"
          }
        />
      )}

      {preparePrintComponents()}
      <div className="absolute top-20 right-6">
        <Button
          placeholder={undefined}
          className="bg-blue-700 h-[30px] p-0 w-[40px] "
          onClick={() => {
            // console.log("Print Component ::::");
            printPlanner();
          }}
        >
          <FontAwesomeIcon icon={faPrint} />
        </Button>
      </div>
    </ParentLayout>
  );
};
export default Planner;
