import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@material-tailwind/react";
import { te } from "date-fns/locale";
import { clone, isEmpty } from "lodash";
import { useEffect, useState } from "react";

const FirstReportTable = ({ data, student, onComplete, term }: any) => {
  const [answer, setAnswer] = useState<any>({});
  const [error, setError] = useState<any>(false);
  const [newError, setNewError] = useState<any>(false);
  const [teacherComments, setTeacherComments] = useState<any>();
  const [teacherCommentsError, setTeacherCommentsError] = useState<any>();
  const [pramoted, setPramoted] = useState<any>();
  const [pramotedError, setPramotedError] = useState<any>();
  const [enable, setEnable] = useState<any>("left");
  const [totalQuestion, setTotalQuestionId] = useState<any>();
  const [percetageQuestionId, setPercentageQuestionId] = useState<any>();

  console.log("data", data);

  //   const listlength = Math.floor(data.length / 2);

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

  //   useEffect(() => {
  //     if (answer && !isEmpty(answer)) {
  //       const answerObj = clone(answer);
  //       let key = "";

  //       if (term === "TERM-I") {
  //         if (enable === "left") {
  //           key = "augMarkScheduled";
  //         } else {
  //           key = "halfMarkScheduled";
  //         }
  //       } else {
  //         if (enable === "left") {
  //           key = "decMarkScheduled";
  //         } else {
  //           key = "finalMarkScheduled";
  //         }
  //       }
  //       let total = 0;

  //       for (var keyObj in answerObj) {
  //         if (answerObj[keyObj][key]) {
  //           total = parseFloat(answerObj[keyObj][key]) + total;
  //         }
  //       }
  //       const percentage = (total * 100) / 900;
  //       if (answerObj.hasOwnProperty(totalQuestion)) {
  //         answerObj[totalQuestion][key] = total;
  //         answerObj[percetageQuestionId][key] = percentage + "%";
  //       } else {
  //         answerObj[totalQuestion] = {
  //           augMarkScheduled: "",
  //           decMarkScheduled: "",

  //           augTeacherComments: "",
  //           decTeacherComments: "",

  //           halfMarkScheduled: "",
  //           finalMarkScheduled: "",

  //           halfTeacherComments: "",
  //           finalTeacherComments: "",
  //         };
  //         answerObj[percetageQuestionId] = {
  //           augMarkScheduled: "",
  //           decMarkScheduled: "",

  //           augTeacherComments: "",
  //           decTeacherComments: "",

  //           halfMarkScheduled: "",
  //           finalMarkScheduled: "",

  //           halfTeacherComments: "",
  //           finalTeacherComments: "",
  //         };
  //         answerObj[totalQuestion][key] = total;
  //         answerObj[percetageQuestionId][key] = percentage + "%";
  //       }
  //       setAnswer(answer);

  //       console.log("Total Calculation :", total);
  //       console.log("Percentage Calculation :", percentage);
  //     }
  //   }, [answer]);

  useEffect(() => {
    if (data) {
      const totalQuestioId = data.find((obj: any) => obj.title == "TOTAL");
      const tPercentageQuestioId = data.find(
        (obj: any) => obj.title === "PERCENTAGE"
      );
      setTotalQuestionId(totalQuestioId.id);
      setPercentageQuestionId(tPercentageQuestioId.id);
    }
  }, [data]);

  const isShowError = (id: any, key: any) => {
    if (!answer.hasOwnProperty(id)) {
      return true;
    } else if (answer.hasOwnProperty(id) && !answer[id][key]) {
      return true;
    }
  };

  const onSubmitData = (publish: any) => {
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
      if (isShowError(data[i].id, errorKey)) {
        errorFound = true;
        setError(true);
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
        reportQuestions: {
          id: key,
        },
      };
      answerBody.push(value);
    }

    const body = {
      reportQueAnswerFirst: answerBody,
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
                  style={{ opacity: enable == "left" ? 1 : 0.5 }}
                >
                  {"MARK SECURED"}
                </div>
                <div
                  className="w-[25%] h-full  border-r border-gray-300 uppercase font-semibold text-sm items-center justify-center flex flex-row "
                  style={{ opacity: enable == "left" ? 1 : 0.5 }}
                >
                  {"TEACHER'S COMMENT"}
                </div>
                <div
                  className="w-[25%] h-full border-r border-gray-300 uppercase font-semibold text-sm items-center justify-center flex flex-row "
                  style={{ opacity: enable == "right" ? 1 : 0.5 }}
                >
                  {"MARK SECURED"}
                </div>
                <div
                  className="w-[25%]  h-full border-r border-gray-300 uppercase font-semibold text-sm items-center justify-center flex flex-row "
                  style={{ opacity: enable == "right" ? 1 : 0.5 }}
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
                term === "TERM-I" ? "augTeacherComments" : "decTeacherComments";

              const halfFinalMarhSecured =
                term === "TERM-I" ? "halfMarkScheduled" : "finalMarkScheduled";

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
                      {item.title}
                    </div>
                  </div>

                  <div
                    className={`w-[25%] h-full border-r border-gray-300 uppercase  text-sm items-center justify-center flex flex-row`}
                    style={{ opacity: enable == "left" ? 1 : 0.5 }}
                  >
                    <div className=" text-gray-800">
                      <input
                        className={`w-full px-2 py-1 text-gray-700 ${
                          enable == "left" &&
                          isShowError(item.id, augDecMarhSecured) &&
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
                          answer.hasOwnProperty(item.id)
                            ? answer[item.id][augDecMarhSecured]
                            : ""
                        }
                        onChange={(event: any) => {
                          if (
                            item.title != "TOTAL" &&
                            item.title != "PERCENTAGE"
                          ) {
                            if (
                              !event.target.value ||
                              (!isNaN(event.target.value) &&
                                parseFloat(event.target.value) <= 100)
                            ) {
                              onChangeText(
                                item.id,
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
                    </div>
                  </div>

                  <div
                    className={`w-[25%] h-full border-r border-gray-300 uppercase  text-sm items-center justify-center flex flex-row `}
                    style={{ opacity: enable == "left" ? 1 : 0.5 }}
                  >
                    <div className=" text-gray-800">
                      <input
                        className={`w-full px-2 py-1 text-gray-700 bg-[#e5e7eb] rounded h-10 min-w-10 text-center  `}
                        id={augDecTeacherComments}
                        name={augDecTeacherComments}
                        type="text"
                        required
                        placeholder={"TEACHER'S COMMENT"}
                        aria-label="Name"
                        value={
                          answer.hasOwnProperty(item.id)
                            ? answer[item.id][augDecTeacherComments]
                            : ""
                        }
                        onChange={(event) => {
                          onChangeText(
                            item.id,
                            event.target.value,
                            augDecTeacherComments
                          );
                        }}
                        disabled={enable == "right"}
                      />
                    </div>
                  </div>

                  <div
                    className={`w-[25%] h-full border-r border-gray-300 uppercase  text-sm items-center justify-center flex flex-row `}
                    style={{ opacity: enable == "right" ? 1 : 0.5 }}
                  >
                    <div className=" text-gray-800">
                      <input
                        className={`w-full px-2 py-1 text-gray-700 bg-[#e5e7eb] rounded h-10 min-w-10 text-center ${
                          enable == "right" &&
                          isShowError(item.id, halfFinalMarhSecured) &&
                          error
                            ? "border-r border-red-500"
                            : ""
                        } `}
                        id={halfFinalMarhSecured}
                        name={halfFinalMarhSecured}
                        type="text"
                        required
                        placeholder="MARK SECURED"
                        aria-label={halfFinalMarhSecured}
                        value={
                          answer.hasOwnProperty(item.id)
                            ? answer[item.id][halfFinalMarhSecured]
                            : ""
                        }
                        onChange={(event: any) => {
                          if (
                            item.title != "TOTAL" &&
                            item.title != "PERCENTAGE"
                          ) {
                            if (
                              !event.target.value ||
                              (!isNaN(event.target.value) &&
                                parseFloat(event.target.value) <= 100)
                            ) {
                              onChangeText(
                                item.id,
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
                    </div>
                  </div>

                  <div
                    className={`w-[25%] h-full border-r border-gray-300 uppercase  text-sm items-center justify-center flex flex-row `}
                    style={{ opacity: enable == "right" ? 1 : 0.5 }}
                  >
                    <div className=" text-gray-800">
                      <input
                        className={`w-full px-2 py-1 text-gray-700 bg-[#e5e7eb] rounded h-10 min-w-10 text-center  `}
                        id={halfFinalTeacherComments}
                        name={halfFinalTeacherComments}
                        type="text"
                        required
                        placeholder="TEACHER'S COMMENT"
                        aria-label={halfFinalTeacherComments}
                        value={
                          answer.hasOwnProperty(item.id)
                            ? answer[item.id][halfFinalTeacherComments]
                            : ""
                        }
                        onChange={(event) => {
                          onChangeText(
                            item.id,
                            event.target.value,
                            halfFinalTeacherComments
                          );
                          //   setClassName(event.target.value);
                          //   setClassNameError("");
                        }}
                        disabled={enable == "left"}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
        </form>
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

export default FirstReportTable;
