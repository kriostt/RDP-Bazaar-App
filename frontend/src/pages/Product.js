// import necessary modules
import React, { useState, useEffect } from "react";
import axios from "axios";

const Product = () => {
  // state variables to hold product data
  const [products, setProducts] = useState([]);

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

    // increment product clicks
    handleIncrementClicks(productId);
  };

  // JSX for product component
  return (
    <div>
      {/* !!!!!!!!!!!!!!!!!!!!!!!!!! --- PLACEHOLDER FOR PRODUCT CATALOGUE --- !!!!!!!!!!!!!!!!!!!!!!!!!! */}
      {/* title for product component */}
      <h1 className="product">Products</h1>

      {/* map through products and render each one */}
      <div className="product-list text-center">
        {products.map((product) => (
          <div
            key={product.productId}
            className="product-item"
            onClick={() => handleClick(product.productId)}
            style={{ cursor: "pointer" }}
          >
            <h2>{product.name}</h2>
            <p>{product.description}</p>
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
