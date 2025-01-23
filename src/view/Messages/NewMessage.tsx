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
  faEnvelope,
  faFaceGrinHearts,
  faSchool,
  faUserPlus,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { getUserDetails, isEmailValid, isMobileValid } from "../../utils";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import Select from "react-select";

import AsyncSelect from "react-select/async";

import { getSchoolsForSelection } from "../../redux/schools/schoolSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { MESSAGE_TYPE } from "../../utils/constants";

import {
  getClassList,
  getClassListBySchoolForDropdown,
} from "../../redux/class/classSlice";
import OutsideClickHandler from "react-outside-click-handler";

import {
  createNewWorksheet,
  getSchoolYear,
  resetNewHoliday,
} from "../../redux/admin/adminSlice";
import { clone, find } from "lodash";
import moment from "moment";
import {
  getReceiverList,
  getReceivers,
  getUserRoles,
} from "../../redux/user/userSlice";
import {
  createNewMessage,
  resetNewMessage,
} from "../../redux/message/messageSlice";

const AddNewMessage = () => {
  const [school, setSchool] = useState<any>([]);
  const [schoolError, setSchoolError] = useState<any>("");

  const [title, setTitle] = useState<any>();
  const [titleError, setTitleError] = useState<any>("");

  const [startDate, setStartDate] = useState<any>("");
  const [startDateError, setStartDateError] = useState<any>("");

  const [endDate, setEndDate] = useState<any>("");
  const [endDateError, setEndDateError] = useState<any>("");

  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [file, setFile] = useState<any>([]);
  const [fileError, setFileError] = useState<any>([]);

  const [schoolMenu, setSchoolMenu] = useState<any>();
  const [messageTypeMenu, setMessageTypeMenu] = useState<any>();
  const [messageType, setMessageType] = useState<any>();
  const [messageTypeError, setMessageTypeError] = useState<any>("");

  const [classL, setClass] = useState<any>([]);
  const [classError, setClassError] = useState<any>("");
  const [classMenu, setClassMenu] = useState<any>();
  const dispatch = useAppDispatch();

  const [userMenu, setUserMenu] = useState<any>();
  const [user, setUser] = useState<any>([]);

  const [alertMessage, setAlertMessage] = useState<any>();

  const [roleMenu, setRoleMenu] = useState<any>();
  const [roles, setRoles] = useState<any>([]);
  const [serverRoles, setServerRoles] = useState<any>([]);

  const { optionSchoolList } = useAppSelector((state: any) => state.school);
  const { loading, error, newMessage } = useAppSelector(
    (state: any) => state.message
  );

  const [value, setValue] = useState("");
  const { optionClassList } = useAppSelector((state: any) => state.class);
  const { receiverList, roleList } = useAppSelector((state: any) => state.user);

  const userDetails = getUserDetails();

  console.log("roleList", roleList);

  //   useEffect(() => {
  //     if (receiverList && receiverList.length > 0) {
  //       var ids = new Set(user.map((obj: any) => obj.id));
  //       var newArray = receiverList.filter((d: any) => !ids.has(d.id));
  //       setUserList(newArray);
  //       //   const year = find(yearList, (item: any) => item.active);
  //       //   setMessageType(year);
  //     }
  //   }, [receiverList]);

  useEffect(() => {
    dispatch(getSchoolsForSelection());
    dispatch(getSchoolYear());
    dispatch(getUserRoles());
    getReceiverData();
  }, []);

  useEffect(() => {
    if (roleList && roleList.length > 0) {
      const tempList = [];
      for (let i = 0; i < roleList.length; i++) {
        if (
          roleList[i].roleName != "HELPER" &&
          roleList[i].roleName != "OTHER" &&
          roleList[i].roleName != "STUDENT"
        ) {
          tempList.push(roleList[i]);
        }
      }
      setServerRoles(tempList);
    }
  }, [roleList]);

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
    widt: "100%",
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
    if (newMessage) {
      // navigate("/app/dash", { replace: true });
      resetAllData();
    }
  }, [newMessage]);

  useEffect(() => {
    if (school.length > 0 || classL.length > 0 || user.length > 0) {
      setAlertMessage("");
    }
  }, [school, classL, user]);

  const resetAllData = () => {
    setSchoolError("");
    setSchool([]);
    setDescription("");
    setTitle("");
    setFile([]);
    setClass([]);
    setClassError("");
    setValue("");
    setUser([]);
    setMessageType("");
    setRoles([]);
  };

  const getClassList = (schooList: any) => {
    const body = [];
    for (let i = 0; i < schooList.length; i++) {
      body.push(schooList[i].id);
    }
    dispatch(getClassListBySchoolForDropdown(body));
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
            getReceiverData(tempSchools, [], roles, "");
            setUser([]);
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
            getReceiverData(school, tempClass, roles, "");
            setUser([]);
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

  const formatOptionLabelForUser = ({ value, label }: any) => {
    return (
      <div
        className="flex flex-col text-left px-3 border-b-[1px] border-gray-400 "
        onClick={() => {
          const tempClass = clone(user);
          const obj = find(tempClass, (obj: any) => obj.id === value.id);
          if (!obj) {
            tempClass.push(value);
            setUser(tempClass);
          }
          setUserMenu(false);
        }}
      >
        <div className="text-blue-gray-900 text-[16px]"> {label}</div>
        {/* <div className="text-gray-500 text-[12px] -mt-[12px]">
          School: {value.schools.schoolName + ", " + value.schools.branch}
        </div> */}
      </div>
    );
  };

  const formatOptionLabelForRole = ({ value, label }: any) => {
    return (
      <div
        className="flex flex-col text-left px-3 border-b-[1px] border-gray-400 "
        onClick={() => {
          const tempRoles = clone(roles);
          const obj = find(tempRoles, (obj: any) => obj.id === value.id);
          if (!obj) {
            tempRoles.push(value);
            setRoles(tempRoles);
            getReceiverData(school, classL, tempRoles, "");
          }
          setRoleMenu(false);
        }}
      >
        <div className="text-blue-gray-900 text-[16px]"> {label}</div>
        {/* <div className="text-gray-500 text-[12px] -mt-[12px]">
          School: {value.schools.schoolName + ", " + value.schools.branch}
        </div> */}
      </div>
    );
  };

  const formatOptionLabelForYear = ({ value, label }: any) => {
    return (
      <div
        className="flex flex-col text-left  border-b-[1px] border-gray-400 "
        onClick={() => {
          setMessageType(value);
          setMessageTypeMenu(false);
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

  const getReceiverData = (
    school: any = [],
    classL: any = [],
    role: any = [],
    search: string = ""
  ) => {
    const schoolId = [];

    if (school && school.length > 0) {
      for (let i = 0; i < school.length; i++) {
        schoolId.push(school[i].id);
      }
    }

    const classId = [];
    if (classL && classL.length > 0) {
      for (let i = 0; i < classL.length; i++) {
        classId.push(classL[i].id);
      }
    }

    const roleId = [];
    if (role && role.length > 0) {
      for (let i = 0; i < role.length; i++) {
        roleId.push(role[i].id);
      }
    }
    const body: any = {
      active: true,
    };

    if (schoolId.length > 0) {
      body["schoolId"] = schoolId;
    }

    if (classId.length > 0) {
      body["classId"] = classId;
    }

    if (search || search.trim()) {
      body["search"] = search;
    }

    if (roleId.length > 0) {
      body["roleId"] = roleId;
    }

    return dispatch(getReceiverList(body));
  };
  const toolbarOptions = [
    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["link", "image", "video"],
    [{ color: [] }, { background: [] }],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    // [{ script: "sub" }, { script: "super" }], // superscript/subscript
    // [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    // [{ direction: "rtl" }], // text direction

    [{ align: [] }],

    ["clean"], // remove formatting button
  ];

  const onSendMessage = () => {
    if (school.length === 0 && classL.length === 0 && user.length === 0) {
      setAlertMessage(
        "Please select schools, classes or atleast one user to send message"
      );
      return;
    }

    if (!title || !title.trim()) {
      if (messageType.value === "EMAIL") {
        setTitleError("Please enter subject");
      } else {
        setTitleError("Please enter title");
      }
      return;
    }

    if (messageType.value === "EMAIL") {
      if (!value || !value.trim()) {
        setDescriptionError("Please enter your message");
        return;
      }
    } else {
      if (!description || !description.trim()) {
        setDescriptionError("Please enter your message");
        return;
      }
    }

    const fileList = [];
    for (let i = 0; i < file.length; i++) {
      const fileObj = {
        type: "message",
        bucket: "saras-messages",
        subtype: messageType.value,
        file: file[i],
      };
      fileList.push(fileObj);
    }

    const roleId = [];
    for (let i = 0; i < roles.length; i++) {
      roleId.push(roles[i].id);
    }

    const body: any = {
      messageType: messageType.value,
      message: messageType.value === "EMAIL" ? value : description,
      title: title,
      file: fileList,
      senderId: {
        id: userDetails.id,
      },
      roleId: roleId,
      active: true,
    };

    const receiverDetails = [];
    if (user && user.length > 0) {
      const receiverDetails = [];
      for (let i = 0; i < user.length; i++) {
        const obj = {
          email: user[i].email,
          receiverId: {
            id: user[i].id,
          },
          active: true,
        };
        receiverDetails.push(obj);
      }
      body["receiverDetails"] = receiverDetails;
    } else if (classL && classL.length > 0) {
      for (let i = 0; i < classL.length; i++) {
        receiverDetails.push(classL[i].id);
      }
      body["classId"] = receiverDetails;
    } else {
      for (let i = 0; i < school.length; i++) {
        receiverDetails.push(school[i].id);
      }
      body["schoolId"] = receiverDetails;
    }
    console.log("Final Body ", body);
    dispatch(createNewMessage(body));
  };

  return (
    <ParentLayout
      loading={loading}
      error={error}
      success={newMessage ? "New Message sent successfully" : ""}
      onCloseSuccessAlert={() => dispatch(resetNewMessage())}
      onCloseAlert={() => dispatch(resetNewMessage())}
    >
      <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
        <main className="w-full flex-grow p-6">
          <span>
            <FontAwesomeIcon icon={faEnvelope} className="mr-2 fa-4x p-0" />
            <h1 className="w-full text-3xl text-black ">New Message</h1>
          </span>

          <div className="flex flex-wrap">
            <div className="w-full lg:w-[30%] my-1 pr-0 lg:pr-2 mt-2 ">
              <p className="text-xl flex items-center">
                <i className="fas fa-list mr-3"></i> Receiver Info
              </p>
              <div className="leading-loose">
                <form className="p-10 bg-white rounded shadow-xl min-h-[470px]">
                  <div className="">
                    <div className="inline-block mt-2 w-full pr-1">
                      <label className="block text-sm text-gray-600 text-left mb-0">
                        Select Mesage Type
                      </label>
                      <OutsideClickHandler
                        onOutsideClick={() => {
                          setMessageTypeMenu(false);
                        }}
                      >
                        <Select
                          name="messageType"
                          placeholder="Message Type"
                          options={MESSAGE_TYPE}
                          getOptionLabel={(option: any) => option.option}
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
                          classNamePrefix="Select Message Type"
                          onChange={(event: any) => {
                            setMessageType(event);
                          }}
                          value={messageType}
                          components={{ Option: formatOptionLabelForYear }}
                          menuIsOpen={messageTypeMenu}
                          onMenuOpen={() => setMessageTypeMenu(true)}
                          closeMenuOnScroll={true}
                        />
                      </OutsideClickHandler>
                      <label className="block text-sm text-left text-red-600 h-4">
                        {messageTypeError ? messageTypeError : ""}
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
                            setClass([]);
                            getReceiverData(event, undefined, roles, "");
                            setUser([]);
                          }}
                          value={school}
                          components={{ Option: formatOptionLabel }}
                          menuIsOpen={schoolMenu}
                          onMenuOpen={() => setSchoolMenu(true)}
                          closeMenuOnScroll={true}
                          isMulti
                          isDisabled={!messageType}
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
                          classNamePrefix="Select Class"
                          onChange={(event: any) => {
                            console.log("event :::1", event);
                            setClass(event);
                            setUser([]);
                            getReceiverData(school, event, roles, "");
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
                      <label className="block text-sm text-gray-600 text-left mb-0">
                        Roles
                      </label>
                      <OutsideClickHandler
                        onOutsideClick={() => {
                          setRoleMenu(false);
                        }}
                      >
                        <Select
                          name="users"
                          placeholder="Select Roles"
                          hideSelectedOptions={true}
                          options={serverRoles}
                          getOptionLabel={(option: any) => option.roleDesc}
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
                            setRoles(event);
                            getReceiverData(school, classL, event, "");
                          }}
                          value={roles}
                          components={{ Option: formatOptionLabelForRole }}
                          menuIsOpen={roleMenu}
                          onMenuOpen={() => setRoleMenu(true)}
                          closeMenuOnScroll={true}
                          isMulti
                          isDisabled={!messageType}
                          isSearchable
                          onInputChange={(event) => console.log(event)}
                          isClearable
                        />
                      </OutsideClickHandler>
                    </div>

                    <div className="inline-block mt-2 w-full pr-1">
                      <label className="block text-sm text-gray-600 text-left mb-0">
                        Users
                      </label>
                      <OutsideClickHandler
                        onOutsideClick={() => {
                          setUserMenu(false);
                        }}
                      >
                        <Select
                          name="users"
                          placeholder="Select User"
                          hideSelectedOptions={true}
                          options={receiverList}
                          getOptionLabel={(option: any) =>
                            option.firstName +
                            " " +
                            option.lastName +
                            "(" +
                            option.roles.roleDesc +
                            ")"
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
                            setUser(event);
                          }}
                          value={user}
                          components={{ Option: formatOptionLabelForUser }}
                          menuIsOpen={userMenu}
                          onMenuOpen={() => setUserMenu(true)}
                          closeMenuOnScroll={true}
                          isMulti
                          isDisabled={!messageType}
                          isSearchable
                          onInputChange={(event) => console.log(event)}
                        />
                      </OutsideClickHandler>
                      <label className="block text-sm text-left text-red-600 h-4">
                        {schoolError ? schoolError : ""}
                      </label>
                    </div>

                    <label className="font-bold text-red-500">
                      {alertMessage}
                    </label>
                  </div>
                </form>
              </div>
            </div>

            <div className="w-full lg:w-[70%] pl-0 lg:pl-2 mt-2">
              <p className="text-xl flex items-center">
                <i className="fas fa-list mr-3"></i> Message Details
              </p>
              <div className="leading-loose">
                <form className="p-10 bg-white rounded shadow-xl min-h-[470px]">
                  <div className="">
                    <div className="inline-block mt-2 w-full pr-1">
                      <label className="block text-sm text-gray-600 text-left">
                        {messageType && messageType.value === "EMAIL"
                          ? "Subject"
                          : " Title"}
                      </label>
                      <div className="flex flex-col">
                        <input
                          className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded"
                          id="title"
                          name="title"
                          required
                          placeholder={
                            messageType && messageType.value === "EMAIL"
                              ? "Enter Subject"
                              : " Message Title"
                          }
                          aria-label="title"
                          value={title}
                          onChange={(event) => {
                            setTitle(event.target.value);
                            setTitleError("");
                          }}
                          disabled={!messageType}
                        />
                        <div className="block text-[12px] mt-[-5px] mb-2 text-left text-red-600 h-4">
                          {titleError && titleError}
                        </div>
                      </div>
                    </div>

                    <div className="mt-1">
                      <label className="block text-sm text-gray-600 text-left">
                        Message
                      </label>
                      {messageType && messageType.value === "EMAIL" ? (
                        <ReactQuill
                          theme="snow"
                          value={value}
                          // onChange={setValue}
                          onChange={(value) => {
                            setValue(value);
                            setDescriptionError("");
                          }}
                          modules={{ toolbar: toolbarOptions }}
                        />
                      ) : (
                        <textarea
                          className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded"
                          id="description"
                          name="description"
                          rows={5}
                          required
                          placeholder="Description"
                          aria-label="description"
                          value={description}
                          onChange={(event) => {
                            setDescription(event.target.value);
                            setDescriptionError("");
                          }}
                          disabled={!messageType}
                        ></textarea>
                      )}
                    </div>
                    <div className="block text-[12px] mt-[-5px] mb-2 text-left text-red-600 h-4">
                      {descriptionError && descriptionError}
                    </div>
                  </div>

                  <div className="inline-block w-full mt-4 ">
                    <label className="block text-sm text-gray-600 text-left">
                      Attachments(Max 3 Files)
                    </label>
                    <div
                      {...getRootProps(style)}
                      className={`bg-[#e5e7eb] flex flex-col items-center border-2 rounded-sm border-[#9c9c9c] border-dashed text-[#B5B5B5] hover:border-[#8f8f8f] ${
                        file ? "" : "p-5"
                      }`}
                    >
                      <input {...getInputProps()} />
                      <p>Click to select files or Drop the files here ...</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap flex-row ">
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
                            className={`${index != 0 ? "ml-0" : ""} mt-2 mr-2`}
                            color="teal"
                          />
                        </>
                      );
                    })}
                  </div>

                  <div className="flex flex-row-reverse items-end w-full mt-[10px]">
                    <Button
                      variant="gradient"
                      color="blue"
                      placeholder={"Submit"}
                      onClick={() => onSendMessage()}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                      disabled={!messageType}
                    >
                      <FontAwesomeIcon
                        icon={faBriefcase}
                        className="mr-2 fa-1x p-0"
                      />
                      Send Message
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

export default AddNewMessage;
