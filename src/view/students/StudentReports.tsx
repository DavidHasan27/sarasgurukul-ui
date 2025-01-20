import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ParentLayout from "../../component/app-component/Parent";
import {
  faSchool,
  faTrash,
  faMagnifyingGlass,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useEffect, useState } from "react";
import {
  activeDeactiveStudentReport,
  getStudentReports,
  getStudentYears,
  resetUpdatedReport,
} from "../../redux/students/reportSlice";

import OutsideClickHandler from "react-outside-click-handler";
import Select1 from "react-select";
import {
  Button,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { clone, filter, find, orderBy } from "lodash";
import KGReportDialog from "../../component/app-component/KGReportDialog";
import WarningDialog from "../../component/app-component/WarningDialog";

const StudentReport = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentObj = location.state;
  const dispatch = useAppDispatch();
  const [yearsMenu, setYearsMenu] = useState<any>();
  const [years, setYears] = useState<any>();
  const [selectedReport, setSelectereport] = useState<any>();
  const [questionAnswerList, setQuestionAnswerList] = useState<any>();
  const [editReportOn, setEditReport] = useState<any>();
  const [reportOpen, setOpen] = useState<any>(false);
  const { loading, studentYearList, updateReportRes, studentReport } =
    useAppSelector((state: any) => state.report);

  const [warningDialog, setWarningDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  useEffect(() => {
    // getReportQuestinData();
    dispatch(getStudentYears({ studentId: currentObj.id }));
  }, []);

  useEffect(() => {
    if (updateReportRes) {
      dispatch(resetUpdatedReport());
      getStudentReportData(years.id);
    }
  }, [updateReportRes]);

  useEffect(() => {
    if (studentYearList && studentYearList.length > 0) {
      const activeYear = find(studentYearList, (obj: any) => obj.active);
      if (activeYear) {
        setYears(activeYear);
        getStudentReportData(activeYear.id);
      }
    }
  }, [studentYearList]);

  // const getReportQuestinData = () => {
  //   const body = {
  //     classType: "SR_KG",
  //     term: "TERM-I",
  //   };

  //   dispatch(getReportQuestion(body));
  // };

  const prepareReportList = (
    questionList: any,
    report: any,
    editReport: any
  ) => {
    // const mainQuestionList = filter(
    //   questionList,
    //   (obj: any) => obj.reportQuestions.main
    // );

    const mainQuestinList: any = orderBy(
      filter(questionList, (obj: any) => obj.reportQuestions.main),
      [(item: any) => item.reportQuestions.index],
      ["asc"]
    );
    const finalList = [];
    for (let i = 0; i < mainQuestinList.length; i++) {
      const childQuestions = filter(
        questionList,
        (obj: any) =>
          !obj.main &&
          obj.reportQuestions.parentId === mainQuestinList[i].reportQuestions.id
      );

      const mainObj = clone(mainQuestinList[i]);
      mainObj["child"] = orderBy(
        childQuestions,
        [(item: any) => item.reportQuestions.index],
        ["asc"]
      );
      finalList.push(mainObj);
    }
    setQuestionAnswerList(finalList);
    setOpen(true);
    setSelectereport(report);
    setEditReport(editReport);
  };

  const getStudentReportData = (yearId: any) => {
    const body = {
      yearId: yearId,
    };

    dispatch(getStudentReports(body));
  };

  const formatOptionLabel = ({ value, label }: any) => {
    return (
      <div
        className="flex flex-col text-left px-3 border-b-[1px] border-gray-400 "
        onClick={() => {
          console.log("Value >>>", value);
          setYears(value);
          setYearsMenu(false);
          getStudentReportData(value.id);
        }}
      >
        <div className="text-blue-gray-900 text-[16px]"> {label}</div>
        <div className="text-gray-500 text-[12px] -mt-[5px]">
          Class: {value.classId.className}({value.classId.classIdentity})
        </div>
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

  const onActivateDeactivateStudentReport = () => {
    setWarningDialog(false);
    const body = {
      id: selectedItem.id,
      active: false,
    };
    dispatch(activeDeactiveStudentReport(body));
  };

  return (
    <ParentLayout>
      <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
        <main className="w-full flex-grow p-6">
          <span>
            <h1 className="w-full text-3xl text-black mt-2">Student Reports</h1>
          </span>

          <div className="flex flex-row justify-between items-center">
            <div>
              <div className="flex flex-row">
                <div className="font-semibold text-sm">Student Name : </div>
                <div className="ml-4 text-sm">
                  {currentObj.firstName + " " + currentObj.lastName}{" "}
                </div>
              </div>
              <div className="flex flex-row text-sm">
                <div className="font-semibold">Class : </div>
                <div className="ml-4">
                  {currentObj.schoolClass.className +
                    "( " +
                    currentObj.schoolClass.classIdentity +
                    ")"}
                </div>
              </div>
            </div>
            <div className="flex flex-row">
              <OutsideClickHandler
                onOutsideClick={() => {
                  setYearsMenu(false);
                }}
              >
                <Select1
                  name="role"
                  placeholder="Select School Years"
                  options={studentYearList ? studentYearList : []}
                  getOptionLabel={(option: any) => getOptionLabel(option.year)}
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
                    setYears(event);
                    setYearsMenu(false);
                  }}
                  value={years}
                  components={{ Option: formatOptionLabel }}
                  menuIsOpen={yearsMenu}
                  onMenuOpen={() => setYearsMenu(true)}
                  closeMenuOnScroll={true}
                  isClearable
                />
              </OutsideClickHandler>

              <Button
                variant="gradient"
                color="blue"
                placeholder={"Submit"}
                className="mr-5 w-[200px] h-[40px] p-0"
                onClick={() => {
                  navigate("/app/newReport", {
                    state: { student: currentObj, years },
                  });
                }}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Add New Report
              </Button>
            </div>
          </div>

          <div className="flex w-full">
            {(!studentReport || studentReport.length === 0) && !loading ? (
              <div className="flex flex-col w-full items-center">
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
                  No Students Report Found
                </Typography>
              </div>
            ) : (
              <div className="bg-white overflow-auto w-full mt-5">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="w-1/8 text-left py-3 px-4 uppercase font-semibold text-sm">
                        School
                      </th>
                      <th className="w-1/8 text-left py-3 px-4 uppercase font-semibold text-sm">
                        Class
                      </th>
                      <th className="w-1/8 text-left py-3 px-4 uppercase font-semibold text-sm">
                        Term
                      </th>
                      <th className="w-1/8 text-left py-3 px-4 uppercase font-semibold text-sm">
                        Promoted
                      </th>
                      <th className="w-1/8 text-left py-3 px-4 uppercase font-semibold text-sm">
                        Remark
                      </th>
                      <th className="w-1/8 text-left py-3 px-4 uppercase font-semibold text-sm">
                        Class Teacher
                      </th>
                      <th className="w-1/8 text-left py-3 px-4 uppercase font-semibold text-sm">
                        published
                      </th>
                      <th className="w-1/8 text-left py-3 px-4 uppercase font-semibold text-sm">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {studentReport &&
                      studentReport.map((item: any, index: number) => (
                        <tr
                          className={`${index % 2 != 0 ? "bg-gray-200" : ""}`}
                        >
                          <td className={`w-1/8 text-left py-3 px-4`}>
                            {item.studentYears.classId.schools.schoolName}
                          </td>
                          <td className={`w-1/8 text-left py-3 px-4`}>
                            {years
                              ? years.classId.className +
                                "(" +
                                years.classId.classIdentity +
                                ")"
                              : "-"}
                          </td>
                          <td className={`w-1/8 text-left py-3 px-4 `}>
                            {item.terms}
                          </td>
                          <td className={`w-1/8 text-left py-3 px-4 `}>
                            <a
                              className={`hover:text-blue-500 $`}
                              href="tel:622322662"
                            >
                              {item.promoted}
                            </a>
                          </td>
                          <td className={`w-1/8 text-left py-3 px-4 `}>
                            <a
                              className={`hover:text-blue-500 `}
                              href="tel:622322662"
                            >
                              {item.remark}
                            </a>
                          </td>
                          <td className={`w-1/8 text-left py-3 px-4`}>
                            {item.studentYears.classId.classTeacher.firstName +
                              " " +
                              item.studentYears.classId.classTeacher.lastName}
                          </td>
                          <td className={`w-1/8 text-left py-3 px-4`}>
                            {item.published ? "YES" : "NOT YET APUBLISHED"}
                          </td>
                          <td className="w-1/8 text-left py-3 px-4">
                            {!item.published && (
                              <Tooltip content="Edit Report">
                                <IconButton
                                  placeholder={"View"}
                                  className="h-[30px] w-[30px] bg-blue-800 ml-2"
                                  onClick={() => {
                                    let DATATABLE = [];
                                    let classIdentity =
                                      item.studentYears.classId.classIdentity;

                                    if (classIdentity === "PLAY_GROUP") {
                                      DATATABLE = item.reportQueAnswerPlay;
                                    } else if (
                                      classIdentity === "SR_KG" ||
                                      classIdentity === "JR_KG" ||
                                      classIdentity === "NURSERY"
                                    ) {
                                      DATATABLE = item.reportQueAnswerKgs;
                                    } else {
                                      DATATABLE = item.reportQueAnswerFirst;
                                    }

                                    prepareReportList(DATATABLE, item, true);
                                  }}
                                  onPointerEnterCapture={undefined}
                                  onPointerLeaveCapture={undefined}
                                >
                                  <FontAwesomeIcon icon={faEdit} />
                                </IconButton>
                              </Tooltip>
                            )}
                            {!item.published && (
                              <Tooltip content="Remove Report">
                                <IconButton
                                  placeholder={"View"}
                                  className="h-[30px] w-[30px] bg-blue-800 ml-2"
                                  onClick={() => {
                                    console.log(selectedItem);
                                    setSelectedItem(item);
                                    setWarningDialog(true);
                                  }}
                                  onPointerEnterCapture={undefined}
                                  onPointerLeaveCapture={undefined}
                                >
                                  <FontAwesomeIcon icon={faTrash} />
                                </IconButton>
                              </Tooltip>
                            )}
                            <Tooltip content="View Reports">
                              <IconButton
                                placeholder={"View"}
                                className="h-[30px] w-[30px] bg-blue-800 ml-2"
                                onClick={() => {
                                  let DATATABLE = [];
                                  let classIdentity =
                                    item.studentYears.classId.classIdentity;

                                  if (classIdentity === "PLAY_GROUP") {
                                    DATATABLE = item.reportQueAnswerPlay;
                                  } else if (
                                    classIdentity === "SR_KG" ||
                                    classIdentity === "JR_KG" ||
                                    classIdentity === "NURSERY"
                                  ) {
                                    DATATABLE = item.reportQueAnswerKgs;
                                  } else {
                                    DATATABLE = item.reportQueAnswerFirst;
                                  }
                                  prepareReportList(DATATABLE, item, false);
                                }}
                                onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}
                              >
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                              </IconButton>
                            </Tooltip>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>

      {reportOpen && questionAnswerList && questionAnswerList.length > 0 && (
        <KGReportDialog
          open={reportOpen}
          handleOpen={() => setOpen(false)}
          data={questionAnswerList}
          student={currentObj}
          report={selectedReport}
          edit={editReportOn}
        />
      )}

      {selectedItem && (
        <WarningDialog
          open={warningDialog}
          onOkClick={() => onActivateDeactivateStudentReport()}
          onCloseDialog={() => setWarningDialog(false)}
          header={"Warning !"}
          message={
            selectedItem.active
              ? `Are you sure? you want to delete "
            ${currentObj.firstName + " " + currentObj.lastName}" Student Report`
              : `Are you sure? you want to activate."
            ${currentObj.firstName + " " + currentObj.lastName}" Student Report`
          }
          subMessage={
            selectedItem.active
              ? "Once you delete student report,  You will never get it back"
              : ""
          }
        />
      )}
    </ParentLayout>
  );
};

export default StudentReport;
