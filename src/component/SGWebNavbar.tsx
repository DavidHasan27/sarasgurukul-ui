import {
  Button,
  Card,
  IconButton,
  MobileNav,
  Navbar,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const SGWebNavbar = (props: any) => {
  const [activePath, setActivePath] = useState("/");
  const [mobile, setMobile] = useState(window.innerWidth <= 500);
  const [openNav, setOpenNav] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleWindowSizeChange = () => {
    setMobile(window.innerWidth <= 500);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

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
          Team
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
    <Navbar
      className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 bg-[#ffe7d5]"
      placeholder={""}
    >
      <div className="flex items-center justify-between text-blue-gray-900 ">
        <div className="flex flex-row items-center">
          <img
            src="img/Saras-300.png"
            style={{ height: 50 }}
            alt="logo"
            className="cursor-pointer "
          />

          <div>
            <Typography
              placeholder={""}
              as="a"
              href="/"
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
          {!mobile && (
            <div className="flex items-center gap-x-1">
              <Button
                placeholder={""}
                size="sm"
                className="sgButton"
                onClick={() => navigate("/app/login")}
              >
                <span>Log In</span>
              </Button>
            </div>
          )}
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
            placeholder={"Sara's Gurukul Login"}
            size="sm"
            className="sgButton w-full"
            onClick={() => navigate("/app/login")}
          >
            <span>Log In</span>
          </Button>
        </div>
      </MobileNav>
    </Navbar>
  );
};

export default SGWebNavbar;
