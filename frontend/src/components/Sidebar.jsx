import { NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar" data-background-color="dark">
      <div className="sidebar-logo">
        <div className="logo-header" data-background-color="dark">
          <div className="nav-toggle">
            <button className="btn btn-toggle toggle-sidebar">
              <i className="gg-menu-right" />
            </button>
            <button className="btn btn-toggle sidenav-toggler">
              <i className="gg-menu-left" />
            </button>
          </div>
          <button className="topbar-toggler more">
            <i className="gg-more-vertical-alt" />
          </button>
        </div>
      </div>

      <div className="sidebar-wrapper scrollbar scrollbar-inner">
        <div className="sidebar-content">
          <ul className="nav nav-secondary">
            <li
              className={`nav-item ${
                location.pathname === "/admin/dashboard" ? "active" : ""
              }`}
            >
              <NavLink to="/admin/dashboard">
                <i className="fas fa-home" />
                <p>Dashboard</p>
              </NavLink>
            </li>
            <li
              className={`nav-item ${
                location.pathname === "/admin/users" ? "active" : ""
              }`}
            >
              <NavLink to="/admin/users">
                <i className="fas fa-users" />
                <p>Data User</p>
              </NavLink>
            </li>
            <li
              className={`nav-item ${location.pathname === "/admin/cars" ? "active" : ""}`}
            >
              <NavLink to="/admin/cars">
                <i className="fas fa-car" />
                <p>Data Mobil</p>
              </NavLink>
            </li>
            <li
              className={`nav-item ${
                location.pathname === "/admin/rentals" ? "active" : ""
              }`}
            >
              <NavLink to="/admin/rentals">
                <i className="fas fa-receipt" />
                <p>Data Transaksi</p>
              </NavLink>
            </li>
            <li
              className={`nav-item ${
                location.pathname === "/admin/payments" ? "active" : ""
              }`}
            >
              <NavLink to="/admin/payments">
                <i className="fas fa-credit-card" />
                <p>Pembayaran</p>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
