import { NavLink, Link } from "react-router-dom";
import pageList from "../constant/pageList";
import logo from "../assets/img/jazeanLogo.png";
import { useTranslation } from "react-i18next";
import { FaRegUserCircle, FaSignOutAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../utils/AuthContext";

interface SidebarProps {
    isCollapsed: boolean;
    toggleSidebar: () => void;
    mobileOpen?: boolean;
    closeMobileSidebar?: () => void;
}

const Sidebar = ({ isCollapsed, toggleSidebar, mobileOpen, closeMobileSidebar }: SidebarProps) => {
    const { t } = useTranslation();
    const { isUserIn, logout } = useContext(AuthContext);

    return (
        <div className={`sidebar ${isCollapsed ? "collapsed" : ""} ${mobileOpen ? "active" : ""}`}>
            <button className="toggle-btn" onClick={toggleSidebar}>
                {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
            </button>

            <div className="logo">
                <img src={logo} alt="Jazean Coffee" />
            </div>

            <nav className="navList">
                {pageList
                    .filter((page) => page.for_header)
                    .map((item) => (
                        <div key={item.id} className="listItem">
                            <NavLink
                                to={item.path}
                                className={({ isActive }) => isActive ? "active" : ""}
                                title={t(`header.${item.id}`)}
                                onClick={closeMobileSidebar}
                            >
                                {!isCollapsed && <span>{t(`header.${item.id}`)}</span>}
                                {isCollapsed && <span className="collapsed-text">{t(`header.${item.id}`).charAt(0)}</span>}
                            </NavLink>
                        </div>
                    ))}
            </nav>

            <div className="userArea">
                {isUserIn ? (
                    <div className="userProfile" onClick={logout} title={t("header.logout")}>
                        <FaSignOutAlt className="avatar-icon" />
                        {!isCollapsed && <span>{t("header.logout")}</span>}
                    </div>
                ) : (
                    <Link to="/login" className="userProfile" title="Log In">
                        <FaRegUserCircle className="avatar-icon" />
                        {!isCollapsed && <span>Log In</span>}
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
