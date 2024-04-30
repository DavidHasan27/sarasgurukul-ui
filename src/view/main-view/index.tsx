import { Route, Routes } from "react-router-dom";
import AppNavigation from "../../component/app-component/AppNavigation";
import Dashboard from "../dashobaord";
import "./mainview.css";

const AppDashboard = () => {
  console.log("AppDashboard :::: ");
  return (
    <AppNavigation>
      <>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </>
    </AppNavigation>
  );
};

export default AppDashboard;
