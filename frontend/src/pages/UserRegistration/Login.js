import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Import Bootstrap CSS
import "./../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

function Login() {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const navigator = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("student id", studentId);
      // Get user data from the backend
      const url = `http://localhost:9090/api/users/`;
      const response = await axios.get(url);
      const userData = response.data;
      console.log("list of users", userData);
      // Find the user with the entered studentId
      const user = userData.find((user) => user.username === studentId);
      if (!user) {
        alert("Invalid student ID");
        return;
      }

      // Compare passwords
      if (password !== user.password) {
        alert("Incorrect password ");
        return;
      } else {
        sessionStorage.setItem("studentId", user.username);
        sessionStorage.setItem("password", user.password);
        sessionStorage.setItem("usrID", user.userId);
        sessionStorage.setItem("allItems", "all");
        console.log("user data loged", user);
        navigator("/products");
      }

      // Successful login
      alert("Login successful");

      // Redirect or perform other actions as needed
    } catch (error) {
      console.error("Error:", error);
      // Handle error, such as displaying an error message to the user
      alert("Failed to login. Please try again later.");
    }
  };

  return (
    <div className="container mt-5 bg">
      <h2 className="text-light">Login</h2>
      <form className="contactForm" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="studentId" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="studentId"
            placeholder="Enter Username"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
        &nbsp;&nbsp;
        <Link className="btn btn-secondary" to="/sign-up">
          Sign Up
        </Link>
      </form>
    </div>
  );
}

export default Login;
