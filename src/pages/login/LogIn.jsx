import React, { useState } from 'react'
import { Col, Container, Row } from 'reactstrap';
import './index.css'
import logo from '../../assets/images/logo/72b55081647424b650614f1ba0aa7584eb9ef940 (1).jpg'
import CustomButton from '../../components/button/CustomButton';
import { Link, useNavigate } from 'react-router-dom';
import LogInForm from '../../forms/LogInForm';




const LogIn = () => {


 const navigate = useNavigate()
 const toSignUp = () =>{
  navigate('/register')
 }


  return (
    <>
      <Container  className='min-vh-100 min-vw-100 w-100 h-100 d-flex align-items-center p-0 justify-content-center text-center '>
        <Row className=' min-vh-100 min-vw-100 w-100 h-100 d-flex  justify-content-center' >


        <Col className='d-flex flex-column '>
         <Row>
           <Link to='/' className='text-start' style={{margin: '36px', width: '96px'}}>
             <img src={logo} style={{ width: '96px', height: '120px' }} alt="logo" />
          </Link>
         </Row>
         <Row>
         <LogInForm/>
         </Row>
         </Col>

        <Col className='login-right d-flex justify-content-center' >
        <Row>
        <Col className='d-flex flex-column justify-content-center h-100 w-100 align-items-center'> 
          <h1 style={{lineHeight: '60px', fontSize: '40px', color: 'white'
          }}>Create Your Account</h1>

          <p style={{lineHeight: '60px', fontSize: '28px', color: 'white'}}>Register Today for Easy Access to Expert Care.</p>

          <CustomButton type='button' className='signUpButton' onClick={toSignUp}>
            Sign Up
          </CustomButton>
        </Col>
         </Row>
         </Col>
        </Row>
      </Container>
     
    </>
  )
}

export default LogIn