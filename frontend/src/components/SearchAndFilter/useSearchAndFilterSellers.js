// import necessary modules
import { useState, useEffect } from "react";
import axios from "axios";

// custom hook for searching and filtering sellers
const useSearchAndFilterSellers = (search, sortBy) => {
  // state variables to hold seller data
  const [sellers, setSellers] = useState([]);

  // function to fetch sellers based on search and filter parameters
  const searchAndFilterSellers = async () => {
    try {
      // send a GET request to fetch sellers from the backend
      const response = await axios.get(
        "http://localhost:9090/api/searchAndFilter/users",
        {
          // pass filter parameters as query parameters
          params: { search, sortBy },
        }
      );

      // filter out sellers whose userId matches sessionStorage.getItem("usrID")
      const filteredSellers = response.data.filter(
        (seller) => seller.userId != sessionStorage.getItem("usrID")
      );

      // update the state with the fetched sellers
      setSellers(filteredSellers);
    } catch (error) {
      // handle errors if any occur during fetching
      console.error("Error fetching sellers: ", error);
    }
  };

  // effect hook to execute searchAndFilterSellers function when filter parameters change
  useEffect(() => {
    searchAndFilterSellers();
  }, [search, sortBy]);

  // return the sellers state variable
  return sellers;
};

// export component
export default useSearchAndFilterSellers;
