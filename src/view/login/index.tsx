import { Typography } from "@material-tailwind/react";
import logo from "../assets/logo.png";
import dashImage from "../assets/dashboard_image.png";
import { Link, useNavigate } from "react-router-dom";
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
      <div className="flex min-h-[100dvh] w-full items-center justify-center bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200 px-4 py-8 sm:py-10">
        {/* Equal-width, equal-height halves on large screens */}
        <div className="grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-2xl border border-gray-200/90 bg-white shadow-[0_12px_40px_-12px_rgba(15,23,42,0.12),0_4px_20px_-4px_rgba(15,23,42,0.08)] ring-1 ring-gray-200/60 lg:grid-cols-2 lg:min-h-[min(640px,88vh)]">
          {/* Left: Image — fills exactly half the card */}
          <div className="relative hidden min-h-0 h-full lg:block">
            <img
              src={dashImage}
              alt="SARA's Gurukul"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#193474]/25 to-transparent" />
          </div>
          {/* Right: Login — same cell size as image half */}
          <div className="flex min-h-[min(520px,75vh)] flex-col justify-center bg-white px-6 py-10 sm:px-10 sm:py-12 lg:min-h-0 lg:border-l lg:border-gray-200/80">
            <div className="mx-auto w-full max-w-md">
              <div className="mb-6 flex flex-col items-center text-center">
                <img
                  src={logo}
                  alt="SARA's Gurukul logo"
                  className="mb-4 h-14 w-auto object-contain drop-shadow-sm sm:h-16"
                />
                <h1 className="font-family-karla text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                  Welcome back
                </h1>
                <p className="mt-2 text-sm text-gray-500">
                  Sign in to continue to your account
                </p>
              </div>
              <div>
              {/* Username */}
              <div className="mb-4">
                <label className="mb-1.5 block text-left text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  autoComplete="username"
                  className="w-full rounded-lg border border-gray-200 bg-gray-50/80 py-2.5 px-3 text-gray-900 shadow-inner shadow-gray-100/50 transition-colors placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Email address"
                  onChange={(event) => setUsername(event.target.value)}
                />
                <Typography
                  className="text-xs text-left text-red-800 font-semibold ml-2"
                  placeholder={"Error"}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {usernameError}
                </Typography>
              </div>
              {/* Password */}
              <div className="mb-4">
                <label className="mb-1.5 block text-left text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  autoComplete="current-password"
                  className="w-full rounded-lg border border-gray-200 bg-gray-50/80 py-2.5 px-3 text-gray-900 shadow-inner shadow-gray-100/50 transition-colors focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Enter password"
                  onChange={(event) => setPassword(event.target.value)}
                />
                <Typography
                  className="text-xs text-left text-red-800 font-semibold ml-2"
                  placeholder={"Error"}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {passwordError}
                </Typography>
              </div>

              <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    name="remember"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500/30"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                    Remember me
                  </label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <button
                type="button"
                className="w-full rounded-lg bg-[#193474] py-2.5 text-sm font-semibold text-white shadow-md shadow-[#193474]/25 transition hover:bg-[#142a5c] focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:ring-offset-2"
                onClick={() => onLogin()}
              >
                Sign in
              </button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </ParentLayout>
  );
};

export default LoginScreen;
