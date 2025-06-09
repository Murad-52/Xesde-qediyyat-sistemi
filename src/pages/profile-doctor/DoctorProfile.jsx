import React, { useRef, useState } from 'react';
import { Container, Row, Col, Button, FormGroup, Label, Input } from 'reactstrap';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useForm, Controller } from 'react-hook-form';
import placeholderImage from '../../assets/images/placeholderImage.jpg'; 

import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import './index.css'; 

const DoctorProfile = () => {


    const onSubmit = (data) => {
        alert('Dəyişikliklər saxlandı!');
        console.log("Form datası:", data);
        //api olaca q
    };

    const [profileImage, setProfileImage] = useState(placeholderImage);
    const [tempImage, setTempImage] = useState(null); 
    const [isEditing, setIsEditing] = useState(false); 
        const { handleSubmit, control, setValue } = useForm()
    

    const fileInputRef = useRef(null);

    const handleEditImageClick = () => { 
        fileInputRef.current.click(); 
        setIsEditing(true); 
    };


    const handleCancel = () => {
        setTempImage(null);
        setIsEditing(false); 
    };

   
    const handleSave = () => {
        if (tempImage) {
            setProfileImage(tempImage); 
            // api olcaq
            
            const fileToUpload = fileInputRef.current.files[0];
            if (fileToUpload) {
                const formData = new FormData();
                formData.append('profilePicture', fileToUpload);

                fetch('/api/upload-profile-picture', {
                    method: 'POST',
                    body: formData,
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Server cavabı şəkil yükləndikdən sonra:', data);
                    if (data.newImageUrl) {
                        setProfileImage(data.newImageUrl);
                    }
                })
                .catch(error => {
                    console.error('Şəkil yüklənərkən xəta baş verdi:', error);
                    alert('Şəkil yüklənərkən xəta baş verdi!');
                });
            }
        }
        setTempImage(null); 
        setIsEditing(false);
    };

    
    const handleImageChange = (e) => { 
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setTempImage(imageUrl); 
            
        }
    };


    const handleDeleteImage = () => {
        if (window.confirm("Profil şəklini silmək istədiyinizə əminsiniz?")) {
            setProfileImage(placeholderImage); 
            setTempImage(null);
            setIsEditing(false);

            //  api olacaq
            console.log("Şəkil silindi.");
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
                                                <Button color="primary" size="sm" className="me-2" onClick={handleSave}>
                                                    Təsdiqlə
                                                </Button>
                                                <Button color="secondary" size="sm" onClick={handleCancel}>
                                                    Ləğv et
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