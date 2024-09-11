import React, { useState } from "react";
import pb from "./lib/pocketbase";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ToggleLogin = () => {
  const [isCompany, setIsCompany] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State to hold the error message

  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const toggleLogin = () => {
    setIsCompany(!isCompany);
    reset();
    setErrorMessage(""); // Reset error message when toggling between forms
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setShowForgotPassword(true);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const onSubmitCompanyLogin = async (data) => {
    try {
      const authData = await pb.collection("company").authWithPassword(data.companyID, data.password);
      console.clear();
      navigate("/dashboard"); // Redirect after successful login
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Invalid companyID or password"); // Set error message
    }
  };

  const onSubmitEmployeeLogin = async (data) => {
    try {
      const authData = await pb.collection("employee").authWithPassword(data.employeeID, data.password);
      console.clear();
      navigate("/employee-dashboard"); // Redirect after successful login
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Invalid employeeID or password"); // Set error message
    }
  };

  return (
    <div className="toggle-login-container">
      <div className="card">
        <div className="logo">
          <img src={require("./images/logo.png")} alt="logo" />
        </div>
        <div className="toggle-switch">
          <label className="switch">
            <input
              type="checkbox"
              checked={!isCompany}
              onChange={toggleLogin}
            />
            <span className="slider">
              <span className="switch-text company-text">Company</span>
              <span className="switch-text employee-text">Employee</span>
            </span>
          </label>
        </div>
        <div className="login-form">
          {showForgotPassword ? (
            <ForgotPasswordForm />
          ) : isCompany ? (
            <CompanyLoginForm
              handleSubmit={handleSubmit(onSubmitCompanyLogin)}
              passwordVisible={passwordVisible}
              togglePasswordVisibility={togglePasswordVisibility}
              register={register}
              errorMessage={errorMessage} // Pass error message as a prop
            />
          ) : (
            <EmployeeLoginForm
              handleSubmit={handleSubmit(onSubmitEmployeeLogin)}
              passwordVisible={passwordVisible}
              togglePasswordVisibility={togglePasswordVisibility}
              register={register}
              errorMessage={errorMessage} // Pass error message as a prop
            />
          )}
        </div>
        <div className="login-options">
          {!showForgotPassword && (
            <a
              className="forgot-password-link"
              href="#"
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </a>
          )}
        </div>
        <div className="account-links">
          <div className="account-question">Don't have an account?</div>
          <a className="signup-link" href="#" onClick={handleSignUp}>
            Signup
          </a>
        </div>
      </div>
    </div>
  );
};

const CompanyLoginForm = ({ handleSubmit, passwordVisible, togglePasswordVisibility, register, errorMessage }) => (
  <form className="login-form-company" onSubmit={handleSubmit}>
    <h2>Company Login</h2>
    <input
      type="text"
      placeholder="Company ID"
      {...register("companyID", { required: true })} required
    />
    <div className="password-container">
      <input
        type={passwordVisible ? "text" : "password"}
        placeholder="Password"
        {...register("password", { required: true })} required
      />
      <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
        {passwordVisible ? <FaEyeSlash /> : <FaEye />}
      </span>
    </div>
    {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Display error message */}
    <button type="submit">Login</button>
  </form>
);

const EmployeeLoginForm = ({ handleSubmit, passwordVisible, togglePasswordVisibility, register, errorMessage }) => (
  <form className="login-form-employee" onSubmit={handleSubmit}>
    <h2>Employee Login</h2>
    <input
      type="text"
      placeholder="Employee ID"
      {...register("employeeID", { required: true })} required
    />
    <div className="password-container">
      <input
        type={passwordVisible ? "text" : "password"}
        placeholder="Password"
        {...register("password", { required: true })} required
      />
      <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
        {passwordVisible ? <FaEyeSlash /> : <FaEye />}
      </span>
    </div>
    {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Display error message */}
    <button type="submit">Login</button>
  </form>
);

const ForgotPasswordForm = () => (
  <form className="forgot-password-form">
    <h2>Reset Password</h2>
    <input type="email" placeholder="Enter your email" />
    <button type="submit">Send Reset Link</button>
  </form>
);

export default ToggleLogin;