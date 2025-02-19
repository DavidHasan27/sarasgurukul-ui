import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ParentLayout from "../../component/app-component/Parent";
import {
  faEye,
  faTrash,
  faSchool,
  faPencil,
  faSquarePollVertical,
  faCommentDollar,
} from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import Select1 from "react-select";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Toggle from "react-toggle";
import { getSchoolsForSelection } from "../../redux/schools/schoolSlice";
import Pagination from "../../component/app-component/Pagination";
import WarningDialog from "../../component/app-component/WarningDialog";
import studentPhoto from "../assets/user.png";

import { getClassList } from "../../redux/class/classSlice";
import {
  activeDeactiveStudent,
  getStudentList,
  resetActivatetudent,
} from "../../redux/students/studentSlice";
import { getUserDetails } from "../../utils";
import {
  ROLE_ADMIN,
  ROLE_PARENT,
  ROLE_PRINCIPAL,
  ROLE_SUPER_ADMIN,
  ROLE_TEACHER,
} from "../../utils/constants";

const Students = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = getUserDetails();
  const [pageIndex, setPageIndex] = useState(1);
  const [warningDialog, setWarningDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [searchString, setSearchString] = useState<any>("");
  const [school, setSchools] = useState<any>();
  const [schoolMenu, setSchoolMenu] = useState<any>();
  //   const [role, setRole] = useState<any>("");
  const [classs, setClasss] = useState<any>();
  const [active, setActive] = useState<boolean>(true);
  const { optionSchoolList } = useAppSelector((state: any) => state.school);

  const { loading, error, studentList, message } = useAppSelector(
    (state: any) => state.student
  );

  const { classList, success } = useAppSelector((state: any) => state.class);
  console.log("userList List :", user.role);

  useEffect(() => {
    dispatch(getSchoolsForSelection());
    getStudentData();
  }, []);

  useEffect(() => {
    getStudentData(school, classs, searchString, active, pageIndex - 1);
  }, [pageIndex]);

  const getStudentData = (
    selectedSchool: any = undefined,
    selectedClass: any = undefined,
    searchString: any = undefined,
    active: any = true,
    page: any = 0
  ) => {
    const body: any = {
      page: page,
      size: 10,
      active: active,
    };

    if (selectedSchool) {
      body["schoolId"] = selectedSchool.id;
      if (selectedClass) {
        body["classId"] = selectedClass.id;
      }
    }

    if (searchString) {
      body["search"] = searchString;
    }

    if (user.role == ROLE_PARENT) {
      body["parentId"] = user.id;
    }
    dispatch(getStudentList(body));
  };

  const onActivateDeactivateStudent = () => {
    setWarningDialog(false);
    const body = {
      id: selectedItem.id,
      active: !selectedItem.active,
    };
    dispatch(activeDeactiveStudent(body));
  };
  const formatOptionLabel = ({ value, label }: any) => {
    return (
      <div
        className="flex flex-col text-left px-3 border-b-[1px] border-gray-400 "
        onClick={() => {
          if (!school || school.id !== value.id) {
            setSchools(value);
            // setPageIndex(1);

            dispatch(getClassList({ active: true, schoolId: value.id }));
            setSchools(value);
            setClasss("");
            getStudentData(value, undefined, searchString, active, 0);
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

  const getImageURL = (item: any) => {
    if (item && item.studentPhoto) {
      const imageData = item.studentPhoto.split("|");
      return (
        "https://" +
        imageData[0] +
        ".s3.ap-south-1.amazonaws.com/" +
        imageData[1]
      );
    }
    return "/img/app/user.png";
  };

  const getRollNo = (rollNo: any) => {
    let result = rollNo.toString().padStart(4, "0");
    // const rollS = ("0" + rollNo).slice(-3);
    return "SARAS" + result;
  };

  return (
    <ParentLayout
      loading={loading}
      error={error}
      success={message}
      onCloseSuccessAlert={() => dispatch(resetActivatetudent())}
    >
      <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
        <main className="w-full flex-grow p-6">
          <h1 className="text-3xl text-black pb-6">Students</h1>

          <div className="w-full mt-6">
            <div className="w-full flex flex-row  justify-end items-end ">
              {/* <p className="text-xl pb-3 flex items-center">
                <i className="fas fa-list mr-3"></i> Staff List
              </p> */}
              <div className="flex flex-row  mb-2 ">
                <div className="relative flex w-full mr-2 ">
                  <div className="w-[80px] flex-row flex mr-12 text-center mt-2">
                    <Toggle
                      id="cheese-status"
                      defaultChecked={active}
                      onChange={() => {
                        setActive(!active);
                        getStudentData(
                          school,
                          classs,
                          searchString,
                          !active,
                          0
                        );
                        setPageIndex(1);
                      }}
                      icons={false}
                    />
                    <span className="ml-2">
                      {active ? "Active" : "Inactive"}
                    </span>
                  </div>

                  {/* <Select1
                    name="role"
                    placeholder="Select Role"
                    options={roleList}
                    getOptionLabel={(option: any) => option.roleDesc}
                    getOptionValue={(option) => option.id}
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        backgroundColor: "#e5e7eb",
                        borderColor: state.isFocused ? "#0f58bf" : "#e1e4e8",
                        textAlign: "left",
                        width: 150,
                        marginRight: 3,
                        paddingTop: 1,
                        paddingBottom: 1,
                      }),
                      option: (baseStyles, state) => ({
                        ...baseStyles,
                        textAlign: "left",
                      }),
                    }}
                    classNamePrefix="Select Role"
                    onChange={(role) => {
                      setRole(role);
                      getUserData(
                        school,
                        classs,
                        role,
                        searchString,
                        active,
                        0
                      );
                      setPageIndex(1);
                    }}
                    value={role}
                    isClearable
                  /> */}

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
                        console.log("Schoo Group >>>>>", event);
                        if (!event) {
                          getStudentData(
                            undefined,
                            undefined,
                            searchString,
                            active,
                            0
                          );
                          setClasss("");
                        }
                        setPageIndex(1);
                        setSchools(event);
                      }}
                      value={school}
                      components={{ Option: formatOptionLabel }}
                      menuIsOpen={schoolMenu}
                      onMenuOpen={() => setSchoolMenu(true)}
                      closeMenuOnScroll={true}
                      isClearable
                    />
                  </OutsideClickHandler>

                  <Select1
                    name="class"
                    placeholder="Select Class"
                    options={classList ? classList.content : []}
                    getOptionLabel={(option: any) => option.className}
                    getOptionValue={(option) => option}
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        backgroundColor: "#e5e7eb",
                        borderColor: state.isFocused ? "#0f58bf" : "#e1e4e8",
                        textAlign: "left",
                        width: 200,
                        marginRight: 3,
                        paddingTop: 1,
                        paddingBottom: 1,
                      }),
                      option: (baseStyles, state) => ({
                        ...baseStyles,
                        textAlign: "left",
                      }),
                    }}
                    classNamePrefix="Select Role"
                    onChange={(classObj) => {
                      getStudentData(school, classObj, searchString, active, 0);
                      setClasss(classObj);
                      setPageIndex(1);
                    }}
                    value={classs}
                    isClearable
                    isDisabled={!school}
                  />

                  <div className="relative h-10 w-full min-w-[200px]">
                    <input
                      className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded"
                      id="search"
                      name="search"
                      type="search"
                      placeholder="Search by  first name or last name "
                      aria-label="Phone2"
                      value={searchString}
                      onChange={(event) => {
                        const value = event.target.value;
                        setSearchString(value);
                        if (!value || !value.trim()) {
                          setPageIndex(1);
                          getStudentData(school, classs, undefined, active, 0);
                        }
                      }}
                    />
                    {/* <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                      Seach by name, branch, phone email
                    </label> */}
                  </div>
                </div>
                <Button
                  className="flex items-center justify-center mr-2"
                  placeholder={"Search"}
                  color="blue"
                  size="sm"
                  onClick={() => {
                    setPageIndex(1);
                    getStudentData(school, classs, searchString, active, 0);
                  }}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Search
                </Button>

                {user.role == ROLE_SUPER_ADMIN ||
                  user.role == ROLE_ADMIN ||
                  user.role == ROLE_PRINCIPAL ||
                  (user.role == ROLE_TEACHER && (
                    <Button
                      className="flex items-center justify-center  min-w-[150px]"
                      placeholder={"Add New Students"}
                      color="blue"
                      size="sm"
                      onClick={() => navigate("/app/addStudent")}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      <FontAwesomeIcon icon={faSchool} className="mr-2" />
                      Add New Student
                    </Button>
                  ))}
              </div>
            </div>
            {(!studentList ||
              !studentList.content ||
              studentList.content.length === 0) &&
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
                  No Students Found
                </Typography>
              </div>
            ) : (
              <div className="bg-white overflow-auto">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="w-1/5 text-left py-3 px-4 uppercase font-semibold text-sm">
                        Name
                      </th>
                      <th className="w-1/7 text-left py-3 px-4 uppercase font-semibold text-sm">
                        Class
                      </th>
                      <th className="w-1/8 text-left py-3 px-4 uppercase font-semibold text-sm">
                        School
                      </th>
                      <th className="w-1/8 text-left py-3 px-4 uppercase font-semibold text-sm">
                        Role No
                      </th>
                      <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                        Parents Name
                      </th>
                      <th className="w-1/7 text-left py-3 px-4 uppercase font-semibold text-sm">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {studentList &&
                      studentList.content.map((item: any, index: number) => (
                        <tr
                          className={`${index % 2 != 0 ? "bg-gray-200" : ""}`}
                        >
                          <td
                            className={`w-1/5 text-left py-3 px-4 ${
                              !item.active ? "opacity-35" : "opacity-100"
                            }`}
                          >
                            <div className="flex flex-row items-center">
                              <img
                                src={getImageURL(item)}
                                className="h-10 mr-2"
                                alt="student"
                              />
                              {item.firstName + " " + item.lastName}
                            </div>
                          </td>
                          <td
                            className={`w-1/7 text-left py-3 px-4 ${
                              !item.active ? "opacity-35" : "opacity-100"
                            }`}
                          >
                            {item.schoolClass
                              ? item.schoolClass.className
                              : "-"}
                          </td>
                          <td
                            className={`w-1/8 text-left py-3 px-4 ${
                              !item.active ? "opacity-35" : "opacity-100"
                            }`}
                          >
                            {item.schools ? item.schools.schoolName : "-"}
                          </td>
                          <td
                            className={`w-1/8 text-left py-3 px-4 ${
                              !item.active ? "opacity-35" : "opacity-100"
                            }`}
                          >
                            {item.roleNo ? getRollNo(item.roleNo) : "-"}
                          </td>
                          <td
                            className={`w-1/3 text-left py-3 px-4 ${
                              !item.active ? "opacity-35" : "opacity-100"
                            }`}
                          >
                            {item.parents
                              ? item.parents.studentRelation +
                                ":" +
                                item.parents.firstName +
                                " " +
                                item.parents.lastName
                              : "-"}
                          </td>
                          <td className="w-1/7 text-left py-3 px-4">
                            <Tooltip content="View/Edit Details">
                              <IconButton
                                placeholder={"View"}
                                className="h-[30px] w-[30px] bg-blue-800 ml-2"
                                onClick={() =>
                                  navigate("/app/view-edit-student", {
                                    state: item,
                                  })
                                }
                                disabled={!item.active}
                                onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}
                              >
                                <FontAwesomeIcon icon={faEye} />
                              </IconButton>
                            </Tooltip>
                            {user.role == ROLE_SUPER_ADMIN ||
                              (user.role == ROLE_ADMIN && (
                                <Tooltip content="Active/Deactive User">
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
                              ))}
                            <Tooltip content="View/Add Reports">
                              <IconButton
                                placeholder={"View"}
                                className="h-[30px] w-[30px] bg-blue-800 ml-2"
                                onClick={() => {
                                  navigate("/app/studentReport", {
                                    state: item,
                                  });
                                }}
                                onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}
                              >
                                <FontAwesomeIcon icon={faSquarePollVertical} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip content="Student Fees">
                              <IconButton
                                placeholder={"View"}
                                className="h-[30px] w-[30px] bg-blue-800 ml-2"
                                onClick={() =>
                                  navigate("/app/studentFee", {
                                    state: item,
                                  })
                                }
                                disabled={!item.active}
                                onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}
                              >
                                <FontAwesomeIcon icon={faCommentDollar} />
                              </IconButton>
                            </Tooltip>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
            {!studentList ||
            !studentList.content ||
            studentList.content.length == 0 ? (
              <></>
            ) : (
              <div className="mt-2 flex flex-row justify-end">
                <Pagination
                  count={studentList.totalPages}
                  onPageChange={(pageIndex: number) => setPageIndex(pageIndex)}
                  pageIndex={pageIndex}
                />
              </div>
            )}
          </div>
        </main>
      </div>
      {selectedItem && selectedItem.firstName && (
        <WarningDialog
          open={warningDialog}
          onOkClick={() => onActivateDeactivateStudent()}
          onCloseDialog={() => setWarningDialog(false)}
          header={"Warning !"}
          message={
            selectedItem.active
              ? `Are you sure? you want to de-activate."
            ${selectedItem?.firstName + " " + selectedItem?.lastName}" Student`
              : `Are you sure? you want to activate."
            ${selectedItem?.firstName + " " + selectedItem?.lastName}" Student`
          }
          subMessage={
            selectedItem.active
              ? "Once you deactivate this student,  We will not allow you or other members to any do operation for this student"
              : "Once you activate the user , student will be available for all your activities"
          }
        />
      )}
    </ParentLayout>
  );
};
export default Students;
