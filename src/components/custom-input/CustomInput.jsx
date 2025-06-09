import React from 'react'
import { Input } from 'reactstrap'
import './CustomInput.css'

const CustomInput = ({field, error, className, ...props}) => {
  return (
    <div>
        <Input 
        className={`custom-input ${className}`}
        {...field}
        {...props}
        invalid={!!error}
        />
        {error && <span style={{color: 'red'}}>{error.message}</span>}

    </div>
  )
}

export default CustomInput