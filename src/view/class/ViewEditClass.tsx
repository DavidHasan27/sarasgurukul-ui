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
import { getAllFees } from "../../redux/fees/feesSlice";
import {
  resetNewClassDetails,
  updateClass,
} from "../../redux/class/classSlice";
import { useLocation } from "react-router-dom";
import OutsideClickHandler from "react-outside-click-handler";
import DatePickerComponent from "../../component/app-component/DatePicker";
import { clone } from "lodash";
import { Modal } from "react-bootstrap";

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

  const [installmentDetails, setInstallment] = useState<any>([]);
  const [feeMenu, setFeeMenu] = useState<any>();
  const [fees, setFees] = useState<any>();
  const [errorModel, setErrorModel] = useState<any>("");

  const dispatch = useAppDispatch();
  const { optionSchoolList } = useAppSelector((state: any) => state.school);
  const { feesList } = useAppSelector((state: any) => state.fees);
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
    if (
      currentObj &&
      currentObj.classFeeDetailses &&
      currentObj.classFeeDetailses.length > 0 &&
      feesList
    ) {
      const activeObj = currentObj.classFeeDetailses.find(
        (obj: any) => obj.active
      );
      const prepareClassDetails = [];
      if (activeObj) {
        if (activeObj.installment_1) {
          prepareClassDetails.push({
            installmentAmount: activeObj.installment_1,
            installmentDate: activeObj.installment1Date,
          });
        }
        if (activeObj.installment_2) {
          prepareClassDetails.push({
            installmentAmount: activeObj.installment_2,
            installmentDate: activeObj.installment2Date,
          });
        }
        if (activeObj.installment_3) {
          prepareClassDetails.push({
            installmentAmount: activeObj.installment_3,
            installmentDate: activeObj.installment3Date,
          });
        }
        if (activeObj.installment_4) {
          prepareClassDetails.push({
            installmentAmount: activeObj.installment_4,
            installmentDate: activeObj.installment4Date,
          });
        }
        if (activeObj.installment_5) {
          prepareClassDetails.push({
            installmentAmount: activeObj.installment_5,
            installmentDate: activeObj.installment5Date,
          });
        }

        const feesType = feesList.content.find(
          (obj: any) => obj.id === activeObj.schoolFeeTypes
        );
        setFees(feesType);
        setInstallment(prepareClassDetails);
      }
    }
  }, [currentObj, feesList]);

  useEffect(() => {
    dispatch(getSchoolsForSelection());
    dispatch(getUserRoles());
    dispatch(
      getAllFees({
        page: 0,
        size: 1000,
        active: true,
      })
    );
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

    let ampuntMessage = fees ? verifyInstallationAmount() : "";
    setErrorModel(ampuntMessage);
    if (ampuntMessage) {
      return;
    }

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

    let fess: any = undefined;
    const activeObj = currentObj.classFeeDetailses.find(
      (obj: any) => obj.active
    );
    if (fees) {
      fess = {
        schoolFeeTypes: fees.id,
        id: activeObj ? activeObj.id : null,
        discount: 0,
        installment_1: installmentDetails[0].installmentAmount,
        installment_2: installmentDetails[1]
          ? installmentDetails[1].installmentAmount
          : null,
        installment_3: installmentDetails[2]
          ? installmentDetails[2].installmentAmount
          : null,
        installment_4: installmentDetails[3]
          ? installmentDetails[3].installmentAmount
          : null,
        installment_5: installmentDetails[4]
          ? installmentDetails[4].installmentAmount
          : null,
        installment1Date: installmentDetails[0].installmentDate,
        installment2Date: installmentDetails[1]
          ? installmentDetails[1].installmentDate
          : null,
        installment3Date: installmentDetails[2]
          ? installmentDetails[2].installmentDate
          : null,
        installment4Date: installmentDetails[3]
          ? installmentDetails[3].installmentDate
          : null,
        installment5Date: installmentDetails[4]
          ? installmentDetails[4].installmentDate
          : null,
      };
    }

    const body: any = {
      className: className,
      classIdentity: classIdentity,
      classDesc: aboutClass,
      schools: school.id,
      id: currentObj.id,
      classFees: fess,
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

  const formateFeesOption = ({ value, label }: any) => {
    let totalFee = 0;
    for (let i = 0; i < value.schoolFeesDetail.length; i++) {
      totalFee = totalFee + parseFloat(value.schoolFeesDetail[i].feeAmount);
    }

    return (
      <div
        className="flex flex-col text-left px-3 border-b-[1px] border-gray-400 "
        onClick={() => {
          setFees(value);
          setFeeMenu(false);
        }}
      >
        <div className="text-blue-gray-900 text-[16px]"> {label}</div>
        <div className="text-gray-500 text-[12px] -mt-[14px]">
          Amount: ₹{totalFee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </div>
      </div>
    );
  };

  const onInstallmentDetailsChanged = (key: any, index: any, value: any) => {
    const details = clone(installmentDetails);
    if (key === "installmentDate") {
      value.setHours(0, 0, 0, 0);
    }
    details[index][key] = value;
    setInstallment(details);
  };

  const onInstallmentRemove = (index: any) => {
    const details = clone(installmentDetails);
    details.splice(index, 1);
    setInstallment(details);
  };

  const AddNewinstallment = () => {
    const details = clone(installmentDetails);
    const instObj = {
      installmentAmount: "",
      installmentDate: "",
      error: "",
    };
    details.push(instObj);
    setInstallment(details);
  };

  const getInstallmentString = (index: number) => {
    switch (index) {
      case 1: {
        return "1st Installment";
      }
      case 2: {
        return "2nd Installment";
      }

      case 3: {
        return "3rd Installment";
      }

      case 4: {
        return "4th Installment";
      }

      case 5: {
        return "5th Installment";
      }
    }
  };

  const verifyInstallationAmount = () => {
    // { installmentAmount: "", installmentDate: "", index: 0, error: "" },
    //Check all mandatory fields
    let installMentDateerror = "";
    for (let i = 0; i < installmentDetails.length; i++) {
      if (
        !installmentDetails[i].installmentAmount ||
        !installmentDetails[i].installmentDate
      ) {
        installMentDateerror = "All field are mandatory in fees installment";
      }
      if (!installMentDateerror) {
        break;
      }
    }
    if (installMentDateerror) {
      return installMentDateerror;
    }

    //Check duplicate dates
    const duplicateItems = isDuplicates(installmentDetails);
    console.log("Duplicate ", duplicateItems);
    if (duplicateItems && duplicateItems.length > 0) {
      return "Few dates are duplicate, Please cross check you installment dates";
    }

    // check date sequence
    const tempDetails = clone(installmentDetails);
    for (let j = 0; j < tempDetails.length; j++) {
      tempDetails[j]["index"] = j + 1;
    }
    tempDetails.sort((a: any, b: any) => a.installmentDate - b.installmentDate);
    for (let j = 0; j < tempDetails.length; j++) {
      if (tempDetails[j].index !== j + 1) {
        installMentDateerror =
          "Installment sequence and date sequence mismatch";
        break;
      }
    }

    if (installMentDateerror) {
      return installMentDateerror;
    }

    // check all fees are same compare to total fees

    let totalFee = 0;
    for (let i = 0; i < fees.schoolFeesDetail.length; i++) {
      totalFee = totalFee + parseFloat(fees.schoolFeesDetail[i].feeAmount);
    }

    let totalFeePrepared = 0;
    for (let i = 0; i < installmentDetails.length; i++) {
      totalFeePrepared =
        totalFeePrepared + parseFloat(installmentDetails[i].installmentAmount);
    }

    if (totalFeePrepared == totalFee) {
      return "";
    }

    if (totalFee < totalFeePrepared) {
      return `Total Installment amount ₹ ${totalFeePrepared
        .toString()
        .replace(
          /\B(?=(\d{3})+(?!\d))/g,
          ","
        )} is more than the assigned fee ₹ ${totalFee
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    }

    if (totalFee > totalFeePrepared) {
      return `Total Installment amount ₹ ${totalFeePrepared
        .toString()
        .replace(
          /\B(?=(\d{3})+(?!\d))/g,
          ","
        )} is less than the assigned fee ₹ ${totalFee
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    }
  };

  const isDuplicates = (arr: any) => {
    const seen = new Set();
    const duplicates: any = [];

    arr.forEach((item: any) => {
      const identifier = `${item.installmentDate}`;
      if (seen.has(identifier)) {
        duplicates.push(item);
      } else {
        seen.add(identifier);
      }
    });

    return duplicates;
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

                  <div className="mt-3">
                    <label className="block text-sm text-gray-600 text-left mb-0">
                      Fees
                    </label>
                    <OutsideClickHandler
                      onOutsideClick={() => {
                        setFeeMenu(false);
                      }}
                    >
                      <Select1
                        name="role"
                        placeholder="Select Fees"
                        options={feesList?.content ? feesList.content : []}
                        getOptionLabel={(option: any) => option.name}
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
                        value={fees}
                        components={{ Option: formateFeesOption }}
                        menuIsOpen={feeMenu}
                        onMenuOpen={() => setFeeMenu(true)}
                        closeMenuOnScroll={true}
                      />
                    </OutsideClickHandler>
                  </div>

                  {fees && (
                    <>
                      {installmentDetails.map((obj: any, index: number) => {
                        return (
                          <div className="flex flex-row">
                            <div className="w-[44%]">
                              <label className="block text-sm text-gray-600 text-left mb-0">
                                {getInstallmentString(index + 1)} Amount
                              </label>
                              <input
                                className="w-full px-2 py-1 text-gray-700 bg-[#e5e7eb] rounded"
                                id="name"
                                name="name"
                                type="text"
                                required
                                placeholder="Amount"
                                aria-label="Name"
                                value={obj.installmentAmount}
                                onChange={(event: any) => {
                                  // setClassName(event.target.value);
                                  // setClassNameError("");
                                  console.log(
                                    "event.target.value",
                                    event.target.value,
                                    isNaN(event.target.value),
                                    event.target.value.length
                                  );
                                  if (
                                    !isNaN(event.target.value) &&
                                    event.target.value.length < 8
                                  ) {
                                    onInstallmentDetailsChanged(
                                      "installmentAmount",
                                      index,
                                      event.target.value
                                    );
                                  }
                                }}
                              />
                              <label className="block text-sm text-left text-red-600 h-4">
                                {classNameError
                                  ? "Please Enter Class Name"
                                  : ""}
                              </label>
                            </div>
                            <div className=" ml-2 text-left ">
                              <label className="block text-sm text-gray-600 text-left mb-0">
                                {getInstallmentString(index + 1)} Due Date
                              </label>
                              <DatePickerComponent
                                startDate={
                                  obj.installmentDate
                                    ? new Date(obj.installmentDate)
                                    : ""
                                }
                                // maxDate={new Date("2012-01-01")}
                                minDate={new Date()}
                                onDateChange={(date: any) =>
                                  onInstallmentDetailsChanged(
                                    "installmentDate",
                                    index,
                                    date
                                  )
                                }
                                className={
                                  "bg-[#e5e7eb] h-[40px] w-[100%] pl-2 rounded-sm"
                                }
                                placeholder={"Select  Date"}
                              />
                              {/* <label className="block text-sm text-left text-red-600 h-4">
                            {classNameError ? "Please Enter Class Name" : ""}
                          </label> */}
                            </div>
                            <div className="w-[12%] ml-2 mt-[20px]">
                              <Button
                                color="blue"
                                placeholder={undefined}
                                className="h-[40px] p-0 w-full"
                                onClick={() => onInstallmentRemove(index)}
                                disabled={installmentDetails.length === 1}
                                onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        );
                      })}

                      {installmentDetails.length < 5 && (
                        <div className="w-full ml-2 text-right">
                          <Button
                            color="blue"
                            placeholder={undefined}
                            className="h-[30px] p-0 w-full w-[200px]"
                            onClick={() => AddNewinstallment()}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                          >
                            Add installment
                          </Button>
                        </div>
                      )}
                    </>
                  )}
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
                Update Class
              </Button>
            </div>
          </div>
        </main>
      </div>
      <Modal show={errorModel} onHide={() => setErrorModel("")}>
        <Modal.Header closeButton>
          <Modal.Title className="text-lg">Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorModel}</Modal.Body>
        <Modal.Footer>
          <Button
            color="red"
            className="h-[40px] w-[80px] p-0"
            onClick={() => setErrorModel("")}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </ParentLayout>
  );
};

export default ViewEditClass;
