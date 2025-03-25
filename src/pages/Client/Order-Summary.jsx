import React ,{useState,useEffect}from 'react';
import { Container, Row, Col, Table, Card, Badge } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
// import { Orders } from '../utils/products';
const OrderSummary = () => {
  const styles = {
    container: {
      marginTop: '50px',
    },
    card: {
      marginBottom: '20px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    },
    cardHeader: {
      backgroundColor: '#2c3e50', // New appealing background color
      color: 'white',
      fontSize: '1.2rem',
      padding: '1rem',
    },
    badge: {
      
      fontSize: '1rem',
    },
    table: {
      borderCollapse: 'collapse',
      width: '100%',
    },
    tableHeader: {
      backgroundColor: '#f8f9fa',
    },
    tableCell: {
      padding: '12px 15px',
      borderBottom: '1px solid #dee2e6',
    },
    // cancelButton: {
    //   backgroundColor: '#e74c3c', 
    //   color: 'white',
    //   border: 'none',
    //   width: '100%',
    //   padding: '10px 15px',
    // },
    // disabledButton: {
    //   backgroundColor: '#bdc3c7',
    //   color: 'white',
    //   border: 'none',
    //   width: '100%',
    //   padding: '10px 15px',
    // },
    shippingInfo: {
      listStyle: 'none',
      padding: 0,
    },
    shippingItem: {
      padding: '0.5rem 0',
    },
  };

  const [userId, setUserId] = useState(null);
  const [Orders, setOrders] = useState([]);
  useEffect(() => {
    
    const token = localStorage.getItem('jwtToken');

    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded.id);
    }
  }, []); 

  useEffect(() => {
    const fetchData = async () => {
    const token = localStorage.getItem('jwtToken'); 
    if (userId) {
      try {
      const response=await axios.get(`http://localhost:5000/api/user/orders/${userId}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data=response.data.reverse();
      setOrders(data);
        } catch (error) {
          console.error('Error updating product:', error);
        }
    }
  }
  fetchData();
  }, [userId]);
  return (
    <Container style={styles.container}>
      <h2 className="text-center mb-4">Order Summary</h2>
      {Orders.length === 0 && (
              <h1 className="no-items product">You have not placed order yet</h1>
            )}
      {Orders.map((order) => (
        <Card key={order._id} style={styles.card}>
          <Card.Header style={styles.cardHeader}>
            Order #{order.id} - Status:{" "}
            <Badge
            bg={order.status === "delivered" ? "success" : "warning"}
            style={styles.badge}
            >
            {order.status}
            </Badge>

          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={8}>
                <h5>Order Items</h5>
                <Table responsive style={styles.table}>
                  <thead style={styles.tableHeader}>
                    <tr>
                      <th style={styles.tableCell}>Product Name</th>
                      <th style={styles.tableCell}>Quantity</th>
                      <th style={styles.tableCell}>Price</th>
                      <th style={styles.tableCell}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.details.map((item) => (
                      <tr key={item.productId}>
                        <td style={styles.tableCell}>{item.productName}</td>
                        <td style={styles.tableCell}>{item.quantity}</td>
                        <td style={styles.tableCell}>{item.price} R.S</td>
                        <td style={styles.tableCell}>{item.quantity * item.price} R.S</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <h5 className="mt-4">
                  Total Price: <strong>{order.totalPrice} R.S</strong>
                </h5>
              </Col>
              <Col md={4}>
                <h5>Shipping Information</h5>
                <ul style={styles.shippingInfo}>
                  <li style={styles.shippingItem}>
                    <strong>Name:</strong> {order.customerName}
                  </li>
                  <li style={styles.shippingItem}>
                    <strong>Phone:</strong> {order.phoneNumber}
                  </li>
                  <li style={styles.shippingItem}>
                    <strong>Address:</strong> {order.address}
                  </li>
                  <li style={styles.shippingItem}>
                    <strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()}
                  </li>
                </ul>
                {/* <Button
                  style={order.status === "delivered" ? styles.disabledButton : styles.cancelButton}
                  disabled={order.status === "delivered"}
                >
                  Cancel Order
                </Button> */}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default OrderSummary;
