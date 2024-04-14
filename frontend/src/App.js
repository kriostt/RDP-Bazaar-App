// import necessary modules and external files
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Product from "./pages/Product";
import Seller from "./pages/Seller";
import Insight from "./pages/Insight";
import Chat from "./pages/Chat";
import Notification from "./pages/Notification";
import EditProfile from "./components/ProfileManagement/EditProfile";
import ChangePassword from "./components/ProfileManagement/ChangePassword";

function App() {
  // JSX for app component
  return (
    <Router>
      {/* display navigation bar component */}
      <Navbar />

      {/* define routes for different pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Product />} />
        <Route path="/sellers" element={<Seller />} />
        <Route path="/insights" element={<Insight />} />
        <Route path="/chat" element={<Chat />}></Route>
        <Route path="/notifications" element={<Notification />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/change-password" element={<ChangePassword />} />
      </Routes>
    </Router>
  );
}

// export app component
export default App;
