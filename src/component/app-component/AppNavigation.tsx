import { Typography } from "@material-tailwind/react";
import { useCallback, useEffect, useState } from "react";
import { clearSession } from "../../utils";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { resetUserDetails } from "../../redux/user_auth/authSlice";
import { MENU_LIST } from "../../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import "../../view/main-view/mainview.css";
import logoImage from "../../view/assets/sidebar_image.png";

const AppNavigation = ({ children, currentPath }: any) => {
  const [dropdown, setDropdown] = useState(false);
  const [menuList, setMenulist] = useState([]);
  const location = useLocation();
  const [selectedName, setSelecteName] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user: any = useAppSelector((state) => state.auth.user);
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleIsExpanded = useCallback(() => {
    setIsExpanded((isExpanded) => !isExpanded);
  }, []);

  useEffect(() => {
    if (user && user.role) {
      setMenulist(MENU_LIST[user.role]);
    } else {
      setMenulist([]);
    }
  }, [user]);

  return (
    <div className="bg-gray-100 font-family-karla flex">
      <aside className="relative bg-sidebar h-screen w-64 hidden sm:block shadow-xl bg-blue-gray-800">
        <div className="p-6">
          <img src={logoImage} />
          {/* <a
            href="/dash"
            className="text-white text-3xl font-semibold uppercase hover:text-gray-300"
          >
            Admin
          </a>
          <button className="w-full bg-white cta-btn font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
            <i className="fas fa-plus mr-3"></i> New Report
          </button> */}
        </div>
        <nav className="text-white text-base font-semibold pt-3 ">
          {menuList.map((item: any) => {
            if (!item.child) {
              return (
                <Link
                  to={item.path}
                  className={`flex items-center ${
                    item.path === location.pathname ? "active-nav-link" : ""
                  } text-white py-3 pl-3 nav-item`}
                >
                  <FontAwesomeIcon icon={item.icon} className="mr-3" />
                  {item.name}
                </Link>
              );
            } else {
              return (
                <>
                  <button
                    className={`flex items-center ${
                      item.path === location.pathname ? "active-nav-link" : ""
                    } text-white py-4 pl-3 nav-item`}
                    onClick={toggleIsExpanded}
                  >
                    <FontAwesomeIcon icon={item.icon} className="mr-3" />
                    {item.name}
                    <FontAwesomeIcon
                      icon={isExpanded ? faAngleDown : faAngleRight}
                      className="ml-16"
                    />
                  </button>

                  <div
                    className="transition-height duration-300 overflow-hidden bg-sidebar"
                    style={{ height: isExpanded ? "300px" : "0px" }}
                  >
                    {item.child.map((subItem: any) => (
                      <Link
                        to={subItem.path}
                        className={`flex items-center ${
                          subItem.path === location.pathname
                            ? "active-nav-link"
                            : ""
                        } text-white py-1 pl-8 nav-item`}
                      >
                        <FontAwesomeIcon icon={subItem.icon} className="mr-3" />
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                </>
              );
              // <Link
              //   to={item.path}
              //   className={`flex items-center ${
              //     item.path === location.pathname ? "active-nav-link" : ""
              //   } text-white py-4 pl-6 nav-item`}
              // >
              //   <FontAwesomeIcon icon={item.icon} className="mr-3" />
              //   {item.name}
              // </Link>;
            }
          })}
          {/* <a
            href="index.html"
            className="flex items-center active-nav-link text-white py-4 pl-6 nav-item"
          >
            <i className="fas fa-tachometer-alt mr-3"></i>
            Dashboard
          </a>
          <a
            href="blank.html"
            className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item"
          >
            <i className="fas fa-sticky-note mr-3"></i>
            Blank Page
          </a>
          <a
            href="tables.html"
            className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item"
          >
            <i className="fas fa-table mr-3"></i>
            Tables
          </a>
          <a
            href="forms.html"
            className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item"
          >
            <i className="fas fa-align-left mr-3"></i>
            Forms
          </a>
          <a
            href="tabs.html"
            className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item"
          >
            <i className="fas fa-tablet-alt mr-3"></i>
            Tabbed Content
          </a>
          <a
            href="calendar.html"
            className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item"
          >
            <i className="fas fa-calendar mr-3"></i>
            Calendar
          </a> */}
        </nav>
      </aside>

      <div className="w-full flex flex-col h-screen overflow-y-hidden">
        {/* Desktop Header */}
        <header className="w-full items-center bg-white py-2 px-6  sm:flex">
          <div className="w-1/2"></div>
          <div className="relative w-1/2 flex justify-end">
            <button
              className="realtive z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none"
              onClick={() => setDropdown(!dropdown)}
              onMouseEnter={() => setDropdown(!dropdown)}
            >
              <img src="https://source.unsplash.com/uJ8LNVCBjFQ/400x400" />
            </button>

            <div
              x-show={dropdown}
              className={`absolute w-32 bg-white rounded-lg shadow-lg py-2 mt-16 ${
                !dropdown ? "hidden" : ""
              }`}
              onMouseLeave={() => setDropdown(!dropdown)}
            >
              <Typography
                className="block px-4 py-2 account-link hover:text-white font-medium"
                placeholder={"Sign Out"}
                onClick={() => setDropdown(!dropdown)}
              >
                Profile
              </Typography>
              <Typography
                className="block px-4 py-2 account-link hover:text-white font-medium"
                placeholder={"Sign Out"}
                onClick={() => {
                  navigate("/login");
                  setDropdown(!dropdown);
                  clearSession();
                  dispatch(resetUserDetails());
                }}
              >
                Sign Out
              </Typography>
            </div>
          </div>
        </header>

        <header
          x-data="{ isOpen: false }"
          className="w-full bg-sidebar py-5 px-6 sm:hidden"
        >
          <div className="flex items-center justify-between">
            <a
              href="index.html"
              className="text-white text-3xl font-semibold uppercase hover:text-gray-300"
            >
              Admin
            </a>
            <button className="text-white text-3xl focus:outline-none">
              <i x-show="!isOpen" className="fas fa-bars"></i>
              <i x-show="isOpen" className="fas fa-times"></i>
            </button>
          </div>

          {/* <!-- Dropdown Nav --> */}
          <nav className="flex flex-col pt-4">
            <a
              href="index.html"
              className="flex items-center active-nav-link text-white py-2 pl-4 nav-item"
            >
              <i className="fas fa-tachometer-alt mr-3"></i>
              Dashboard1
            </a>
            <a
              href="blank.html"
              className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item"
            >
              <i className="fas fa-sticky-note mr-3"></i>
              Blank Page
            </a>
            <a
              href="tables.html"
              className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item"
            >
              <i className="fas fa-table mr-3"></i>
              Tables
            </a>
            <a
              href="forms.html"
              className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item"
            >
              <i className="fas fa-align-left mr-3"></i>
              Forms
            </a>
            <a
              href="tabs.html"
              className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item"
            >
              <i className="fas fa-tablet-alt mr-3"></i>
              Tabbed Content
            </a>
            <a
              href="calendar.html"
              className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item"
            >
              <i className="fas fa-calendar mr-3"></i>
              Calendar
            </a>
            <a
              href="#"
              className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item"
            >
              <i className="fas fa-cogs mr-3"></i>
              Support
            </a>
            <a
              href="#"
              className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item"
            >
              <i className="fas fa-user mr-3"></i>
              My Account
            </a>
            <a
              href="#"
              className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item"
            >
              <i className="fas fa-sign-out-alt mr-3"></i>
              Sign Out
            </a>
            <button className="w-full bg-white cta-btn font-semibold py-2 mt-3 rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
              <i className="fas fa-arrow-circle-up mr-3"></i> Upgrade to Pro!
            </button>
          </nav>
          {/* <!-- <button className="w-full bg-white cta-btn font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
                <i className="fas fa-plus mr-3"></i> New Report
            </button> --> */}
        </header>

        <div className="w-full overflow-x-hidden border-t flex flex-col">
          {/* <main className="w-full flex-grow p-6">
            <h1 className="text-3xl text-black pb-6">Dashboard</h1>
          </main> */}

          <Outlet />

          {/* {children} */}
        </div>
      </div>
    </div>
  );
};

export default AppNavigation;
