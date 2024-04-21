import axios from "axios";

// function to fetch data from the API
export const fetchData = async (url) => {
  try {
    // send a GET request to backend with specified URL
    const response = await axios.get(url);

    // return the response from the backend
    return response.data;
  } catch (error) {
    // handle errors if any occur during fetching
    console.error("Error fetching data: ", error);
  }
};
