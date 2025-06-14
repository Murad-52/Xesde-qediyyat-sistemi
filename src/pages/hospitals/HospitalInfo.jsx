import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Input, Button, Card, CardBody, CardTitle, CardSubtitle, CardText, Spinner } from 'reactstrap';
import { FaStar } from 'react-icons/fa'; 
import hospitalImg from '../../assets/images/hospitals/f3324a3f746a41b1ba47f3498c964bac1cee81c8.jpg'
import Navbar from '../../components/navbar/Navbar'; 
import Footer from '../../components/footer/Footer'; 
import docNigar from '../../assets/images/homepage/medicalExpertsSecton/5a52c8ad45104697203ae9a5ce72c4f7216f8098.jpg'
import docElvin from '../../assets/images/homepage/medicalExpertsSecton/c9f779434fe0b7ec0ed37f3828ae44a59b3f10a5.jpg'
import docLeyla from '../../assets/images/homepage/medicalExpertsSecton/9a2d2477d4e6d99afd0bfdfaa87b7db6bb9be2db.jpg'

import './HospitalInfo.css'; 

const HospitalInfo = () => {
    const [hospitalData, setHospitalData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSpeciality, setSelectedSpeciality] = useState('');

 
    useEffect(() => {
        setTimeout(() => {
            setHospitalData({
                id: '1',
                name: 'Hospital 1',
                description: `At Hospital 1, we work closely with internationally renowned
                    hospitals to connect you with top-tier medical care. Our
                    partner institutions hold global accreditations, feature state-
                    of-the-art medical technology, and are led by some of the
                    most experienced healthcare professionals in the field.
                    Whether you’re seeking specialized treatments, complex
                    surgeries, or expert medical opinions, our reference hospitals
                    uphold the highest standards of care. From cardiology and
                    oncology to neurology and orthopedics, these facilities stand
                    at the cutting edge of innovation—delivering excellence in
                    every step of your healthcare journey..`,
                imageUrl: hospitalImg, 
                doctors: [
                    {
                        id: 'doc1',
                        name: 'Dr. Nigar Farac',
                        speciality: 'Psychologist',
                        clinic: 'Hospital Clinic',
                        rating: 5,
                        profileImage: docNigar
                    },
                    {
                        id: 'doc2',
                        name: 'Dr. Elvin Aliyev',
                        speciality: 'Cardiologist',
                        clinic: 'Heart Center',
                        rating: 4,
                        profileImage: docElvin
                    },
                    {
                        id: 'doc3',
                        name: 'Dr. Leyla Karimova',
                        speciality: 'Neurologist',
                        clinic: 'Brain Clinic',
                        rating: 5,
                        profileImage:docLeyla
                    }
                ],
                specialities: ['Psychologist', 'Cardiologist', 'Neurologist', 'Oncologist', 'Orthopedics']
            });
            setIsLoading(false);
        }, 1000); 
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSpecialityChange = (e) => {
        setSelectedSpeciality(e.target.value);
    };

    const filteredDoctors = hospitalData?.doctors.filter(doctor => {
        const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              doctor.speciality.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesSpeciality = selectedSpeciality === '' || doctor.speciality === selectedSpeciality;
        return matchesSearch && matchesSpeciality;
    });

    if (isLoading) {
        return (
            <>
                <Navbar />
                <main className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
                    <Spinner color="primary" />
                </main>
                <Footer />
            </>
        );
    }

    if (!hospitalData) {
        return (
            <>
                <Navbar />
                <main className="text-center py-5">
                    <h2>Xəstəxana məlumatları tapılmadı.</h2>
                </main>
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
                <Container className="my-4">
                    <Row className="mb-4">
                        <Col>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="category"><a href="/hospitals">Hospitals </a></li>
                                     <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                     <path fill-rule="evenodd" clip-rule="evenodd" d="M13.416 23.418C13.0011 23.0031 13.0011 22.3303 13.416 21.9154L18.3314 17L13.416 12.0847C13.0011 11.6697 13.0011 10.997 13.416 10.5821C13.8309 10.1671 14.5037 10.1671 14.9186 10.5821L20.5853 16.2487C21.0002 16.6637 21.0002 17.3364 20.5853 17.7513L14.9186 23.418C14.5037 23.8329 13.8309 23.8329 13.416 23.418Z" fill="#000E10"/>
                                     </svg>
 
                                    <li className="active-link active" aria-current="page">{hospitalData.name}</li>
                                </ol>
                            </nav>
                            <h1 className="hospital-name">{hospitalData.name}</h1>
                        </Col>
                    </Row>
                    <Row className=" hospital-description mb-5">
                        <Col md={8}>
                            <p>{hospitalData.description}</p>
                        </Col>
                        <Col md={4}>
                            <img src={hospitalData.imageUrl} alt={hospitalData.name} className="img-fluid rounded shadow-sm" />
                        </Col>
                    </Row>

                    <h3  style={{
                             fontWeight: 500,
                             fontSize: '40px',
                             lineHeight: '60px'
                             }}className="mb-3">Search doctors</h3>
                    <Row className="mb-4 align-items-center">
                        <Col md={6}>
                            <Input
                                type="text"
                                placeholder="Name, speciality"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="form-control"
                            />
                        </Col>
                        <Col md={3}>
                            <Input
                                type="select"
                                value={selectedSpeciality}
                                onChange={handleSpecialityChange}
                                className="form-select"
                            >
                                <option value="" className='speciality'>Speciality</option>
                                {hospitalData.specialities.map(speciality => (
                                    <option key={speciality} value={speciality}>{speciality}</option>
                                ))}
                            </Input>
                        </Col>
                        <Col md={3}>
                        </Col>
                    </Row>

                    <h3 className="mb-3">Featured Doctors</h3>
                    <Row>
                        {filteredDoctors && filteredDoctors.length > 0 ? (
                            filteredDoctors.map(doctor => (
                                <Col md={6}  key={doctor.id}>
                                    <Card className="shadow-sm w-100 mb-4 doctor-card">
                                        <CardBody className="d-flex align-items-center">
                                            <div className="doctor-image-container me-3">
                                                <img src={doctor.profileImage} alt={doctor.name} className="rounded-circle doctor-avatar" />
                                            </div>
                                            <div>
                                                <CardTitle tag="h5">{doctor.name}</CardTitle>
                                                <CardSubtitle className="mb-2 text-muted">{doctor.speciality}</CardSubtitle>
                                                <CardText className="text-muted">{doctor.clinic}</CardText>
                                                <div className="doctor-rating">
                                                    {[...Array(5)].map((_, i) => (
                                                        <FaStar key={i} color={i < doctor.rating ? "#ffc107" : "#e4e5e9"} />
                                                    ))}
                                                </div>
                                                <Button  className="bookBtn mt-2">Book Clinic Visit</Button>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <Col>
                                <p>No doctors found matching your criteria.</p>
                            </Col>
                        )}
                    </Row>
                </Container>
            </main>
            <footer style={{ backgroundColor: '#0A97B01A' }}>
                <Footer />
            </footer>
        </>
    );
};

export default HospitalInfo;