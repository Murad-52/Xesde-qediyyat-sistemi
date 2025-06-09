import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, FormGroup, Label, ModalFooter } from 'reactstrap';
import { FaMapMarkerAlt } from 'react-icons/fa';
import Navbar from '../../components/navbar/Navbar'; 
import Footer from '../../components/footer/Footer'; 
import docNigar from '../../assets/images/homepage/medicalExpertsSecton/5a52c8ad45104697203ae9a5ce72c4f7216f8098.jpg';
import docKamal from '../../assets/images/homepage/medicalExpertsSecton/ca59def1670ffe9538f5aae1923943ecf699f52d.jpg'

import './Appointments.css'; 
import CustomInput from '../../components/custom-input/CustomInput';
import CustomButton from '../../components/button/CustomButton';

const Appointments = () => {
    const initialAppointments = [
        {
            id: 1,
            doctorName: "Dr. Nigar Farac",
            doctorSpecialty: "Psychologist",
            doctorImage: docNigar, 
            hospitalName: "MedEra Hospital",
            hospitalLocation: "Baku, Azerbaijan",
            date: "03.21.2025",
            time: "14:30"
        },
        {
            id: 2,
            doctorName: "Dr. Kamal Qurbanov",
            doctorSpecialty: "Cardiologist",
            doctorImage: docKamal, 
            hospitalName: "Mərkəzi Klinik Xəstəxana",
            hospitalLocation: "Sumgayit, Azerbaijan",
            date: "04.10.2025",
            time: "10:00"
        }
    ];

     const [appointments, setAppointments] = useState(initialAppointments);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentAppointment, setCurrentAppointment] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');

    const handleEditAppointment = (appointment) => {
        setCurrentAppointment(appointment); 
        setSelectedTime(appointment.time); 
        setModalOpen(true); 
    };

    const toggleModal = () => setModalOpen(!modalOpen);

    const handleSaveTimeChange = () => {
        if (currentAppointment && selectedTime) {
            setAppointments(
                appointments.map(app =>
                    app.id === currentAppointment.id ? { ...app, time: selectedTime } : app
                )
            );
            alert(`Randevu ID ${currentAppointment.id} vaxtı ${selectedTime} olaraq dəyişdirildi.`);
            toggleModal(); 
        } else {
            alert("Zəhmət olmasa yeni vaxt seçin.");
        }
    };


     const handleDeleteAppointment = (appointmentId) => {
        if (window.confirm("Bu randevunu silmək istədiyinizə əminsiniz?")) {
            
            setAppointments(appointments.filter(app => app.id !== appointmentId));
            alert('Randevu uğurla silindi.');
        }
    };

   
    const availableTimes = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

    return (
        <>
            <header>
                <Navbar />
            </header>
            <main className="appointments-page-main">
                <div className="appointments-page-section">
                    <Container>
                        <h1 className="appointments-heading mb-4">Appointments</h1>
                        {initialAppointments.length === 0 ? (
                            <p className="text-center text-muted">Heç bir randevunuz yoxdur.</p>
                        ) : (
                            initialAppointments.map(app => (
                                <Row key={app.id} className="appointment-card-row mb-3">
                                    <Col md={10} className="mx-auto">
                                        <div className="appointment-card d-flex align-items-center">
                                            <div className="doctor-image-container me-4">
                                                <img
                                                    src={app.doctorImage}
                                                    alt={app.doctorName}
                                                    className="doctor-avatar rounded-circle"
                                                />
                                            </div>
                                            <div className="appointment-details flex-grow-1">
                                                <h4 className="doctor-name">{app.doctorName}</h4>
                                                <p className="doctor-specialty">{app.doctorSpecialty}</p>
                                                <p className="doctor-hospital d-flex align-items-center">
                                                    <FaMapMarkerAlt className="me-2 hospital-icon" /> {app.hospitalName} ({app.hospitalLocation})
                                                </p>
                                            </div>
                                            <div className="appointment-time-info me-4 text-end">
                                                <p className="appointment-date">Date: {app.date}</p>
                                                <p className="appointment-time">Time: {app.time}</p>
                                            </div>
                                            <div className="appointment-actions">
                                                <Button
                                                    color="success"
                                                    outline
                                                    className="me-2 edit-button"
                                                    onClick={() => handleEditAppointment(app.id)} 
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    color="danger"
                                                    outline
                                                    className="delete-button"
                                                    onClick={() => handleDeleteAppointment(app.id)} 
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            ))
                        )}
                    </Container>
                </div>
                 <Modal isOpen={modalOpen} toggle={toggleModal} centered>
                <ModalHeader toggle={toggleModal}>Randevu Vaxtını Dəyiş</ModalHeader>
                <ModalBody>
                    {currentAppointment && (
                        <>
                            <p>Həkim: <strong>{currentAppointment.doctorName}</strong></p>
                            <p>Tarix: <strong>{currentAppointment.date}</strong></p>
                            <FormGroup>
                                <Label for="selectTime">Yeni Vaxt Seçin:</Label>
                              <CustomInput
                                    type="select"
                                    name="selectTime"
                                    id="selectTime"
                                    value={selectedTime}
                                    onChange={(e) => setSelectedTime(e.target.value)}
                                >
                                    <option value="">Vaxt Seçin</option>
                                    {availableTimes.map(time => (
                                        <option key={time} value={time}>{time}</option>
                                    ))}
                                </CustomInput>
                            </FormGroup>
                        </>
                    )}
                </ModalBody>
                <ModalFooter>
                    <CustomButton color="primary" onClick={handleSaveTimeChange}>Yadda Saxla</CustomButton>{' '}
                    <CustomButton color="secondary" onClick={toggleModal}>Ləğv Et</CustomButton>
                </ModalFooter>
            </Modal>
            </main>
            <footer style={{ backgroundColor: '#0A97B01A' }}>
                <Footer />
            </footer>
        </>
    );
};

export default Appointments;