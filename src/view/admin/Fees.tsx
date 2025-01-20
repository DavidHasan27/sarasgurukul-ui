import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ParentLayout from "../../component/app-component/Parent";
import {
  faEye,
  faTrash,
  faCommentDollar,
} from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useEffect, useState } from "react";
import Toggle from "react-toggle";
import { getSchoolsForSelection } from "../../redux/schools/schoolSlice";
import Pagination from "../../component/app-component/Pagination";
import WarningDialog from "../../component/app-component/WarningDialog";

import {
  getAllFees,
  activeDeactiveFees,
  resetFeeDetails,
} from "../../redux/fees/feesSlice";

const FeesType = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [pageIndex, setPageIndex] = useState(1);
  const [warningDialog, setWarningDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [searchString, setSearchString] = useState<any>("");

  const [active, setActive] = useState<boolean>(true);

  const { loading, error, feesList, message } = useAppSelector(
    (state: any) => state.fees
  );

  useEffect(() => {
    dispatch(getSchoolsForSelection());
    getFeeData();
  }, []);

  useEffect(() => {
    getFeeData(searchString, active, pageIndex - 1);
  }, [pageIndex]);

  const getFeeData = (
    searchString: any = undefined,
    active: any = true,
    page: any = 0
  ) => {
    const body: any = {
      page: page,
      size: 10,
      active: active,
    };

    if (searchString) {
      body["search"] = searchString;
    }
    dispatch(getAllFees(body));
  };

  const onActivateDeactivateFees = () => {
    setWarningDialog(false);
    const body = {
      id: selectedItem.id,
      active: !selectedItem.active,
    };
    dispatch(activeDeactiveFees(body));
  };

  const getTotalFees = (item: any) => {
    let totalFee = 0;
    for (let i = 0; i < item.schoolFeesDetail.length; i++) {
      totalFee = totalFee + parseFloat(item.schoolFeesDetail[i].feeAmount);
    }
    return "₹ " + totalFee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const getFeesParams = (item: any) => {
    let totalFee = "";
    for (let i = 0; i < item.schoolFeesDetail.length; i++) {
      if (totalFee) {
        totalFee = totalFee + ", " + item.schoolFeesDetail[i].feeName;
      } else {
        totalFee = item.schoolFeesDetail[i].feeName;
      }
    }
    return totalFee;
  };

  return (
    <ParentLayout
      loading={loading}
      error={error}
      success={message}
      onCloseSuccessAlert={() => dispatch(resetFeeDetails())}
    >
      <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
        <main className="w-full flex-grow p-6">
          <h1 className="text-3xl text-black pb-6">Fees</h1>

          <div className="w-full mt-6">
            <div className="w-full flex flex-row  justify-end items-end ">
              {/* <p className="text-xl pb-3 flex items-center">
                <i className="fas fa-list mr-3"></i> Staff List
              </p> */}
              <div className="flex flex-row  mb-2 ">
                <div className="relative flex w-full mr-2 ">
                  <div className="w-[80px] flex-row flex mr-12 text-center mt-2">
                    <Toggle
                      id="cheese-status"
                      defaultChecked={active}
                      onChange={() => {
                        setActive(!active);
                        getFeeData(searchString, !active, 0);
                        setPageIndex(1);
                      }}
                      icons={false}
                    />
                    <span className="ml-2">
                      {active ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <div className="relative h-10 w-full min-w-[200px]">
                    <input
                      className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded"
                      id="search"
                      name="search"
                      type="search"
                      placeholder="Search by name "
                      aria-label="Phone2"
                      value={searchString}
                      onChange={(event) => {
                        const value = event.target.value;
                        setSearchString(value);
                        if (!value || !value.trim()) {
                          setPageIndex(1);
                          getFeeData(undefined, active, 0);
                        }
                      }}
                    />
                  </div>
                </div>
                <Button
                  className="flex items-center justify-center mr-2"
                  placeholder={"Search"}
                  color="blue"
                  size="sm"
                  onClick={() => {
                    setPageIndex(1);
                    getFeeData(searchString, active, 0);
                  }}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Search
                </Button>

                <Button
                  className="flex items-center justify-center  min-w-[150px]"
                  placeholder={"Add Fees"}
                  color="blue"
                  size="sm"
                  onClick={() => navigate("/app/addfees")}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <FontAwesomeIcon icon={faCommentDollar} className="mr-2" />
                  Add Fees
                </Button>
              </div>
            </div>
            {(!feesList ||
              !feesList.content ||
              feesList.content.length === 0) &&
            !loading ? (
              <div>
                <FontAwesomeIcon
                  icon={faCommentDollar}
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
                  No Students Found
                </Typography>
              </div>
            ) : (
              <div className="bg-white overflow-auto">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="w-1/7 text-left py-3 px-4 uppercase font-semibold text-sm">
                        Name
                      </th>
                      <th className="w-1/2 text-left py-3 px-4 uppercase font-semibold text-sm">
                        Fees Parameter
                      </th>
                      <th className="w-1/7 text-left py-3 px-4 uppercase font-semibold text-sm">
                        Total Fees
                      </th>

                      <th className="w-1/7 text-left py-3 px-4 uppercase font-semibold text-sm">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {feesList &&
                      feesList.content.map((item: any, index: number) => (
                        <tr
                          className={`${index % 2 != 0 ? "bg-gray-200" : ""}`}
                        >
                          <td
                            className={`w-1/5 text-left py-3 px-4 ${
                              !item.active ? "opacity-35" : "opacity-100"
                            }`}
                          >
                            {item.name}
                          </td>

                          <td
                            className={`w-1/5 text-left py-3 px-4 ${
                              !item.active ? "opacity-35" : "opacity-100"
                            }`}
                          >
                            {getFeesParams(item)}
                          </td>
                          <td
                            className={`w-1/7 text-left py-3 px-4 ${
                              !item.active ? "opacity-35" : "opacity-100"
                            }`}
                          >
                            {getTotalFees(item)}
                          </td>

                          <td className="w-1/7 text-left py-3 px-4">
                            <Tooltip content="View/Edit Details">
                              <IconButton
                                placeholder={"View"}
                                className="h-[30px] w-[30px] bg-blue-800 ml-2"
                                onClick={() =>
                                  navigate("/app/addfees", {
                                    state: item,
                                  })
                                }
                                disabled={!item.active}
                                onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}
                              >
                                <FontAwesomeIcon icon={faEye} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip content="Active/Deactive User">
                              <IconButton
                                placeholder={"View"}
                                className="h-[30px] w-[30px] bg-blue-800 ml-2"
                                onClick={() => {
                                  setSelectedItem(item);
                                  setWarningDialog(true);
                                }}
                                onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </IconButton>
                            </Tooltip>
                            {/* <Tooltip content="View/Add Reports">
                              <IconButton
                                placeholder={"View"}
                                className="h-[30px] w-[30px] bg-blue-800 ml-2"
                                onClick={() => {
                                  navigate("/app/studentReport", {
                                    state: item,
                                  });
                                }}
                              >
                                <FontAwesomeIcon icon={faSquarePollVertical} />
                              </IconButton>
                            </Tooltip> */}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
            {!feesList || !feesList.content || feesList.content.length == 0 ? (
              <></>
            ) : (
              <div className="mt-2 flex flex-row justify-end">
                <Pagination
                  count={feesList.totalPages}
                  onPageChange={(pageIndex: number) => setPageIndex(pageIndex)}
                  pageIndex={pageIndex}
                />
              </div>
            )}
          </div>
        </main>
      </div>
      {selectedItem && selectedItem.name && (
        <WarningDialog
          open={warningDialog}
          onOkClick={() => onActivateDeactivateFees()}
          onCloseDialog={() => setWarningDialog(false)}
          header={"Warning !"}
          message={
            selectedItem.active
              ? `Are you sure? you want to de-activate."
            ${selectedItem?.name}" fee`
              : `Are you sure? you want to activate."
            ${selectedItem?.name}" fee`
          }
          subMessage={
            selectedItem.active
              ? "Once you deactivate this fee,  it wont be available for new class, but it wont affect on current classes. "
              : "Once you activate the user , It will be available for class"
          }
        />
      )}
    </ParentLayout>
  );
};
export default FeesType;
