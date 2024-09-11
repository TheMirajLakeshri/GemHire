import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ToggleLogin from "./Login"; // Login component
import SignUp from "./Signup"; // Signup component
import Dashboard from "./Dashboard"; // Company Dashboard
import EmployeeDashboard from "./EmployeeDashboard"; // Employee Dashboard

function App() {
  return (
    <Router>
      <Routes>
        {/* Login Page Route */}
        <Route path="/" element={<ToggleLogin />} />

        {/* Signup Page Route */}
        <Route path="/signup" element={<SignUp />} />

        {/* Company Dashboard Page Route */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Employee Dashboard Page Route */}
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
