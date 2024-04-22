import React, { useEffect } from "react";
import "./../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

import { useState } from "react";

function SellerProfile() {
  const [imgUrl, setImgUrl] = useState();
  const [firstName, setfirstName] = useState();
  const [lastName, setlastName] = useState();
  const [email, setemail] = useState();
  const [phone, setphoneNumber] = useState();
  const [rating, setrating] = useState();
  const [username, setstudentID] = useState();
  const [img, setImg] = useState(null); // State variable to hold the selected image file
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showUploadEditButton, setshowUploadEditButton] = useState("visible");

  const userId = sessionStorage.getItem("usrID");

  if (sessionStorage.getItem("recieverUserId") != null) {
    userId = sessionStorage.getItem("recieverUserId");
    setshowUploadEditButton("hidden");
  }

  console.log("current user id", userId);
  useEffect(() => {
    if (userId) {
      sessionStorage.setItem("hashedUserId", userId);
    }
  }, []);

  const hashedUserId = sessionStorage.getItem("hashedUserId");
  const url_messaging = `/message`;

  // console.log("current userid --", sessionStorage.getItem("usrID"));

  const url = `http://localhost:9090/api/users/${userId}`;
  axios
    .get(url)
    .then((response) => {
      const userData = response.data;

      setImgUrl(userData.imgurl);
      setfirstName(userData.firstName);
      setlastName(userData.lastName);
      setemail(userData.email);
      setphoneNumber(userData.phone);
      setstudentID(userData.username);
      setPassword(userData.password);
      setrating("5.0");
    })
    .catch((error) => {
      console.error("API request failed:", error);
    });

  const handleFileChange = (e) => {
    setImg(e.target.files[0]); // Update the selected image file in state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!img) {
        alert("Please select an image.");
        return;
      }

      const imageRef = ref(storage, `images/${img.name + v4()}`);
      uploadBytes(imageRef, img)
        .then(() => getDownloadURL(imageRef))
        .then((url) => {
          const postData = {
            username: username,
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            email: email,
            password: password,
            imgurl: url,
          };

          axios
            .put(
              `http://localhost:9090/api/users/user/` +
                sessionStorage.getItem("usrID"),
              postData
            )
            .then((response) => {
              console.log("Image URL updated successfully:", url);
              setImgUrl(url); // Update state with the new image URL
              alert("Image updated successfully.");
            })
            .catch((error) => {
              console.error("Failed to update image URL:", error);
              alert("Failed to update image URL. Please try again later.");
            });
        });
    } catch (error) {
      console.error("Error while uploading image:", error);
      alert("Failed to upload image. Please try again later.");
    }
  };

  return (
    <div className="">
      <div className="container mt-5 bg">
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <img
                src={imgUrl}
                alt="Profile"
                className="card-img-top profile-picture"
              />
              <div className="card-body">
                <h5 className="card-title">
                  {firstName} {lastName}
                </h5>
                <p className="card-text">Username: {username}</p>
                <p className="card-text">Rating: {rating}</p>
                <form
                  onSubmit={handleSubmit}
                  style={{ visibility: showUploadEditButton }}
                >
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleFileChange}
                  />
                  <div className="d-flex mt-3">
                    <button type="submit" className="btn btn-primary mt-1">
                      Save Photo
                    </button>
                    <button
                      className="btn btn-secondary mt-1"
                      style={{ marginLeft: "10px" }}
                      onClick={() =>
                        navigate(
                          `/edit-profile/${sessionStorage.getItem("usrID")}`
                        )
                      }
                    >
                      Edit Profile
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-8 mt-3">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">User Details</h3>
                <p className="card-text">Email: {email}</p>
                <p className="card-text">Phone Number: {phone}</p>
              </div>
            </div>
          </div>
          <div className="col-md-8 d-flex "></div>
        </div>
      </div>
    </div>
  );
}

export default SellerProfile;
