import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminProductList = () => {
  const [products, setProducts] = useState([]); // All products
  const [searchQuery, setSearchQuery] = useState(''); // Search query input
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products to display
  const [loading, setLoading] = useState(true); // Loading state
   
  const navigate=useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data.reverse());
        setFilteredProducts(response.data.reverse());
        setLoading(false); // Stop loading after data is fetched
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id,img) => {
    img='image-1727878858106.jpg';
    const token = localStorage.getItem('jwtToken');
    if (token) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          
        });
        await axios.delete(`http://localhost:5000/api/delete/image/${img}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFilteredProducts(products.filter(p => p._id !== id));
      } catch (error) {
        console.error('Error deleting data:', error);
      }
    } else {
      navigate('/login');
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filtered = products.filter(product =>
      product.productName.toLowerCase().startsWith(query.toLowerCase())
    );
    filtered.sort((a, b) => a.productName.localeCompare(b.productName));
    setFilteredProducts(filtered);
  };

  const handleClick = () => {
    navigate('/admin/create-product');
};
 
const handleLink = (id) => {
  navigate(`/admin/edit-product/${id}`);
};

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="page-title" style={{ fontFamily: 'Montserrat, sans-serif', color: '#1abc9c', fontWeight: 'bold' }}>
          🏆 Products List
        </h1>
        <Button variant="success" className="create-btn" onClick={handleClick}>
            Create Product
        </Button>
      </div>

      {/* Search Input */}
      <Form.Group controlId="search" className="my-4">
        <Form.Control
          type="text"
          placeholder="Search products by name..."
          value={searchQuery}
          onChange={handleSearch}
          style={{ borderRadius: '20px' }}
        />
      </Form.Group>

      {/* Loading Spinner */}
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" role="status" style={{ color: '#3498db' }}>
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Table bordered hover responsive className="table-sm animated-table" style={{ animation: 'fadeInUp 1s' }}>
          <thead style={{ backgroundColor: '#2c3e50', color: 'white', fontSize: '1rem' }}>
            <tr>
              <th>#</th>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th>STOCK</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, index) => (
              <tr key={product._id} className="table-row">
                <td>{index + 1}</td>
                <td>{product._id}</td>
                <td>{product.productName}</td>
                <td>{product.price} R.S</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>{product.stock}</td>
                <td>
                 
                    <Button variant="light" className="btn-sm" onClick={() => handleLink(product._id)}>Edit</Button>
                 
                  <Button
                    variant="danger"
                    className="btn-sm delete-btn"
                    onClick={() => handleDelete(product._id,product.img)}
                    style={{ marginLeft: '5px' }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Custom Styles and Animations */}
      <style jsx="true">{`
        .page-title {
          animation: bounceIn 1s;
        }
        .create-btn {
          animation: pulse 2s infinite;
        }
        .table-row:hover {
          background-color: #ecf0f1;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        @keyframes bounceIn {
          0% { transform: scale(0.9); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default AdminProductList;
