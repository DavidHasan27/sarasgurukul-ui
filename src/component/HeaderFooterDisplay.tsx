import { useLocation } from "react-router-dom";

const HeaderFooterDisplay = ({ children }: any) => {
  const location = useLocation();
  console.log("Path", location.pathname);

  return <>{!location.pathname.startsWith("/app/") && children}</>;
};

export default HeaderFooterDisplay;
