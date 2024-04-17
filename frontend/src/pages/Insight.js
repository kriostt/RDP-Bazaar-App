// import necessary modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import "chartjs-adapter-date-fns";
import { Chart as ChartJS } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

const Insight = () => {
  // state variables to hold insight data
  const [productCount, setProductCount] = useState(0);
  const [clicksPerProduct, setClicksPerProduct] = useState([]);
  const [totalClicks, setTotalClicks] = useState([]);

  // function to fetch product count
  const fetchProductCount = async (userId) => {
    try {
      const response = await axios.get(
        // send a GET request to fetch product count from backend
        `http://localhost:9090/api/products/productCount/${userId}`
      );

      // update the state with the fetched product count
      setProductCount(response.data);
    } catch (error) {
      // handle errors if any occur during fetching
      console.error("Error fetching product count: ", error);
    }
  };

  // function to fetch clicks per product
  const fetchClicksPerProduct = async (userId) => {
    try {
      const response = await axios.get(
        // send a GET request to fetch clicks per product from backend
        `http://localhost:9090/api/products/clicksPerProduct/${userId}`
      );

      // update the state with the fetched response
      setClicksPerProduct(response.data);
    } catch (error) {
      // handle errors if any occur during fetching
      console.error("Error fetching clicks per product: ", error);
    }
  };

  // function to fetch total clicks
  const fetchTotalClicks = async (userId) => {
    try {
      const response = await axios.get(
        // send a GET request to fetch total clicks from backend
        `http://localhost:9090/api/products/totalClicks/${userId}`
      );

      // update the state with the fetched response
      setTotalClicks(response.data);
    } catch (error) {
      // handle errors if any occur during fetching
      console.error("Error fetching total clicks: ", error);
    }
  };

  // effect hook to fetch data when component mounts
  useEffect(() => {
    // !!! GET USER ID FOR LOGGED IN USER !!!

    const userId = 1; // placeholder for user id
    fetchProductCount(userId);
    fetchClicksPerProduct(userId);
    fetchTotalClicks(userId);
  }, []);

  // data for doughnut chart displaying clicks per product
  const clicksPerProductData = {
    // product names
    labels: clicksPerProduct.map((product) => product[1]),
    datasets: [
      {
        label: "Clicks",
        // background colours for each segment
        backgroundColor: [
          "#FF6384", // red
          "#36A2EB", // blue
          "#FFCE56", // yellow
          "#4BC0C0", // cyan
          "#9966FF", // purple
          "#FF9F40", // orange
          "#32CD32", // lime green
          "#FF6347", // tomato
          "#9ACD32", // yellow green
          "#BA55D3", // medium orchid
        ],
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 1,
        borderRadius: 5,
        // number of clicks for each product
        data: clicksPerProduct.map((product) => product[2]),
      },
    ],
  };

  // JSX for insight component
  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ marginTop: "50px", width: "100%" }}
    >
      <div className="text-center">
        {/* title for insight component */}
        <h1 className="display-4 text-center mb-5">Insights</h1>

        {/* display total products */}
        <p className="lead text-center">Total Products: {productCount}</p>

        {/* display total clicks */}
        <p className="lead text-center">Total Clicks: {totalClicks}</p>

        <div className="card" style={{ width: "600px" }}>
          <div className="card-body">
            <h3 className="card-title text-center mb-3">Clicks Per Product</h3>
            {/* render doughnut chart for clicks per product */}
            <div style={{ width: "300px", margin: "0 auto" }}>
              <Doughnut
                data={clicksPerProductData}
                options={{
                  plugins: {
                    legend: {
                      position: "bottom",
                      labels: {
                        boxWidth: 20,
                        fontSize: 12,
                      },
                    },
                  },
                  aspectRatio: 1,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// export insight component
export default Insight;
