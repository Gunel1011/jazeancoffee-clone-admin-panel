import { NavLink } from "react-router-dom";
import pageList from "../constant/pageList";
import logo from "../assets/img/jazeanLogo.png";
const Header = () => {
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
          <div className="login">hauhs</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
