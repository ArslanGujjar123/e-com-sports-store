import React,{ Fragment, useEffect, useState } from "react";
import Banner from "../../components/Banner/Banner";
import { Container } from "react-bootstrap";
import ShopList from "../../components/ShopList";
// import { products } from "../utils/products";
import { useParams } from "react-router-dom";
import axios from 'axios'; 
import ProductDetails from "../../components/ProductDetails/ProductDetails";
import ProductReviews from "../../components/ProductReviews/ProductReviews";
import useWindowScrollToTop from "../../hooks/useWindowScrollToTop";

const Product = () => {

  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  const { id } = useParams();

  const [selectedProduct, setSelectedProduct] = useState(
    products.filter((item) => item._id === id)[0]
  );
  const [relatedProducts, setRelatedProducts] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedProduct(
      products.filter((item) => item._id === id)[0]
    );
    
    setRelatedProducts(
      products.filter(
        (item) =>
          item.category === selectedProduct?.category &&
          item._id !== selectedProduct?._id
      )
    );
  }, [selectedProduct, id,products]);

  useWindowScrollToTop();
 
  return (
    <Fragment>
      <Banner title={selectedProduct?.productName} />
      <ProductDetails selectedProduct={selectedProduct} />
      <ProductReviews selectedProduct={selectedProduct} />
      <section className="related-products">
        <Container>
          <h3>You might also like</h3>
        </Container>
        <ShopList productItems={relatedProducts} />
      </section>
    </Fragment>
  );
};

export default Product;
