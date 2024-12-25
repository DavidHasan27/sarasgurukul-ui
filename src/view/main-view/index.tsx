import { Route, Routes } from "react-router-dom";
import AppNavigation from "../../component/app-component/AppNavigation";
import Dashboard from "../dashobaord";
import "./mainview.css";
import AddSchool from "../school-branch/Schools";

const AppDashboard = () => {
  console.log("AppDashboard :::: ");
  return (
    <AppNavigation>
      <>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/addSchool" element={<AddSchool />} />
        </Routes>
      </>
    </AppNavigation>
  );
};

export default AppDashboard;
