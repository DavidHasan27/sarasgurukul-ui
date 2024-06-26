import React, { useEffect } from "react";
import logo from "./logo.svg";
// import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./website/Home";
import Dashboard from "./website/Dashboard";
import MainPage from "./main";
import ReactGA from "react-ga";
import { useAppDispatch, useAppSelector } from "./redux/store";
import { getUserDetails } from "./utils";
import { setUserDetails } from "./redux/user_auth/authSlice";
ReactGA.initialize("G-606F4LT5SF");

function App() {
  const user = getUserDetails();
  const dispatch = useAppDispatch();
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  useEffect(() => {
    dispatch(setUserDetails(user));
  }, [user]);

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    </div>
  );
}

export default App;
