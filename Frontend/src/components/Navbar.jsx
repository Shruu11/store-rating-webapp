import { Link, useNavigate } from "react-router-dom";
import "./style/Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const theme =
    localStorage.getItem("theme") || "dark";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/");
  };

  const toggleTheme = () => {
    const newTheme =
      theme === "dark"
        ? "light"
        : "dark";

    localStorage.setItem(
      "theme",
      newTheme
    );

    document.body.className = newTheme;

    window.location.reload();
  };

  return (
    <nav className="navbar">
      <h2 className="logo">
        ⭐ ReputaStore
      </h2>

      <div className="nav-links">
        {role === "ADMIN" && (
          <>
            <Link to="/admin">Dashboard</Link>
            <Link to="/admin/users">Users</Link>
            <Link to="/admin/stores">Stores</Link>
            <Link to="/admin/create-store">
              Create Store
            </Link>
            <Link to="/admin/create-user">
             Create User
           </Link>
          </>
        )}

        {role === "USER" && (
          <>
            <Link to="/user">Dashboard</Link>
          </>
        )}

        {role === "STORE_OWNER" && (
          <>
            <Link to="/owner">Dashboard</Link>
          </>
        )}
      </div>

      <div className="nav-actions">
        <button
          className="theme-btn"
          onClick={toggleTheme}
        >
          {theme === "dark"
            ? "☀️"
            : "🌙"}
        </button>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      <Link
  to="/update-password"
  className="nav-btn"
>
  Update Password
</Link>
      </div>
    </nav>
  );
}

export default Navbar;