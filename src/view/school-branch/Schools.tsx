import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ParentLayout from "../../component/app-component/Parent";
import {
  faEye,
  faTrash,
  faPencil,
  faSchool,
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
import {
  getSchoolList,
  activeDeactiveSchool,
  resetActivateDeactivateSchool,
} from "../../redux/schools/schoolSlice";
import Pagination from "../../component/app-component/Pagination";
import WarningDialog from "../../component/app-component/WarningDialog";

const Schools = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error, schoolList, success } = useAppSelector(
    (state: any) => state.school
  );
  const [pageIndex, setPageIndex] = useState(1);
  const [warningDialog, setWarningDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [searchString, setSearchString] = useState<any>("");

  console.log("School List ::", schoolList);

  useEffect(() => {
    dispatch(
      getSchoolList({
        pageIndex: pageIndex,
        count: 7,
        searchString: searchString.trim(),
      })
    );
  }, [pageIndex]);

  const onActivateDeactivateSchool = () => {
    setWarningDialog(false);
    const body = {
      id: selectedItem.id,
      active: !selectedItem.active,
    };
    dispatch(activeDeactiveSchool(body));
  };

  return (
    <ParentLayout
      loading={loading}
      error={error}
      success={success}
      onCloseSuccessAlert={() => dispatch(resetActivateDeactivateSchool())}
    >
      <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
        <main className="w-full flex-grow p-6">
          <h1 className="text-3xl text-black pb-6">Schools</h1>

          <div className="w-full mt-6">
            <div className="w-full flex flex-row justify-between items-center">
              <p className="text-xl pb-3 flex items-center">
                <i className="fas fa-list mr-3"></i> School List
              </p>
              <div className="flex flex-row  mb-2 ">
                <div className="relative flex w-full mr-2">
                  <div className="relative h-10 w-full min-w-[370px]">
                    <input
                      className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded"
                      id="search"
                      name="search"
                      type="search"
                      placeholder="Search by School Name, Branch, Email, Phone "
                      aria-label="Phone2"
                      value={searchString}
                      onChange={(event) => {
                        const value = event.target.value;
                        setSearchString(value);
                        if (!value || !value.trim()) {
                          setPageIndex(1);
                          dispatch(
                            getSchoolList({
                              pageIndex: 1,
                              count: 7,
                              searchString: "",
                            })
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
                    if (pageIndex !== 1) {
                      setPageIndex(1);
                    } else {
                      dispatch(
                        getSchoolList({
                          pageIndex: pageIndex,
                          count: 7,
                          searchString: searchString.trim(),
                        })
                      );
                    }
                  }}
                >
                  Search
                </Button>

                <Button
                  className="flex items-center justify-center gap-3 min-w-[170px]"
                  placeholder={"Add New School"}
                  color="blue"
                  size="sm"
                  onClick={() => navigate("/app/addschool")}
                >
                  <FontAwesomeIcon icon={faSchool} />
                  Add New School
                </Button>
              </div>
            </div>
            {(!schoolList ||
              !schoolList.content ||
              schoolList.content.length === 0) &&
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
                  No Schools Found
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
                        Branch
                      </th>
                      <th className="w-1/8 text-left py-3 px-4 uppercase font-semibold text-sm">
                        Phone
                      </th>
                      <th className="w-1/8 text-left py-3 px-4 uppercase font-semibold text-sm">
                        Email
                      </th>
                      <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                        Addreess
                      </th>
                      <th className="w-1/7 text-left py-3 px-4 uppercase font-semibold text-sm">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {schoolList &&
                      schoolList.content.map((item: any, index: number) => (
                        <tr
                          className={`${index % 2 != 0 ? "bg-gray-200" : ""}`}
                        >
                          <td
                            className={`w-1/5 text-left py-3 px-4 ${
                              !item.active ? "opacity-35" : "opacity-100"
                            }`}
                          >
                            {item.schoolName}
                          </td>
                          <td
                            className={`w-1/7 text-left py-3 px-4 ${
                              !item.active ? "opacity-35" : "opacity-100"
                            }`}
                          >
                            {item.branch}
                          </td>
                          <td
                            className={`w-1/8 text-left py-3 px-4 ${
                              !item.active ? "opacity-35" : "opacity-100"
                            }`}
                          >
                            <a
                              className={`hover:text-blue-500 ${
                                !item.active ? "opacity-35" : "opacity-100"
                              }`}
                              href="tel:622322662"
                            >
                              {item.phone1}
                            </a>
                          </td>
                          <td
                            className={`w-1/8 text-left py-3 px-4 ${
                              !item.active ? "opacity-35" : "opacity-100"
                            }`}
                          >
                            <a
                              className={`hover:text-blue-500 ${
                                !item.active ? "opacity-35" : "opacity-100"
                              }`}
                              href="tel:622322662"
                            >
                              {item.schoolEmail}
                            </a>
                          </td>
                          <td
                            className={`w-1/3 text-left py-3 px-4 ${
                              !item.active ? "opacity-35" : "opacity-100"
                            }`}
                          >
                            <a
                              className="hover:text-blue-500"
                              href="mailto:jonsmith@mail.com"
                            >
                              {item.addressLine1}
                            </a>
                          </td>
                          <td className="w-1/7 text-left py-3 px-4">
                            <Tooltip content="View/Edit Details">
                              <IconButton
                                placeholder={"View"}
                                className="h-[30px] w-[30px] bg-blue-800 ml-2"
                                onClick={() =>
                                  navigate("/app/view-edit-school", {
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
            {!schoolList ||
            !schoolList.content ||
            schoolList.content.length == 0 ? (
              <></>
            ) : (
              <div className="mt-2 flex flex-row justify-end">
                <Pagination
                  count={schoolList.totalPages}
                  onPageChange={(pageIndex: number) => setPageIndex(pageIndex)}
                  pageIndex={pageIndex}
                />
              </div>
            )}
          </div>
        </main>
      </div>
      {selectedItem && selectedItem.schoolName && (
        <WarningDialog
          open={warningDialog}
          onOkClick={() => onActivateDeactivateSchool()}
          onCloseDialog={() => setWarningDialog(false)}
          header={"Warning !"}
          message={
            selectedItem.active
              ? `Are you sure? you want to de-activate."
            ${selectedItem?.schoolName}" School`
              : `Are you sure? you want to activate."
            ${selectedItem?.schoolName}" School`
          }
          subMessage={
            selectedItem.active
              ? "Once you deactivate this school,  You wont access this school related data or you can not access any other functinality related to this school."
              : "Once you activate the school , school will be available for all your activities"
          }
        />
      )}
    </ParentLayout>
  );
};
export default Schools;
