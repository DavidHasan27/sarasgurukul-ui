import ParentLayout from "../../component/app-component/Parent";
import { useDropzone } from "react-dropzone";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Avatar, Button, Chip } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faFileDownload,
  faSchool,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { isEmailValid, isMobileValid } from "../../utils";

import Select from "react-select";

import { getSchoolsForSelection } from "../../redux/schools/schoolSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { BLOODGROUP, RELATIONSHIP } from "../../utils/constants";
import DatePicker from "../../component/app-component/DatePicker";
import { getClassList } from "../../redux/class/classSlice";
import OutsideClickHandler from "react-outside-click-handler";
import {
  resetNewStudent,
  updateStudentDetails,
} from "../../redux/students/studentSlice";
import { downloadFile, getSchoolYear } from "../../redux/admin/adminSlice";
import { clone, find } from "lodash";
import { useLocation } from "react-router-dom";

const ViewEditStudent = () => {
  const location = useLocation();
  const currentObj = location.state;
  console.log("Current Object ::::", currentObj);
  const firstScreen = useRef<any>();
  const secondScreen = useRef<any>();

  const [sFirstName, setSFirstName] = useState(currentObj.firstName);
  const [sFirstNameError, setSFirstNameError] = useState("");

  const [sLastName, setSLastName] = useState(currentObj.lastName);
  const [slastNameError, setSLastNameError] = useState("");

  const [smiddleName, setSMiddleName] = useState(currentObj.middleName);
  const [smiddleNameError, setSMiddleNameError] = useState("");

  const [school, setSchool] = useState<any>(currentObj.schools);
  const [schoolError, setSchoolError] = useState<any>("");

  const [classs, setClasss] = useState<any>(currentObj.schoolClass);
  const [classsError, setclasssError] = useState("");

  const [motherName, setMotherName] = useState(currentObj.motherName);
  const [motherNameError, setMotherNameError] = useState("");

  const [fatherName, setFatherName] = useState("");
  const [fatherNameError, setFatherNameError] = useState("");

  const [guardianName, setGuardianName] = useState(currentObj.guardianName);
  const [guardianNameError, setGuardianNameError] = useState("");

  const [sbloodGroup, setSBloodGroup] = useState<any>({
    option: currentObj.bloodGroup,
    value: currentObj.bloodGroup,
  });
  const [sbloodGroupError, setSbloodGroupError] = useState("");

  const [sbirthDate, setSBirthDate] = useState<any>(
    new Date(currentObj.birthDate)
  );
  const [sbirthDateError, setSBirthDateError] = useState("");

  const [sjoiningDate, setSJoiningDate] = useState<any>(new Date());
  const [sjoiningDateError, setSJoiningDateError] = useState<any>("");

  const [hobbies, setHobbies] = useState(currentObj.hobbies);
  const [hobbiesError, setHobbiesError] = useState("");

  const [precautions, setPrecautions] = useState(currentObj.precaution);
  const [precautionsError, setPrecautionsError] = useState("");

  const [medicalHistory, setMedicalHistory] = useState(
    currentObj.medicalHistory
  );
  const [medicalHistoryError, setMedicalHistoryError] = useState("");

  // Parent State
  const parentObj = currentObj.parents;

  const [firstName, setFirstName] = useState(parentObj.firstName);
  const [firstNameError, setFirstNameError] = useState("");

  const [lastName, setLastName] = useState(parentObj.lastName);
  const [lastNameError, setLastNameError] = useState("");

  const [middleName, setMiddleName] = useState(parentObj.middleName);
  const [middleNameError, setMiddleNameError] = useState("");

  const [aboutStaff, setAboutStaff] = useState(
    parentObj.userDetails.description
  );
  const [aboutStaffError, setAboutStaffError] = useState("");

  const [schoolImage, setSchoolImage] = useState("");
  const [schoolImageError, setSchoolImageError] = useState("");

  const [phone1, setPhone1] = useState(parentObj.phone);
  const [phone1Error, setPhone1Error] = useState("");
  const [phone2, setPhone2] = useState(parentObj.userDetails.phone2);
  const [phone2Error, setPhone2Error] = useState("");

  const [email, setEmail] = useState(parentObj.email);
  const [emailError, setEmailError] = useState("");

  const [bloodGroup, setBloodGroup] = useState<any>({
    option: parentObj.userDetails.bloodGroup,
    value: parentObj.userDetails.bloodGroup,
  });

  const [joiningDateError, setJoiningDateError] = useState("");

  const [addressLine1, setAddressLine1] = useState(
    parentObj.userDetails.addressLine1
  );
  const [addressLine2, setAddressLine2] = useState(
    parentObj.userDetails.addressLine2
  );

  const [state, setState] = useState(parentObj.userDetails.state);
  const [stateError, setStateError] = useState("");

  const [relativeName, setRelativeName] = useState(
    parentObj.userDetails.relativeName
  );
  const [relativeNameError, setRelativeNameError] = useState("");

  const [relativeNo, setrelativeNo] = useState(
    parentObj.userDetails.relativeNo
  );
  const [relativeNoError, setrelativeNoError] = useState("");

  const [branch, setBranch] = useState(parentObj.userDetails.area);

  const [country, setCountry] = useState("India");
  const [countryError, setCountryError] = useState("");

  const [city, setCity] = useState(parentObj.userDetails.city);
  const [cityError, setCityError] = useState("");

  const [pincode, setPincode] = useState(parentObj.userDetails.pinCode);
  const [pincodeError, setPincodeError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [joiningDate, setJoiningDate] = useState<any>(
    new Date(parentObj.userDetails.joiningDate)
  );
  const [requiredRoleList, setRequiredRoleList] = useState<any>([]);

  const [studentRelation, setStudentRelation] = useState<any>(
    RELATIONSHIP.find((obj) => obj.value === parentObj.studentRelation)
  );
  const [studentRelationError, setStudentRelationError] = useState("");

  const [schoolMenu, setSchoolMenu] = useState<any>();
  const [YearMenu, setYearMenu] = useState<any>();
  const [selectedYear, setSelectedYear] = useState<any>();

  console.log("Current Obj", currentObj);

  const [studentProfilePhoto, setStudentProfilePhoto] = useState<any>(
    currentObj.studentPhoto
  );

  const docList = [];
  if (currentObj.doc1) {
    docList.push(currentObj.doc1);
  }
  if (currentObj.doc2) {
    docList.push(currentObj.doc2);
  }
  if (currentObj.doc3) {
    docList.push(currentObj.doc3);
  }

  const parentDocList = [];
  if (currentObj.parents.userDetails.doc1) {
    parentDocList.push(currentObj.parents.userDetails.doc1);
  }
  if (currentObj.parents.userDetails.doc2) {
    parentDocList.push(currentObj.parents.userDetails.doc2);
  }
  if (currentObj.parents.userDetails.doc3) {
    parentDocList.push(currentObj.parents.userDetails.doc3);
  }

  const [studentDocuments, setStudentDocuments] = useState<any>(docList);

  const [parentProfilePhoto, setParentProfilePhoto] = useState<any>(
    currentObj.parents.userProfilePhoto
  );
  const [parentsDocuments, setParentsDocuments] = useState<any>(parentDocList);
  const dispatch = useAppDispatch();
  // const { newuser } = useAppSelector(
  //   (state: any) => state.user
  // );

  const { loading, error, success, roleList, updateStudent } = useAppSelector(
    (state: any) => state.student
  );

  const { optionSchoolList } = useAppSelector((state: any) => state.school);
  const { classList } = useAppSelector((state: any) => state.class);
  const { yearList } = useAppSelector((state: any) => state.admin);

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
    if (yearList && yearList.length > 0) {
      const studentyear = currentObj.students_Details.find(
        (obj: any) => obj.active
      );

      let year;
      if (studentyear) {
        year = find(yearList, (item: any) => item.id === studentyear.year.id);
      } else {
        year = find(yearList, (item: any) => item.active);
      }
      setSelectedYear(year);
    }
  }, [yearList]);

  useEffect(() => {
    dispatch(getSchoolsForSelection());
    dispatch(getSchoolYear());
  }, []);
  const onDrop = useCallback((acceptedFiles: any) => {
    console.log("Profile Photo", acceptedFiles);
    var totalSizeMB = acceptedFiles[0].size / Math.pow(1024, 2);
    if (totalSizeMB > 1) {
      alert("Maximum size for file is 1MB");
    } else {
      setStudentProfilePhoto(acceptedFiles[0]);
    }
  }, []);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop });

  const onParentProfilePhotoDrop = useCallback((acceptedFiles: any) => {
    console.log("Profile Photo", acceptedFiles);
    var totalSizeMB = acceptedFiles[0].size / Math.pow(1024, 2);
    if (totalSizeMB > 1) {
      alert("Maximum size for file is 1MB");
    } else {
      setParentProfilePhoto(acceptedFiles[0]);
    }
  }, []);
  const {
    getRootProps: getRootParentPhotoProps,
    getInputProps: getInputParentPhotoProps,
    isDragActive: isParentPhotoDragActive,
    isFocused: isParentPhotoFocused,
    isDragAccept: isParentPhotoAccept,
    isDragReject: isParentPhotoDragReject,
  } = useDropzone({ onDrop: onParentProfilePhotoDrop });

  const onDropDocuments = (acceptedFiles: any) => {
    const tempFileList = clone(studentDocuments);
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
    setStudentDocuments(tempFileList);
  };
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
    disabled: studentDocuments.length == 3,
  });

  const onParentDropDocuments = (acceptedFiles: any) => {
    const tempFileList = clone(parentsDocuments);
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
    setParentsDocuments(tempFileList);
  };
  const {
    getRootProps: getRootParentDocumentsProps,
    getInputProps: getInputParentDocumentsProps,
    isDragActive: isParentDocDragActive,
    isFocused: isParentDocFocused,
    isDragAccept: isParentDocDragAccept,
    isDragReject: isParentDocDragReject,
  } = useDropzone({
    onDrop: onParentDropDocuments,
    multiple: true,
    maxFiles: 3,
    disabled: parentsDocuments.length == 3,
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
    if (updateStudent) {
      // navigate("/app/dash", { replace: true });
      // resetAllData();
    }
  }, [updateStudent]);

  const resetAllData = () => {
    setFirstName("");
    setFirstNameError("");
    setLastName("");
    setLastNameError("");
    setMiddleName("");
    setMiddleNameError("");
    setAboutStaff("");
    setAboutStaffError("");
    setPhone1("");
    setPhone1Error("");
    setPhone2("");
    setPhone2Error("");
    setEmail("");
    setEmailError("");
    setAddressLine1("");
    setAddressLine2("");
    setAddressError("");
    setBranch("");
    setCity("");
    setCityError("");
    setPincode("");
    setPincodeError("");
    setRelativeName("");
    setRelativeNameError("");
    setBloodGroup("");
    setrelativeNo("");
    setrelativeNoError("");
    setState("");
    setStateError("");
    setJoiningDate("");
    setJoiningDateError("");
    setSchoolError("");
    setBloodGroup(null);
    setSchool("");
    setClasss("");
    setSBirthDate(null);
    setSFirstName("");
    setSMiddleName("");
    setSLastName("");
    setHobbies("");
    setSbloodGroupError("");
    setSBloodGroup("");
    setSJoiningDate(null);
    setPrecautions("");
    setMedicalHistory("");
    setMotherName("");
    setFatherName("");
    setGuardianName("");
    setStudentRelation("");
    setStudentRelationError("");
  };

  const onSubmitStudent = () => {
    let isError = false;

    let firstScreenError = false;

    if (!school) {
      setSchoolError("Please select school");
      firstScreenError = true;
    }

    if (!classs) {
      setclasssError("Please select class");
      firstScreenError = true;
    }

    if (firstScreenError) {
      firstScreen.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "start",
      });
      return;
    }

    if (!sFirstName || !sFirstName.trim()) {
      setSFirstNameError("Please enter student first name");
      firstScreenError = true;
    }

    if (!smiddleName || !smiddleName.trim()) {
      setSMiddleNameError("Please enter student middle name");
      firstScreenError = true;
    }

    if (!sLastName || !sLastName.trim()) {
      setSLastNameError("Please enter student last name");
      firstScreenError = true;
    }

    if (!motherName && !guardianName) {
      setMotherNameError("Please enter at least one parent name");
      firstScreenError = true;
    }

    if (!sbirthDate) {
      setSBirthDateError("Please enter student birth date");
      firstScreenError = true;
    }

    if (!sbloodGroup) {
      setSbloodGroupError("Please select student blood group");
      firstScreenError = true;
    }

    if (firstScreenError) {
      firstScreen.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "start",
      });
      return;
    }

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
      secondScreen.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "start",
      });
      return;
    }

    // if (!schoolImage) {
    //   setSchoolImageError("Please select school Image");
    //   isError = true;
    // }

    if (isError || firstScreenError) {
      return;
    }

    // const schoolListIemp = school.map((element: any) => element.id);

    const studentfileList = [];
    for (let i = 0; i < studentDocuments.length; i++) {
      let fileObj: any = "";
      if (isString(studentDocuments[i])) {
        fileObj = studentDocuments[i];
      } else {
        fileObj = {
          type: "student-doc",
          bucket: "saras-doc",
          subtype: sFirstName + "_" + sLastName,
          file: studentDocuments[i],
        };
      }
      studentfileList.push(fileObj);
    }

    const parentFileList = [];
    for (let i = 0; i < parentsDocuments.length; i++) {
      let fileObj: any = "";
      if (isString(parentsDocuments[i])) {
        fileObj = parentsDocuments[i];
      } else {
        fileObj = {
          type: "parent-doc",
          bucket: "saras-doc",
          subtype: firstName + "_" + lastName,
          file: parentsDocuments[i],
        };
      }
      parentFileList.push(fileObj);
    }

    const studentBody: any = {
      id: currentObj.id,
      firstName: sFirstName,
      middleName: smiddleName,
      lastName: sLastName,
      joiningDate: sjoiningDate,
      birthDate: sbirthDate,
      bloodGroup: sbloodGroup.value,
      studentPhoto: "",
      hobbies: hobbies ? hobbies : null,
      motherName: motherName ? motherName : null,
      fatherName: fatherName ? fatherName : null,
      guardianName: guardianName ? guardianName : null,
      birthCertificate: null,
      adharCard: null,
      otherDoc: null,
      classId: classs.id,
      schoolId: school.id,
      precaution: precautions ? precautions : null,
      medicalHistory: medicalHistory ? medicalHistory : null,
      yearId: selectedYear.id,
      parents: {
        id: parentObj.id,
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        email: email,
        phone: phone1,
        userProfilePhoto: null,
        studentRelation: studentRelation.value,
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
        relativeName: relativeName,
        relativeNo: relativeNo,
        bloodGroup: bloodGroup ? bloodGroup.value : null,
      },
    };

    studentBody["studentFileList"] = studentfileList;
    studentBody["parentFileList"] = parentFileList;

    if (studentProfilePhoto) {
      if (isString(studentProfilePhoto)) {
        studentBody["studentPhoto"] = studentProfilePhoto;
      } else {
        studentBody["studentPhoto"] = {
          type: "user-profile",
          bucket: "saras-doc",
          subtype: sFirstName + "_" + sLastName,
          file: studentProfilePhoto,
        };
      }
    }

    if (parentProfilePhoto) {
      if (isString(parentProfilePhoto)) {
        studentBody.parents["userProfilePhoto"] = parentProfilePhoto;
      } else {
        studentBody.parents["userProfilePhoto"] = {
          type: "user-profile",
          bucket: "saras-doc",
          subtype: firstName + "_" + lastName,
          file: parentProfilePhoto,
        };
      }
    }

    dispatch(updateStudentDetails(studentBody));
  };
  const isString = (value: any) => {
    return typeof value === "string" || value instanceof String;
  };

  const getImageURL = (item: any) => {
    const imageData = item.split("|");
    return (
      "https://" + imageData[0] + ".s3.ap-south-1.amazonaws.com/" + imageData[1]
    );
  };

  const formatOptionLabel = ({ value, label }: any) => {
    return (
      <div
        className="flex flex-col text-left px-3 border-b-[1px] border-gray-400 "
        onClick={() => {
          if (!school || school.id !== value.id) {
            setSchool(value);
            setSchoolError("");
            // setPageIndex(1);
            setClasss(null);
            dispatch(getClassList({ active: true, schoolId: value.id }));
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
      success={updateStudent ? "Student updated successfully" : ""}
      onCloseSuccessAlert={() => dispatch(resetNewStudent())}
      onCloseAlert={() => dispatch(resetNewStudent())}
    >
      <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
        <main className="w-full flex-grow p-6">
          <div className="flex flex-row w-full justify-between">
            <div className="flex flex-row w-24 ">
              <a
                className="text-gray-800 hover:text-blue-600 hover:font-semibold"
                href="/app/students"
              >
                <FontAwesomeIcon
                  icon={faAngleLeft}
                  className="mr-2 fa-1x p-0"
                />
                Students
              </a>
            </div>
            <span>
              <FontAwesomeIcon icon={faUserPlus} className="mr-2 fa-4x p-0" />
              <h1 className="w-full text-3xl text-black ">Update Student</h1>
            </span>
            <div className="flex flex-row  w-24"></div>
          </div>

          <div className="flex flex-wrap">
            <div className="w-full lg:w-1/2 my-1 pr-0 lg:pr-2 mt-2 ">
              <p className="text-xl flex items-center" ref={firstScreen}>
                <i className="fas fa-list mr-3"></i> Student Info
              </p>
              <div className="leading-loose">
                <form className="p-10 bg-white rounded shadow-xl min-h-[470px]">
                  <div className="">
                    <div className="inline-block mt-2 w-1/2 pr-1">
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
                          isDisabled={true}
                        />
                      </OutsideClickHandler>
                      <label className="block text-sm text-left text-red-600 h-4">
                        {schoolError ? schoolError : ""}
                      </label>
                    </div>

                    <div className="inline-block mt-2 w-1/2 pr-1">
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
                            setSchool(event);
                            setClasss(null);
                            if (event.length !== 0) {
                              setSchoolError("");
                            }
                          }}
                          value={school}
                          components={{ Option: formatOptionLabel }}
                          menuIsOpen={schoolMenu}
                          onMenuOpen={() => setSchoolMenu(true)}
                          closeMenuOnScroll={true}
                        />
                      </OutsideClickHandler>
                      <label className="block text-sm text-left text-red-600 h-4">
                        {schoolError ? schoolError : ""}
                      </label>
                    </div>

                    <div className="inline-block mt-2 w-1/2 pr-1">
                      <label className="block text-sm text-gray-600 text-left mb-0">
                        Class
                      </label>

                      <Select
                        name="classs"
                        placeholder="Select Class"
                        options={classList ? classList.content : []}
                        getOptionLabel={(option: any) => option.className}
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
                          // multiValue: (styles, { data }) => {
                          //   return {
                          //     ...styles,
                          //     backgroundColor: "white",
                          //     borderWidth: "1px",
                          //     borderColor: "black",
                          //     borderStyle: "#c4cad2",
                          //   };
                          // },
                        }}
                        classNamePrefix="Select Class"
                        onChange={(event: any) => {
                          setClasss(event);
                          if (event) {
                            setclasssError("");
                          }
                        }}
                        value={classs ? classs : ""}
                        isDisabled={!school}
                      />

                      <label className="block text-sm text-left text-red-600 h-4">
                        {classsError ? classsError : ""}
                      </label>
                    </div>

                    <div className="inline-block mt-2 w-1/2 pr-1">
                      <label className="block text-sm text-gray-600 text-left">
                        Student First Name
                      </label>
                      <div className="flex flex-col">
                        <input
                          className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded"
                          id="sfirstName"
                          name="sfirstName"
                          required
                          placeholder="Student First Name"
                          aria-label="sfirstName"
                          value={sFirstName}
                          onChange={(event) => {
                            setSFirstName(event.target.value);
                            setSFirstNameError("");
                          }}
                          disabled={!school || !classs}
                        />
                        <div className="block text-[12px] mt-[-5px] mb-2 text-left text-red-600 h-4">
                          {sFirstNameError && sFirstNameError}
                        </div>
                      </div>
                    </div>

                    <div className="inline-block w-1/2 pr-1">
                      <label className="block text-sm text-gray-600 text-left">
                        Sudent Middle Name
                      </label>
                      <div className="flex flex-col">
                        <input
                          className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded"
                          id="smiddleName"
                          name="smiddleName"
                          required
                          placeholder="Student Middle Name"
                          aria-label="smiddleName"
                          value={smiddleName}
                          onChange={(event) => {
                            setSMiddleName(event.target.value);
                            setSMiddleNameError("");
                          }}
                          disabled={!school || !classs}
                        />
                        <div className="block text-[12px] mt-[-5px] mb-2 text-left text-red-600 h-4 ">
                          {smiddleNameError && smiddleNameError}
                        </div>
                      </div>
                    </div>

                    <div className="inline-block w-1/2 pr-1">
                      <label className="block text-sm text-gray-600 text-left">
                        Student Last Name
                      </label>
                      <div className="flex flex-col">
                        <input
                          className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded"
                          id="slastName"
                          name="slastName"
                          required
                          placeholder="Student Last Name"
                          aria-label="slastName"
                          value={sLastName}
                          onChange={(event) => {
                            setSLastName(event.target.value);
                            setSLastNameError("");
                          }}
                          disabled={!school || !classs}
                        />
                        <div className="block text-[12px] mt-[-5px] mb-2 text-left text-red-600 h-4">
                          {slastNameError && slastNameError}
                        </div>
                      </div>
                    </div>

                    <div className="inline-block mt-2 w-1/2 pr-1">
                      <label className="block text-sm text-gray-600 text-left">
                        Mother/Father Name
                      </label>
                      <div className="flex flex-col">
                        <input
                          className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded"
                          id="motherName"
                          name="motherName"
                          required
                          placeholder="Mother Name"
                          aria-label="motherName"
                          value={motherName}
                          onChange={(event) => {
                            setMotherName(event.target.value);
                            setMotherNameError("");
                          }}
                          disabled={!school || !classs}
                        />
                        <div className="block text-[12px] mt-[-5px] mb-2 text-left text-red-600 h-4">
                          {motherNameError && motherNameError}
                        </div>
                      </div>
                    </div>

                    <div className="inline-block mt-2 w-1/2 pr-1">
                      <label className="block text-sm text-gray-600 text-left">
                        Guardian Name
                      </label>
                      <div className="flex flex-col">
                        <input
                          className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded"
                          id="guardianName"
                          name="guardianName"
                          required
                          placeholder="Guardian Name"
                          aria-label="guardianName"
                          value={guardianName}
                          onChange={(event) => {
                            setGuardianName(event.target.value);
                            setGuardianNameError("");
                          }}
                          disabled={!school || !classs}
                        />
                        <div className="block text-[12px] mt-[-5px] mb-2 text-left text-red-600 h-4">
                          {guardianNameError && guardianNameError}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid">
                    <div className="inline-block w-full">
                      <label className="block text-sm text-gray-600 text-left">
                        Student Photo
                      </label>
                      <div
                        {...getRootProps(style)}
                        className="bg-[#e5e7eb] flex flex-col items-center p-2 h-36 justify-center border-2 rounded-sm border-[#9c9c9c] border-dashed text-[#B5B5B5] hover:border-[#8f8f8f]"
                      >
                        <input {...getInputProps()} />
                        {studentProfilePhoto ? (
                          <Avatar
                            variant="circular"
                            alt="candice"
                            src={
                              isString(studentProfilePhoto)
                                ? getImageURL(studentProfilePhoto)
                                : URL.createObjectURL(studentProfilePhoto)
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
                </form>
              </div>
            </div>

            <div className="w-full lg:w-1/2 pl-0 lg:pl-2 mt-2">
              <p className="text-xl flex items-center">
                <i className="fas fa-list mr-3"></i> Student Health Info
              </p>
              <div className="leading-loose">
                <form className="p-10 bg-white rounded shadow-xl min-h-[470px]">
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
                          setSBloodGroup(event);
                          setSbloodGroupError("");
                        }}
                        value={sbloodGroup}
                        isDisabled={!school || !classs}
                      />
                      <div className="block text-[12px] mt-[-5px] mb-2 text-left text-red-600 h-4">
                        {sbloodGroupError && sbloodGroupError}
                      </div>
                    </div>
                  </div>
                  <div className="inline-block w-1/2 pr-1">
                    <label className="block text-sm text-gray-600 text-left">
                      Birth Date
                    </label>
                    <div className="flex flex-col">
                      <DatePicker
                        startDate={sbirthDate}
                        minDate={new Date("2015-01-01")}
                        onDateChange={(date: any) => setSBirthDate(date)}
                        disabled={!school || !classs}
                      />
                      <div className="block text-[12px] mt-[-5px] mb-2 text-left text-red-600 h-4">
                        {sbirthDateError && sbirthDateError}
                      </div>
                    </div>
                  </div>

                  <div className="inline-block  w-1/2 pr-1">
                    <label className="block text-sm text-gray-600 text-left">
                      Joining Date
                    </label>
                    <div className="flex flex-col">
                      <DatePicker
                        startDate={sjoiningDate}
                        maxDate={new Date()}
                        minDate={new Date("1980-01-01")}
                        onDateChange={(date: any) => setSJoiningDate(date)}
                        disabled={!school || !classs}
                      />
                      <div className="block text-[12px] mt-[-5px] mb-2 text-left text-red-600 h-4">
                        {sjoiningDateError && sjoiningDateError}
                      </div>
                    </div>
                  </div>
                  <div className="inline-block w-1/2 pr-1">
                    <label className="block text-sm text-gray-600 text-left">
                      Hobbies
                    </label>
                    <div className="flex flex-col">
                      <input
                        className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded"
                        id="hobbies"
                        name="hobbies"
                        required
                        placeholder="Student Hobbies"
                        aria-label="hobbies"
                        value={hobbies}
                        onChange={(event) => {
                          setHobbies(event.target.value);
                          setHobbiesError("");
                        }}
                        disabled={!school || !classs}
                      />
                      <div className="block text-[12px] mt-[-5px] mb-2 text-left text-red-600 h-4">
                        {hobbiesError && hobbiesError}
                      </div>
                    </div>
                  </div>

                  <div className="mt-1">
                    <label className="block text-sm text-gray-600 text-left">
                      Precautions need to be taken during class
                    </label>
                    <textarea
                      className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded"
                      id="precautions"
                      name="precautions"
                      rows={3}
                      required
                      placeholder="Precautions need to be taken during class"
                      aria-label="precautions"
                      value={precautions}
                      onChange={(event) => {
                        setPrecautions(event.target.value);
                        setPrecautionsError("");
                      }}
                      disabled={!school || !classs}
                    ></textarea>
                    <label className="block text-[12px] mt-[-5px] mb-2 text-left text-red-600 h-4 mt-[-10px]">
                      {precautionsError && precautionsError}
                    </label>
                  </div>

                  <div className="mt-1">
                    <label className="block text-sm text-gray-600 text-left">
                      Medical history and emergency tablets
                    </label>
                    <textarea
                      className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded"
                      id="medical"
                      name="medical"
                      rows={3}
                      required
                      placeholder="Medical History"
                      aria-label="medical"
                      value={medicalHistory}
                      onChange={(event) => {
                        setMedicalHistory(event.target.value);
                        setMedicalHistoryError("");
                      }}
                      disabled={!school || !classs}
                    ></textarea>
                    <label className="block text-[12px] mt-[-5px] mb-2 text-left text-red-600 h-4 mt-[-10px]">
                      {medicalHistoryError && medicalHistoryError}
                    </label>
                  </div>

                  <div className="grid mt-[-10px]">
                    <div className="inline-block ml-1">
                      <label className="block text-sm text-gray-600 text-left">
                        Documents(Max 3 Files)
                      </label>
                      <div
                        {...getRootDocumentsProps(style)}
                        className="bg-[#e5e7eb] flex flex-col items-center justify-center p-2 h-32  border-2 rounded-sm border-[#9c9c9c] border-dashed text-[#B5B5B5] hover:border-[#8f8f8f]"
                      >
                        <input {...getInputDocumentsProps()} />
                        {isDocDragActive ? (
                          <p>Click to select files or Drop the files here ..</p>
                        ) : (
                          <p>Click to select files</p>
                        )}
                      </div>

                      <div className="flex flex-wrap flex-row w-full ">
                        {studentDocuments.map((obj: any, index: any) => {
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
                                  const fileList = clone(studentDocuments);
                                  fileList.splice(index, 1);
                                  setStudentDocuments(fileList);
                                }}
                                className={`${
                                  index != 0 ? "ml-0" : ""
                                } mt-2 mr-2`}
                                color="teal"
                                icon={
                                  isString(obj) ? (
                                    <FontAwesomeIcon
                                      icon={faFileDownload}
                                      onClick={() => {
                                        const imageData = obj.split("|");
                                        console.log("Image Data", imageData);
                                        downloadFile({
                                          bucketName: imageData[0],
                                          fileName: imageData[1],
                                          name: name,
                                        });
                                      }}
                                    />
                                  ) : null
                                }
                              />
                            </>
                          );
                        })}
                      </div>

                      <label className="block text-[12px] mt-[-5px] mb-2 text-left text-red-600 h-4">
                        {schoolImageError ? "Please select school image" : ""}
                      </label>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Parent Info */}

          <div className="flex flex-wrap mt-5">
            <div className="w-full lg:w-1/2 my-1 pr-0 lg:pr-2 mt-2 ">
              <p className="text-xl flex items-center">
                <i className="fas fa-list mr-3"></i> Parents Info
              </p>
              <div className="leading-loose">
                <form className="p-10 bg-white rounded shadow-xl min-h-[470px]">
                  <div className="">
                    <div className="inline-block mt-2 w-1/2 pr-1">
                      <label
                        className="block text-sm text-gray-600 text-left"
                        ref={secondScreen}
                      >
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

                    <div className="inline-block  w-1/2 pr-1">
                      <label className="block text-sm text-gray-600 text-left">
                        Student Relationship
                      </label>
                      <div className="flex flex-col">
                        <Select
                          name="role"
                          placeholder="Select Relationship"
                          options={RELATIONSHIP}
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
                          classNamePrefix="Select Relationship"
                          onChange={(event) => {
                            setStudentRelation(event);
                            setStudentRelationError("");
                          }}
                          value={studentRelation}
                        />
                        <div className="block text-[12px] mt-[-5px] mb-2 text-left text-red-600 h-4">
                          {studentRelationError && studentRelationError}
                        </div>
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
                      rows={2}
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

                  <div className="grid">
                    <div className="inline-block w-full">
                      <label className="block text-sm text-gray-600 text-left">
                        Parent Photo
                      </label>
                      <div
                        {...getRootParentPhotoProps(style)}
                        className="bg-[#e5e7eb] flex flex-col items-center p-2 h-36 justify-center border-2 rounded-sm border-[#9c9c9c] border-dashed text-[#B5B5B5] hover:border-[#8f8f8f]"
                      >
                        <input {...getInputParentPhotoProps()} />
                        {parentProfilePhoto ? (
                          <Avatar
                            variant="circular"
                            alt="candice"
                            src={
                              isString(parentProfilePhoto)
                                ? getImageURL(parentProfilePhoto)
                                : URL.createObjectURL(parentProfilePhoto)
                            }
                            placeholder={undefined}
                            size="xxl"
                            className="object-fill"
                          />
                        ) : (
                          <>
                            {isParentPhotoDragActive ? (
                              <p>Drop the files here ...</p>
                            ) : (
                              <p>Click to select files</p>
                            )}
                          </>
                        )}
                      </div>
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

                  <div className="grid mt-[-10px]">
                    <div className="inline-block ml-1">
                      <label className="block text-sm text-gray-600 text-left">
                        Documents(Max 3 Files)
                      </label>
                      <div
                        {...getRootParentDocumentsProps(style)}
                        className="bg-[#e5e7eb] flex flex-col items-center justify-center p-2 h-32  border-2 rounded-sm border-[#9c9c9c] border-dashed text-[#B5B5B5] hover:border-[#8f8f8f]"
                      >
                        <input {...getInputParentDocumentsProps()} />
                        {isParentDocDragActive ? (
                          <p>Click to select files or Drop the files here ..</p>
                        ) : (
                          <p>Click to select files</p>
                        )}
                      </div>

                      <div className="flex flex-wrap flex-row w-full ">
                        {parentsDocuments.map((obj: any, index: any) => {
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
                                  const fileList = clone(parentsDocuments);
                                  fileList.splice(index, 1);
                                  setParentsDocuments(fileList);
                                }}
                                className={`${
                                  index != 0 ? "ml-0" : ""
                                } mt-2 mr-2`}
                                color="teal"
                                icon={
                                  isString(obj) ? (
                                    <FontAwesomeIcon
                                      icon={faFileDownload}
                                      onClick={() => {
                                        const imageData = obj.split("|");
                                        console.log("Image Data", imageData);
                                        downloadFile({
                                          bucketName: imageData[0],
                                          fileName: imageData[1],
                                          name: name,
                                        });
                                      }}
                                    />
                                  ) : null
                                }
                              />
                            </>
                          );
                        })}
                      </div>

                      <label className="block text-[12px] mt-[-5px] mb-2 text-left text-red-600 h-4">
                        {schoolImageError ? "Please select school image" : ""}
                      </label>
                    </div>
                  </div>

                  <div className="flex flex-row-reverse items-end w-full mt-4">
                    <Button
                      variant="gradient"
                      color="blue"
                      placeholder={"Submit"}
                      onClick={() => onSubmitStudent()}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      <FontAwesomeIcon
                        icon={faUserPlus}
                        className="mr-2 fa-1x p-0"
                      />
                      Update Student
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

export default ViewEditStudent;
