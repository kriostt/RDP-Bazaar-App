// import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import bcrypt from "bcryptjs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

function UserRegistration() {
  const [firstName, setfname] = useState("");
  const [lastName, setlname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphoneNumber] = useState("");
  const [username, setStudId] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [error, setErrors] = useState([]);
  const [img, setImg] = useState(null);
  const navigator = useNavigate();

  const handleImageChange = (e) => {
    // Get the selected file
    const selectedFile = e.target.files[0];
    setImg(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email address");
      return;
    } else {
      console.log(
        firstName +
          " -> " +
          lastName +
          " -> " +
          email +
          " -> " +
          phone +
          " -> " +
          username +
          " -> " +
          password
      );

      //  uploadImage();
      axiosPostData();
    }

    setEmailError("image", img);
  };

  const axiosPostData = async () => {
    try {
      if (img == null) return;
      const imageRef = ref(storage, `images/${img.name + v4()}`);
      uploadBytes(imageRef, img)
        .then(() => getDownloadURL(imageRef))
        .then((url) => {
          // alert("Image Uploaded");
          console.log("the url is-> " + url);
          const postData = {
            username: username,
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            email: email,
            password: password,
            imgurl: url,
          };

          console.log("for insert", postData);
          axios
            .post("http://localhost:9090/api/users/save", postData)
            .then((response) => {
              // Handle successful response
              const generatedId = response.data.userId;
              sessionStorage.setItem("studentId", username);
              sessionStorage.setItem("userId", generatedId);
              console.log("created user", response.data);
              alert("Successfully Signed Up");
              navigator("/seller");
            })
            .catch((error) => {
              // Handle errors
              console.error("Error while posting data:", error);
              setErrors(
                <p className="error">
                  Failed to post data. Please try again later.
                </p>
              );
            });
        });
    } catch (error) {
      // Handle errors
      console.error("Error while posting data:", error);
      setErrors(
        <p className="error">Failed to post data. Please try again later.</p>
      );
    }
  };

  return (
    <div className="container mt-5 bg">
      <h2 className="font-white">Create an Account</h2>
      <form className="contactForm">
        <div className="mb-3">
          <label htmlFor="profileImage" className="form-label">
            Profile Image
          </label>
          <input
            type="file"
            className="form-control"
            id="profileImage"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            value={firstName}
            onChange={(e) => setfname(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            value={lastName}
            onChange={(e) => setlname(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            required
            type="email"
            className={`form-control ${emailError ? "is-invalid" : ""}`}
            id="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone Number
          </label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            value={phone}
            onChange={(e) => setphoneNumber(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setStudId(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error}
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default UserRegistration;
