import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';

const ProductCatalog = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !price || !image) {
      setError('Please fill in all fields');
      return;
    }

    const formData = new FormData();
    formData.append('name', title); // Change 'title' to 'name'
    formData.append('description', description);
    formData.append('price', price);
    formData.append('productimgurl', image); // Change 'image' to 'productimgurl'
    
    try {
      const response = await axios.post('http://localhost:9090/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Add this header for FormData
        },
      });
      console.log('Product added successfully:', response.data);

      setTitle('');
      setDescription('');
      setPrice('');
      setImage(null);
      setError('');
    } catch (error) {
      console.error('Error adding product:', error);
      setError('Error adding product. Please try again.');
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="container">
      <h2>Add New Product</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" value={description} onChange={(e) => setDescription(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="image">
          <Form.Label>Image</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Product
        </Button>
      </Form>
    </div>
  );
};

export default ProductCatalog;
