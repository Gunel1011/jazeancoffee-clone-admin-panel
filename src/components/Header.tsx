import { Link, NavLink } from "react-router-dom";
import pageList from "../constant/pageList";
import logo from "../assets/img/jazeanLogo.png";
import { FaRegUserCircle } from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "../utils/AuthContext";
import { MdLogout } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { CiMenuFries } from "react-icons/ci";


const Header = () => {
  const { t } = useTranslation();
  type AuthContextType = {
    isUserIn: boolean;
    logout: () => void;
  };
  const { isUserIn, logout } = useContext(AuthContext) as AuthContextType;
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="headerTop">
      <div
        className={`overlay ${isMenuOpen ? "activeMenu" : ""}`}
        onClick={() => setIsMenuOpen(false)}
      ></div>
      <div className={`menu ${isMenuOpen ? "activeMenuIcon" : ""}`}>
        <CiMenuFries className="menuIcon" onClick={() => setIsMenuOpen(!isMenuOpen)} />
      </div>
      <header className={`header ${isMenuOpen ? "activeMenu" : ""}`}>
        <div className="container">
          <div className="row">
            {/* logo  */}
            <div className="logo" onClick={() => setIsMenuOpen(false)}>
              <img src={logo} alt="logo" />
            </div>
            {/* navbar  */}
            <nav className="navBar">
              <ul className="navList">
                {pageList
                  .filter((page) => page.for_header)
                  .map((item) => (
                    <ul key={item.id}>
                      <li className="listItem">
                        <NavLink onClick={() => setIsMenuOpen(false)} to={item.path}>{t(`header.${item.id}`)}</NavLink>
                      </li>
                    </ul>
                  ))}
              </ul>
            </nav>
            {/* login  */}
            {isUserIn ? (
              <div className="avatar">
                <FaRegUserCircle
                  className="loginIcon"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                />
                <ul className={`userMenu ${isUserMenuOpen ? "active" : ""}`}>
                  <li
                    className="userMenuItem"
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      setIsMenuOpen(false);

                    }}

                  >
                    <Link to={"/profile"}>{t("header.profile")}</Link>
                  </li>
                  <li
                    className="userMenuItem"
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      setIsMenuOpen(false);
                    }}
                  >
                    <Link to={"/setting"}>{t("header.setting")}</Link>
                  </li>
                  <li
                    className="userMenuItem"
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      if (logout) logout();
                      setIsMenuOpen(false);
                    }}
                  >
                    <button className="logoutBtn" onClick={logout} >
                      {t("header.logout")}
                      <MdLogout onClick={() => setIsMenuOpen(false)} />
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="userArea">
                <Link to={"/login"} onClick={() => setIsMenuOpen(false)}>
                  <FaRegUserCircle className="login" />
                  Log In
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
