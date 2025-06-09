import React from 'react'
import './HeroSection.css'
import { Col, Container, Row } from 'reactstrap'
import CustomButton from '../../../components/button/CustomButton'
import heroImg1 from '../../../assets/images/homepage/heroSEction/e5de5fee0a8a5925b3f711311c4d42dd671aa226.jpg'
import heroImg2 from '../../../assets/images/homepage/heroSEction/c1683d8febb4d7d9a9a8ecf7134ab2ad9ae2cc8b.jpg'
import { Link, useNavigate } from 'react-router-dom'

const HeroSection = () => {
  return (
    <Container className='hero-container'>
        <Row className='align-items-center' >
            <Col md={6}>
            <h2 className='hero-heading'>
                Hope in Every Visit, Healing in Every Touch.
            </h2>
            <p className='hero-paragraph'>
                Empowering Wellness for You and Those You Care About.
            </p>
          <Link to='/contactUs'>
            <CustomButton className='hero-contact-btn'>
                Contact Us
            </CustomButton>
          </Link>
            </Col>
            
             <Col md={6} className='hero-relative-div' style={{position: 'relative'}}>
              <img src={heroImg2} className='heroImg1' style={{width: '300px',height: '450px',borderRadius: '56px'}} alt="" />
              <img src={heroImg1} className='heroImg2' style={{width: '300px',height: '450px',borderRadius: '56px'}} alt="" />
            </Col>
        </Row>
    </Container>
  )
}

export default HeroSection