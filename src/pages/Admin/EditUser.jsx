// EditProduct.js
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
 

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  });
  

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
    axios.get(`http://localhost:5000/api/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => setUser(response.data))
      .catch(error => console.log(error));

    }else {
        console.error('Token is not valid');
        navigate('/login');
      }
  }, []);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('jwtToken');
    if (token) {
      try {
        const data = await axios.put(
          `http://localhost:5000/api/admin/users/${id}`,
          user, 
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        navigate('/admin/users');
      } catch (error) {
        console.error('Error updating product:', error);
      }
    } else {
      console.error('Token is not valid');
      navigate('/login');
    }
  };
  

  return (
    <div className="container mt-5">
      <h2>Edit User</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control 
            type="text" 
            name="name" 
            value={user.name} 
            onChange={handleChange} 
            required />
        </Form.Group>

        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email" 
            name="email" 
            value={user.email} 
            onChange={handleChange} 
            required />
        </Form.Group>

        <Form.Group>
          <Form.Label>New Password</Form.Label>
          <Form.Control 
            type="password" 
            name="password" 
            value={user.password} 
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

export default EditUser;
