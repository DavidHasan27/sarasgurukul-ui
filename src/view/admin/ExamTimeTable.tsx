import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ParentLayout from "../../component/app-component/Parent";
import {
  faEye,
  faTrash,
  faSchool,
  faCalendarDay,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";
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
import React, { useEffect, useRef, useState } from "react";
import Select1 from "react-select";
import Pagination from "../../component/app-component/Pagination";
import WarningDialog from "../../component/app-component/WarningDialog";
import { getSchoolsForSelection } from "../../redux/schools/schoolSlice";
import OutsideClickHandler from "react-outside-click-handler";
import moment from "moment";
import { useReactToPrint } from "react-to-print";
import {
  activeDeactiveClass,
  getClassList,
  getClassListBySchoolForDropdown,
  resetActivateDeactivateClass,
} from "../../redux/class/classSlice";
import { getOptionYearLabel, getUserDetails } from "../../utils";
import {
  activeDeactivePlanner,
  getPlans,
  getSchoolYear,
  resetNewHoliday,
} from "../../redux/admin/adminSlice";
import { find } from "lodash";
import logoImage from "../../view/assets/sidebar_image.png";
import {
  ROLE_ADMIN,
  ROLE_PRINCIPAL,
  ROLE_TEACHER,
  SUPER_ADMIN_MENU_LIST,
} from "../../utils/constants";

import comingSoon from "../assets/comingsoon.avif";

const ExamTimeTable = () => {
  const ref = useRef(null);
  const reference = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = getUserDetails();
  const { optionSchoolList } = useAppSelector((state: any) => state.school);

  const { yearList, loading, success, error, planner, planDelete } =
    useAppSelector((state: any) => state.admin);

  const { optionClassList } = useAppSelector((state: any) => state.class);
  const [pageIndex, setPageIndex] = useState(1);
  const [warningDialog, setWarningDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [searchString, setSearchString] = useState<any>("");
  const [school, setSchools] = useState<any>();
  const [schoolMenu, setSchoolMenu] = useState<any>();
  const [active, setActive] = useState<boolean>(true);
  const [YearMenu, setYearMenu] = useState<any>();
  const [selectedYear, setSelectedYear] = useState<any>();

  const [classL, setClass] = useState<any>();
  const [classMenu, setClassMenu] = useState<any>();

  const handleOnAfterPrint = React.useCallback(() => {
    console.log("`onAfterPrint` called"); // tslint:disable-line no-console
  }, []);

  const printPlanner = useReactToPrint({
    contentRef: reference,
    onBeforePrint: () => {
      return new Promise((resolve) => {
        // console.log("In Before Printing :", resolve);
        resolve();
      });
    },
    onAfterPrint: handleOnAfterPrint,
  });

  useEffect(() => {
    dispatch(getSchoolsForSelection());
    dispatch(getSchoolYear());
    // getClassData();
  }, []);

  useEffect(() => {
    if (yearList && yearList.length > 0) {
      const year = find(yearList, (item: any) => item.active);
      if (year) {
        setSelectedYear(year);

        getPlannerData(0, undefined, undefined, searchString, true, year.id);
      }
    }
  }, [yearList]);

  // useEffect(() => {
  //   getPlannerData(undefined, pageIndex - 1, searchString, active);
  // }, [pageIndex]);

  const onActivateDeactivatePlanner = () => {
    setWarningDialog(false);
    const body = {
      id: selectedItem.id,
      active: !selectedItem.active,
    };
    dispatch(activeDeactivePlanner(body));
  };

  const formatOptionLabel = ({ value, label }: any) => {
    return (
      <div
        className="flex flex-col text-left px-3 border-b-[1px] border-gray-400 leading-5"
        onClick={() => {
          if (!school || school.id !== value.id) {
            setSchools(value);
            setPageIndex(1);
            setClass("");
            dispatch(getClassListBySchoolForDropdown([value.id]));
            getPlannerData(
              0,
              value.id,
              undefined,
              searchString,
              true,
              selectedYear.id
            );
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

  const formatOptionLabelForYear = ({ value, label }: any) => {
    return (
      <div
        className="flex flex-col text-left  border-b-[1px] border-gray-400 "
        onClick={() => {
          setSelectedYear(value);
          setYearMenu(false);
          setPageIndex(1);
          getPlannerData(
            0,
            school ? school.id : undefined,
            classL ? classL.id : undefined,
            searchString,
            true,
            value.id
          );
        }}
      >
        <div
          className={`text-blue-gray-900 text-[16px] ${
            value.active ? "bg-blue-gray-100" : ""
          }  px-3 leading-5`}
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

  const formatOptionLabelClass = ({ value, label }: any) => {
    return (
      <div
        className="flex flex-col text-left px-3 border-b-[1px] border-gray-400 "
        onClick={() => {
          setClass(value);
          setClassMenu(false);
          getPlannerData(
            0,
            school ? school.id : undefined,
            value.id,
            searchString,
            true,
            selectedYear.id
          );
          setPageIndex(1);
        }}
      >
        <div className="text-blue-gray-900 text-[16px]"> {label}</div>
        <div className="text-gray-500 text-[12px] my-[1px] leading-none pb-2">
          School: {value.schools.schoolName + ", " + value.schools.branch}
        </div>
      </div>
    );
  };

  const getImageURL = (item: any) => {
    if (item && item.imageUrl) {
      const imageData = item.imageUrl.split("|");
      return (
        "https://" +
        imageData[0] +
        ".s3.ap-south-1.amazonaws.com/" +
        imageData[1]
      );
    }
    return null;
  };
  const getPlannerData = (
    page: any = 0,
    schoolId: any = undefined,
    classId: any = undefined,
    search: any = undefined,
    active: boolean = true,
    yearId: any = selectedYear.id
  ) => {
    const body: any = {
      page: page,
      size: 10,
      active: active,
      yearId: yearId,
    };

    if (schoolId) {
      body["schoolId"] = schoolId;
    }

    if (search) {
      body["search"] = search;
    }

    if (classId) {
      body["classId"] = classId;
    }

    dispatch(getPlans(body));
  };

  const preparePrintComponents = () => {
    if (planner && planner.content.length > 0) {
      // console.log("printInstallment >>>", printInstallment); style={{ display: "none" }}

      return (
        <div>
          <div className="w-full print-component" ref={reference}>
            <label className=" text-5xl text-gray-400 text-center font-extrabold  origin-center rotate-45 absolute opacity-10 top-10 mt-96">
              SARA'S GURUKUL PRI PRIMARY SCHOOL
            </label>

            <form className="p-4 bg-white rounded  min-h-[470px] w-full">
              <div>
                <div className="flex flex-row justify-center mb-3">
                  <img src={logoImage} className="h-[100px] text-center" />
                </div>
                <label className="block text-xl text-gray-900 text-center mb-0 font-extrabold mb-0 ">
                  SARA'S GURUKUL PRI PRIMARY SCHOOL
                </label>
                <label className="block text-1xl text-gray-800 text-center mt-2 font-extrabold mb-2 underline">
                  Planner List
                </label>
              </div>
              <table className="w-full border-collapse border-[2px] border-gray-900 print-component mt-2">
                <thead>
                  <tr className="h-[40px] border-b border-gray-900 bg-blue-gray-100">
                    <th className="pl-4 w-[30%] border-r border-gray-900 ">
                      <label className="block text-base text-gray-900 text-left font-extrabold ">
                        Planner Title
                      </label>
                    </th>
                    <th className="pl-4 w-[50%] border-r border-gray-900 ">
                      <label className="block text-base text-gray-900 text-left font-extrabold ">
                        About Planner
                      </label>
                    </th>
                    <th className="pl-4 w-[20%] ">
                      <label className="block text-base text-gray-900 text-center font-extrabold ">
                        Planner Date
                      </label>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {planner.content.map((obj: any, index: number) => {
                    return (
                      <tr className="min-h-[50px] border-b border-gray-900">
                        <td className="pl-4 py-2 w-[30%] border-r  border-gray-900">
                          <label className="block text-base text-gray-900 text-left font-normal ">
                            {obj.title}
                          </label>
                        </td>

                        <td className="pl-4 py-2 w-[50%] border-r  border-gray-900">
                          <label className="block text-base text-gray-900 text-left font-normal ">
                            {obj.description}
                          </label>
                        </td>

                        <td className="pl-4 py-2 w-[20%]">
                          <label className="block text-base text-gray-900 text-center font-normal ">
                            {moment(obj.date).format("DD MMM YYYY")}
                          </label>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className="mt-[70px] pr-10">
                <label className="block text-base text-gray-900 text-right font-semibold ">
                  Principal
                </label>
              </div>
            </form>
          </div>
        </div>
      );
    } else {
      return "";
    }
  };

  return (
    <ParentLayout
      loading={loading}
      error={error}
      success={planDelete}
      onCloseSuccessAlert={() => dispatch(resetNewHoliday())}
      onCloseAlert={() => dispatch(resetNewHoliday())}
    >
      <div
        className="w-full h-screen overflow-x-hidden border-t flex flex-col justify-center items-center"
        ref={ref}
      >
        <img
          src="/img/app/coming-soon.png"
          className="h-30 w-30"
          alt="Coming Soon"
        />
      </div>
      {selectedItem && selectedItem.title && (
        <WarningDialog
          open={warningDialog}
          onOkClick={() => onActivateDeactivatePlanner()}
          onCloseDialog={() => setWarningDialog(false)}
          header={"Warning !"}
          message={
            selectedItem.active
              ? `Are you sure? you want to delete."
            ${selectedItem?.title}" Plan`
              : `Are you sure? you want to activate."
            ${selectedItem?.title}" Plane`
          }
          subMessage={
            selectedItem.active
              ? "Once you deactivate this Plan,  You wont back it."
              : "Once you activate the class , class will be available for all your activities"
          }
        />
      )}

      {/* {preparePrintComponents()}
      <div className="absolute top-20 right-6">
        <Button
          placeholder={undefined}
          className="bg-blue-700 h-[30px] p-0 w-[40px] "
          onClick={() => {
            // console.log("Print Component ::::");
            printPlanner();
          }}
        >
          <FontAwesomeIcon icon={faPrint} />
        </Button>
      </div> */}
    </ParentLayout>
  );
};
export default ExamTimeTable;
