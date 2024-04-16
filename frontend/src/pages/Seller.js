// import necessary modules
import React, { useState, useEffect } from "react";
import axios from "axios";

const Seller = () => {
  // state variables to hold seller data and filter parameters
  const [sellers, setSellers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");

  // function to fetch sellers based on search and filter parameters
  const searchAndFilterSellers = async () => {
    try {
      // log the parameters being sent for fetching sellers
      console.log("Fetching sellers with parameters:", {
        search,
        sortBy,
      });

      // send a GET request to fetch sellers from the backend
      const response = await axios.get(
        "http://localhost:9090/api/users/searchAndFilter",
        {
          params: { search, sortBy },
        }
      );

      // log the response data received from the backend
      console.log("Response data:", response.data);

      // update the state with the fetched sellers
      setSellers(response.data);
    } catch (error) {
      // handle errors if any occur during fetching
      console.error("Error fetching sellers: ", error);
    }
  };

  // effect hook to execute searchAndFilterSellers function when filter parameters change
  useEffect(() => {
    searchAndFilterSellers();
  }, [search, sortBy]);

  // function to fetch all sellers
  const fetchSellers = async () => {
    try {
      // send a GET request to fetch sellers from the backend
      const response = await axios.get("http://localhost:9090/api/users/");

      // update the state with the fetched sellers
      setSellers(response.data);
    } catch (error) {
      // handle errors if any occur during fetching
      console.error("Error fetching sellers: ", error);
    }
  };

  // effect hook to fetch all sellers when the component mounts
  useEffect(() => {
    fetchSellers();
  }, []);

  // JSX for seller component
  return (
    <div>
      <div className="container mt-4">
        {/* search input */}
        <input
          type="text"
          className="form-control"
          placeholder="Search sellers"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* sort by dropdown */}
        <select
          className="form-select mt-2"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="usernameAsc">Username: A to Z</option>
          <option value="usernameDesc">Username: Z to A</option>
        </select>
      </div>

      {/* !!!!!!!!!!!!!!!!!!!!!!!!!! --- PLACEHOLDER FOR SELLER CATALOGUE --- !!!!!!!!!!!!!!!!!!!!!!!!!! */}
      {/* title for seller component */}
      <h1 className="seller">Sellers</h1>

      {/* map through sellers and render each one */}
      <div className="seller-list text-center">
        {sellers.map((seller) => (
          <div key={seller.id} className="seller-item">
            <h2>{seller.username}</h2>
            <p>
              {seller.firstName} {seller.lastName}
            </p>
            <p>
              {seller.phone} | {seller.email}
            </p>
            {/* add more details if needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

// export seller component
export default Seller;
