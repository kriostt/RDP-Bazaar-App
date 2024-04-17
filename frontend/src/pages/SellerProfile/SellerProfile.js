import React, { useEffect } from "react";
import "./../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import axios from "axios";
import bcrypt from "bcryptjs";

import { useState } from "react";

function SellerProfile() {
  const [imgUrl, setImgUrl] = useState();
  const [firstName, setfirstName] = useState();
  const [lastName, setlastName] = useState();
  const [email, setemail] = useState();
  const [phoneNumber, setphoneNumber] = useState();
  const [rating, setrating] = useState();
  const [studentID, setstudentID] = useState();

  const studentId = sessionStorage.getItem("studentId");
  const hashedPassword = sessionStorage.getItem("hashedPassword");
  const usrID = sessionStorage.getItem("usrID");
  console.log("current user id", usrID);
  useEffect(() => {
    if (usrID) {
      // Hash usrID using bcrypt (adjust salt rounds as needed)
      // const saltRounds = 10;
      // bcrypt.hash(usrID, saltRounds, (err, hashedUsrID) => {
      //     if (!err) {
      //         sessionStorage.setItem('hashedUsrID', hashedUsrID);
      //     } else {
      //         console.error('Error hashing usrID:', err);
      //     }
      // });

      // const hashedPassword =   bcrypt.hash(usrID, 10);
      sessionStorage.setItem("hashedUsrID", usrID);
    }
  }, []);

  const hashedUsrID = sessionStorage.getItem("hashedUsrID");
  // const url_messaging = `http://localhost:4000/?hashedUsrID=${encodeURIComponent(hashedUsrID)}`;
  const url_messaging = `/message`;

  console.log("current userid", sessionStorage.getItem("usrID"));

  const url = `http://localhost:9090/api/users/${usrID}`;
  axios
    .get(url)
    .then((response) => {
      const userData = response.data;

      // Access user data based on ID from receivedData

      // console.log("User first name:", userData.fname);
      // console.log("User email:", userData.email);
      // console.log("User ID:", userData.usrID);

      // console.log("image url is->"+imageUrl);
      setImgUrl(userData.imgurl);
      setfirstName(userData.fname);
      setlastName(userData.lname);
      setemail(userData.email);
      setphoneNumber(userData.phone_number);
      setstudentID(userData.studentId);
      setrating("5.0");

      // ... (rest of your code)
    })
    .catch((error) => {
      console.error("API request failed:", error);
    });

  //alert("student ->"+studentId+" hashed password->"+hashedPassword+ " usrID->"+usrID )
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
                <p className="card-text">Username {studentID}</p>
                <p className="card-text">Rating: {rating}</p>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">User Details</h3>
                <p className="card-text">Email: {email}</p>
                <p className="card-text">Phone Number: {phoneNumber}</p>
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
