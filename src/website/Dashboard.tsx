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
import ViewEditStudent from "../view/students/ViewEditStudent";
import StudentReport from "../view/students/StudentReports";
import NewReport from "../view/students/NewReport";
import FeesType from "../view/admin/Fees";
import AddFees from "../view/admin/AddNewFees";
import StudentFeeDetails from "../view/students/StudentFee";
import SchoolHolidays from "../view/school-branch/SchoolHolidays";
import AddHoliday from "../view/school-branch/AddNewHoliday";
import AddNewWorksheets from "../view/worksheets/AddNewWorksheets";
import Worksheets from "../view/worksheets/Stydysheets";
import GalleryView from "../view/Gallery/Gallery";
import Gallery from "./Gallery";
import AddImages from "../view/Gallery/AddImages";
import Planner from "../view/admin/Planner";
import AddNewPlans from "../view/admin/AddNewPlans";
import Messages from "../view/Messages/Messages";
import AddNewMessage from "../view/Messages/NewMessage";
import AdminContactUs from "../view/admin/AdminContactUs";
import Calendar from "../view/Calendar/Calender";
import TermsAndCondition from "./TemsConditionPage";
import ExamTimeTable from "../view/admin/ExamTimeTable";

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
            <Route path="/terms" element={<TermsAndCondition />} />
            {/* <Route path="/app" element={<AppDashboard />} /> */}
            <Route path="/app" element={<AppNavigation />}>
              <Route path="dash" element={<AppDashbord />} />
              <Route path="addSchool" element={<AddSchool />} />
              <Route path="schools" element={<Schools />} />
              <Route path="schoolHolidays" element={<SchoolHolidays />} />
              <Route path="addHoliday" element={<AddHoliday />} />
              <Route path="view-edit-school" element={<ViewEditSchool />} />
              <Route path="class" element={<ClassView />} />
              <Route path="addclass" element={<AddClass />} />
              <Route path="staff" element={<Staff />} />
              <Route path="addstaff" element={<AddStaff />} />
              <Route path="view-edit-class" element={<ViewEditClass />} />
              <Route path="view-edit-staff" element={<ViewEditStaff />} />
              <Route path="students" element={<Students />} />
              <Route path="addStudent" element={<AddStudents />} />
              <Route path="view-edit-student" element={<ViewEditStudent />} />
              <Route path="studentReport" element={<StudentReport />} />
              <Route path="studentFee" element={<StudentFeeDetails />} />
              <Route path="newReport" element={<NewReport />} />
              <Route path="year" element={<Year />} />
              <Route path="fees" element={<FeesType />} />
              <Route path="addfees" element={<AddFees />} />
              <Route path="worksheets" element={<Worksheets />} />
              <Route path="addWorksheets" element={<AddNewWorksheets />} />
              <Route path="galleryview" element={<GalleryView />} />
              <Route path="addImages" element={<AddImages />} />
              <Route path="planner" element={<Planner />} />
              <Route path="addPlans" element={<AddNewPlans />} />
              <Route path="messages" element={<Messages />} />
              <Route path="newmessages" element={<AddNewMessage />} />
              <Route path="contact" element={<AdminContactUs />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="exam" element={<ExamTimeTable />} />
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
