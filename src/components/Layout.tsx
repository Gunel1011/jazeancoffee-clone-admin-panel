import { useState, type ReactNode } from "react";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
interface LayoutProps {
  children: ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleMobileSidebar = () => setMobileOpen(!mobileOpen);
  return (
    <div className="app-layout">
      <button className="mobile-menu-btn" onClick={toggleMobileSidebar}>
        <FaBars />
      </button>
      {!isLoginPage && (
        <>
          <div
            className={`sidebar-overlay ${mobileOpen ? "active" : ""}`}
            onClick={() => setMobileOpen(false)}
            style={{
              display: mobileOpen ? "block" : "none",
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              zIndex: 999,
            }}
          />
          <Sidebar
            isCollapsed={isCollapsed}
            toggleSidebar={() => setIsCollapsed(!isCollapsed)}
            mobileOpen={mobileOpen}
            closeMobileSidebar={() => setMobileOpen(false)}
          />
        </>
      )}
      <div
        className={`main-content ${isCollapsed ? "collapsed" : ""} ${
          isLoginPage ? "login-page" : ""
        }`}
      >
        <main>{children}</main>
        <div className="footer-wrapper">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
