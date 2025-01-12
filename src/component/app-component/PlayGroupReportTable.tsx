import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@material-tailwind/react";
import { te } from "date-fns/locale";
import { clone } from "lodash";
import { useState } from "react";

const PlayGroupReportTable = ({ data, student, onComplete }: any) => {
  const [answer, setAnswer] = useState<any>({});
  const [error, setError] = useState<any>(false);
  const [newError, setNewError] = useState<any>(false);
  const [teacherComments, setTeacherComments] = useState<any>();
  const [teacherCommentsError, setTeacherCommentsError] = useState<any>();
  const [pramoted, setPramoted] = useState<any>();
  const [pramotedError, setPramotedError] = useState<any>();

  //   const listlength = Math.floor(data.length / 2);

  const onChangeText = (id: any, text: any, key: any) => {
    const clonedAns = clone(answer);

    if (!clonedAns.hasOwnProperty(id)) {
      clonedAns[id] = {
        needImprovement: "",
        satisfactory: "",
        good: "",
        excellent: "",
        grade: "",
      };
    }
    clonedAns[id][key] = text;
    if (key !== "grade") {
      for (var keyObj in clonedAns[id]) {
        if (keyObj !== key && keyObj !== "grade") {
          clonedAns[id][keyObj] = "";
        }
      }
    }
    setError(false);

    setAnswer(clonedAns);
    console.log("clonedAns", clonedAns);
  };

  const isShowError = (id: any) => {
    if (!answer.hasOwnProperty(id)) {
      return true;
    } else if (
      answer.hasOwnProperty(id) &&
      !answer[id]["needImprovement"] &&
      !answer[id]["satisfactory"] &&
      !answer[id]["good"] &&
      !answer[id]["excellent"]
    ) {
      return true;
    }
  };

  const isShowGradeError = (id: any) => {
    if (!answer.hasOwnProperty(id)) {
      return true;
    } else if (answer.hasOwnProperty(id) && !answer[id]["grade"]) {
      return true;
    }
  };

  const onSubmitData = (publish: any) => {
    let errorFound = false;

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].child.length; j++) {
        if (!answer.hasOwnProperty(data[i].child[j].id)) {
          errorFound = true;
          setError(true);
          break;
        } else if (answer.hasOwnProperty(data[i].child[j].id)) {
          if (
            isShowError(data[i].child[j].id) ||
            isShowGradeError(data[i].child[j].id)
          ) {
            errorFound = true;
            setError(true);
            break;
          }
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
      const value = {
        needImprovement: answer[key]["needImprovement"],
        satisfactory: answer[key]["satisfactory"],
        good: answer[key]["good"],
        excellent: answer[key]["excellent"],
        grade: answer[key]["grade"],
        reportQuestions: {
          id: key,
        },
      };
      answerBody.push(value);
    }

    for (let i = 0; i < data.length; i++) {
      const value = {
        needImprovement: "",
        satisfactory: "",
        good: "",
        excellent: "",
        grade: "",
        reportQuestions: {
          id: data[i].id,
        },
      };
      answerBody.push(value);
    }

    const body = {
      reportQueAnswerPlay: answerBody,
      teacherComments: teacherComments,
      published: publish,
      promoted: pramoted,
      remark: "-",
    };

    console.log("Answer Body :", body);
    onComplete(body);
  };

  return (
    <div className="w-full flex-col">
      <div className="w-full flex flex-row">
        <form className=" bg-white rounded shadow-xl min-h-[400px] flex-1 border border-gray-300 pb-10 mt-10">
          <div className="w-[100%] h-[50px] flex flex-row border-b border-gray-300">
            <div className="w-[28%] h-full  border-r border-gray-300 uppercase font-semibold text-sm items-center justify-center flex flex-row">
              {"Subjects"}
            </div>
            <div className="w-[18%] h-full border-r border-gray-300 uppercase font-semibold text-sm items-center justify-center flex flex-row ">
              {"Need Improvement"}
            </div>
            <div className="w-[18%] h-full  border-r border-gray-300 uppercase font-semibold text-sm items-center justify-center flex flex-row ">
              {"Satisfactory"}
            </div>
            <div className="w-[18%] h-full border-r border-gray-300 uppercase font-semibold text-sm items-center justify-center flex flex-row ">
              {"Good"}
            </div>
            <div className="w-[18%]  h-full border-r border-gray-300 uppercase font-semibold text-sm items-center justify-center flex flex-row ">
              {"Excellent"}
            </div>
            <div className=" w-[18%] h-full  uppercase font-semibold text-sm items-center justify-center flex flex-row ">
              {"Team 1 Grade"}
            </div>
          </div>

          {data &&
            data.map((item: any, index: number) => {
              return (
                <>
                  <div className="w-[100%] h-[50px] flex flex-row border-b border-gray-300 bg-blue-gray-100">
                    <div className="flex-1 h-full  border-r border-gray-300 text-sm items-center flex flex-row font-bold">
                      <div className="ml-10">{item.title}</div>
                    </div>
                  </div>
                  {item.child.map((subItem: any) => {
                    //  answer.hasOwnProperty[subItem.id]
                    //  ? answer[subItem.id]["needImprovement"]
                    //  : ""
                    const errorObj = error && isShowError(subItem.id);

                    console.log("Error", error);

                    return (
                      <div className="w-[100%] h-[50px] flex flex-row border-b border-gray-300">
                        <div className="w-[28%] h-full  border-r border-gray-300 text-sm items-center  flex flex-row">
                          <div className="ml-12 text-gray-800 text-left">
                            {subItem.title}
                          </div>
                        </div>
                        <div
                          className={`w-[18%] h-full border-r border-gray-300 uppercase  text-sm items-center justify-center flex flex-row ${
                            errorObj ? "bg-red-100" : ""
                          }`}
                        >
                          <div className=" text-gray-800">
                            <input
                              className={`w-full px-2 py-1 text-gray-700 bg-[#e5e7eb] rounded h-10 min-w-10 text-center `}
                              id="needImprovement"
                              name="needImprovement"
                              type="text"
                              required
                              placeholder="Need Improvement"
                              aria-label="Name"
                              value={
                                answer.hasOwnProperty(subItem.id)
                                  ? answer[subItem.id]["needImprovement"]
                                  : ""
                              }
                              onChange={(event) => {
                                onChangeText(
                                  subItem.id,
                                  event.target.value,
                                  "needImprovement"
                                );
                                //   setClassName(event.target.value);
                                //   setClassNameError("");
                              }}
                              // disabled={!school}
                            />
                          </div>
                        </div>
                        <div
                          className={`w-[18%] h-full border-r border-gray-300 uppercase  text-sm items-center justify-center flex flex-row ${
                            errorObj ? "bg-red-100" : ""
                          }`}
                        >
                          <div className=" text-gray-800">
                            <input
                              className={`w-full px-2 py-1 text-gray-700 bg-[#e5e7eb] rounded h-10 min-w-10 text-center  `}
                              id="satisfactory"
                              name="satisfactory"
                              type="text"
                              required
                              placeholder="Satisfactory"
                              aria-label="Name"
                              value={
                                answer.hasOwnProperty(subItem.id)
                                  ? answer[subItem.id]["satisfactory"]
                                  : ""
                              }
                              onChange={(event) => {
                                onChangeText(
                                  subItem.id,
                                  event.target.value,
                                  "satisfactory"
                                );
                              }}
                              // disabled={!school}
                            />
                          </div>
                        </div>
                        <div
                          className={`w-[18%] h-full border-r border-gray-300 uppercase  text-sm items-center justify-center flex flex-row ${
                            errorObj ? "bg-red-100" : ""
                          }`}
                        >
                          <div className=" text-gray-800">
                            <input
                              className={`w-full px-2 py-1 text-gray-700 bg-[#e5e7eb] rounded h-10 min-w-10 text-center  `}
                              id="good"
                              name="good"
                              type="text"
                              required
                              placeholder="Good"
                              aria-label="good"
                              value={
                                answer.hasOwnProperty(subItem.id)
                                  ? answer[subItem.id]["good"]
                                  : ""
                              }
                              onChange={(event) => {
                                onChangeText(
                                  subItem.id,
                                  event.target.value,
                                  "good"
                                );
                                //   setClassName(event.target.value);
                                //   setClassNameError("");
                              }}
                              // disabled={!school}
                            />
                          </div>
                        </div>
                        <div
                          className={`w-[18%] h-full border-r border-gray-300 uppercase  text-sm items-center justify-center flex flex-row ${
                            errorObj ? "bg-red-100" : ""
                          }`}
                        >
                          <div className=" text-gray-800">
                            <input
                              className={`w-full px-2 py-1 text-gray-700 bg-[#e5e7eb] rounded h-10 min-w-10 text-center  `}
                              id="excellent"
                              name="excellent"
                              type="text"
                              required
                              placeholder="Excellent"
                              aria-label="excellent"
                              value={
                                answer.hasOwnProperty(subItem.id)
                                  ? answer[subItem.id]["excellent"]
                                  : ""
                              }
                              onChange={(event) => {
                                onChangeText(
                                  subItem.id,
                                  event.target.value,
                                  "excellent"
                                );
                                //   setClassName(event.target.value);
                                //   setClassNameError("");
                              }}
                              // disabled={!school}
                            />
                          </div>
                        </div>
                        <div className="w-[18%] h-full border-r border-gray-300 uppercase  text-sm items-center justify-center flex flex-row ">
                          <div className=" text-gray-800">
                            <input
                              className={`w-full px-2 py-1 text-gray-700 bg-[#e5e7eb] rounded h-10 min-w-10 text-center ${
                                isShowGradeError(subItem.id) && error
                                  ? "border-2 border-red-500"
                                  : ""
                              } `}
                              id="grade"
                              name="grade"
                              type="text"
                              required
                              placeholder="grade"
                              aria-label="grade"
                              value={
                                answer.hasOwnProperty(subItem.id)
                                  ? answer[subItem.id]["grade"]
                                  : ""
                              }
                              onChange={(event) => {
                                onChangeText(
                                  subItem.id,
                                  event.target.value,
                                  "grade"
                                );
                                //   setClassName(event.target.value);
                                //   setClassNameError("");
                              }}
                              // disabled={!school}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              );
            })}
        </form>
        {/* <div className="w-5"></div>
        <form className=" bg-white rounded shadow-xl min-h-[400px] flex-1 border border-gray-300 pb-10 mt-10">
          <div className="w-[100%] h-[50px] flex flex-row border-b border-gray-300">
            <div className="flex-1 h-full  border-r border-gray-300 uppercase font-semibold text-sm items-center justify-center flex flex-row">
              {"Subjects"}
            </div>
            <div className="flex-1 h-full  uppercase font-semibold text-sm items-center justify-center flex flex-row ">
              {"Terms"}
            </div>
          </div>

          {data &&
            data.map((item: any, index: number) => {
              if (index > listlength - 1) {
                return (
                  <>
                    <div className="w-[100%] h-[50px] flex flex-row border-b border-gray-300 bg-blue-gray-100">
                      <div className="flex-1 h-full  border-r border-gray-300 text-sm items-center flex flex-row font-bold">
                        <div className="ml-10">{item.title}</div>
                      </div>
                    </div>
                    {item.child.map((subItem: any) => (
                      <div className="w-[100%] h-[50px] flex flex-row border-b border-gray-300">
                        <div className="flex-1 h-full  border-r border-gray-300 text-sm items-center  flex flex-row">
                          <div className="ml-12 text-gray-800 text-left">
                            {subItem.title}
                          </div>
                        </div>
                        <div className="flex-1 h-full  uppercase  text-sm items-center justify-center flex flex-row ">
                          <div className="ml-12 text-gray-800">
                            <input
                              className={`w-full px-2 py-1 text-gray-700 bg-[#e5e7eb] rounded h-10 min-w-10 text-center ${
                                isShowError(subItem.id)
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
                                onChangeText(subItem.id, event.target.value);
                                //   setClassName(event.target.value);
                                //   setClassNameError("");
                              }}
                              // disabled={!school}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                );
              }
            })}
        </form> */}
      </div>

      <div className="w-full flex flex-row pt-5">
        <div className="flex-1">
          <label className="block text-sm text-gray-600 text-left font-semibold">
            Teacher Comments
          </label>
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
        </div>
        <div className="w-5"></div>
        <div className="flex-1">
          <label className="block text-sm text-gray-600 text-left">
            Pramoted
          </label>

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
          <div className="flex flex-row-reverse items-end w-full mt-4">
            <Button
              variant="gradient"
              color="blue"
              placeholder={"Submit"}
              onClick={() => onSubmitData(true)}
            >
              Save and Publish
            </Button>

            <Button
              variant="gradient"
              color="blue"
              placeholder={"Submit"}
              className="mr-5 w-[150px]"
              onClick={() => onSubmitData(false)}
            >
              Save Only
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayGroupReportTable;
