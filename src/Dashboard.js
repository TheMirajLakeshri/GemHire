import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import pb from "./lib/pocketbase"; // Import your PocketBase instance
import "./Login.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch user details from PocketBase after login
  useEffect(() => {
    const authData = pb.authStore.model; // Get the user details after login
    if (!authData) {
      navigate("/"); // Redirect to login if not authenticated
    } else {
      setUser(authData); // Set user data
    }
  }, [navigate]);

  // Logout function
  const handleLogout = () => {
    pb.authStore.clear(); // Clear authentication
    navigate("/"); // Redirect to login page after logout
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <h1>Welcome to your Dashboard !</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
