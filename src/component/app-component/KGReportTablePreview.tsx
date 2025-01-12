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

const KGReportTablePreview = ({
  data,
  student,
  onComplete,
  edit,
  closeModel,
  report,
}: any) => {
  console.log("data ####", report, data);
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
  const [isPrinting, setIsPrinting] = useState(false);
  const { loading, updateReportRes } = useAppSelector(
    (state: any) => state.report
  );
  // const reactToPrintFn = useReactToPrint({ contentRef });

  const reactToPrintFn = useReactToPrint({
    contentRef,
  });

  const listlength = Math.floor(data.length / 2);

  useEffect(() => {
    if (edit) {
      setTeacherComments(report.teacherComments);
      setPramoted(report.promoted);
      const answerObj: any = {};
      const answeridObj: any = {};
      for (let i = 0; i < data.length; i++) {
        const reportQuestions = data[i].reportQuestions;
        answerObj[reportQuestions.id] = data[i].answer;
        answeridObj[reportQuestions.id] = data[i].id;
        for (let j = 0; j < data[i].child.length; j++) {
          const reportQuestionsChild = data[i].child[j].reportQuestions;
          answerObj[reportQuestionsChild.id] = data[i].child[j].answer;
          answeridObj[reportQuestionsChild.id] = data[i].child[j].id;
        }
      }
      setAnswer(answerObj);
      setAnswerId(answeridObj);
    }
  }, [edit]);

  useEffect(() => {
    if (updateReportRes) {
      closeModel();
      dispatch(resetUpdatedReport());
    }
  }, [updateReportRes]);

  const onChangeText = (id: any, text: any) => {
    const clonedAns = clone(answer);
    if (text) {
      clonedAns[id] = text;
      console.log(clonedAns);
    } else {
      delete clonedAns[id];
    }
    setAnswer(clonedAns);
  };

  const isShowError = (id: any) => {
    if (error) {
      if (!answer.hasOwnProperty(id)) {
        return true;
      }
    }
  };

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
    for (let i = 0; i < data.length; i++) {
      //   if (!answer.hasOwnProperty(data[i].id)) {
      //     errorFound = true;
      //     setError(true);
      //     break;
      //   }
      for (let j = 0; j < data[i].child.length; j++) {
        if (!answer.hasOwnProperty(data[i].child[j].id)) {
          setError(true);
          break;
        }
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
      find(data, (obj) => obj.reportQuestions.id == key);
      const value = {
        answer: answer[key],
        id: answerId[key],
        reportQuestions: {
          id: key,
        },
      };
      answerBody.push(value);
    }

    for (let i = 0; i < data.length; i++) {
      const value = {
        answer: "NA",
        reportQuestions: {
          id: data[i].reportQuestions.id,
        },
      };
      answerBody.push(value);
    }

    const bodyAns = {
      reportQueAnswerKgs: answerBody,
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
          <style type="text/css" media="print">
            {" @page { size: landscape; } "}
          </style>
          <form className=" bg-white rounded shadow-xl min-h-[400px] flex-1 border border-gray-300 pb-10">
            <div className="w-[100%] h-[50px] flex flex-row border-b border-gray-300">
              <div className="flex-1 h-full  border-r border-gray-300 uppercase font-semibold text-sm items-center justify-center flex flex-row">
                {"Subjects"}
              </div>
              <div className="flex-1 h-full  uppercase font-semibold text-sm items-center justify-center flex flex-row ">
                {report.terms}
              </div>
            </div>

            {data &&
              data.map((item: any, index: number) => {
                console.log(index, listlength);
                if (index <= listlength - 1) {
                  return (
                    <>
                      <div className="w-[100%] h-[50px] flex flex-row border-b border-gray-300 bg-blue-gray-100">
                        <div className="flex-1 h-full  border-r border-gray-300 text-sm items-center flex flex-row font-bold">
                          <div className="ml-10">
                            {item.reportQuestions.title}
                          </div>
                        </div>
                      </div>
                      {item.child.map((subItem: any) => {
                        return (
                          <div className="w-[100%] h-[50px] flex flex-row border-b border-gray-300">
                            <div className="flex-1 h-full  border-r border-gray-300 text-sm items-center  flex flex-row">
                              <div className="ml-12 text-gray-800 text-left">
                                {subItem.reportQuestions.title}
                              </div>
                            </div>
                            <div className="flex-1 h-full  uppercase  text-sm items-center justify-center flex flex-row ">
                              <div className=" text-gray-800">
                                {edit ? (
                                  <input
                                    className={`ml-12 w-full px-2 py-1 text-gray-700 bg-[#e5e7eb] rounded h-10 min-w-10 text-center ${
                                      isShowError(subItem.reportQuestions.id)
                                        ? "border-2 border-red-500"
                                        : ""
                                    } `}
                                    id="term"
                                    name="term"
                                    type="text"
                                    required
                                    placeholder="Enter Grade"
                                    aria-label="Name"
                                    value={answer[subItem.reportQuestions.id]}
                                    onChange={(event) => {
                                      onChangeText(
                                        subItem.reportQuestions.id,
                                        event.target.value
                                      );
                                    }}
                                    // disabled={!school}
                                  />
                                ) : (
                                  <div className=" text-black font-medium">
                                    {subItem.answer}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  );
                }
              })}
          </form>
          <div className="w-5"></div>
          <form className=" bg-white rounded shadow-xl min-h-[400px] flex-1 border border-gray-300 pb-10">
            <div className="w-[100%] h-[50px] flex flex-row border-b border-gray-300">
              <div className="flex-1 h-full  border-r border-gray-300 uppercase font-semibold text-sm items-center justify-center flex flex-row">
                {"Subjects"}
              </div>
              <div className="flex-1 h-full  uppercase font-semibold text-sm items-center justify-center flex flex-row ">
                {report.terms}
              </div>
            </div>

            {data &&
              data.map((item: any, index: number) => {
                if (index > listlength - 1) {
                  return (
                    <>
                      <div className="w-[100%] h-[50px] flex flex-row border-b border-gray-300 bg-blue-gray-100">
                        <div className="flex-1 h-full  border-r border-gray-300 text-sm items-center flex flex-row font-bold">
                          <div className="ml-10">
                            {item.reportQuestions.title}
                          </div>
                        </div>
                      </div>
                      {item.child.map((subItem: any) => (
                        <div className="w-[100%] h-[50px] flex flex-row border-b border-gray-300">
                          <div className="flex-1 h-full  border-r border-gray-300 text-sm items-center  flex flex-row">
                            <div className="ml-12 text-black text-left">
                              {subItem.reportQuestions.title}
                            </div>
                          </div>
                          <div className="flex-1 h-full  uppercase  text-sm items-center justify-center flex flex-row ">
                            <div className="ml-12 text-gray-800">
                              {edit ? (
                                <input
                                  className={`w-full px-2 py-1 text-gray-700 bg-[#e5e7eb] rounded h-10 min-w-10 text-center ${
                                    isShowError(subItem.reportQuestions.id)
                                      ? "border-2 border-red-500"
                                      : ""
                                  } `}
                                  id="term"
                                  name="term"
                                  type="text"
                                  required
                                  placeholder="Enter Grade"
                                  aria-label="Name"
                                  value={answer[subItem.reportQuestions.id]}
                                  onChange={(event) => {
                                    onChangeText(
                                      subItem.reportQuestions.id,
                                      event.target.value
                                    );
                                    //   setClassName(event.target.value);
                                    //   setClassNameError("");
                                  }}
                                  // disabled={!school}
                                />
                              ) : (
                                <div className=" text-black font-medium">
                                  {subItem.answer}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  );
                }
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
          <table className="print-component">
            <thead>
              <tr>
                <th>
                  <div>
                    <div className="flex flex-col justify-center w-full items-center ">
                      <div className="roboto-bold text-2xl">
                        SARA'S GURUKUL Pre -Primary School
                      </div>
                      <div className="roboto-bold text-xl -mt-1">
                        Lower Primary - {report.terms}
                      </div>
                    </div>
                    <div>
                      <div className="ml-5">
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
                      <form className=" bg-white min-h-[400px] flex-1 border border-gray-300 pb-10">
                        <div className="w-[100%] h-[40px] flex flex-row border-b border-gray-300">
                          <div className="flex-1 h-full  border-r border-gray-300 uppercase font-semibold text-sm items-center justify-center flex flex-row">
                            {"Subjects"}
                          </div>
                          <div className="flex-1 h-full  uppercase font-semibold text-sm items-center justify-center flex flex-row ">
                            {report.terms}
                          </div>
                        </div>

                        {data &&
                          data.map((item: any, index: number) => {
                            console.log(index, listlength);
                            if (index <= listlength - 1) {
                              return (
                                <>
                                  <div className="w-[100%] h-[40px] flex flex-row border-b border-gray-300 bg-blue-gray-100">
                                    <div className="flex-1 h-full  border-r border-gray-300 text-sm items-center flex flex-row font-bold">
                                      <div className="ml-3">
                                        {item.reportQuestions.title}
                                      </div>
                                    </div>
                                  </div>
                                  {item.child.map((subItem: any) => (
                                    <div className="w-[100%] h-[40px] flex flex-row border-b border-gray-300">
                                      <div className="flex-1 h-full  border-r border-gray-300 text-sm items-center  flex flex-row">
                                        <div className="ml-4 text-gray-800 text-left">
                                          {subItem.reportQuestions.title}
                                        </div>
                                      </div>
                                      <div className="flex-1 h-full  uppercase  text-sm items-center justify-center flex flex-row ">
                                        <div className=" text-gray-800">
                                          {edit ? (
                                            <input
                                              className={`ml-12 w-full px-2 py-1 text-gray-700 bg-[#e5e7eb] rounded h-10 min-w-10 text-center ${
                                                isShowError(
                                                  subItem.reportQuestions.id
                                                )
                                                  ? "border-2 border-red-500"
                                                  : ""
                                              } `}
                                              id="term"
                                              name="term"
                                              type="text"
                                              required
                                              placeholder="Enter Grade"
                                              aria-label="Name"
                                              // value={
                                              //   subItem.id in answer ? answer[subItem.id] : ""
                                              // }
                                              onChange={(event) => {
                                                console.log(
                                                  " Value > " +
                                                    subItem.id +
                                                    " Value > " +
                                                    event.target.value
                                                );
                                                onChangeText(
                                                  subItem.reportQuestions.id,
                                                  event.target.value
                                                );
                                                //   setClassName(event.target.value);
                                                //   setClassNameError("");
                                              }}
                                              // disabled={!school}
                                            />
                                          ) : (
                                            <div className=" text-black font-medium">
                                              {subItem.answer}
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </>
                              );
                            }
                          })}
                      </form>
                      <div className="w-2"></div>
                      <form className=" bg-white min-h-[400px] flex-1 border border-gray-300 pb-10">
                        <div className="w-[100%] h-[40px] flex flex-row border-b border-gray-300">
                          <div className="flex-1 h-full  border-r border-gray-300 uppercase font-semibold text-sm items-center justify-center flex flex-row">
                            {"Subjects"}
                          </div>
                          <div className="flex-1 h-full  uppercase font-semibold text-sm items-center justify-center flex flex-row ">
                            {report.terms}
                          </div>
                        </div>

                        {data &&
                          data.map((item: any, index: number) => {
                            if (index > listlength - 1) {
                              return (
                                <>
                                  <div className="w-[100%] h-[40px] flex flex-row border-b border-gray-300 bg-blue-gray-100">
                                    <div className="flex-1 h-full  border-r border-gray-300 text-sm items-center flex flex-row font-bold">
                                      <div className="ml-3">
                                        {item.reportQuestions.title}
                                      </div>
                                    </div>
                                  </div>
                                  {item.child.map((subItem: any) => (
                                    <div className="w-[100%] h-[40px] flex flex-row border-b border-gray-300">
                                      <div className="flex-1 h-full  border-r border-gray-300 text-sm items-center  flex flex-row">
                                        <div className="ml-4 text-black text-left">
                                          {subItem.reportQuestions.title}
                                        </div>
                                      </div>
                                      <div className="flex-1 h-full  uppercase  text-sm items-center justify-center flex flex-row ">
                                        <div className="ml-12 text-gray-800">
                                          {edit ? (
                                            <input
                                              className={`w-full px-2 py-1 text-gray-700 bg-[#e5e7eb] rounded h-10 min-w-10 text-center ${
                                                isShowError(
                                                  subItem.reportQuestions.id
                                                )
                                                  ? "border-2 border-red-500"
                                                  : ""
                                              } `}
                                              id="term"
                                              name="term"
                                              type="text"
                                              required
                                              placeholder="Enter Grade"
                                              aria-label="Name"
                                              // value={className}
                                              onChange={(event) => {
                                                onChangeText(
                                                  subItem.reportQuestions.id,
                                                  event.target.value
                                                );
                                                //   setClassName(event.target.value);
                                                //   setClassNameError("");
                                              }}
                                              // disabled={!school}
                                            />
                                          ) : (
                                            <div className=" text-black font-medium">
                                              {subItem.answer}
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </>
                              );
                            }
                          })}
                      </form>
                    </div>

                    <div className="flex flex-row">
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

export default KGReportTablePreview;
