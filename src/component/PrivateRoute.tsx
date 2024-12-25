import { Route, Navigate } from "react-router-dom";
const PrivateRoute = ({ children }: any) => {
  let auth = { token: false };
  if (!auth.token) {
    return <Navigate to="/login" replace />;
  }

  return children;

  // return (
  //   <Route {...rest}>
  //     {!auth.token ? <Navigate to="/login" replace /> : children}
  //   </Route>
  // );
};

export default PrivateRoute;
