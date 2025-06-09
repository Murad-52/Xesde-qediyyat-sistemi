import React, { useState } from 'react';
import { Container, Row, Col, InputGroup, Input, Button } from 'reactstrap';
import { FaSearch, FaStar, FaFilter, FaMapMarkerAlt, FaPhone } from 'react-icons/fa'; 
import placeholderImage from '../../assets/images/placeholderImage.jpg'
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import hospitalImage from '../../assets/images/hospitals/f3324a3f746a41b1ba47f3498c964bac1cee81c8.jpg'


import './index.css';
import { Link } from 'react-router-dom';

const hospitalsData = [
    {
        id: 1,
        name: 'Hospital 1',
        address: 'Nizami 17',
        phone: '(112) 45 67',
        rating: 4.5, 
        image: hospitalImage

    },
    {
        id: 2,
        name: 'Hospital 2',
        address: 'Khatai  117',
        phone: '(112) 45 67',
        rating: 4.0,
        image: hospitalImage
    }

];

const Hospitals = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredDoctors, setFilteredDoctors] = useState(hospitalsData);

    
    const handleSearch = () => {
        const query = searchQuery.toLowerCase();
        const results = hospitalsData.filter(hospital =>
          hospital.name.toLowerCase().includes(query) ||
          hospital.address.toLowerCase().includes(query) ||
          hospital.phone.toLowerCase().includes(query)
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
          <main className="hospitals-page-main">
                <div className="hospitals-page-section">
                    <Container>
                        <Row className="mb-4">
                            <Col className="text-center">
                                <h1 className="main-heading">Find the Right Hospital for Your Healthcare Needs</h1>
                                <p className="sub-heading">Explore top hospitals with expert medical care and world-class facilities.</p>
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

                        <h3 className="featured-hospitals-heading mb-4">Featured Hospitals</h3>

                        {filteredDoctors.length === 0 ? (
                            <p className="text-center text-muted">Axtarışınıza uyğun hospital tapılmadı.</p>
                        ) : (
                            filteredDoctors.map(hospital => (
                                <Row key={hospital.id} className="hospital-card-row mb-4">
                                    <Col md={10} className="mx-auto">
                                        <div className="hospital-card d-flex align-items-center">
                                            <div className="doctor-image-container me-4">
                                                <img src={hospital.image || placeholderImage} alt={hospital.name} className="hospital-img " />
                                            </div>
                                            <div className="hospital-info flex-grow-1">
                                                <h4 className="hospital-name">{hospital.name}</h4>
                                                <p className="hospital-phone d-flex align-items-center">
                                                    <FaPhone className='me-2 phone-icon' />{hospital.phone}</p>
                                                <p className="hospital-hospital d-flex align-items-center">
                                                    <FaMapMarkerAlt className="me-2 hospital-icon" /> {hospital.address}
                                                </p>
                                            </div>
                                            <div className="book-button-container d-flex flex-column gap-3 align-items-center">
                                                <div className="hospital-rating">
                                                    {renderStars(hospital.rating)}
                                                </div>
                                                <Link to={`/hospitals/${hospital.id}`}>
                                                    <Button color="info" className="more-info">
                                                    More info
                                                </Button>
                                                </Link>
                                            
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

export default Hospitals;