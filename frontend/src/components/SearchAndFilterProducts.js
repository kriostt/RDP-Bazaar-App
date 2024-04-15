// import necessary modules
import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchAndFilterProducts = () => {
  // initialize state variables
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [condition, setCondition] = useState("");
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [sortBy, setSortBy] = useState("");

  // search and filter products by accessing backend endpoint
  const searchAndFilterProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9090/api/products/searchAndFilter",
        {
          params: { search, condition, minPrice, maxPrice, sortBy },
        }
      );

      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };

  useEffect(() => {
    searchAndFilterProducts();
  }, [search, sortBy]);

  const handleSearch = () => {
    searchAndFilterProducts();
  };

  const handleClear = () => {
    setSearch("");
    setCondition("");
    setMinPrice();
    setMaxPrice();
    setSortBy("");
  };

  // JSX
  return (
    <div className="container mt-4">
      {/* search input */}
      <input
        type="text"
        className="form-control"
        placeholder="Search products"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* condition dropdown */}
      <select
        className="form-select mt-2"
        value={condition}
        onChange={(e) => setCondition(e.target.value)}
      >
        <option value="">All</option>
        <option value="new">New</option>
        <option value="used_likeNew">Used - Like New</option>
        <option value="used_good">Used - Good</option>
        <option value="used_fair">Used - Fair</option>
      </select>

      {/* price range filter */}
      <div className="input-group mt-2">
        <span className="input-group-text">$</span>
        <input
          type="number"
          className="form-control"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />

        <span className="input-group-text">to</span>
        <input
          type="number"
          className="form-control"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      {/* sort by dropdown */}
      <select
        className="form-select mt-2"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="">Sort By</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="datePostedAsc">Date Posted: Old to New</option>
        <option value="datePostedDesc">Date Posted: New to Old</option>
      </select>

      {/* filter and clear buttons */}
      <div className="mt-2">
        <button className="btn btn-primary me-2" onClick={handleSearch}>
          Filter
        </button>
        <button className="btn btn-secondary" onClick={handleClear}>
          Clear
        </button>
      </div>
    </div>
  );
};

export default SearchAndFilterProducts;
