import { Col, Container, Row } from "react-bootstrap";
import {Link} from "react-router-dom";
import "./slidercard.css";

const SlideCard = ({title,desc,cover}) => {
  return (
    <Container className='box' style={{ backgroundImage: `url(${cover})` }}>
        <Row>
          <Col md={6}>
            <h1>{title}</h1>
            <p>{desc}</p>
            <button className='shop'>
              <Link to="/shop" className='shop-link'>Shop Now</Link>
            </button>
          </Col>
         
           <Col md={6} >
         
        </Col>
        </Row>

    </Container>
  )
}

export default SlideCard
