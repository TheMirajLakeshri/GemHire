import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import pb from "./lib/pocketbase"; // Import your PocketBase instance
import "./Login.css";

const EmployeeDashboard = () => {
  const [employee, setEmployee] = useState(null);
  const navigate = useNavigate();

  // Fetch employee details from PocketBase after login
  useEffect(() => {
    const authData = pb.authStore.model; // Get the employee details after login
    if (!authData) {
      navigate("/"); // Redirect to login if not authenticated
    } else {
      setEmployee(authData); // Set employee data
    }
  }, [navigate]);

  // Logout function
  const handleLogout = () => {
    pb.authStore.clear(); // Clear authentication
    navigate("/"); // Redirect to login page after logout
  };

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <h1>Welcome to your Employee Dashboard!</h1>
      <p>Employee Name: {employee.username}</p>
      <p>Email: {employee.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default EmployeeDashboard;
