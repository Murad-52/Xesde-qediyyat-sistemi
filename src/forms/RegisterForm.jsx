import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import CustomInput from '../components/custom-input/CustomInput'; // Adjust this path according to your project
import CustomButton from '../components/button/CustomButton';   // Adjust this path according to your project
import { Input, InputGroup, InputGroupText } from 'reactstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../assets/styles/variables.css';
import Instance from '../api/Instance'; // Adjust this path according to your project

const RegisterForm = () => {
    const { control, handleSubmit, reset, setValue, watch } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [registeredUsers, setRegisteredUsers] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const role = watch('role');

    const password = watch('password');
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setErrorMessage(''); // Clear error message on each submit

        const userExists = registeredUsers.some(
            (user) => user.email.toLowerCase() === data.email.toLowerCase()
        );

        if (userExists) {
            setErrorMessage('This user already exists.');
            return;
        }

        let profilePictureBase64 = '';
        if (data.profilePicture && data.profilePicture.length > 0) {
            const file = data.profilePicture[0];
            const reader = new FileReader();

            reader.onloadend = async () => {
                profilePictureBase64 = reader.result;
                const userDataToSave = { ...data, profilePicture: profilePictureBase64 };
                delete userDataToSave.passwordConfirm; 
                
                try {
                    const response = await Instance.post('/users', userDataToSave);
                    if (response.status === 201) {
                        alert('Registration completed successfully!');
                        reset();
                        localStorage.setItem('user_data', JSON.stringify(response.data)); // Save newly registered user to local storage
                        navigate('/'); 
                    } else {
                        setErrorMessage('An error occurred during registration.');
                    }
                } catch (error) {
                    console.error("Registration Error:", error);
                    setErrorMessage('An error occurred. Please try again.');
                }
            };
            reader.readAsDataURL(file);
        } else {
            // If no image is uploaded, send other data
            const userDataToSave = { ...data, profilePicture: '' }; // Empty string if no image
            delete userDataToSave.passwordConfirm;

            try {
                const response = await Instance.post('/users', userDataToSave);
                if (response.status === 201) {
                    alert('Registration completed successfully!');
                    reset();
                    localStorage.setItem('user_data', JSON.stringify(response.data)); // Save newly registered user to local storage
                    navigate('/');
                } else {
                    setErrorMessage('An error occurred during registration.');
                }
            } catch (error) {
                console.error("Registration Error:", error);
                setErrorMessage('An error occurred. Please try again.');
            }
        }
    };

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

    const handleCancel = () => {
        reset();
        navigate('/');
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    return (
        <>
            <form action="" onSubmit={handleSubmit(onSubmit)} className='d-flex flex-column gap-1 m-0 '>
                <h1 className='heading'>Create Account</h1>
                {errorMessage && (
                    <div style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</div>
                )}

                <Controller
                    name='firstName'
                    control={control}
                    defaultValue=''
                    rules={{ required: 'This field is required' }}
                    render={({ field, fieldState: { error } }) => (
                        <>
                            <CustomInput
                                type="text"
                                placeholder='First Name'
                                name='firstName'
                                error={error}
                                {...field}
                            />
                            {error && <span style={{ color: 'red' }}>{error.message}</span>}
                        </>
                    )}
                />
                <Controller
                    name='lastName'
                    control={control}
                    defaultValue=''
                    rules={{ required: 'This field is required' }}
                    render={({ field, fieldState: { error } }) => (
                        <>
                            <CustomInput
                                type="text"
                                placeholder='Last Name'
                                name='lastName'
                                error={error}
                                {...field}
                            />
                            {error && <span style={{ color: 'red' }}>{error.message}</span>}
                        </>
                    )}
                />
                <Controller
                    name='birthDate'
                    control={control}
                    defaultValue=''
                    rules={{ required: 'This field is required' }}
                    render={({ field, fieldState: { error } }) => (
                        <>
                            <CustomInput
                                type="date"
                                placeholder='Birth Date'
                                name='birthDate'
                                error={error}
                                {...field}
                            />
                            {error && <span style={{ color: 'red' }}>{error.message}</span>}
                        </>
                    )}
                />
                <Controller
                    name='finCode'
                    control={control}
                    defaultValue=''
                    rules={{ required: 'This field is required', minLength: { value: 7, message: 'FIN code must be 7 characters' }, maxLength: { value: 7, message: 'FIN code must be 7 characters' } }}
                    render={({ field, fieldState: { error } }) => (
                        <>
                            <CustomInput
                                type="text"
                                placeholder='FIN Code'
                                name='finCode'
                                error={error}
                                {...field}
                            />
                            {error && <span style={{ color: 'red' }}>{error.message}</span>}
                        </>
                    )}
                />
                <Controller
                    name='email'
                    control={control}
                    defaultValue=''
                    rules={{
                        required: 'This field is required', pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: "Invalid email address"
                        }
                    }}
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
                    name='phoneNumber'
                    control={control}
                    defaultValue=''
                    rules={{
                        required: 'This field is required', pattern: {
                            value: /^\+?\d{9,13}$/, 
                            message: "Invalid phone number format (e.g., +994XXXXXXXXX)"
                        }
                    }}
                    render={({ field, fieldState: { error } }) => (
                        <>
                            <CustomInput
                                type="tel"
                                placeholder='Phone Number'
                                name='phoneNumber'
                                error={error}
                                {...field}
                            />
                            {error && <span style={{ color: 'red' }}>{error.message}</span>}
                        </>
                    )}
                />
                <Controller
                    name='address'
                    control={control}
                    defaultValue=''
                    rules={{ required: 'This field is required' }}
                    render={({ field, fieldState: { error } }) => (
                        <>
                            <CustomInput
                                type="text"
                                placeholder='Address'
                                name='address'
                                error={error}
                                {...field}
                            />
                            {error && <span style={{ color: 'red' }}>{error.message}</span>}
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
                                <option value='' disabled>Select Role</option>
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

                <Controller
                    name='gender'
                    control={control}
                    defaultValue=''
                    rules={{ required: 'Gender is required' }}
                    render={({ field, fieldState: { error } }) => (
                        <>
                            <Input
                                type='select'
                                {...field}
                            >
                                <option value='' disabled>Gender</option>
                                <option value='male'>Male</option>
                                <option value='female'>Female</option>
                            </Input>
                            {error && <span style={{ color: 'red' }}>{error.message}</span>}
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
                            message: 'At least one uppercase letter, lowercase letter, and number must be present'
                        }
                    }}
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
                    name='passwordConfirm'
                    control={control}
                    defaultValue=''
                    rules={{
                        required: 'This field is required',
                        validate: (value) => value === password || 'Passwords do not match',
                        minLength: { value: 6, message: 'Minimum 6 characters required' },
                        pattern: {
                            value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
                            message: 'At least one uppercase letter, lowercase letter, and number must be present'
                        }
                    }}
                    render={({ field, fieldState: { error } }) => (
                        <>
                            <InputGroup>
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='Confirm Password'
                                    name='passwordConfirm'
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
                <div className='d-flex flex-row justify-content-end gap-3'>
                    <CustomButton type='button' className='cancel-button' onClick={handleCancel} style={{ color: 'var(--button-input-color)', backgroundColor: 'white', borderColor: 'var(--button-input-color)' }} >
                        Cancel
                    </CustomButton>
                    <CustomButton type='submit' className='sign-up-button' style={{ color: 'white', backgroundColor: 'var(--button-input-color)' }}>
                        Sign Up
                    </CustomButton>
                </div>
            </form>
        </>
    );
};

export default RegisterForm;