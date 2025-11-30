import { Link, NavLink } from "react-router-dom";
import pageList from "../constant/pageList";
import logo from "../assets/img/jazeanLogo.png";
import { FaRegUserCircle } from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "../utils/AuthContext";
import { MdLogout } from "react-icons/md";

const Header = () => {
  const { isUserIn } = useContext(AuthContext);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  return (
    <header className="header">
      <div className="container">
        <div className="row">
          {/* logo  */}
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          {/* navbar  */}
          <nav className="navBar">
            <ul className="navList">
              {pageList
                .filter((page) => page.for_header)
                .map((item) => (
                  <li className="listItem">
                    <NavLink to={item.path}>{item.title}</NavLink>
                  </li>
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
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  <Link to={"/"}>Profile</Link>
                </li>
                <li
                  className="userMenuItem"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  <Link to={"/"}>Setting</Link>
                </li>
                <li
                  className="userMenuItem"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  <Link to={"/"}>
                    Log out
                    <MdLogout />
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <div className="userArea">
              <Link to={"/login"}>
                <FaRegUserCircle className="login" />
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
