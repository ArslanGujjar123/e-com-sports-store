import React, { useEffect, useState } from 'react';
import { FaDollarSign, FaShoppingCart, FaTruck } from 'react-icons/fa';
import { FcOk } from "react-icons/fc";
import { MdOutlineLogout } from "react-icons/md";
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Revenue.css'; 

const Revenue = () => {
  const [revenue, setRevenue] = useState(0);
  const [orders, setOrders] = useState(0);
  const [completeDelivery, setCompleteDelivery] = useState(0);
  const [pendingDelivery, setPendingDelivery] = useState(0);

  const [revenueTarget, setRevenueTarget] = useState(0);
  const [orderTarget, setOrderTarget] = useState(0);
  const [completeDeliveryTarget, setCompleteDeliveryTarget] = useState(0);
  const [pendingDeliveryTarget, setPendingDeliveryTarget] = useState(0);

  // Fetch data from the backend
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    axios.get('http://localhost:5000/owner/revenues',{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      setRevenueTarget(response.data.Revenue);
      setOrderTarget(response.data.Orders);
      setCompleteDeliveryTarget(response.data.delivered);
      setPendingDeliveryTarget(response.data.pending);
    })
    .catch(error => console.error('Error fetching products:', error));
  }, []);

  
  useEffect(() => {
    const increment = (target, setFunction, delay) => {
      let current = 0;
      const incrementStep = target / 100;

      const interval = setInterval(() => {
        current += incrementStep;
        if (current >= target) {
          setFunction(target);
          clearInterval(interval);
        } else {
          setFunction(Math.floor(current));
        }
      }, delay);
    };

    if (revenueTarget || orderTarget || completeDeliveryTarget || pendingDeliveryTarget) {
      setRevenue(0);
      setCompleteDelivery(0);
      setOrders(0);
      setPendingDelivery(0);
      increment(revenueTarget, setRevenue, 10);
      increment(orderTarget, setOrders, 10);
      increment(completeDeliveryTarget, setCompleteDelivery, 10);
      increment(pendingDeliveryTarget, setPendingDelivery, 10);
    }
  }, [revenueTarget, orderTarget, completeDeliveryTarget, pendingDeliveryTarget]);

  return (
    <div>
    
    <div className="logout-icon">
    <Link to="/logout">
      <MdOutlineLogout size={40} color="red" />
      </Link>
    </div>
    <div className="row dashboard-cards">
      <div className="card col-sm-12 col-lg-6" >
        <div className="card-icon text-success"><FaDollarSign size={40} /></div>
        <div className="card-info">
          <p>Total Revenue</p>
          <h2>${revenue.toLocaleString()}</h2>
          <p>Last 30 Days</p>
        </div>
      </div>
      <div className="card col-sm-12 col-lg-6">
        <div className="card-icon"><FaShoppingCart size={40} style={{ color: '#fd7e14' }}/></div>
        <div className="card-info">
          <p>Total Orders</p>
          <h2>{orders}</h2>
          <p>Last 30 Days</p>
         
        </div>
      </div>
      <div className="card col-sm-12 col-lg-6">
        <div className="card-icon"><FcOk size={40}/></div>
        <div className="card-info">
          <p>Complete Delivery</p>
          <h2>{completeDelivery}</h2>
          <p>Last 30 Days</p>
         
        </div>
      </div>
      <div className="card col-sm-12 col-lg-6">
        <div className="card-icon text-warning"><FaTruck size={40}/></div>
        <div className="card-info">
          <p>Pending Delivery</p>
          <h2>{pendingDelivery}</h2>
          <p>Last 30 Days</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Revenue;
