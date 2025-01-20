import ParentLayout from "../../component/app-component/Parent";
import { useDropzone } from "react-dropzone";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSchool } from "@fortawesome/free-solid-svg-icons";
import { isEmailValid, isMobileValid } from "../../utils";
import {
  updateSchool,
  resetNewSchoolDetails,
} from "../../redux/schools/schoolSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useLocation } from "react-router-dom";

const ViewEditSchool = () => {
  const location = useLocation();
  const currentObj = location.state;
  console.log("locations :::", currentObj);
  const [schooName, setSchoolName] = useState(currentObj.schoolName);
  const [schooNameError, setSchoolNameError] = useState("");
  const [aboutSchool, setAboutSchool] = useState(currentObj.aboutSchool);
  const [aboutSchoolError, setAboutSchoolError] = useState("");
  const [schoolImage, setSchoolImage] = useState("");
  const [schoolImageError, setSchoolImageError] = useState("");
  const [phone1, setPhone1] = useState(currentObj.phone1);
  const [phone1Error, setPhone1Error] = useState("");
  const [phone2, setPhone2] = useState(currentObj.phone2);
  const [phone2Error, setPhone2Error] = useState("");
  const [email, setEmail] = useState(currentObj.schoolEmail);
  const [emailError, setEmailError] = useState("");
  const [addressLine1, setAddressLine1] = useState(currentObj.addressLine1);
  const [addressLine2, setAddressLine2] = useState(currentObj.addressLine2);

  const [branch, setBranch] = useState(currentObj.branch);
  const [branchError, setBranchError] = useState("");
  const [country, setCountry] = useState("India");
  const [countryError, setCountryError] = useState("");
  const [city, setCity] = useState(currentObj.city);
  const [cityError, setCityError] = useState("");
  const [pincode, setPincode] = useState(currentObj.pinCode);
  const [pincodeError, setPincodeError] = useState("");
  const [addressError, setAddressError] = useState("");
  const dispatch = useAppDispatch();

  const { loading, error, success } = useAppSelector(
    (state: any) => state.school
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

  const resetAllData = () => {
    setSchoolName("");
    setSchoolNameError("");
    setAboutSchool("");
    setAboutSchoolError("");
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
    setBranchError("");
    setCity("");
    setCityError("");
    setPincode("");
    setPincodeError("");
  };

  const onSubmitSchool = () => {
    let isError = false;
    if (!schooName || !schooName.trim()) {
      setSchoolNameError("Please enter school name");
      isError = true;
    }

    if (!aboutSchool || !aboutSchool.trim()) {
      setAboutSchoolError("Please enter school info");
      isError = true;
    }

    // if (!schoolImage) {
    //   setSchoolImageError("Please select school Image");
    //   isError = true;
    // }

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

    if (!email || !email.trim()) {
      setEmailError("Please enter school email id");
      isError = true;
    } else if (email && !isEmailValid(email)) {
      setEmailError("Please enter valid email id");
      isError = true;
    }

    if (!branch && !branch.trim()) {
      setBranchError("Please enter school branch");
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
    if (!addressLine1 && !addressLine1.trim()) {
      setAddressError("Please enter address line 1");
      isError = true;
    }

    if (isError) {
      return;
    }
    const body = {
      id: currentObj.id,
      schoolName: schooName,
      addressLine1: addressLine1,
      addressLine2: addressLine2,
      city: city,
      branch: branch,
      state: "Maharashtra",
      country: country,
      pinCode: pincode,
      phone1: phone1,
      phone2: phone2,
      schoolEmail: email,
      aboutSchool: aboutSchool,
      active: currentObj.active,
    };

    dispatch(updateSchool(body));
  };
  return (
    <ParentLayout
      loading={loading}
      error={error}
      success={success ? "School Updated Successfully" : ""}
      onCloseSuccessAlert={() => dispatch(resetNewSchoolDetails())}
    >
      <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
        <main className="w-full flex-grow p-6">
          <span>
            <FontAwesomeIcon icon={faSchool} className="mr-2 fa-4x p-0" />
            <h1 className="w-full text-3xl text-black pb-6">School View</h1>
          </span>

          <div className="flex flex-wrap">
            <div className="w-full lg:w-1/2 my-6 pr-0 lg:pr-2 ">
              <p className="text-xl pb-6 flex items-center">
                <i className="fas fa-list mr-3"></i> School Details
              </p>
              <div className="leading-loose">
                <form className="p-10 bg-white rounded shadow-xl min-h-[470px]">
                  <div className="">
                    <label className="block text-sm text-gray-600 text-left mb-0">
                      School Name
                    </label>
                    <input
                      className="w-full px-2 py-1 text-gray-700 bg-[#e5e7eb] rounded"
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Enter school name"
                      aria-label="Name"
                      value={schooName}
                      onChange={(event) => {
                        setSchoolName(event.target.value);
                        setSchoolNameError("");
                      }}
                    />
                    <label className="block text-sm text-left text-red-600 h-4">
                      {schooNameError ? "Please Enter School Name" : ""}
                    </label>
                  </div>

                  <div className="mt-1">
                    <label className="block text-sm text-gray-600 text-left">
                      About School
                    </label>
                    <textarea
                      className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded"
                      id="message"
                      name="message"
                      rows={4}
                      required
                      placeholder="About School"
                      aria-label="Email"
                      value={aboutSchool}
                      onChange={(event) => {
                        setAboutSchool(event.target.value);
                        setAboutSchoolError("");
                      }}
                    ></textarea>
                    <label className="block text-sm text-left text-red-600 h-4 mt-[-10px]">
                      {aboutSchoolError ? "Please Enter About School Info" : ""}
                    </label>
                  </div>
                  <div className="mt-2">
                    <label className="block text-sm text-gray-600 text-left">
                      School Image
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

                    <label className="block text-sm text-left text-red-600 h-4">
                      {schoolImageError ? "Please select school image" : ""}
                    </label>
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
                <form className="p-10 bg-white rounded shadow-xl min-h-[470px]">
                  <label className="block text-sm text-left text-gray-600">
                    Phone
                  </label>
                  <div className="inline-block w-1/2 pr-1">
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
                      <div className="block text-sm text-left text-red-600 h-4">
                        {phone1Error && phone1Error}
                      </div>
                    </div>
                  </div>
                  <div className="inline-block mt-2 w-1/2 pr-1">
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
                      <div className="block text-sm text-left text-red-600 h-4">
                        {phone2Error && phone2Error}
                      </div>
                    </div>
                  </div>

                  <div className="mt-1">
                    <label className="block text-sm text-gray-600 text-left">
                      School Email
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
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-row-reverse items-end w-full mt-5">
              <Button
                variant="gradient"
                color="blue"
                placeholder={"Submit"}
                onClick={() => onSubmitSchool()}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <FontAwesomeIcon icon={faSchool} className="mr-2 fa-1x p-0" />
                Update School
              </Button>
            </div>
          </div>
        </main>
      </div>
    </ParentLayout>
  );
};

export default ViewEditSchool;
