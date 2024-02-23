import { useEffect, useState } from "react";
import { Routes, useLocation } from "react-router-dom";

const AppNavigation = () => {
  const [activePath, setActivePath] = useState("/");
  const location = useLocation();

  // Get current path
  const path = location.pathname;

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  console.log("active ::", path);
  return (
    <div className="container-fluid bg-light position-relative shadow">
      <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0 px-lg-5">
        <a href="" className="navbar-brand font-weight-bold text-secondary">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              textAlign: "left",
            }}
          >
            <img src="img/Saras-300.png" style={{ height: 80 }}></img>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: 16,
              }}
            >
              <span
                style={{
                  color: "#FA6D2E",
                  fontFamily: "GFS Didot",
                  fontWeight: 700,
                  fontSize: 40,
                  lineHeight: 1,
                }}
              >
                SARA's Gurukul
              </span>
              <span
                style={{
                  color: "#FA6D2E",
                  fontFamily: "GFS Didot",
                  fontSize: 16,
                }}
              >
                Pre-Primary School
              </span>
            </div>
          </div>
        </a>
        <button
          type="button"
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarCollapse"
        >
          <div className="navbar-nav font-weight-bold mx-auto py-0">
            <a
              href="/"
              className={`nav-item nav-link ${
                activePath === "/" ? "active" : ""
              }`}
            >
              Home
            </a>
            <a
              href="/about"
              className={`nav-item nav-link ${
                activePath === "/about" ? "active" : ""
              }`}
            >
              About
            </a>
            <a
              href="/class"
              className={`nav-item nav-link ${
                activePath === "/class" ? "active" : ""
              }`}
            >
              Class
            </a>
            <a
              href="/teachers"
              className={`nav-item nav-link ${
                activePath === "/teachers" ? "active" : ""
              }`}
            >
              Teachers
            </a>
            <a
              href="/gallery"
              className={`nav-item nav-link ${
                activePath === "/gallery" ? "active" : ""
              }`}
            >
              Gallery
            </a>
            <div className="nav-item dropdown">
              <a
                href="#"
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
              >
                Pages
              </a>
              <div className="dropdown-menu rounded-0 m-0">
                <a href="blog.html" className="dropdown-item">
                  Blog Grid
                </a>
                <a href="single.html" className="dropdown-item">
                  Blog Detail
                </a>
              </div>
            </div>
            <a
              href="/contact"
              className={`nav-item nav-link ${
                activePath === "/contact" ? "active" : ""
              }`}
            >
              Contact
            </a>

            <div className="nav-item dropdown">
              <a
                href="#"
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
              >
                Branch
              </a>
              <div className="dropdown-menu rounded-0 m-0">
                <a href="blog.html" className="dropdown-item">
                  Kalewadi
                </a>
                <a href="single.html" className="dropdown-item">
                  Hinjewadi
                </a>
              </div>
            </div>
          </div>
          <a href="" className="btn btn-primary px-4">
            Login
          </a>
        </div>
      </nav>
    </div>
  );
};

export default AppNavigation;
