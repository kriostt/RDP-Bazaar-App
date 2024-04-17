// import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import bcrypt from "bcryptjs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

function UserRegistrationCreationForm() {
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [email, setemail] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [studentId, setStudId] = useState("");
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
      //  // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds

      console.log(
        fname +
          " -> " +
          lname +
          " -> " +
          email +
          " -> " +
          phoneNumber +
          " -> " +
          studentId +
          " -> " +
          password
      );

      //  uploadImage();
      axiosPostData(hashedPassword);
    }

    setEmailError("image", img);
  };

  const axiosPostData = async (hashedPassword) => {
    try {
      if (img == null) return;
      const imageRef = ref(storage, `images/${img.name + v4()}`);
      uploadBytes(imageRef, img)
        .then(() => getDownloadURL(imageRef))
        .then((url) => {
          // alert("Image Uploaded");
          console.log("the url is-> " + url);
          const postData = {
            fname: fname,
            lname: lname,
            email: email,
            phone_number: phoneNumber,
            student_id: studentId,
            password: hashedPassword,
            imgurl: url,
          };

          // axios.post('http://localhost:8080/api/bazaarUsers',postData)
          axios
            .post("http://localhost:9090/api/users/save", postData)
            .then((response) => {
              const generatedId = response.data.userId; 
              // alert("Generated ID:"+ generatedId);
              // Store variables in session storage
              sessionStorage.setItem("studentId", studentId);
              sessionStorage.setItem("hashedPassword", hashedPassword);
              sessionStorage.setItem("userId", generatedId);

              console.log("created user", response.data);

              alert("Successfully Signed Up");
              navigator("/seller");
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
            value={fname}
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
            value={lname}
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
          <label htmlFor="phoneNumber" className="form-label">
            Phone Number
          </label>
          <input
            type="tel"
            className="form-control"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setphoneNumber(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="studentId" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="studentId"
            value={studentId}
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

export default UserRegistrationCreationForm;
