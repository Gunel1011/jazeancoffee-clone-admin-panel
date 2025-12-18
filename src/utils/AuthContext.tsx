import { createContext, useEffect, useState, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ProfileService } from "../Modules/Profile/Service/ProfileService";
import type { IUser } from "../Modules/Profile/Models/ProfileModels";

interface IAuthContext {
  isUserIn: boolean;
  setIsUserIn: (value: boolean) => void;
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  logout: () => void;
  refreshProfile: () => Promise<void>;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const Auth = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const path = useLocation();
  const [isUserIn, setIsUserIn] = useState(true);
  const [user, setUser] = useState<IUser | null>(null);

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

  const refreshProfile = async () => {
    try {
      const res = await ProfileService.getUserData();
      setUser(res);
    } catch (error) {
      // Failed to get profile
    }
  };

  useEffect(() => {
    if (!token) {
      chekToken();
    }
  }, []);

  useEffect(() => {
    if (!user && isUserIn) {
      refreshProfile();
    }
  }, [isUserIn]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    setIsUserIn(false);
    navigate("/login");
  };

  const globals = { isUserIn, setIsUserIn, user, setUser, logout, refreshProfile };
  return (
    <AuthContext.Provider value={globals}>{children}</AuthContext.Provider>
  );
};
