import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StarRating from "../../components/StarRating";

function SellerCatalogue() {
  const [sellers, setSellers] = useState([]); // Use state to store the seller information
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:9090/api/users/")
      .then((response) => {
        const userList = response.data;
        setSellers(userList); // Update the state with the fetched seller information
      })
      .catch((error) => {
        console.error("API request failed:", error);
      });
  }, []);
  console.log(sellers);

  // ------------------text area for the review-----------------------

  const [reviews, setReviews] = useState({});
  const usrid = sessionStorage.getItem("usrID");

  // Function to handle review submission for a seller
  const handleSubmitReview = (sellerId) => {
    const ratingVal = document.getElementById(`ratingValue-${sellerId}`).value;
    console.log(
      "Review submitted for seller ID:",
      sellerId,
      "Review:",
      reviews[sellerId],
      "Rating",
      ratingVal,
      "rater:",
      usrid,
      "rated:",
      sellerId
    );

    // Preparing the data to send
    const reviewData = {
      usrrater: usrid,
      usrrated: sellerId,
      rating: ratingVal,
      review: reviews[sellerId],
    };

    axios
      .post("http://localhost:9090/api/sellerCatalogue", reviewData)
      .then((response) => {
        console.log("Review submitted successfully:", response.data);
        alert("Review submitted successfully:");
        console.log(document.getElementById(`review-${sellerId}`).value);

        // Clear the textarea after successful submission
        setReviews((prevReviews) => ({
          ...prevReviews,
          [sellerId]: "", // Clear the review for this seller
        }));

        getRating(sellerId)
          .then((updatedRating) => {
            setRatings((prevRatings) => ({
              ...prevRatings,
              [sellerId]: updatedRating,
            }));
          })
          .catch((error) => {
            console.error("Error fetching updated rating:", error);
          });
      })
      .catch((error) => {
        console.error("Error submitting review:", error);
      });
  };

  // Function to handle changes in the review textarea
  const handleReviewChange = (sellerId, value) => {
    setReviews((prevReviews) => ({
      ...prevReviews,
      [sellerId]: value,
    }));
  };

  //start rating

  const handleRatingChange = (sellerId, rating) => {
    console.log("Rating changed for seller ID:", sellerId, "Rating:", rating);
    document.getElementById(`ratingValue-${sellerId}`).value = rating;
  };

  useEffect(() => {
    // Fetch ratings for each seller when sellers state changes
    async function fetchRatings() {
      const ratingPromises = sellers.map(async (seller) => {
        const rating = await getRating(seller.usrid);
        setRatings((prevRatings) => ({
          ...prevRatings,
          [seller.usrid]: rating,
        }));
      });
      await Promise.all(ratingPromises);
    }

    fetchRatings();
  }, [sellers]);

  async function getRating(sellerId) {
    try {
      // Make API call to fetch seller rating
      const response = await fetch(
        `http://localhost:9090/api/sellerCatalogue/searchByRated/${sellerId}`
      );
      const data = await response.json();

      // Calculate sum of ratings
      let sum = 0;
      data.forEach((item) => {
        sum += parseFloat(item.rating);
      });

      // Return average rating
      const averageRating = sum / data.length;
      return averageRating.toFixed(1); // Return rating rounded to 1 decimal place
    } catch (error) {
      console.error("Error fetching rating:", error);
      return "N/A";
    }
  }

  console.log("sellers", sellers);

  return (
    <>
      <div className="container mt-5">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link to="/Seller" className="nav-link">
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
        <h1>List of Sellers</h1>
      </div>
      <div className="container mt-5">
        {sellers.map((seller) => (
          <div key={seller.usrid} className="col-md-12 mb-4">
            <div className="card" style={{ height: "300px" }}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={seller.imgurl}
                    alt={seller.fname}
                    className="card-img-top"
                    style={{ objectFit: "cover", height: "100%" }}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">
                      {seller.fname + " " + seller.lname}
                    </h5>
                    <p className="card-text">
                      <b>Rating:</b> {ratings[seller.usrid]}
                    </p>
                    <p className="card-text">
                      <b>Phone Number:</b> {seller.phone_number}
                    </p>
                    {/*  StarRating component  */}
                    <StarRating
                      rating={0}
                      onRatingChange={(rating) =>
                        handleRatingChange(seller.usrid, rating)
                      }
                    />
                    <input hidden id={`ratingValue-${seller.usrid}`} />
                    <div className="form-group">
                      <label htmlFor={`review-${seller.usrid}`}>
                        Write a review:
                      </label>
                      <textarea
                        className="form-control"
                        id={`review-${seller.usrid}`}
                        rows="3"
                        value={reviews[seller.usrid] || ""}
                        onChange={(e) =>
                          handleReviewChange(seller.usrid, e.target.value)
                        }
                      ></textarea>
                    </div>

                    <button
                      className="btn btn-primary"
                      onClick={() => handleSubmitReview(seller.usrid)}
                    >
                      Submit Review
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default SellerCatalogue;
