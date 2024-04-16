// import necessary modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import "chartjs-adapter-date-fns";
import { Chart as ChartJS } from "chart.js/auto";
import { Doughnut, Line } from "react-chartjs-2";

const Insight = () => {
  // state variables to hold insight data
  const [productCount, setProductCount] = useState(0);
  const [clicksPerProduct, setClicksPerProduct] = useState([]);
  const [totalClicksPerDate, setTotalClicksPerDate] = useState([]);

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

  // function to fetch total clicks per date
  const fetchTotalClicksPerDate = async (userId) => {
    try {
      const response = await axios.get(
        // send a GET request to fetch total clicks per date from backend
        `http://localhost:9090/api/products/totalClicksPerDate/${userId}`
      );

      // update the state with the fetched response
      setTotalClicksPerDate(response.data);
    } catch (error) {
      // handle errors if any occur during fetching
      console.error("Error fetching total clicks per date: ", error);
    }
  };

  // effect hook to fetch data when component mounts
  useEffect(() => {
    // !!! GET USER ID FOR LOGGED IN USER !!!

    const userId = 1; // placeholder for user id
    fetchProductCount(userId);
    fetchClicksPerProduct(userId);
    fetchTotalClicksPerDate(userId);
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

  // data for line chart displaying total clicks per date
  const totalClicksPerDateData = {
    // dates
    labels: totalClicksPerDate.map((data) => data[1]),
    datasets: [
      {
        label: "Clicks",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        // total clicks for each date
        data: totalClicksPerDate.map((data) => data[0]),
      },
    ],
  };

  // JSX for insight component
  return (
    <div className="container" style={{ marginTop: "50px" }}>
      {/* title for insight component */}
      <h1 className="display-4 text-center mb-5">Insights</h1>

      {/* display total products */}
      <p className="lead text-center">Total Products: {productCount}</p>

      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center mb-3">
                Clicks Per Product
              </h3>
              {/* render doughnut chart */}
              <div style={{ maxWidth: "300px", margin: "0 auto" }}>
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

        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center mb-3">
                Total Clicks Per Date
              </h3>
              {/* render line chart */}
              <Line
                data={totalClicksPerDateData}
                options={{
                  scales: {
                    x: {
                      type: "time",
                      time: {
                        unit: "day",
                        displayFormats: {
                          day: "MMM dd",
                        },
                      },
                    },
                    y: {
                      beginAtZero: true,
                    },
                  },
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
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
