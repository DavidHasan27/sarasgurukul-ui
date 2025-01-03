import Gallery from "./Gallery";
import Home from "./Home";
import Class from "./Class";
import WebNavigation from "./WebNavigation";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./Footer";
import About from "./About";
import Contact from "./Contact";
import Teachers from "./Teachers";
import LoginScreen from "../view/login";
import HeaderFooterDisplay from "../component/HeaderFooterDisplay";
import AppDashboard from "../view/main-view";
import AddSchool from "../view/school-branch/AddSchools";
import BlogDetails from "./BlogDetails";
import { APP_URL } from "../utils/constants";
import PrivateRoute from "../component/PrivateRoute";
import AppNavigation from "../component/app-component/AppNavigation";
import AppDashbord from "../view/dashobaord";
import Schools from "../view/school-branch/Schools";
import ViewEditSchool from "../view/school-branch/ViewEditSchool";
import ClassView from "../view/class/ClassView";
import AddClass from "../view/class/AddClass";
import Staff from "../view/staff/staff";
import AddStaff from "../view/staff/AddStaff";
import ViewEditClass from "../view/class/ViewEditClass";
import ViewEditStaff from "../view/staff/ViewEditStaff";
import Students from "../view/students/students";
import AddStudents from "../view/students/AddStudents";
import Year from "../view/admin/Years";

const Dashboard = () => {
  const location = useLocation();
  console.log("location.pathname", location.pathname);

  return (
    <>
      <WebNavigation currentPath={location.pathname}>
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/class" element={<Class />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/blog-details" element={<BlogDetails />} />
            <Route path="/login" element={<LoginScreen />} />
            {/* <Route path="/app" element={<AppDashboard />} /> */}
            <Route path="/app" element={<AppNavigation />}>
              <Route path="dash" element={<AppDashbord />} />
              <Route path="addSchool" element={<AddSchool />} />
              <Route path="schools" element={<Schools />} />
              <Route path="view-edit-school" element={<ViewEditSchool />} />
              <Route path="class" element={<ClassView />} />
              <Route path="addclass" element={<AddClass />} />
              <Route path="staff" element={<Staff />} />
              <Route path="addstaff" element={<AddStaff />} />
              <Route path="view-edit-class" element={<ViewEditClass />} />
              <Route path="view-edit-staff" element={<ViewEditStaff />} />
              <Route path="students" element={<Students />} />
              <Route path="addStudent" element={<AddStudents />} />
              <Route path="year" element={<Year />} />
            </Route>
            <Route path="*" element={<div>Page Not Found</div>} />
          </Routes>
        </>
        {APP_URL.indexOf(location.pathname) === -1 && <Footer />}
      </WebNavigation>

      {/* <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/class" element={<Class />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/app" element={<Navigate to="login" replace />}>
            <Route path="login" element={<LoginScreen />} />
          </Route>
        </Routes>
      </div> */}
      {/* <HeaderFooterDisplay>
        <Footer />
      </HeaderFooterDisplay> */}
    </>
  );
};

export default Dashboard;
