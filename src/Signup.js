import React, { useState } from "react";
import pb from "./lib/pocketbase"; // Ensure you import the configured PocketBase instance
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Signup.css";

const SignUp = () => {
  const [isCompany, setIsCompany] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const toggleLogin = () => {
    setIsCompany(!isCompany);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/"); // Redirect to the login page
  };

  return (
    <div className="toggle-signup-container">
      <div className="card signup-card">
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
          {isCompany ? (
            <CompanySignUpForm
              passwordVisible={passwordVisible}
              confirmPasswordVisible={confirmPasswordVisible}
              togglePasswordVisibility={togglePasswordVisibility}
              toggleConfirmPasswordVisibility={toggleConfirmPasswordVisibility}
              navigate={navigate}
            />
          ) : (
            <EmployeeSignUpForm
              passwordVisible={passwordVisible}
              confirmPasswordVisible={confirmPasswordVisible}
              togglePasswordVisibility={togglePasswordVisibility}
              toggleConfirmPasswordVisibility={toggleConfirmPasswordVisibility}
              navigate={navigate}
            />
          )}
        </div>
        <div className="account-links">
          <div className="account-question">Already have an account?</div>
          <a className="login-link" href="#" onClick={handleLogin}>
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

const CompanySignUpForm = ({
  passwordVisible,
  confirmPasswordVisible,
  togglePasswordVisibility,
  toggleConfirmPasswordVisibility,
  navigate,
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    if (data.password !== data.passwordConfirm) {
      alert("Passwords do not match");
      return;
    }

    const record = {
      "email": data.email,
      "emailVisibility": true,
      "password": data.password,
      "passwordConfirm": data.passwordConfirm,
      "Company_Name": data.companyName,
      "Phone_No": data.phone,
      "GSTIN": data.gstin,
      "Owner": data.owner,
    };

    try {
      await pb.collection('company').create(record);
      navigate("/"); // Redirect to login page after signup
    } catch (err) {
      console.error(err);
      alert("Signup failed");
    }
  };

  return (
    <form className="signup-form-company" onSubmit={handleSubmit(onSubmit)}>
      <h2>Company SignUp</h2>
      <input type="text" placeholder="Company Name" {...register("companyName", { required: true })} />
      <input type="text" placeholder="Phone no" {...register("phone", { required: true })} />
      <input type="text" placeholder="GSTIN" {...register("gstin", { required: true })} />
      <input type="text" placeholder="Owner" {...register("owner", { required: true })} />
      <input type="email" placeholder="Email Id" {...register("email", { required: true })} />
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
      <div className="password-container">
        <input
          type={confirmPasswordVisible ? "text" : "password"}
          placeholder="Confirm Password"
          {...register("passwordConfirm", { required: true })}
        />
        <span className="password-toggle-icon" onClick={toggleConfirmPasswordVisibility}>
          {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

const EmployeeSignUpForm = ({
  passwordVisible,
  confirmPasswordVisible,
  togglePasswordVisibility,
  toggleConfirmPasswordVisibility,
  navigate,
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    if (data.password !== data.passwordConfirm) {
      alert("Passwords do not match");
      return;
    }

    const record = {
      "email": data.email,
      "emailVisibility": true,
      "password": data.password,
      "passwordConfirm": data.passwordConfirm,
      "Name": data.name,
      "DOB": data.dob,
      "Address": data.address,
      "Phone_No": data.phone,
      "Adhaar_No": data.adhaar,
    };

    try {
      await pb.collection('employee').create(record);
      navigate("/"); // Redirect to login page after signup
    } catch (err) {
      console.error(err);
      alert("Signup failed");
    }
  };

  return (
    <form className="signup-form-employee" onSubmit={handleSubmit(onSubmit)}>
      <h2>Employee SignUp</h2>
      <input type="text" placeholder="Name" {...register("name", { required: true })} />
      <input type="date" placeholder="Date of birth" {...register("dob", { required: true })} />
      <input type="text" placeholder="Address" {...register("address", { required: true })} />
      <input type="text" placeholder="Phone no" {...register("phone", { required: true })} />
      <input type="email" placeholder="Email Id" {...register("email", { required: true })} />
      <input type="number" placeholder="Adhaar card no" {...register("adhaar", { required: true })} />
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
      <div className="password-container">
        <input
          type={confirmPasswordVisible ? "text" : "password"}
          placeholder="Confirm Password"
          {...register("passwordConfirm", { required: true })}
        />
        <span className="password-toggle-icon" onClick={toggleConfirmPasswordVisibility}>
          {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SignUp;
