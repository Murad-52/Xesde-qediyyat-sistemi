import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import './AboutSection.css'


const AboutSection = () => {
  return (
    
        <Container className='about-container'>
           <Row>
            <Col>
            <div className='about-div'>
              <h2 className='about-heading'>About us</h2>
              <p className='about-description'>Healthcare that cares — advanced, personal, and always here for you</p>
              <p className='about-paragraph'>At [Hospital Name], we don’t just treat conditions — we care for people. Our mission is to deliver modern, patient-centered healthcare designed around your life, your family, and your future.
With a trusted team of skilled professionals and the latest in medical technology, we make it easier to access the care you need—whether it's a simple checkup, urgent medical support, or a long-term health plan.
Your health journey is personal — and so is our commitment to walking it with you, every step of the way.</p>
            </div>
            </Col>
           </Row>
        </Container>
    
  )
}

export default AboutSection