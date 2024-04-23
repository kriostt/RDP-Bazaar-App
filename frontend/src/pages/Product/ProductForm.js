// import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

function ProductForm() {
  const [category, setCategory] = useState("");
  const [productCondition, setProductCondition] = useState("");
  const [name, setProductName] = useState("");
  const [description, setProductDescription] = useState("");
  const [price, setprice] = useState("");

  const [priceError, setpriceError] = useState("");
  const [error, setErrors] = useState([]);
  const [img, setImg] = useState(null);
  const navigator = useNavigate();

  const handleImageChange = (e) => {
    // Get the selected file
    const selectedFile = e.target.files[0];
    setImg(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if the price is a valid number

    console.log(
      "name",
      name,
      "description",
      description,
      "price",
      price,
      "category",
      category,
      "productCondition",
      productCondition,
      "user",
      sessionStorage.getItem("usrID")
    );

    axiosPostData();

    setpriceError("image", img);
  };

  const axiosUpdateData = async (productId, updatedData) => {
    try {
      const response = await axios.put(
        `http://localhost:9090/api/products/update/${productId}`,
        updatedData
      );

      console.log("Updated Product:", response.data);
      // Navigate to the user's page or perform other actions
      navigator("/seller");
    } catch (error) {
      // Handle errors
      console.error("Error while updating data:", error);
      setErrors(
        <p className="error">Failed to update data. Please try again later.</p>
      );
    }
  };

  const axiosPostData = async () => {
    const datePosted = new Date(); // Example Date object
    const formattedDate = datePosted.toISOString(); // Convert Date to ISO string
    try {
      if (img == null) return;

      const imageRef = ref(storage, `images/${img.name + v4()}`);
      uploadBytes(imageRef, img)
        .then(() => getDownloadURL(imageRef))
        .then((url) => {
          const postData = {
            name: name,
            description: description,
            price: price,
            category: category,
            productCondition: productCondition,
            imgurl: url,
            datePosted: formattedDate,
            sellerid: sessionStorage.getItem("usrID"),
            clicks: 0,
            // user: {
            //   userId: sessionStorage.getItem("usrID"),
            // },
          };

          console.log("Data for insert:", postData);

          // Save the new product
          axios
            .post("http://localhost:9090/api/products/save", postData)
            .then((response) => {
              alert("Product Successfully Added");
              const productId = response.data.productid;
              console.log("New product ID:", productId);

              // Prepare updated data for the product
              const updatedProductData = {
                name: name,
                description: description,
                price: price,
                category: category,
                productCondition: productCondition,
                imgurl: url,
                datePosted: formattedDate,
                sellerid: sessionStorage.getItem("usrID"),
                clicks: 0,
                // user: {
                //   userId: sessionStorage.getItem("usrID"),
                // },
              };

              // Call the update function with the product ID and updated data
              axiosUpdateData(productId, updatedProductData);
            })
            .catch((error) => {
              // Handle errors
              console.error("Error while posting data:", error);
              setErrors(
                <p className="error">
                  Failed to post data. Please try again later.
                </p>
              );
            });
        });
    } catch (error) {
      // Handle errors
      console.error("Error while posting data:", error);
      setErrors(
        <p className="error">Failed to post data. Please try again later.</p>
      );
    }
  };

  return (
    <div className="container mt-5 bg">
      <h2 className="font-white">Add Product</h2>
      <form className="contactForm">
        <div className="mb-3">
          <label htmlFor="profileImage" className="form-label">
            Product Image
          </label>
          <input
            type="file"
            className="form-control"
            id="profileImage"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setProductDescription(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            required
            type="number"
            className={`form-control `}
            id="price"
            value={price}
            onChange={(e) => setprice(Number(e.target.value))}
          />
        </div>
        <div className="mb-3">
          {/* category dropdown */}
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            id="category"
            className="form-select mb-3"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="appliances">Appliances</option>
            <option value="clothing">Clothing</option>
            <option value="electronics">Electronics</option>
            <option value="furniture">Furniture</option>
            <option value="miscellaneous">Miscellaneous</option>
            <option value="textbooks">Textbooks</option>
            <option value="vehicles">Vehicles</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Condition
          </label>
          {/* condition dropdown */}
          <select
            className="form-select mb-3"
            id="productCondition"
            value={productCondition}
            onChange={(e) => setProductCondition(e.target.value)}
          >
            <option value="new">New</option>
            <option value="used - like new">Used - Like New</option>
            <option value="used - good">Used - Good</option>
            <option value="used - fair">Used - Fair</option>
          </select>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ProductForm;
