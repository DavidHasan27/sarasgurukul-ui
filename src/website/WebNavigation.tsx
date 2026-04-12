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
  /** App shell (/app/*) should not scroll as a whole — only sidebar + main column scroll */
  const isAppShell = currentPath.startsWith("/app");

  return (
    <div
      className={
        isAppShell
          ? "flex h-[100dvh] max-h-[100dvh] w-full min-h-0 flex-col overflow-hidden"
          : "min-h-screen w-full overflow-x-hidden overflow-y-auto"
      }
    >
      {APP_URL.indexOf(currentPath) === -1 && (
        <SGWebNavbar currentPath={currentPath} />
      )}
      <div
        className={
          isAppShell
            ? "flex min-h-0 flex-1 flex-col overflow-hidden"
            : "max-w-full"
        }
      >
        {children}
      </div>
    </div>
  );
};

export default WebNavigation;
