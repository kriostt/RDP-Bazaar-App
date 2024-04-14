// import necessary modules and external files
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Product from "./pages/Product";
import Seller from "./pages/Seller";
import Insight from "./pages/Insight";
import Chat from "./pages/Chat";
import Notification from "./pages/Notification";
import Profile from "./pages/Profile";

function App() {
  // JSX for app component
  return (
    <Router>
      {/* display navigation bar component */}
      <Navbar />

      {/* define routes for different pages */}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/products" element={<Product />}></Route>
        <Route path="/sellers" element={<Seller />}></Route>
        <Route path="/insights" element={<Insight />}></Route>
        <Route path="/chat" element={<Chat />}></Route>
        <Route path="/notifications" element={<Notification />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
    </Router>
  );
}

// export app component
export default App;
