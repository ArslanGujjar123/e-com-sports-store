// src/components/UserManagement.js
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  const navigate=useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      
      const token = localStorage.getItem('jwtToken');
     
      if (token) {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    };
    fetchData();
  }, []);

  
  const deleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        try {
           await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          setUsers(users.filter(u => u._id !== id));
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }else{
        console.error('Tokken is not truthy');
      }
    }
  };

  const handleClick = (id) => {
    navigate(`/admin/users/${id}`);
};


  return (
    <div className="container mt-5">
       <h2 className="page-title" style={{ fontFamily: 'Montserrat, sans-serif', color: '#1abc9c', fontWeight: 'bold'}}>
          User Management
        </h2>
      <Table bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created On</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user,index) => (
            <tr key={user._id}>
              <td>{index+1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{new Date(user.date).toLocaleDateString()}</td>
              <td>
               
                  <Button variant="light" className="btn btn-primary btn-sm mr-2" onClick={() => handleClick(user._id)}>
                    Edit
                  </Button>
                
                <Button variant="danger" size="sm" onClick={() => deleteUser(user._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <style jsx="true">{`
        .page-title {
          animation: bounceIn 1s;
        }
        @keyframes bounceIn {
        0% { transform: scale(0.9); opacity: 0; }
        100% { transform: scale(1); opacity: 1; }
        }
         `}</style>
    </div>
  );
};

export default UserManagement;
