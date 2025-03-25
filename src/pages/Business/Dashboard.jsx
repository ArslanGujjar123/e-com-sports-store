
import React from 'react';
import SalesAnalytics from '../../components/Dashboard/Graph/Graph'
import TopSellingProducts from '../../components/Dashboard/TopProducts/Products';
import Revenue from '../../components/Dashboard/Revenue/Revenue';
// import './Dashboard.css'; 

const AdminDashboard = () => {
  

  return (
    <>
    <Revenue/>
    <SalesAnalytics/>
    <TopSellingProducts/>
    </>
  );
};

export default AdminDashboard;

