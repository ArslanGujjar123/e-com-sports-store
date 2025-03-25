import { useEffect,useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import {
  addToCart,
  decreaseQty,
  deleteProduct,
} from "../../app/features/cart/cartSlice";

const Cart = () => {
  const { cartList } = useSelector((state) => state.cart);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // middlware to localStorage
  const totalPrice = cartList.reduce(
    (price, item) => price + item.qty * item.price,
    0
  );
  useEffect(() => {
    window.scrollTo(0, 0);
    const token = localStorage.getItem('jwtToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);
  
    const getImageSrc = (img) => {
      return `http://localhost:5000/Images/${img}`;
    };
  const handleCart = async () => {
    if (isAuthenticated) {
        try {
            if(cartList.length===0){
              navigate('/cart');
            }else{
              navigate('/shipping', { state: { cartList } });
            }  
        } catch (error) {
            console.error('Error handling cart:', error);
        }
    }
};
  // console.log("date",cartList);
  return (
    <section className="cart-items">
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            {cartList.length === 0 && (
              <h1 className="no-items product">No Items are add in Cart</h1>
            )}
            {cartList.map((item) => {
              const productQty = item.price * item.qty;
              return (
                <div className="cart-list" key={item._id}>
                  <Row>
                    <Col className="image-holder" sm={4} md={3}>
                      <img 
                      src={getImageSrc(item.img)}
                      alt="image"
                      onError={(e) => {
                        e.target.onerror = null; // Prevent looping if default image also fails
                        e.target.src = `http://localhost:5000/Images/image-1727864945348.jpg`;// Fallback image
                      }}
                      />
                    </Col>
                    <Col sm={8} md={9}>
                      <Row className="cart-content justify-content-center">
                        <Col xs={12} sm={9} className="cart-details">
                          <h3>{item.productName}</h3>
                          <h4>
                            {item.price}.00 * {item.qty} R.S
                            <span>{productQty}.00</span>
                          </h4>
                        </Col>
                        <Col xs={12} sm={3} className="cartControl">
                          <button
                            className="incCart"
                            onClick={() =>
                              dispatch(addToCart({ product: item, num: 1 }))
                            }
                          >
                            <i className="fa-solid fa-plus"></i>
                          </button>
                          <button
                            className="desCart"
                            onClick={() => dispatch(decreaseQty(item))}
                          >
                            <i className="fa-solid fa-minus"></i>
                          </button>
                        </Col>
                      </Row>
                    </Col>
                    <button
                      className="delete"
                      onClick={() => dispatch(deleteProduct(item))}
                    >
                      <ion-icon name="close"></ion-icon>
                    </button>
                  </Row>
                </div>
              );
            })}
          </Col>
          <Col md={4}>
            <div className="cart-total">
              <h2>Cart Summary</h2>
              <div className=" d_flex">
                <h4>Total Price :</h4>
                <h3>{totalPrice}.00 R.S</h3>
              </div>
            </div>
            <button
              aria-label="Add"
              onClick={handleCart}
              disabled={!isAuthenticated}
              type="submit"
              style={{
                padding: '10px 15px',
                backgroundColor: '#0f3460',
                color: 'white',
                fontSize: '17px',
                borderRadius: '7px',
                border: 'none',  
                cursor: 'pointer',  
              }}         
            >
              {isAuthenticated ? 'Proceed to Checkout' : 'Login to Checkout'}
            </button> 
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Cart;
