import React, { useEffect, useRef, useState } from 'react';
import { Container, Row, Col, Button, FormGroup, Label, Input, Spinner } from 'reactstrap'; 
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useForm, Controller } from 'react-hook-form';
import placeholderImage from '../../assets/images/placeholderImage.jpg';

import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import './index.css';
import axios from 'axios'; 

const MOCK_API_BASE_URL = 'https://68441fab71eb5d1be0327556.mockapi.io'; 



const Profile = () => {
    const [profileImage, setProfileImage] = useState(placeholderImage);
    const [tempImage, setTempImage] = useState(null);
    const [isEditingImage, setIsEditingImage] = useState(false); 
    const [isLoading, setIsLoading] = useState(false); 
    const fileInputRef = useRef(null);

    const { handleSubmit, control, setValue } = useForm({
        defaultValues: {
            name: '',
            surname: '',
            email: '',
            phone: '',
            fin: '',
            id: '',
        }
    });

    useEffect(() => {
        const fetchUserProfile = async () => {
            setIsLoading(true); 
            try {
                const storedUser = JSON.parse(localStorage.getItem('user')); 
                console.log("Local Storage'dan gələn istifadəçi:", storedUser); 

                if (storedUser && storedUser.id) {
                    const userId = storedUser.id;
                    const response = await axios.get(`${MOCK_API_BASE_URL}/users/${userId}`); 
                    
                    if (response.status === 200) {
                        const userData = response.data;
                        console.log("API-dən gələn istifadəçi məlumatı:", userData); 
                        
                        setValue('name', userData.name || userData.firstName || ''); 
                        setValue('surname', userData.surname || userData.lastName || '');
                        setValue('email', userData.email || '');
                        setValue('phone', userData.phone || userData.phoneNumber || '');
                        setValue('fin', userData.fin || userData.finCode || '');
                        setValue('id', userData.id || ''); 

                        if (userData.profilePictureUrl) {
                            setProfileImage(userData.profilePictureUrl);
                        } else {
                            setProfileImage(placeholderImage); 
                        }
                    } else {
                        setValue('name', storedUser.firstName || storedUser.name || '');
                        setValue('surname', storedUser.lastName || storedUser.surname || '');
                        setValue('email', storedUser.email || '');
                        setValue('phone', storedUser.phoneNumber || storedUser.phone || '');
                        setValue('fin', storedUser.finCode || storedUser.fin || '');
                        setValue('id', storedUser.id || '');
                        if (storedUser.profilePictureUrl) {
                            setProfileImage(storedUser.profilePictureUrl);
                        } else {
                            setProfileImage(placeholderImage);
                        }
                        console.warn("Profil məlumatları API-dən gətirilə bilmədi. LocalStorage istifadə edildi.");
                    }
                } else {
                    console.warn("Local storage-da istifadəçi məlumatı tapılmadı və ya ID yoxdur.");
                    setValue('name', '');
                    setValue('surname', '');
                    setValue('email', '');
                    setValue('phone', '');
                    setValue('fin', '');
                    setValue('id', '');
                }
            } catch (error) {
                console.error('Profil məlumatları yüklənərkən xəta baş verdi:', error);
                alert('Profil məlumatları yüklənərkən xəta baş verdi. Zəhmət olmasa konsolu yoxlayın.');
                const storedUser = JSON.parse(localStorage.getItem('user'));
                if (storedUser) {
                    setValue('name', storedUser.firstName || storedUser.name || '');
                    setValue('surname', storedUser.lastName || storedUser.surname || '');
                    setValue('email', storedUser.email || '');
                    setValue('phone', storedUser.phoneNumber || storedUser.phone || '');
                    setValue('fin', storedUser.finCode || storedUser.fin || '');
                    setValue('id', storedUser.id || '');
                    if (storedUser.profilePictureUrl) {
                        setProfileImage(storedUser.profilePictureUrl);
                    } else {
                        setProfileImage(placeholderImage);
                    }
                }
            } finally {
                setIsLoading(false); 
            }
        };

        fetchUserProfile();
    }, [setValue]); 

    const onSubmit = async (data) => {
        setIsLoading(true); 
        try {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (!storedUser || !storedUser.id) {
                alert('İstifadəçi ID-si tapılmadı. Profil yenilənə bilmədi.');
                setIsLoading(false);
                return;
            }

            const userId = storedUser.id;

            const response = await axios.put(`${MOCK_API_BASE_URL}/users/${userId}`, { 
                name: data.name, 
                surname: data.surname, 
                email: data.email,
                phone: data.phone, 
            });

            if (response.status === 200) {
                alert('Profil məlumatları uğurla yeniləndi!');
                localStorage.setItem('user', JSON.stringify({
                    ...storedUser,
                    name: data.name, 
                    surname: data.surname,
                    email: data.email,
                    phone: data.phone,
                }));
            } else {
                alert('Profil məlumatları yenilənərkən xəta baş verdi: ' + response.statusText);
            }
        } catch (error) {
            console.error('Profil məlumatları yenilənərkən xəta:', error);
            alert('Profil məlumatları yenilənərkən gözlənilməyən xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.');
        } finally {
            setIsLoading(false); 
        }
    };

    const handleEditImageClick = () => {
        fileInputRef.current.click();
        setIsEditingImage(true);
    };

    const handleCancelImageEdit = () => {
        setTempImage(null); 
        setIsEditingImage(false);
    };

    const handleSaveImage = async () => {
        setIsLoading(true); 
        if (tempImage) {
            const fileToUpload = fileInputRef.current.files[0];
            if (fileToUpload) {
                const formData = new FormData();
                formData.append('profilePicture', fileToUpload);

                try {
                    const storedUser = JSON.parse(localStorage.getItem('user'));
                    if (!storedUser || !storedUser.id) {
                        alert('İstifadəçi ID-si tapılmadı. Şəkil yüklənmədi.');
                        setIsLoading(false);
                        return;
                    }
                    const userId = storedUser.id;

                    const newImageUrl = tempImage;
                    
                    const response = await axios.put(`${MOCK_API_BASE_URL}/users/${userId}`, { 
                        profilePictureUrl: newImageUrl, 
                    });

                    if (response.status === 200) {
                        setProfileImage(newImageUrl); 
                        alert('Profil şəkli uğurla yükləndi!');
                        localStorage.setItem('user', JSON.stringify({
                            ...storedUser,
                            profilePictureUrl: newImageUrl,
                        }));
                    } else {
                        alert('Şəkil yüklənərkən xəta baş verdi: ' + response.statusText);
                    }
                } catch (error) {
                    console.error('Şəkil yüklənərkən xəta baş verdi:', error);
                    alert('Şəkil yüklənərkən gözlənilməyən xəta baş verdi!');
                } finally {
                    setIsLoading(false); 
                }
            }
        }
        setTempImage(null);
        setIsEditingImage(false);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setTempImage(imageUrl);
        }
    };

    const handleDeleteImage = async () => {
        if (window.confirm("Profil şəklini silmək istədiyinizə əminsiniz?")) {
            setIsLoading(true); 
            try {
                const storedUser = JSON.parse(localStorage.getItem('user'));
                if (!storedUser || !storedUser.id) {
                    alert('İstifadəçi ID-si tapılmadı. Şəkil silinmədi.');
                    setIsLoading(false);
                    return;
                }
                const userId = storedUser.id;

                const response = await axios.put(`${MOCK_API_BASE_URL}/users/${userId}`, {
                    profilePictureUrl: null,
                });

                if (response.status === 200) {
                    setProfileImage(placeholderImage);
                    setTempImage(null);
                    setIsEditingImage(false);
                    alert('Profil şəkli uğurla silindi!');
                    localStorage.setItem('user', JSON.stringify({
                        ...storedUser,
                        profilePictureUrl: null, 
                    }));
                } else {
                    alert('Şəkil silinərkən xəta baş verdi: ' + response.statusText);
                }
            } catch (error) {
                console.error('Şəkil silinərkən xəta baş verdi:', error);
                alert('Şəkil silinərkən gözlənilməyən xəta baş verdi!');
            } finally {
                setIsLoading(false); 
            }
        }
    };

    return (
        <>
            <header>
                <Navbar />
            </header>
            <main>
                <div className="patient-profile-section">
                    <Container>
                        <h2 className="profile-heading mt-4 mb-4">Profile</h2>
                        <Row>
                            <Col md={8} className="profile-form-col">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <FormGroup row className="mb-3">
                                        <Label for="name" sm={3} className="profile-label">Ad:</Label>
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
                                        <Label for="surname" sm={3} className="profile-label">Soyad:</Label>
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
                                        <Label for="phone" sm={3} className="profile-label">Telefon:</Label>
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
                                        <Label for="fin" sm={3} className="profile-label">FİN:</Label>
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
                                        <Label for="id" sm={3} className="profile-label">ID:</Label>
                                        <Col sm={9}>
                                            <Controller
                                                name="id"
                                                control={control}
                                                render={({ field }) => (
                                                    <Input
                                                        type="text"
                                                        id="id"
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
                                            <Button type="submit" color="primary" className="save-changes-button" disabled={isLoading}>
                                                {isLoading ? <Spinner size="sm" color="light" /> : 'Dəyişiklikləri Yadda Saxla'}
                                            </Button>
                                        </Col>
                                    </Row>
                                </form>
                            </Col>
                            <Col md={4} className="text-center profile-image-col">
                                <div className="profile-image-container">
                                    <img
                                        src={tempImage || profileImage}
                                        alt="Profil Şəkli"
                                        className="profile-avatar rounded-circle img-fluid"
                                    />
                                    <div className="profile-image-buttons mt-3">
                                        {!isEditingImage && (
                                            <Button
                                                color="outline-success"
                                                size="sm"
                                                className="me-2 profile-action-btn"
                                                onClick={handleEditImageClick}
                                                disabled={isLoading}
                                            >
                                                <FaEdit />
                                            </Button>
                                        )}
                                        <Button
                                            color="outline-danger"
                                            size="sm"
                                            className="profile-action-btn"
                                            onClick={handleDeleteImage}
                                            disabled={isLoading}
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

                                    {isEditingImage && (
                                        <div className="mt-3">
                                            <div className="mt-2">
                                                <Button color="primary" size="sm" className="me-2" onClick={handleSaveImage} disabled={isLoading}>
                                                    {isLoading ? <Spinner size="sm" color="light" /> : 'Təsdiqlə'}
                                                </Button>
                                                <Button color="secondary" size="sm" onClick={handleCancelImageEdit} disabled={isLoading}>
                                                  Cancel
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                    <small className="text-muted record-link">Records: <a href="/records">View Record</a></small>
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

export default Profile;