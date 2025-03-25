import React, { useState,useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate,useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from "react-redux";
import { clearCart } from "../../app/features/cart/cartSlice";
import axios from 'axios';

const ShippingPage = () => {
  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    phoneNumber: '',
    customerName: ''
  });
  const [userId, setUserId] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    
    const token = localStorage.getItem('jwtToken');

    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded.id);
    }
  }, []);

  const location = useLocation();
  const cartList = location.state?.cartList ;  
  const navigate = useNavigate();
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({
      ...shippingInfo,
      [name]: value
    });
  };

  const handleConfirmOrder = async () => {
    try {
      const { customerName, address, phoneNumber } = shippingInfo;

      const totalPrice = cartList.reduce((acc, item) => acc + item.price * item.qty, 0);
      const orderDetails = cartList.map((item) => ({
        productId: item._id,  
        productName: item.productName,
        quantity: item.qty,
        price: item.price
      }));

      const order = {
        customerid: userId,
        customerName,
        address,
        phoneNumber,
        totalPrice,
        status:'pending',
        details: orderDetails
      };
      const token = localStorage.getItem('jwtToken');
    
      if (token) {
        try {
           await axios.post('http://localhost:5000/api/user/orders',
            order, 
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          
          dispatch(clearCart());
          navigate('/order-summary');
        } catch (error) {
          console.error('Error updating product:', error);
        }
      } else {
        console.error('Token is not valid');
      } 
     } catch (error) {
        console.error('Internal error:', error);
      }
  };
  
  const handleCancelOrder = () => {
    // Redirect to home page or previous step
    navigate('/shop');
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={6} className="mx-auto">
          <h2 className="mb-4">Shipping Information</h2>
          <Form>
            <Form.Group controlId="formReceiverName">
              <Form.Label>Receiver Name</Form.Label>
              <Form.Control
                type="text"
                name="customerName"
                placeholder="Enter receiver name"
                value={shippingInfo.customerName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                placeholder="Enter address"
                value={shippingInfo.address}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                placeholder="Enter phone number"
                value={shippingInfo.phoneNumber}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-between my-4">

            <Button
    variant="primary"
    onClick={handleConfirmOrder}
    style={{
      padding: '10px 20px',
      backgroundColor: '#0f3460',  // Standard blue color for Confirm
      color: 'white',
      borderRadius: '7px',
      fontSize: '17px',
      border: 'none',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',  // Similar shadow for uniformity
      transition: 'all 0.3s ease',
    }}
    onMouseEnter={(e) => (e.target.style.backgroundColor = '#06264d')}  // Darker blue on hover
    onMouseLeave={(e) => (e.target.style.backgroundColor = '#0f3460')}
  >
    Confirm Order
  </Button>

            <Button
    variant="secondary"
    onClick={handleCancelOrder}
    style={{
      padding: '10px 20px',
      backgroundColor: '#e74c3c',  // More appealing red color
      color: 'white',
      borderRadius: '7px',
      fontSize: '17px',
      border: 'none',  // Remove border
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',  // Add subtle shadow for elevation
      transition: 'all 0.3s ease',  // Smooth hover effect
    }}
    onMouseEnter={(e) => (e.target.style.backgroundColor = '#c0392b')}  // Darker red on hover
    onMouseLeave={(e) => (e.target.style.backgroundColor = '#e74c3c')}  // Revert to original color
  >
    Cancel Order
  </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ShippingPage;
