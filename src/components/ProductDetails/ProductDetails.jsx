import { useState,useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../app/features/cart/cartSlice";
import "./product-details.css";

const ProductDetails = ({ selectedProduct }) => {

  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };
  const handelAdd = (selectedProduct, quantity) => {
    dispatch(addToCart({ product: selectedProduct, num: quantity }));
    toast.success("Product has been added to cart!");
  };

  const [imageSrc, setImageSrc] = useState('');
  
    useEffect(() => {
      if(selectedProduct){
      const getImageSrc = (img) => {
        return `http://localhost:5000/Images/${img}`;
      };
      setImageSrc(getImageSrc(selectedProduct.img));
     }
    }, [selectedProduct]);

  return (
    <section className="product-page">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <img loading="lazy" 
             src={imageSrc}
             alt="image"
             onError={(e) => {
               e.target.onerror = null; // Prevent looping if default image also fails
             }}
             />
          </Col>
          <Col md={6}>
            <h2>{selectedProduct?.productName}</h2>
            <div className="rate">
              <div className="stars">
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
              </div>
              {/* <span>{selectedProduct?.avgRating} ratings</span> */}
            </div>
            <div className="info">
              <span className="price">R.S {selectedProduct?.price}</span>
              <span>category:{selectedProduct?.category}</span>
            </div>
            {/* <p>{selectedProduct?.shortDesc}</p> */}
            <input
              className="qty-input"
              type="number"
              placeholder="Qty"
              value={quantity}
              onChange={handleQuantityChange}
            />
            <button
              aria-label="Add"
              type="submit"
              className="add"
              onClick={() => handelAdd(selectedProduct, quantity)}
            >
              Add To Cart
            </button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProductDetails;
