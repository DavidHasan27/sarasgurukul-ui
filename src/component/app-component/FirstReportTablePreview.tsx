import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Spinner } from "@material-tailwind/react";
import { te } from "date-fns/locale";
import { clone, find } from "lodash";
import { useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { faClose, faPrint } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  resetUpdatedReport,
  updateReportCard,
} from "../../redux/students/reportSlice";

const FirstReportTablePreview = ({
  data,
  student,
  onComplete,
  edit,
  closeModel,
  report,
}: any) => {
  const dispatch = useAppDispatch();
  const [answer, setAnswer] = useState<any>({});
  const [answerId, setAnswerId] = useState<any>({});
  const [error, setError] = useState<any>(false);
  const [newError, setNewError] = useState<any>(false);
  const [teacherComments, setTeacherComments] = useState<any>();
  const [teacherCommentsError, setTeacherCommentsError] = useState<any>();
  const [pramoted, setPramoted] = useState<any>();
  const [pramotedError, setPramotedError] = useState<any>();
  const contentRef = useRef<HTMLDivElement>(null);
  const promiseResolveRef = useRef<any>(null);
  const [enable, setEnable] = useState<any>("left");
  const [totalQuestion, setTotalQuestionId] = useState<any>();
  const [percetageQuestionId, setPercentageQuestionId] = useState<any>();
  const [isPrinting, setIsPrinting] = useState(false);
  const { loading, updateReportRes } = useAppSelector(
    (state: any) => state.report
  );
  const term = report.terms;
  // const reactToPrintFn = useReactToPrint({ contentRef });
  console.log("edit ", edit, term);

  const reactToPrintFn = useReactToPrint({
    contentRef,
  });

  useEffect(() => {
    if (edit) {
      setTeacherComments(report.teacherComments);
      setPramoted(report.promoted);
      const answerObj: any = {};
      const answeridObj: any = {};
      for (let i = 0; i < data.length; i++) {
        const reportQuestions = data[i].reportQuestions;
        console.log("reportQuestions1111", reportQuestions);
        answerObj[reportQuestions.id] = {
          augMarkScheduled: data[i].augMarkScheduled,
          decMarkScheduled: data[i].decMarkScheduled,

          augTeacherComments: data[i].augTeacherComments,
          decTeacherComments: data[i].decTeacherComments,

          halfMarkScheduled: data[i].halfMarkScheduled,
          finalMarkScheduled: data[i].finalMarkScheduled,

          halfTeacherComments: data[i].halfTeacherComments,
          finalTeacherComments: data[i].finalTeacherComments,
        };
        answeridObj[reportQuestions.id] = data[i].id;
      }

      console.log("answerObj >>>>", answerObj);
      setAnswer(answerObj);
      setAnswerId(answeridObj);
    }
  }, [edit]);

  //   useEffect(() => {
  //     if (answer) {
  //       console.log("Answer >>>", answer);
  //     }
  //   }, [answer]);

  useEffect(() => {
    if (updateReportRes) {
      closeModel();
      dispatch(resetUpdatedReport());
    }
  }, [updateReportRes]);

  const onChangeText = (id: any, text: any, key: any) => {
    const clonedAns = clone(answer);

    if (!clonedAns.hasOwnProperty(id)) {
      clonedAns[id] = {
        augMarkScheduled: "",
        decMarkScheduled: "",

        augTeacherComments: "",
        decTeacherComments: "",

        halfMarkScheduled: "",
        finalMarkScheduled: "",

        halfTeacherComments: "",
        finalTeacherComments: "",
      };
    }
    clonedAns[id][key] = text;

    let tpKey = "";
    if (term === "TERM-I") {
      if (enable === "left") {
        tpKey = "augMarkScheduled";
      } else {
        tpKey = "halfMarkScheduled";
      }
    } else {
      if (enable === "left") {
        tpKey = "decMarkScheduled";
      } else {
        tpKey = "finalMarkScheduled";
      }
    }

    if (tpKey === key) {
      let total = 0;

      for (var keyObj in clonedAns) {
        if (
          clonedAns[keyObj][tpKey] &&
          keyObj !== percetageQuestionId &&
          keyObj !== totalQuestion
        ) {
          total = parseInt(clonedAns[keyObj][tpKey]) + total;
        }
      }
      console.log("total", total);
      const percentage = (total * 100) / 900;
      if (clonedAns.hasOwnProperty(totalQuestion)) {
        clonedAns[totalQuestion][tpKey] = total;
        clonedAns[percetageQuestionId][tpKey] = percentage.toFixed(2) + "%";
      } else {
        clonedAns[totalQuestion] = {
          augMarkScheduled: "",
          decMarkScheduled: "",

          augTeacherComments: "",
          decTeacherComments: "",

          halfMarkScheduled: "",
          finalMarkScheduled: "",

          halfTeacherComments: "",
          finalTeacherComments: "",
        };
        clonedAns[percetageQuestionId] = {
          augMarkScheduled: "",
          decMarkScheduled: "",

          augTeacherComments: "",
          decTeacherComments: "",

          halfMarkScheduled: "",
          finalMarkScheduled: "",

          halfTeacherComments: "",
          finalTeacherComments: "",
        };
        clonedAns[totalQuestion][tpKey] = total;
        clonedAns[percetageQuestionId][tpKey] = percentage + "%";
      }
    }

    setError(false);
    setAnswer(clonedAns);
    console.log("clonedAns", clonedAns);
  };

  useEffect(() => {
    if (data) {
      const totalQuestioId = data.find(
        (obj: any) => obj.reportQuestions.title == "TOTAL"
      );
      const tPercentageQuestioId = data.find(
        (obj: any) => obj.reportQuestions.title === "PERCENTAGE"
      );
      setTotalQuestionId(totalQuestioId.reportQuestions.id);
      setPercentageQuestionId(tPercentageQuestioId.reportQuestions.id);
    }
  }, [data]);

  // const onSubmitData = (publish: any) => {
  //   let errorFound = false;
  //   for (let i = 0; i < data.length; i++) {
  //     //   if (!answer.hasOwnProperty(data[i].id)) {
  //     //     errorFound = true;
  //     //     setError(true);
  //     //     break;
  //     //   }
  //     for (let j = 0; j < data[i].child.length; j++) {
  //       if (!answer.hasOwnProperty(data[i].child[j].id)) {
  //         setError(true);
  //         break;
  //       }
  //     }
  //   }

  //   if (!teacherComments || !teacherComments.trim()) {
  //     setTeacherCommentsError(true);
  //     errorFound = true;
  //   }

  //   if (!pramoted || !pramoted.trim()) {
  //     setPramotedError(true);
  //     errorFound = true;
  //   }

  //   if (errorFound) {
  //     return;
  //   }

  //   const answerBody = [];
  //   for (var key in answer) {
  //     const value = {
  //       answer: answer[key],
  //       reportQuestions: {
  //         id: key,
  //       },
  //     };
  //     answerBody.push(value);
  //   }

  //   for (let i = 0; i < data.length; i++) {
  //     const value = {
  //       answer: "NA",
  //       reportQuestions: {
  //         id: data[i].id,
  //       },
  //     };
  //     answerBody.push(value);
  //   }

  //   const body = {
  //     reportQueAnswerKgs: answerBody,
  //     teacherComments: teacherComments,
  //     published: publish,
  //   };

  //   console.log("Answer Body :", answerBody);
  //   onComplete(body);
  // };

  const onSubmit = (publish: any) => {
    let errorFound = false;
    let errorKey;
    if (term === "TERM-I") {
      if (enable === "left") {
        errorKey = "augMarkScheduled";
      } else {
        errorKey = "halfMarkScheduled";
      }
    } else {
      if (enable === "left") {
        errorKey = "decMarkScheduled";
      } else {
        errorKey = "finalMarkScheduled";
      }
    }

    for (let i = 0; i < data.length; i++) {
      if (isShowError(data[i].reportQuestions.id, errorKey)) {
        errorFound = true;
        setError(true);
        break;
      }
    }

    if (!teacherComments || !teacherComments.trim()) {
      setTeacherCommentsError(true);
      errorFound = true;
    }

    if (!pramoted || !pramoted.trim()) {
      setPramotedError(true);
      errorFound = true;
    }

    if (errorFound) {
      return;
    }

    const answerBody = [];
    for (var key in answer) {
      const value = {
        ...answer[key],
        id: answerId[key],
        reportQuestions: {
          id: key,
        },
      };
      answerBody.push(value);
    }

    const bodyAns = {
      reportQueAnswerFirst: answerBody,
    };

    const body = {
      id: report.id,
      title: report.terms,
      remark: "",
      otherInfo: "",
      teacherComments: teacherComments,
      terms: report.terms,
      promoted: pramoted,
      studentYears: {
        id: report.studentYears.id,
      },
      reportQueAnswerKgs: null,
      reportQueAnswerPlay: null,
      reportQueAnswerFirst: null,
      published: publish,
    };

    const finalBody = Object.assign({}, body, bodyAns);
    console.log("Final Body", finalBody);
    dispatch(updateReportCard(finalBody));
  };

  const isShowGradeError = (id: any) => {
    if (!answer.hasOwnProperty(id)) {
      return true;
    } else if (answer.hasOwnProperty(id) && !answer[id]["grade"]) {
      return true;
    }
  };

  const isShowError = (id: any, key: any) => {
    if (!answer.hasOwnProperty(id)) {
      return true;
    } else if (answer.hasOwnProperty(id) && !answer[id][key]) {
      return true;
    }
  };

  return (
    <div>
      <div className="w-full flex-col px-5">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl text-black mt-2">Student Reports</h1>
          <h1 className="text-lg text-gray-700 -mt-3">
            {student.firstName + " " + student.lastName}{" "}
            {report.studentYears.classId.className}
            {"(" + report.studentYears.classId.classIdentity + ")"}
          </h1>
        </div>
        <div className="w-full flex flex-row">
          <form className=" bg-white rounded shadow-xl min-h-[400px] flex-1 border border-gray-300 pb-10 mt-10">
            <div className="w-[100%] h-[100px] flex flex-row border-b border-gray-300">
              <div className="w-[20%] h-full  border-r border-gray-300 uppercase font-semibold text-sm items-center justify-center flex flex-row">
                {"Marks out of 100"}
              </div>
              <div className="flex flex-col w-[80%] ">
                <div className="flex flex-row w-full h-[50px] border-b border-gray-300">
                  <div
                    className="w-[50%] h-full border-r border-gray-300 uppercase font-semibold text-sm items-center justify-center flex flex-row "
                    onClick={() => setEnable("left")}
                  >
                    {term === "TERM-I"
                      ? "AUGUST UNIT ASSESSMENT"
                      : "DECEMBER UNIT ASSESSMENT"}
                  </div>
                  <div
                    className="w-[50%] h-full border-r border-gray-300 uppercase font-semibold text-sm items-center justify-center flex flex-row "
                    onClick={() => setEnable("right")}
                  >
                    {term === "TERM-I"
                      ? "HALF YEARLY ASSESSMENT"
                      : "FINAL ASSESSMENT"}
                  </div>
                </div>
                <div className="flex flex-row w-full h-[50px]">
                  <div
                    className="w-[25%] h-full border-r border-gray-300 uppercase font-semibold text-sm items-center justify-center flex flex-row "
                    style={{ opacity: enable == "left" || !edit ? 1 : 0.5 }}
                  >
                    {"MARK SECURED"}
                  </div>
                  <div
                    className="w-[25%] h-full  border-r border-gray-300 uppercase font-semibold text-sm items-center justify-center flex flex-row "
                    style={{ opacity: enable == "left" || !edit ? 1 : 0.5 }}
                  >
                    {"TEACHER'S COMMENT"}
                  </div>
                  <div
                    className="w-[25%] h-full border-r border-gray-300 uppercase font-semibold text-sm items-center justify-center flex flex-row "
                    style={{ opacity: enable == "right" || !edit ? 1 : 0.5 }}
                  >
                    {"MARK SECURED"}
                  </div>
                  <div
                    className="w-[25%]  h-full border-r border-gray-300 uppercase font-semibold text-sm items-center justify-center flex flex-row "
                    style={{ opacity: enable == "right" || !edit ? 1 : 0.5 }}
                  >
                    {"TEACHER'S COMMENT"}
                  </div>
                </div>
              </div>
            </div>

            {data &&
              data.map((item: any, index: number) => {
                //   const errorObj = error && isShowError(item.id);

                const augDecMarhSecured =
                  term === "TERM-I" ? "augMarkScheduled" : "decMarkScheduled";

                const augDecTeacherComments =
                  term === "TERM-I"
                    ? "augTeacherComments"
                    : "decTeacherComments";

                const halfFinalMarhSecured =
                  term === "TERM-I"
                    ? "halfMarkScheduled"
                    : "finalMarkScheduled";

                const halfFinalTeacherComments =
                  term === "TERM-I"
                    ? "halfTeacherComments"
                    : "finalTeacherComments";

                //   halfTeacherComments: "",
                //   finalTeacherComments: "",

                return (
                  <div className="w-[100%] h-[50px] flex flex-row border-b border-gray-300">
                    <div className="w-[25%] h-full  border-r border-gray-300 text-sm items-center  flex flex-row">
                      <div className="ml-12 text-gray-800 text-left">
                        {item.reportQuestions.title}
                      </div>
                    </div>

                    <div
                      className={`w-[25%] h-full border-r border-gray-300 uppercase  text-sm items-center justify-center flex flex-row`}
                      style={{ opacity: enable == "left" || !edit ? 1 : 0.5 }}
                    >
                      <div className=" text-gray-800">
                        {edit ? (
                          <input
                            className={`w-full px-2 py-1 text-gray-700 ${
                              enable == "left" &&
                              isShowError(
                                item.reportQuestions.id,
                                augDecMarhSecured
                              ) &&
                              error
                                ? " bg-red-200"
                                : ""
                            } bg-[#e5e7eb] rounded h-10 min-w-10 text-center `}
                            id={augDecMarhSecured}
                            name={augDecMarhSecured}
                            required
                            placeholder="MARK SECURED"
                            aria-label="Name"
                            value={
                              answer.hasOwnProperty(item.reportQuestions.id)
                                ? answer[item.reportQuestions.id][
                                    augDecMarhSecured
                                  ]
                                : ""
                            }
                            onChange={(event: any) => {
                              if (
                                item.reportQuestions.title != "TOTAL" &&
                                item.reportQuestions.title != "PERCENTAGE"
                              ) {
                                if (
                                  !event.target.value ||
                                  (!isNaN(event.target.value) &&
                                    parseFloat(event.target.value) <= 100)
                                ) {
                                  onChangeText(
                                    item.reportQuestions.id,
                                    event.target.value,
                                    augDecMarhSecured
                                  );
                                }
                              }
                            }}
                            disabled={
                              enable == "right" ||
                              item.title === "TOTAL" ||
                              item.title === "PERCENTAGE"
                            }
                          />
                        ) : (
                          <div className=" text-black font-medium">
                            {item[augDecMarhSecured]}
                          </div>
                        )}
                      </div>
                    </div>

                    <div
                      className={`w-[25%] h-full border-r border-gray-300 uppercase  text-sm items-center justify-center flex flex-row `}
                      style={{ opacity: enable == "left" || !edit ? 1 : 0.5 }}
                    >
                      <div className=" text-gray-800">
                        {edit ? (
                          <input
                            className={`w-full px-2 py-1 text-gray-700 bg-[#e5e7eb] rounded h-10 min-w-10 text-center  `}
                            id={augDecTeacherComments}
                            name={augDecTeacherComments}
                            type="text"
                            required
                            placeholder={"TEACHER'S COMMENT"}
                            aria-label="Name"
                            value={
                              answer.hasOwnProperty(item.reportQuestions.id)
                                ? answer[item.reportQuestions.id][
                                    augDecTeacherComments
                                  ]
                                : ""
                            }
                            onChange={(event) => {
                              onChangeText(
                                item.reportQuestions.id,
                                event.target.value,
                                augDecTeacherComments
                              );
                            }}
                            disabled={enable == "right"}
                          />
                        ) : (
                          <div className=" text-black font-medium">
                            {item[augDecTeacherComments]}
                          </div>
                        )}
                      </div>
                    </div>

                    <div
                      className={`w-[25%] h-full border-r border-gray-300 uppercase  text-sm items-center justify-center flex flex-row `}
                      style={{ opacity: enable == "right" ? 1 : 0.5 }}
                    >
                      <div className=" text-gray-800">
                        {edit ? (
                          <input
                            className={`w-full px-2 py-1 text-gray-700 bg-[#e5e7eb] rounded h-10 min-w-10 text-center ${
                              enable == "right" &&
                              isShowError(
                                item.reportQuestions.id,
                                halfFinalMarhSecured
                              ) &&
                              error
                                ? "bg-red-200"
                                : ""
                            } `}
                            id={halfFinalMarhSecured}
                            name={halfFinalMarhSecured}
                            type="text"
                            required
                            placeholder="MARK SECURED"
                            aria-label={halfFinalMarhSecured}
                            value={
                              answer.hasOwnProperty(item.reportQuestions.id)
                                ? answer[item.reportQuestions.id][
                                    halfFinalMarhSecured
                                  ]
                                : ""
                            }
                            onChange={(event: any) => {
                              if (
                                item.reportQuestions.title != "TOTAL" &&
                                item.reportQuestions.title != "PERCENTAGE"
                              ) {
                                if (
                                  !event.target.value ||
                                  (!isNaN(event.target.value) &&
                                    parseFloat(event.target.value) <= 100)
                                ) {
                                  onChangeText(
                                    item.reportQuestions.id,
                                    event.target.value,
                                    halfFinalMarhSecured
                                  );
                                }
                              }

                              //   setClassName(event.target.value);
                              //   setClassNameError("");
                            }}
                            disabled={
                              enable == "left" ||
                              item.title === "TOTAL" ||
                              item.title === "PERCENTAGE"
                            }
                          />
                        ) : (
                          <div className=" text-black font-medium">
                            {item[halfFinalMarhSecured]}
                          </div>
                        )}
                      </div>
                    </div>

                    <div
                      className={`w-[25%] h-full border-r border-gray-300 uppercase  text-sm items-center justify-center flex flex-row `}
                      style={{ opacity: enable == "right" || !edit ? 1 : 0.5 }}
                    >
                      <div className=" text-gray-800">
                        {edit ? (
                          <input
                            className={`w-full px-2 py-1 text-gray-700 bg-[#e5e7eb] rounded h-10 min-w-10 text-center  `}
                            id={halfFinalTeacherComments}
                            name={halfFinalTeacherComments}
                            type="text"
                            required
                            placeholder="TEACHER'S COMMENT"
                            aria-label={halfFinalTeacherComments}
                            value={
                              answer.hasOwnProperty(item.reportQuestions.id)
                                ? answer[item.reportQuestions.id][
                                    halfFinalTeacherComments
                                  ]
                                : ""
                            }
                            onChange={(event) => {
                              onChangeText(
                                item.reportQuestions.id,
                                event.target.value,
                                halfFinalTeacherComments
                              );
                            }}
                            disabled={enable == "left"}
                          />
                        ) : (
                          <div className=" text-black font-medium">
                            {item[halfFinalTeacherComments]}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </form>
        </div>

        <div className="w-full flex flex-row pt-2">
          <div className="flex-1">
            <label className="block text-sm text-gray-600 text-left font-semibold">
              Teacher Comments
            </label>

            {edit ? (
              <textarea
                className={`w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded ${
                  teacherCommentsError ? "border-2 border-red-500" : ""
                }`}
                id="message"
                name="message"
                rows={4}
                required
                placeholder="Teacher Comments"
                aria-label="message"
                value={teacherComments}
                onChange={(event) => {
                  setTeacherComments(event.target.value);
                  setTeacherCommentsError(false);
                }}
              ></textarea>
            ) : (
              <div className=" text-black font-medium">
                {report.teacherComments}
              </div>
            )}
          </div>
          <div className="w-5"></div>
          <div className="flex-1">
            <label className="block text-sm text-gray-600 text-left">
              Pramoted
            </label>
            {edit ? (
              <input
                className={`w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded ${
                  pramotedError ? "border-2 border-red-500" : ""
                }`}
                id="Pramoted To"
                name="relativename"
                required
                placeholder="Promoted to"
                aria-label="relativename"
                value={pramoted}
                onChange={(event) => {
                  setPramoted(event.target.value);
                  setPramotedError(false);
                }}
              />
            ) : (
              <div className=" text-black font-medium">{report.promoted}</div>
            )}
            {edit && (
              <div className="flex flex-row-reverse items-end w-full mt-4">
                <Button
                  variant="gradient"
                  color="blue"
                  placeholder={"Submit"}
                  onClick={() => onSubmit(true)}
                >
                  Save and Publish
                </Button>

                <Button
                  variant="gradient"
                  color="blue"
                  placeholder={"Submit"}
                  className="mr-5 w-[150px]"
                  onClick={() => onSubmit(false)}
                >
                  Save Only
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: "none" }}>
        <div
          className="w-full flex flex-col  absolute px-3 py-1 "
          ref={contentRef}
        >
          {/* <style type="text/css" media="print">
            {" @page { size: portrait; } "}
          </style> */}
          <table className="print-component">
            <thead>
              <tr>
                <th>
                  <div>
                    <div className="flex flex-col justify-center w-full items-center mt-4 ">
                      <div className="roboto-bold text-2xl">
                        SARA'S GURUKUL Pre -Primary School
                      </div>
                      <div className="roboto-bold text-xl -mt-1">
                        Lower Primary - {report.terms}
                      </div>
                    </div>
                    <div>
                      <div className="ml-5 mt-2">
                        <label className="text-sm roboto-bold ">
                          Name:{" "}
                          <label className="roboto-regular">
                            {student.firstName + " " + student.lastName}{" "}
                          </label>
                        </label>
                      </div>
                      <div className="ml-5 -mt-1">
                        <label className="text-sm roboto-bold ">
                          Class:{" "}
                          <label className="roboto-regular">
                            {report.studentYears.classId.className}
                            {"(" +
                              report.studentYears.classId.classIdentity +
                              ")"}
                          </label>
                        </label>
                      </div>
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div>
                    <div className="w-full flex flex-row px-3">
                      <style type="text/css" media="print">
                        {" @page { size: landscape; } "}
                      </style>
                      <form className=" bg-white rounded min-h-[400px] flex-1 border border-gray-300 mt-2">
                        <div className="w-[100%] h-[100px] flex flex-row border-b border-gray-300">
                          <div className="w-[20%] h-full  border-r border-gray-300 uppercase font-semibold text-sm items-center justify-center flex flex-row">
                            {"Marks out of 100"}
                          </div>
                          <div className="flex flex-col w-[80%] ">
                            <div className="flex flex-row w-full h-[50px] border-b border-gray-300">
                              <div
                                className="w-[50%] h-full border-r border-gray-300 uppercase font-semibold text-sm items-center justify-center flex flex-row "
                                onClick={() => setEnable("left")}
                              >
                                {term === "TERM-I"
                                  ? "AUGUST UNIT ASSESSMENT"
                                  : "DECEMBER UNIT ASSESSMENT"}
                              </div>
                              <div
                                className="w-[50%] h-full border-r border-gray-300 uppercase font-semibold text-sm items-center justify-center flex flex-row "
                                onClick={() => setEnable("right")}
                              >
                                {term === "TERM-I"
                                  ? "HALF YEARLY ASSESSMENT"
                                  : "FINAL ASSESSMENT"}
                              </div>
                            </div>
                            <div className="flex flex-row w-full h-[50px]">
                              <div
                                className="w-[25%] h-full border-r border-gray-300 uppercase font-semibold text-sm items-center justify-center flex flex-row "
                                style={{
                                  opacity: enable == "left" || !edit ? 1 : 0.5,
                                }}
                              >
                                {"MARK SECURED"}
                              </div>
                              <div
                                className="w-[25%] h-full  border-r border-gray-300 uppercase font-semibold text-sm items-center justify-center flex flex-row "
                                style={{
                                  opacity: enable == "left" || !edit ? 1 : 0.5,
                                }}
                              >
                                {"TEACHER'S COMMENT"}
                              </div>
                              <div
                                className="w-[25%] h-full border-r border-gray-300 uppercase font-semibold text-sm items-center justify-center flex flex-row "
                                style={{
                                  opacity: enable == "right" || !edit ? 1 : 0.5,
                                }}
                              >
                                {"MARK SECURED"}
                              </div>
                              <div
                                className="w-[25%]  h-full border-r border-gray-300 uppercase font-semibold text-sm items-center justify-center flex flex-row "
                                style={{
                                  opacity: enable == "right" || !edit ? 1 : 0.5,
                                }}
                              >
                                {"TEACHER'S COMMENT"}
                              </div>
                            </div>
                          </div>
                        </div>

                        {data &&
                          data.map((item: any, index: number) => {
                            //   const errorObj = error && isShowError(item.id);

                            const augDecMarhSecured =
                              term === "TERM-I"
                                ? "augMarkScheduled"
                                : "decMarkScheduled";

                            const augDecTeacherComments =
                              term === "TERM-I"
                                ? "augTeacherComments"
                                : "decTeacherComments";

                            const halfFinalMarhSecured =
                              term === "TERM-I"
                                ? "halfMarkScheduled"
                                : "finalMarkScheduled";

                            const halfFinalTeacherComments =
                              term === "TERM-I"
                                ? "halfTeacherComments"
                                : "finalTeacherComments";

                            //   halfTeacherComments: "",
                            //   finalTeacherComments: "",

                            return (
                              <div className="w-[100%] h-[45px] flex flex-row border-b border-gray-300">
                                <div className="w-[25%] h-full  border-r border-gray-300 text-sm items-center  flex flex-row">
                                  <div className="ml-12 text-gray-800 text-left">
                                    {item.reportQuestions.title}
                                  </div>
                                </div>

                                <div
                                  className={`w-[25%] h-full border-r border-gray-300 uppercase  text-sm items-center justify-center flex flex-row`}
                                  style={{
                                    opacity:
                                      enable == "left" || !edit ? 1 : 0.5,
                                  }}
                                >
                                  <div className=" text-gray-800">
                                    <div className=" text-black font-medium">
                                      {item[augDecMarhSecured]}
                                    </div>
                                  </div>
                                </div>

                                <div
                                  className={`w-[25%] h-full border-r border-gray-300 uppercase  text-sm items-center justify-center flex flex-row `}
                                  style={{
                                    opacity:
                                      enable == "left" || !edit ? 1 : 0.5,
                                  }}
                                >
                                  <div className=" text-gray-800">
                                    <div className=" text-black font-medium">
                                      {item[augDecTeacherComments]}
                                    </div>
                                  </div>
                                </div>

                                <div
                                  className={`w-[25%] h-full border-r border-gray-300 uppercase  text-sm items-center justify-center flex flex-row `}
                                  style={{
                                    opacity: enable == "right" ? 1 : 0.5,
                                  }}
                                >
                                  <div className=" text-gray-800">
                                    <div className=" text-black font-medium">
                                      {item[halfFinalMarhSecured]}
                                    </div>
                                  </div>
                                </div>

                                <div
                                  className={`w-[25%] h-full border-r border-gray-300 uppercase  text-sm items-center justify-center flex flex-row `}
                                  style={{
                                    opacity:
                                      enable == "right" || !edit ? 1 : 0.5,
                                  }}
                                >
                                  <div className=" text-gray-800">
                                    <div className=" text-black font-medium">
                                      {item[halfFinalTeacherComments]}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </form>
                    </div>

                    <div className="flex flex-row mt-5">
                      <div className="flex flex-col  w-full ml-5 flex-1">
                        <label className="text-sm roboto-bold mt-4">
                          Teachers Comments:{" "}
                        </label>
                        <label className="roboto-regular">
                          {report.teacherComments}
                        </label>
                        <label className="text-sm roboto-bold mt-4">
                          Promoted :{" "}
                        </label>
                        <label className="roboto-regular">
                          {report.promoted}
                        </label>
                      </div>

                      <div className="flex flex-row  w-full ml-5 flex-1">
                        <div className="flex flex-col flex-1 pr-5">
                          <label className="text-sm roboto-bold mt-4">
                            Principal Signature:{" "}
                          </label>
                          <div className="h-[80px] w-full border-2 border-black mt-1"></div>
                        </div>
                        <div className="flex flex-col flex-1  pr-5">
                          <label className="text-sm roboto-bold mt-4">
                            Teacher Signature:{" "}
                          </label>
                          <div className="h-[80px] w-full border-2 border-black mt-1"></div>
                        </div>

                        <div className="flex flex-col flex-1  pr-5">
                          <label className="text-sm roboto-bold mt-4">
                            Parents Signature:{" "}
                          </label>
                          <div className="h-[80px] w-full border-2 border-black mt-1"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className=" absolute right-0 top-5">
        {!edit && (
          <Button
            variant="gradient"
            color="blue"
            size="sm"
            placeholder={"Submit"}
            className="mr-5 w-[110px]"
            onClick={() => reactToPrintFn()}
          >
            <FontAwesomeIcon icon={faPrint} className="mr-2" />
            Print
          </Button>
        )}

        <Button
          variant="gradient"
          color="blue"
          size="sm"
          placeholder={"Close"}
          className="mr-5 w-[110px]"
          onClick={() => closeModel()}
        >
          <FontAwesomeIcon icon={faClose} className="mr-2" />
          Close
        </Button>
      </div>

      {loading && (
        <div
          className="absolute h-[100vh] w-[100%] top-0 left-0 flex flex-col items-center justify-center"
          style={{ backgroundColor: "rgb(0,0,0, 0.3)" }}
        >
          <Spinner className="h-10 w-10" color="blue" />
        </div>
      )}
    </div>
  );
};

export default FirstReportTablePreview;
