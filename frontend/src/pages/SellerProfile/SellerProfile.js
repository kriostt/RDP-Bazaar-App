import React, { useEffect } from "react";
import "./../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import axios from "axios";
import bcrypt from "bcryptjs";
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

  const studentId = sessionStorage.getItem("studentId");
  const hashedPassword = sessionStorage.getItem("hashedPassword");
  const userId = sessionStorage.getItem("usrID");
  console.log("current user id", userId);
  useEffect(() => {
    if (userId) {
      // Hash userId using bcrypt (adjust salt rounds as needed)
      // const saltRounds = 10;
      // bcrypt.hash(userId, saltRounds, (err, hasheduserId) => {
      //     if (!err) {
      //         sessionStorage.setItem('hasheduserId', hasheduserId);
      //     } else {
      //         console.error('Error hashing userId:', err);
      //     }
      // });

      // const hashedPassword =   bcrypt.hash(userId, 10);
      sessionStorage.setItem("hashedUserId", userId);
    }
  }, []);

  const hashedUserId = sessionStorage.getItem("hashedUserId");
  // const url_messaging = `http://localhost:4000/?hasheduserId=${encodeURIComponent(hasheduserId)}`;
  const url_messaging = `/message`;

  console.log("current userid --", sessionStorage.getItem("usrID"));

  const url = `http://localhost:9090/api/users/${userId}`;
  axios
    .get(url)
    .then((response) => {
      const userData = response.data;

      // Access user data based on ID from receivedData

      // console.log("User first name:", userData.fname);
      // console.log("User email:", userData.email);
      // console.log("User ID:", userData.userId);

      // console.log("image url is->"+imageUrl);
      setImgUrl(userData.imgurl);
      setfirstName(userData.firstName);
      setlastName(userData.lastName);
      setemail(userData.email);
      setphoneNumber(userData.phone);
      setstudentID(userData.username);
      setPassword(userData.password);
      setrating("5.0");

      // ... (rest of your code)
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
              alert("Image URL updated successfully.");
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

  //alert("student ->"+studentId+" hashed password->"+hashedPassword+ " userId->"+userId )
  // Sample items that the user is selling
  const itemsForSale = [
    {
      id: 1,
      title: "Product 1",
      price: "$20",
      image: require("../../images/tumbler.jpg"), // Replace with the actual URL of the product image
    },
    {
      id: 2,
      title: "Product 2",
      price: "$30",
      image: require("../../images/jacket.jpg"), // Replace with the actual URL of the product image
    },
    {
      id: 3,
      title: "Product 1",
      price: "$20",
      image: require("../../images/book.jpg"), // Replace with the actual URL of the product image
    },
    {
      id: 4,
      title: "Product 2",
      price: "$30",
      image: require("../../images/bag.jpg"), // Replace with the actual URL of the product image
    },
    // Add more items as needed
  ];
  const hi = 123;
  // ... (previous code)

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
                <form onSubmit={handleSubmit}>
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
          <div className="col-md-8 d-flex ">
            {/* <button className="btn btn-primary">                 
                <Link to={url_messaging} className="btn btn-primary">
                   <i className="fas fa-envelope mr-2"></i>&nbsp; Message
                </Link>
            </button> */}
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link to="/myprofile" className="nav-link">
              Items
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/sellersCatalog" className="nav-link">
              Sellers Catalog
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/reviews" className="nav-link">
              Reviews
            </Link>
          </li>
        </ul>
      </div>
      <div className="container mt-5">
        <div className="mt-4">
          <h3>Items for Sale</h3>
          <div className="row">
            {itemsForSale.map((item) => (
              <div key={item.id} className="col-md-4 mb-4">
                <div className="card">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="card-img-top product-image"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">Price: {item.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerProfile;
