import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import CustomInput from '../components/custom-input/CustomInput'; // Adjust this path according to your project
import CustomButton from '../components/button/CustomButton';   // Adjust this path according to your project
import { Input, InputGroup, InputGroupText } from 'reactstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../assets/styles/variables.css';
import ResetPasswordModal from '../components/modals/ResetPasswordModal'; // Adjust this path according to your project
import Instance from '../api/Instance'; // Adjust this path according to your project

const LogInForm = () => {
    const { control, handleSubmit, watch } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const role = watch('role');
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setErrorMessage(''); // Clear error message on each submit
        try {
            // Search for the user in the API based on email, password, AND role
            const response = await Instance.get(`/users`, {
                params: {
                    email: data.email,
                    password: data.password,
                    role: data.role 
                }
            });

            if (response.data.length > 0) {
                const user = response.data[0]; // Take the first found user

                // Additional check: if the user's role from API does not match the role in the form
                if (user.role !== data.role) {
                    setErrorMessage(`You are registered as a ${user.role}. Please select the correct role to log in.`);
                    return;
                }

                // Hospital code check for doctors
                if (data.role === 'doctor' && user.hospitalCode !== data.hospitalCode) {
                    setErrorMessage('Hospital code is incorrect.');
                    return;
                }

                // If everything is correct, save user data to local storage
                localStorage.setItem('user_data', JSON.stringify(user)); 
                alert("Successfully logged in!");

                // Redirect based on role
                if (user.role === 'admin') {
                    navigate('/admin-dashboard');
                } else if (user.role === 'doctor') {
                    navigate('/'); // You can change this to '/doctor-profile' or other relevant path
                } else if (user.role === 'patient') {
                    navigate('/'); // You can change this to '/patient-profile' or other relevant path
                } else {
                    navigate('/');
                }

            } else {
                setErrorMessage('Invalid email, password, or role.');
            }
        } catch (error) {
            console.error("Login Error:", error);
            setErrorMessage('Login failed. Please try again. (Network/Server Error)');
        }
    };

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
    const toggleModalForgotPassword = () => setModalOpen((prev) => !prev);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className='d-flex flex-column gap-3 width-3'>
                <h1 className='heading'>Login to Hospital</h1>
                {errorMessage && (
                    <div style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>
                        {errorMessage}
                    </div>
                )}
                <Controller
                    name='email'
                    control={control}
                    defaultValue=''
                    rules={{ required: 'This field is required' }}
                    render={({ field, fieldState: { error } }) => (
                        <>
                            <CustomInput
                                type="email"
                                placeholder='Email Address'
                                name='email'
                                error={error}
                                {...field}
                            />
                            {error && <span style={{ color: 'red' }}>{error.message}</span>}
                        </>
                    )}
                />
                <Controller
                    name='password'
                    control={control}
                    defaultValue=''
                    rules={{ required: 'This field is required' }}
                    render={({ field, fieldState: { error } }) => (
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
                            {error && <span style={{ color: 'red' }}>{error.message}</span>}
                        </>
                    )}
                />
                <Controller
                    name='role'
                    control={control}
                    defaultValue='' 
                    rules={{ required: 'Please select a role' }}
                    render={({ field, fieldState: { error } }) => (
                        <>
                            <Input
                                type='select'
                                {...field}
                            >
                                <option value='' disabled>Select Your Role</option>
                                <option value='doctor'>Doctor</option>
                                <option value='patient'>Patient</option>
                                <option value='admin'>Admin</option>
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
                            rules={{ required: 'This field is required' }}
                            render={({ field, fieldState: { error } }) => (
                                <>
                                    <CustomInput
                                        type="number"
                                        placeholder='Hospital Code'
                                        name='hospitalCode'
                                        error={error}
                                        {...field}
                                    />
                                    {error && <span style={{ color: 'red' }}>{error.message}</span>}
                                </>
                            )}
                        />
                    </>
                )}
                <a style={{ textAlign: 'end', textDecoration: 'underline', cursor: 'pointer' }} onClick={toggleModalForgotPassword} >Forgot password?</a>
                <ResetPasswordModal
                    isOpen={modalOpen}
                    toggle={toggleModalForgotPassword}
                />

                <div className='d-flex flex-row justify-content-end gap-3'>
                    <CustomButton type='submit' className='sign-up-button' style={{ color: 'var(--text-color)', backgroundColor: 'var(--button-input-color)' }}>
                        Login
                    </CustomButton>
                </div>
            </form>
        </>
    );
}

export default LogInForm;