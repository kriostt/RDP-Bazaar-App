// import necessary modules
import { useState, useEffect } from "react";
import axios from "axios";

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
          params: { search, sortBy },
        }
      );

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

  return sellers;
};

// export component
export default useSearchAndFilterSellers;
