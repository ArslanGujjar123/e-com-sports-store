import React from "react"
import "./style.css"
import { Col, Container, Row } from "react-bootstrap"
import { serviceData } from "../../utils/products"

const Wrapper = () => {
  return (
      <section className='wrapper'>
        <Container>
          <Row>
          {serviceData.map((val, index) => {
            return (
              <Col md={3} sm={5} xs={11} style={{backgroundColor:val.bg}} className='feature' key={index}>
                <div className='icon'>
                <img
                loading="lazy"
                src={val.icon}
                alt="image"
                />
                </div>
                <h3>{val.title}</h3>
                {/* <p>{val.subtitle}</p> */}
              </Col>
            )
          })}
          </Row>
        </Container>
      </section>
  )
}

export default Wrapper
