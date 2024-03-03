import Gallery from "./Gallery";
import Home from "./Home";
import Class from "./Class";
import AppNavigation from "./AppNavigation";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./Footer";
import About from "./About";
import Contact from "./Contact";
import Teachers from "./Teachers";
import LoginScreen from "../view/login";
import HeaderFooterDisplay from "../component/HeaderFooterDisplay";
import AppDashboard from "../view/dashboard";
import BlogDetails from "./BlogDetails";

const Dashboard = () => {
  const location = useLocation();

  return (
    <>
      <AppNavigation currentPath={location.pathname}>
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/class" element={<Class />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/blog-details" element={<BlogDetails />} />
            <Route path="/app/">
              <Route path="login" element={<LoginScreen />} />
              <Route path="dash" element={<AppDashboard />} />
            </Route>
            <Route path="*" element={<div>Page Not Found</div>} />
          </Routes>
        </>
        {location && !location.pathname.startsWith("/app/") && <Footer />}
      </AppNavigation>

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
