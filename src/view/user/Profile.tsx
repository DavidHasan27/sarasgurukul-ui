import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Avatar,
  Button,
  Chip,
} from "@material-tailwind/react";
import ParentLayout from "../../component/app-component/Parent";
import { useCallback, useEffect, useMemo, useState } from "react";
import Select from "react-select";

import { useAppDispatch, useAppSelector } from "../../redux/store";

import DatePickerComponent from "../../component/app-component/DatePicker";
import { getUserDetails } from "../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileDownload,
  faSquareCaretRight,
  faSquareCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import {
  getUserDetailsInfo,
  updateUserPasswordOrImage,
} from "../../redux/user/userSlice";
import { useDropzone } from "react-dropzone";

import { downloadFile } from "../../redux/admin/adminSlice";
import { ROLE_TEACHER } from "../../utils/constants";

const Profile = () => {
  const userDetailsObj = getUserDetails();
  //   console.log("User Details", userDetailsObj);
  const [open, setOpen] = useState(1);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [profileExpand, setProfileExpand] = useState(true);
  const [docExpand, setDocExpand] = useState(true);
  const [schoolsExpand, setSchoolExpand] = useState(true);
  const [studentExpand, setStudentExpand] = useState(true);
  const [changePasswordOpen, setChangePassowedOpen] = useState(false);

  const tempDate =
    userDetailsObj.birthDate &&
    userDetailsObj.birthDate.substring(
      0,
      userDetailsObj.birthDate.indexOf("T")
    );

  const [country, setCountry] = useState("India");

  const [schoolList, setSchoolList] = useState(userDetailsObj.schoolList);
  const [schoolListError, setSchoolListError] = useState("");

  const [role, setRole] = useState<any>({
    id: 1,
    roleDesc: userDetailsObj.jobTitle,
  });

  const [joiningDate, setJoiningDate] = useState<any>(new Date());
  const [requiredRoleList, setRequiredRoleList] = useState<any>([
    { id: 1, roleDesc: userDetailsObj.jobTitle },
  ]);

  const [profilePhoto, setProfilePhoto] = useState<any>();

  const dispatch = useAppDispatch();
  const { loading, error, userDetails } = useAppSelector(
    (state: any) => state.user
  );
  const { optionSchoolList } = useAppSelector((state: any) => state.school);

  const onDrop = useCallback((acceptedFiles: any) => {
    console.log("Profile Photo", acceptedFiles);
    var totalSizeMB = acceptedFiles[0].size / Math.pow(1024, 2);
    if (totalSizeMB > 1) {
      alert("Maximum size for file is 1MB");
    } else {
      setProfilePhoto(acceptedFiles[0]);
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
    dispatch(getUserDetailsInfo(userDetailsObj.id));
  }, []);

  useEffect(() => {
    if (userDetails) {
      setProfilePhoto(userDetails.userProfilePhoto);
    }
    console.log("User Details ", userDetails);
  }, [userDetails]);

  const getImageURL = (item: any) => {
    const imageData = item.split("|");
    return (
      "https://" + imageData[0] + ".s3.ap-south-1.amazonaws.com/" + imageData[1]
    );
  };

  const isString = (value: any) => {
    return typeof value === "string" || value instanceof String;
  };

  const getFileList = () => {
    const list = [];
    if (userDetails) {
      if (userDetails.doc1) {
        list.push(userDetails.doc1);
      }
      if (userDetails.doc2) {
        list.push(userDetails.doc2);
      }
      if (userDetails.doc3) {
        list.push(userDetails.doc3);
      }
    }
    return list;
  };

  const getStudentDockList = (student: any) => {
    const list = [];
    if (student) {
      if (student.doc1) {
        list.push(student.doc1);
      }
      if (student.doc2) {
        list.push(student.doc2);
      }
      if (student.doc3) {
        list.push(student.doc3);
      }
    }
    return list;
  };

  const onUpdateProfilePhoto = () => {
    if (profilePhoto) {
      const body: any = {
        userId: userDetails.id,
      };
      if (profilePhoto) {
        body["imageURL"] = {
          type: "user-profile",
          bucket: "saras-doc",
          subtype: userDetails.firstName + "_" + userDetails.lastName,
          file: profilePhoto,
        };
      }

      dispatch(updateUserPasswordOrImage(body));
    }
  };

  const onUpdatePassword = () => {
    if (!newPassword || !newPassword.trim()) {
      setPasswordError("Please enter new password");
      return;
    }

    if (!confirmPassword || !confirmPassword.trim()) {
      setPasswordError("Please enter new password");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirm password should be same");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError("Your password is too short");
      return;
    }

    const body = {
      password: newPassword,
      userId: userDetails.id,
    };
    dispatch(updateUserPasswordOrImage(body));
    setNewPassword("");
    setconfirmPassword("");
  };

  const getRollNo = (rollNo: any) => {
    let result = rollNo.toString().padStart(4, "0");
    // const rollS = ("0" + rollNo).slice(-3);
    return "SARAS" + result;
  };

  const fileList = getFileList();

  return (
    <ParentLayout loading={loading} error={error}>
      <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
        <main className="w-full flex-grow p-10">
          <h1 className="text-3xl text-black pb-6">Profile</h1>
          {userDetails ? (
            <>
              <Accordion open={profileExpand} placeholder={undefined}>
                <AccordionHeader
                  onClick={() => setProfileExpand(!profileExpand)}
                  placeholder={undefined}
                  className={`bg-blue-800 ${
                    profileExpand ? "rounded-t-md" : "rounded"
                  } px-3 text-white`}
                >
                  Personal Info
                </AccordionHeader>
                <AccordionBody className=" py-0">
                  <main className="w-full flex-grow">
                    <div className="flex flex-wrap">
                      <div className="w-full lg:w-1/2  pr-0 lg:pr-2 mt-2 ">
                        <div className="flex flex-wrap">
                          <form className="p-10 bg-white rounded-b-md ">
                            <div className="">
                              <div className="inline-block  w-1/2 pr-1">
                                <label className="block text-sm text-gray-600 text-left">
                                  First Name
                                </label>
                                <div className="flex flex-col">
                                  <input
                                    className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded font-bold"
                                    id="firstName"
                                    name="firstName"
                                    required
                                    placeholder="First Name"
                                    aria-label="firstName"
                                    value={userDetails.firstName}
                                    // onChange={(event) => {
                                    //   setFirstName(event.target.value);
                                    // }}
                                    disabled={true}
                                  />
                                </div>
                              </div>

                              <div className="inline-block w-1/2 pr-1">
                                <label className="block text-sm text-gray-600 text-left">
                                  Middle Name
                                </label>
                                <div className="flex flex-col">
                                  <input
                                    className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded font-bold"
                                    id="middleName"
                                    name="middleName"
                                    required
                                    placeholder="Middle Name"
                                    aria-label="middleName"
                                    value={userDetails.middleName}
                                    disabled={true}
                                  />
                                </div>
                              </div>

                              <div className="inline-block w-1/2 pr-1 mt-2">
                                <label className="block text-sm text-gray-600 text-left">
                                  Last Name
                                </label>
                                <div className="flex flex-col">
                                  <input
                                    className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded font-bold"
                                    id="lastName"
                                    name="lastName"
                                    required
                                    placeholder="Last Name"
                                    aria-label="lastName"
                                    value={userDetails.lastName}
                                    disabled={true}
                                  />
                                </div>
                              </div>

                              <div className="inline-block w-1/2 pr-1">
                                <label className="block text-sm text-gray-600 text-left">
                                  Email
                                </label>
                                <div className="flex flex-col">
                                  <input
                                    className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded font-bold"
                                    id="email"
                                    name="email"
                                    required
                                    placeholder="Email Id"
                                    aria-label="email"
                                    value={userDetails.email}
                                    disabled={true}
                                  />
                                </div>
                              </div>

                              <div className="inline-block w-1/2 pr-1  mt-2">
                                <label className="block text-sm text-gray-600 text-left">
                                  Primary Number
                                </label>
                                <div className="flex flex-col">
                                  <input
                                    className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded font-bold"
                                    id="Phone1"
                                    name="Phone1"
                                    type="number"
                                    required
                                    placeholder="Phone1"
                                    aria-label="Phone1"
                                    value={userDetails.phone}
                                    disabled={true}
                                  />
                                </div>
                              </div>
                              <div className="inline-block w-1/2 pr-1">
                                <label className="block text-sm text-gray-600 text-left">
                                  Secondary Number
                                </label>
                                <div className="flex flex-col">
                                  <input
                                    className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded font-bold"
                                    id="Phone2"
                                    name="Phone2"
                                    type="number"
                                    required
                                    placeholder="Phone2"
                                    aria-label="Phone2"
                                    value={userDetails.phone2}
                                    disabled={true}
                                  />
                                </div>
                              </div>

                              <div className="inline-block w-1/2 pr-1  mt-2">
                                <label className="block text-sm text-gray-600 text-left">
                                  Relative Name
                                </label>
                                <div className="flex flex-col">
                                  <input
                                    className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded font-bold"
                                    id="relativename"
                                    name="relativename"
                                    required
                                    placeholder="Relative Name"
                                    aria-label="relativename"
                                    value={userDetails.relativeName}
                                  />
                                </div>
                              </div>

                              <div className="inline-block w-1/2 pr-1">
                                <label className="block text-sm text-gray-600 text-left">
                                  Relative Number
                                </label>
                                <div className="flex flex-col">
                                  <input
                                    className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded font-bold"
                                    id="Phone1"
                                    name="Phone1"
                                    type="number"
                                    required
                                    placeholder="Relative number"
                                    aria-label="Phone1"
                                    value={userDetails.relativeNo}
                                  />
                                </div>
                              </div>

                              <div className="inline-block  w-1/2 pr-1  mt-2">
                                <label className="block text-sm text-gray-600 text-left">
                                  Blood Group
                                </label>
                                <div className="flex flex-col">
                                  <Select
                                    name="role"
                                    placeholder="Select Blood Group"
                                    getOptionLabel={(option: any) =>
                                      option.option
                                    }
                                    getOptionValue={(option) => option.value}
                                    styles={{
                                      control: (baseStyles, state) => ({
                                        ...baseStyles,
                                        backgroundColor: "#e5e7eb",
                                        borderColor: state.isFocused
                                          ? "#0f58bf"
                                          : "#e1e4e8",
                                        textAlign: "left",
                                        fontWeight: "800",
                                      }),
                                      option: (baseStyles, state) => ({
                                        ...baseStyles,
                                        textAlign: "left",
                                      }),
                                    }}
                                    classNamePrefix="Select Blood Group"
                                    // onChange={(event) => {
                                    //   console.log("Bloood Group >>>>>", event);
                                    //   setBloodGroup(event);
                                    // }}
                                    value={{
                                      option: userDetails.bloodGroup,
                                      value: userDetails.bloodGroup,
                                    }}
                                    isDisabled={true}
                                  />
                                </div>
                              </div>

                              <div className="inline-block w-1/2 pr-1  mt-2">
                                <label className="block text-sm text-gray-600 text-left">
                                  Birth Date
                                </label>
                                <div className="flex flex-col">
                                  <DatePickerComponent
                                    startDate={
                                      userDetails.birthDate
                                        ? new Date(userDetails.birthDate)
                                        : null
                                    }
                                    maxDate={new Date("2012-01-01")}
                                    minDate={new Date("1980-01-01")}
                                    className={
                                      "bg-[#e5e7eb] h-[45px] w-[100%] pl-2 rounded-sm font-bold"
                                    }
                                  />
                                </div>
                              </div>

                              <label className="block text-sm text-gray-600 text-left mb-0  mt-2">
                                Schools
                              </label>
                              <Select
                                isMulti
                                name="schools"
                                placeholder="Select Schools"
                                options={optionSchoolList}
                                getOptionLabel={(option: any) =>
                                  option.schoolName
                                }
                                getOptionValue={(option) => option.id}
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
                                      fontWeight: "800",
                                    };
                                  },
                                }}
                                classNamePrefix="Select Schools"
                                onChange={(event: any) => {
                                  setSchoolList(event);
                                  if (event.length !== 0) {
                                    setSchoolListError("");
                                  }
                                }}
                                value={schoolList}
                                isDisabled={true}
                              />

                              <label className="block text-sm text-gray-600 text-left mb-0 mt-1">
                                Roles
                              </label>
                              <Select
                                name="role"
                                placeholder="Select User Role"
                                options={requiredRoleList}
                                getOptionLabel={(option: any) =>
                                  option.roleDesc
                                }
                                getOptionValue={(option) => option.id}
                                styles={{
                                  control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    backgroundColor: "#e5e7eb",
                                    borderColor: state.isFocused
                                      ? "#0f58bf"
                                      : "#e1e4e8",
                                    textAlign: "left",
                                    fontWeight: "800",
                                  }),
                                  option: (baseStyles, state) => ({
                                    ...baseStyles,
                                    textAlign: "left",
                                  }),
                                }}
                                classNamePrefix="Select Role"
                                onChange={(role) => setRole(role)}
                                value={role}
                                isDisabled={true}
                              />
                            </div>

                            {/* <div className="grid">
                    <div className="inline-block w-full">
                      <label className="block text-sm text-gray-600 text-left">
                        Profile Photo
                      </label>
                      <div
                        {...getRootProps(style)}
                        className="bg-[#e5e7eb] flex flex-col items-center p-2 h-36 justify-center border-2 rounded-sm border-[#9c9c9c] border-dashed text-[#B5B5B5] hover:border-[#8f8f8f]"
                      >
                        <input {...getInputProps()} />
                        {profilePhoto ? (
                          <Avatar
                            variant="circular"
                            alt="candice"
                            src={URL.createObjectURL(profilePhoto)}
                            placeholder={undefined}
                            size="xxl"
                            className="object-fill"
                          />
                        ) : (
                          // <img
                          //   src={URL.createObjectURL(profilePhoto)}
                          //   //   height={200}
                          //   alt="ProfilePhoto"
                          //   className="h-12 w-30 object-contain "
                          // />
                          <>
                            {isDragActive ? (
                              <p>Drop the files here ...</p>
                            ) : (
                              <p>Click to select files</p>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                    <div className="inline-block ml-1">
                      <label className="block text-sm text-gray-600 text-left">
                        Documents(Max 3 Files)
                      </label>
                      <div
                        {...getRootDocumentsProps(style)}
                        className="bg-[#e5e7eb] flex flex-col items-center justify-center p-2 h-36  border-2 rounded-sm border-[#9c9c9c] border-dashed text-[#B5B5B5] hover:border-[#8f8f8f]"
                      >
                        <input {...getInputDocumentsProps()} />
                        {isDocDragActive ? (
                          <p>Click to select files or Drop the files here ..</p>
                        ) : (
                          <p>Click to select files</p>
                        )}
                      </div>

                      <div className="flex flex-wrap flex-row w-full ">
                        {documentsFile.map((obj: any, index: any) => {
                          return (
                            <>
                              <Chip
                                open={true}
                                value={obj.name}
                                onClose={() => {
                                  const fileList = clone(documentsFile);
                                  fileList.splice(index, 1);
                                  setDocumentsFile(fileList);
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

                      <label className="block text-[12px] mt-[-5px] mb-2 text-left text-red-600 h-4">
                        {schoolImageError ? "Please select school image" : ""}
                      </label>
                    </div>
                  </div> */}
                          </form>
                        </div>
                      </div>

                      <div className="w-full lg:w-1/2 pl-0 lg:pl-2 mt-2">
                        <div className="leading-loose">
                          <form className="p-10 bg-white rounded  ">
                            <div className="inline-block w-1/2 pr-1">
                              <label className=" block text-sm text-gray-600 text-left">
                                Address1
                              </label>
                              <input
                                className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb] rounded font-bold"
                                id="address1"
                                name="address1"
                                type="text"
                                required
                                placeholder="Address Line 1"
                                aria-label="Address1"
                                value={userDetails.addressLine1}
                                disabled={true}
                              />
                            </div>
                            <div className="inline-block w-1/2 pr-1">
                              <label className="block text-sm text-gray-600 text-left">
                                Address2
                              </label>
                              <input
                                className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded font-bold"
                                id="address2"
                                name="address2"
                                type="text"
                                required
                                placeholder="Address Line 2"
                                aria-label="Address2"
                                value={userDetails.addressLine2}
                                disabled={true}
                              />
                            </div>
                            <div className="inline-block  w-1/2 pr-1 mt-2">
                              <label className="text-left text-sm block text-gray-600">
                                Area
                              </label>
                              <div className="flex flex-col">
                                <input
                                  className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded font-bold"
                                  id="area"
                                  name="area"
                                  type="text"
                                  required
                                  placeholder="Area"
                                  aria-label="Area"
                                  value={userDetails.area}
                                  disabled={true}
                                />
                              </div>
                            </div>
                            <div className="inline-block  w-1/2 pr-1">
                              <label className="text-left text-[12px] mt-[-5px]  block text-gray-600">
                                City
                              </label>
                              <div className="flex flex-col">
                                <input
                                  className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded font-bold"
                                  id="city"
                                  name="city"
                                  type="text"
                                  required
                                  placeholder="City"
                                  aria-label="City"
                                  value={userDetails.city}
                                  disabled={true}
                                />
                              </div>
                            </div>
                            <div className="inline-block  w-1/2 pr-1 mt-2">
                              <label className="text-left block text-sm text-gray-600">
                                Country
                              </label>
                              <div className="flex flex-col">
                                <input
                                  className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded font-bold"
                                  id="country"
                                  name="country"
                                  type="text"
                                  required
                                  placeholder="Country"
                                  aria-label="Country"
                                  value={country}
                                  readOnly
                                  disabled={true}
                                />
                              </div>
                            </div>
                            <div className="inline-block  -mx-1 pl-1 w-1/2">
                              <label className="text-left block text-sm text-gray-600">
                                Pincode
                              </label>
                              <div className="flex flex-col">
                                <input
                                  className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded font-bold"
                                  id="zip"
                                  name="zip"
                                  type="number"
                                  required
                                  placeholder="Pincode"
                                  aria-label="Zip"
                                  maxLength={6}
                                  value={userDetails.pinCode}
                                  disabled={true}
                                />
                              </div>
                            </div>

                            <div className="inline-block  w-1/2 pr-1 mt-2">
                              <label className="text-sm text-left block text-gray-600">
                                State
                              </label>
                              <div className="flex flex-col">
                                <input
                                  className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded font-bold"
                                  id="state"
                                  name="state"
                                  type="text"
                                  required
                                  placeholder="State"
                                  aria-label="State"
                                  value={userDetails.state}
                                  disabled={true}
                                />
                              </div>
                            </div>

                            <div className="inline-block  w-1/2 pr-1 mt-2">
                              <label className="block text-sm text-gray-600 text-left">
                                Joining Date
                              </label>
                              <div className="flex flex-col">
                                <DatePickerComponent
                                  startDate={
                                    userDetails.joiningDate
                                      ? new Date(userDetails.joiningDate)
                                      : joiningDate
                                  }
                                  maxDate={new Date()}
                                  minDate={new Date("1980-01-01")}
                                  onDateChange={(date: any) =>
                                    setJoiningDate(date)
                                  }
                                  disabled={true}
                                  className={
                                    "bg-[#e5e7eb] h-[45px] w-[100%] pl-2 rounded-sm font-bold"
                                  }
                                />
                              </div>
                            </div>

                            <div className="mt-2">
                              <label className="block text-sm text-gray-600 text-left">
                                About Staff
                              </label>
                              <textarea
                                className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded font-bold"
                                id="message"
                                name="message"
                                rows={4}
                                required
                                placeholder="About Staff"
                                aria-label="Email"
                                value={userDetails.description}
                                disabled={true}
                              ></textarea>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </main>
                </AccordionBody>
              </Accordion>

              <Accordion open={docExpand} placeholder={undefined}>
                <AccordionHeader
                  onClick={() => setDocExpand(!docExpand)}
                  placeholder={undefined}
                  className={`bg-blue-800 ${
                    docExpand ? "rounded-t-md" : "rounded"
                  } px-3 text-white`}
                >
                  Documents And Profile Photo
                </AccordionHeader>
                <AccordionBody className=" py-0">
                  <main className="w-full flex-grow">
                    <div className="flex flex-wrap">
                      <div className="w-full lg:w-1/2  pr-0 lg:pr-2 mt-2 ">
                        <div className="leading-loose">
                          <form className="p-10 bg-white rounded ">
                            <div className="grid">
                              <div className="inline-block w-full">
                                <label className="block text-sm text-gray-600 text-left">
                                  Profile Photo
                                </label>
                                <div
                                  {...getRootProps(style)}
                                  className="bg-[#e5e7eb] flex flex-col items-center p-2 h-36 justify-center border-2 rounded-sm border-[#9c9c9c] border-dashed text-[#B5B5B5] hover:border-[#8f8f8f]"
                                >
                                  <input {...getInputProps()} />
                                  {profilePhoto ? (
                                    <Avatar
                                      variant="circular"
                                      alt="candice"
                                      src={
                                        isString(profilePhoto)
                                          ? getImageURL(profilePhoto)
                                          : URL.createObjectURL(profilePhoto)
                                      }
                                      placeholder={undefined}
                                      size="xxl"
                                      className="object-fill"
                                    />
                                  ) : (
                                    <>
                                      {isDragActive ? (
                                        <p>Drop the files here ...</p>
                                      ) : (
                                        <p>Click to select files</p>
                                      )}
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                            {profilePhoto && !isString(profilePhoto) && (
                              <div className="w-full flex flex-row  justify-end">
                                <Button
                                  variant="gradient"
                                  color="blue"
                                  placeholder={"Submit"}
                                  onClick={() => onUpdateProfilePhoto()}
                                  onPointerEnterCapture={undefined}
                                  onPointerLeaveCapture={undefined}
                                  className="h-8 py-0 px-3 text-right mt-2"
                                >
                                  Update
                                </Button>
                              </div>
                            )}
                          </form>
                        </div>
                      </div>

                      <div className="w-full lg:w-1/2  pr-0 lg:pr-2 mt-2 ">
                        <div className="leading-loose">
                          <form className="p-10 bg-white rounded ">
                            <div className="grid">
                              <div className="inline-block w-full">
                                <label className="block text-sm text-gray-600 text-left">
                                  Documents
                                </label>
                                <div className="flex flex-wrap flex-row w-full ">
                                  {fileList && fileList.length > 0 ? (
                                    <>
                                      {fileList.map((obj: any, index: any) => {
                                        let name = "";
                                        if (isString(obj)) {
                                          const imageData = obj.split("|");
                                          name = imageData[2];
                                        } else {
                                          name = obj.name;
                                        }

                                        return (
                                          <>
                                            <Chip
                                              open={true}
                                              value={name}
                                              //   onClose={() => {
                                              //     const fileList =
                                              //       clone(fileList);
                                              //     fileList.splice(index, 1);
                                              //     setDocumentsFile(fileList);
                                              //   }}
                                              icon={
                                                isString(obj) ? (
                                                  <FontAwesomeIcon
                                                    icon={faFileDownload}
                                                    onClick={() => {
                                                      const imageData =
                                                        obj.split("|");

                                                      console.log(
                                                        "imageData :",
                                                        imageData
                                                      );
                                                      downloadFile({
                                                        bucketName:
                                                          imageData[0],
                                                        fileName: imageData[1],
                                                        name: name,
                                                      });
                                                    }}
                                                  />
                                                ) : null
                                              }
                                              className={`${
                                                index != 0 ? "ml-0" : ""
                                              } mt-2 mr-2 cursor-pointer hover:bg-green-900`}
                                              color="teal"
                                            />
                                          </>
                                        );
                                      })}
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </main>
                </AccordionBody>
              </Accordion>
              {userDetails.role === ROLE_TEACHER && (
                <Accordion open={schoolsExpand} placeholder={undefined}>
                  <AccordionHeader
                    onClick={() => setSchoolExpand(!schoolsExpand)}
                    placeholder={undefined}
                    className={`bg-blue-800 ${
                      schoolsExpand ? "rounded-t-md" : "rounded"
                    } px-3 text-white`}
                  >
                    Schools & Classes
                  </AccordionHeader>

                  <AccordionBody className=" py-0">
                    <main className="w-full flex-grow">
                      <div className="flex flex-wrap">
                        <form className="p-10 bg-white rounded-b-md w-full flex flex-row">
                          <div className="w-full lg:w-1/2  pr-0 lg:pr-2 mt-2  ">
                            <label className="block text-2xl text-gray-400 text-left font-bold">
                              Connectd Schools
                            </label>
                            <div className="mt-2">
                              {userDetails.schoolList.map(
                                (obj: any, index: number) => {
                                  return (
                                    <label className="block text-[15px] text-gray-600 text-left font-semibold">
                                      {`${obj.schoolName}, ${obj.branch}`}
                                    </label>
                                  );
                                }
                              )}
                            </div>
                          </div>

                          <div className="w-full lg:w-1/2  pr-0 lg:pr-2 mt-2  ">
                            <label className="block text-2xl text-gray-400 text-left font-bold">
                              Connectd Class
                              {userDetails.schoolClasses.map(
                                (obj: any, index: number) => {
                                  return (
                                    <label className="block text-[15px] text-gray-600 text-left font-semibold">
                                      {`${obj.className} (${obj.classIdentity})`}
                                    </label>
                                  );
                                }
                              )}
                            </label>
                          </div>
                        </form>

                        {/* <div className="w-full lg:w-1/2 pl-0 lg:pl-2 mt-2">
                          <div className="leading-loose">
                            <form className="p-10 bg-white rounded  ">
                              <div className="inline-block w-full pr-1 mt-2">
                                <label className="block text-sm text-gray-600 text-left">
                                  Hobbies
                                </label>
                              </div>
                            </form>
                          </div>
                        </div> */}
                      </div>
                    </main>
                  </AccordionBody>
                </Accordion>
              )}

              {userDetails.students && userDetails.students.length > 0 && (
                <Accordion open={studentExpand} placeholder={undefined}>
                  <AccordionHeader
                    onClick={() => setStudentExpand(!studentExpand)}
                    placeholder={undefined}
                    className={`bg-blue-800 ${
                      studentExpand ? "rounded-t-md" : "rounded"
                    } px-3 text-white`}
                  >
                    Your Students
                  </AccordionHeader>

                  <AccordionBody className=" py-0">
                    <main className="w-full flex-grow">
                      <div className="flex flex-wrap">
                        <div className="w-full  pr-0  ">
                          <div className="leading-loose">
                            <form className=" bg-white mb-2">
                              {userDetails.students.map(
                                (obj: any, index: number) => {
                                  const docList = getStudentDockList(obj);
                                  return (
                                    <Accordion
                                      open={index == open}
                                      placeholder={undefined}
                                    >
                                      <AccordionHeader
                                        onClick={() =>
                                          index == open
                                            ? setOpen(-1)
                                            : setOpen(index)
                                        }
                                        placeholder={undefined}
                                        className="bg-blue-gray-100 px-1 text-blue-gray-100 h-10 mt-2 "
                                      >
                                        <div className="flex flex-row items-center justify-between w-full">
                                          <div className="flex flex-row items-center">
                                            <Avatar
                                              variant="circular"
                                              alt="candice"
                                              src={getImageURL(
                                                obj.studentPhoto
                                              )}
                                              placeholder={undefined}
                                              size="sm"
                                              className="object-fill"
                                            />
                                            <div className="text-blue-gray-600 text-[16px] ml-4">
                                              {`${obj.firstName}   ${
                                                obj.lastName
                                              } - ${getRollNo(obj.roleNo)}`}
                                            </div>
                                          </div>

                                          <FontAwesomeIcon
                                            icon={
                                              index == open
                                                ? faSquareCaretDown
                                                : faSquareCaretRight
                                            }
                                          />
                                        </div>
                                      </AccordionHeader>
                                      <AccordionBody className=" py-0">
                                        <main className="w-full flex-grow">
                                          <div className="flex flex-wrap">
                                            <div className="w-full lg:w-1/2  pr-0 lg:pr-2 mt-2 ">
                                              <div className="flex flex-wrap">
                                                <form className="p-10 bg-white rounded-b-md ">
                                                  <div className="">
                                                    <div className="inline-block  w-1/2 pr-1">
                                                      <label className="block text-sm text-gray-600 text-left">
                                                        First Name
                                                      </label>
                                                      <label className="block text-sm text-gray-600 text-left font-bold">
                                                        {obj.firstName}
                                                      </label>
                                                    </div>

                                                    <div className="inline-block w-1/2 pr-1">
                                                      <label className="block text-sm text-gray-600 text-left">
                                                        Middle Name
                                                      </label>
                                                      <label className="block text-sm text-gray-600 text-left font-bold">
                                                        {obj.middleName}
                                                      </label>
                                                    </div>

                                                    <div className="inline-block w-1/2 pr-1 mt-2">
                                                      <label className="block text-sm text-gray-600 text-left">
                                                        Last Name
                                                      </label>
                                                      <label className="block text-sm text-gray-600 text-left font-bold">
                                                        {obj.lastName}
                                                      </label>
                                                    </div>

                                                    <div className="inline-block w-1/2 pr-1 mt-2">
                                                      <label className="block text-sm text-gray-600 text-left">
                                                        Class
                                                      </label>
                                                      <label className="block text-sm text-gray-600 text-left font-bold">
                                                        {`${obj.schoolClass.className} (${obj.schoolClass.classIdentity})`}
                                                      </label>
                                                    </div>

                                                    <div className="inline-block w-full pr-1 mt-2">
                                                      <label className="block text-sm text-gray-600 text-left">
                                                        School
                                                      </label>
                                                      <label className="block text-sm text-gray-600 text-left font-bold">
                                                        {`${obj.schools.schoolName}, ${obj.schools.branch}`}
                                                      </label>
                                                    </div>

                                                    <div className="inline-block w-1/2 pr-1 mt-2">
                                                      <label className="block text-sm text-gray-600 text-left">
                                                        Mother/Father Name
                                                      </label>
                                                      <label className="block text-sm text-gray-600 text-left font-bold">
                                                        {`${obj.motherName}`}
                                                      </label>
                                                    </div>

                                                    <div className="inline-block w-1/2 pr-1 mt-2">
                                                      <label className="block text-sm text-gray-600 text-left">
                                                        Guardian Name
                                                      </label>
                                                      <label className="block text-sm text-gray-600 text-left font-bold">
                                                        {`${obj.guardianName}`}
                                                      </label>
                                                    </div>

                                                    <div className="inline-block w-1/2 pr-1 mt-2">
                                                      <label className="block text-sm text-gray-600 text-left">
                                                        Blood Group
                                                      </label>
                                                      <label className="block text-sm text-gray-600 text-left font-bold">
                                                        {`${obj.bloodGroup}`}
                                                      </label>
                                                    </div>

                                                    <div className="inline-block w-1/2 pr-1 mt-2">
                                                      <label className="block text-sm text-gray-600 text-left">
                                                        Birth Date
                                                      </label>
                                                      <label className="block text-sm text-gray-600 text-left font-bold">
                                                        {`${obj.birthDate}`}
                                                      </label>
                                                    </div>

                                                    <div className="inline-block w-1/2 pr-1 mt-2">
                                                      <label className="block text-sm text-gray-600 text-left">
                                                        Joining Date
                                                      </label>
                                                      <label className="block text-sm text-gray-600 text-left font-bold">
                                                        {`${obj.joiningDate}`}
                                                      </label>
                                                    </div>

                                                    <div className="inline-block w-1/2 pr-1 mt-2">
                                                      {/* <label className="block text-sm text-gray-600 text-left">
                                                      Joining Date
                                                    </label>
                                                    <label className="block text-sm text-gray-600 text-left font-bold">
                                                      {`${obj.joiningDate}`}
                                                    </label> */}
                                                    </div>
                                                  </div>
                                                </form>
                                              </div>
                                            </div>

                                            <div className="w-full lg:w-1/2 pl-0 lg:pl-2 mt-2">
                                              <div className="leading-loose">
                                                <form className="p-10 bg-white rounded  ">
                                                  <div className="inline-block w-full pr-1 mt-2">
                                                    <label className="block text-sm text-gray-600 text-left">
                                                      Hobbies
                                                    </label>
                                                    <label className="block text-sm text-gray-600 text-left font-bold">
                                                      {`${obj.hobbies}`}
                                                    </label>
                                                  </div>

                                                  <div className="inline-block w-full pr-1 mt-2">
                                                    <label className="block text-sm text-gray-600 text-left">
                                                      Precautions need to be
                                                      taken during class
                                                    </label>
                                                    <label className="block text-sm text-gray-600 text-left font-bold">
                                                      {`${
                                                        obj.precaution
                                                          ? obj.precaution
                                                          : "NA"
                                                      }`}
                                                    </label>
                                                  </div>

                                                  <div className="inline-block w-full pr-1 mt-2">
                                                    <label className="block text-sm text-gray-600 text-left">
                                                      Medical history and
                                                      emergency tablets
                                                    </label>
                                                    <label className="block text-sm text-gray-600 text-left font-bold">
                                                      {`${
                                                        obj.medicalHistory
                                                          ? obj.medicalHistory
                                                          : "NA"
                                                      }`}
                                                    </label>
                                                  </div>

                                                  <div className="grid">
                                                    <div className="inline-block w-full">
                                                      <label className="block text-sm text-gray-600 text-left">
                                                        Documents
                                                      </label>
                                                      <div className="flex flex-wrap flex-row w-full ">
                                                        {docList &&
                                                        docList.length > 0 ? (
                                                          <>
                                                            {docList.map(
                                                              (
                                                                obj: any,
                                                                index: any
                                                              ) => {
                                                                let name = "";
                                                                if (
                                                                  isString(obj)
                                                                ) {
                                                                  const imageData =
                                                                    obj.split(
                                                                      "|"
                                                                    );
                                                                  name =
                                                                    imageData[2];
                                                                } else {
                                                                  name =
                                                                    obj.name;
                                                                }

                                                                return (
                                                                  <>
                                                                    <Chip
                                                                      open={
                                                                        true
                                                                      }
                                                                      value={
                                                                        name
                                                                      }
                                                                      //   onClose={() => {
                                                                      //     const fileList =
                                                                      //       clone(fileList);
                                                                      //     fileList.splice(index, 1);
                                                                      //     setDocumentsFile(fileList);
                                                                      //   }}
                                                                      icon={
                                                                        isString(
                                                                          obj
                                                                        ) ? (
                                                                          <FontAwesomeIcon
                                                                            icon={
                                                                              faFileDownload
                                                                            }
                                                                            onClick={() => {
                                                                              const imageData =
                                                                                obj.split(
                                                                                  "|"
                                                                                );

                                                                              console.log(
                                                                                "imageData :",
                                                                                imageData
                                                                              );
                                                                              downloadFile(
                                                                                {
                                                                                  bucketName:
                                                                                    imageData[0],
                                                                                  fileName:
                                                                                    imageData[1],
                                                                                  name: name,
                                                                                }
                                                                              );
                                                                            }}
                                                                          />
                                                                        ) : null
                                                                      }
                                                                      className={`${
                                                                        index !=
                                                                        0
                                                                          ? "ml-0"
                                                                          : ""
                                                                      } mt-2 mr-2 cursor-pointer hover:bg-green-900`}
                                                                      color="teal"
                                                                    />
                                                                  </>
                                                                );
                                                              }
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                      </div>
                                                    </div>
                                                  </div>
                                                </form>
                                              </div>
                                            </div>
                                          </div>
                                        </main>
                                      </AccordionBody>
                                    </Accordion>
                                  );
                                }
                              )}
                            </form>
                          </div>
                        </div>
                      </div>
                    </main>
                  </AccordionBody>
                </Accordion>
              )}

              <Accordion open={changePasswordOpen} placeholder={undefined}>
                <AccordionHeader
                  onClick={() => setChangePassowedOpen(!changePasswordOpen)}
                  placeholder={undefined}
                  className={`bg-blue-800 ${
                    changePasswordOpen ? "rounded-t-md" : "rounded"
                  } px-3 text-white`}
                >
                  Change Password
                </AccordionHeader>

                <AccordionBody className=" py-0">
                  <main className="w-full flex-grow">
                    <div className="flex flex-wrap">
                      <div className="w-full  pr-0  mt-2 ">
                        <div className="leading-loose">
                          <form className="p-10 bg-white rounded ">
                            <div className="inline-block  w-1/3 pr-1">
                              <label className="block text-sm text-gray-600 text-left">
                                New Password
                              </label>
                              <div className="flex flex-col">
                                <input
                                  className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded font-bold"
                                  id="newPassword"
                                  name="firstName"
                                  required
                                  placeholder="New Password"
                                  aria-label="newPassword"
                                  value={newPassword}
                                  onChange={(event) => {
                                    setNewPassword(event.target.value);
                                    setPasswordError("");
                                  }}
                                />
                              </div>
                            </div>
                            <div className="inline-block  w-1/3 pr-1">
                              <label className="block text-sm text-gray-600 text-left">
                                Confirm Password
                              </label>
                              <div className="flex flex-col">
                                <input
                                  className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded font-bold"
                                  id="confirmPassword"
                                  name="confirmPassword"
                                  required
                                  placeholder="Confirm Password"
                                  aria-label="firstName"
                                  value={confirmPassword}
                                  onChange={(event) => {
                                    setconfirmPassword(event.target.value);
                                    setPasswordError("");
                                  }}
                                />
                              </div>
                            </div>
                            <div className="inline-block  w-1/3 pr-1">
                              <label className="block text-sm text-gray-600 text-left"></label>
                              <div className="flex flex-col">
                                <Button
                                  variant="gradient"
                                  color="blue"
                                  placeholder={"Submit"}
                                  onClick={() => onUpdatePassword()}
                                  onPointerEnterCapture={undefined}
                                  onPointerLeaveCapture={undefined}
                                  className="h-11 py-0 px-3 text-center mt-2"
                                  disabled={!(newPassword && confirmPassword)}
                                >
                                  Change Password
                                </Button>
                              </div>
                            </div>
                            <div className="inline-block  w-full pr-1 mt-2 text-red-600 font-bold">
                              {passwordError}
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </main>
                </AccordionBody>
              </Accordion>
            </>
          ) : null}
        </main>
      </div>
    </ParentLayout>
  );
};

export default Profile;
