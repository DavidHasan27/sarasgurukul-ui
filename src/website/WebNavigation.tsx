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
import { APP_URL } from "../utils/constants";

const WebNavigation = ({ children, currentPath }: any) => {
  console.log("currentPath", currentPath, children);

  return (
    <div className="h-[100vh] w-[100%] overflow-scroll">
      {APP_URL.indexOf(currentPath) === -1 && (
        <SGWebNavbar currentPath={currentPath} />
      )}
      <div className="max-w-full">{children}</div>
    </div>
  );
};

export default WebNavigation;
