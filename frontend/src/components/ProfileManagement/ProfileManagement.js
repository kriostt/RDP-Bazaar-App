import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaKey, FaFile } from "react-icons/fa";
import "./ProfileManagement.css";
import axios from "axios";

const ProfileManagement = () => {
  // State variables
  const [errors, setErrors] = useState({}); // State variable for handling form validation errors
  const [profileData, setProfileData] = useState({
    // State for profile data
    username: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  // This effect fetches user data from the server when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data from the server using Axios
        const response = await axios.get(
          `http://localhost:9090/api/users/` + sessionStorage.getItem("usrID")
        );
        // Update the profile data state with the fetched data
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Invoke the fetchUserData function when the component mounts
    fetchUserData();
  }, []);

  // Function to handle input changes in the form fields
  const handleInput = (e) => {
    const { name, value } = e.target;
    setErrors("");
    setProfileData({ ...profileData, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    const nameRegex = /\d/; // Regular expression to check for presence of digits

    if (nameRegex.test(profileData.firstName.trim())) {
      // Checking if name contains digits
      errors.firstName = "This field cannot contain numbers";
    }

    if (nameRegex.test(profileData.lastName.trim())) {
      // Checking if name contains digits
      errors.lastName = "This field cannot contain numbers";
    }

    // Setting errors if any validation fails
    if (Object.keys(errors).length > 0) {
      setErrors(errors); // Setting validation errors
      return; // Exit function if there are validation errors
    }

    try {
      // Send a PUT request to update the user profile data on the server
      await axios.put(
        `http://localhost:9090/api/users/user/` +
          sessionStorage.getItem("usrID"),
        profileData
      );
      // Display a success message if the profile data is updated successfully
      alert("Profile Data Updated Successfully");
    } catch (error) {
      // Log an error message if there's an error updating the profile data
      console.error("Error updating profile data:", error);
    }
  };

  return (
    <div className="profile-management">
      <div className="text-center p-4">
        <div className="flex flex-column justify-content-center align-items-center"></div>
      </div>
      {/* Form for editing profile information */}
      <form onSubmit={handleSubmit}>
        {/* Username */}
        <div className="row mb-4">
          <div className="col-sm-3">
            {/* Label for username */}
            <label className="col-form-label col-form-label-sm me-5">
              Username:
            </label>
          </div>
          <div className="col-sm-9">
            {/* Input for username */}
            <input
              className="form-control form-control-sm"
              type="text"
              id="username"
              name="username"
              value={profileData.username}
              onChange={handleInput}
            />
          </div>
        </div>

        {/* FirstName */}
        <div className="row mb-4">
          <div className="col-sm-3">
            {/* Label for firstname */}
            <label
              className="col-form-label col-form-label-sm me-5"
              style={{ whiteSpace: "nowrap" }}
            >
              First Name:
            </label>
          </div>
          <div className="col-sm-9">
            {/* Container for input field and error message */}
            <div style={{ position: "relative" }}>
              {/* Input for firstname */}
              <input
                className="form-control form-control-sm"
                type="text"
                id="firstName"
                name="firstName"
                value={profileData.firstName}
                onChange={handleInput}
              />
              {/* Error message */}
              {errors.firstName && (
                <span
                  className="text-danger small"
                  style={{
                    position: "absolute",
                    top: "-1.3rem",
                    left: "0.2rem",
                    fontSize: "11px",
                  }}
                >
                  {errors.firstName}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Last Name */}
        <div className="row mb-4">
          <div className="col-sm-3">
            {/* Label for lastname */}
            <label
              className="col-form-label col-form-label-sm me-5"
              style={{ whiteSpace: "nowrap" }}
            >
              Last Name:
            </label>
          </div>
          <div className="col-sm-9">
            {/* Container for input field and error message */}
            <div style={{ position: "relative" }}>
              {/* Input for lastname */}
              <input
                className="form-control form-control-sm"
                type="text"
                id="lastName"
                name="lastName"
                value={profileData.lastName}
                onChange={handleInput}
              />
              {/* Error message */}
              {errors.lastName && (
                <span
                  className="text-danger small"
                  style={{
                    position: "absolute",
                    top: "-1.3rem",
                    left: "0.2rem",
                    fontSize: "11px",
                  }}
                >
                  {errors.lastName}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Phone */}
        <div className="row mb-4">
          <div className="col-sm-3">
            {/* Label for phone */}
            <label className="col-form-label col-form-label-sm me-5">
              Phone:
            </label>
          </div>
          <div className="col-sm-9">
            {/* Input for phone */}
            <input
              className="form-control form-control-sm"
              type="number"
              id="phone"
              name="phone"
              value={profileData.phone}
              onChange={handleInput}
            />
          </div>
        </div>

        {/* Email */}
        <div className="row mb-4">
          <div className="col-sm-3">
            {/* Label for email */}
            <label className="col-form-label col-form-label-sm me-5">
              Email:
            </label>
          </div>
          <div className="col-sm-9">
            {/* Input for email */}
            <input
              className="form-control form-control-sm"
              type="email"
              id="email"
              name="email"
              value={profileData.email}
              onChange={handleInput}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="row" style={{ marginTop: "30px" }}>
          <div className="col-md-6 mb-3">
            <Link
              to="/change-password"
              className="btn btn-outline-secondary btn-sm w-100"
              style={{
                whiteSpace: "nowrap",
                fontSize: "13px",
              }}
            >
              <span className="icon">
                <FaKey />
              </span>
              Change Password
            </Link>
          </div>
          <div className="col-md-6">
            <button
              type="submit"
              className="btn btn-outline-secondary btn-sm w-100"
              style={{ fontSize: "13px" }}
            >
              <span className="icon">
                <FaFile />
              </span>
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileManagement;
