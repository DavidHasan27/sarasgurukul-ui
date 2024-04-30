import { Alert, Spinner } from "@material-tailwind/react";
import { Fragment, useEffect, useState } from "react";
import { useJwt } from "react-jwt";
import ErrorIcon from "./ErrorIcon";
import { getToken } from "../../utils";
import { useLocation } from "react-router-dom";
import SessionExpiredDialog from "./SessionExpireDialog";

const ParentLayout = ({ children, loading, error, onCloseAlert }: any) => {
  const { decodedToken, isExpired } = useJwt(getToken());
  const [sessionExpired, setSessionExpired] = useState(false);
  const location = useLocation();
  console.log("decodedToken", decodedToken, isExpired, location.pathname);

  useEffect(() => {
    if (isExpired) {
      setSessionExpired(true);
    }
  }, [isExpired]);

  return (
    <Fragment>
      {error && (
        <div className="flex  justify-center absolute w-[100%]">
          <Alert
            icon={<ErrorIcon />}
            open={true}
            color="red"
            className="sm:w-[100%] lg:w-[50%]"
            animate={{
              mount: { y: 10 },
              unmount: { y: 100 },
            }}
            onClose={() => onCloseAlert()}
          >
            {error}
          </Alert>
        </div>
      )}
      {loading && (
        <div
          className="absolute h-[100vh] w-[100%] top-0 left-0 flex flex-col items-center justify-center"
          style={{ backgroundColor: "rgb(0,0,0, 0.3)" }}
        >
          <Spinner className="h-10 w-10" color="blue" />
        </div>
      )}

      {children}

      {isExpired && location.pathname !== "/login" && (
        <SessionExpiredDialog
          open={sessionExpired}
          onClose={() => setSessionExpired(false)}
          message={
            decodedToken
              ? "Your Session expired, Please log in again"
              : "Please login with you valid credintial provided by school to enter application"
          }
          title={decodedToken ? "Session Expired" : "Authentication Requred"}
        />
      )}
    </Fragment>
  );
};

export default ParentLayout;
