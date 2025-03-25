import React, { useState } from 'react'; 
import { Form, Button, Container } from 'react-bootstrap';  
import { Link, useNavigate } from 'react-router-dom';  
import axios from 'axios';  

const NewProduct = () => {
  const [productName, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('English willow Bats'); 
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('jwtToken');
    if (token) {
      try {
        const productData = { productName, price, image, brand, category, description };
        const product = await axios.post('http://localhost:5000/api/admin/productsave', productData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        navigate('/admin/products');
      } catch (error) {
        console.error('Product creation failed', error);
      }
    }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    const token = localStorage.getItem('jwtToken');
    if (token) {
      try {
        const { data } = await axios.post('http://localhost:5000/api/upload', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        setImage(data.fileName);  
        setUploading(false);
      } catch (error) {
        console.error('Image upload failed', error);
        setUploading(false);
      }
    }
  };

  return (
    <Container className='my-4'>
      <h1>Create New Product</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='productName'>
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter product name'
            value={productName}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='price'>
          <Form.Label>Price</Form.Label>
          <Form.Control
            type='number'
            placeholder='Enter price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='image'>
          <Form.Label>Image</Form.Label>
          <Form.Control
            type='text'
            placeholder='Image name will be set after upload'
            value={image}
            readOnly
          />
          <Form.Control
            type='file'
            onChange={uploadFileHandler}
          />
        </Form.Group>

        <Form.Group controlId='brand'>
          <Form.Label>Brand</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter brand'
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='category'>
          <Form.Label>Category</Form.Label>
          <Form.Control
            style={{
              backgroundColor: "#0f3460",
              color: "white",
              borderRadius: "5px",
              border: "none",
              boxShadow: "none",
              width: "200px",
              height: "40px",
            }}
            as='select'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value='English willow Bats'>English willow Bats</option>
            <option value='Helmets'>Helmets</option>
            <option value='Batting Gloves'>Batting Gloves</option>
            <option value='Kashmir willow bat'>Kashmir willow bat</option>
            <option value='Stumps and Bails'>Stumps and Bails</option>
            <option value='Kit Bag'>Kit Bag</option>
            <option value='Keeping Pads'>Keeping Pads</option>
            <option value='Keeping Gloves'>Keeping Gloves</option>
            <option value='Shoes'>Shoes</option>
            <option value='Side Arm'>Side Arm</option>
            <option value='Abdominal Guard'>Abdominal Guard</option>
            <option value='Ball'>Ball</option>
          </Form.Control>
        </Form.Group>


        <Form.Group controlId='description'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as='textarea'
            rows={3}
            placeholder='Enter product description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <div className="d-flex justify-content-between mt-4">

          <Button
            type='submit'
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
            Create
          </Button>

          <Button
            variant="secondary"
            as={Link} to='/admin/products'
            style={{
              padding: '10px 20px',
              backgroundColor: '#e74c3c',
              color: 'white',
              borderRadius: '7px',
              fontSize: '17px',
              border: 'none',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#c0392b')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#e74c3c')}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default NewProduct;
