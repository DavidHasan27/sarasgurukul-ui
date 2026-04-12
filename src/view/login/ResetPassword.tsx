import { Typography } from "@material-tailwind/react";
import logo from "../assets/logo.png";
import dashImage from "../assets/dashboard_image.png";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ParentLayout from "../../component/app-component/Parent";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  resetResetPasswordState,
  submitResetPassword,
} from "../../redux/user_auth/authSlice";

const MIN_PASSWORD_LEN = 6;

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const tokenFromUrl =
    searchParams.get("token")?.trim() ||
    searchParams.get("resetToken")?.trim() ||
    "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldError, setFieldError] = useState<string>();
  const [done, setDone] = useState(false);

  const dispatch = useAppDispatch();
  const {
    resetPasswordLoading,
    resetPasswordError,
    resetPasswordSuccessMessage,
  } = useAppSelector((state: any) => state.auth);

  useEffect(() => {
    setDone(false);
    dispatch(resetResetPasswordState());
    return () => {
      dispatch(resetResetPasswordState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (resetPasswordSuccessMessage) {
      setDone(true);
    }
  }, [resetPasswordSuccessMessage]);

  const onChangePassword = () => {
    if (!tokenFromUrl) {
      setFieldError("This reset link is missing a token. Use the link from your email.");
      return;
    }
    if (!newPassword.trim()) {
      setFieldError("Please enter a new password");
      return;
    }
    if (newPassword.length < MIN_PASSWORD_LEN) {
      setFieldError(`Password must be at least ${MIN_PASSWORD_LEN} characters`);
      return;
    }
    if (newPassword !== confirmPassword) {
      setFieldError("Passwords do not match");
      return;
    }
    setFieldError(undefined);
    dispatch(
      submitResetPassword({
        resetToken: tokenFromUrl,
        newPassword: newPassword,
      })
    );
  };

  const invalidLink = !tokenFromUrl;

  return (
    <ParentLayout
      loading={resetPasswordLoading}
      error={resetPasswordError}
      success={resetPasswordSuccessMessage}
      onCloseAlert={() => dispatch(resetResetPasswordState())}
      onCloseSuccessAlert={() => dispatch(resetResetPasswordState())}
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
                  Reset password
                </h1>
                <p className="mt-2 text-sm text-gray-500">
                  Choose a new password for your account
                </p>
              </div>

              {done ? (
                <div className="text-center">
                  <p className="mb-6 text-sm text-gray-600">
                    Your password has been updated. You can sign in with your new
                    password.
                  </p>
                  <Link
                    to="/login"
                    className="inline-flex w-full items-center justify-center rounded-lg bg-[#193474] py-2.5 text-sm font-semibold text-white shadow-md shadow-[#193474]/25 transition hover:bg-[#142a5c] focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:ring-offset-2"
                  >
                    Back to login
                  </Link>
                </div>
              ) : (
                <div>
                  {invalidLink && (
                    <p className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-left text-sm text-amber-900">
                      This reset link is invalid or incomplete. Open the link from
                      your email or request a new one from Forgot password.
                    </p>
                  )}

                  <div className="mb-4">
                    <label className="mb-1.5 block text-left text-sm font-medium text-gray-700">
                      New password
                    </label>
                    <input
                      type="password"
                      autoComplete="new-password"
                      value={newPassword}
                      disabled={invalidLink}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50/80 py-2.5 px-3 text-gray-900 shadow-inner shadow-gray-100/50 transition-colors placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                      placeholder="New password"
                      onChange={(event) => {
                        setNewPassword(event.target.value);
                        if (fieldError) setFieldError(undefined);
                      }}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="mb-1.5 block text-left text-sm font-medium text-gray-700">
                      Confirm password
                    </label>
                    <input
                      type="password"
                      autoComplete="new-password"
                      value={confirmPassword}
                      disabled={invalidLink}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50/80 py-2.5 px-3 text-gray-900 shadow-inner shadow-gray-100/50 transition-colors placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                      placeholder="Confirm new password"
                      onChange={(event) => {
                        setConfirmPassword(event.target.value);
                        if (fieldError) setFieldError(undefined);
                      }}
                    />
                    <Typography
                      className="text-xs text-left text-red-800 font-semibold ml-2 mt-1"
                      placeholder={"Error"}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      {fieldError}
                    </Typography>
                  </div>

                  <button
                    type="button"
                    disabled={resetPasswordLoading || invalidLink}
                    className="mb-3 w-full rounded-lg bg-[#193474] py-2.5 text-sm font-semibold text-white shadow-md shadow-[#193474]/25 transition hover:bg-[#142a5c] focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                    onClick={onChangePassword}
                  >
                    Change password
                  </button>

                  <Link
                    to="/login"
                    className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-2"
                  >
                    Back to login
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ParentLayout>
  );
};

export default ResetPassword;
