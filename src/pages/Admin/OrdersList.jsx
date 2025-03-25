import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Card, Badge } from 'react-bootstrap';
import axios from 'axios';

const UserOrders = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'pending', or 'delivered'

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        try {
          const response = await axios.get('http://localhost:5000/api/admin/orders', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = response.data.reverse();
          setOrders(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };
    fetchData();
  }, []);

  const handleShowDetails = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    
    try {
      const token = localStorage.getItem('jwtToken');
       await axios.put(
        `http://localhost:5000/api/admin/orders/status/${orderId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      ); 
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (filter === 'pending') return order.status === 'pending';
    if (filter === 'delivered') return order.status === 'delivered';
    return true; // 'all' case
  });

  return (
    <div className="container mt-5">
      {/* Buttons for filtering orders */}
      <div className="mb-3">
        <Button variant="warning"  onClick={() => setFilter('pending')} className="me-2">
          Show Pending Orders
        </Button>
        <Button variant="success" onClick={() => setFilter('delivered')} className="me-2">
          Show Delivered Orders
        </Button>
        <Button variant="secondary" onClick={() => setFilter('all')}>
          Show All Orders
        </Button>
      </div>

      <h2 className="mb-3" style={{ color: '#3498db', fontFamily: 'Roboto, sans-serif' }}>
        🏆 Admin Panel: Orders Overview
      </h2>

      <div className="order-grid">
        {filteredOrders.map((order, index) => (
          <Card key={order._id} className="mb-4 shadow-sm" style={{ borderRadius: '10px' }}>
            <Card.Body>
              <Card.Title style={{ color: '#2980b9' }}>Order #{index + 1}</Card.Title>
              <Card.Text>
                <strong>Customer:</strong> {order.customerName} <br />
                <strong>Address:</strong> {order.address} <br />
                <strong>Total Price:</strong> ${order.totalPrice} <br />
                <strong>Status:</strong>{' '}
                <Badge bg={order.status === 'delivered' ? 'success' : 'warning'}>
                  {order.status}
                </Badge> <br />
                <strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()} <br />
              </Card.Text>
              {/* <div style={{ display: 'flex', gap: '10px' }}> */}
              <Button
                variant="info"
                onClick={() => handleShowDetails(order)}
                
              >
                Details
              </Button>

              {/* Button to change the status of the order */}
              
                <Button
                  variant="danger"
                  className='ms-3'
                  onClick={() => handleStatusChange(order._id, order.status === 'delivered'? "pending":'delivered')}
                >
                  Change
                </Button>
            {/* </div> */}
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* Modal for showing order details */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder ? (
            <div>
              <h5>Order ID: {selectedOrder._id}</h5>
              <p><strong>Customer Name:</strong> {selectedOrder.customerName}</p>
              <p><strong>Delivery Address:</strong> {selectedOrder.address}</p>
              <p><strong>Total Price:</strong>{selectedOrder.totalPrice} R.S</p>
              <p><strong>Order Date:</strong> {new Date(selectedOrder.orderDate).toLocaleDateString()}</p>
              <h6>Products Ordered:</h6>
              <Table bordered responsive="md" className="product-table">
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.details.map((item) => (
                    <tr key={item.productId}>
                      <td>{item.productName}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price} R.S</td>
                      <td>{item.quantity * item.price} R.S</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ) : (
            <p>No order selected.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <style jsx="true">{`
        .order-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }
        .product-table th, .product-table td {
          font-size: 0.9rem;
        }
        .card:hover {
          transform: scale(1.02);
          transition: 0.3s ease;
        }
        h2 {
          font-family: 'Roboto', sans-serif;
        }
      `}</style>
    </div>
  );
};

export default UserOrders;
