// import necessary modules
import { useState, useEffect } from "react";
import axios from "axios";

// custom hook for searching and filtering products
const useSearchAndFilterProducts = (
  search,
  category,
  productCondition,
  minPrice,
  maxPrice,
  sortBy
) => {
  // state variables to hold product data
  const [products, setProducts] = useState([]);

  // function to fetch products based on search and filter parameters
  const searchAndFilterProducts = async () => {
    try {
      // send a GET request to fetch products from the backend
      const response = await axios.get(
        "http://localhost:9090/api/searchAndFilter/products",
        {
          // pass filter parameters as query parameters
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

  // return the products state variable
  return products;
};

// export component
export default useSearchAndFilterProducts;
