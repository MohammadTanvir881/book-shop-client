import { TUser, logout, useCurrentToken } from "@/Redux/feature/Auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/Redux/feature/hook";
import { verifyToken } from "@/utils/vertifyToken";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type TProtectedRoute = {
  children: ReactNode;
  role:undefined | string | string[];
};

const PrivateRoute = ({ children, role }: TProtectedRoute) => {
  const token = useAppSelector(useCurrentToken);
  let user;
  if (token) {
    user = verifyToken(token);
  }
  const dispatch = useAppDispatch();
  if (role === undefined && role !== (user as TUser)?.role) {
    dispatch(logout());
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  if (!token) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  return children;
};

export default PrivateRoute;
