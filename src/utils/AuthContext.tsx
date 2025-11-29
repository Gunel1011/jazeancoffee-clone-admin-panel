import { createContext, useEffect, useState, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
export const AuthContext = createContext({});

export const Auth = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const path = useLocation();
  const [isUserIn, setIsUserIn] = useState(true);
 
  const chekToken = async () => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setIsUserIn(true);
      if (path.pathname === "/login") {
        navigate("/");
      }
    } else {
      setToken("");
      setIsUserIn(false);
    }
  };
  useEffect(() => {
    if (!token) {
      chekToken();
    }
  }, []);
  const globals = { isUserIn, setIsUserIn };
  return (
    <AuthContext.Provider value={globals}>{children}</AuthContext.Provider>
  );
};
