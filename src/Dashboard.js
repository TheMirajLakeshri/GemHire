import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import pb from "./lib/pocketbase";
import Navbar from "./Navbar";
import "./Login.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const authData = pb.authStore.model;
    console.log(authData)
    if (!authData) {
      navigate("/");
    } else {
      setUser(authData);
    }
  }, [navigate]);


  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <h1>Welcome to your Dashboard: {user.Company_Name}</h1>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
        <p>Owner: {user.Owner}</p>
        <p>Phone No: {user.Phone_No}</p>
        <p>GSTIN: {user.GSTIN}</p>
      </div>
    </>
  );
};

export default Dashboard;
