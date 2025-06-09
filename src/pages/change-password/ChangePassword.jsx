import React, { useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import { Controller, useForm } from 'react-hook-form'
import { Button, Col, FormGroup, Input, InputGroup, InputGroupText, Label } from 'reactstrap'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const ChangePassword = () => {
     const {control, handleSubmit, reset, setValue, watch} = useForm()
      const [showPassword, setShowPassword] = useState(false)
      const togglePasswordVisibility = ()=>{
  setShowPassword((prevState) => !prevState)
  
}
const toggleModalForgotPassword = ()=> setModalOpen((prev)=> !prev)
    
  return (
      <>
            <header>
                <Navbar />
            </header>
            <main >
                <div className='container'>
                    <form action="">
                    <h1>Change Password</h1>
                    <FormGroup>

                    <Label for="passwordOld" sm={3} className="label">Old password:</Label>
                  <Col sm={9}>

                          <Controller
                           name='passwordOld'
                           control={control}
                           defaultValue=''
                           rules={{
                           required: 'This field is required',
                           minLength: { value: 6, message: 'Minimum 6 characters required' },
                           pattern: {
                           value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
                           message: 'At least one uppercase, lowercase and number required'
                         }
                         }}

                           render={({field, fieldState: {error} }) =>(
                        <>
                           <InputGroup>
                           <Input 
                              type={showPassword ? 'text' : 'password'} 
                              placeholder='Password' 
                              name='password' 
                              {...field} 
                              />
                              <InputGroupText onClick={togglePasswordVisibility}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />} 
                              </InputGroupText>
                           </InputGroup>
                              {error && <span style={{color: 'red'}}>{error.message}</span>}
                        </>
                            )}
                            />
                        </Col>                
                    </FormGroup>

                       <FormGroup>

                    <Label for="passwordNew" sm={3} className="label">New password:</Label>
                  <Col sm={9}>

                          <Controller
                           name='passwordNew'
                           control={control}
                           defaultValue=''
                           rules={{
                           required: 'This field is required',
                           minLength: { value: 6, message: 'Minimum 6 characters required' },
                           pattern: {
                           value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
                           message: 'At least one uppercase, lowercase and number required'
                         }
                         }}

                           render={({field, fieldState: {error} }) =>(
                        <>
                           <InputGroup>
                           <Input 
                              type={showPassword ? 'text' : 'password'} 
                              placeholder='Password' 
                              name='password' 
                              {...field} 
                              />
                              <InputGroupText onClick={togglePasswordVisibility}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />} 
                              </InputGroupText>
                           </InputGroup>
                              {error && <span style={{color: 'red'}}>{error.message}</span>}
                        </>
                            )}
                            />
                        </Col>                
                    </FormGroup>
                     <a style={{textAlign: 'end', textDecoration: 'underline', cursor: 'pointer'}} onClick={toggleModalForgotPassword} >Forgot password?</a>
                     <Button color='success' type='submit' className='mx-5'>Confifm</Button>
                    </form>
                </div>
               
               
            </main>
            <footer style={{ backgroundColor: '#0A97B01A' }}>
                <Footer />
            </footer>
        </>

)
}

export default ChangePassword