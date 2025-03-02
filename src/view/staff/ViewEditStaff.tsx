import ParentLayout from "../../component/app-component/Parent";
import { useDropzone } from "react-dropzone";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Avatar, Button, Chip } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faDownLong,
  faFileDownload,
  faSchool,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { isEmailValid, isMobileValid } from "../../utils";
import {
  getUserRoles,
  resetUpdatedUserDetails,
  updateUser,
} from "../../redux/user/userSlice";
import Select from "react-select";

import { getSchoolsForSelection } from "../../redux/schools/schoolSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { BLOODGROUP } from "../../utils/constants";
import DatePicker from "../../component/app-component/DatePicker";
import { useLocation } from "react-router-dom";
import { clone } from "lodash";
import { downloadFile } from "../../redux/admin/adminSlice";

const ViewEditStaff = () => {
  const location = useLocation();
  const currentObj = location.state;

  const docList = [];
  if (currentObj.userDetails.doc1) {
    docList.push(currentObj.userDetails.doc1);
  }
  if (currentObj.userDetails.doc2) {
    docList.push(currentObj.userDetails.doc2);
  }
  if (currentObj.userDetails.doc3) {
    docList.push(currentObj.userDetails.doc3);
  }

  const [firstName, setFirstName] = useState(currentObj.firstName);
  const [firstNameError, setFirstNameError] = useState("");

  const [lastName, setLastName] = useState(currentObj.lastName);
  const [lastNameError, setLastNameError] = useState("");

  const [middleName, setMiddleName] = useState(currentObj.middleName);
  const [middleNameError, setMiddleNameError] = useState("");

  const [aboutStaff, setAboutStaff] = useState(
    currentObj.userDetails.description
  );
  const [aboutStaffError, setAboutStaffError] = useState("");

  const [schoolImage, setSchoolImage] = useState("");
  const [schoolImageError, setSchoolImageError] = useState("");

  const [phone1, setPhone1] = useState(currentObj.phone);
  const [phone1Error, setPhone1Error] = useState("");
  const [phone2, setPhone2] = useState(currentObj.userDetails.phone2);
  const [phone2Error, setPhone2Error] = useState("");

  const [email, setEmail] = useState(currentObj.email);
  const [emailError, setEmailError] = useState("");

  const [bloodGroup, setBloodGroup] = useState<any>({
    option: currentObj.userDetails.bloodGroup,
    value: currentObj.userDetails.bloodGroup,
  });

  const tempDate = currentObj.userDetails.birthDate.substring(
    0,
    currentObj.userDetails.birthDate.indexOf("T")
  );

  const [birthDate, setBirthDate] = useState<any>(new Date(tempDate));
  const [birthDateError, setBirthDateError] = useState("");

  const [joiningDate, setJoiningDate] = useState<any>(
    new Date(currentObj.userDetails.joiningDate)
  );
  const [joiningDateError, setJoiningDateError] = useState("");

  const [addressLine1, setAddressLine1] = useState(
    currentObj.userDetails.addressLine1
  );
  const [addressLine2, setAddressLine2] = useState(
    currentObj.userDetails.addressLine2
  );

  const [state, setState] = useState(currentObj.userDetails.state);
  const [stateError, setStateError] = useState("");

  const [relativeName, setRelativeName] = useState(
    currentObj.userDetails.relativeName
  );
  const [relativeNameError, setRelativeNameError] = useState("");

  const [relativeNo, setrelativeNo] = useState(
    currentObj.userDetails.relativeNo
  );
  const [relativeNoError, setrelativeNoError] = useState("");

  const [branch, setBranch] = useState(currentObj.userDetails.area);

  const [country, setCountry] = useState("India");
  const [countryError, setCountryError] = useState("");

  const [city, setCity] = useState(currentObj.userDetails.city);
  const [cityError, setCityError] = useState("");

  const [schoolList, setSchoolList] = useState(currentObj.schoolses);
  const [schoolListError, setSchoolListError] = useState("");

  const [role, setRole] = useState<any>(currentObj.roles);
  const [roleError, setRoleError] = useState("");

  const [pincode, setPincode] = useState(currentObj.userDetails.pinCode);
  const [pincodeError, setPincodeError] = useState("");
  const [addressError, setAddressError] = useState("");

  const [requiredRoleList, setRequiredRoleList] = useState<any>([]);
  const dispatch = useAppDispatch();
  const { loading, error, success, roleList, updatedUser } = useAppSelector(
    (state: any) => state.user
  );

  const { optionSchoolList } = useAppSelector((state: any) => state.school);
  const [profilePhoto, setProfilePhoto] = useState<any>(
    currentObj.userProfilePhoto
  );
  const [documentsFile, setDocumentsFile] = useState<any>(docList);

  // console.log("Current Object ", currentObj);

  useEffect(() => {
    const requiredRoles = [];
    if (roleList && roleList.length > 0) {
      for (let i = 0; i < roleList.length; i++) {
        if (
          roleList[i].roleName !== "PARENT" &&
          roleList[i].roleName !== "STUDENT" &&
          roleList[i].roleName !== "OTHER"
        ) {
          requiredRoles.push(roleList[i]);
        }
      }
      setRequiredRoleList(requiredRoles);
    }
  }, [roleList]);

  useEffect(() => {
    dispatch(getUserRoles());
    dispatch(getSchoolsForSelection());
  }, []);

  const onDrop = useCallback((acceptedFiles: any) => {
    console.log("Profile Photo", acceptedFiles);
    var totalSizeMB = acceptedFiles[0].size / Math.pow(1024, 2);
    if (totalSizeMB > 1) {
      alert("Maximum size for file is 1MB");
    } else {
      setProfilePhoto(acceptedFiles[0]);
    }
  }, []);

  const onDropDocuments = (acceptedFiles: any) => {
    const tempFileList = clone(documentsFile);
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
    if (tempFileList.length > 3) {
      alert("You can select maximum 3 files ");
      return;
    }
    setDocumentsFile(tempFileList);
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
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
      "image/heic": [],
      "image/jfif": [],
    },
    multiple: false,
  });

  const {
    getRootProps: getRootDocumentsProps,
    getInputProps: getInputDocumentsProps,
    isDragActive: isDocDragActive,
    isFocused: isDocFocused,
    isDragAccept: isDocDragAccept,
    isDragReject: isDocDragReject,
  } = useDropzone({
    onDrop: onDropDocuments,
    multiple: true,
    maxFiles: 3,
    disabled: documentsFile.length == 3,
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

  //   useEffect(() => {
  //     if (up) {
  //       // navigate("/app/dash", { replace: true });
  //       resetAllData();
  //     }
  //   }, [newuser]);

  const onSubmitSchool = () => {
    let isError = false;

    if (!firstName && !firstName.trim()) {
      setFirstNameError("Please enter first name");
      isError = true;
    }

    if (!middleName && !middleName.trim()) {
      setMiddleNameError("Please enter middle name");
      isError = true;
    }

    if (!lastName && !lastName.trim()) {
      setLastNameError("Please enter last name");
      isError = true;
    }

    if (!email || !email.trim()) {
      setEmailError("Please enter email id");
      isError = true;
    } else if (email && !isEmailValid(email)) {
      setEmailError("Please enter valid email id");
      isError = true;
    }

    if (!phone1 || !phone1.trim()) {
      setPhone1Error("Please enter school phone number");
      isError = true;
    } else if (phone1 && !isMobileValid(phone1)) {
      setPhone1Error("Please enter valid phone number");
      isError = true;
    }
    if (phone2 && !isMobileValid(phone2)) {
      setPhone2Error("Please enter valid phone number");
      isError = true;
    }

    if (!birthDate) {
      setBirthDateError("Please enter Birth Date");
      isError = true;
    }

    if (schoolList.length === 0) {
      setSchoolListError("Please select at least one school");
      isError = true;
    }

    if (!role) {
      setRoleError("Please enter role");
      isError = true;
    }

    if (!addressLine1 && !addressLine1.trim()) {
      setAddressError("Please enter address line 1");
      isError = true;
    }

    if (!city && !city.trim()) {
      setCityError("Please enter city");
      isError = true;
    }

    if (!pincode && !pincode.trim()) {
      setPincodeError("Please enter pincode");
      isError = true;
    }

    if (!state && !state.trim()) {
      setStateError("Please enter state");
      isError = true;
    }

    if (!joiningDate && !joiningDate.trim()) {
      setJoiningDate("Please enter joining date");
      isError = true;
    }

    if (!relativeName && !relativeName.trim()) {
      setRelativeNameError("Please enter relative name");
      isError = true;
    }

    if (!relativeNo && !relativeNo.trim()) {
      setrelativeNoError("Please enter relative mobile number");
      isError = true;
    } else if (relativeNo && !isMobileValid(relativeNo)) {
      setrelativeNoError("Please enter valid relative phone number");
      isError = true;
    }

    if (!aboutStaff || !aboutStaff.trim()) {
      setAboutStaffError("Please enter about staff");
      isError = true;
    }

    if (isError) {
      return;
    }

    const schoolListIemp = schoolList.map((element: any) => element.id);

    const fileList = [];
    for (let i = 0; i < documentsFile.length; i++) {
      let fileObj: any = "";
      if (isString(documentsFile[i])) {
        fileObj = documentsFile[i];
      } else {
        fileObj = {
          type: "user-doc",
          bucket: "saras-doc",
          subtype: firstName + "_" + lastName,
          file: documentsFile[i],
        };
      }

      fileList.push(fileObj);
    }

    const body: any = {
      id: currentObj.id,
      firstName: firstName,
      lastName: lastName,
      middleName: middleName,
      email: email,
      phone: phone1,
      role: role.id,
      schools: schoolListIemp,
      userDetails: {
        addressLine1: addressLine1,
        addressLine2: addressLine2,
        city: city,
        area: branch,
        state: state,
        country: country,
        pinCode: pincode,
        phone1: phone1,
        phone2: phone2,
        description: aboutStaff,
        jobTitle: role.roleDesc,
        joiningDate: joiningDate,
        bloodGroup: bloodGroup.value,
        speciality: role.roleDesc,
        relativeName: relativeName,
        relativeNo: relativeNo,
        birthDate: birthDate,
      },
    };

    if (profilePhoto) {
      if (isString(profilePhoto)) {
        body["userProfilePhoto"] = profilePhoto;
      } else {
        body["userProfilePhoto"] = {
          type: "user-profile",
          bucket: "saras-doc",
          subtype: firstName + "_" + lastName,
          file: profilePhoto,
        };
      }
    }

    if (fileList.length > 0) {
      body["fileList"] = fileList;
    }

    dispatch(updateUser(body));
  };

  const getImageURL = (item: any) => {
    const imageData = currentObj.userProfilePhoto.split("|");
    return (
      "https://" + imageData[0] + ".s3.ap-south-1.amazonaws.com/" + imageData[1]
    );
  };

  const isString = (value: any) => {
    return typeof value === "string" || value instanceof String;
  };

  return (
    <ParentLayout
      loading={loading}
      error={error}
      success={updatedUser}
      onCloseSuccessAlert={() => dispatch(resetUpdatedUserDetails())}
      onCloseAlert={() => dispatch(resetUpdatedUserDetails())}
    >
      <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
        <main className="w-full flex-grow p-6">
          <div className="flex flex-row w-full justify-between">
            <div className="flex flex-row w-36 ">
              <a
                className="text-gray-800 hover:text-blue-600 hover:font-semibold"
                href="/app/staff"
              >
                <FontAwesomeIcon
                  icon={faAngleLeft}
                  className="mr-2 fa-1x p-0"
                />
                Staff
              </a>
            </div>

            <span>
              <FontAwesomeIcon icon={faUserPlus} className="mr-2 fa-4x p-0" />
              <h1 className="w-full text-3xl text-black ">Add New Staff</h1>
            </span>

            <div className="flex flex-row  w-36"></div>
          </div>

          <div className="flex flex-wrap">
            <div className="w-full lg:w-1/2 my-1 pr-0 lg:pr-2 mt-2 ">
              <p className="text-xl flex items-center">
                <i className="fas fa-list mr-3"></i> Personal Info
              </p>
              <div className="leading-loose">
                <form className="p-10 bg-white rounded shadow-xl min-h-[470px]">
                  <div className="">
                    <div className="inline-block mt-2 w-1/2 pr-1">
                      <label className="block text-sm text-gray-600 text-left">
                        First Name
                      </label>
                      <div className="flex flex-col">
                        <input
                          className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded"
                          id="firstName"
                          name="firstName"
                          required
                          placeholder="First Name"
                          aria-label="firstName"
                          value={firstName}
                          onChange={(event) => {
                            setFirstName(event.target.value);
                            setFirstNameError("");
                          }}
                        />
                        <div className="block text-[12px] mt-[-5px] mb-2 text-left text-red-600 h-4">
                          {firstNameError && firstNameError}
                        </div>
                      </div>
                    </div>

                    <div className="inline-block w-1/2 pr-1">
                      <label className="block text-sm text-gray-600 text-left">
                        Middle Name
                      </label>
                      <div className="flex flex-col">
                        <input
                          className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded"
                          id="middleName"
                          name="middleName"
                          required
                          placeholder="Middle Name"
                          aria-label="middleName"
                          value={middleName}
                          onChange={(event) => {
                            setMiddleName(event.target.value);
                            setMiddleNameError("");
                          }}
                        />
                        <div className="block text-[12px] mt-[-5px] mb-2 text-left text-red-600 h-4 ">
                          {middleNameError && middleNameError}
                        </div>
                      </div>
                    </div>

                    <div className="inline-block w-1/2 pr-1">
                      <label className="block text-sm text-gray-600 text-left">
                        Last Name
                      </label>
                      <div className="flex flex-col">
                        <input
                          className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded"
                          id="lastName"
                          name="lastName"
                          required
                          placeholder="Last Name"
                          aria-label="lastName"
                          value={lastName}
                          onChange={(event) => {
                            setLastName(event.target.value);
                            setLastNameError("");
                          }}
                        />
                        <div className="block text-[12px] mt-[-5px] mb-2 text-left text-red-600 h-4">
                          {lastNameError && lastNameError}
                        </div>
                      </div>
                    </div>

                    <div className="inline-block w-1/2 pr-1">
                      <label className="block text-sm text-gray-600 text-left">
                        Email
                      </label>
                      <div className="flex flex-col">
                        <input
                          className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded"
                          id="email"
                          name="email"
                          required
                          placeholder="Email Id"
                          aria-label="email"
                          value={email}
                          onChange={(event) => {
                            setEmail(event.target.value);
                            setEmailError("");
                          }}
                        />
                        <div className="block text-[12px] mt-[-5px] mb-2 text-left text-red-600 h-4">
                          {emailError && emailError}
                        </div>
                      </div>
                    </div>

                    <div className="inline-block w-1/2 pr-1">
                      <label className="block text-sm text-gray-600 text-left">
                        Primary Number
                      </label>
                      <div className="flex flex-col">
                        <input
                          className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded"
                          id="Phone1"
                          name="Phone1"
                          type="number"
                          required
                          placeholder="Phone1"
                          aria-label="Phone1"
                          value={phone1}
                          onChange={(event) => {
                            if (event.target.value.length <= 10) {
                              setPhone1(event.target.value);
                              setPhone1Error("");
                            }
                          }}
                        />
                        <div className="block text-[12px] mt-[-5px] mb-2 text-left text-red-600 h-4">
                          {phone1Error && phone1Error}
                        </div>
                      </div>
                    </div>
                    <div className="inline-block w-1/2 pr-1">
                      <label className="block text-sm text-gray-600 text-left">
                        Secondary Number
                      </label>
                      <div className="flex flex-col">
                        <input
                          className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded"
                          id="Phone2"
                          name="Phone2"
                          type="number"
                          required
                          placeholder="Phone2"
                          aria-label="Phone2"
                          value={phone2}
                          onChange={(event) => {
                            if (event.target.value.length <= 10) {
                              setPhone2(event.target.value);
                              setPhone2Error("");
                            }
                          }}
                        />
                        <div className="block text-[12px] mt-[-5px] mb-2 text-left text-red-600 h-4">
                          {phone2Error && phone2Error}
                        </div>
                      </div>
                    </div>

                    <div className="inline-block  w-1/2 pr-1">
                      <label className="block text-sm text-gray-600 text-left">
                        Blood Group
                      </label>
                      <div className="flex flex-col">
                        <Select
                          name="role"
                          placeholder="Select Blood Group"
                          options={BLOODGROUP}
                          getOptionLabel={(option: any) => option.option}
                          getOptionValue={(option) => option.value}
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
                          }}
                          classNamePrefix="Select Blood Group"
                          onChange={(event) => {
                            console.log("Bloood Group >>>>>", event);
                            setBloodGroup(event);
                          }}
                          value={bloodGroup}
                        />
                        <div className="block text-[12px] mt-[-5px] mb-2 text-left text-red-600 h-4">
                          {/* {phone2Error && phone2Error} */}
                        </div>
                      </div>
                    </div>

                    <div className="inline-block w-1/2 pr-1">
                      <label className="block text-sm text-gray-600 text-left">
                        Birth Date
                      </label>
                      <div className="flex flex-col">
                        <DatePicker
                          startDate={birthDate}
                          maxDate={new Date("2012-01-01")}
                          minDate={new Date("1980-01-01")}
                          onDateChange={(date: any) => setBirthDate(date)}
                        />
                        <div className="block text-[12px] mt-[-5px] mb-2 text-left text-red-600 h-4">
                          {birthDateError && birthDateError}
                        </div>
                      </div>
                    </div>

                    <label className="block text-sm text-gray-600 text-left mb-0">
                      Schools
                    </label>
                    <Select
                      isMulti
                      name="schools"
                      placeholder="Select Schools"
                      options={optionSchoolList}
                      getOptionLabel={(option: any) => option.schoolName}
                      getOptionValue={(option) => option.id}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          backgroundColor: "#e5e7eb",
                          borderColor: state.isFocused ? "#0f58bf" : "#e1e4e8",
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
                        setSchoolList(event);
                        if (event.length !== 0) {
                          setSchoolListError("");
                        }
                      }}
                      value={schoolList}
                    />
                    <label className="block text-sm text-left text-red-600 h-4">
                      {schoolListError && schoolListError}
                    </label>

                    <label className="block text-sm text-gray-600 text-left mb-0 mt-4">
                      Roles
                    </label>
                    <Select
                      name="role"
                      placeholder="Select User Role"
                      options={requiredRoleList}
                      getOptionLabel={(option: any) => option.roleDesc}
                      getOptionValue={(option) => option.id}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          backgroundColor: "#e5e7eb",
                          borderColor: state.isFocused ? "#0f58bf" : "#e1e4e8",
                          textAlign: "left",
                        }),
                        option: (baseStyles, state) => ({
                          ...baseStyles,
                          textAlign: "left",
                        }),
                      }}
                      classNamePrefix="Select Role"
                      onChange={(role) => setRole(role)}
                      value={role}
                    />
                    <label className="block text-sm text-left text-red-600 h-4">
                      {roleError && roleError}
                    </label>
                  </div>

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
                                ? getImageURL(currentObj)
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
                        {documentsFile && documentsFile.length > 0 ? (
                          <>
                            {documentsFile.map((obj: any, index: any) => {
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
                                    onClose={() => {
                                      const fileList = clone(documentsFile);
                                      fileList.splice(index, 1);
                                      setDocumentsFile(fileList);
                                    }}
                                    icon={
                                      isString(obj) ? (
                                        <FontAwesomeIcon
                                          icon={faFileDownload}
                                          onClick={() => {
                                            const imageData = obj.split("|");
                                            console.log(
                                              "Image Data",
                                              imageData
                                            );
                                            downloadFile({
                                              bucketName: imageData[0],
                                              fileName: imageData[1],
                                              name: name,
                                            });
                                          }}
                                        />
                                      ) : null
                                    }
                                    className={`${
                                      index != 0 ? "ml-0" : ""
                                    } mt-2 mr-2`}
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

                      <label className="block text-[12px] mt-[-5px] mb-2 text-left text-red-600 h-4">
                        {schoolImageError ? "Please select school image" : ""}
                      </label>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="w-full lg:w-1/2 pl-0 lg:pl-2 mt-2">
              <p className="text-xl flex items-center">
                <i className="fas fa-list mr-3"></i> Other Details
              </p>
              <div className="leading-loose">
                <form className="p-10 bg-white rounded shadow-xl min-h-[470px]">
                  <div className="inline-block w-1/2 pr-1">
                    <label className=" block text-sm text-gray-600 text-left">
                      Address1
                    </label>
                    <input
                      className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded"
                      id="address1"
                      name="address1"
                      type="text"
                      required
                      placeholder="Address Line 1"
                      aria-label="Address1"
                      value={addressLine1}
                      onChange={(event) => {
                        setAddressLine1(event.target.value);
                        setAddressError("");
                      }}
                    />
                    <label className="block text-sm text-left text-red-600 h-4">
                      {addressError && addressError}
                    </label>
                  </div>
                  <div className="inline-block w-1/2 pr-1">
                    <label className="block text-sm text-gray-600 text-left">
                      Address2
                    </label>
                    <input
                      className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded"
                      id="address2"
                      name="address2"
                      type="text"
                      required
                      placeholder="Address Line 2"
                      aria-label="Address2"
                      value={addressLine2}
                      onChange={(event) => {
                        setAddressLine2(event.target.value);
                      }}
                    />
                    <label className="block text-[12px] mt-[-5px] mb-2 text-left text-red-600 h-4">
                      {""}
                    </label>
                  </div>
                  <div className="inline-block  w-1/2 pr-1">
                    <label className="text-left text-sm block text-gray-600">
                      Area
                    </label>
                    <div className="flex flex-col">
                      <input
                        className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded"
                        id="area"
                        name="area"
                        type="text"
                        required
                        placeholder="Area"
                        aria-label="Area"
                        value={branch}
                        onChange={(event) => {
                          setBranch(event.target.value);
                        }}
                      />
                      <label className="block text-[12px] mt-[-5px] mb-2 text-left text-red-600 h-4">
                        {""}
                      </label>
                    </div>
                  </div>
                  <div className="inline-block  w-1/2 pr-1">
                    <label className="text-left text-[12px] mt-[-5px] mb-2 block text-gray-600">
                      City
                    </label>
                    <div className="flex flex-col">
                      <input
                        className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded"
                        id="city"
                        name="city"
                        type="text"
                        required
                        placeholder="City"
                        aria-label="City"
                        value={city}
                        onChange={(event) => {
                          setCity(event.target.value);
                          setCityError("");
                        }}
                      />
                      <label className="block text-[12px] mt-[-5px] mb-2 text-left text-red-600 h-4">
                        {cityError && cityError}
                      </label>
                    </div>
                  </div>
                  <div className="inline-block  w-1/2 pr-1">
                    <label className="text-left block text-sm text-gray-600">
                      Country
                    </label>
                    <div className="flex flex-col">
                      <input
                        className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded"
                        id="country"
                        name="country"
                        type="text"
                        required
                        placeholder="Country"
                        aria-label="Country"
                        value={country}
                        readOnly
                        onChange={(event) => {
                          setCountry(event.target.value);
                          setCountryError("");
                        }}
                      />
                      <label className="block text-[12px] mt-[-5px] mb-2 text-left text-red-600 h-4">
                        {countryError && countryError}
                      </label>
                    </div>
                  </div>
                  <div className="inline-block  -mx-1 pl-1 w-1/2">
                    <label className="text-left block text-sm text-gray-600">
                      Pincode
                    </label>
                    <div className="flex flex-col">
                      <input
                        className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded"
                        id="zip"
                        name="zip"
                        type="number"
                        required
                        placeholder="Pincode"
                        aria-label="Zip"
                        maxLength={6}
                        value={pincode}
                        onChange={(event) => {
                          setPincode(event.target.value);
                          setPincodeError("");
                        }}
                      />
                      <label className="block text-[12px] mt-[-5px] mb-2 text-left text-red-600 h-4">
                        {pincodeError && pincodeError}
                      </label>
                    </div>
                  </div>

                  <div className="inline-block  w-1/2 pr-1">
                    <label className="text-sm text-left block text-gray-600">
                      State
                    </label>
                    <div className="flex flex-col">
                      <input
                        className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded"
                        id="state"
                        name="state"
                        type="text"
                        required
                        placeholder="State"
                        aria-label="State"
                        value={state}
                        onChange={(event) => {
                          setState(event.target.value);
                          setStateError("");
                        }}
                      />
                      <label className="block text-[12px] mt-[-5px] mb-2 text-left text-red-600 h-4">
                        {cityError && cityError}
                      </label>
                    </div>
                  </div>

                  <div className="inline-block  w-1/2 pr-1">
                    <label className="block text-sm text-gray-600 text-left">
                      Joining Date
                    </label>
                    <div className="flex flex-col">
                      <DatePicker
                        startDate={joiningDate}
                        maxDate={new Date()}
                        minDate={new Date("1980-01-01")}
                        onDateChange={(date: any) => setJoiningDate(date)}
                      />
                      <div className="block text-[12px] mt-[-5px] mb-2 text-left text-red-600 h-4">
                        {joiningDateError && joiningDateError}
                      </div>
                    </div>
                  </div>

                  <div className="inline-block w-1/2 pr-1">
                    <label className="block text-sm text-gray-600 text-left">
                      Relative Name
                    </label>
                    <div className="flex flex-col">
                      <input
                        className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded"
                        id="relativename"
                        name="relativename"
                        required
                        placeholder="Relative Name"
                        aria-label="relativename"
                        value={relativeName}
                        onChange={(event) => {
                          if (event.target.value.length <= 10) {
                            setRelativeName(event.target.value);
                            setRelativeNameError("");
                          }
                        }}
                      />
                      <div className="block text-[12px] mt-[-5px] mb-2 text-left text-red-600 h-4">
                        {relativeNameError && relativeNameError}
                      </div>
                    </div>
                  </div>

                  <div className="inline-block w-1/2 pr-1">
                    <label className="block text-sm text-gray-600 text-left">
                      Relative Number
                    </label>
                    <div className="flex flex-col">
                      <input
                        className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded"
                        id="Phone1"
                        name="Phone1"
                        type="number"
                        required
                        placeholder="Relative number"
                        aria-label="Phone1"
                        value={relativeNo}
                        onChange={(event) => {
                          if (event.target.value.length <= 10) {
                            setrelativeNo(event.target.value);
                            setrelativeNoError("");
                          }
                        }}
                      />
                      <div className="block text-[12px] mt-[-5px] mb-2 text-left text-red-600 h-4">
                        {relativeNoError && relativeNoError}
                      </div>
                    </div>
                  </div>

                  <div className="mt-1">
                    <label className="block text-sm text-gray-600 text-left">
                      About Staff
                    </label>
                    <textarea
                      className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded"
                      id="message"
                      name="message"
                      rows={4}
                      required
                      placeholder="About Staff"
                      aria-label="Email"
                      value={aboutStaff}
                      onChange={(event) => {
                        setAboutStaff(event.target.value);
                        setAboutStaffError("");
                      }}
                    ></textarea>
                    <label className="block text-[12px] mt-[-5px] mb-2 text-left text-red-600 h-4 mt-[-10px]">
                      {aboutStaffError ? "Please Enter About School Info" : ""}
                    </label>
                  </div>
                  <div className="flex flex-row-reverse items-end w-full mt-1">
                    <Button
                      variant="gradient"
                      color="blue"
                      placeholder={"Submit"}
                      onClick={() => onSubmitSchool()}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      <FontAwesomeIcon
                        icon={faUserPlus}
                        className="mr-2 fa-1x p-0"
                      />
                      Update Staff
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ParentLayout>
  );
};

export default ViewEditStaff;
