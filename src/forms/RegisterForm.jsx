import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import CustomInput from '../components/custom-input/CustomInput';
import CustomButton from '../components/button/CustomButton';
import { Input, InputGroup, InputGroupText } from 'reactstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../assets/styles/variables.css';
import Instance from '../api/Instance';


const RegisterForm = () => {
 const {control, handleSubmit, reset, setValue, watch} = useForm()
 const [showPassword, setShowPassword] = useState(false)
 const [registeredUsers, setRegisteredUsers] = useState([]);
 const [errorMessage, setErrorMessage] = useState('')
 const role = watch('role');

 

 const password = watch('password');
 const navigate = useNavigate()

 const onSubmit = async (data) => {
    const userExists = registeredUsers.some(
    (user) => user.email.toLowerCase() === data.email.toLowerCase()
  );

  if (userExists) {
    setErrorMessage('This user already exists.');
    return;
  }



    try {
    const response = await Instance.post('/users', data);
    if (response.status === 201) {
      alert('Qeydiyyat uğurla tamamlandı!');
      reset();
      navigate('/login');
    } else {
      alert('Qeydiyyat zamanı problem yarandı.');
    }
  } catch (error) {
    console.error(error);
    alert('Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.');
  }
 }

 useEffect(() => {
  const fetchUsers = async () => {
    try {
      const response = await Instance.get('/users'); 
      setRegisteredUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  fetchUsers();
}, []);


 const handleCancel = ()=>{
  reset()
  navigate('/')
 }
 
 const togglePasswordVisibility = ()=>{
  setShowPassword((prevState) => !prevState)
 }

  return (
       <>
        <form action=""  onSubmit={handleSubmit(onSubmit)} className='d-flex flex-column gap-1 m-0 '>
        <h1 className='heading'>Create Account</h1>
        {errorMessage && (
  <div style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</div>
)}

          <Controller
            name='firstName'
            control={control}
            defaultValue=''
            rules={{required: 'This field is required'}}
            render={({field, fieldState: {error} }) =>(
              <>
              <CustomInput
              type="text" 
              placeholder='First name' 
              name='firstName' 
              error={error}
              {...field} 
              />
              </>
            )}
            />
          <Controller
            name='lastName'
            control={control}
            defaultValue=''
            rules={{required: 'This field is required'}}
            render={({field, fieldState: {error} }) =>(
              <>
              <CustomInput 
              type="text" 
              placeholder='Last name' 
              name='lastName' 
              error={error}
              {...field} 
              />
              </>
            )}
            />
          <Controller
            name='birthDate'
            control={control}
            defaultValue=''
            rules={{required: 'This field is required'}}
            render={({field, fieldState: {error} }) =>(
              <>
              <CustomInput 
              type="date" 
              placeholder='Date of Birth' 
              name='birthDate' 
              error={error}
              {...field} 
              />
              </>
            )}
            />
          <Controller
            name='finCode'
            control={control}
            defaultValue=''
            rules={{required: 'This field is required'}}
            render={({field, fieldState: {error} }) =>(
              <>
              <CustomInput 
              type="text" 
              placeholder='Fin code' 
              name='finCode' 
              error={error}
              {...field} 
              />
              </>
            )}
            />
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
            name='phoneNumber'
            control={control}
            defaultValue=''
            rules={{required: 'This field is required'}}
            render={({field, fieldState: {error} }) =>(
              <>
              <CustomInput 
              type="tel" 
              placeholder='Phone number' 
              name='phoneNumber' 
              error={error}
              {...field} 
              />
              </>
            )}
            />
          <Controller
            name='address'
            control={control}
            defaultValue=''
            rules={{required: 'This field is required'}}
            render={({field, fieldState: {error} }) =>(
              <>
              <CustomInput 
              type="text" 
              placeholder='Address' 
              name='address' 
              error={error}
              {...field} 
              />
              </>
            )}
            />
            <Controller
              name='role'
              control={control}
              defaultValue=''
              rules={{ required: 'Role is required' }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Input type='select' {...field}>
                    <option value='' disabled>Select role</option>
                    <option value='admin'>Admin</option>
                    <option value='doctor'>Doctor</option>
                    <option value='patient'>Patient</option>
                  </Input>
                  {error && <span style={{ color: 'red' }}>{error.message}</span>}
                </>
              )}
            />
            
            {role === 'doctor' && (
                <>
          <Controller
            name='hospitalCode'
            control={control}
            defaultValue=''
            rules={{
            required: 'This field is required',
            minLength: { value: 6, message: 'Minimum 6 characters required' }
            }}
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
            
          <Controller
            name='gender'
            control={control}
            defaultValue=''
            render={({field, fieldState: {error} }) =>(
              <>
            <Input
            type='select' 
            {...field}
            >
              <option value='' disabled>Gender</option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
            </Input>
              </>
            )}
            />
          <Controller
            name='password'
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
         <Controller
            name='passwordConfirm'
            control={control}
            defaultValue=''
            rules={{
             required: 'This field is required',
             validate : (value)=> value === password || 'Password do not match',
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
              placeholder='Confirm Password' 
              name='passwordConfirm' 
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
            <div className='d-flex flex-row justify-content-end gap-3'>
            <CustomButton type='button' className='cancel-button' onClick={handleCancel} style={{color: 'var(--button-input-color)', backgroundColor: 'white', borderColor: 'var(--button-input-color)'}} >
              Cancel
            </CustomButton>
            <CustomButton type='submit'  className='sign-up-button' style={{color: 'white', backgroundColor: 'var(--button-input-color)'}}>
              Sign Up
            </CustomButton>
            </div>
          </form>
      </>
  )
}

export default RegisterForm