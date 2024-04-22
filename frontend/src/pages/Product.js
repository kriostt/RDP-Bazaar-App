// import necessary modules
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useSearchAndFilterProducts from "../components/SearchAndFilter/useSearchAndFilterProducts";
import SearchAndFilterProducts from "../components/SearchAndFilter/SearchAndFilterProducts";

const Product = () => {
  // state variables to hold product data and filter parameters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [productCondition, setProductCondition] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("");

  // hook for navigation
  const navigate = useNavigate();

  // call custom hook to fetch products based on search and filter parameters
  const products = useSearchAndFilterProducts(
    search,
    category,
    productCondition,
    minPrice,
    maxPrice,
    sortBy
  );

  // function to increment clicks for specific product
  const handleIncrementClicks = async (productId) => {
    try {
      const response = await axios.post(
        // send a POST request to increment clicks for specified product
        `http://localhost:9090/api/insights/incrementClicks/${productId}`
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
    <div className="container mt-4 px-4">
      <div className="row">
        <div className="col-lg-3 col-md-4 mb-3 ">
          {/* Search and filter component */}
          <SearchAndFilterProducts
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            productCondition={productCondition}
            setProductCondition={setProductCondition}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            sortBy={sortBy}
            setSortBy={setSortBy}
            handleClear={() => {
              setSearch("");
              setCategory("");
              setProductCondition("");
              setMinPrice("");
              setMaxPrice("");
              setSortBy("");
            }}
          />
        </div>

        {/* container for product catalogue */}
        <div className="col-lg-9 col-md-8">
          {/* !!!!!!!!!!!!!!!!!!!!!!!!!! --- PLACEHOLDER FOR PRODUCT CATALOGUE --- !!!!!!!!!!!!!!!!!!!!!!!!!! */}

          {/* map through products and render each one */}
          <div className="product-list d-flex flex-wrap justify-content-center">
            {products.map((product) => (
              <div
                key={product.productId}
                className="product-item border mb-3 p-3"
                onClick={() => handleClick(product.productId)}
                style={{ cursor: "pointer", width: "300px", margin: "7px" }}
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

// export product component
export default Product;
