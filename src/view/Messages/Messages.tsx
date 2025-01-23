import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ParentLayout from "../../component/app-component/Parent";
import {
  faBarsProgress,
  faBell,
  faBullhorn,
  faDownload,
  faEnvelope,
  faInbox,
  faMessage,
  faPaperclip,
  faPaperPlane,
  faRotateRight,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {
  Avatar,
  Button,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import React, { useEffect, useRef, useState } from "react";
import logoImage from "../../view/assets/sidebar_image.png";
import {
  resetActivateDeactivateSchool,
  getSchoolsForSelection,
} from "../../redux/schools/schoolSlice";

import {
  getSchoolYear,
  getSchoolHolidays,
  activeDeactiveSchoolHoliday,
  downloadFile,
} from "../../redux/admin/adminSlice";

import Pagination from "../../component/app-component/Pagination";
import WarningDialog from "../../component/app-component/WarningDialog";
import OutsideClickHandler from "react-outside-click-handler";
import Select1 from "react-select";
import { find, findIndex } from "lodash";
import moment from "moment";
import { useReactToPrint } from "react-to-print";
import { MESSAGE_TYPE_WITH_ALL } from "../../utils/constants";
import { getUserDetails } from "../../utils";
import {
  deleteMessage,
  getMessageList,
  markRead,
  resetNewMessage,
} from "../../redux/message/messageSlice";
import { es } from "date-fns/locale";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faFaceSadTear } from "@fortawesome/free-regular-svg-icons";

const Messages = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { loading, error, successMessage, message, messageLoader } =
    useAppSelector((state: any) => state.message);
  const [pageIndex, setPageIndex] = useState(1);
  const [warningDialog, setWarningDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [searchString, setSearchString] = useState<any>("");

  const [messageMenu, setMessageMenu] = useState<any>();
  const [selectedMessageType, setMessageType] = useState<any>();

  const [school, setSchools] = useState<any>();
  const [schoolMenu, setSchoolMenu] = useState<any>();
  const { optionSchoolList } = useAppSelector((state: any) => state.school);

  const [selectedTabs, setSelectedTabs] = useState("inbox");
  const userDetails = getUserDetails();

  const handleOnAfterPrint = React.useCallback(() => {
    console.log("`onAfterPrint` called"); // tslint:disable-line no-console
  }, []);

  console.log("message List ::", message);
  const [height, setHeight] = useState(0);
  const ref = useRef<any>(null);

  useEffect(() => {
    if (ref) {
      console.log("ref?.current.clientHeight", ref?.current.clientHeight);
      setHeight(ref?.current.clientHeight);
    }
  });

  useEffect(() => {
    getMessageData(selectedTabs);
  }, []);

  useEffect(() => {
    if (successMessage) {
      setSelectedItem("");
    }
  }, [successMessage]);

  const deleteMessageFromList = (type: string) => {
    setWarningDialog(false);
    const body = {
      userId: userDetails.id,
      messageId: selectedItem.id,
      type: selectedTabs,
      deleteTo: type,
    };
    dispatch(deleteMessage(body));
  };

  const getMessageData = (
    type: String = "inbox",
    messageType: any = undefined,
    search: any = undefined
  ) => {
    const body: any = {
      page: 0,
      size: 100,
      userId: userDetails.id,
      type: type,
      active: true,
    };

    if (messageType) {
      body["messageType"] = messageType;
    }

    if (search && search.trim()) {
      body["search"] = search;
    }

    dispatch(getMessageList(body));
  };

  const formatOptionLabelForYear = ({ value, label }: any) => {
    return (
      <div
        className="flex flex-col text-left  border-b-[1px] border-gray-400 "
        onClick={() => {
          setMessageType(value);
          setMessageMenu(false);
          setPageIndex(1);
          getMessageData(selectedTabs, value.value);
        }}
      >
        <div
          className={`text-blue-gray-900 text-[16px] ${
            value.active ? "bg-blue-gray-100" : ""
          }  px-3 py-2`}
        >
          {" "}
          {label}
        </div>
        {/* <div className="text-gray-500 text-[12px] -mt-[12px]">
          Branch: {value.branch}
        </div> */}
      </div>
    );
  };

  const getImageURL = (item: any) => {
    let user = null;
    if (selectedTabs === "inbox") {
      const obj = item.receiverDetails.find(
        (obj: any) => obj.receiverId.id === userDetails.id
      );
      user = obj ? obj.receiverId : null;
    } else {
      user = item.senderId;
    }

    if (user) {
      if (user.userProfilePhoto) {
        const imageData = user.userProfilePhoto.split("|");
        return (
          "https://" +
          imageData[0] +
          ".s3.ap-south-1.amazonaws.com/" +
          imageData[1]
        );
      } else {
        return (
          user.firstName.charAt(0).toUpperCase() +
          user.lastName.charAt(0).toUpperCase()
        );
      }
    } else {
      return "SG";
    }
  };
  const getReadStatus = (receiverDetails: any) => {
    if (selectedTabs == "inbox") {
      const obj = receiverDetails.find(
        (obj: any) => obj.receiverId.id === userDetails.id
      );
      if (obj) {
        return obj.read;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const getFormattedDate = (date: any) => {
    const date1 = moment(date).format("YYYY-MM-DD");
    const date2 = moment().format("YYYY-MM-DD");
    const difference = moment(date2).diff(date1, "days");
    if (difference == 0) {
      return moment(date).format("hh:mm A");
    } else {
      return moment(date).format("lll");
    }
  };

  function getDarkColor() {
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += Math.floor(Math.random() * 10);
    }
    return color;
  }

  const getListItem = () => {
    return (
      <List placeholder={undefined} className="p-0 overflow-scroll">
        {message &&
          message.content.length > 0 &&
          message.content.map((obj: any, index: number) => {
            const isRead =
              selectedTabs === "sent"
                ? true
                : getReadStatus(obj.receiverDetails);

            const imageUrl = getImageURL(obj);

            let icon = faMessage;
            let color = "white";

            if (obj.messageType === "EMAIL") {
              icon = faEnvelope;
              color = "#BA8E23";
            } else if (obj.messageType === "NOTICE") {
              icon = faBell;
              color = "#FF0000";
            } else if (obj.messageType === "NOTIFICATION") {
              icon = faBullhorn;
              color = "#0000FF";
            } else if (obj.messageType === "WHATSAPP") {
              icon = faWhatsapp;
              color = "#075E54";
            }

            return (
              <ListItem
                placeholder={undefined}
                className="pl-2 border-b-[1px] border-gray-400 rounded-none relative "
                style={{
                  backgroundColor:
                    selectedItem && selectedItem.id === obj.id
                      ? "#E6ECF5"
                      : "#FFFFFF",
                }}
                key={obj.id}
                onClick={() => {
                  setSelectedItem(obj);
                  if (selectedTabs === "inbox") {
                    const receiverindex = findIndex(
                      obj.receiverDetails,
                      (obj: any) => obj.receiverId.id === userDetails.id
                    );
                    if (!obj.receiverDetails[receiverindex].read) {
                      dispatch(
                        markRead({ messageId: obj.id, userId: userDetails.id })
                      );
                    }
                  }
                }}
              >
                <div
                  className="h-5 w-5 absolute top-[2px] left-0 rounded-full flex flex-row justify-center items-center"
                  style={{ backgroundColor: color }}
                >
                  <FontAwesomeIcon icon={icon} color="white" size="sm" />
                </div>
                <ListItemPrefix placeholder={undefined}>
                  {imageUrl.startsWith("https://") ? (
                    <Avatar
                      variant="circular"
                      alt="candice"
                      src="https://docs.material-tailwind.com/img/face-1.jpg"
                      placeholder={undefined}
                    />
                  ) : (
                    <div
                      className="h-14 w-14 rounded-full flex flex-row justify-center items-center"
                      style={{ backgroundColor: getDarkColor() }}
                    >
                      <label className=" text-xl font-bold text-white">
                        {imageUrl}
                      </label>
                    </div>
                  )}
                </ListItemPrefix>
                <div className="flex flex-row justify-between w-full ">
                  <div className="flex flex-col  w-[80%] justify-center">
                    <label
                      className={`${
                        !isRead ? "font-semibold" : "font-normal"
                      } text-lg`}
                    >
                      {obj.senderId.firstName + " " + obj.senderId.lastName}
                    </label>
                    <label className="font-normal text-sm">{obj.title}</label>
                  </div>

                  <div className="flex flex-col  w-[35%] items-end">
                    <label className="font-normal text-xs">
                      {getFormattedDate(obj.createdAt)}
                    </label>

                    <div className="flex flex-row mt-1 items-center justify-center">
                      {obj.file && obj.file.length > 0 && (
                        <FontAwesomeIcon
                          icon={faPaperclip}
                          size="sm"
                          className="mr-1 mt-2"
                        />
                      )}
                      {!isRead && (
                        <div className="h-3 w-3 bg-green-600 rounded-full mt-2" />
                      )}
                    </div>
                  </div>
                </div>
              </ListItem>
            );
          })}
      </List>
    );
  };

  const getToList = () => {
    if (
      selectedItem &&
      selectedItem.schools &&
      selectedItem.schools.length > 0
    ) {
      const nameList = [];
      for (let i = 0; i < selectedItem.schools.length; i++) {
        const name =
          selectedItem.schools[i].schoolName +
          ", " +
          selectedItem.schools[i].branch;
        nameList.push(name);
      }
      return nameList;
    } else if (
      selectedItem &&
      selectedItem.classes &&
      selectedItem.classes.length > 0
    ) {
      const nameList = [];
      for (let i = 0; i < selectedItem.classes.length; i++) {
        const name =
          selectedItem.classes[i].className +
          "(" +
          selectedItem.classes[i].classIdentity +
          ")";
        nameList.push(name);
      }
      return nameList;
    } else {
      const nameList = [];
      for (let i = 0; i < selectedItem.receiverDetails.length; i++) {
        const name =
          selectedItem.receiverDetails[i].receiverId.firstName +
          " " +
          selectedItem.receiverDetails[i].receiverId.lastName;
        nameList.push(name);
      }
      return nameList;
    }
  };

  const getFileList = () => {
    const fileList = [];
    if (selectedItem && selectedItem.file && selectedItem.file.length > 0) {
      for (let i = 0; i < selectedItem.file.length; i++) {
        const myArray = selectedItem.file[i].split("|");
        const fileObj = {
          bucketName: myArray[0],
          fileName: myArray[1],
          name: myArray[2],
        };
        fileList.push(fileObj);
      }
    }
    return fileList;
  };

  return (
    <ParentLayout
      loading={messageLoader}
      error={error}
      success={successMessage}
      onCloseSuccessAlert={() => dispatch(resetNewMessage())}
      onCloseAlert={() => dispatch(resetNewMessage())}
    >
      <div
        className="w-full h-screen overflow-x-hidden border-t flex flex-col relative "
        ref={ref}
      >
        <main className="w-full flex-grow p-6">
          <h1 className="text-3xl text-black pb-6">Schools Messages</h1>

          <div className="w-full mt-6">
            <div className="w-full flex flex-row items-center justify-end">
              <div className="flex flex-row  mb-2 ">
                <div className="relative flex ">
                  <div className=" h-10 w-full  flex flex-row">
                    <OutsideClickHandler
                      onOutsideClick={() => {
                        setMessageMenu(false);
                      }}
                    >
                      <Select1
                        name="messageType"
                        placeholder="Select Message Type"
                        className="w-full"
                        options={MESSAGE_TYPE_WITH_ALL}
                        getOptionLabel={(option: any) => option.option}
                        getOptionValue={(option) => option}
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            backgroundColor: "#e5e7eb",
                            borderColor: state.isFocused
                              ? "#0f58bf"
                              : "#e1e4e8",
                            textAlign: "left",
                            marginRight: 10,
                            paddingTop: 1,
                            paddingBottom: 1,
                            width: 300,
                          }),
                          option: (baseStyles, state) => ({
                            ...baseStyles,
                            textAlign: "left",
                          }),
                          multiValue: (styles, { data }) => {
                            return {
                              ...styles,
                              backgroundColor: "white",
                              borderWidth: "1px",
                              borderColor: "black",
                              borderStyle: "#c4cad2",
                            };
                          },
                          placeholder: (styles) => {
                            return {
                              ...styles,
                              color: "black",
                            };
                          },
                        }}
                        classNamePrefix="Select Schools"
                        onChange={(event: any) => {
                          setMessageType(event);
                        }}
                        value={selectedMessageType}
                        components={{ Option: formatOptionLabelForYear }}
                        menuIsOpen={messageMenu}
                        onMenuOpen={() => setMessageMenu(true)}
                        closeMenuOnScroll={true}
                      />
                    </OutsideClickHandler>
                  </div>
                </div>

                <Button
                  className="flex items-center justify-center gap-3 min-w-[200px]"
                  placeholder={"Add New School"}
                  color="blue"
                  size="sm"
                  onClick={() => navigate("/app/newmessages")}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <FontAwesomeIcon icon={faEnvelope} />
                  Send New Message
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap">
              <div className="w-full lg:w-[30%] my-1 pr-0 lg:pr-2 mt-2 ">
                <p className="text-xl flex items-center">
                  <i className="fas fa-list mr-3"></i> Message List
                </p>
                <div className="leading-loose">
                  <form
                    className=" bg-white rounded shadow-xl"
                    style={{ height: height ? height - 210 : 500 }}
                  >
                    <div className="w-full">
                      <Tabs value="inbox">
                        <TabsHeader
                          placeholder={undefined}
                          indicatorProps={{
                            className: "bg-[#193474] rounded",
                          }}
                          className="bg-blue-gray-100 p-0 h-10 rounded-none"
                        >
                          <Tab
                            key={"inbox"}
                            value={"inbox"}
                            placeholder={undefined}
                            className="font-bold"
                            activeClassName="text-white"
                            onClick={() => {
                              setSelectedTabs("inbox");
                              getMessageData("inbox");
                              setSelectedItem("");
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <FontAwesomeIcon icon={faInbox} />
                              Inbox
                            </div>
                          </Tab>

                          <Tab
                            key={"sent"}
                            value={"sent"}
                            placeholder={undefined}
                            className="font-bold"
                            activeClassName="text-white"
                            onClick={() => {
                              setSelectedTabs("sent");
                              getMessageData("sent");
                              setSelectedItem("");
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <FontAwesomeIcon icon={faPaperPlane} />
                              Sent
                            </div>
                          </Tab>
                        </TabsHeader>
                        <TabsBody
                          placeholder={undefined}
                          className=" text-center"
                        >
                          <TabPanel
                            key={"inbox"}
                            value={"inbox"}
                            className="p-0"
                          >
                            <div
                              className="overflow-auto"
                              style={{ height: height ? height - 280 : 500 }}
                            >
                              {loading ? (
                                <div className="flex flex-col pt-12">
                                  <FontAwesomeIcon
                                    icon={faRotateRight}
                                    size="2x"
                                    className="text-blue-gray-200"
                                    spin
                                  />
                                  <label className="font-medium text-2xl text-blue-gray-200 mt-4">
                                    Message Loading...
                                  </label>
                                </div>
                              ) : (
                                getListItem()
                              )}
                            </div>
                          </TabPanel>
                          <TabPanel key={"sent"} value={"sent"} className="p-0">
                            <div
                              className="overflow-auto"
                              style={{ height: height ? height - 280 : 500 }}
                            >
                              {loading ? (
                                <div className="flex flex-col pt-12">
                                  <FontAwesomeIcon
                                    icon={faRotateRight}
                                    size="2x"
                                    className="text-blue-gray-200"
                                    spin
                                  />
                                  <label className="font-medium text-2xl text-blue-gray-200 mt-4">
                                    Message Loading...
                                  </label>
                                </div>
                              ) : (
                                getListItem()
                              )}
                            </div>
                          </TabPanel>
                        </TabsBody>
                      </Tabs>
                    </div>
                  </form>
                </div>
              </div>

              <div className="w-full lg:w-[70%] my-1 pr-0 lg:pr-2 mt-2 ">
                <p className="text-xl flex items-center">
                  <i className="fas fa-list mr-3"></i> Message Details
                </p>
                <div className="leading-loose">
                  <form
                    className=" bg-white rounded shadow-xl"
                    style={{ height: height ? height - 210 : 500 }}
                  >
                    {selectedItem ? (
                      <div className="">
                        <div>
                          <div className="flex-row flex justify-between border-b-[1px] border-gray-400 items-center">
                            <div className="flex flex-row p-2 ">
                              <label className="font-extrabold w-[80px] text-left">
                                {selectedItem.messageType === "EMAIL"
                                  ? "Subject : "
                                  : "Title : "}
                              </label>
                              <label className="ml-2">
                                {selectedItem.title}
                              </label>
                            </div>
                            <Tooltip content="Delete Message">
                              <IconButton
                                placeholder={undefined}
                                className="h-[30px] w-[30px] bg-blue-800 mr-2"
                                onClick={() => {
                                  setWarningDialog(true);
                                }}
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </IconButton>
                            </Tooltip>
                          </div>
                          <div className="flex flex-row p-2 border-b-[1px] border-gray-400 items-center">
                            <label className="font-extrabold w-[80px] text-left">
                              From :
                            </label>
                            <div className="flex flex-row flex-wrap gap-1">
                              <Chip
                                color="blue"
                                value={
                                  selectedItem.senderId.firstName +
                                  " " +
                                  selectedItem.senderId.lastName
                                }
                                size="sm"
                                className="h-6"
                              />
                            </div>
                          </div>
                          <div className="flex flex-row p-2 border-b-[1px] border-gray-400 items-center">
                            <label className="font-extrabold  w-[80px] text-left">
                              To :
                            </label>
                            <div className="flex flex-row flex-wrap gap-1">
                              {getToList()?.map((obj: any, index: number) => {
                                return (
                                  <Chip
                                    color="blue"
                                    value={obj}
                                    size="sm"
                                    className="h-6"
                                  />
                                );
                              })}
                            </div>
                          </div>
                        </div>
                        <div
                          style={{ height: height ? height - 420 : 300 }}
                          className="overflow-auto"
                        >
                          {selectedItem &&
                          selectedItem.messageType === "EMAIL" ? (
                            <div>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: selectedItem.message,
                                }}
                                className="text-left p-2"
                              />
                            </div>
                          ) : (
                            <div className="p-2 w-full  ">
                              <label className="text-left w-full">
                                {selectedItem.message}
                              </label>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-row flex-wrap p-2 border-t-[1px] border-gray-400">
                          {getFileList().map((obj: any, index: number) => {
                            return (
                              <div
                                className="flex flex-row p-1 bg-green-800 text-white mr-1 mt-1 text-sm rounded items-center px-2 hover:bg-blue-600 cursor-pointer"
                                onClick={() => {
                                  downloadFile(obj);
                                }}
                              >
                                {obj.name}
                                <FontAwesomeIcon
                                  icon={faDownload}
                                  className="ml-2"
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div className="pt-10 font-medium text-3xl text-blue-gray-200 flex flex-col">
                        <FontAwesomeIcon
                          icon={faFaceSadTear}
                          size="2xl"
                          className="mb-4"
                        />
                        No Message Selected
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      {selectedItem && (
        <WarningDialog
          open={warningDialog}
          onOkClick={() => deleteMessageFromList("Me")}
          onOkAll={() => deleteMessageFromList("All")}
          onCloseDialog={() => setWarningDialog(false)}
          header={"Warning !"}
          type={selectedTabs}
          message={
            selectedTabs === "inbox"
              ? `Are you sure? you want to delete message.`
              : `Are you sure? you want to delete this message for you or all. `
          }
          subMessage={
            selectedTabs === "inbox"
              ? "Once you delete this message,  You wont get back it"
              : "Once you delete this message , You wont get back it and if you delete this message for all it will delete from all the user inboxes with related files"
          }
        />
      )}
    </ParentLayout>
  );
};
export default Messages;
