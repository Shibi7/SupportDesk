import { Navigate, Outlet } from "react-router-dom";
import Spinner from "./Spinner";
import { useEmpStatus } from "../hooks/useEmpStatus";

const EmpPrivateRoute = () => {
  const { loggedIn, checkingStatus } = useEmpStatus();

  if (checkingStatus) {
    return <Spinner />;
  }

  return loggedIn ? <Outlet /> : <Navigate to="/emp/login" />;
};

export default EmpPrivateRoute;
