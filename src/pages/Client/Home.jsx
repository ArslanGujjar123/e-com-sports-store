import React, { useState, useEffect } from 'react';
import { Fragment } from "react";
import Wrapper from "../../components/wrapper/Wrapper";
import Section from "../../components/Section";
import SliderHome from "../../components/Slider";
import useWindowScrollToTop from "../../hooks/useWindowScrollToTop";
import axios from 'axios';

const Home = () => {

  const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch products from backend API
        axios.get('http://localhost:5000/api/products')    
            .then(response =>  setProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);
  const newArrivalData = products.filter(
    (item) => item.category === "Bat" || item.category === "Accessories"
  );
  const bestSales = products.filter((item) => item.category === "Bat");
  useWindowScrollToTop();
  return (
    <Fragment>
      <SliderHome />
      <Wrapper />
      {/* <Section
        title="Big Discount"
        bgColor="#f6f9fc"
        productItems={discoutProducts}
      /> */}
      <Section
        title="New Arrivals"
        bgColor="white"
        key={1}
        productItems={newArrivalData}
      />
      <Section title="Best Sales" key={2} bgColor="#f6f9fc" productItems={bestSales} />
    </Fragment>
  );
};

export default Home;
