import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@material-tailwind/react";
import { te } from "date-fns/locale";
import { clone } from "lodash";
import { useState } from "react";

const KGReportTable = ({ data, student, onComplete }: any) => {
  const [answer, setAnswer] = useState<any>({});
  const [error, setError] = useState<any>(false);
  const [newError, setNewError] = useState<any>(false);
  const [teacherComments, setTeacherComments] = useState<any>();
  const [teacherCommentsError, setTeacherCommentsError] = useState<any>();
  const [pramoted, setPramoted] = useState<any>();
  const [pramotedError, setPramotedError] = useState<any>();

  const listlength = Math.floor(data.length / 2);

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

  const onSubmitData = (publish: any) => {
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
      const value = {
        answer: answer[key],
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
          id: data[i].id,
        },
      };
      answerBody.push(value);
    }

    const body = {
      reportQueAnswerKgs: answerBody,
      teacherComments: teacherComments,
      published: publish,
      promoted: pramoted,
      remark: "-",
    };

    console.log("Answer Body :", answerBody);
    onComplete(body);
  };

  return (
    <div className="w-full flex-col">
      <div className="w-full flex flex-row">
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
              console.log(index, listlength);
              if (index <= listlength - 1) {
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
        </form>
        <div className="w-5"></div>
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

export default KGReportTable;
