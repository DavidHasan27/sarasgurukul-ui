import { lazy, Suspense } from "react";
import WebNavigation from "./WebNavigation";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./Footer";
import { APP_URL } from "../utils/constants";

const Home = lazy(() => import("./Home"));
const Class = lazy(() => import("./Class"));
const About = lazy(() => import("./About"));
const Contact = lazy(() => import("./Contact"));
const Teachers = lazy(() => import("./Teachers"));
const LoginScreen = lazy(() => import("../view/login"));
const ForgotPassword = lazy(() => import("../view/login/ForgotPassword"));
const ResetPassword = lazy(() => import("../view/login/ResetPassword"));
const BlogDetails = lazy(() => import("./BlogDetails"));
const AppNavigation = lazy(() => import("../component/app-component/AppNavigation"));
const AppDashbord = lazy(() => import("../view/dashobaord"));
const AddSchool = lazy(() => import("../view/school-branch/AddSchools"));
const Schools = lazy(() => import("../view/school-branch/Schools"));
const ViewEditSchool = lazy(() => import("../view/school-branch/ViewEditSchool"));
const ClassView = lazy(() => import("../view/class/ClassView"));
const AddClass = lazy(() => import("../view/class/AddClass"));
const Staff = lazy(() => import("../view/staff/staff"));
const AddStaff = lazy(() => import("../view/staff/AddStaff"));
const ViewEditClass = lazy(() => import("../view/class/ViewEditClass"));
const ViewEditStaff = lazy(() => import("../view/staff/ViewEditStaff"));
const Students = lazy(() => import("../view/students/students"));
const AddStudents = lazy(() => import("../view/students/AddStudents"));
const Year = lazy(() => import("../view/admin/Years"));
const ViewEditStudent = lazy(() => import("../view/students/ViewEditStudent"));
const StudentReport = lazy(() => import("../view/students/StudentReports"));
const NewReport = lazy(() => import("../view/students/NewReport"));
const FeesType = lazy(() => import("../view/admin/Fees"));
const AddFees = lazy(() => import("../view/admin/AddNewFees"));
const StudentFeeDetails = lazy(() => import("../view/students/StudentFee"));
const SchoolHolidays = lazy(() => import("../view/school-branch/SchoolHolidays"));
const AddHoliday = lazy(() => import("../view/school-branch/AddNewHoliday"));
const AddNewWorksheets = lazy(() => import("../view/worksheets/AddNewWorksheets"));
const Worksheets = lazy(() => import("../view/worksheets/Stydysheets"));
const GalleryView = lazy(() => import("../view/Gallery/Gallery"));
const Gallery = lazy(() => import("./Gallery"));
const AddImages = lazy(() => import("../view/Gallery/AddImages"));
const Planner = lazy(() => import("../view/admin/Planner"));
const AddNewPlans = lazy(() => import("../view/admin/AddNewPlans"));
const Messages = lazy(() => import("../view/Messages/Messages"));
const AddNewMessage = lazy(() => import("../view/Messages/NewMessage"));
const AdminContactUs = lazy(() => import("../view/admin/AdminContactUs"));
const Calendar = lazy(() => import("../view/Calendar/Calender"));
const TermsAndCondition = lazy(() => import("./TemsConditionPage"));
const ExamTimeTable = lazy(() => import("../view/admin/ExamTimeTable"));
const Profile = lazy(() => import("../view/user/Profile"));

function RouteFallback() {
  return (
    <div className="flex min-h-[30vh] w-full items-center justify-center bg-gray-50">
      <div
        className="h-9 w-9 animate-spin rounded-full border-2 border-[#193474] border-t-transparent"
        aria-hidden
      />
    </div>
  );
}

const Dashboard = () => {
  const location = useLocation();
  const showFooter = !APP_URL.includes(location.pathname);

  return (
    <>
      <WebNavigation currentPath={location.pathname}>
        <>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/class" element={<Class />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/teachers" element={<Teachers />} />
              <Route path="/blog-details" element={<BlogDetails />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/terms" element={<TermsAndCondition />} />
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
                <Route path="profile" element={<Profile />} />
              </Route>
              <Route path="*" element={<div>Page Not Found</div>} />
            </Routes>
          </Suspense>
        </>
        {showFooter && <Footer />}
      </WebNavigation>
    </>
  );
};

export default Dashboard;
