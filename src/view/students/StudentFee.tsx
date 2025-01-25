import ParentLayout from "../../component/app-component/Parent";
import { useDropzone } from "react-dropzone";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
  Checkbox,
  IconButton,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faBell,
  faChevronDown,
  faChevronRight,
  faCircleCheck,
  faCommentDollar,
  faDroplet,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import Select1 from "react-select";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { CASH_PAID_BY, CLASS_IDENTITY, LATE_FEE } from "../../utils/constants";
import DatePickerComponent from "../../component/app-component/DatePicker";
import Modal from "react-bootstrap/Modal";
import { clone } from "lodash";
import { useLocation } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import {
  getStudentClassFees,
  getStudentFeesDetails,
  resetStudentFee,
  resetUpdateFee,
  updateStudentFeesDetails,
} from "../../redux/students/studentSlice";
import moment from "moment";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import { getFormattedfee } from "../../utils";
import logoImage from "../../view/assets/sidebar_image.png";
import FeeDiscountDialog from "./FeeDiscountDialog";

const StudentFeeDetails = () => {
  const reference = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const currentObj = location.state;
  const [errorModel, setErrorModel] = useState<any>("");
  const [currentActiveFee, setCurrentActiveFee] = useState<any>();
  const [studnetInstalltionList, setStudnetInstalltionList] = useState<any>([]);
  const [printInstallment, setPrintInstallment] = useState<any>();
  const [discount, setDiscount] = useState<any>(0);
  const [discountDialog, setDiscountDialog] = useState<any>();
  const [selectedTabs, setSelectedTabs] = useState("student");

  const handleOnAfterPrint = React.useCallback(() => {
    setPrintInstallment(null);
    console.log("`onAfterPrint` called"); // tslint:disable-line no-console
  }, []);

  const printStudentFeeDetails = useReactToPrint({
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
    if (printInstallment) {
      printStudentFeeDetails();
    }
  }, [printInstallment]);

  // const printStudentFeeDetails = () => {};
  const printClassDetails = () => {};

  const dispatch = useAppDispatch();

  const { studentFee, classFee, error, loading, feesMessage } = useAppSelector(
    (state: any) => state.student
  );

  // console.log("currentObj", currentObj);
  console.log("studentFee", studentFee, currentActiveFee);
  // console.log("classFee", classFee);

  useEffect(() => {
    if (
      currentObj.schoolClass.classFeeDetailses &&
      currentObj.schoolClass.classFeeDetailses.length > 0
    ) {
      const activeObject = currentObj.schoolClass.classFeeDetailses.find(
        (obj: any) => obj.active
      );

      const activeYearsObject = currentObj.students_Details.find(
        (obj: any) => obj.active
      );

      if (activeObject) {
        dispatch(getStudentClassFees({ id: activeObject.schoolFeeTypes }));
        setCurrentActiveFee(activeObject);
      }
      if (activeYearsObject) {
        dispatch(getStudentFeesDetails({ yearId: activeYearsObject.id }));
      }
    }
  }, [currentObj]);

  useEffect(() => {
    setStudentInstallmentList();
    setDiscount(studentFee && studentFee.discount ? studentFee.discount : 0);
  }, [studentFee]);

  useEffect(() => {
    setStudentInstallmentList();
  }, [discount]);

  const setStudentInstallmentList = () => {
    if (studentFee) {
      const studentFeesDetails = getInstallmentObjects(getInstallmetCount());
      setStudnetInstalltionList(studentFeesDetails);
    }
  };

  const onHeaderClick = (index: number) => {
    const details = clone(studnetInstalltionList);
    details[index].open = !details[index].open;
    setStudnetInstalltionList(details);
  };

  const onChangeStudentValue = (index: number, key: any, value: any) => {
    console.log("Key >", key);
    const details = clone(studnetInstalltionList);
    details[index].student[key] = value;
    if (key === "installment_" + (index + 1)) {
      details[index].student.errorInstllment = false;
    }

    if (key === "installment_" + (index + 1) + "_paid_By") {
      details[index].student.errorInstllmentPaidBy = false;
    }

    if (key === "installment" + (index + 1) + "DatePaid") {
      details[index].student.errorInstllmentDatePaid = false;
    }
    setStudnetInstalltionList(details);
  };

  const onSubmitInstallment = (index: number, item: any) => {
    const tempStudentList = clone(studnetInstalltionList);
    // errorInstllment: "",
    //         errorInstllmentPaidBy: "",
    //         errorInstllmentDatePaid: "",
    let isError = false;
    if (!tempStudentList[index].student["installment_" + (index + 1)]) {
      tempStudentList[index].student.errorInstllment = true;
      isError = true;
    }
    if (
      !tempStudentList[index].student["installment_" + (index + 1) + "_paid_By"]
    ) {
      tempStudentList[index].student.errorInstllmentPaidBy = true;
      isError = true;
    }

    if (
      !tempStudentList[index].student["installment" + (index + 1) + "DatePaid"]
    ) {
      tempStudentList[index].student.errorInstllmentDatePaid = true;
      isError = true;
    }

    if (isError) {
      setStudnetInstalltionList(tempStudentList);
      return;
    }

    const studenetFeeBody = clone(studentFee);
    const schoolFeesType = clone(studenetFeeBody.schoolFeeTypes);
    const newfees = item.student;
    for (var key in newfees) {
      if (studenetFeeBody.hasOwnProperty(key)) {
        studenetFeeBody[key] = newfees[key];
      }
    }
    for (var key1 in schoolFeesType) {
      if (key1 !== "id") {
        delete schoolFeesType[key1];
      }
    }
    studenetFeeBody.schoolFeeTypes = schoolFeesType;
    studenetFeeBody["studentYears"] = {
      id: studenetFeeBody["studentYears"],
    };

    studenetFeeBody.discount = discount;

    dispatch(updateStudentFeesDetails(studenetFeeBody));
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

  const getInstallmetCount = () => {
    if (currentActiveFee) {
      if (currentActiveFee.installment_5) {
        return 5;
      }
      if (currentActiveFee.installment_4) {
        return 4;
      }
      if (currentActiveFee.installment_3) {
        return 3;
      }
      if (currentActiveFee.installment_2) {
        return 2;
      }

      return 1;
    } else {
      return 0;
    }
  };

  const getDaysDiffenceAndAmount = (
    date: any,
    amount: any,
    lateFeePerDay: any,
    paidDate: any = moment()
  ) => {
    var date1 = moment(date);
    var date2 = paidDate;
    var days = date2.diff(date1, "days");
    const amountAfterDiscount: any = amount - (amount * discount) / 100;
    // console.log("** obj ** amountAfterDiscount", amountAfterDiscount, days);
    if (days > 0) {
      const lateFess = days * lateFeePerDay;
      // console.log(
      //   "** obj ** lateFess",
      //   lateFess,
      //   parseInt(amountAfterDiscount) + lateFess
      // );
      return {
        finalAmount: parseInt(amountAfterDiscount) + lateFess,
        lateFee: lateFess,
        days,
      };
    } else {
      return {
        finalAmount: amountAfterDiscount,
        lateFee: 0,
        days: 0,
      };
    }
  };

  const getInstallmentObjects = (count: number) => {
    const objList = [];
    // console.log("***currentActiveFee", studnetInstalltionList);

    if (studentFee && currentActiveFee) {
      for (let i = 1; i <= count; i++) {
        const isPaid =
          studentFee["installment_" + i + "_paid_By"] &&
          studentFee["installment" + i + "DatePaid"];

        const { finalAmount, lateFee, days } = getDaysDiffenceAndAmount(
          currentActiveFee["installment" + i + "Date"],
          currentActiveFee["installment_" + i],
          100,
          isPaid ? moment(studentFee["installment" + i + "DatePaid"]) : moment()
        );

        console.log("studentFee $$$$$ " + i, studentFee["installment_" + i]);

        const obj = {
          ["installment" + i + "Date"]:
            currentActiveFee["installment" + i + "Date"],

          ["installment_" + i]: currentActiveFee["installment_" + i],
          open:
            studnetInstalltionList[i - 1] && studnetInstalltionList[i - 1].open
              ? studnetInstalltionList[i - 1].open
              : false,

          student: {
            ["installment_" + i]: isPaid
              ? studentFee["installment_" + i]
              : finalAmount,
            ["installment_" + i + "_late_fee"]: lateFee,
            ["installment_" + i + "_paid_By"]:
              studentFee["installment_" + i + "_paid_By"],
            ["installment" + i + "DatePaid"]:
              studentFee["installment" + i + "DatePaid"],
            submit: isPaid,
            markItPaid: false,
            errorInstllment: "",
            errorInstllmentPaidBy: "",
            errorInstllmentDatePaid: "",
          },
        };
        objList.push(obj);
      }
    }
    return objList;
  };

  const getPaidAmount = () => {
    let paidAmount: any = 0;
    if (studentFee) {
      if (studentFee.installment_1_paid_By && studentFee.installment1DatePaid) {
        paidAmount = paidAmount + studentFee.installment_1;
      }

      if (studentFee.installment_2_paid_By && studentFee.installment2DatePaid) {
        paidAmount = paidAmount + studentFee.installment_2;
      }

      if (studentFee.installment_3_paid_By && studentFee.installment3DatePaid) {
        paidAmount = paidAmount + studentFee.installment_3;
      }

      if (studentFee.installment_4_paid_By && studentFee.installment4DatePaid) {
        paidAmount = paidAmount + studentFee.installment_4;
      }

      if (studentFee.installment_5_paid_By && studentFee.installment5DatePaid) {
        paidAmount = paidAmount + studentFee.installment_5;
      }
    }

    return paidAmount;
  };

  const getClassDetails = () => {
    if (classFee) {
      let total: any = 0;
      for (let i = 0; i < classFee.schoolFeesDetail.length; i++) {
        total = total + classFee.schoolFeesDetail[i].feeAmount;
      }

      total = "₹ " + total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return (
        <div className="flex flex-wrap justify-center  ">
          <form className="p-4 bg-white rounded shadow-xl min-h-[470px] w-[60%]">
            <div className="flex flex-row justify-between">
              <div></div>
              <label className="block text-2xl text-gray-900 text-center mb-0 font-extrabold mb-4 underline">
                Class Fee Details
              </label>
              <Button
                placeholder={undefined}
                className="bg-blue-700 h-[30px] p-0 w-[40px]"
                onClick={() => {
                  // console.log("Print Component ::::");
                  printStudentFeeDetails();
                }}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <FontAwesomeIcon icon={faPrint} />
              </Button>
            </div>

            <div className="flex flex-row w-full mb-2">
              <div className="flex flex-row flex-1">
                <div>
                  <div className="flex flex-row">
                    <label className="block text-sm text-gray-600 text-left mb-0 font-bold flex-row w-[100px]">
                      Fee Type :
                    </label>
                    <label className="block text-sm text-gray-600 text-left mb-0 font-medium ml-2">
                      {classFee.name}
                    </label>
                  </div>
                  <div className="flex flex-row">
                    <label className="block text-sm text-gray-600 text-left mb-0 font-bold flex-row w-[100px]">
                      Total Fees:
                    </label>
                    <label className="block text-sm text-gray-600 text-left mb-0 font-medium ml-2">
                      {total}
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex flex-row flex-1">
                <div>
                  <div className="flex flex-row">
                    <label className="block text-sm text-gray-600 text-left mb-0 font-bold flex-row w-[120px]">
                      Class :
                    </label>
                    <label className="block text-sm text-gray-600 text-left mb-0 font-medium ml-2">
                      {currentObj.schoolClass.className}(
                      {currentObj.schoolClass.classIdentity})
                    </label>
                  </div>
                  <div className="flex flex-row">
                    <label className="block text-sm text-gray-600 text-left mb-0 font-bold flex-row w-[120px]">
                      Total Installment:
                    </label>
                    <label className="block text-sm text-gray-600 text-left mb-0 font-medium ml-2">
                      {getInstallmetCount()}
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[1px] w-full bg-blue-gray-700" />
            <div className="flex flex-row w-full  justify-between ">
              <label className="block text-sm text-gray-600 text-left mb-0 font-bold flex-row w-[120px]">
                Fee Structure
              </label>
              <label className="block text-sm text-gray-600 text-right mb-0 font-bold flex-row w-[120px]">
                Amount
              </label>
            </div>
            <div className="h-[1px] w-full bg-blue-gray-700" />
            {classFee.schoolFeesDetail.map((obj: any, index: number) => {
              return (
                <div className="flex flex-row w-full  justify-between mt-2">
                  <label className="block text-sm text-gray-600 text-left mb-0 font-medium flex-row w-[60%]">
                    {obj.feeName}
                  </label>
                  <label className="block text-sm text-gray-600 text-right mb-0 font-medium flex-row w-[120px]">
                    {"₹ " +
                      obj.feeAmount
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                      "/-"}
                  </label>
                </div>
              );
            })}
            <div className="h-[1px] w-full bg-blue-gray-700 mt-2" />
            <div className="flex flex-row w-full  justify-between mt-2">
              <label className="block text-sm text-gray-600 text-left mb-0 font-bold flex-row w-[120px]">
                Total
              </label>
              <label className="block text-sm text-gray-600 text-right mb-0 font-bold flex-row w-[120px]">
                {total + "/-"}
              </label>
            </div>
            <div className="h-[1px] w-full bg-blue-gray-700 mt-2" />
            {currentActiveFee && (
              <>
                <label className="block text-xl text-gray-700 text-center mb-0 font-extrabold mt-4 underline">
                  Class installment and Deadlines
                </label>

                <div className="h-[1px] w-full bg-blue-gray-700 mt-2" />
                <div className="flex flex-row w-full  justify-between ">
                  <label className="block text-sm text-gray-600 text-left mb-0 font-bold flex-row">
                    Installments
                  </label>
                  <label className="block text-sm text-gray-600 text-center mb-0 font-bold flex-row">
                    Amount
                  </label>
                  <label className="block text-sm text-gray-600 text-right mb-0 font-bold flex-row">
                    Due Date
                  </label>
                </div>
                <div className="h-[1px] w-full bg-blue-gray-700" />

                <div className="flex flex-row w-full  justify-between mt-2">
                  <label className="block text-sm text-gray-600 text-left mb-0 font-medium flex-row">
                    1st Installment
                  </label>
                  <label className="block text-sm text-gray-600 text-center mb-0 font-medium flex-row">
                    {"₹ " +
                      currentActiveFee.installment_1
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                      "/-"}
                  </label>
                  <label className="block text-sm text-gray-600 text-right mb-0 font-medium flex-row">
                    {moment(currentActiveFee.installment1Date).format(
                      "DD MMM YYYY"
                    )}
                  </label>
                </div>

                {currentActiveFee.installment_2 && (
                  <div className="flex flex-row w-full  justify-between mt-2">
                    <label className="block text-sm text-gray-600 text-left mb-0 font-medium flex-row">
                      2nd Installment
                    </label>
                    <label className="block text-sm text-gray-600 text-center mb-0 font-medium flex-row">
                      {"₹ " +
                        currentActiveFee.installment_2
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                        "/-"}
                    </label>
                    <label className="block text-sm text-gray-600 text-right mb-0 font-medium flex-row">
                      {moment(currentActiveFee.installment2Date).format(
                        "DD MMM YYYY"
                      )}
                    </label>
                  </div>
                )}

                {currentActiveFee.installment_3 && (
                  <div className="flex flex-row w-full  justify-between mt-2">
                    <label className="block text-sm text-gray-600 text-left mb-0 font-medium flex-row">
                      3rd Installment
                    </label>
                    <label className="block text-sm text-gray-600 text-center mb-0 font-medium flex-row">
                      {"₹ " +
                        currentActiveFee.installment_3
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                        "/-"}
                    </label>
                    <label className="block text-sm text-gray-600 text-right mb-0 font-medium flex-row">
                      {/* {currentActiveFee.installment3Date} */}
                      {moment(currentActiveFee.installment3Date).format(
                        "DD MMM YYYY"
                      )}
                    </label>
                  </div>
                )}
                {currentActiveFee.installment_4 && (
                  <div className="flex flex-row w-full  justify-between mt-2">
                    <label className="block text-sm text-gray-600 text-left mb-0 font-medium flex-row">
                      4th Installment
                    </label>
                    <label className="block text-sm text-gray-600 text-center mb-0 font-medium flex-row">
                      {"₹ " +
                        currentActiveFee.installment_4
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                        "/-"}
                    </label>
                    <label className="block text-sm text-gray-600 text-right mb-0 font-medium flex-row">
                      {moment(currentActiveFee.installment4Date).format(
                        "DD MMM YYYY"
                      )}
                    </label>
                  </div>
                )}
                {currentActiveFee.installment_5 && (
                  <div className="flex flex-row w-full  justify-between mt-2">
                    <label className="block text-sm text-gray-600 text-left mb-0 font-medium flex-row">
                      5th Installment
                    </label>
                    <label className="block text-sm text-gray-600 text-center mb-0 font-medium flex-row">
                      {"₹ " +
                        currentActiveFee.installment_5
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                        "/-"}
                    </label>
                    <label className="block text-sm text-gray-600 text-right mb-0 font-medium flex-row">
                      {moment(currentActiveFee.installment5Date).format(
                        "DD MMM YYYY"
                      )}
                    </label>
                  </div>
                )}
              </>
            )}
          </form>

          <div style={{ display: "none" }}>
            <div className="min-h-[470px] w-full print-component">
              <label className=" text-5xl text-gray-400 text-center font-extrabold  origin-center rotate-45 absolute opacity-10 top-10 mt-96">
                SARA'S GURUKUL PRI PRIMARY SCHOOL
              </label>
              <form className="p-4 bg-white rounded  min-h-[470px] w-full">
                <div className="flex flex-row justify-center mb-3">
                  <img src={logoImage} className="h-[100px] text-center" />
                </div>
                <label className="block text-xl text-gray-900 text-center mb-0 font-extrabold mb-0 ">
                  SARA'S GURUKUL PRI PRIMARY SCHOOL
                </label>
                <label className="block text-lg text-gray-700 text-center mb-0 font-bold mb-4 ">
                  {currentObj?.schoolClass?.schools.branch}
                </label>
                <label className="block text-2xl text-gray-900 text-center mb-0 font-extrabold mb-4 underline">
                  Class Fee Details
                </label>
                <div className="flex flex-row w-full mb-2">
                  <div className="flex flex-row flex-1">
                    <div>
                      <div className="flex flex-row">
                        <label className="block text-base text-gray-600 text-left mb-0 font-bold flex-row w-[100px]">
                          Fee Type :
                        </label>
                        <label className="block text-base text-gray-600 text-left mb-0 font-medium ml-2">
                          {classFee.name}
                        </label>
                      </div>
                      <div className="flex flex-row">
                        <label className="block text-base text-gray-600 text-left mb-0 font-bold flex-row w-[100px]">
                          Total Fees:
                        </label>
                        <label className="block text-base text-gray-600 text-left mb-0 font-medium ml-2">
                          {total}
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row flex-1">
                    <div>
                      <div className="flex flex-row">
                        <label className="block text-base text-gray-600 text-left mb-0 font-bold flex-row w-[140px]">
                          Class :
                        </label>
                        <label className="block text-base text-gray-600 text-left mb-0 font-medium ml-2">
                          {currentObj.schoolClass.className}(
                          {currentObj.schoolClass.classIdentity})
                        </label>
                      </div>
                      <div className="flex flex-row">
                        <label className="block text-base text-gray-600 text-left mb-0 font-bold flex-row w-[140px]">
                          Total Installment:
                        </label>
                        <label className="block text-base text-gray-600 text-left mb-0 font-medium ml-2">
                          {getInstallmetCount()}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-[1px] w-full bg-blue-gray-700" />
                <div className="flex flex-row w-full  justify-between ">
                  <label className="block text-base text-gray-600 text-left mb-0 font-bold flex-row w-[120px]">
                    Fee Structure
                  </label>
                  <label className="block text-base text-gray-600 text-right mb-0 font-bold flex-row w-[120px]">
                    Amount
                  </label>
                </div>
                <div className="h-[1px] w-full bg-blue-gray-700" />
                {classFee.schoolFeesDetail.map((obj: any, index: number) => {
                  return (
                    <div className="flex flex-row w-full  justify-between mt-2">
                      <label className="block text-base text-gray-600 text-left mb-0 font-medium flex-row w-[60%]">
                        {obj.feeName}
                      </label>
                      <label className="block text-base text-gray-600 text-right mb-0 font-medium flex-row w-[120px]">
                        {"₹ " +
                          obj.feeAmount
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                          "/-"}
                      </label>
                    </div>
                  );
                })}
                <div className="h-[1px] w-full bg-blue-gray-700 mt-2" />
                <div className="flex flex-row w-full  justify-between mt-2">
                  <label className="block text-base text-gray-600 text-left mb-0 font-bold flex-row w-[120px]">
                    Total
                  </label>
                  <label className="block text-base text-gray-600 text-right mb-0 font-bold flex-row w-[120px]">
                    {total + "/-"}
                  </label>
                </div>
                <div className="h-[1px] w-full bg-blue-gray-700 mt-2" />
                {currentActiveFee && (
                  <>
                    <label className="block text-xl text-gray-700 text-center mb-0 font-extrabold mt-4 underline">
                      Class installment and Deadlines
                    </label>

                    <div className="h-[1px] w-full bg-blue-gray-700 mt-2" />
                    <div className="flex flex-row w-full  justify-between ">
                      <label className="block text-base text-gray-600 text-left mb-0 font-bold flex-row">
                        Installments
                      </label>
                      <label className="block text-base text-gray-600 text-center mb-0 font-bold flex-row">
                        Amount
                      </label>
                      <label className="block text-base text-gray-600 text-right mb-0 font-bold flex-row">
                        Due Date
                      </label>
                    </div>
                    <div className="h-[1px] w-full bg-blue-gray-700" />

                    <div className="flex flex-row w-full  justify-between mt-3">
                      <label className="block text-base text-gray-600 text-left mb-0 font-medium flex-row">
                        1st Installment
                      </label>
                      <label className="block text-base text-gray-600 text-center mb-0 font-medium flex-row">
                        {"₹ " +
                          currentActiveFee.installment_1
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                          "/-"}
                      </label>
                      <label className="block text-base text-gray-600 text-right mb-0 font-medium flex-row">
                        {moment(currentActiveFee.installment1Date).format(
                          "DD MMM YYYY"
                        )}
                      </label>
                    </div>

                    {currentActiveFee.installment_2 && (
                      <div className="flex flex-row w-full  justify-between mt-3">
                        <label className="block text-base text-gray-600 text-left mb-0 font-medium flex-row">
                          2nd Installment
                        </label>
                        <label className="block text-base text-gray-600 text-center mb-0 font-medium flex-row">
                          {"₹ " +
                            currentActiveFee.installment_2
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                            "/-"}
                        </label>
                        <label className="block text-base text-gray-600 text-right mb-0 font-medium flex-row">
                          {moment(currentActiveFee.installment2Date).format(
                            "DD MMM YYYY"
                          )}
                        </label>
                      </div>
                    )}

                    {currentActiveFee.installment_3 && (
                      <div className="flex flex-row w-full  justify-between mt-3">
                        <label className="block text-base text-gray-600 text-left mb-0 font-medium flex-row">
                          3rd Installment
                        </label>
                        <label className="block text-base text-gray-600 text-center mb-0 font-medium flex-row">
                          {"₹ " +
                            currentActiveFee.installment_3
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                            "/-"}
                        </label>
                        <label className="block text-base text-gray-600 text-right mb-0 font-medium flex-row">
                          {/* {currentActiveFee.installment3Date} */}
                          {moment(currentActiveFee.installment3Date).format(
                            "DD MMM YYYY"
                          )}
                        </label>
                      </div>
                    )}
                    {currentActiveFee.installment_4 && (
                      <div className="flex flex-row w-full  justify-between mt-3">
                        <label className="block text-base text-gray-600 text-left mb-0 font-medium flex-row">
                          4th Installment
                        </label>
                        <label className="block text-base text-gray-600 text-center mb-0 font-medium flex-row">
                          {"₹ " +
                            currentActiveFee.installment_4
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                            "/-"}
                        </label>
                        <label className="block text-base text-gray-600 text-right mb-0 font-medium flex-row">
                          {moment(currentActiveFee.installment4Date).format(
                            "DD MMM YYYY"
                          )}
                        </label>
                      </div>
                    )}
                    {currentActiveFee.installment_5 && (
                      <div className="flex flex-row w-full  justify-between mt-3">
                        <label className="block text-base text-gray-600 text-left mb-0 font-medium flex-row">
                          5th Installment
                        </label>
                        <label className="block text-base text-gray-600 text-center mb-0 font-medium flex-row">
                          {"₹ " +
                            currentActiveFee.installment_5
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                            "/-"}
                        </label>
                        <label className="block text-base text-gray-600 text-right mb-0 font-medium flex-row">
                          {moment(currentActiveFee.installment5Date).format(
                            "DD MMM YYYY"
                          )}
                        </label>
                      </div>
                    )}
                  </>
                )}

                <div className="mt-[100px] pr-10">
                  <label className="block text-base text-gray-900 text-right font-semibold ">
                    Principal
                  </label>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  };

  const getStudenyFeeDetails = () => {
    if (classFee) {
      let total: any = 0;
      for (let i = 0; i < classFee.schoolFeesDetail.length; i++) {
        total = total + classFee.schoolFeesDetail[i].feeAmount;
      }

      // console.log("Discont");
      var val = total - total * (discount / 100);
      console.log("Discount >>>>", discount, total, val);
      let paidAmount = getPaidAmount();
      let pendingAmount: any = total - paidAmount;

      paidAmount =
        "₹ " + paidAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      let pendingAmountString =
        "₹ " + pendingAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      total = "₹ " + total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      return (
        <>
          <div className="flex flex-wrap justify-center">
            <form className="p-4 bg-white rounded shadow-xl min-h-[470px] w-[60%]">
              <div className="flex flex-row justify-between ">
                <div className="w-1/2 text-left">
                  {!isAnyInstallmentPaid() ? (
                    <Button
                      placeholder={undefined}
                      className="bg-blue-700 h-[30px] p-0 px-2 "
                      onClick={() => {
                        setDiscountDialog(true);
                      }}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      <FontAwesomeIcon icon={faDroplet} className="mr-2" />
                      Add Discount
                    </Button>
                  ) : discount > 0 ? (
                    <Button
                      placeholder={undefined}
                      className="bg-blue-700 h-[30px] p-0 px-2 "
                      // onClick={() => {
                      //   setDiscountDialog(true);
                      // }}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      <FontAwesomeIcon icon={faDroplet} className="mr-1" />
                      {discount + "% Discount"}
                    </Button>
                  ) : null}
                </div>
                <div className="w-full justify-center flex flex-row ">
                  <label className=" text-2xl text-gray-900 text-center font-extrabold mb-4 underline  ">
                    Student Fee Details
                  </label>
                </div>
                <div className="w-1/2 text-right">
                  <Button
                    placeholder={undefined}
                    className="bg-blue-700 h-[30px] p-0 w-[40px]"
                    onClick={() => {
                      console.log("Print Component ::::");
                      printStudentFeeDetails();
                    }}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    <FontAwesomeIcon icon={faPrint} />
                  </Button>
                </div>
              </div>

              {studnetInstalltionList.map((obj: any, index: number) => {
                const nextIndex = index + 1;
                const { finalAmount, lateFee } = getDaysDiffenceAndAmount(
                  obj["installment" + nextIndex + "Date"],
                  obj["installment_" + nextIndex],
                  100
                );

                console.log("** obj ** CCC", obj, lateFee, nextIndex);

                var finalDiscountAmount = finalAmount;
                return (
                  <Accordion
                    open={obj.open}
                    icon={
                      <FontAwesomeIcon
                        icon={obj.open ? faChevronDown : faChevronRight}
                      />
                    }
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    <AccordionHeader
                      onClick={() => onHeaderClick(index)}
                      placeholder={undefined}
                      className="p-0"
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      <div className="h-[50px] ">
                        <label className="block text-lg text-gray-900 text-left mb-0 font-bold ">
                          {getInstallmentString(nextIndex)}
                        </label>
                        <label className="block text-sm text-gray-600 text-left mb-0 -mt-[5px] font-semibold ">
                          {obj.student.submit ? "Paid" : "Pending"}
                        </label>
                      </div>
                    </AccordionHeader>
                    <AccordionBody>
                      <div className="min-h-[30px]">
                        <div className="flex flex-row justify-between ">
                          <div className="">
                            <label className="block text-sm text-gray-600 text-left mb-0 font-medium ">
                              Installment Amount
                            </label>
                            <label className="block text-sm text-gray-900 text-left mb-0 font-bold ">
                              {getFormattedfee(
                                obj["installment_" + nextIndex]
                              ) + "/-"}
                            </label>
                          </div>
                          <div className="">
                            <label className="block text-sm text-gray-600 text-left mb-0 font-medium ">
                              Due Date
                            </label>
                            <label className="block text-sm text-gray-900 text-left mb-0 font-bold ">
                              {moment(
                                obj["installment" + nextIndex + "Date"]
                              ).format("DD MMM YYYY")}
                            </label>
                          </div>

                          <div className="">
                            <label className="block text-sm text-gray-600   mb-0 font-medium ">
                              Due Amount Per Day
                            </label>
                            <label className="block text-sm text-gray-900 mb-0 font-bold text-left">
                              100/-
                            </label>
                          </div>

                          <div className="">
                            <label className="block text-sm text-gray-600   mb-0 font-medium ">
                              Discount
                            </label>
                            <label className="block text-sm text-gray-900 mb-0 font-bold text-left">
                              {discount + "%"}
                            </label>
                          </div>

                          <div className="">
                            <label className="block text-sm text-gray-600   mb-0 font-medium ">
                              Final Amount
                            </label>
                            <label className="block text-sm text-gray-900 mb-0 font-bold text-left">
                              {finalDiscountAmount
                                ? getFormattedfee(finalDiscountAmount) + "/-"
                                : "-"}
                            </label>
                          </div>
                        </div>
                        {obj.student.submit && (
                          <div className="flex flex-row justify-between mt-4 ">
                            <div className="w-1/4">
                              <label className="block text-sm text-gray-600 text-left mb-0 font-medium ">
                                Paid Amount
                              </label>
                              <label className="block text-sm text-gray-900 text-left mb-0 font-bold ">
                                {getFormattedfee(
                                  obj.student["installment_" + nextIndex]
                                ) + "/-"}
                              </label>
                            </div>
                            <div className="w-1/4">
                              <label className="block text-sm text-gray-600 text-left mb-0 font-medium ">
                                Paid Date
                              </label>
                              <label className="block text-sm text-gray-900 text-left mb-0 font-bold ">
                                {moment(
                                  obj["installment" + nextIndex + "DatePaid"]
                                ).format("DD MMM YYYY")}
                              </label>
                            </div>

                            <div className="w-1/4">
                              <label className="block text-sm text-gray-600  text-left mb-0 font-medium ">
                                Paid By
                              </label>
                              <label className="block text-sm text-gray-900 mb-0 font-bold text-left">
                                {
                                  obj.student[
                                    "installment_" + nextIndex + "_paid_By"
                                  ]
                                }
                              </label>
                            </div>

                            <div className="w-1/4 ">
                              {/* <label className="block text-sm text-gray-600  text-right  mb-0 font-medium  ">
                              Final Amount
                            </label>
                            <label className="block text-sm text-gray-900 mb-0 font-bold text-left">
                              {finalAmount
                                ? getFormattedfee(finalAmount) + "/-"
                                : "-"}
                            </label> */}
                            </div>
                          </div>
                        )}
                        <div className="flex flex-row">
                          {!obj.student.submit ? (
                            <div className="flex flex-row">
                              <Button
                                placeholder={undefined}
                                className="p-0 h-[35px] w-[200px] mt-4"
                                onClick={() =>
                                  onChangeStudentValue(
                                    index,
                                    "markItPaid",
                                    true
                                  )
                                }
                                onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}
                              >
                                <FontAwesomeIcon
                                  icon={faCircleCheck}
                                  size="2xl"
                                  className="mr-2 opacity-50"
                                />
                                MARK IT PAID
                              </Button>
                              <Button
                                placeholder={undefined}
                                className="p-0 h-[35px] w-[200px] mt-4 ml-2"
                                color="blue"
                                onClick={() =>
                                  onChangeStudentValue(
                                    index,
                                    "markItPaid",
                                    true
                                  )
                                }
                                onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}
                              >
                                <FontAwesomeIcon
                                  icon={faBell}
                                  size="2xl"
                                  className="mr-2"
                                />
                                Send Notification
                              </Button>

                              <Button
                                placeholder={undefined}
                                className="bg-blue-700 h-[35px] p-0 w-[40px] mt-4 ml-2"
                                onClick={() => {
                                  console.log("Print Component ::::", obj);
                                  setPrintInstallment({
                                    installment: obj,
                                    index: nextIndex,
                                  });
                                  // getInstallmentPrintComponent();
                                }}
                                onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}
                              >
                                <FontAwesomeIcon icon={faPrint} />
                              </Button>
                            </div>
                          ) : (
                            <div className="flex flex-row">
                              <Button
                                placeholder={undefined}
                                className="p-0 h-[35px] w-[200px] mt-4"
                                color="green"
                                onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}
                              >
                                <FontAwesomeIcon
                                  icon={faCircleCheck}
                                  size="2xl"
                                  className="mr-2"
                                />
                                PAID
                              </Button>

                              <Button
                                placeholder={undefined}
                                className="bg-blue-700 h-[35px] p-0 w-[40px] mt-4 ml-2"
                                onClick={() => {
                                  // console.log("Print Component ::::", obj);
                                  setPrintInstallment({
                                    installment: obj,
                                    index: nextIndex,
                                  });
                                }}
                                onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}
                              >
                                <FontAwesomeIcon icon={faPrint} />
                              </Button>
                            </div>
                          )}
                        </div>
                        {obj.student.markItPaid && (
                          <div className="flex flex-row justify-between items-center pt-4">
                            <div className="inline-block  w-1/4 pr-1">
                              <label className="block text-sm text-gray-600 text-left mb-0 font-medium ">
                                Paid Amount
                              </label>
                              <div className="flex flex-col">
                                <input
                                  className={`w-full px-2 py-2 text-gray-700 bg-[#e5e7eb] ${
                                    obj.student.errorInstllment
                                      ? "rounded border-2 border-red-600"
                                      : ""
                                  } `}
                                  id="feesName"
                                  name="feesName"
                                  required
                                  placeholder="Paid Amount"
                                  aria-label="feesName"
                                  value={
                                    obj.student["installment_" + nextIndex]
                                  }
                                  onChange={(event: any) => {
                                    // setFeeTypeName(event.target.value);
                                    // setfeeTypeNameError("");
                                    if (
                                      !isNaN(event.target.value) &&
                                      event.target.value.length < 8
                                    ) {
                                      onChangeStudentValue(
                                        index,
                                        "installment_" + nextIndex,
                                        event.target.value
                                      );
                                    }
                                  }}
                                />
                              </div>
                            </div>
                            <div className="inline-block  w-1/4 pr-1">
                              <label className="block text-sm text-gray-600 text-left mb-0 font-medium ">
                                Paid By
                              </label>
                              <div className="flex flex-col">
                                <Select
                                  name="role"
                                  placeholder="Paid By"
                                  options={CASH_PAID_BY}
                                  getOptionLabel={(option: any) =>
                                    option.option
                                  }
                                  getOptionValue={(option) => option.value}
                                  styles={{
                                    control: (baseStyles, state) => ({
                                      ...baseStyles,
                                      backgroundColor: "#e5e7eb",
                                      borderColor: obj.student
                                        .errorInstllmentPaidBy
                                        ? "red"
                                        : state.isFocused
                                        ? "#0f58bf"
                                        : "#e1e4e8",
                                      textAlign: "left",
                                      fontSize: 14,
                                      borderWidth: 2,
                                    }),
                                    option: (baseStyles, state) => ({
                                      ...baseStyles,
                                      textAlign: "left",
                                      zIndex: 1000,
                                    }),
                                  }}
                                  classNamePrefix="Paid By"
                                  onChange={(event: any) => {
                                    // console.log("Bloood Group >>>>>", event);
                                    onChangeStudentValue(
                                      index,
                                      "installment_" + nextIndex + "_paid_By",
                                      event.value
                                    );
                                  }}
                                  value={{
                                    option:
                                      obj.student[
                                        "installment_" + nextIndex + "_paid_By"
                                      ],
                                    value:
                                      obj.student[
                                        "installment_" + nextIndex + "_paid_By"
                                      ],
                                  }}
                                  menuPlacement="top"
                                />
                              </div>
                            </div>
                            <div className="inline-block w-1/4 pr-1">
                              <label className="block text-sm text-gray-600 text-left mb-0 font-medium ">
                                Paid Date
                              </label>
                              <div className="flex flex-col ">
                                <DatePickerComponent
                                  startDate={
                                    obj.student[
                                      "installment" + nextIndex + "DatePaid"
                                    ]
                                  }
                                  // maxDate={new Date("2012-01-01")}
                                  // minDate={new Date("1980-01-01")}
                                  onDateChange={(date: any) => {
                                    onChangeStudentValue(
                                      index,
                                      "installment" + nextIndex + "DatePaid",
                                      date
                                    );
                                  }}
                                  className={`bg-[#e5e7eb] h-[40px] w-[100%] pl-2 ${
                                    obj.student.errorInstllmentDatePaid
                                      ? "rounded border-2 border-red-600"
                                      : ""
                                  }`}
                                />
                              </div>
                            </div>
                            <div className="inline-block w-1/4">
                              <Button
                                color="blue"
                                placeholder={undefined}
                                className="h-[40px] w-full p-0 mt-3"
                                onClick={() => onSubmitInstallment(index, obj)}
                                onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}
                              >
                                Submit
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </AccordionBody>
                  </Accordion>
                );
              })}
            </form>
          </div>
        </>
      );
    } else {
      return "";
    }
  };

  const getInstallmentPercentage = (obj: any, totalFee: any) => {
    // console.log("Obj >>>>", obj, printInstallment);
    const percentage = (100 * obj.feeAmount) / totalFee;
    // console.log("percentage :::", percentage);
    let finalAmount = 0;
    if (printInstallment) {
      const installmentAmount =
        printInstallment.installment["installment_" + printInstallment.index];
      finalAmount = (installmentAmount * percentage) / 100;
      return finalAmount.toFixed(2);
    }
    return finalAmount.toFixed(2);
  };

  const preparePrintComponents = () => {
    if (classFee) {
      // console.log("printInstallment >>>", printInstallment);
      let totalfee: any = 0;
      // let total = 0;
      for (let i = 0; i < classFee.schoolFeesDetail.length; i++) {
        totalfee = totalfee + classFee.schoolFeesDetail[i].feeAmount;
      }

      const { lateFee, finalT } = getYearlyStudentfeeDetails();
      let finalAmountAfterDiscoutValue = totalfee - (totalfee * discount) / 100;
      finalAmountAfterDiscoutValue = finalAmountAfterDiscoutValue + lateFee;

      let paidAmount = getPaidAmount();
      let pendingAmount: any = finalAmountAfterDiscoutValue - paidAmount;

      paidAmount = "₹ " + getFormattedfee(paidAmount);
      let pendingAmountString = "₹ " + getFormattedfee(pendingAmount);
      let total = "₹ " + getFormattedfee(totalfee);
      let finalAmountAfterDiscout =
        "₹ " + getFormattedfee(finalAmountAfterDiscoutValue);

      const installmentTotal = printInstallment
        ? printInstallment.installment["installment_" + printInstallment.index]
        : 0;
      // console.log("installmentTotal :", installmentTotal);
      let installmentTotalDiscount =
        installmentTotal - (installmentTotal * discount) / 100;
      // console.log(
      //   "installmentTotal : installmentTotalDiscount",
      //   installmentTotalDiscount,
      //   printInstallment
      // );
      let installmentLatefee = printInstallment
        ? printInstallment.installment.student[
            "installment_" + printInstallment.index + "_late_fee"
          ]
        : 0;
      installmentTotalDiscount = installmentTotalDiscount + installmentLatefee;
      // console.log(
      //   "installmentTotal : installmentTotalDiscount 2",
      //   installmentTotalDiscount
      // );

      let studentInstallmentPaidAmount =
        printInstallment &&
        studentFee["installment_" + printInstallment.index + "_paid_By"] &&
        studentFee["installment" + printInstallment.index + "DatePaid"]
          ? studentFee["installment_" + printInstallment.index]
          : 0;

      // console.log("printInstallment", printInstallment);
      const installmentAmount =
        printInstallment && currentActiveFee
          ? currentActiveFee["installment_" + printInstallment.index]
          : 0;

      let studentInstallmentPendingAmount =
        installmentTotalDiscount - studentInstallmentPaidAmount;

      return (
        <div style={{ display: "none" }}>
          <div className="w-full print-component" ref={reference}>
            <label className=" text-5xl text-gray-400 text-center font-extrabold  origin-center rotate-45 absolute opacity-10 top-10 mt-96">
              SARA'S GURUKUL PRI PRIMARY SCHOOL
            </label>

            <form className="p-4 bg-white rounded  min-h-[470px] w-full">
              <div className="flex flex-row justify-center mb-3">
                <img src={logoImage} className="h-[100px] text-center" />
              </div>
              <label className="block text-xl text-gray-900 text-center mb-0 font-extrabold mb-0 ">
                SARA'S GURUKUL PRI PRIMARY SCHOOL
              </label>
              <label className="block text-lg text-gray-700 text-center mb-0 font-bold mb-4 ">
                {currentObj?.schoolClass?.schools.branch}
              </label>
              {/* Student Details */}
              {!printInstallment && selectedTabs === "student" && (
                <div>
                  <label className="block text-2xl text-gray-900 text-center mb-0 font-extrabold mb-4 underline">
                    School Fee Invoice
                  </label>
                  <div className="flex flex-row w-full mb-2">
                    <div className="flex flex-row flex-1">
                      <div>
                        <div className="flex flex-row">
                          <label className="block text-base text-gray-600 text-left mb-0 font-bold flex-row w-[100px]">
                            Name
                          </label>
                          <label className="block text-base text-gray-600 text-left mb-0 font-medium ml-2">
                            {currentObj?.firstName +
                              " " +
                              currentObj?.middleName +
                              " " +
                              currentObj.lastName}
                          </label>
                        </div>
                        <div className="flex flex-row">
                          <label className="block text-base text-gray-600 text-left mb-0 font-bold flex-row w-[100px]">
                            Class:
                          </label>
                          <label className="block text-base text-gray-600 text-left mb-0 font-medium ml-2">
                            {currentObj.schoolClass?.className +
                              "(" +
                              currentObj.schoolClass.classIdentity +
                              ")"}
                          </label>
                        </div>
                        <div className="flex flex-row">
                          <label className="block text-base text-gray-600 text-left mb-0 font-bold flex-row w-[100px]">
                            Date:
                          </label>
                          <label className="block text-base text-gray-600 text-left mb-0 font-medium ml-2">
                            {moment().format("DD MMM YYYY")}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-[1px] border-blue-gray-700">
                    <div className="flex flex-row w-full  justify-between mt-4 px-2">
                      <label className="block text-base text-gray-600 text-left mb-0 font-bold flex-row w-[120px]">
                        Fee Structure
                      </label>
                      <label className="block text-base text-gray-600 text-right mb-0 font-bold flex-row w-[120px]">
                        Amount
                      </label>
                    </div>

                    <div className="h-[1px] w-full bg-blue-gray-700" />
                    {classFee.schoolFeesDetail.map(
                      (obj: any, index: number) => {
                        return (
                          <div className="flex flex-row w-full  justify-between mt-2 px-2">
                            <label className="block text-base text-gray-600 text-left mb-0 font-medium flex-row w-[60%]">
                              {obj.feeName}
                            </label>
                            <label className="block text-base text-gray-600 text-right mb-0 font-medium flex-row w-[120px]">
                              {"₹ " +
                                obj.feeAmount
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                                "/-"}
                            </label>
                          </div>
                        );
                      }
                    )}

                    <div className="h-[1px] w-full bg-blue-gray-700 mt-2" />
                    <div className="flex flex-row w-full  justify-between mt-2 px-2">
                      <label className="block text-base text-gray-600 text-left mb-0 font-bold flex-row w-[120px]">
                        Total
                      </label>
                      <label className="block text-base text-gray-600 text-right mb-0 font-bold flex-row w-[120px]">
                        {total + "/-"}
                      </label>
                    </div>
                    <div className="flex flex-row w-full  justify-between mt-2 px-2">
                      <label className="block text-base text-gray-600 text-left mb-0 font-bold flex-row w-[120px]">
                        Discount
                      </label>
                      <label className="block text-base text-gray-600 text-right mb-0 font-bold flex-row w-[120px] mr-2">
                        {discount + "%"}
                      </label>
                    </div>
                    <div className="flex flex-row w-full  justify-between mt-2 px-2">
                      <label className="block text-base text-gray-600 text-left mb-0 font-bold flex-row w-[120px]">
                        Late Charge
                      </label>
                      <label className="block text-base text-gray-600 text-right mb-0 font-bold flex-row w-[120px]">
                        {"₹ " + getFormattedfee(lateFee) + "/-"}
                      </label>
                    </div>
                    <div className="flex flex-row w-full  justify-between mt-2 px-2">
                      <label className="block text-base text-gray-600 text-left mb-0 font-bold flex-row w-[120px]">
                        Final Amount
                      </label>
                      <label className="block text-base text-gray-600 text-right mb-0 font-bold flex-row w-[120px]">
                        {finalAmountAfterDiscout + "/-"}
                      </label>
                    </div>
                    <div className="flex flex-row w-full  justify-between mt-2 px-2">
                      <label className="block text-base text-gray-600 text-left mb-0 font-bold flex-row w-[120px]">
                        Paid Amount
                      </label>
                      <label className="block text-base text-gray-600 text-right mb-0 font-bold flex-row w-[120px]">
                        {paidAmount + "/-"}
                      </label>
                    </div>
                    {pendingAmount === 0 && (
                      <div className="h-[1px] w-full bg-blue-gray-700 mt-2" />
                    )}
                    {pendingAmount > 0 && (
                      <div className="flex flex-row w-full  justify-between mt-2 px-2 py-2 border-t-[1px] border-blue-gray-700 bg-gray-300">
                        <label className="block text-base text-gray-600 text-left mb-0 font-bold flex-row w-[180px]">
                          Pending Amount
                        </label>
                        <label className="block text-base text-red-700 text-right mb-0 font-bold flex-row w-[180px]">
                          {pendingAmountString + "/-"}
                        </label>
                      </div>
                    )}
                  </div>

                  <div className="mt-[100px] pr-10">
                    <label className="block text-base text-gray-900 text-right font-semibold ">
                      Principal
                    </label>
                  </div>
                </div>
              )}

              {/* Class fees Details */}
              {!printInstallment && selectedTabs === "class" && (
                <div>
                  <label className="block text-2xl text-gray-900 text-center mb-0 font-extrabold mb-4 underline">
                    Class Fee Details
                  </label>
                  <div className="flex flex-row w-full mb-2">
                    <div className="flex flex-row flex-1">
                      <div>
                        <div className="flex flex-row">
                          <label className="block text-base text-gray-600 text-left mb-0 font-bold flex-row w-[100px]">
                            Fee Type :
                          </label>
                          <label className="block text-base text-gray-600 text-left mb-0 font-medium ml-2">
                            {classFee.name}
                          </label>
                        </div>
                        <div className="flex flex-row">
                          <label className="block text-base text-gray-600 text-left mb-0 font-bold flex-row w-[100px]">
                            Total Fees:
                          </label>
                          <label className="block text-base text-gray-600 text-left mb-0 font-medium ml-2">
                            {total}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row flex-1">
                      <div>
                        <div className="flex flex-row">
                          <label className="block text-base text-gray-600 text-left mb-0 font-bold flex-row w-[140px]">
                            Class :
                          </label>
                          <label className="block text-base text-gray-600 text-left mb-0 font-medium ml-2">
                            {currentObj.schoolClass.className}(
                            {currentObj.schoolClass.classIdentity})
                          </label>
                        </div>
                        <div className="flex flex-row">
                          <label className="block text-base text-gray-600 text-left mb-0 font-bold flex-row w-[140px]">
                            Total Installment:
                          </label>
                          <label className="block text-base text-gray-600 text-left mb-0 font-medium ml-2">
                            {getInstallmetCount()}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="h-[1px] w-full bg-blue-gray-700" />
                  <div className="flex flex-row w-full  justify-between ">
                    <label className="block text-base text-gray-600 text-left mb-0 font-bold flex-row w-[120px]">
                      Fee Structure
                    </label>
                    <label className="block text-base text-gray-600 text-right mb-0 font-bold flex-row w-[120px]">
                      Amount
                    </label>
                  </div>
                  <div className="h-[1px] w-full bg-blue-gray-700" />
                  {classFee.schoolFeesDetail.map((obj: any, index: number) => {
                    return (
                      <div className="flex flex-row w-full  justify-between mt-2">
                        <label className="block text-base text-gray-600 text-left mb-0 font-medium flex-row w-[60%]">
                          {obj.feeName}
                        </label>
                        <label className="block text-base text-gray-600 text-right mb-0 font-medium flex-row w-[120px]">
                          {"₹ " +
                            obj.feeAmount
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                            "/-"}
                        </label>
                      </div>
                    );
                  })}
                  <div className="h-[1px] w-full bg-blue-gray-700 mt-2" />
                  <div className="flex flex-row w-full  justify-between mt-2">
                    <label className="block text-base text-gray-600 text-left mb-0 font-bold flex-row w-[120px]">
                      Total
                    </label>
                    <label className="block text-base text-gray-600 text-right mb-0 font-bold flex-row w-[120px]">
                      {total + "/-"}
                    </label>
                  </div>
                  <div className="h-[1px] w-full bg-blue-gray-700 mt-2" />
                  {currentActiveFee && (
                    <>
                      <label className="block text-xl text-gray-700 text-center mb-0 font-extrabold mt-4 underline">
                        Class installment and Deadlines
                      </label>

                      <div className="h-[1px] w-full bg-blue-gray-700 mt-2" />
                      <div className="flex flex-row w-full  justify-between ">
                        <label className="block text-base text-gray-600 text-left mb-0 font-bold flex-row">
                          Installments
                        </label>
                        <label className="block text-base text-gray-600 text-center mb-0 font-bold flex-row">
                          Amount
                        </label>
                        <label className="block text-base text-gray-600 text-right mb-0 font-bold flex-row">
                          Due Date
                        </label>
                      </div>
                      <div className="h-[1px] w-full bg-blue-gray-700" />

                      <div className="flex flex-row w-full  justify-between mt-3">
                        <label className="block text-base text-gray-600 text-left mb-0 font-medium flex-row">
                          1st Installment
                        </label>
                        <label className="block text-base text-gray-600 text-center mb-0 font-medium flex-row">
                          {"₹ " +
                            currentActiveFee.installment_1
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                            "/-"}
                        </label>
                        <label className="block text-base text-gray-600 text-right mb-0 font-medium flex-row">
                          {moment(currentActiveFee.installment1Date).format(
                            "DD MMM YYYY"
                          )}
                        </label>
                      </div>

                      {currentActiveFee.installment_2 && (
                        <div className="flex flex-row w-full  justify-between mt-3">
                          <label className="block text-base text-gray-600 text-left mb-0 font-medium flex-row">
                            2nd Installment
                          </label>
                          <label className="block text-base text-gray-600 text-center mb-0 font-medium flex-row">
                            {"₹ " +
                              currentActiveFee.installment_2
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                              "/-"}
                          </label>
                          <label className="block text-base text-gray-600 text-right mb-0 font-medium flex-row">
                            {moment(currentActiveFee.installment2Date).format(
                              "DD MMM YYYY"
                            )}
                          </label>
                        </div>
                      )}

                      {currentActiveFee.installment_3 && (
                        <div className="flex flex-row w-full  justify-between mt-3">
                          <label className="block text-base text-gray-600 text-left mb-0 font-medium flex-row">
                            3rd Installment
                          </label>
                          <label className="block text-base text-gray-600 text-center mb-0 font-medium flex-row">
                            {"₹ " +
                              currentActiveFee.installment_3
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                              "/-"}
                          </label>
                          <label className="block text-base text-gray-600 text-right mb-0 font-medium flex-row">
                            {/* {currentActiveFee.installment3Date} */}
                            {moment(currentActiveFee.installment3Date).format(
                              "DD MMM YYYY"
                            )}
                          </label>
                        </div>
                      )}
                      {currentActiveFee.installment_4 && (
                        <div className="flex flex-row w-full  justify-between mt-3">
                          <label className="block text-base text-gray-600 text-left mb-0 font-medium flex-row">
                            4th Installment
                          </label>
                          <label className="block text-base text-gray-600 text-center mb-0 font-medium flex-row">
                            {"₹ " +
                              currentActiveFee.installment_4
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                              "/-"}
                          </label>
                          <label className="block text-base text-gray-600 text-right mb-0 font-medium flex-row">
                            {moment(currentActiveFee.installment4Date).format(
                              "DD MMM YYYY"
                            )}
                          </label>
                        </div>
                      )}
                      {currentActiveFee.installment_5 && (
                        <div className="flex flex-row w-full  justify-between mt-3">
                          <label className="block text-base text-gray-600 text-left mb-0 font-medium flex-row">
                            5th Installment
                          </label>
                          <label className="block text-base text-gray-600 text-center mb-0 font-medium flex-row">
                            {"₹ " +
                              currentActiveFee.installment_5
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                              "/-"}
                          </label>
                          <label className="block text-base text-gray-600 text-right mb-0 font-medium flex-row">
                            {moment(currentActiveFee.installment5Date).format(
                              "DD MMM YYYY"
                            )}
                          </label>
                        </div>
                      )}
                    </>
                  )}

                  <div className="mt-[100px] pr-10">
                    <label className="block text-base text-gray-900 text-right font-semibold ">
                      Principal
                    </label>
                  </div>
                </div>
              )}
              {/* Installment Details  Details */}

              {printInstallment && (
                <div>
                  <label className="block text-2xl text-gray-900 text-center mb-0 font-extrabold mb-4 underline">
                    Installment Details
                  </label>
                  <div className="flex flex-row w-full mb-2">
                    <div className="flex flex-row flex-1">
                      <div>
                        <div className="flex flex-row">
                          <label className="block text-base text-gray-600 text-left mb-0 font-bold flex-row w-[120px]">
                            Name:
                          </label>
                          <label className="block text-base text-gray-600 text-left mb-0 font-medium ml-2">
                            {currentObj?.firstName +
                              " " +
                              currentObj?.middleName +
                              " " +
                              currentObj.lastName}
                          </label>
                        </div>
                        <div className="flex flex-row">
                          <label className="block text-base text-gray-600 text-left mb-0 font-bold flex-row w-[120px]">
                            Class :
                          </label>
                          <label className="block text-base text-gray-600 text-left mb-0 font-medium ml-2">
                            {currentObj.schoolClass.className}(
                            {currentObj.schoolClass.classIdentity})
                          </label>
                        </div>
                        <div className="flex flex-row">
                          <label className="block text-base text-gray-600 text-left mb-0 font-bold flex-row w-[120px]">
                            Installment No:
                          </label>
                          <label className="block text-base text-gray-600 text-left mb-0 font-medium ml-2">
                            {printInstallment.index}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-l-[1px] border-r-[1px] border-blue-gray-700">
                    <div className="h-[1px] w-full bg-blue-gray-700" />
                    <div className="flex flex-row w-full  justify-between px-2">
                      <label className="block text-base text-gray-600 text-left mb-0 font-bold flex-row w-[120px]">
                        Fee Structure
                      </label>
                      <label className="block text-base text-gray-600 text-right mb-0 font-bold flex-row w-[120px]">
                        Amount
                      </label>
                    </div>
                    <div className="h-[1px] w-full bg-blue-gray-700" />
                    {classFee.schoolFeesDetail.map(
                      (obj: any, index: number) => {
                        return (
                          <div className="flex flex-row w-full  justify-between mt-2 px-2">
                            <label className="block text-base text-gray-600 text-left mb-0 font-medium flex-row w-[60%]">
                              {obj.feeName}
                            </label>
                            <label className="block text-base text-gray-600 text-right mb-0 font-medium flex-row w-[120px]">
                              {"₹ " +
                                getInstallmentPercentage(obj, totalfee)
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                                "/-"}
                            </label>
                          </div>
                        );
                      }
                    )}

                    <div className="h-[1px] w-full bg-blue-gray-700 mt-2" />
                    <div className="flex flex-row w-full  justify-between mt-2 px-2">
                      <label className="block text-base text-gray-600 text-left mb-0 font-bold flex-row w-[120px]">
                        Total
                      </label>
                      <label className="block text-base text-gray-600 text-right mb-0 font-bold flex-row w-[120px]">
                        {"₹ " +
                          installmentTotal
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                          "/-"}
                      </label>
                    </div>

                    <div className="flex flex-row w-full  justify-between mt-2 px-2">
                      <label className="block text-base text-gray-600 text-left mb-0 font-bold flex-row w-[120px]">
                        Discount
                      </label>
                      <label className="block text-base text-gray-600 text-right mb-0 font-bold flex-row w-[120px] mr-2">
                        {discount + "%"}
                      </label>
                    </div>

                    <div className="flex flex-row w-full items-center justify-between mt-2 px-2">
                      <label className="block text-base text-gray-600 text-left mb-0 font-bold flex-row w-[120px]">
                        Late Charge
                      </label>
                      <label className="block text-xs text-gray-800 text-center mb-0 font-normal flex-row w-[140px]">
                        {`Due Date : 
                            ${moment(
                              printInstallment.installment[
                                "installment" + printInstallment.index + "Date"
                              ]
                            ).format("DD MMM YYYY")}
                            `}
                      </label>
                      <label className="block text-base text-gray-600 text-right mb-0 font-bold flex-row w-[120px]">
                        {printInstallment
                          ? "₹ " +
                            printInstallment.installment.student[
                              "installment_" +
                                printInstallment.index +
                                "_late_fee"
                            ]
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                            "/-"
                          : ""}
                      </label>
                    </div>

                    <div className="flex flex-row w-full  justify-between mt-2 px-2">
                      <label className="block text-base text-gray-600 text-left mb-0 font-bold flex-row w-[120px]">
                        Final Amount
                      </label>
                      <label className="block text-base text-gray-600 text-right mb-0 font-bold flex-row w-[120px]">
                        {"₹ " +
                          installmentTotalDiscount
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                          "/-"}
                      </label>
                    </div>

                    <div className="flex flex-row w-full  justify-between mt-2 px-2 items-center">
                      <label className="block text-base text-gray-600 text-left mb-0 font-bold flex-row w-[120px]">
                        Paid Amount
                      </label>
                      {studentInstallmentPaidAmount > 0 && (
                        <label className="block text-xs text-gray-600 text-left mb-0 font-normal flex-row ">
                          {`
                           Paid by
                            
                           ${
                             studentFee[
                               "installment_" +
                                 printInstallment.index +
                                 "_paid_By"
                             ]
                           }
                            at
                            
                            ${moment(
                              studentFee[
                                "installment" +
                                  printInstallment.index +
                                  "DatePaid"
                              ]
                            ).format("DD MMM YYYY")}
                            `}
                        </label>
                      )}
                      <label className="block text-base text-gray-600 text-right mb-0 font-bold flex-row w-[120px]">
                        {"₹ " +
                          studentInstallmentPaidAmount
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                          "/-"}
                      </label>
                    </div>

                    {studentInstallmentPendingAmount !== 0 && (
                      <div className="flex flex-row w-full  justify-between mt-2 px-2 bg-blue-gray-50 items-center">
                        <label className="block text-base text-gray-600 text-left mb-0 font-bold flex-row w-[140px]">
                          Pending Amount
                        </label>
                        <label className="block text-xs text-gray-800 text-center mb-0 font-normal flex-row w-[140px]">
                          {`Due Date : 
                            ${moment(
                              printInstallment.installment[
                                "installment" + printInstallment.index + "Date"
                              ]
                            ).format("DD MMM YYYY")}
                            `}
                        </label>
                        <label className="block text-base text-red-700 text-right mb-0 font-bold flex-row w-[120px]">
                          {"₹ " +
                            studentInstallmentPendingAmount
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                            "/-"}
                        </label>
                      </div>
                    )}
                    <div className="h-[1px] w-full bg-blue-gray-700 mt-2" />
                  </div>
                  {currentActiveFee && (
                    <>
                      <label className="block text-xl text-gray-700 text-center mb-0 font-extrabold mt-4 underline">
                        Class Fees Installment and Deadlines
                      </label>

                      <div className="h-[1px] w-full bg-blue-gray-700 mt-1" />
                      <div className="flex flex-row w-full  justify-between ">
                        <label className="block text-base text-gray-600 text-left mb-0 font-bold flex-row">
                          Installments
                        </label>
                        <label className="block text-base text-gray-600 text-center mb-0 font-bold flex-row">
                          Amount
                        </label>
                        <label className="block text-base text-gray-600 text-right mb-0 font-bold flex-row">
                          Due Date
                        </label>
                      </div>
                      <div className="h-[1px] w-full bg-blue-gray-700" />

                      <div className="flex flex-row w-full  justify-between mt-1">
                        <label className="block text-base text-gray-600 text-left mb-0 font-medium flex-row">
                          1st Installment
                        </label>
                        <label className="block text-base text-gray-600 text-center mb-0 font-medium flex-row">
                          {"₹ " +
                            currentActiveFee.installment_1
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                            "/-"}
                        </label>
                        <label className="block text-base text-gray-600 text-right mb-0 font-medium flex-row">
                          {moment(currentActiveFee.installment1Date).format(
                            "DD MMM YYYY"
                          )}
                        </label>
                      </div>

                      {currentActiveFee.installment_2 && (
                        <div className="flex flex-row w-full  justify-between mt-1">
                          <label className="block text-base text-gray-600 text-left mb-0 font-medium flex-row">
                            2nd Installment
                          </label>
                          <label className="block text-base text-gray-600 text-center mb-0 font-medium flex-row">
                            {"₹ " +
                              currentActiveFee.installment_2
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                              "/-"}
                          </label>
                          <label className="block text-base text-gray-600 text-right mb-0 font-medium flex-row">
                            {moment(currentActiveFee.installment2Date).format(
                              "DD MMM YYYY"
                            )}
                          </label>
                        </div>
                      )}

                      {currentActiveFee.installment_3 && (
                        <div className="flex flex-row w-full  justify-between mt-1">
                          <label className="block text-base text-gray-600 text-left mb-0 font-medium flex-row">
                            3rd Installment
                          </label>
                          <label className="block text-base text-gray-600 text-center mb-0 font-medium flex-row">
                            {"₹ " +
                              currentActiveFee.installment_3
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                              "/-"}
                          </label>
                          <label className="block text-base text-gray-600 text-right mb-0 font-medium flex-row">
                            {/* {currentActiveFee.installment3Date} */}
                            {moment(currentActiveFee.installment3Date).format(
                              "DD MMM YYYY"
                            )}
                          </label>
                        </div>
                      )}
                      {currentActiveFee.installment_4 && (
                        <div className="flex flex-row w-full  justify-between mt-1">
                          <label className="block text-base text-gray-600 text-left mb-0 font-medium flex-row">
                            4th Installment
                          </label>
                          <label className="block text-base text-gray-600 text-center mb-0 font-medium flex-row">
                            {"₹ " +
                              currentActiveFee.installment_4
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                              "/-"}
                          </label>
                          <label className="block text-base text-gray-600 text-right mb-0 font-medium flex-row">
                            {moment(currentActiveFee.installment4Date).format(
                              "DD MMM YYYY"
                            )}
                          </label>
                        </div>
                      )}
                      {currentActiveFee.installment_5 && (
                        <div className="flex flex-row w-full  justify-between mt-1">
                          <label className="block text-base text-gray-600 text-left mb-0 font-medium flex-row">
                            5th Installment
                          </label>
                          <label className="block text-base text-gray-600 text-center mb-0 font-medium flex-row">
                            {"₹ " +
                              currentActiveFee.installment_5
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                              "/-"}
                          </label>
                          <label className="block text-base text-gray-600 text-right mb-0 font-medium flex-row">
                            {moment(currentActiveFee.installment5Date).format(
                              "DD MMM YYYY"
                            )}
                          </label>
                        </div>
                      )}
                    </>
                  )}

                  <div className="mt-[100px] pr-10">
                    <label className="block text-base text-gray-900 text-right font-semibold ">
                      Principal
                    </label>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      );
    } else {
      return "";
    }
  };

  const getYearlyStudentfeeDetails = () => {
    if (currentActiveFee && studentFee) {
      let total = 0;
      let lateFee = 0;
      if (currentActiveFee.installment1Date && currentActiveFee.installment_1) {
        total = currentActiveFee.installment_1;
        if (
          studentFee.installment1DatePaid &&
          studentFee.installment_1_paid_By
        ) {
          lateFee = studentFee.installment_1_late_fee
            ? studentFee.installment_1_late_fee
            : 0;
        } else {
          var date1 = moment(currentActiveFee.installment1Date);
          var date2 = moment();
          var days = date2.diff(date1, "days");

          lateFee = (days > 0 ? days : 0) * LATE_FEE;
        }
      }

      if (currentActiveFee.installment2Date && currentActiveFee.installment_2) {
        total = total + currentActiveFee.installment_2;
        if (
          studentFee.installment2DatePaid &&
          studentFee.installment_2_paid_By
        ) {
          lateFee = studentFee.installment_2_late_fee
            ? studentFee.installment_2_late_fee
            : 0;
        } else {
          var date1 = moment(currentActiveFee.installment2Date);
          var date2 = moment();
          var days = date2.diff(date1, "days");
          const installLateFee = (days > 0 ? days : 0) * LATE_FEE;
          lateFee = lateFee + installLateFee;
        }
      }

      if (currentActiveFee.installment3Date && currentActiveFee.installment_3) {
        total = total + currentActiveFee.installment_3;
        if (
          studentFee.installment3DatePaid &&
          studentFee.installment_3_paid_By
        ) {
          lateFee = studentFee.installment_3_late_fee
            ? studentFee.installment_3_late_fee
            : 0;
        } else {
          var date1 = moment(currentActiveFee.installment3Date);
          var date2 = moment();
          var days = date2.diff(date1, "days");
          const installLateFee = (days > 0 ? days : 0) * LATE_FEE;
          lateFee = lateFee + installLateFee;
        }
      }

      if (currentActiveFee.installment4Date && currentActiveFee.installment_4) {
        total = total + currentActiveFee.installment_4;
        if (
          studentFee.installment4DatePaid &&
          studentFee.installment_4_paid_By
        ) {
          lateFee = studentFee.installment_4_late_fee
            ? studentFee.installment_4_late_fee
            : 0;
        } else {
          var date1 = moment(currentActiveFee.installment4Date);
          var date2 = moment();
          var days = date2.diff(date1, "days");
          const installLateFee = (days > 0 ? days : 0) * LATE_FEE;
          lateFee = lateFee + installLateFee;
        }
      }

      if (currentActiveFee.installment5Date && currentActiveFee.installment_5) {
        total = total + currentActiveFee.installment_5;
        if (
          studentFee.installment5DatePaid &&
          studentFee.installment_5_paid_By
        ) {
          lateFee = studentFee.installment_5_late_fee
            ? studentFee.installment_5_late_fee
            : 0;
        } else {
          var date1 = moment(currentActiveFee.installment5Date);
          var date2 = moment();
          var days = date2.diff(date1, "days");
          const installLateFee = (days > 0 ? days : 0) * LATE_FEE;
          lateFee = lateFee + installLateFee;
        }
      }

      total = total - (total * discount) / 100;

      return { lateFee, finalT: total };
    } else {
      return { lateFee: 0, finalT: 0 };
    }
  };

  const isAnyInstallmentPaid = () => {
    let isAnyInstallmentPaid = false;
    if (studentFee) {
      for (let i = 1; i <= 5; i++) {
        if (
          studentFee["installment" + i + "DatePaid"] &&
          studentFee["installment_" + i + "_paid_By"]
        ) {
          isAnyInstallmentPaid = true;
          break;
        }
      }
    }
    return isAnyInstallmentPaid;
  };

  return (
    <ParentLayout
      loading={loading}
      error={error}
      success={feesMessage}
      onCloseSuccessAlert={() => dispatch(resetUpdateFee())}
      onCloseAlert={() => dispatch(resetUpdateFee())}
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
              <FontAwesomeIcon
                icon={faCommentDollar}
                className="mr-2 fa-4x p-0"
              />
              <h1 className="w-full text-3xl text-black pb-6">Student Fees</h1>
            </span>
            <div className="flex flex-row  w-24"></div>
          </div>

          <Tabs
            value="studentfeeDetails"
            className="text-center items-center justify-center  flex flex-1 flex-col"
          >
            <TabsHeader
              placeholder={undefined}
              className="w-[500px] bg-white font-bold border border-indigo-600 text-white"
              indicatorProps={{
                className: "bg-[#193474]",
              }}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <Tab
                key={"classFeeDetails"}
                value={"classFeeDetails"}
                placeholder={undefined}
                className="font-bold"
                activeClassName="text-white"
                onClick={() => setSelectedTabs("class")}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Class Fee Details
              </Tab>

              <Tab
                key={"studentFeeDetails"}
                value={"studentfeeDetails"}
                placeholder={undefined}
                className="font-bold"
                activeClassName="text-white"
                onClick={() => setSelectedTabs("student")}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Student Fee Details
              </Tab>
            </TabsHeader>
            <TabsBody
              placeholder={undefined}
              className=" text-center"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <TabPanel key={"classFeeDetails"} value={"classFeeDetails"}>
                <div>{getClassDetails()}</div>
              </TabPanel>
              <TabPanel key={"studentFeeDetails"} value={"studentfeeDetails"}>
                <div>{getStudenyFeeDetails()}</div>
              </TabPanel>
            </TabsBody>
          </Tabs>
          {preparePrintComponents()}
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

      <FeeDiscountDialog
        open={discountDialog}
        handleOpen={() => setDiscountDialog(false)}
        onSubmit={(value: any) => {
          // console.log("Value >>>>", value);
          setDiscount(value);
          setDiscountDialog(false);
        }}
        discountValue={discount}
      />
    </ParentLayout>
  );
};

export default StudentFeeDetails;
