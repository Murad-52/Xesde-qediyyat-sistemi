import React, { useRef, useState, useEffect } from 'react';
import { Container, Row, Col, Button, FormGroup, Label, Input } from 'reactstrap';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useForm, Controller } from 'react-hook-form';
import placeholderImage from '../../assets/images/placeholderImage.jpg'; 

import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import './index.css'; 
import Instance from '../../api/Instance'; 

const DoctorProfile = () => {
    const getUserFromLocalStorage = () => {
        const storedUser = localStorage.getItem('user_data');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                if (parsedUser && parsedUser.id) {
                    return parsedUser;
                } else {
                    console.warn("Local storage-da 'user_data' tapıldı, lakin ID propertisi yoxdur. Məlumat təmizlənir.");
                    localStorage.removeItem('user_data');
                    localStorage.removeItem('token'); 
                    return null;
                }
            } catch (e) {
                console.error("Local storage-dakı 'user_data' JSON formatında deyil və ya zədələnib:", e);
                localStorage.removeItem('user_data');
                localStorage.removeItem('token');
                return null;
            }
        }
        return null;
    };

    const [userData, setUserData] = useState(getUserFromLocalStorage());
    const [profileImage, setProfileImage] = useState(userData?.profilePicture || placeholderImage); 
    const [tempImage, setTempImage] = useState(null); 
    const [isEditing, setIsEditing] = useState(false); 
    const fileInputRef = useRef(null);

    const { handleSubmit, control, setValue } = useForm({
        defaultValues: {
            name: userData?.firstName || '',
            surname: userData?.lastName || '',
            email: userData?.email || '',
            phone: userData?.phoneNumber || '', 
            fin: userData?.finCode || '',  
            hospitalCode: userData?.hospitalCode || '',
   
        }
    });

    useEffect(() => {
        const loadUserData = () => {
            const user = getUserFromLocalStorage();
            setUserData(user); 
            if (user) {
                setValue('name', user.firstName || '');
                setValue('surname', user.lastName || '');
                setValue('email', user.email || '');
                setValue('phone', user.phoneNumber || ''); 
                setValue('fin', user.finCode || '');     
                setValue('hospitalCode', user.hospitalCode || '');
                setProfileImage(user.profilePicture || placeholderImage); 
            } else {
             
                setValue('name', '');
                setValue('surname', '');
                setValue('email', '');
                setValue('phone', '');
                setValue('fin', '');
                setValue('hospitalCode', '');
                setProfileImage(placeholderImage);
            }
        };

        loadUserData(); 
        window.addEventListener('storage', loadUserData);
        return () => {
            window.removeEventListener('storage', loadUserData);
        };
    }, [setValue]); 

    const onSubmit = async (data) => {
        if (!userData || !userData.id) {
            alert('User data not found for update. Please log in again.');
            return;
        }

        let updatedDataForApi = {
            ...userData, 
            firstName: data.name,
            lastName: data.surname,
            email: data.email,
            phoneNumber: data.phone,
            finCode: data.fin,
            hospitalCode: data.hospitalCode,
            specialization: data.specialization,
            experience: data.experience,
            address: data.address,
            birthDate: data.birthDate,
            gender: data.gender,
        };

  
        if (fileInputRef.current && fileInputRef.current.files[0]) {
            const file = fileInputRef.current.files[0];
            const reader = new FileReader();

            reader.onloadend = async () => {
                updatedDataForApi.profilePicture = reader.result; 
                try {
                    const response = await Instance.put(`/users/${userData.id}`, updatedDataForApi);
                    if (response.status === 200) {
                        localStorage.setItem('user_data', JSON.stringify(response.data));
                        setUserData(response.data);
                        setProfileImage(response.data.profilePicture || placeholderImage);
                        alert('Changes saved successfully!');
                        setIsEditing(false); 
                        setTempImage(null);           
                      } else {
                        alert('An error occurred while saving changes.');
                    }
                } catch (error) {
                    console.error("Profile update error:", error);
                    alert('An error occurred. Please try again.');
                }
            };
            reader.readAsDataURL(file);
        } else {
            if (profileImage === placeholderImage) {
                updatedDataForApi.profilePicture = ''; 
            } else {
                updatedDataForApi.profilePicture = profileImage; 
            }

            try {
                const response = await Instance.put(`/users/${userData.id}`, updatedDataForApi);
                if (response.status === 200) {
                    localStorage.setItem('user_data', JSON.stringify(response.data));
                    setUserData(response.data);
                    setProfileImage(response.data.profilePicture || placeholderImage);
                    alert('Changes saved successfully!');
                    setIsEditing(false); 
                    setTempImage(null); 
                } else {
                    alert('An error occurred while saving changes.');
                }
            } catch (error) {
                console.error("Profile update error:", error);
                alert('An error occurred. Please try again.');
            }
        }
    };

    const handleEditImageClick = () => {
        fileInputRef.current.click();
        setIsEditing(true); 
    };

    const handleCancel = () => {
        setTempImage(null); 
        setIsEditing(false); 
        setProfileImage(userData?.profilePicture || placeholderImage);
        setValue('name', userData?.firstName || '');
        setValue('surname', userData?.lastName || '');
        setValue('email', userData?.email || '');
        setValue('phone', userData?.phoneNumber || '');
        setValue('fin', userData?.finCode || '');
        setValue('hospitalCode', userData?.hospitalCode || '');
     
    };

    const handleSaveImage = () => {
        if (tempImage) {
            setProfileImage(tempImage);
        }
        setIsEditing(false); 
        setTempImage(null); 
    };

    const handleDeleteImage = async () => {
        if (window.confirm("Are you sure you want to delete your profile picture?")) {
            setProfileImage(placeholderImage); 
            setTempImage(null);
            setIsEditing(false); 

            if (userData && userData.id) {
                try {
                    const updatedUser = { ...userData, profilePicture: '' }; 
                    const response = await Instance.put(`/users/${userData.id}`, updatedUser);

                    if (response.status === 200) {
                        localStorage.setItem('user_data', JSON.stringify(response.data));
                        setUserData(response.data); 
                        alert('Profile picture deleted successfully!');
                    } else {
                        alert('An error occurred while deleting profile picture from server.');
                    }
                } catch (error) {
                    console.error('Error deleting profile picture:', error);
                    alert('Error deleting profile picture. Please try again.');
                }
            }
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setTempImage(imageUrl);
        }
    };

    if (!userData) {
        return (
            <>
                <Navbar />
                <Container className="text-center my-5">
                    <h2>Loading profile...</h2>
                </Container>
                <Footer />
            </>
        );
    }

    return (
        <>
            <header>
                <Navbar />
            </header>
            <main>
                <div className="doctor-profile-section">
                    <Container>
                        <h2 className="profile-heading mt-4 mb-4">Doctor Profile</h2>
                        <Row>
                            <Col md={8} className="profile-form-col">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <FormGroup row className="mb-3">
                                        <Label for="name" sm={3} className="profile-label">Name:</Label>
                                        <Col sm={9}>
                                            <Controller
                                                name="name"
                                                control={control}
                                                render={({ field }) => (
                                                    <Input
                                                        type="text"
                                                        id="name"
                                                        {...field}
                                                        className="profile-input"
                                                    />
                                                )}
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row className="mb-3">
                                        <Label for="surname" sm={3} className="profile-label">Surname:</Label>
                                        <Col sm={9}>
                                            <Controller
                                                name="surname"
                                                control={control}
                                                render={({ field }) => (
                                                    <Input
                                                        type="text"
                                                        id="surname"
                                                        {...field}
                                                        className="profile-input"
                                                    />
                                                )}
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row className="mb-3">
                                        <Label for="email" sm={3} className="profile-label">Email:</Label>
                                        <Col sm={9}>
                                            <Controller
                                                name="email"
                                                control={control}
                                                render={({ field }) => (
                                                    <Input
                                                        type="email"
                                                        id="email"
                                                        {...field}
                                                        className="profile-input"
                                                    />
                                                )}
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row className="mb-3">
                                        <Label for="phone" sm={3} className="profile-label">Phone:</Label>
                                        <Col sm={9}>
                                            <Controller
                                                name="phone"
                                                control={control}
                                                render={({ field }) => (
                                                    <Input
                                                        type="tel"
                                                        id="phone"
                                                        {...field}
                                                        className="profile-input"
                                                    />
                                                )}
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row className="mb-3">
                                        <Label for="fin" sm={3} className="profile-label">FIN:</Label>
                                        <Col sm={9}>
                                            <Controller
                                                name="fin"
                                                control={control}
                                                render={({ field }) => (
                                                    <Input
                                                        type="text"
                                                        id="fin"
                                                        {...field}
                                                        readOnly 
                                                        className="profile-input-readonly"
                                                    />
                                                )}
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row className="mb-3">
                                        <Label for="hospitalCode" sm={3} className="profile-label">H/Code:</Label>
                                        <Col sm={9}>
                                            <Controller
                                                name="hospitalCode"
                                                control={control}
                                                render={({ field }) => (
                                                    <Input
                                                        type="text"
                                                        id="hospitalCode"
                                                        {...field}
                                                        readOnly 
                                                        className="profile-input-readonly"
                                                    />
                                                )}
                                            />
                                        </Col>
                                    </FormGroup>

                                    <Row className="mt-4">
                                        <Col sm={{ size: 9, offset: 3 }}>
                                            <Button type="submit" color="primary" className="save-changes-button">
                                                Save changes
                                            </Button>
                                        </Col>
                                    </Row>
                                </form>
                            </Col>
                            <Col md={4} className="text-center profile-image-col">
                                <div className="profile-image-container">
                                    <img
                                        src={tempImage || profileImage}
                                        alt="Profile Avatar"
                                        className="profile-avatar rounded-circle img-fluid"
                                    />
                                    <div className="profile-image-buttons mt-3">
                                        {!isEditing && ( 
                                            <Button
                                                color="outline-success"
                                                size="sm"
                                                className="me-2 profile-action-btn"
                                                onClick={handleEditImageClick}
                                            >
                                                <FaEdit />
                                            </Button>
                                        )}

                                        <Button
                                            color="outline-danger"
                                            size="sm"
                                            className="profile-action-btn"
                                            onClick={handleDeleteImage}
                                        >
                                            <FaTrashAlt />
                                        </Button>
                                    </div>

                               
                                    <input
                                        type="file"
                                        accept="image/*"
                                        ref={fileInputRef}
                                        onChange={handleImageChange}
                                        style={{ display: 'none' }}
                                    />

                                 
                                    {isEditing && (
                                        <div className="mt-3">
                                            <div className="mt-2">
                                                <Button color="primary" size="sm" className="me-2" onClick={handleSaveImage}>
                                                    Confirm Image
                                                </Button>
                                                <Button color="secondary" size="sm" onClick={handleCancel}>
                                                    Cancel
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                    <small className="text-muted record-link">Record: <a href="#view-record">View record</a></small>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </main>
            <footer style={{ backgroundColor: '#0A97B01A' }}>
                <Footer />
            </footer>
        </>
    );
};

export default DoctorProfile;