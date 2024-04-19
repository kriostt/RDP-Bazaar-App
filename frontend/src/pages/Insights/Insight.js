// import necessary modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chart as ChartJS } from "chart.js/auto"; // needed to render charts
import { Doughnut, Bar } from "react-chartjs-2";

const Insight = () => {
  // state variables to hold insight data
  const [productCount, setProductCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [clicksPerProduct, setClicksPerProduct] = useState([]);
  const [totalClicks, setTotalClicks] = useState(0);
  const [clicksPerCategory, setClicksPerCategory] = useState([]);

  // variable to get the logged in user's id
  const userId = sessionStorage.getItem("usrID");

  // function to fetch product count
  const fetchProductCount = async (userId) => {
    try {
      const response = await axios.get(
        // send a GET request to fetch product count from backend
        `http://localhost:9090/api/insights/productCount/` + userId
      );

      // update the state with the fetched product count
      setProductCount(response.data);
    } catch (error) {
      // handle errors if any occur during fetching
      console.error("Error fetching product count: ", error);
    }
  };

  // function to fetch all products owned by user
  const fetchProducts = async (userId) => {
    try {
      const response = await axios.get(
        // send a GET request to fetch products owned by user from backend
        `http://localhost:9090/api/insights/products/` + userId
      );

      // log the response
      console.log(response);

      // update the state with the fetched products
      setProducts(response.data);
    } catch (error) {
      // handle errors if any occur during fetching
      console.error("Error fetching products owned by user: ", error);
    }
  };

  // function to fetch clicks per product
  const fetchClicksPerProduct = async (userId) => {
    try {
      const response = await axios.get(
        // send a GET request to fetch clicks per product from backend
        `http://localhost:9090/api/insights/clicksPerProduct/` + userId
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
        `http://localhost:9090/api/insights/totalClicks/` + userId
      );

      // update the state with the fetched response
      setTotalClicks(response.data);
    } catch (error) {
      // handle errors if any occur during fetching
      console.error("Error fetching total clicks: ", error);
    }
  };

  // function to fetch total clicks per category
  const fetchClicksPerCategory = async (userId) => {
    try {
      const response = await axios.get(
        // send a GET request to getch clicks per category from backend
        `http://localhost:9090/api/insights/clicksPerCategory/` + userId
      );

      // update the state with the fetched response
      setClicksPerCategory(response.data);
    } catch (error) {
      // handle errors if any occur during fetching
      console.error("Error fetching clicks per category: ", error);
    }
  };

  // effect hook to fetch data when component mounts
  useEffect(() => {
    fetchProductCount(userId);
    fetchProducts(userId);
    fetchClicksPerProduct(userId);
    fetchTotalClicks(userId);
    fetchClicksPerCategory(userId);
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

  // data for bar chart displaying clicks per category
  const clicksPerCategoryData = {
    // category names
    labels: clicksPerCategory.map((category) => category[0]),
    datasets: [
      {
        label: "Clicks",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 1,
        borderRadius: 5,
        // number of clicks per category
        data: clicksPerCategory.map((category) => category[1]),
      },
    ],
  };

  // function to format date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  };

  // JSX for insight component
  return (
    <div className="container mt-5">
      <h1 className="display-4 text-center mb-5">Insights</h1>

      {/* display total products */}
      <p className="lead text-center">Total Products: {productCount}</p>

      <div className="table-responsive mx-3">
        {/* display table of products owned by user */}
        <table className="table table-bordered mb-5">
          {/* table column titles */}
          <thead className="thead-dark">
            <tr>
              <th className="column-header text-center col-1" scope="col">
                #
              </th>
              <th className="column-header text-center col-3" scope="col">
                Name
              </th>
              <th className="column-header text-center col-2" scope="col">
                Price
              </th>
              <th className="column-header text-center col-3" scope="col">
                Category
              </th>
              <th className="column-header text-center col-3" scope="col">
                Date Posted
              </th>
            </tr>
          </thead>

          {/* table rows */}
          <tbody>
            {/* map through products owned by user and display each in table row */}
            {products.map((product, index) => (
              <tr key={product.productId}>
                <td className="text-center">{index + 1}</td>
                <td className="text-center">{product[1]}</td>
                <td className="text-center">${product[2].toFixed(2)}</td>
                <td className="text-center">{product[3]}</td>
                <td className="text-center">{formatDate(product[4])}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* display total clicks */}
      {productCount > 0 ? (
        <p className="lead text-center">Total Clicks: {totalClicks}</p>
      ) : (
        <p className="lead text-center">Total Clicks: N/A</p>
      )}

      {/* row for charts */}
      <div className="row">
        {/* container for doughtnut chart */}
        <div className="col-md-6">
          <div className="card mb-4 mx-3">
            <div className="card-body">
              {/* container title */}
              <h3 className="card-title text-center mb-3">
                Clicks Per Product
              </h3>

              <div
                className="d-flex justify-content-center"
                style={{ height: "300px" }}
              >
                {/* render doughnut chart */}
                {clicksPerProduct.length > 0 ? (
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
                      maintainAspectRatio: false,
                    }}
                  />
                ) : (
                  <p>No products available.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* container for bar chart */}
        <div className="col-md-6">
          <div className="card mb-4 mx-3">
            <div className="card-body">
              {/* container title */}
              <h3 className="card-title text-center mb-3">
                Clicks Per Category
              </h3>

              <div
                className="d-flex justify-content-center"
                style={{ height: "300px" }}
              >
                {/* render bar chart */}
                {clicksPerCategory.length > 0 ? (
                  <Bar
                    data={clicksPerCategoryData}
                    options={{
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
                      scales: {
                        x: {
                          title: {
                            display: true,
                            text: "Categories",
                          },
                        },
                        y: {
                          title: {
                            display: true,
                            text: "Clicks",
                          },
                          ticks: {
                            stepSize: 1,
                          },
                        },
                      },
                      maintainAspectRatio: false,
                    }}
                  />
                ) : (
                  <p>No data available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// export insight component
export default Insight;
