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
import {
  getContactUs,
  updateContacts,
} from "../../redux/contactsus/contactUsSlice";
import { faSquare, faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import { clone } from "lodash";
import { setUserDetails } from "../../utils";

const AdminContactUs = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [pageIndex, setPageIndex] = useState(1);
  const [warningDialog, setWarningDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [searchString, setSearchString] = useState<any>("");
  const [contacted, setContacted] = useState<any>(false);
  const [followupRequired, setFollowupRequired] = useState<any>(false);
  const [unusefull, setUnusefull] = useState<any>(false);

  const [active, setActive] = useState<boolean>(true);

  const { loading, error, feesList, message, contactus } = useAppSelector(
    (state: any) => state.contactus
  );

  useEffect(() => {
    getConstUsData();
  }, []);

  const onDeleteContactUs = () => {
    setWarningDialog(false);
    const selectedContact = clone(selectedItem);
    selectedContact.active = false;
    dispatch(updateContacts(selectedContact));
  };

  const getConstUsData = (
    pageIndex: number = 0,
    contacted: any = false,
    followupRequired: any = false,
    unuseful: any = false,
    searchString: any = false
  ) => {
    const body = {
      page: pageIndex,
      size: 20,
      search: searchString && searchString.trim() ? searchString : null,
      contacted: contacted,
      followupRequired: followupRequired,
      unuseful: unuseful,
      active: true,
    };

    dispatch(getContactUs(body));
  };

  const onClickCheck = (item: any) => {
    console.log("Slected Item ::", item);
    dispatch(updateContacts(item));
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
          <h1 className="text-3xl text-black pb-6">Get In Touch</h1>

          <div className="w-full mt-6">
            <div className="w-full flex flex-row  justify-end items-end ">
              {/* <p className="text-xl pb-3 flex items-center">
                <i className="fas fa-list mr-3"></i> Staff List
              </p> */}
              <div className="flex flex-row  mb-2 ">
                <div className="relative flex w-full mr-2 ">
                  <div
                    className="w-[80px] flex-row flex mr-12 text-center mt-2 cursor-pointer"
                    onClick={() => {
                      setContacted(!contacted);
                      setPageIndex(1);
                      getConstUsData(
                        0,
                        !contacted,
                        followupRequired,
                        unusefull,
                        searchString
                      );
                    }}
                  >
                    <FontAwesomeIcon
                      icon={contacted ? faSquareCheck : faSquare}
                      size="xl"
                    />
                    <span className="ml-1">{"Contacted"}</span>
                  </div>

                  <div
                    className="w-[380px] flex-row flex text-center mt-2 cursor-pointer"
                    onClick={() => {
                      setFollowupRequired(!followupRequired);
                      setPageIndex(1);
                      getConstUsData(
                        0,
                        contacted,
                        !followupRequired,
                        unusefull,
                        searchString
                      );
                    }}
                  >
                    <FontAwesomeIcon
                      icon={followupRequired ? faSquareCheck : faSquare}
                      size="xl"
                    />
                    <span className="ml-1">{"Followup Required"}</span>
                  </div>

                  <div
                    className="w-auto flex-row flex mr-12 text-center mt-2 cursor-pointer"
                    onClick={() => {
                      setUnusefull(!unusefull);
                      setPageIndex(1);
                      getConstUsData(
                        0,
                        contacted,
                        followupRequired,
                        !unusefull,
                        searchString
                      );
                    }}
                  >
                    <FontAwesomeIcon
                      icon={unusefull ? faSquareCheck : faSquare}
                      size="xl"
                    />
                    <span className="ml-1">{"Unusefull"}</span>
                  </div>

                  <div className="relative h-10 w-full min-w-[200px]">
                    <input
                      className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded"
                      id="search"
                      name="search"
                      type="search"
                      placeholder="Search by name, email, mobile, subject, message "
                      aria-label="Phone2"
                      value={searchString}
                      onChange={(event) => {
                        const value = event.target.value;
                        setSearchString(value);
                        if (!value || !value.trim()) {
                          setPageIndex(1);
                          getConstUsData(
                            0,
                            contacted,
                            followupRequired,
                            unusefull,
                            undefined
                          );
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
                    getConstUsData(
                      0,
                      contacted,
                      followupRequired,
                      unusefull,
                      searchString
                    );
                  }}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Search
                </Button>
              </div>
            </div>
            {(!contactus ||
              !contactus.content ||
              contactus.content.length === 0) &&
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
                  No Data Found
                </Typography>
              </div>
            ) : (
              <div className="bg-white overflow-auto">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="w-1/9 text-left py-3 px-4 uppercase font-semibold text-sm">
                        Name
                      </th>
                      <th className="w-1/9 text-left py-3 px-4 uppercase font-semibold text-sm">
                        Email
                      </th>
                      <th className="w-1/9 text-left py-3 px-4 uppercase font-semibold text-sm">
                        Mobile
                      </th>
                      <th className="w-1/7 text-left py-3 px-4 uppercase font-semibold text-sm">
                        Subject
                      </th>
                      <th className="w-1/5 text-left py-3 px-4 uppercase font-semibold text-sm">
                        Message
                      </th>
                      <th className="w-1/11 text-left py-3 px-4 uppercase font-semibold text-sm">
                        Contacted
                      </th>
                      <th className="w-1/11 text-left py-3 px-4 uppercase font-semibold text-sm">
                        Followup Requied
                      </th>
                      <th className="w-1/11 text-left py-3 px-4 uppercase font-semibold text-sm">
                        Unuseful
                      </th>
                      <th className="w-1/9 text-left py-3 px-4 uppercase font-semibold text-sm">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {contactus &&
                      contactus.content.map((item: any, index: number) => (
                        <tr
                          className={`${index % 2 != 0 ? "bg-gray-200" : ""}`}
                        >
                          <td
                            className={`w-1/9 text-left py-3 px-4 ${
                              !item.active ? "opacity-35" : "opacity-100"
                            }`}
                          >
                            {item.name}
                          </td>

                          <td
                            className={`w-1/9 text-left py-3 px-4 ${
                              !item.active ? "opacity-35" : "opacity-100"
                            }`}
                          >
                            {item.email ? item.email : "-"}
                          </td>
                          <td
                            className={`w-1/9 text-left py-3 px-4 ${
                              !item.active ? "opacity-35" : "opacity-100"
                            }`}
                          >
                            {item.mobile1 ? item.mobile1 : "-"}
                          </td>

                          <td
                            className={`w-1/7 text-left py-3 px-4 ${
                              !item.active ? "opacity-35" : "opacity-100"
                            }`}
                          >
                            {item.subject ? item.subject : "-"}
                          </td>

                          <td
                            className={`w-1/5 text-left py-3 px-4 ${
                              !item.active ? "opacity-35" : "opacity-100"
                            }`}
                          >
                            {item.message ? item.message : "-"}
                          </td>

                          <td
                            className={`w-1/11 text-center py-3 px-4 ${
                              !item.active ? "opacity-35" : "opacity-100"
                            }`}
                          >
                            <FontAwesomeIcon
                              icon={item.contacted ? faSquareCheck : faSquare}
                              size="xl"
                              onClick={() => {
                                const tempItem = clone(item);
                                tempItem.contacted = !item.contacted;
                                onClickCheck(tempItem);
                              }}
                            />
                          </td>

                          <td
                            className={`w-1/11 text-center py-3 px-4 ${
                              !item.active ? "opacity-35" : "opacity-100"
                            }`}
                          >
                            <FontAwesomeIcon
                              icon={
                                item.followupRequired ? faSquareCheck : faSquare
                              }
                              size="xl"
                              onClick={() => {
                                const tempItem = clone(item);
                                tempItem.followupRequired =
                                  !tempItem.followupRequired;
                                onClickCheck(tempItem);
                              }}
                            />
                          </td>

                          <td
                            className={`w-1/11 text-center py-3 px-4 ${
                              !item.active ? "opacity-35" : "opacity-100"
                            }  `}
                          >
                            <FontAwesomeIcon
                              icon={item.unuseful ? faSquareCheck : faSquare}
                              size="xl"
                              onClick={() => {
                                const tempItem = clone(item);
                                tempItem.unuseful = !tempItem.unuseful;
                                onClickCheck(tempItem);
                              }}
                            />
                          </td>

                          <td className="w-1/11 text-left py-3 px-4">
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
            {!contactus ||
            !contactus.content ||
            contactus.content.length == 0 ? (
              <></>
            ) : (
              <div className="mt-2 flex flex-row justify-end">
                <Pagination
                  count={contactus.totalPages}
                  onPageChange={(pageIndex: number) => {
                    getConstUsData(pageIndex - 1);
                    setPageIndex(pageIndex);
                  }}
                  pageIndex={pageIndex}
                />
              </div>
            )}
          </div>
        </main>
      </div>
      {selectedItem && (
        <WarningDialog
          open={warningDialog}
          onOkClick={() => onDeleteContactUs()}
          onCloseDialog={() => setWarningDialog(false)}
          header={"Warning !"}
          message={`Are you sure? you want delete this contacted entry.`}
          subMessage={"Once you delete this entry,  it won't get back . "}
        />
      )}
    </ParentLayout>
  );
};
export default AdminContactUs;
