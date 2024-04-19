// import necessary modules
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productImage from "../../assets/placeholder.png";
import "./ProductDetail.css";

// Functional component for Product Detail
const ProductDetail = () => {
  // Using useParams hook to get the productId from the URL
  const { productId } = useParams();
  // Using useState hook to manage state for product and loading status
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect hook to fetch product data when component mounts or when productId changes
  useEffect(() => {
    // Function to fetch product data asynchronously
    const fetchProduct = async () => {
      try {
        // Fetching product data from the API using productId
        const response = await fetch(
          `http://localhost:9090/api/products/${productId}`
        );
        if (response.ok) {
          // Parsing the JSON response and setting the product state
          const productData = await response.json();
          setProduct(productData);
        } else {
          // Logging an error message if fetching product fails
          console.error("Failed to fetch product");
        }
      } catch (error) {
        // Logging an error message if an error occurs during fetching
        console.error("Error fetching product:", error);
      } finally {
        // Setting loading to false after fetching completes
        setLoading(false);
      }
    };

    // Calling the fetchProduct function
    fetchProduct();
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  // Formatting date using toLocaleDateString
  const formattedDate = new Date(product.datePosted).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  // JSX for ProductDetail component
  return (
    <div className="product-container">
      <div className="container" style={{ width: "700px" }}>
        <div className="product-detail-container">
          <div className="product-detail-image">
            <img src={productImage} alt={product.name} />
          </div>
          <div className="product-detail-info">
            <h2>{product.name}</h2>
            <p className="description">{product.description}</p>
            <div className="details">
              <p className="price" style={{ fontWeight: "bold" }}>
                $
                {product.price.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </p>
              <p className="category">Category: {product.category}</p>
              <p className="category">
                Product Condition: {product.productCondition}
              </p>
              <p className="date">Date Posted: {formattedDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// export ProductDetail component
export default ProductDetail;
