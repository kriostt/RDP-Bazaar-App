// import necessary modules
import React, { useState, useEffect } from "react";
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

  // JSX for product component
  return (
    <div>
      <div className="container mt-4">
        {/* search input */}
        <input
          type="text"
          className="form-control"
          placeholder="Search products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* category dropdown */}
        <select
          className="form-select mt-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All</option>
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
          className="form-select mt-2"
          value={productCondition}
          onChange={(e) => setProductCondition(e.target.value)}
        >
          <option value="">All</option>
          <option value="new">New</option>
          <option value="used-likeNew">Used - Like New</option>
          <option value="used-good">Used - Good</option>
          <option value="used-fair">Used - Fair</option>
        </select>

        {/* price range filter */}
        <div className="input-group mt-2">
          <span className="input-group-text">$</span>
          <input
            type="text"
            className="form-control"
            placeholder="Min Price"
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
            placeholder="Max Price"
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

        {/* clear button */}
        <div className="mt-2 d-flex justify-content-end">
          <button className="btn btn-secondary" onClick={handleClear}>
            Clear
          </button>
        </div>
      </div>

      {/* !!!!!!!!!!!!!!!!!!!!!!!!!! --- PLACEHOLDER FOR PRODUCT CATALOGUE --- !!!!!!!!!!!!!!!!!!!!!!!!!! */}
      {/* title for product component */}
      <h1 className="product">Products</h1>

      {/* map through products and render each one */}
      <div className="product-list text-center">
        {products.map((product) => (
          <div key={product.id} className="product-item">
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
  );
};

// export product component
export default Product;
