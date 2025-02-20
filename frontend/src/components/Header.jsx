import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <div className="main-header">
      <div className="main-header-logo">
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
      <nav className="navbar navbar-header navbar-header-transparent navbar-expand-lg border-bottom">
        <div className="container-fluid">
          <ul className="navbar-nav topbar-nav ms-md-auto align-items-center">
            <li className="nav-item topbar-user dropdown hidden-caret">
              <span className="profile-username">
                {user ? `Hi, ${user.name}` : "Hi, Guest"}
              </span>
            </li>
            <li className="nav-item">
              <button onClick={handleLogout} className="btn btn-link  ms-3">
                <i className="fa fa-sign-out-alt" style={{ fontSize: "1.5rem" }}></i>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
