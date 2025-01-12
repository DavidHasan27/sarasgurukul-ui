import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ParentLayout from "../../component/app-component/Parent";
import {
  faEye,
  faTrash,
  faPencil,
  faSchool,
  faFaceGrinHearts,
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
} from "../../redux/admin/adminSlice";

import Pagination from "../../component/app-component/Pagination";
import WarningDialog from "../../component/app-component/WarningDialog";
import OutsideClickHandler from "react-outside-click-handler";
import Select1 from "react-select";
import { find } from "lodash";
import moment from "moment";

const SchoolHolidays = () => {
  const navigate = useNavigate();
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
  const { optionSchoolList } = useAppSelector((state: any) => state.school);
  const { yearList, holiday } = useAppSelector((state: any) => state.admin);

  console.log("School List ::", holiday);

  useEffect(() => {
    dispatch(getSchoolsForSelection());
    dispatch(getSchoolYear());
  }, []);

  useEffect(() => {
    if (yearList && yearList.length > 0) {
      const year = find(yearList, (item: any) => item.active);
      setSelectedYear(year);
      getHolidayData(undefined, year.id);
    }
  }, [yearList]);

  useEffect(() => {
    // dispatch(
    //   getSchoolHolidays({
    //     pageIndex: pageIndex,
    //     yearId: selectedYear.id,
    //     schoolId: school ? school.id : null,
    //   })
    // );
  }, [pageIndex]);

  const onActivateDeactivateSchool = () => {
    setWarningDialog(false);
    const body = {
      id: selectedItem.id,
      active: !selectedItem.active,
    };
    dispatch(activeDeactiveSchoolHoliday(body));
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

  const getHolidayData = (
    schoolId: any = undefined,
    yearId: any = undefined,
    active: any = true,
    page: any = 0
  ) => {
    const body: any = {
      page: page,
      size: 1000,
      active: active,
    };

    if (yearId) {
      body["yearId"] = yearId;
    }

    if (schoolId) {
      body["schoolId"] = schoolId;
    }

    dispatch(getSchoolHolidays(body));
  };

  const formatOptionLabel = ({ value, label }: any) => {
    return (
      <div
        className="flex flex-col text-left px-3 border-b-[1px] border-gray-400 "
        onClick={() => {
          if (!school || school.id !== value.id) {
            setSchools(value);
            getHolidayData(value.id, selectedYear.id, true);
            setPageIndex(1);
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
          getHolidayData(school ? school.id : undefined, value.id, true);
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
        {/* <div className="text-gray-500 text-[12px] -mt-[12px]">
          Branch: {value.branch}
        </div> */}
      </div>
    );
  };

  const getSchoolName = (schoolList: any) => {
    let name = "";
    for (let i = 0; i < schoolList.length; i++) {
      if (name) {
        name =
          name + ", " + schoolList[i].schoolName + " " + schoolList[i].branch;
      } else {
        name = schoolList[i].schoolName + " " + schoolList[i].branch;
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

  return (
    <ParentLayout
      loading={loading}
      error={error}
      success={success}
      onCloseSuccessAlert={() => dispatch(resetActivateDeactivateSchool())}
    >
      <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
        <main className="w-full flex-grow p-6">
          <h1 className="text-3xl text-black pb-6">Schools Holidays</h1>

          <div className="w-full mt-6">
            <div className="w-full flex flex-row justify-between items-center">
              <p className="text-xl pb-3 flex items-center">
                <i className="fas fa-list mr-3"></i> Holiday List
              </p>
              <div className="flex flex-row  mb-2 ">
                <div className="relative flex w-full mr-2">
                  <div className=" h-10 w-full min-w-[370px] flex flex-row">
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
                            marginRight: 10,
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
                            getHolidayData(undefined, selectedYear.id);
                            setPageIndex(1);
                            setSchools("");
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
                  </div>
                </div>

                <Button
                  className="flex items-center justify-center gap-3 min-w-[200px]"
                  placeholder={"Add New School"}
                  color="blue"
                  size="sm"
                  onClick={() => navigate("/app/addHoliday")}
                >
                  <FontAwesomeIcon icon={faFaceGrinHearts} />
                  Add New Holidays
                </Button>
              </div>
            </div>
            {(!holiday || !holiday.content || holiday.content.length === 0) &&
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
                >
                  No Holidays Found
                </Typography>
              </div>
            ) : (
              <div className="bg-white overflow-auto">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="w-1/5 text-left py-3 px-4 uppercase font-semibold text-sm">
                        Holiday Title
                      </th>
                      <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                        Description
                      </th>
                      <th className="w-1/8 text-left py-3 px-4 uppercase font-semibold text-sm">
                        Date
                      </th>
                      <th className="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">
                        School
                      </th>
                      <th className="w-1/8 text-left py-3 px-4 uppercase font-semibold text-sm">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {holiday &&
                      holiday.content.map((item: any, index: number) => {
                        const imgURL: any = getImageURL(item);
                        return (
                          <tr
                            className={`${index % 2 != 0 ? "bg-gray-200" : ""}`}
                          >
                            <td
                              className={`w-1/5 text-left py-3 px-4 ${
                                !item.active ? "opacity-35" : "opacity-100"
                              }`}
                            >
                              <div className="flex flex-row items-center">
                                {imgURL && (
                                  <img
                                    src={imgURL}
                                    height={50}
                                    className="h-[40px] border-2 border-indigo-600 max-w-[80px] mr-2"
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
                              className={`w-1/8 text-left py-3 px-4 ${
                                !item.active ? "opacity-35" : "opacity-100"
                              }`}
                            >
                              {moment(item.date).format("DD MMM YYYY")}
                            </td>
                            <td
                              className={`w-1/4 text-left py-3 px-4 ${
                                !item.active ? "opacity-35" : "opacity-100"
                              }`}
                            >
                              {getSchoolName(item.schoolsList)}
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
            {!holiday || !holiday.content || holiday.content.length == 0 ? (
              <></>
            ) : (
              <div className="mt-2 flex flex-row justify-end">
                <Pagination
                  count={holiday.totalPages}
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
            ${selectedItem?.title}" Holiday`
              : `Are you sure? you want to activate."
            ${selectedItem?.schoolName}" School`
          }
          subMessage={
            selectedItem.active
              ? "Once you remove this holiday,  You wont get back it"
              : "Once you activate the school , school will be available for all your activities"
          }
        />
      )}
    </ParentLayout>
  );
};
export default SchoolHolidays;
