import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./website/Dashboard";
import LoginScreen from "./view/login";
import Gallery from "./website/Gallery";
import Class from "./website/Class";
import About from "./website/About";
import Contact from "./website/Contact";
import Teachers from "./website/Teachers";
import Home from "./website/Home";

const MainPage = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<LoginScreen />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainPage;
