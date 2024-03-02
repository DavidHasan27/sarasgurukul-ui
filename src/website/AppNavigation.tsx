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
import SGWebNavbar from "../component/SGWebNavbar";

const AppNavigation = ({ children, currentPath }: any) => {
  console.log("currentPath", currentPath, children);
  return (
    <div className="max-h-[100vh] w-[100%] overflow-scroll">
      {currentPath !== "/app/login" && (
        <SGWebNavbar currentPath={currentPath} />
      )}
      <div className="max-w-full">{children}</div>
    </div>
  );
};

export default AppNavigation;
