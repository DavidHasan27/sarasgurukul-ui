import ParentLayout from "../../component/app-component/Parent";
import React, { useEffect, useState } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faCommentDollar,
  faPlusCircle,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

import { useAppDispatch, useAppSelector } from "../../redux/store";

import { clone } from "lodash";
import { createNewFees, resetNewFeesDetai } from "../../redux/fees/feesSlice";
import { useLocation } from "react-router-dom";

const AddFees = () => {
  const location = useLocation();
  const currentObj = location.state;
  console.log("Current Object", currentObj);

  let feestdetailList = [
    { name: "", value: "", nameError: "", valueError: "" },
  ];
  let totalfee = 0;
  if (currentObj && currentObj.schoolFeesDetail) {
    let tempList = [];
    for (let i = 0; i < currentObj.schoolFeesDetail.length; i++) {
      const feeobj = {
        name: currentObj.schoolFeesDetail[i].feeName,
        value: currentObj.schoolFeesDetail[i].feeAmount,
        nameError: "",
        valueError: "",
      };
      totalfee =
        totalfee + parseFloat(currentObj.schoolFeesDetail[i].feeAmount);
      tempList.push(feeobj);
    }
    feestdetailList = tempList;
  }

  const [feeTypeName, setFeeTypeName] = useState(
    currentObj && currentObj.name ? currentObj.name : ""
  );
  const [feeTypeNameError, setfeeTypeNameError] = useState("");

  const [feesDetail, setFeeDetail] = useState<any>(feestdetailList);
  const [total, setTotal] = useState<any>(
    totalfee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  );
  const dispatch = useAppDispatch();
  const { loading, error, newFees } = useAppSelector(
    (state: any) => state.fees
  );

  useEffect(() => {
    if (newFees) {
      // navigate("/app/dash", { replace: true });
      resetAllData();
    }
  }, [newFees]);

  const resetAllData = () => {
    setFeeTypeName("");
    setfeeTypeNameError("");
    setFeeDetail([{ name: "", value: "", nameError: "", valueError: "" }]);
    setTotal(0);
  };

  const AddNewType = () => {
    const tempList = clone(feesDetail);
    tempList.push({ name: "", value: "", nameError: "", valueError: "" });
    setFeeDetail(tempList);
  };

  const onRemoveClick = (index: any) => {
    if (feesDetail.length > 1) {
      const tempList = clone(feesDetail);
      tempList.splice(index, 1);

      let totalFee = 0;
      for (let i = 0; i < tempList.length; i++) {
        totalFee = totalFee + parseFloat(tempList[i].value);
      }
      setTotal(totalFee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      setFeeDetail(tempList);
    }
  };

  const onSubmit = () => {
    let isError = false;
    const tempList = clone(feesDetail);
    for (let i = 0; i < tempList.length; i++) {
      if (!tempList[i].name.trim()) {
        tempList[i].nameError = "Please enter name";
        isError = true;
      }

      if (!tempList[i].value.trim()) {
        tempList[i].valueError = "Please enter value";
        isError = true;
      }
    }
    if (!feeTypeName && !feeTypeName.trim()) {
      setfeeTypeNameError("Please enter fee type name ");
      isError = true;
    }

    if (isError) {
      setFeeDetail(tempList);
      return;
    }

    const schoolFeesDetail = [];
    for (let i = 0; i < tempList.length; i++) {
      const feeObj = {
        feeName: tempList[i].name,
        feeAmount: tempList[i].value,
      };
      schoolFeesDetail.push(feeObj);
    }

    const body = {
      name: feeTypeName,
      schoolFeesDetail: schoolFeesDetail,
      active: true,
    };
    dispatch(createNewFees(body));
  };

  const onChangeText = (key: any, text: any, index: any) => {
    const tempList = clone(feesDetail);
    tempList[index][key] = text;

    if (key === "value") {
      tempList[index]["valueError"] = "";
      let totalFee = 0;

      for (let i = 0; i < tempList.length; i++) {
        if (tempList[i].value) {
          totalFee = totalFee + parseFloat(tempList[i].value);
        }
      }

      setTotal(totalFee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    } else {
      tempList[index]["nameError"] = "";
    }

    setFeeDetail(tempList);
  };

  return (
    <ParentLayout
      loading={loading}
      error={error}
      success={newFees ? "New Fee Type created successfully" : ""}
      onCloseSuccessAlert={() => dispatch(resetNewFeesDetai())}
      onCloseAlert={() => dispatch(resetNewFeesDetai())}
    >
      <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
        <main className="w-full flex-grow p-6">
          <span>
            <FontAwesomeIcon
              icon={faCommentDollar}
              className="mr-2 fa-4x p-0"
            />
            <h1 className="w-full text-3xl text-black ">
              {currentObj ? "Fees Details" : "Add New Fees"}
            </h1>
          </span>

          <div className="flex flex-wrap justify-center">
            <div className="w-full lg:w-1/2 my-1 pr-0 lg:pr-2 mt-2 ">
              <p className="text-xl flex items-center">
                <i className="fas fa-list mr-3"></i> Fees Details
              </p>
              <div className="leading-loose">
                <form className="p-10 bg-white rounded shadow-xl min-h-[470px]">
                  <div className="flex flex-row justify-end items-center">
                    <label className="block text-xl text-gray-600 text-right mr-3">
                      Total Fee :
                    </label>
                    <label className="block text-xl text-gray-600 text-right mr-6">
                      ₹{total}
                    </label>
                    {!currentObj && (
                      <Button
                        variant="gradient"
                        color="blue"
                        placeholder={"Submit"}
                        onClick={() => onSubmit()}
                        className="h-[40px] p-0 w-[150px]"
                        disabled={currentObj}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        <FontAwesomeIcon
                          icon={faPlusCircle}
                          className="mr-2 fa-1x p-0"
                          size="xl"
                        />
                        Save Fees Detail
                      </Button>
                    )}
                  </div>
                  <div className="inline-block mt-2 w-full pr-1">
                    <label className="block text-sm text-gray-600 text-left">
                      Fees Name
                    </label>
                    <div className="flex flex-col">
                      <input
                        className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded"
                        id="feesName"
                        name="feesName"
                        required
                        placeholder="Fees Name"
                        aria-label="feesName"
                        value={feeTypeName}
                        onChange={(event) => {
                          setFeeTypeName(event.target.value);
                          setfeeTypeNameError("");
                        }}
                        disabled={currentObj}
                      />
                      <div className="block text-[12px] mt-[-5px] mb-2 text-left text-red-600 h-4">
                        {feeTypeNameError && feeTypeNameError}
                      </div>
                    </div>
                  </div>

                  <label className="block text-xl text-gray-600 text-left font-bold mt-2">
                    Create your fee structure
                  </label>

                  <div className="mt-2">
                    {feesDetail.map((item: any, index: number) => {
                      return (
                        <>
                          <div className="inline-block w-[47%] pr-1">
                            <label className="block text-sm text-gray-600 text-left">
                              Fees Type
                            </label>
                            <div className="flex flex-col">
                              <input
                                className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded"
                                id="feeName"
                                name="feeName"
                                required
                                placeholder="Fee Type Name"
                                aria-label="feeName"
                                value={item.name}
                                onChange={(event) => {
                                  onChangeText(
                                    "name",
                                    event.target.value,
                                    index
                                  );
                                }}
                                disabled={currentObj}
                              />
                              <div className="block text-[12px] mt-[-5px] mb-2 text-left text-red-600 h-4 ">
                                {item.nameError && item.nameError}
                              </div>
                            </div>
                          </div>

                          <div className="inline-block w-[47%] pr-1">
                            <label className="block text-sm text-gray-600 text-left">
                              Amount
                            </label>
                            <div className="flex flex-col">
                              <input
                                className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded"
                                id="amount"
                                name="amount"
                                required
                                placeholder="Amount"
                                aria-label="amount"
                                value={item.value}
                                onChange={(event: any) => {
                                  if (
                                    !isNaN(event.target.value) &&
                                    event.target.value.length <= 7
                                  ) {
                                    onChangeText(
                                      "value",
                                      event.target.value,
                                      index
                                    );
                                  }
                                }}
                                disabled={currentObj}
                              />
                              <div className="block text-[12px] mt-[-5px] mb-2 text-left text-red-600 h-4">
                                {item.valueError && item.valueError}
                              </div>
                            </div>
                          </div>

                          <div className="inline-block w-[5%] pr-1   ">
                            <IconButton
                              placeholder={undefined}
                              className="bg-[#e5e7eb]"
                              onClick={() => onRemoveClick(index)}
                              disabled={currentObj}
                              onPointerEnterCapture={undefined}
                              onPointerLeaveCapture={undefined}
                            >
                              <FontAwesomeIcon
                                icon={faCircleXmark}
                                className="fa-2x"
                                color="red"
                                onClick={() => onRemoveClick(index)}
                              />
                            </IconButton>
                          </div>
                        </>
                      );
                    })}
                    {!currentObj && (
                      <div className="flex flex-row-reverse items-end w-full">
                        <Button
                          variant="gradient"
                          color="blue"
                          placeholder={"Submit"}
                          onClick={() => AddNewType()}
                          className="h-[40px] p-0 w-[80px]"
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                        >
                          <FontAwesomeIcon
                            icon={faPlusCircle}
                            className="mr-2 fa-1x p-0"
                            size="xl"
                          />
                          Add
                        </Button>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ParentLayout>
  );
};

export default AddFees;
