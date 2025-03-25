import React, { useState } from 'react';
import './Login.css';
import { FaUser, FaLock } from 'react-icons/fa';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate,Link } from 'react-router-dom';
import { Form, Button, Container,Row,Col } from 'react-bootstrap';  // Import necessary Bootstrap components

const Login = ({setUserRole, setIsAuthenticated}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const userData = { email, password };

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', userData);
      const { token } = res.data;
      if (!token || typeof token !== "string") {
        setError('Login failed. Please check your credentials.');
        return navigate('/login'); 
      }
      // Save token to localStorage
      localStorage.setItem('jwtToken', token);
  
      // Decode token using jwt-decode
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.role;
      setUserRole(userRole);
      setIsAuthenticated(true);
      // Redirect based on role
      if (userRole === 'admin') {
        navigate('/admin/users');
      } else if(userRole==='owner'){
        navigate('/business/dashboard');
      }else{
        navigate('/shop');
      }
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <Container fluid className="login-page d-flex justify-content-center align-items-center">
      <Row className="login-box">
        <Col className="text-center mb-4">
          <h2 style={{ color: 'white', fontWeight: '10px' }}>Login</h2>
        </Col>
        <Form onSubmit={onSubmit} className="input-container">
          <Form.Group controlId="username" className="input-field">
            <FaUser className="icons" />
            <Form.Control 
             type="email"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             required
             placeholder="Email"
              autoComplete="email"
           />
          </Form.Group>
          <Form.Group controlId="password" className="input-field mb-3">
            <FaLock className="icons" />
            <Form.Control 
             type="password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             required
             placeholder="Password"
              autoComplete="new-password"
           />
          </Form.Group>
          {error && <p style={{ color: 'yellow' }}>{error}</p>}
          <Button
           type="submit" 
           className="login-button w-100"
           onMouseEnter={(e) => (e.target.style.backgroundColor = '#1A1A1A')}
           onMouseLeave={(e) => (e.target.style.backgroundColor = '#252525')}
           >
            Get Started
            </Button>
        </Form>
        <div className="footer-links mt-3 d-flex justify-content-between">
          <Link to="/register">Create Account</Link>
          <Link to="/login">Need Help?</Link>
        </div>
      </Row>
    </Container>
  );
}

export default Login;
