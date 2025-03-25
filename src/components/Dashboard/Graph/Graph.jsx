import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { FaSortDown } from 'react-icons/fa';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './Graph.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SalesAnalytics = () => {
  const [ordersByMonth, setOrdersByMonth] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  // Get current month, year, and day
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // months are 0-indexed
  const currentYear = currentDate.getFullYear();
  const currentDay = currentDate.getDate();

  // Function to calculate the number of days in a given month and year
  const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  useEffect(() => {
    const fetchOrdersByMonth = async () => {
      const token = localStorage.getItem('jwtToken'); 
      try {
        const response = await axios.get('http://localhost:5000/owner/api/orders-by-month',{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        setOrdersByMonth(data);

        // Find current month data and plot by default
        const currentMonthData = data.find(
          (monthData) => monthData._id.year === currentYear && monthData._id.month === currentMonth
        );
        setSelectedMonth(currentMonthData);
        plotChartForMonth(currentMonthData);
      } catch (error) {
        console.error('Error fetching orders by month:', error);
      }
    };

    fetchOrdersByMonth();
  }, [currentMonth, currentYear]);

  const handleMonthChange = (e) => {
    const monthIndex = e.target.value;
    const selectedMonthData = ordersByMonth[monthIndex];
    setSelectedMonth(selectedMonthData);
    plotChartForMonth(selectedMonthData);
  };

  const plotChartForMonth = (monthData) => {
    if (!monthData) return;

    const year = monthData._id.year;
    const month = monthData._id.month;

    // Get the number of days in the selected month
    let daysInMonth = getDaysInMonth(month, year);

    // If the current month is selected, limit the data to the current day
    if (year === currentYear && month === currentMonth) {
      daysInMonth = currentDay;
    }

    // Create an array of labels (days of the month)
    const labels = Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());

    // Create an array to store revenue for each day, default to 0
    const dailyRevenue = Array(daysInMonth).fill(0);

    // Populate the daily revenue array with data from the selected month
    monthData.orders.forEach(order => {
      const orderDate = new Date(order.orderDate).getDate(); // Get the day of the month
      if (orderDate <= daysInMonth) {
        dailyRevenue[orderDate - 1] += order.totalPrice; // Sum revenue for that day
      }
    });

    // Set chart data
    setChartData({
      labels,
      datasets: [
        {
          label: 'Revenue',
          data: dailyRevenue,
          fill: true,
          backgroundColor: 'rgba(75,192,192,0.2)',
          borderColor: 'rgba(75,192,192,1)',
          tension: 0.4,
        },
      ],
    });
  };

  // Helper function to format month and year
  const formatMonthYear = (month, year) => {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${monthNames[month - 1]} ${year}`;
  };

  return (
    <div className="sales-analytics">
      <div className="header">
        <h2>Sales Analytics</h2>
        <div className="sort-by">
          <span>Sort by</span>
          <select value={ordersByMonth.indexOf(selectedMonth)} onChange={handleMonthChange}>
            <option value="">--Select Month--</option>
            {ordersByMonth.map((monthData, index) => (
              <option key={index} value={index}>
                {formatMonthYear(monthData._id.month, monthData._id.year)}
              </option>
            ))}
          </select>
          <FaSortDown className="sort-icon" />
        </div>
      </div>

      <div className="chart-container">
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default SalesAnalytics;
