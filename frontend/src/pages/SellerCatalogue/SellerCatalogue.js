import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StarRating from "../../components/StarRating";
import SearchAndFilterSellers from "../../components/SearchAndFilter/SearchAndFilterSellers";
import useSearchAndFilterSellers from "../../components/SearchAndFilter/useSearchAndFilterSellers";

function SellerCatalogue() {
  const [ratings, setRatings] = useState({});
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");

  // call the custom hook to fetch sellers based on search and filter parameters
  const sellers = useSearchAndFilterSellers(search, sortBy);

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
      userRater: usrid,
      userRated: sellerId,
      rating: ratingVal,
      review: reviews[sellerId],
    };
    console.log("rate value", reviewData);
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
        const rating = await getRating(seller.userId);
        setRatings((prevRatings) => ({
          ...prevRatings,
          [seller.userId]: rating,
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

  //console.log("sellers", sellers);

  const handleSendMessage = (userId, receiverimgurl, firstName) => {
    sessionStorage.setItem("recieverUserId", userId);
    sessionStorage.setItem("recieverimgurl", receiverimgurl);
    sessionStorage.setItem("recieverfirstName", firstName);
    const recieverUserId = sessionStorage.getItem("recieverUserId");
    console.log("user clicked", recieverUserId);
    window.location.assign("/message");
  };

  const handleViewProfile = (userId, receiverimgurl, firstName) => {
    sessionStorage.setItem("recieverUserId", userId);
    sessionStorage.setItem("recieverimgurl", receiverimgurl);
    sessionStorage.setItem("recieverfirstName", firstName);
    sessionStorage.removeItem("allItems", "all");
    const recieverUserId = sessionStorage.getItem("recieverUserId");
    console.log("user clicked", recieverUserId);
    window.location.assign("/seller");
  };

  console.log("current user id logged in", sessionStorage.getItem("usrID"));

  return (
    <>
      <div className="container mt-5">
        <h1>List of Sellers</h1>
      </div>

      <div className="container mt-4 px-md-5">
        <div className="col-md-12">
          {/* container for search and filter */}
          <SearchAndFilterSellers
            search={search}
            setSearch={setSearch}
            sortBy={sortBy}
            setSortBy={setSortBy}
            handleClear={() => {
              setSearch("");
              setSortBy("");
            }}
          />
        </div>

        <div className="col-md-12">
          <div className="seller-list d-flex flex-wrap justify-content-center">
            {sellers.map((seller) => (
              <div key={seller.userId} className="col-md-12 mb-4">
                <div className="card">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={seller.imgurl}
                        alt={seller.firstName}
                        className="card-img-top"
                        style={{ objectFit: "cover", height: "100%" }}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">
                          {seller.firstName + " " + seller.lastName}
                        </h5>
                        <p className="card-text">
                          <b>Rating:</b> {ratings[seller.userId]}
                        </p>
                        <p className="card-text">
                          <b>Phone Number:</b> {seller.phone}
                        </p>
                        {/*  StarRating component  */}
                        <StarRating
                          rating={0}
                          onRatingChange={(rating) =>
                            handleRatingChange(seller.userId, rating)
                          }
                        />
                        <input hidden id={`ratingValue-${seller.userId}`} />
                        <div className="form-group">
                          <label htmlFor={`review-${seller.userId}`}>
                            Write a review:
                          </label>
                          <textarea
                            className="form-control"
                            id={`review-${seller.userId}`}
                            rows="3"
                            value={reviews[seller.userId] || ""}
                            onChange={(e) =>
                              handleReviewChange(seller.userId, e.target.value)
                            }
                          ></textarea>
                          <button
                            className="btn btn-primary mt-3 mb-3"
                            onClick={() => handleSubmitReview(seller.userId)}
                          >
                            Submit Review
                          </button>
                        </div>
                        <div className="col-sm-3">
                          <Link
                            className="nav-link"
                            onClick={() =>
                              handleViewProfile(
                                seller.userId,
                                seller.imgurl,
                                seller.firstName
                              )
                            }
                          >
                            <button className="btn btn-warning mt-3 mb-3">
                              See Profile
                            </button>
                          </Link>
                        </div>
                        <div className="col-sm-3">
                          <Link
                            className="nav-link"
                            onClick={() =>
                              handleSendMessage(
                                seller.userId,
                                seller.imgurl,
                                seller.firstName
                              )
                            }
                          >
                            <button className="btn btn-success mt-3 mb-3">
                              Message
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default SellerCatalogue;
