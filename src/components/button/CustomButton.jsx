import React from 'react'
import './CustomButton.css'
import { Button } from 'reactstrap'

const CustomButton = ({type= 'button', children, onClick, className, style}) => {
  return (
    <>
    <Button
    type={type}
    onClick={onClick}
    className={`custom-button ${className}`}
    style={style}
    >
      {children}
    </Button>
      
    </>
  )
}

export default CustomButton