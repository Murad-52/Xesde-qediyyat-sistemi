import React, { useState } from 'react';
import { Container, Row, Col, InputGroup, Input, Button } from 'reactstrap';
import { FaSearch, FaStar, FaFilter, FaMapMarkerAlt } from 'react-icons/fa'; 
import placeholderImage from '../../assets/images/placeholderImage.jpg'
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import docNigar from '../../assets/images/homepage/medicalExpertsSecton/5a52c8ad45104697203ae9a5ce72c4f7216f8098.jpg';
import docKamal from '../../assets/images/homepage/medicalExpertsSecton/c9f779434fe0b7ec0ed37f3828ae44a59b3f10a5.jpg'


import './index.css';

const doctorsData = [
    {
        id: 1,
        name: 'Dr. Nigar Farac',
        specialty: 'Psychologist',
        hospital: 'Hospital A',
        rating: 4.5, 
        image: docNigar
    },
    {
        id: 2,
        name: 'Dr. Kamal Qurbanov',
        specialty: 'Cardiologist',
        hospital: 'Hospital B',
        rating: 4.0,
        image: docKamal
    }

];

const Doctors = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredDoctors, setFilteredDoctors] = useState(doctorsData);

    
    const handleSearch = () => {
        const query = searchQuery.toLowerCase();
        const results = doctorsData.filter(doctor =>
            doctor.name.toLowerCase().includes(query) ||
            doctor.specialty.toLowerCase().includes(query) ||
            doctor.hospital.toLowerCase().includes(query)
        );
        setFilteredDoctors(results);
    };


    const handleFilter = () => {
        alert('Filter seçimləri burada açılacaq!');
        
    };

    
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            if (rating - i >= 1) {
                stars.push(<FaStar  key={i} className='star-icon filled' />);
            } else if (rating - i > 0) {
              
                stars.push(<FaStar key={i} style={{ color: '#f39c12' }} />);
            } else {
                stars.push(<FaStar key={i} style={{ color: '#e0e0e0' }} />);
            }
        }
        return stars;
    };
    return (
        <>
            <header>
                <Navbar />
            </header>
          <main className="doctors-page-main">
                <div className="doctors-page-section">
                    <Container>
                        <Row className="mb-4">
                            <Col className="text-center">
                                <h1 className="main-heading">Find the Right Doctor for Your Health</h1>
                                <p className="sub-heading">Search by specialization and book your appointment</p>
                            </Col>
                        </Row>

                        <Row className="mb-5 justify-content-center">
                            <Col md={8}>
                                <InputGroup className="search-input-group">
                                    <Input
                                        type="text"
                                        placeholder="Name, speciality, hospital"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                handleSearch();
                                            }
                                        }}
                                        className="search-input"
                                    />
                                    <Button color="link" onClick={handleSearch} className="search-icon-button">
                                        <FaSearch />
                                    </Button>
                                    <Button color="secondary" onClick={handleFilter} className="filter-button ms-2">
                                        <FaFilter /> Filter
                                    </Button>
                                </InputGroup>
                            </Col>
                        </Row>

                        <h3 className="featured-doctors-heading mb-4">Featured Doctors</h3>

                        {filteredDoctors.length === 0 ? (
                            <p className="text-center text-muted">Axtarışınıza uyğun həkim tapılmadı.</p>
                        ) : (
                            filteredDoctors.map(doctor => (
                                <Row key={doctor.id} className="doctor-card-row mb-4">
                                    <Col md={10} className="mx-auto">
                                        <div className="doctor-card d-flex align-items-center">
                                            <div className="doctor-image-container me-4">
                                                <img src={doctor.image || placeholderImage} alt={doctor.name} className="doctor-avatar rounded-circle" />
                                            </div>
                                            <div className="doctor-info flex-grow-1">
                                                <h4 className="doctor-name">{doctor.name}</h4>
                                                <p className="doctor-specialty">{doctor.specialty}</p>
                                                <p className="doctor-hospital d-flex align-items-center">
                                                    <FaMapMarkerAlt className="me-2 hospital-icon" /> {doctor.hospital}
                                                </p>
                                            </div>
                                            <div className="book-button-container d-flex flex-column gap-3 align-items-center">
                                                <div className="doctor-rating">
                                                    {renderStars(doctor.rating)}
                                                </div>
                                                <Button color="info" className="book-clinic-button">
                                                    Book Clinic Visit
                                                </Button>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            ))
                        )}
                    </Container>
                </div>
            </main>
            <footer style={{ backgroundColor: '#0A97B01A' }}>
                <Footer/>
            </footer>
        </>
    );
};

export default Doctors;