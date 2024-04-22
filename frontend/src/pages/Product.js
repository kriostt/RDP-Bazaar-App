// import necessary modules
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useSearchAndFilterProducts from "../components/SearchAndFilter/useSearchAndFilterProducts";
import SearchAndFilterProducts from "../components/SearchAndFilter/SearchAndFilterProducts";

const Product = () => {
  // state variables to hold product data and filter parameters
  const [products_, setProducts] = useState([]);
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

  let currentUserFilter = "";
  let prodFetchAPI = "";
  let showUploadEditButton = "show";

  if (sessionStorage.getItem("allItems") != null) {
    prodFetchAPI = "http://localhost:9090/api/products/";
    showUploadEditButton = "hidden";
  } else if (sessionStorage.getItem("recieverUserId") == null) {
    currentUserFilter = sessionStorage.getItem("usrID");
    prodFetchAPI = `http://localhost:9090/api/products/by-user/${currentUserFilter}`;
  } else {
    currentUserFilter = sessionStorage.getItem("recieverUserId");
    prodFetchAPI = `http://localhost:9090/api/products/by-user/${currentUserFilter}`;
    showUploadEditButton = "hidden";
  }

  console.log("current user product filter", prodFetchAPI);

  const fetchProductBySeller = async (currentUserFilter) => {
    try {
      const response = await axios.get(
        `http://localhost:9090/api/products/by-user/${currentUserFilter}`
      );

      return response.data; // Extract and return an array of product IDs
    } catch (error) {
      console.error("Error fetching filtered product IDs: ", error);
      return []; // Return empty array if there's an error
    }
  };

  const searchAndFilterProducts = async () => {
    try {
      // Send a GET request to fetch products from the backend
      const response = await axios.get(
        "http://localhost:9090/api/searchAndFilter/products",
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

      // Log the response data received from the backend
      console.log("Response data for search:", response.data);

      // Retrieve product IDs from the response
      const productIds = response.data.map((product) => product.productId);

      // Check if sessionStorage has 'allItems'
      if (sessionStorage.getItem("allItems") == null) {
        // Fetch filtered product IDs using the retrieved currentUserFilter
        const filteredProductIds = await fetchProductBySeller(
          currentUserFilter
        );

        const filteredProducts = [];

        response.data.forEach((product) => {
          // Initialize a flag to track if the product should be included
          let includeProduct = false;

          // Iterate over filteredProductIds to check if the current product's productid exists
          filteredProductIds.forEach((filteredProduct) => {
            if (filteredProduct.productid === product.productid) {
              includeProduct = true;
              // If a match is found, you can break out of the forEach loop
              return;
            }
          });

          // If includeProduct is true, add the product to the filteredProducts array
          if (includeProduct) {
            filteredProducts.push(product);
          }
        });

        console.log("Filtered products:", filteredProducts);

        // Update the state or perform other actions with the filtered products
        setProducts(filteredProducts);

        console.log("Selected a specific seller");
      } else {
        setProducts(response.data);
      }
    } catch (error) {
      // Handle errors if any occur during fetching
      console.error("Error fetching products: ", error);
    }
  };

  // effect hook to execute searchAndFilterProducts function when filter parameters change
  useEffect(() => {
    searchAndFilterProducts();
  }, [search, category, productCondition, minPrice, maxPrice, sortBy]);

  // function to fetch all products
  const fetchProducts = async () => {
    try {
      // send a GET request to fetch products from the backend

      const response = await axios.get(prodFetchAPI);

      console.log("items", products);
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

          <div className="d-grid">
            <Link to="/productForm" className="nav-link">
              <button
                className="btn btn-info mb-3"
                style={{ visibility: showUploadEditButton }}
              >
                Add New Item
              </button>
            </Link>
          </div>
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
                onClick={() => handleClick(product.productid)}
                style={{ cursor: "pointer", width: "500px" }} // dito dapat ma-map through yung products with image na
              >
                <img
                  src={product.imgurl}
                  alt={product.firstName}
                  className="card-img-top"
                  style={{ objectFit: "cover", height: "350px" }}
                />
                <h2>{product.name} -</h2>
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
