import React, { useState } from 'react';
import './Product.css'; 
import backpackImage from '../images/backpack.png'; 
import speakerImage from '../images/speaker.png'; 
import waterbottleImage from '../images/waterbottle.png'; 
import Cart from '../Products-extension/Cart'; 

import { NotificationManager } from 'react-notifications'; // Import NotificationManager
import { NotificationContainer } from 'react-notifications';

const Product = () => {
  const [cart, setCart] = useState([]);

  const products = [
    { 
      id: 1, 
      name: 'Backpack', 
      description: 'Durable backpack with multiple compartments and padded straps, ideal for carrying books and laptops.', 
      price: 24.99, 
      image: backpackImage 
    },
    { 
      id: 2, 
      name: 'Bluetooth Speaker', 
      description: 'Portable Bluetooth speaker with high-fidelity sound and built-in microphone for hands-free calling.', 
      price: 44.99, 
      image: speakerImage
    },
    { 
      id: 3, 
      name: 'Water Bottle', 
      description: 'Stay hydrated throughout the day with this water bottle.', 
      price: 9.99, 
      image: waterbottleImage
    }
  ];

  const handleAddToCart = (product) => {
    const isItemInCart = cart.some(item => item.id === product.id);
    if (!isItemInCart) {
      setCart([...cart, product]);
      NotificationManager.success(`${product.name} added to cart`, 'Success');
    } else {
      NotificationManager.info(`${product.name} is already in the cart`, 'Info');
    }
  };

  const removeFromCart = (itemToRemove) => {
    setCart(cart.filter(item => item.id !== itemToRemove.id));
  };

  const clearCart = () => {
    setCart([]);
    NotificationManager.info('Cart cleared', 'Info');
  };

  return (
    <div className="product-catalogue">
      <h2 className="page-title">Product Catalogue</h2>
      <div className="additional-content">
        <p>
          Explore our wide range of high-quality products. Find everything you need from durable backpacks to portable Bluetooth speakers and stylish water bottles.
        </p>
      </div>
      <div className="product-list">
        {products.map(product => (
          <div className="product-card" key={product.id}>
            <img 
              src={product.image} 
              alt={product.name} 
              className="product-image" 
            />
            <div className="product-details">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <p className="product-price">Price: ${product.price}</p>
              <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart} removeFromCart={removeFromCart} clearCart={clearCart} />
      </div>
      <NotificationContainer />
    </div>
  );
};

export default Product;