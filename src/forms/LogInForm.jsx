import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import CustomInput from '../components/custom-input/CustomInput';
import CustomButton from '../components/button/CustomButton';
import { Input, InputGroup, InputGroupText } from 'reactstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../assets/styles/variables.css';
import ResetPasswordModal from '../components/modals/ResetPasswordModal';
import Instance from '../api/Instance';


const LogInForm = () => {
    const {control, handleSubmit, setValue, watch} = useForm()
    const [showPassword, setShowPassword] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const role = watch('role');
    const navigate = useNavigate()

 const onSubmit = async (data) => {
  try {
    setErrorMessage('');

    const response = await Instance.get(`/users`, {
      params: {
        email: data.email,
        password: data.password,
      }
    });

    if (response.data.length > 0) {
      const user = response.data[0];
      
     
      if (data.role === 'doctor' && user.hospitalCode !== data.hospitalCode) {
        setErrorMessage('Hospital code is incorrect.');
        return;
      }

      localStorage.setItem('token', 'dummy-token');
      localStorage.setItem('user', JSON.stringify({ ...user, role: data.role }));

      navigate('/');
    } else {
      setErrorMessage('Incorrect email or password.');
    }
  } catch (error) {
    setErrorMessage('Incorrect email or password.');

  }
};


    const togglePasswordVisibility = ()=> setShowPassword((prev) => !prev)
    const toggleModalForgotPassword = ()=> setModalOpen((prev)=> !prev)

  

  return (
 
       < >
          <form action=""  onSubmit={handleSubmit(onSubmit)} className='d-flex flex-column gap-3 width-3'>
            <h1 className='heading'>Login to Hospital</h1>
          <Controller
            name='email'
            control={control}
            defaultValue=''
            rules={{required: 'This field is required'}}
            render={({field, fieldState: {error} }) =>(
              <>
              <CustomInput 
              type="email" 
              placeholder='Email address' 
              name='email' 
              error={error}
              {...field} 
              />
              </>
            )}
            />
          <Controller
            name='password'
            control={control}
            defaultValue=''
            rules={{required: 'This field is required'}}
            render={({field, fieldState: {error} }) =>(
              <>
           <InputGroup>
           <Input 
              type={showPassword ? 'text' : 'password'} 
              placeholder='Password' 
              name='password' 
              error={error}
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
           <Controller
            name='role'
            control={control}
            defaultValue='role'
            render={({field, fieldState: {error} }) =>(
              <>
            <Input
            type='select' 
            {...field}
            >
              <option value='role' disabled>Select your role</option>
              <option value='doctor'>Doctor</option>
              <option value='patient'>Patient</option>
            </Input>
              </>
            )}
            />
            {role === 'doctor' && (
                <>
          <Controller
            name='hospitalCode'
            control={control}
            defaultValue=''
            rules={{required: 'This field is required'}}
            render={({field, fieldState: {error} }) =>(
              <>
              <CustomInput 
              type="number" 
              placeholder='Hospital code' 
              name='hospitalCode' 
              error={error}
              {...field} 
              />
              </>
            )}
            />
                </>
            )}
            <a style={{textAlign: 'end', textDecoration: 'underline', cursor: 'pointer'}} onClick={toggleModalForgotPassword} >Forgot password?</a>
            <ResetPasswordModal 
            isOpen={modalOpen}
            toggle={toggleModalForgotPassword}
            />
            {errorMessage && (
  <div style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>
    {errorMessage}
  </div>
)}

           


            <div className='d-flex flex-row justify-content-end gap-3'>
            <CustomButton type='submit' className='sign-up-button' style={{color: 'var(--text-color)', backgroundColor: 'var(--button-input-color)'}}>
              Log in
            </CustomButton>
            </div>
          </form>


      </>
  )
}
export default LogInForm