import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Dashboard from "./website/Dashboard";
import ReactGA from "react-ga";
import { useAppDispatch } from "./redux/store";
import { getUserDetails } from "./utils";
import { setUserDetails } from "./redux/user_auth/authSlice";

ReactGA.initialize("G-606F4LT5SF");

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const path = window.location.pathname + window.location.search;
    const t = window.setTimeout(() => {
      ReactGA.pageview(path);
    }, 0);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const u = getUserDetails();
    if (u) {
      dispatch(setUserDetails(u));
    }
  }, [dispatch]);

  return (
    <div className="App flex min-h-0 flex-1 flex-col">
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    </div>
  );
}

export default App;
