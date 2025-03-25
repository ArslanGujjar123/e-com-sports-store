import React from "react"
import "./style.css"
import { Col, Container, Row } from "react-bootstrap"

const Footer = () => {
  return (
    <footer>
        <Container>
          <Row className="footer-row">
            <Col md={3} sm={5} className='box'>
              <div className="logo">
                  <ion-icon name="bag"></ion-icon>
                  <h1>Imran Sports</h1>
              </div>
              <p>Welcome to our sports website, your go-to platform for top-quality sports equipment and gear. Whether you're a professional athlete or a sports enthusiast, we offer a wide range of products to elevate your performance and enhance your experience.</p>
            </Col>
            <Col md={3} sm={5} className='box'>
              <h2>About Us</h2>
              <ul>
                <li>Careers</li>
                <li>Our Stores</li>
                <li>Our Cares</li>
                <li>Terms & Conditions</li>
                <li>Privacy Policy</li>
              </ul>
            </Col>
            <Col md={3} sm={5} className='box'>
              <h2>Customer Care</h2>
              <ul>
                <li>Help Center </li>
                <li>How to Buy </li>
                <li>Track Your Order </li>
                <li>Corporate & Bulk Purchasing </li>
                <li>Returns & Refunds </li>
              </ul>
            </Col>
            <Col md={3} sm={5} className='box'>
              <h2>Contact Us</h2>
              <ul>
                <li>405 N Gerard Ave, Villa Park, IL 60181 </li>
                <li>Email: uilib.help@gmail.com</li>
                <li>Phone: +1 (773) 818-4260</li>
              </ul>
            </Col>
          </Row>
          <Row className="text-center mt-4">
          <Col>
            <p>©InfoData 2024, All rights reserved.</p>
          </Col>
        </Row>
        </Container>
    </footer>
  )
}

export default Footer
