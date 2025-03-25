// EditProduct.js
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
 

  const [product, setProduct] = useState({
    productName: '',
    price: 0,
    category: '',
    brand: '',
    stock: 0,
    description:''
  });
  

  useEffect(() => {

    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(response => setProduct(response.data))
      .catch(error => console.log(error));
  }, []);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('jwtToken');
    if (token) {
      try {
        const data = await axios.put(
          `http://localhost:5000/api/admin/products/${id}`,
          product, // Product data goes here
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        // Assuming 'navigate' is defined and used for navigation
        navigate('/admin/products');
      } catch (error) {
        console.error('Error updating product:', error);
      }
    } else {
      console.error('Token is not valid');
    }
  };
  

  return (
    <div className="container mt-5">
      <h2>Edit Product</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control 
            type="text" 
            name="productName" 
            value={product.productName} 
            onChange={handleChange} 
            required />
        </Form.Group>

        <Form.Group>
          <Form.Label>Price</Form.Label>
          <Form.Control 
            type="number" 
            name="price" 
            value={product.price} 
            onChange={handleChange} 
            required />
        </Form.Group>

        <Form.Group>
          <Form.Label>Category</Form.Label>
          <Form.Control 
            type="text" 
            name="category" 
            value={product.category} 
            onChange={handleChange} 
            required />
        </Form.Group>

        <Form.Group>
          <Form.Label>Brand</Form.Label>
          <Form.Control 
            type="text" 
            name="brand" 
            value={product.brand} 
            onChange={handleChange} 
            required />
        </Form.Group>

        <Form.Group>
          <Form.Label>Count in Stock</Form.Label>
          <Form.Control 
            type="number" 
            name="stock" 
            value={product.stock} 
            onChange={handleChange} 
            required />
        </Form.Group>

        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control 
            as="textarea" 
            name="description" 
            value={product.description} 
            onChange={handleChange} 
            required />
        </Form.Group>

        <div className="d-flex justify-content-center my-4">
        <Button
            variant="primary"
            type="submit"
            style={{
              padding: '10px 20px',
              backgroundColor: '#0f3460',
              color: 'white',
              borderRadius: '7px',
              fontSize: '17px',
              border: 'none',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#06264d')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#0f3460')}
          >
            Update
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EditProduct;
