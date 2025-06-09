import React from 'react'
import './Footer.css'
import { Col, Container, Row } from 'reactstrap'
import logo from '../../assets/images/logo/72b55081647424b650614f1ba0aa7584eb9ef940 (1).jpg' 
import { Link } from 'react-router-dom'
import  FacebookIcon  from '../../assets/icons/facebook.svg';
import InstagramIcon from '../../assets/icons/instagram.svg'
import LocationIcon from '../../assets/icons/location.svg';
import PhoneIcon from '../../assets/icons/phone.svg';
import EmailIcon from '../../assets/icons/email.svg'
const Footer = () => {
  return (
    <>
    <Container className='footer-container'>
      <Row className='align-items-center '>
        <Col md={6}>
       <div className='d-flex align-items-center gap-3'>
        <Link to='/' style={{ width: '96px'}}>
            <img src={logo} style={{ width: '96px', height: '120px' }} alt="logo" />
        </Link>
       <div>
        <p className='d-flex gap-2 align-items-center'>
          <span>
          <img src={LocationIcon} alt="" />
          </span>
          <span>Baku, Nariman Narimanov 13</span>
        </p>
        <p className='d-flex gap-2 align-items-center'>
          <span>
           <img src={EmailIcon} alt="" />
          </span>
          <span>info@hospital.com</span>
        </p>
        
        <p className='d-flex gap-2 align-items-center'>
          <span>
            <img src={PhoneIcon} alt="" />
        </span>
        <span>+99455555555</span>
        </p>
       </div>
       </div>
       <div className='d-flex gap-2'>
      <Link to='https://facebook.com'  target='_blank'>
      <img src={FacebookIcon} alt="" />
      </Link>
       <Link to='https://instagram.com' target='_blank'>
      <img src={InstagramIcon} alt="" />
      </Link>
        
       </div>
          
        </Col>
        <Col md={6} className='d-flex align-items-start justify-content-end'>

        <ul className='footer-list'>
          <p>Pages</p>
          <Link to='/' className='footer-list-item'><li>Home</li></Link>
          <Link to='/doctors' className='footer-list-item'><li>Doctors</li></Link>
          <Link to='/hospitals' className='footer-list-item'><li>Hospitals</li></Link>
          <Link to='/login' className='footer-list-item'><li>Account</li></Link>
        </ul>
        
        <ul className='footer-list'>
          <p>Company</p>
          <Link to='/' className='footer-list-item'><li>About us</li></Link>
          <Link to='/' className='footer-list-item'><li>Our families</li></Link>
          <Link to='/' className='footer-list-item'><li>Contact us</li></Link>
          <Link to='/' className='footer-list-item'><li>FAQ</li></Link>
          <Link to='/' className='footer-list-item'><li>Privacy Policy</li></Link>
        </ul>
        
        
        </Col>
      </Row>
      <hr />

    </Container>

 

    </>



  )
}

export default Footer