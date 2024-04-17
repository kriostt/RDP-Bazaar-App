import React, { useState, useEffect } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import notificationIcon from '../images/notification-icon.png';
import './Cart.css'; // Import CSS file for styling

const CustomSuccessNotification = ({ id, message }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      NotificationManager.remove(id); // Remove the notification after 1 second
    }, 1000); // Adjust timeout to 1000 milliseconds (1 second)

    return () => clearTimeout(timer); // Clear the timer on component unmount
  }, [id]);

  return (
    <div className={`custom-notification ${message.includes("added to cart") ? 'success' : ''}`}>
      <img src={notificationIcon} alt="Notification" className="notification-icon" />
      {message}
    </div>
  );
};

const Cart = ({ cart, removeFromCart, clearCart }) => {
  const [notifications, setNotifications] = useState([]);

  const handleRemoveFromCart = (item) => {
    removeFromCart(item);
    const message = `${item.name} removed from cart`;
    addNotification(message, 'red');
  };

  const addNotification = (message, color) => {
    // Check if the message is already in notifications
    const existingNotification = notifications.find(notification => notification.message === message);
    if (!existingNotification) {
      // Add a new notification if it's not a duplicate
      const id = notifications.length + 1; // Generate a unique ID
      setNotifications([...notifications, { id, message, color }]);
    }
  };

  useEffect(() => {
    if (notifications.length > 0) {
      // Clear notifications after 2 seconds
      const timer = setTimeout(() => {
        setNotifications([]);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [notifications]);

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
          {notifications.map(({ id, message }) => (
            <CustomSuccessNotification key={id} id={id} message={message} />
          ))}
        </div>
      )}
      <NotificationContainer />
    </div>
  );
};

export default Cart;
