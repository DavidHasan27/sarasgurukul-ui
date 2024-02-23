import Gallery from "./Gallery";
import Home from "./Home";
import Class from "./Class";
import AppNavigation from "./AppNavigation";
import { Route, Routes } from "react-router-dom";
import Footer from "./Footer";
import About from "./About";
import Contact from "./Contact";
import Teachers from "./Teachers";

const Dashboard = () => {
  return (
    <>
      <AppNavigation />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/class" element={<Class />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/teachers" element={<Teachers />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
};

export default Dashboard;
