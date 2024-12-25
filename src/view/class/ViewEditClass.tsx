import ParentLayout from "../../component/app-component/Parent";
import { useDropzone } from "react-dropzone";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSchool } from "@fortawesome/free-solid-svg-icons";
import Select1 from "react-select";
import { getSchoolsForSelection } from "../../redux/schools/schoolSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getUserForDropdown, getUserRoles } from "../../redux/user/userSlice";
import {
  resetNewClassDetails,
  updateClass,
} from "../../redux/class/classSlice";
import { useLocation } from "react-router-dom";
import OutsideClickHandler from "react-outside-click-handler";

const ViewEditClass = () => {
  const location = useLocation();
  const currentObj = location.state;
  console.log("Current Object :::", currentObj);
  const [className, setClassName] = useState(currentObj.className);
  const [classNameError, setClassNameError] = useState("");
  const [classIdentity, setClassIdentity] = useState(currentObj.classIdentity);
  const [classIdentityError, setclassIdentityError] = useState("");
  const [aboutClass, setAboutClass] = useState(currentObj.classDesc);
  const [aboutClassError, setAboutClassError] = useState("");
  const [school, setSchools] = useState<any>(currentObj.schools);
  const [schoolMenu, setSchoolMenu] = useState<any>();
  const [schoolError, setschoolError] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(
    currentObj.classTeacher ? currentObj.classTeacher : null
  );

  const dispatch = useAppDispatch();
  const { optionSchoolList } = useAppSelector((state: any) => state.school);
  const { success, error, loading } = useAppSelector(
    (state: any) => state.class
  );
  const { roleList, dropdownUserList } = useAppSelector(
    (state: any) => state.user
  );

  const onDrop = useCallback((acceptedFiles: any) => {
    // Do something with the files
  }, []);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop });

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
    height: 100,
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
    if (success) {
      // navigate("/app/dash", { replace: true });
      //   resetAllData();
    }
  }, [success]);

  useEffect(() => {
    dispatch(getSchoolsForSelection());
    dispatch(getUserRoles());
  }, []);

  const resetAllData = () => {
    setClassName("");
    setClassNameError("");
    setAboutClass("");
    setAboutClassError("");
    setClassIdentity("");
    setClassNameError("");
    setSchools(null);
    setschoolError("");
    setSelectedUser(null);
  };

  const onSubmitSchool = () => {
    let isError = false;

    if (!school) {
      setschoolError("Please select school");
      return;
    }

    if (!className || !className.trim()) {
      setClassNameError("Please enter school name");
      isError = true;
    }

    if (!aboutClass || !aboutClass.trim()) {
      setAboutClassError("Please enter about class info");
      isError = true;
    }

    if (!classIdentity || !classIdentity.trim()) {
      setclassIdentityError("Please enter class identity");
      isError = true;
    }

    if (isError) {
      return;
    }
    const body: any = {
      className: className,
      classIdentity: classIdentity,
      classDesc: aboutClass,
      schools: school.id,
      id: currentObj.id,
    };
    if (selectedUser) {
      body["classTeacher"] = selectedUser.id;
    }

    dispatch(updateClass(body));
  };

  const formatOptionLabel = ({ value, label }: any) => {
    return (
      <div
        className="flex flex-col text-left px-3 border-b-[1px] border-gray-400 "
        onClick={() => {
          if (!school || school.id !== value.id) {
            setSchools(value);
            const role = roleList.find(
              (role: any) => role.roleName === "TEACHER"
            );
            if (role) {
              const body = {
                roleId: role.id,
                schoolId: value.id,
              };
              dispatch(getUserForDropdown(body));
              setschoolError("");
            }
          }
          setSchoolMenu(false);
          setSelectedUser(null);
        }}
      >
        <div className="text-blue-gray-900 text-[16px]"> {label}</div>
        <div className="text-gray-500 text-[12px] -mt-[14px]">
          Branch: {value.branch}
        </div>
      </div>
    );
  };

  return (
    <ParentLayout
      loading={loading}
      error={error}
      success={success}
      onCloseSuccessAlert={() => dispatch(resetNewClassDetails())}
    >
      <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
        <main className="w-full flex-grow p-6">
          <span>
            <FontAwesomeIcon icon={faSchool} className="mr-2 fa-4x p-0" />
            <h1 className="w-full text-3xl text-black pb-6">Class View</h1>
          </span>

          <div className="flex flex-wrap">
            <div className="w-full lg:w-1/2 my-6 pr-0 lg:pr-2 ">
              <p className="text-xl pb-6 flex items-center">
                <i className="fas fa-list mr-3"></i> Class Details
              </p>
              <div className="leading-loose">
                <form className="p-10 bg-white rounded shadow-xl min-h-[470px]">
                  <div className="">
                    <label className="block text-sm text-gray-600 text-left mb-0">
                      School
                    </label>
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
                          }),
                          option: (baseStyles, state) => ({
                            ...baseStyles,
                            textAlign: "left",
                          }),
                        }}
                        classNamePrefix="Select School"
                        // onChange={(event) => {
                        //   console.log("Schoo Group >>>>>", event);
                        //   setSchools(event);
                        // }}
                        value={school}
                        components={{ Option: formatOptionLabel }}
                        menuIsOpen={schoolMenu}
                        onMenuOpen={() => setSchoolMenu(true)}
                        closeMenuOnScroll={true}
                      />
                    </OutsideClickHandler>

                    <div className="block text-sm text-left text-red-600 h-4">
                      {schoolError && schoolError}
                    </div>
                  </div>
                  <div className="">
                    <label className="block text-sm text-gray-600 text-left mb-0">
                      Class Name
                    </label>
                    <input
                      className="w-full px-2 py-1 text-gray-700 bg-[#e5e7eb] rounded"
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Enter school name"
                      aria-label="Name"
                      value={className}
                      onChange={(event) => {
                        setClassName(event.target.value);
                        setClassNameError("");
                      }}
                      disabled={!school}
                    />
                    <label className="block text-sm text-left text-red-600 h-4">
                      {classNameError ? "Please Enter Class Name" : ""}
                    </label>
                  </div>

                  <div className="mt-1">
                    <label className="block text-sm text-gray-600 text-left">
                      About Class
                    </label>
                    <textarea
                      className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded"
                      id="message"
                      name="message"
                      rows={4}
                      required
                      placeholder="About School"
                      aria-label="Email"
                      value={aboutClass}
                      onChange={(event) => {
                        setAboutClass(event.target.value);
                        setAboutClassError("");
                      }}
                      disabled={!school}
                    ></textarea>
                    <label className="block text-sm text-left text-red-600 h-4 mt-[-10px]">
                      {aboutClassError ? "Please Enter About Class Info" : ""}
                    </label>
                  </div>
                  <div className="mt-2">
                    <label className="block text-sm text-gray-600 text-left">
                      Class Image
                    </label>
                    <div
                      {...getRootProps(style)}
                      className="bg-[#e5e7eb] flex flex-col items-center p-5 border-2 rounded-sm border-[#9c9c9c] border-dashed text-[#B5B5B5] hover:border-[#8f8f8f]"
                    >
                      <input {...getInputProps()} />
                      {isDragActive ? (
                        <p>Drop the files here ...</p>
                      ) : (
                        <p>
                          Drag 'n' drop some files here, or click to select
                          files
                        </p>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="w-full lg:w-1/2 mt-6 pl-0 lg:pl-2">
              <p className="text-xl pb-6 flex items-center">
                <i className="fas fa-list mr-3"></i> School Contact/Location
                Info
              </p>
              <div className="leading-loose">
                <form className="p-10 bg-white rounded shadow-xl min-h-[270px]">
                  {/* <label className="block text-sm text-left text-gray-600">
                    Phone
                  </label> */}
                  <div className="">
                    <label className="block text-sm text-gray-600 text-left mb-0">
                      Class Identity
                    </label>
                    <input
                      className="w-full px-2 py-1 text-gray-700 bg-[#e5e7eb] rounded"
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Enter school name"
                      aria-label="Name"
                      value={classIdentity}
                      onChange={(event) => {
                        setClassIdentity(event.target.value);
                        setclassIdentityError("");
                      }}
                      disabled={!school}
                    />
                    <label className="block text-sm text-left text-red-600 h-4">
                      {classIdentityError ? "Please Enter Class Identity" : ""}
                    </label>
                  </div>

                  <div className="">
                    <label className="block text-sm text-gray-600 text-left mb-0">
                      Class Teacher(Optional)
                    </label>
                    <Select1
                      name="user"
                      placeholder="Select Teacher"
                      options={dropdownUserList}
                      getOptionLabel={(option: any) =>
                        option.firstName + " " + option.lastName
                      }
                      getOptionValue={(option) => option}
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
                      classNamePrefix="Select Blood Group"
                      onChange={(event) => {
                        setSelectedUser(event);
                      }}
                      value={selectedUser}
                      isDisabled={!school}
                    />
                  </div>

                  {/* <div className="mt-1">
                    <label className="block text-sm text-gray-600 text-left">
                      Class Identity
                    </label>
                    <input
                      className="w-full px-2  py-1 text-gray-700 bg-[#e5e7eb] rounded "
                      id="email"
                      name="email"
                      type="text"
                      required
                      placeholder="Your Email"
                      aria-label="Email"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                        setEmailError("");
                      }}
                    />
                    <label className="block text-sm text-left text-red-600 h-4">
                      {emailError && emailError}
                    </label>
                  </div>
                  <div className="mt-1">
                    <label className=" block text-sm text-gray-600 text-left">
                      Address
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
                  <div className="mt-2">
                    <label className="hidden block text-sm text-gray-600 text-left">
                      Address
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
                    <label className="block text-sm text-left text-red-600 h-4">
                      {""}
                    </label>
                  </div>
                  <div className="inline-block mt-2 w-1/2 pr-1">
                    <label className="hidden text-sm block text-gray-600">
                      Branch
                    </label>
                    <div className="flex flex-col">
                      <input
                        className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded"
                        id="branch"
                        name="branch"
                        type="text"
                        required
                        placeholder="Branch"
                        aria-label="Branch"
                        value={branch}
                        onChange={(event) => {
                          setBranch(event.target.value);
                          setBranchError("");
                        }}
                      />
                      <label className="block text-sm text-left text-red-600 h-4">
                        {branchError && branchError}
                      </label>
                    </div>
                  </div>
                  <div className="inline-block mt-2 w-1/2 pr-1">
                    <label className="hidden text-sm block text-gray-600">
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
                      <label className="block text-sm text-left text-red-600 h-4">
                        {cityError && cityError}
                      </label>
                    </div>
                  </div>
                  <div className="inline-block mt-2 w-1/2 pr-1">
                    <label className="hidden block text-sm text-gray-600">
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
                      <label className="block text-sm text-left text-red-600 h-4">
                        {countryError && countryError}
                      </label>
                    </div>
                  </div>
                  <div className="inline-block mt-2 -mx-1 pl-1 w-1/2">
                    <label className="hidden block text-sm text-gray-600">
                      Zip
                    </label>
                    <div className="flex flex-col">
                      <input
                        className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded"
                        id="zip"
                        name="zip"
                        type="number"
                        required
                        placeholder="Zip"
                        aria-label="Zip"
                        maxLength={6}
                        value={pincode}
                        onChange={(event) => {
                          setPincode(event.target.value);
                          setPincodeError("");
                        }}
                      />
                      <label className="block text-sm text-left text-red-600 h-4">
                        {pincodeError && pincodeError}
                      </label>
                    </div>
                  </div> */}
                </form>
              </div>
            </div>
            <div className="flex flex-row-reverse items-end w-full mt-5">
              <Button
                variant="gradient"
                color="blue"
                placeholder={"Submit"}
                onClick={() => onSubmitSchool()}
              >
                <FontAwesomeIcon icon={faSchool} className="mr-2 fa-1x p-0" />
                Update Class
              </Button>
            </div>
          </div>
        </main>
      </div>
    </ParentLayout>
  );
};

export default ViewEditClass;
