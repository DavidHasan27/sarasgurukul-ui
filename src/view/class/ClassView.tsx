import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ParentLayout from "../../component/app-component/Parent";
import { faEye, faTrash, faSchool } from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import "react-toggle/style.css";
import Toggle from "react-toggle";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useEffect, useRef, useState } from "react";
import Select1 from "react-select";
import Pagination from "../../component/app-component/Pagination";
import WarningDialog from "../../component/app-component/WarningDialog";
import { getSchoolsForSelection } from "../../redux/schools/schoolSlice";
import OutsideClickHandler from "react-outside-click-handler";
import {
  activeDeactiveClass,
  getClassList,
  resetActivateDeactivateClass,
} from "../../redux/class/classSlice";

const ClassView = () => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { optionSchoolList } = useAppSelector((state: any) => state.school);
  const { classList, loading, error, success } = useAppSelector(
    (state: any) => state.class
  );

  const [pageIndex, setPageIndex] = useState(1);
  const [warningDialog, setWarningDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [searchString, setSearchString] = useState<any>("");
  const [school, setSchools] = useState<any>();
  const [schoolMenu, setSchoolMenu] = useState<any>();
  const [active, setActive] = useState<boolean>(true);

  useEffect(() => {
    dispatch(getSchoolsForSelection());
    getClassData();
  }, []);

  useEffect(() => {
    getClassData(undefined, pageIndex - 1, searchString, active);
  }, [pageIndex]);

  const onActivateDeactivateSchool = () => {
    setWarningDialog(false);
    const body = {
      id: selectedItem.id,
      active: !selectedItem.active,
    };
    dispatch(activeDeactiveClass(body));
  };

  const formatOptionLabel = ({ value, label }: any) => {
    return (
      <div
        className="flex flex-col text-left px-3 border-b-[1px] border-gray-400 "
        onClick={() => {
          if (!school || school.id !== value.id) {
            setSchools(value);
            setPageIndex(1);
            getClassData(value.id, 0, searchString, active);
          }
          setSchoolMenu(false);
        }}
      >
        <div className="text-blue-gray-900 text-[16px]"> {label}</div>
        <div className="text-gray-500 text-[12px] -mt-[5px]">
          Branch: {value.branch}
        </div>
      </div>
    );
  };

  const getClassData = (
    schoolId: any = undefined,
    page: any = 0,
    search: any = undefined,
    active: boolean = true
  ) => {
    const body: any = {
      page: page,
      size: 10,
      active: active,
    };

    if (schoolId) {
      body["schoolId"] = schoolId;
    }

    if (search) {
      body["search"] = search;
    }

    dispatch(getClassList(body));
  };

  return (
    <ParentLayout
      loading={loading}
      error={error}
      success={success}
      onCloseSuccessAlert={() => dispatch(resetActivateDeactivateClass())}
    >
      <div
        className="w-full h-screen overflow-x-hidden border-t flex flex-col"
        ref={ref}
      >
        <main className="w-full flex-grow p-6">
          <h1 className="text-3xl text-black pb-6">Classes</h1>

          <div className="w-full mt-6">
            <div className="w-full flex flex-row justify-between items-center">
              <p className="text-xl pb-3 flex items-center">
                <i className="fas fa-list mr-3"></i> Class List
              </p>
              <div className="flex flex-row  mb-2 ">
                <div className="w-[100px] flex-row flex mr-8 text-center mt-2">
                  <Toggle
                    id="cheese-status"
                    defaultChecked={active}
                    onChange={() => {
                      setActive(!active);
                      getClassData(
                        school ? school.id : undefined,
                        0,
                        searchString,
                        !active
                      );
                    }}
                    icons={false}
                  />
                  <span className="ml-2">{active ? "Active" : "Inactive"}</span>
                </div>

                <div className="relative flex w-full mr-2">
                  <OutsideClickHandler
                    onOutsideClick={() => {
                      setSchoolMenu(false);
                    }}
                  >
                    <Select1
                      name="role"
                      placeholder="Select School"
                      options={optionSchoolList}
                      getOptionLabel={(option: any) => option.schoolName}
                      getOptionValue={(option) => option}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          backgroundColor: "#e5e7eb",
                          borderColor: state.isFocused ? "#0f58bf" : "#e1e4e8",
                          textAlign: "left",
                          width: 325,
                          marginRight: 5,
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
                        if (!event) {
                          getClassData(undefined, 0, searchString, active);
                        }
                        setSchools(event);
                      }}
                      value={school}
                      components={{ Option: formatOptionLabel }}
                      menuIsOpen={schoolMenu}
                      onMenuOpen={() => setSchoolMenu(true)}
                      closeMenuOnScroll={true}
                      isClearable
                    />
                  </OutsideClickHandler>
                  <div className="relative h-10 w-full min-w-[325px]">
                    <input
                      className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded"
                      id="search"
                      name="search"
                      type="search"
                      placeholder="Search by Class Name, Identity "
                      aria-label="Phone2"
                      value={searchString}
                      onChange={(event) => {
                        const value = event.target.value;
                        setSearchString(value);
                        if (!value || !value.trim()) {
                          setPageIndex(1);
                          getClassData(
                            school ? school.id : undefined,
                            0,
                            undefined,
                            active
                          );
                        }
                      }}
                    />
                    {/* <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                      Seach by name, branch, phone email
                    </label> */}
                  </div>
                </div>
                <Button
                  className="flex items-center justify-center gap-3 mr-2"
                  placeholder={"Search"}
                  color="blue"
                  size="sm"
                  onClick={() => {
                    getClassData(
                      school ? school.id : undefined,
                      0,
                      searchString,
                      active
                    );
                    setPageIndex(1);
                  }}
                >
                  Search
                </Button>

                <Button
                  className="flex items-center justify-center gap-3 min-w-[170px]"
                  placeholder={"Add New Class"}
                  color="blue"
                  size="sm"
                  onClick={() => navigate("/app/addclass")}
                >
                  <FontAwesomeIcon icon={faSchool} />
                  Add New Class
                </Button>
              </div>
            </div>
            {(!classList ||
              !classList.content ||
              classList.content.length === 0) &&
            !loading ? (
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
                >
                  No Class Found
                </Typography>
              </div>
            ) : (
              <div className="bg-white overflow-auto">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="w-1/5 text-left py-3 px-4 uppercase font-semibold text-sm">
                        Name
                      </th>
                      <th className="w-1/7 text-left py-3 px-4 uppercase font-semibold text-sm">
                        Identity
                      </th>
                      <th className="w-1/8 text-left py-3 px-4 uppercase font-semibold text-sm">
                        School
                      </th>
                      <th className="w-1/8 text-left py-3 px-4 uppercase font-semibold text-sm">
                        Class Teacher
                      </th>
                      <th className="w-1/7 text-left py-3 px-4 uppercase font-semibold text-sm">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {classList &&
                      classList.content.map((item: any, index: number) => (
                        <tr
                          className={`${index % 2 != 0 ? "bg-gray-200" : ""}`}
                        >
                          <td
                            className={`w-1/5 text-left py-3 px-4 ${
                              !item.active ? "opacity-35" : "opacity-100"
                            }`}
                          >
                            {item.className}
                          </td>
                          <td
                            className={`w-1/7 text-left py-3 px-4 ${
                              !item.active ? "opacity-35" : "opacity-100"
                            }`}
                          >
                            {item.classIdentity}
                          </td>
                          <td
                            className={`w-1/8 text-left py-3 px-4 ${
                              !item.active ? "opacity-35" : "opacity-100"
                            }`}
                          >
                            {item.schools.schoolName},{item.schools.branch}
                          </td>
                          <td
                            className={`w-1/8 text-left py-3 px-4 ${
                              !item.active ? "opacity-35" : "opacity-100"
                            }`}
                          >
                            {item.classTeacher
                              ? item.classTeacher.firstName +
                                " " +
                                item.classTeacher.lastName
                              : "-"}
                          </td>

                          <td className="w-1/7 text-left py-3 px-4">
                            <Tooltip content="View/Edit Details">
                              <IconButton
                                placeholder={"View"}
                                className="h-[30px] w-[30px] bg-blue-800 ml-2"
                                onClick={() =>
                                  navigate("/app/view-edit-class", {
                                    state: item,
                                  })
                                }
                              >
                                <FontAwesomeIcon icon={faEye} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip content="Active/Deactive School">
                              <IconButton
                                placeholder={"View"}
                                className="h-[30px] w-[30px] bg-blue-800 ml-2"
                                onClick={() => {
                                  console.log(
                                    "Slected Item ????",
                                    selectedItem
                                  );
                                  console.log(
                                    "warningDialog Item ????",
                                    warningDialog
                                  );
                                  setSelectedItem(item);
                                  setWarningDialog(true);
                                }}
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </IconButton>
                            </Tooltip>
                            {/* <Tooltip content="Edit Details">
                              <IconButton
                                placeholder={"View"}
                                className="h-[30px] w-[30px] bg-blue-800 ml-2"
                              >
                                <FontAwesomeIcon icon={faPencil} />
                              </IconButton>
                            </Tooltip> */}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
            {!classList ||
            !classList.content ||
            classList.content.length == 0 ? (
              <></>
            ) : (
              <div className="mt-2 flex flex-row justify-end">
                <Pagination
                  count={classList.totalPages}
                  onPageChange={(pageIndex: number) => setPageIndex(pageIndex)}
                  pageIndex={pageIndex}
                />
              </div>
            )}
          </div>
        </main>
      </div>
      {selectedItem && selectedItem.className && (
        <WarningDialog
          open={warningDialog}
          onOkClick={() => onActivateDeactivateSchool()}
          onCloseDialog={() => setWarningDialog(false)}
          header={"Warning !"}
          message={
            selectedItem.active
              ? `Are you sure? you want to de-activate."
            ${selectedItem?.className}" Class`
              : `Are you sure? you want to activate."
            ${selectedItem?.className}" Class`
          }
          subMessage={
            selectedItem.active
              ? "Once you deactivate this class,  You wont access this class related data or you can not access any other functinality related to this class."
              : "Once you activate the class , class will be available for all your activities"
          }
        />
      )}
    </ParentLayout>
  );
};
export default ClassView;
