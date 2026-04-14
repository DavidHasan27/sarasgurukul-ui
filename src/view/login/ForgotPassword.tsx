import { Typography } from "@material-tailwind/react";
import logo from "../assets/logo.png";
import dashImage from "../assets/dashboard_image.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { isEmailValid } from "../../utils";
import ParentLayout from "../../component/app-component/Parent";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  requestForgotPassword,
  resetForgotPasswordState,
} from "../../redux/user_auth/authSlice";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    forgotPasswordLoading,
    forgotPasswordError,
    forgotPasswordSuccessMessage,
  } = useAppSelector((state: any) => state.auth);

  useEffect(() => {
    dispatch(resetForgotPasswordState());
    return () => {
      dispatch(resetForgotPasswordState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (!forgotPasswordSuccessMessage) return;
    const t = window.setTimeout(() => {
      navigate("/login", { replace: true });
    }, 1500);
    return () => clearTimeout(t);
  }, [forgotPasswordSuccessMessage, navigate]);

  const onSendLink = () => {
    if (!email || !email.trim()) {
      setEmailError("Please enter your email");
      return;
    }
    if (!isEmailValid(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    setEmailError(undefined);
    dispatch(requestForgotPassword(email));
  };

  return (
    <ParentLayout
      loading={forgotPasswordLoading}
      error={forgotPasswordError}
      success={forgotPasswordSuccessMessage}
      onCloseAlert={() => dispatch(resetForgotPasswordState())}
      onCloseSuccessAlert={() => dispatch(resetForgotPasswordState())}
    >
      <div className="flex min-h-[100dvh] w-full items-center justify-center bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200 px-4 py-8 sm:py-10">
        <div className="grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-2xl border border-gray-200/90 bg-white shadow-[0_12px_40px_-12px_rgba(15,23,42,0.12),0_4px_20px_-4px_rgba(15,23,42,0.08)] ring-1 ring-gray-200/60 lg:grid-cols-2 lg:min-h-[min(640px,88vh)]">
          <div className="relative hidden min-h-0 h-full lg:block">
            <img
              src={dashImage}
              alt="SARA's Gurukul"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#193474]/25 to-transparent" />
          </div>
          <div className="flex min-h-[min(520px,75vh)] flex-col justify-center bg-white px-6 py-10 sm:px-10 sm:py-12 lg:min-h-0 lg:border-l lg:border-gray-200/80">
            <div className="mx-auto w-full max-w-md">
              <div className="mb-6 flex flex-col items-center text-center">
                <img
                  src={logo}
                  alt="SARA's Gurukul logo"
                  className="mb-4 h-14 w-auto object-contain drop-shadow-sm sm:h-16"
                />
                <h1 className="font-family-karla text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                  Forgot password
                </h1>
                <p className="mt-2 text-sm text-gray-500">
                  Enter your email and we&apos;ll send you a verification link to reset your password
                </p>
              </div>
              <div>
                <div className="mb-4">
                  <label className="mb-1.5 block text-left text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    autoComplete="email"
                    value={email}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50/80 py-2.5 px-3 text-gray-900 shadow-inner shadow-gray-100/50 transition-colors placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    placeholder="Email address"
                    onChange={(event) => {
                      setEmail(event.target.value);
                      if (emailError) setEmailError(undefined);
                    }}
                  />
                  <Typography
                    className="text-xs text-left text-red-800 font-semibold ml-2"
                    placeholder={"Error"}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {emailError}
                  </Typography>
                </div>

                <button
                  type="button"
                  disabled={forgotPasswordLoading}
                  className="mb-3 w-full rounded-lg bg-[#193474] py-2.5 text-sm font-semibold text-white shadow-md shadow-[#193474]/25 transition hover:bg-[#142a5c] focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                  onClick={onSendLink}
                >
                  Send verification link
                </button>

                <Link
                  to="/login"
                  className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-2"
                >
                  Back to login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ParentLayout>
  );
};

export default ForgotPassword;
