import { Button, Input, Typography } from "@material-tailwind/react";
import logo from "../assets/logo.png";
import dashImage from "../assets/dashboard_image.png";
import { useNavigate } from "react-router-dom";
import { login, resetLoginError } from "../../redux/user_auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useEffect, useState } from "react";
import { isEmailValid } from "../../utils";
import ParentLayout from "../../component/app-component/Parent";

const LoginScreen = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>();
  const [usernameError, setUsernameError] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [passwordError, setPasswordError] = useState<string>();
  const dispatch = useAppDispatch();
  const { loading, user, error } = useAppSelector((state: any) => state.auth);

  console.log("Login Screen :::: ", loading, user, error);

  const onLogin = () => {
    let isErrorFound = false;
    if (!username || !username.trim()) {
      setUsernameError("Please enter username");
      isErrorFound = true;
    } else if (!isEmailValid(username)) {
      setUsernameError("Please enter valid email id");
      isErrorFound = true;
    }
    if (!password || !password.trim()) {
      setPasswordError("Please enter password");
      isErrorFound = true;
    }

    if (isErrorFound) {
      return;
    }

    const body: any = {
      email: username,
      password: password,
    };
    dispatch(login(body));
  };

  useEffect(() => {
    if (user) {
      navigate("/app/dash", { replace: true });
    }
  }, [user]);

  return (
    <ParentLayout
      loading={loading}
      error={error}
      onCloseAlert={() => dispatch(resetLoginError())}
    >
      <div className="h-[100vh] w-[100%] bg-gray-200 flex justify-center items-center">
        <div className="bg-gray-100 flex justify-center items-center h-[80%]">
          {/* <!-- Left: Image --> */}
          <div className="w-1/2 h-[100%] hidden lg:block">
            <img
              src={dashImage}
              alt="Placeholder Image"
              className="object-cover w-full h-full"
            />
          </div>
          {/* <!-- Right: Login Form --> */}
          <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
            <h1 className="text-4xl font-semibold mb-4 font-family-karla">
              Login
            </h1>
            <div>
              {/* <!-- Username Input --> */}
              <div className="mb-4">
                <label className="block text-gray-600 text-left">
                  Username
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                  onChange={(event) => setUsername(event.target.value)}
                />
                <Typography
                  className="text-xs text-left text-red-800 font-semibold ml-2"
                  placeholder={"Error"}
                >
                  {usernameError}
                </Typography>
              </div>
              {/* <!-- Password Input --> */}
              <div className="mb-4">
                <label className="block text-gray-600 text-left">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                  onChange={(event) => setPassword(event.target.value)}
                />
                <Typography
                  className="text-xs text-left text-red-800 font-semibold ml-2"
                  placeholder={"Error"}
                >
                  {passwordError}
                </Typography>
              </div>

              {/* <!-- Remember Me Checkbox --> */}
              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  className="text-blue-500"
                />
                <label className="text-gray-600 ml-2">Remember Me</label>
              </div>
              {/* <!-- Forgot Password Link --> */}
              <div className="mb-6 text-blue-500 text-left">
                <a href="#" className="hover:underline">
                  Forgot Password?
                </a>
              </div>
              {/* <!-- Login Button --> */}
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md py-2 px-4 w-full"
                onClick={() => onLogin()}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </ParentLayout>
  );
};

export default LoginScreen;
