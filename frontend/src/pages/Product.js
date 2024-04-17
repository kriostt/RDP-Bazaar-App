// import necessary modules
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Product = () => {
  // state variables to hold product data and filter parameters
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [productCondition, setProductCondition] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("");
  const navigate = useNavigate();

  // function to fetch products based on search and filter parameters
  const searchAndFilterProducts = async () => {
    try {
      // log the parameters being sent for fetching products
      console.log("Fetching products with parameters:", {
        search,
        category,
        productCondition,
        minPrice,
        maxPrice,
        sortBy,
      });

      // send a GET request to fetch products from the backend
      const response = await axios.get(
        "http://localhost:9090/api/products/searchAndFilter",
        {
          params: {
            search,
            category,
            productCondition,
            minPrice,
            maxPrice,
            sortBy,
          },
        }
      );

      // log the response data received from the backend
      console.log("Response data:", response.data);

      // update the state with the fetched products
      setProducts(response.data);
    } catch (error) {
      // handle errors if any occur during fetching
      console.error("Error fetching products: ", error);
    }
  };

  // effect hook to execute searchAndFilterProducts function when filter parameters change
  useEffect(() => {
    searchAndFilterProducts();
  }, [search, category, productCondition, minPrice, maxPrice, sortBy]);

  // function to clear all filter parameters
  const handleClear = () => {
    setSearch("");
    setCategory("");
    setProductCondition("");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("");
  };

  // function to fetch all products
  const fetchProducts = async () => {
    try {
      // send a GET request to fetch products from the backend
      const response = await axios.get("http://localhost:9090/api/products/");

      // update the state with the fetched products
      setProducts(response.data);
    } catch (error) {
      // handle errors if any occur during fetching
      console.error("Error fetching products: ", error);
    }
  };

  // effect hook to fetch all products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // function to increment clicks for specific product
  const handleIncrementClicks = async (productId) => {
    try {
      const response = await axios.post(
        // send a POST request to increment clicks for specified product
        `http://localhost:9090/api/products/incrementClicks/${productId}`
      );

      // log when clicks are successfully incremented
      console.log("Clicks incremented successfully:", response);
    } catch (error) {
      // handle errors if any occur during incrementing clicks
      console.error("Error incrementing clicks: ", error);
    }
  };

  // function to handle click events on product items
  const handleClick = (productId) => {
    // redirect to product details page
    navigate(`/product/${productId}`);

    // increment product clicks
    handleIncrementClicks(productId);
  };

  // JSX for product component
  return (
    <div className="container mt-4">
      <div className="row">
        {/* container for search and filter  */}
        <div className="col-md-2">
          {/* search input */}
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search products"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* category dropdown */}
          <select
            className="form-select mb-3"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="appliances">Appliances</option>
            <option value="clothing">Clothing</option>
            <option value="electronics">Electronics</option>
            <option value="furniture">Furniture</option>
            <option value="miscellaneous">Miscellaneous</option>
            <option value="textbooks">Textbooks</option>
            <option value="vehicles">Vehicles</option>
          </select>

          {/* condition dropdown */}
          <select
            className="form-select mb-3"
            value={productCondition}
            onChange={(e) => setProductCondition(e.target.value)}
          >
            <option value="">All Conditions</option>
            <option value="new">New</option>
            <option value="used - like new">Used - Like New</option>
            <option value="used - good">Used - Good</option>
            <option value="used - fair">Used - Fair</option>
          </select>

          {/* price range filter */}
          <div className="input-group mb-3">
            <span className="input-group-text">$</span>

            <input
              type="text"
              className="form-control"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => {
                // remove any non-digit characters (including -) from the input value
                const value = e.target.value.replace(/[^0-9]/g, "");
                setMinPrice(value);
              }}
            />

            <span className="input-group-text">to</span>

            <input
              type="text"
              className="form-control"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => {
                // remove any non-digit characters (including -) from the input value
                const value = e.target.value.replace(/[^0-9]/g, "");
                setMaxPrice(value);
              }}
            />
          </div>

          {/* sort by dropdown */}
          <select
            className="form-select mb-3"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
            <option value="datePostedAsc">Date Posted: Old to New</option>
            <option value="datePostedDesc">Date Posted: New to Old</option>
          </select>

          {/* clear button */}
          <div className="d-grid">
            <button className="btn btn-secondary" onClick={handleClear}>
              Clear
            </button>
          </div>
        </div>

        {/* container for product catalogue */}
        <div className="col-md-10">
          {/* !!!!!!!!!!!!!!!!!!!!!!!!!! --- PLACEHOLDER FOR PRODUCT CATALOGUE --- !!!!!!!!!!!!!!!!!!!!!!!!!! */}
          {/* title for product component */}
          <h1 className="product">Products</h1>

          {/* map through products and render each one */}
          <div className="product-list d-flex flex-wrap justify-content-center">
            {products.map((product) => (
              <div
                key={product.productId}
                className="product-item border mb-3 p-3"
                onClick={() => handleClick(product.productId)}
                style={{ cursor: "pointer", width: "500px"}}
              >
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>{product.category}</p>
                <p>{product.productCondition}</p>
                <p>Price: {product.price}</p>
                {/* add more details if needed */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;