import React, { useState, useEffect } from 'react';
import './product.css';
import { NotificationManager, NotificationContainer } from 'react-notifications';
import notificationIcon from '../images/notification-icon.png';
import Cart from '../Products-extension/Cart';
import axios from 'axios'; // Import Axios for HTTP requests

const Product = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('your-backend-url/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddToCart = (product) => {
    const isItemInCart = cart.some(item => item.id === product.id);
    if (!isItemInCart) {
      setCart([...cart, product]);
      NotificationManager.success(`${product.name} added to cart`, 'Success');
    } else {
      NotificationManager.info(`${product.name} is already in the cart`, 'Info');
    }
  };

  // Implement functions for CRUD operations
  const addProduct = async (newProduct) => {
    try {
      await axios.post('your-backend-url/products', newProduct);
      fetchProducts(); // Refresh products after adding a new one
      NotificationManager.success('Product added successfully', 'Success');
    } catch (error) {
      console.error('Error adding product:', error);
      NotificationManager.error('Failed to add product', 'Error');
    }
  };

  const updateProduct = async (updatedProduct) => {
    try {
      await axios.put(`your-backend-url/products/${updatedProduct.id}`, updatedProduct);
      fetchProducts(); // Refresh products after updating
      NotificationManager.success('Product updated successfully', 'Success');
    } catch (error) {
      console.error('Error updating product:', error);
      NotificationManager.error('Failed to update product', 'Error');
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`your-backend-url/products/${productId}`);
      fetchProducts(); // Refresh products after deleting
      NotificationManager.success('Product deleted successfully', 'Success');
    } catch (error) {
      console.error('Error deleting product:', error);
      NotificationManager.error('Failed to delete product', 'Error');
    }
  };

  return (
    <div className="product-catalogue">
      <h1 className="product">Products</h1>
      <div className="product-list">
        {products.map(product => (
          <div className="product-card" key={product.id}>
            <div className="product-details">
              <h2 className="product-name">{product.name}</h2>
              <p className="product-description">{product.description}</p>
              <p className="product-price">Price: ${product.price}</p>
              <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart} />
      </div>
      <NotificationContainer />
    </div>
  );
};

export default Product;
