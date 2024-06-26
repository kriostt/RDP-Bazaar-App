// import necessary modules and external files
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "./components/Navbar";

import Product from "./pages/Product";
import Insight from "./pages/Insights/Insight";
import Notification from "./pages/Notification";
import EditProfile from "./components/ProfileManagement/EditProfile";
import ChangePassword from "./components/ProfileManagement/ChangePassword";
import Login from "./pages/UserRegistration/Login";
import UserRegistration from "./pages/UserRegistration/UserRegistration";
import SellerProfile from "./pages/SellerProfile/SellerProfile";
import Messaging from "./pages/Messaging/Home";
import SellerCatalogue from "./pages/SellerCatalogue/SellerCatalogue";
import ProductDetail from "./pages/ProductDetails/ProductDetail";
import ProductForm from "./pages/Product/ProductForm";

function App() {
  // JSX for app component
  return (
    <Router>
      {/* display navigation bar component */}

      {/* define routes for different pages */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<UserRegistration />} />
        <Route
          path="/products"
          element={
            <>
              <Navbar />
              <Product />
            </>
          }
        />
        <Route
          path="/productForm"
          element={
            <>
              <Navbar />
              <ProductForm />
            </>
          }
        />
        <Route
          path="/product/:productId"
          element={
            <>
              <Navbar />
              <ProductDetail />
            </>
          }
        />
        <Route
          path="/seller"
          element={
            <>
              <Navbar />
              <SellerProfile />
              <Product />
            </>
          }
        />
        <Route
          path="/insights"
          element={
            <>
              <Navbar />
              <Insight />
            </>
          }
        />
        <Route
          path="/message"
          element={
            <>
              <Navbar />
              <Messaging />
            </>
          }
        />
        <Route
          path="/notifications"
          element={
            <>
              <Navbar />
              <Notification />
            </>
          }
        />
        <Route
          path="/edit-profile/:userId"
          element={
            <>
              <Navbar />
              <EditProfile />
            </>
          }
        />
        <Route
          path="/change-password"
          element={
            <>
              <Navbar />
              <ChangePassword />
            </>
          }
        />
        <Route
          path="/sellersCatalog"
          element={
            <>
              <Navbar />
              <SellerCatalogue />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

// export app component
export default App;
