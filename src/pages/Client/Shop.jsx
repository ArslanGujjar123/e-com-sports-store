import { Col, Container, Row } from "react-bootstrap";
import React, { useState, useEffect } from 'react';
import FilterSelect from "../../components/FilterSelect";
import SearchBar from "../../components/SeachBar/SearchBar";
import { Fragment} from "react";
// import { products } from "../utils/products";
import ShopList from "../../components/ShopList";
import Banner from "../../components/Banner/Banner";
import useWindowScrollToTop from "../../hooks/useWindowScrollToTop";

const Shop = () => {
  const [filterList, setFilterList] = useState([]);

  useEffect(() => {
    // Fetch products from backend API
    fetch('http://localhost:5000/api/products')
      .then(response => response.json())
      .then(data =>  setFilterList(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  useWindowScrollToTop();

  return (
    <Fragment>
      <Banner title="product" />
      <section className="filter-bar">
        <Container className="filter-bar-container">
          <Row className="justify-content-center">
            <Col md={4}>
              <FilterSelect setFilterList={setFilterList} />
            </Col>
            <Col md={8}>
              <SearchBar setFilterList={setFilterList} />
            </Col>
          </Row>
        </Container>
        <Container>
          <ShopList productItems={filterList} />
        </Container>
      </section>
    </Fragment>
  );
};

export default Shop;
