import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import "./ChangePassword.css";

const ChangePassword = () => {
  // State variables for old password, new password, confirmed password, error message, and current password
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [currentPassword] = useState("PhoebeandKC"); // Dummy current password for validation
  const [showOldPassword, setShowOldPassword] = useState(false); // State to show/hide old password
  const [showNewPassword, setShowNewPassword] = useState(false); // State to show/hide new password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to show/hide confirm password
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setError(""); // Resetting error message
    if (name === "oldPassword") setOldPassword(value);
    else if (name === "newPassword") setNewPassword(value);
    else if (name === "confirmPassword") setConfirmPassword(value);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if current password field is empty
    if (!oldPassword) {
      setError("Please enter your current password");
      return;
    }

    // Check if entered current password matches current password
    if (oldPassword !== currentPassword) {
      setError("Incorrect current password");
      return;
    }

    // Check if new password field is empty
    if (!newPassword) {
      setError("Please enter a new password");
      return;
    }

    // Check if confirm password field is empty
    if (!confirmPassword) {
      setError("Please confirm your new password");
      return;
    }

    // Check if new passwords match
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    // Additional validation for password complexity
    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[$!@%]).{6,}$/;
    if (!passwordRegex.test(newPassword)) {
      setError(
        "Password must be at least 6 characters and include numbers, letters, and special characters (!$@%)"
      );
      return;
    }

    // If all validations pass, show success message and navigate to edit profile
    alert("Password changed successfully!");
    navigate("/");
  };

  // JSX code for the component
  return (
    <div className="container" style={{ width: "550px" }}>
      {/* Header section with back button and title */}
      <div className="header-container">
        <div className="col-auto">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <FaArrowLeft />
          </button>
        </div>
        <div className="col">
          <h2>Change Password</h2>
        </div>
      </div>
      {/* Information about password requirements */}
      <p>
        Your password must be at least 6 characters and should include a
        combination of numbers, letters and special characters (!$@%).
      </p>
      {/* Display error message if any */}
      {error && <div className="alert alert-danger">{error}</div>}
      {/* Form for changing password */}
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-sm-12">
            <div className="input-with-icon">
              {/* Input field for old password */}
              <input
                type={showOldPassword ? "text" : "password"}
                name="oldPassword"
                value={oldPassword}
                onChange={handleChange}
                className="form-control mb-2"
                placeholder="Current password"
              />
              <span
                className="password-toggle-icon"
                onClick={() => setShowOldPassword(!showOldPassword)}
              >
                {showOldPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-12">
            <div className="input-with-icon">
              {/* Input field for new password */}
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                value={newPassword}
                onChange={handleChange}
                className="form-control mb-2"
                placeholder="New password"
              />
              <span
                className="password-toggle-icon"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-12">
            <div className="input-with-icon">
              {/* Input field for confirming new password */}
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                className="form-control mb-2"
                placeholder="Confirm new password"
              />
              <span
                className="password-toggle-icon"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>
        </div>
        {/* Button for submitting form */}
        <div className="row">
          <div className="col-sm-12 text-center">
            <button type="submit" className="submit-btn">
              Change Password
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
