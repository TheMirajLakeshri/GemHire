import React, { useState, useEffect } from "react";
import pb from "./lib/pocketbase"; // Import PocketBase
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Navbar from "./Navbar";

const ToggleLogin = () => {
  const [isCompany, setIsCompany] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (pb.authStore.isValid) {
      // If user is authenticated, redirect to the dashboard
      navigate("/dashboard");
    }
  }, [navigate]);

  const toggleLogin = () => {
    setIsCompany(!isCompany);
    reset(); // Reset form when toggling
    setErrorMessage("");
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
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage("Invalid companyID or password");
    }
  };

  const onSubmitEmployeeLogin = async (data) => {
    try {
      const authData = await pb.collection("employee").authWithPassword(data.employeeID, data.password);
      navigate("/employee-dashboard");
    } catch (error) {
      setErrorMessage("Invalid employeeID or password");
    }
  };

  // Handle OAuth login with Google
  const handleCompanyGoogleLogin = async () => {
    try {
      const authData = await pb.collection('company').authWithOAuth2({
        provider: 'google',
        redirectUrl: 'http://127.0.0.1:8090/api/oauth2-redirect',
      });
      
      navigate("/dashboard");
    } catch (error) {
      console.error("OAuth login failed:", error);
    }
  };
  const handleEmployeeGoogleLogin = async () => {
    try {
      const authData = await pb.collection('employee').authWithOAuth2({
        provider: 'google',
        redirectUrl: 'http://127.0.0.1:8090/api/oauth2-redirect',
      });
      
      navigate("/employee-dashboard");
    } catch (error) {
      console.error("OAuth login failed:", error);
    }
  };

  return (
    <>
      <Navbar />
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
                errorMessage={errorMessage}
                handleCompanyGoogleLogin={handleCompanyGoogleLogin}
              />
            ) : (
              <EmployeeLoginForm
                handleSubmit={handleSubmit(onSubmitEmployeeLogin)}
                passwordVisible={passwordVisible}
                togglePasswordVisibility={togglePasswordVisibility}
                register={register}
                errorMessage={errorMessage}
                handleEmployeeGoogleLogin={handleEmployeeGoogleLogin}
              />
            )}
          </div>
          <div className="login-options">
            {!showForgotPassword && (
              <a className="forgot-password-link" href="#" onClick={handleForgotPassword}>
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
    </>
  );
};

const CompanyLoginForm = ({ handleSubmit, passwordVisible, togglePasswordVisibility, register, errorMessage, handleCompanyGoogleLogin }) => (
  <form className="login-form-company" onSubmit={handleSubmit}>
    <h2>Company Login</h2>
    <input
      type="text"
      placeholder="Company ID"
      {...register("companyID", { required: true })}
    />
    <div className="password-container">
      <input
        type={passwordVisible ? "text" : "password"}
        placeholder="Password"
        {...register("password", { required: true })}
      />
      <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
        {passwordVisible ? <FaEyeSlash /> : <FaEye />}
      </span>
    </div>
    {errorMessage && <div className="error-message">{errorMessage}</div>}
    <button className="login-button" type="submit">Login</button>
    <div className="google-login">
      <button className="login-with-google-btn" type="button" onClick={handleCompanyGoogleLogin}>Login with Google</button>
    </div>
  </form>
);

const EmployeeLoginForm = ({ handleSubmit, passwordVisible, togglePasswordVisibility, register, errorMessage, handleEmployeeGoogleLogin }) => (
  <form className="login-form-employee" onSubmit={handleSubmit}>
    <h2>Employee Login</h2>
    <input
      type="text"
      placeholder="Employee ID"
      {...register("employeeID", { required: true })}
    />
    <div className="password-container">
      <input
        type={passwordVisible ? "text" : "password"}
        placeholder="Password"
        {...register("password", { required: true })}
      />
      <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
        {passwordVisible ? <FaEyeSlash /> : <FaEye />}
      </span>
    </div>
    {errorMessage && <div className="error-message">{errorMessage}</div>}
    <button className="login-button" type="submit">Login</button>
    <div className="google-login">
      <button className="login-with-google-btn" type="button" onClick={handleEmployeeGoogleLogin}>Login with Google</button> 
    </div>
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
