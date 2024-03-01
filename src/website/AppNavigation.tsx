import {
  Button,
  Card,
  IconButton,
  MobileNav,
  Navbar,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Routes, useLocation } from "react-router-dom";

const AppNavigation = ({ children }: any) => {
  const [activePath, setActivePath] = useState("/");
  const [openNav, setOpenNav] = useState(false);
  const location = useLocation();

  // Get current path
  const path = location.pathname;

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  console.log("active ::", path);
  // return (
  //   // <div className="container-fluid bg-light position-relative shadow">
  //   //   <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0 px-lg-5">
  //   //     <a href="" className="navbar-brand font-weight-bold text-secondary">
  //   //       <div
  //   //         style={{
  //   //           display: "flex",
  //   //           flexDirection: "row",
  //   //           alignItems: "center",
  //   //           textAlign: "left",
  //   //         }}
  //   //       >
  //   //         <img src="img/Saras-300.png" style={{ height: 70 }}></img>

  //   //         <div
  //   //           style={{
  //   //             display: "flex",
  //   //             flexDirection: "column",
  //   //             marginLeft: 16,
  //   //           }}
  //   //         >
  //   //           <span
  //   //             style={{
  //   //               color: "#FA6D2E",
  //   //               fontFamily: "GFS Didot",
  //   //               fontWeight: 700,
  //   //               fontSize: 40,
  //   //               lineHeight: 1,
  //   //             }}
  //   //           >
  //   //             SARA's Gurukul
  //   //           </span>
  //   //           <span
  //   //             style={{
  //   //               color: "#FA6D2E",
  //   //               fontFamily: "GFS Didot",
  //   //               fontSize: 16,
  //   //             }}
  //   //           >
  //   //             Pre-Primary School
  //   //           </span>
  //   //         </div>
  //   //       </div>
  //   //     </a>
  //   //     <button
  //   //       type="button"
  //   //       className="navbar-toggler"
  //   //       data-toggle="collapse"
  //   //       data-target="#navbarCollapse"
  //   //     >
  //   //       <span className="navbar-toggler-icon"></span>
  //   //     </button>
  //   //     <div
  //   //       className="collapse navbar-collapse justify-content-between"
  //   //       id="navbarCollapse"
  //   //     >
  //   //       <div className="navbar-nav font-weight-bold mx-auto py-0 ">
  //   //         <a
  //   //           href="/"
  //   //           className={`nav-item nav-link ${
  //   //             activePath === "/" ? "active" : ""
  //   //           }`}
  //   //         >
  //   //           Home
  //   //         </a>
  //   //         <a
  //   //           href="/about"
  //   //           className={`nav-item nav-link ${
  //   //             activePath === "/about" ? "active" : ""
  //   //           }`}
  //   //         >
  //   //           About
  //   //         </a>
  //   //         <a
  //   //           href="/class"
  //   //           className={`nav-item nav-link ${
  //   //             activePath === "/class" ? "active" : ""
  //   //           }`}
  //   //         >
  //   //           Class
  //   //         </a>
  //   //         <a
  //   //           href="/teachers"
  //   //           className={`nav-item nav-link ${
  //   //             activePath === "/teachers" ? "active" : ""
  //   //           }`}
  //   //         >
  //   //           Teachers
  //   //         </a>
  //   //         <a
  //   //           href="/gallery"
  //   //           className={`nav-item nav-link ${
  //   //             activePath === "/gallery" ? "active" : ""
  //   //           }`}
  //   //         >
  //   //           Gallery
  //   //         </a>
  //   //         <div className="nav-item dropdown">
  //   //           <a
  //   //             href="#"
  //   //             className="nav-link dropdown-toggle"
  //   //             data-toggle="dropdown"
  //   //           >
  //   //             Pages
  //   //           </a>
  //   //           <div className="dropdown-menu rounded-0 m-0">
  //   //             <a href="blog.html" className="dropdown-item">
  //   //               Blog Grid
  //   //             </a>
  //   //             <a href="single.html" className="dropdown-item">
  //   //               Blog Detail
  //   //             </a>
  //   //           </div>
  //   //         </div>
  //   //         <a
  //   //           href="/contact"
  //   //           className={`nav-item nav-link ${
  //   //             activePath === "/contact" ? "active" : ""
  //   //           }`}
  //   //         >
  //   //           Contact
  //   //         </a>

  //   //         <div className="nav-item dropdown">
  //   //           <a
  //   //             href="#"
  //   //             className="nav-link dropdown-toggle"
  //   //             data-toggle="dropdown"
  //   //           >
  //   //             Branch
  //   //           </a>
  //   //           <div className="dropdown-menu rounded-0 m-0">
  //   //             <a href="blog.html" className="dropdown-item">
  //   //               Kalewadi
  //   //             </a>
  //   //             <a href="single.html" className="dropdown-item">
  //   //               Hinjewadi
  //   //             </a>
  //   //           </div>
  //   //         </div>
  //   //       </div>
  //   //       <a href="/app/login" className="btn btn-primary px-4">
  //   //         Login
  //   //       </a>
  //   //     </div>
  //   //   </nav>
  //   // </div>
  // );

  const navList = (
    <ul className="mt-2 mb-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="black"
        className={`flex items-center gap-x-2 p-1 font-semibold text-[16px]  font-sans ${
          activePath === "/"
            ? "text-white bg-[#FA6D2E] px-3 rounded-xl shadow-[inset_0_-1px_1px_rgba(0,0,0,0.5)] border-[1px] border-[#9a2112] h-[30px]"
            : "text-[#7c1e12]"
        }`}
        placeholder={""}
      >
        <a href="/" className="flex items-center hover:text-[#430c07]">
          Home
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className={`flex items-center gap-x-2 p-1 font-semibold text-[16px]  font-sans ${
          activePath === "/about"
            ? "text-white bg-[#FA6D2E] px-3 rounded-xl shadow-[inset_0_-1px_1px_rgba(0,0,0,0.5)] border-[1px] border-[#9a2112] h-[30px]"
            : "text-[#7c1e12]"
        }`}
        placeholder={""}
      >
        <a href="/about" className="flex items-center hover:text-[#430c07]">
          About
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className={`flex items-center gap-x-2 p-1 font-semibold text-[16px]  font-sans ${
          activePath === "/class"
            ? "text-white bg-[#FA6D2E] px-3 rounded-xl shadow-[inset_0_-1px_1px_rgba(0,0,0,0.5)] border-[1px] border-[#9a2112] h-[30px]"
            : "text-[#7c1e12]"
        }`}
        placeholder={""}
      >
        <a href="/class" className="flex items-center hover:text-[#430c07]">
          Class
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className={`flex items-center gap-x-2 p-1 font-semibold text-[16px]  font-sans ${
          activePath === "/teachers"
            ? "text-white bg-[#FA6D2E] px-3 rounded-xl shadow-[inset_0_-1px_1px_rgba(0,0,0,0.5)] border-[1px] border-[#9a2112] h-[30px]"
            : "text-[#7c1e12]"
        }`}
        placeholder={""}
      >
        <a href="/teachers" className="flex items-center hover:text-[#430c07]">
          Teachers
        </a>
      </Typography>

      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className={`flex items-center gap-x-2 p-1 font-semibold text-[16px]  font-sans ${
          activePath === "/gallery"
            ? "text-white bg-[#FA6D2E] px-3 rounded-xl shadow-[inset_0_-1px_1px_rgba(0,0,0,0.5)] border-[1px] border-[#9a2112] h-[30px]"
            : "text-[#7c1e12]"
        }`}
        placeholder={""}
      >
        <a href="/gallery" className="flex items-center">
          Gallery
        </a>
      </Typography>

      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className={`flex items-center gap-x-2 p-1 font-semibold text-[16px]  font-sans ${
          activePath === "/contact"
            ? "text-white bg-[#FA6D2E] px-3 rounded-xl shadow-[inset_0_-1px_1px_rgba(0,0,0,0.5)] border-[1px] border-[#9a2112] h-[30px]"
            : "text-[#7c1e12]"
        }`}
        placeholder={""}
      >
        <a href="/contact" className="flex items-center hover:text-[#430c07]">
          Contact
        </a>
      </Typography>
    </ul>
  );

  return (
    <div className="max-h-[100vh] w-[100%] overflow-scroll">
      <Navbar
        className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 bg-[#ffe7d5]"
        placeholder={""}
      >
        <div className="flex items-center justify-between text-blue-gray-900 ">
          <div className="flex flex-row items-center">
            <img src="img/Saras-300.png" style={{ height: 50 }} alt="logo" />

            <div>
              <Typography
                placeholder={""}
                as="a"
                href="#"
                className="mr-4 cursor-pointer ml-2  text-[#FA6D2E] font-bold text-4xl font-display leading-none tracking-tight"
              >
                SARA's Gurukul
              </Typography>
              <Typography
                placeholder={""}
                // as="a"
                // href="#"
                className="mr-4 ml-2  text-[#FA6D2E] font-semibold text-sm font-display leading-none tracking-tight text-left"
              >
                Pre-Primary School
              </Typography>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <div className="flex items-center gap-x-1">
              <Button
                placeholder={""}
                variant="gradient"
                size="sm"
                className="hidden lg:inline-block"
              >
                <span>Log In</span>
              </Button>
            </div>
            <IconButton
              variant="text"
              placeholder={""}
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav}>
          {navList}
          <div className="flex items-center gap-x-1">
            <Button
              fullWidth
              variant="text"
              size="sm"
              className=""
              placeholder={""}
            >
              <span>Log In</span>
            </Button>
            <Button
              fullWidth
              variant="gradient"
              size="sm"
              className=""
              placeholder={""}
            >
              <span>Sign in</span>
            </Button>
          </div>
        </MobileNav>
      </Navbar>
      <div className="max-w-full">{children}</div>
    </div>
  );
};

export default AppNavigation;
