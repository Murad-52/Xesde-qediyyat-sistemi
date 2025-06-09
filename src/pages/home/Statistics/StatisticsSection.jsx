import React from 'react'
import './StatisticsSection.css'
import { Col, Container, Row } from 'reactstrap'

const StatisticsSection = () => {
  return (
    
<Container className='statistics-container'>
 <Row className="justify-content-center text-center mb-4">
 <Col xs={12}>
 <h2 className="statistics-title">Our Families</h2>
 <p className="statistics-description">Providing healthcare solutions that keep your loved ones safe and healthy.</p>
 </Col>
 </Row>
 <Row className="justify-content-between ">
 <Col md={4} sm={6} xs={12} className="mb-3 mb-md-0">
 <div className="statistic-item">
 <h3 className="statistic-number">700+</h3>
 <p className="statistic-label">Happy Patients</p>
 </div>
 </Col>
 <Col md={4} sm={6} xs={12} className="mb-3 mb-md-0">
 <div className="statistic-item">
 <h3 className="statistic-number">200+</h3>
 <p className="statistic-label">Hospitals</p>
 </div>
 </Col>
 <Col md={4} xs={12}>
 <div className="statistic-item">
 <h3 className="statistic-number">500+</h3>
 <p className="statistic-label">Expert Doctors</p>
 </div>
 </Col>
 </Row>
 </Container>

    
  )
}

export default StatisticsSection