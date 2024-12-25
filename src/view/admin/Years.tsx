import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ParentLayout from "../../component/app-component/Parent";
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  activeDeactiveYears,
  getSchoolYear,
  resetActivateYear,
} from "../../redux/admin/adminSlice";
import { Button } from "@material-tailwind/react";

const Year = () => {
  const dispatch = useAppDispatch();
  const { yearList, updated, loading, error } = useAppSelector(
    (state: any) => state.admin
  );
  useEffect(() => {
    dispatch(getSchoolYear());
  }, []);

  useEffect(() => {
    if (updated) {
      dispatch(getSchoolYear());
    }
  }, [updated]);

  const getOptionLabel = (option: any) => {
    return (
      option.startMonth +
      " " +
      option.startYear +
      " - " +
      option.endMonth +
      " " +
      option.endYear
    );
  };

  const onClickActivate = (id: any) => {
    dispatch(activeDeactiveYears({ id }));
  };

  return (
    <ParentLayout
      loading={loading}
      error={error}
      success={updated ? "Activated year successfully" : ""}
      onCloseSuccessAlert={() => dispatch(resetActivateYear())}
      onCloseAlert={() => dispatch(resetActivateYear())}
    >
      <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
        <main className="w-full flex-grow p-6">
          <span>
            <FontAwesomeIcon icon={faCalendarDay} className="mr-2 fa-4x p-0" />
            <h1 className="w-full text-3xl text-black mt-2">School Years</h1>
          </span>
          <div className="flex  text-center justify-center">
            <form className=" bg-white rounded shadow-xl min-h-[400px] w-[500px] border border-gray-300 pb-10 mt-10">
              <div className="w-[100%] h-[50px] flex flex-row border-b border-gray-300">
                <div className="flex-1 h-full  border-r border-gray-300 uppercase font-semibold text-sm items-center justify-center flex flex-row">
                  {"Years"}
                </div>
                <div className="flex-1 h-full  uppercase font-semibold text-sm items-center justify-center flex flex-row ">
                  {"Action"}
                </div>
              </div>

              {yearList.map((item: any) => (
                <div className="w-[100%] h-[50px] flex flex-row border-b border-gray-300">
                  <div className="flex-1 h-full  border-r border-gray-300 uppercase  text-sm items-center justify-center flex flex-row">
                    {getOptionLabel(item)}
                  </div>
                  <div className="flex-1 h-full  uppercase  text-sm items-center justify-center flex flex-row ">
                    {!item.active ? (
                      <Button
                        className="flex items-center justify-center mr-2"
                        placeholder={"Activate"}
                        color="blue"
                        size="sm"
                        onClick={() => onClickActivate(item.id)}
                      >
                        Start
                      </Button>
                    ) : (
                      <Button
                        className="flex items-center justify-center mr-2"
                        placeholder={"Activate"}
                        color="green"
                        size="sm"
                      >
                        Active
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </form>
          </div>
        </main>
      </div>
    </ParentLayout>
  );
};

export default Year;
