import { useContext } from "react";

import { Outlet, Navigate } from "react-router-dom";

import { AuthContext } from "../utils/AuthContext";

const ProtectedRouter = () => {
  const { isUserIn } = useContext(AuthContext) as { isUserIn: boolean };
  return isUserIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRouter;
