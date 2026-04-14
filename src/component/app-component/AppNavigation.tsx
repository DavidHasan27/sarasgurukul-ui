import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { clearSession, getUserDetails } from "../../utils";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { resetUserDetails } from "../../redux/user_auth/authSlice";
import { MENU_LIST } from "../../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faAngleDown,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "../../view/main-view/mainview.css";

function AppPageFallback() {
  return (
    <div className="flex min-h-[40vh] w-full items-center justify-center bg-gray-50">
      <div
        className="h-9 w-9 animate-spin rounded-full border-2 border-[#193474] border-t-transparent"
        aria-hidden
      />
    </div>
  );
}

const AppNavigation = ({ children, currentPath }: any) => {
  const [dropdown, setDropdown] = useState(false);
  const [menuList, setMenulist] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user: any = useAppSelector((state) => state.auth.user);
  const [isExpanded, setIsExpanded] = useState(false);
  const userDetails = getUserDetails();
  const accountMenuRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    if (!dropdown) return;
    const closeOnOutside = (e: MouseEvent) => {
      if (
        accountMenuRef.current &&
        !accountMenuRef.current.contains(e.target as Node)
      ) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", closeOnOutside);
    return () => document.removeEventListener("mousedown", closeOnOutside);
  }, [dropdown]);

  /** S3 bucket|key URL, or null when no valid profile photo */
  const getProfilePhotoUrl = (): string | null => {
    const raw = userDetails?.userProfilePhoto;
    if (!raw || typeof raw !== "string") return null;
    const trimmed = raw.trim();
    if (!trimmed.includes("|")) return null;
    const parts = trimmed.split("|");
    if (parts.length < 2 || !parts[0]?.trim() || !parts[1]?.trim()) {
      return null;
    }
    return `https://${parts[0].trim()}.s3.ap-south-1.amazonaws.com/${parts[1].trim()}`;
  };

  const profilePhotoUrl = getProfilePhotoUrl();

  const onSignOut = () => {
    setDropdown(false);
    clearSession();
    dispatch(resetUserDetails());
    navigate("/login", { replace: true });
  };

  return (
    <div className="font-family-karla flex h-full min-h-0 w-full flex-1 overflow-hidden bg-gray-100">
      <aside className="relative hidden h-full min-h-0 w-64 flex-shrink-0 flex-col overflow-hidden bg-sidebar sm:flex">
        <div className="shrink-0 p-6">
          <img src="/img/app/sidebar_image.png" alt="logo" />
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

        <div className="sidebar-nav-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <nav className="text-white text-base font-semibold pt-3">
            {menuList.map((item: any) => {
              if (!item.child) {
                return (
                  <Link
                    to={item.path}
                    className={`flex items-center ${
                      item.path === location.pathname ? "active-nav-link" : ""
                    } text-white py-1 pl-3 nav-item`}
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
                      } text-white py-1 pl-3 nav-item`}
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
                          <FontAwesomeIcon
                            icon={subItem.icon}
                            className="mr-3"
                          />
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
        </div>
      </aside>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        {/* Desktop Header — z-50 + no overflow clip so the account menu can open below */}
        <header className="relative z-50 flex w-full shrink-0 items-center justify-end bg-white py-2 px-6 sm:flex">
          <div ref={accountMenuRef} className="relative flex justify-end">
            <button
              type="button"
              aria-expanded={dropdown}
              aria-haspopup="menu"
              aria-label="Account menu"
              className="relative z-10 h-12 w-12 overflow-hidden rounded-full border-4 border-gray-400 bg-gray-100 hover:border-gray-300 focus:border-gray-300 focus:outline-none"
              onClick={() => setDropdown((open) => !open)}
            >
              {profilePhotoUrl ? (
                <img
                  src={profilePhotoUrl}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center text-gray-500">
                  <FontAwesomeIcon icon={faUser} className="text-xl" />
                </span>
              )}
            </button>

            {dropdown && (
              <div
                className="absolute right-0 top-full z-50 mt-2 w-40 rounded-lg border border-gray-100 bg-white py-1 shadow-lg"
                role="menu"
              >
                <button
                  type="button"
                  role="menuitem"
                  className="block w-full px-4 py-2 text-left text-sm font-medium account-link hover:text-white"
                  onClick={() => {
                    setDropdown(false);
                    navigate("/app/profile");
                  }}
                >
                  Profile
                </button>
                <button
                  type="button"
                  role="menuitem"
                  className="block w-full px-4 py-2 text-left text-sm font-medium account-link hover:text-white"
                  onClick={onSignOut}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </header>

        {/* <header
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
          </div> */}

        {/* <!-- Dropdown Nav --> */}
        {/* <nav className="flex flex-col pt-4">
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
          </nav> */}
        {/* <!-- <button className="w-full bg-white cta-btn font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
                <i className="fas fa-plus mr-3"></i> New Report
            </button> --> */}
        {/* </header> */}

        <div className="app-main-scroll flex min-h-0 flex-1 flex-col overflow-x-hidden overflow-y-auto overscroll-contain border-t">
          <Suspense fallback={<AppPageFallback />}>
            <Outlet />
          </Suspense>

          {/* {children} */}
        </div>
      </div>
    </div>
  );
};

export default AppNavigation;
