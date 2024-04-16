import React, { useState, useEffect } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import notificationIcon from '../images/notification-icon.png';

import './Cart.css'; // Import CSS file for styling

const CustomSuccessNotification = ({ message }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      NotificationManager.remove(); // Remove the notification after 1 second
    }, 1000); // Adjust timeout to 1000 milliseconds (1 second)

    return () => clearTimeout(timer); // Clear the timer on component unmount
  }, []);

  return (
    <div className="custom-notification">
      <img src={notificationIcon} alt="Notification" className="notification-icon" />
      {message}
    </div>
  );
};

const Cart = ({ cart, removeFromCart, clearCart }) => {
  const [notifications, setNotifications] = useState([]);
  const [clearNotification, setClearNotification] = useState(false);

  useEffect(() => {
    if (clearNotification) {
      setTimeout(() => {
        setClearNotification(false);
        setNotifications([]);
      }, 2000); // Adjust timeout to 2000 milliseconds (2 seconds)
    }
  }, [clearNotification]);

  const handleRemoveFromCart = (item) => {
    removeFromCart(item);
    const message = `${item.name} removed from cart`;
    addNotification(message, 'red');
    setClearNotification(true);
  };

  const handleClearCart = () => {
    clearCart();
    const message = 'Cart cleared';
    addNotification(message, 'red');
    setClearNotification(true);
  };

  const addNotification = (message, color) => {
    setNotifications([...notifications, { message, color }]);
  };

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      <ul className="cart-items">
        {cart.map(item => (
          <li key={item.id}>
            <div className="cart-item">
              <img src={item.image} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <p>Price: ${item.price}</p>
              </div>
              <button onClick={() => handleRemoveFromCart(item)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      {notifications.length > 0 && (
        <div className="notification-container">
          {notifications.map((notification, index) => (
            <div key={index} className="custom-notification" style={{ background: notification.color }}>
              <img src={notificationIcon} alt="Notification" className="notification-icon" />
              {notification.message}
            </div>
          ))}
        </div>
      )}
      <NotificationContainer />
    </div>
  );
};

export default Cart;
