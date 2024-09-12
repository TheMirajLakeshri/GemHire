import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css"; // You can style the navbar using this CSS file
import pb from "./lib/pocketbase"; // Assuming you have PocketBase for authentication

const Navbar = () => {
  const location = useLocation(); // Get the current route
  const navigate = useNavigate(); // For redirection

  const handleLogout = () => {
    pb.authStore.clear(); // Clear the auth store (logout logic)
    navigate("/"); // Redirect to the login page after logging out
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={require("./images/logo.png")} alt="App Logo" />
        </Link>
      </div>
      <ul className="navbar-links">
        {location.pathname === "/signup" ? ( // If on signup page, show sign in link
          <li>
            <Link to="/">Sign In</Link>
          </li>
        ) : location.pathname === "/" || location.pathname === "/login" ? ( // If on login page, show sign up link
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        ) : location.pathname === "/dashboard" ? ( // If on dashboard, show logout button
          <li>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </li>
        ) : null}
      </ul>
    </nav>
  );
};

export default Navbar;
