// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { Form, Button, Container } from 'react-bootstrap';  // Import necessary Bootstrap components

// const Register = ({setUserRole, setIsAuthenticated}) => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     const newUser = { name, email, password };

//     try {
//       const response = await axios.post('http://localhost:5000/api/auth/register', newUser);
//       const { token } = response.data;
//       if (!token || typeof token !== "string") {
//         setError('Registration failed. Please check your credentials.');
//         return navigate('/register'); 
//       }
//       localStorage.setItem('jwtToken', token);
//       setUserRole('user');
//       setIsAuthenticated(true);
//       navigate('/shop');
//     } catch (err) {
//       setError('Registration failed. Please try again.');
//     }
//   };

//   return (
//     <Container className="mt-5">
//       <h2>Register</h2>
//       <Form onSubmit={handleSubmit}>
//         {/* Name */}
//         <Form.Group controlId="formName">
//           <Form.Label>Name</Form.Label>
//           <Form.Control
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//             placeholder="Enter your name"
//             autoComplete="name"
//           />
//         </Form.Group>

//         {/* Email */}
//         <Form.Group controlId="formEmail">
//           <Form.Label>Email</Form.Label>
//           <Form.Control
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             placeholder="Enter your email"
//             autoComplete="email"
//           />
//         </Form.Group>

//         {/* Password */}
//         <Form.Group controlId="formPassword">
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             placeholder="Enter your password"
//             autoComplete="new-password"
//           />
//         </Form.Group>

//         {/* Confirm Password */}
//         <Form.Group controlId="formConfirmPassword">
//           <Form.Label>Confirm Password</Form.Label>
//           <Form.Control
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//             placeholder="Confirm your password"
//             autoComplete="new-password"
//           />
//         </Form.Group>

//         {/* Error Display */}
//         {error && <p style={{ color: 'red' }}>{error}</p>}

//         {/* Keep Button As Is */}
//         <div className="d-flex justify-content-between my-4">
//           <Button
//             variant="primary"
//             type='submit'
//             style={{
//               padding: '10px 20px',
//               backgroundColor: '#0f3460',
//               color: 'white',
//               borderRadius: '7px',
//               fontSize: '17px',
//               border: 'none',
//               boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
//               transition: 'all 0.3s ease',
//             }}
//             onMouseEnter={(e) => (e.target.style.backgroundColor = '#06264d')}
//             onMouseLeave={(e) => (e.target.style.backgroundColor = '#0f3460')}
//           >
//             Register
//           </Button>
//         </div>
//       </Form>
//     </Container>
//   );
// };

// export default Register;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './Register.css';  // Import your custom CSS

const Register = ({ setUserRole, setIsAuthenticated }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = { name, email, password };

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', newUser);
      const { token } = response.data;
      if (!token || typeof token !== "string") {
        setError('Registration failed. Please check your credentials.');
        return navigate('/register');
      }
      localStorage.setItem('jwtToken', token);
      setUserRole('user');
      setIsAuthenticated(true);
      navigate('/shop');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center register-page">
      <Row className="w-100 justify-content-center my-4">
        <Col xs={12} md={6} lg={4}>
          <div className="form-box">
            <h2 className="text-center">Create Your Account</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  className='form-input'
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Enter your name"
                  autoComplete="name"
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                 className='form-input'
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                  autoComplete="email"
                />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                 className='form-input'
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  autoComplete="new-password"
                />
              </Form.Group>

              {error && <p className="error-text">{error}</p>}

              <Button
                variant="success"
                type="submit"
                className="register-button"
              >
                Register
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
