import React, { useState } from 'react'
import RegisterForm from '../../forms/RegisterForm'
import { Col, Container, Row } from 'reactstrap';
import '../register/index.css'
import logo from '../../assets/images/logo/72b55081647424b650614f1ba0aa7584eb9ef940 (1).jpg'
import CustomButton from '../../components/button/CustomButton';
import { Link, useNavigate } from 'react-router-dom';




const Register = () => {


 const navigate = useNavigate()
 const toSignIn = () =>{
  navigate('/login')
 }


  return (
    <>
      <Container  className='min-vh-100 min-vw-100  d-flex align-items-center justify-content-center overflow-hidden text-center p-0'>

        <Row className=' min-vh-100 min-vw-100 w-100 h-100 d-flex p-0 m-0 justify-content-center' >

        <Col className='register-left w-100vw'style={{display: 'flex', flexDirection: 'column', gap: '100px', }} md="6"  >
         <Row>
          <Link to='/' style={{margin: '36px', width: '96px'}}>
             <img src={logo} style={{ width: '96px', height: '120px' }} alt="logo" />
          </Link>
         </Row>

         <Row>

        <Col>
          <h1 style={{lineHeight: '60px', fontSize: '40px', color: 'white'
          }}>Welcome back!</h1>
          <p style={{lineHeight: '60px', fontSize: '28px', color: 'white'}}>We’re happy to have you back! Let’s get started.</p>
          <CustomButton type='button' className='signInButton' onClick={toSignIn} >
            Sign In
          </CustomButton>
        </Col>
          
         </Row>
         </Col>



        <Col className='register-form d-flex flex-column  justify-content-around'>
         
         <RegisterForm/>
         </Col>
        
        </Row>
      </Container>
     
    </>
  )
}

export default Register