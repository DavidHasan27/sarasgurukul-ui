import ParentLayout from "../../component/app-component/Parent";
import Select from "react-select";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useLocation, useNavigate } from "react-router-dom";
import { TERMS } from "../../utils/constants";
import { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Select1 from "react-select";
import { Button, Typography } from "@material-tailwind/react";
import {
  createNewReport,
  getReportQuestion,
  getStudentYears,
} from "../../redux/students/reportSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSchool } from "@fortawesome/free-solid-svg-icons";
import KGReportTable from "../../component/app-component/KGReportTable";
import PlayGroupReportTable from "../../component/app-component/PlayGroupReportTable";
import FirstReportTable from "../../component/app-component/FirstReportTable";

const NewReport = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentObj = location.state;
  const dispatch = useAppDispatch();
  const [term, setTerm] = useState<any>();
  const [termError, setTermError] = useState();
  const [yearsMenu, setYearsMenu] = useState<any>();
  const [years, setYears] = useState<any>();
  const {
    loading,
    error,
    success,
    reportQuestionList,
    studentYearList,
    newReport,
  } = useAppSelector((state: any) => state.report);

  console.log("current Obj", reportQuestionList);

  useEffect(() => {
    dispatch(getStudentYears({ studentId: currentObj.student.id }));
  }, []);

  useEffect(() => {
    if (newReport) {
      navigate(-1);
    }
  }, [newReport]);

  const getReportQuestinData = () => {
    const body = {
      classType: currentObj.student.schoolClass.classIdentity,
      term:
        currentObj.student.schoolClass.classIdentity === "PLAY_GROUP"
          ? "TERM-I"
          : term.value,
    };

    dispatch(getReportQuestion(body));
  };

  const formatOptionLabel = ({ value, label }: any) => {
    return (
      <div
        className={`flex flex-col text-left px-3 border-b-[1px] border-gray-400 ${
          !value.active ? "opacity-50" : ""
        }`}
        onClick={() => {
          setYears(value);
          setYearsMenu(false);
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

  const onSubmit = (anserBody: any) => {
    const body = {
      title: term.value,
      remark: "string",
      otherInfo: "string",
      teacherComments: "string",
      terms: term.value,
      promoted: "string",
      studentYears: {
        id: years.id,
      },
      reportQueAnswerKgs: null,
      reportQueAnswerPlay: null,
      reportQueAnswerFirst: null,
      published: true,
    };

    const finalBody = Object.assign({}, body, anserBody);
    console.log("Final Body", finalBody);
    dispatch(createNewReport(finalBody));
  };

  const getReportComponet = () => {
    if (
      currentObj.student.schoolClass.classIdentity === "JR_KG" ||
      currentObj.student.schoolClass.classIdentity === "SR_KG" ||
      currentObj.student.schoolClass.classIdentity === "NURSERY"
    ) {
      return (
        <div className="flex  text-center justify-center">
          <KGReportTable
            data={reportQuestionList ? reportQuestionList : []}
            student={currentObj.studentj}
            onComplete={(body: any) => onSubmit(body)}
          />
        </div>
      );
    } else if (currentObj.student.schoolClass.classIdentity === "PLAY_GROUP") {
      return (
        <div className="flex  text-center justify-center">
          <PlayGroupReportTable
            data={reportQuestionList ? reportQuestionList : []}
            student={currentObj.studentj}
            onComplete={(body: any) => onSubmit(body)}
          />
          ;
        </div>
      );
    } else {
      return (
        <div className="flex  text-center justify-center">
          <FirstReportTable
            data={reportQuestionList ? reportQuestionList : []}
            student={currentObj.studentj}
            onComplete={(body: any) => onSubmit(body)}
            term={term.value}
          />
          ;
        </div>
      );
    }
  };

  return (
    <ParentLayout loading={loading}>
      <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
        <main className="w-full flex-grow p-6">
          <span>
            <h1 className="w-full text-3xl text-black mt-2">Student Reports</h1>
            <h2 className="w-full text-xl text-black mt-2">
              {currentObj.student.firstName +
                " " +
                currentObj.student.lastName +
                " - " +
                currentObj.student.schoolClass.className +
                "(" +
                currentObj.student.schoolClass.classIdentity +
                ")"}
            </h2>
          </span>

          <div className="flex flex-row justify-end mt-5">
            <Select
              name="role"
              placeholder="Select Terms"
              options={TERMS}
              getOptionLabel={(option: any) => option.option}
              getOptionValue={(option) => option.value}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  backgroundColor: "#e5e7eb",
                  borderColor: state.isFocused ? "#0f58bf" : "#e1e4e8",
                  textAlign: "left",
                  width: "200px",
                  height: "40px",
                  marginRight: "10px",
                }),
                option: (baseStyles, state) => ({
                  ...baseStyles,
                  textAlign: "left",
                }),
              }}
              classNamePrefix="Select Terms"
              onChange={(event) => {
                console.log("Bloood Group >>>>>", event);
                setTerm(event);
              }}
              value={term}
            />

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
              onClick={() => getReportQuestinData()}
              disabled={!term || !years}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Get Report
            </Button>
          </div>

          {!term || !years ? (
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
                Please select terms and school years to generate reports
              </Typography>
            </div>
          ) : !reportQuestionList || reportQuestionList.lenth == 0 ? (
            <Button
              variant="gradient"
              color="blue"
              placeholder={"Submit"}
              className="mr-5 w-[200px] mt-[10%]"
              onClick={() => getReportQuestinData()}
              disabled={!term || !years}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Get Report
            </Button>
          ) : (
            getReportComponet()
          )}
        </main>
      </div>
    </ParentLayout>
  );
};

export default NewReport;
