import React from 'react';
import { Container, Row, Col, Input, FormGroup, Label, Card, CardBody, CardText } from 'reactstrap';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import './MedicalRecords.css';

const MedicalRecords = () => {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main>
                <Container className="my-4 medical-records-container">
                    <Row className="mb-4 align-items-center">
                        <Col md={6}>
                            <h2 className="medical-records-heading">Medical records</h2>
                        </Col>
                      
                    </Row>

                    <Row>
                        <Col md={6} className="mb-4">
                            <h4 className="section-title">
                            Diagnose 
                            </h4>
                            <FormGroup className="mb-3">
                                <Label for="diagnoseDescription" className="form-label">Diagnose and description</Label>
                                <Input
                                    type="textarea"
                                    name="diagnoseDescription"
                                    id="diagnoseDescription"
                                    placeholder="Diagnose and description"
                                    rows="3"
                                    className="custom-textarea-input"
                                />
                            </FormGroup>
                            <FormGroup className="mb-3">
                                <Label for="diagnoseDate" className="form-label">Diagnose date</Label>
                                <Input
                                    type="text"
                                    name="diagnoseDate"
                                    id="diagnoseDate"
                                    placeholder="DD/MM/YY"
                                    className="custom-input"
                                />
                            </FormGroup>
                            <FormGroup className="mb-3">
                                <Label for="prescription" className="form-label">Prescription</Label>
                                <Input
                                    type="text"
                                    name="prescription"
                                    id="prescription"
                                    placeholder="Prescription"
                                    className="custom-input"
                                />
                            </FormGroup>
                            <FormGroup className="mb-3">
                                <Label for="documents" className="form-label">Documents</Label>
                                <Input
                                    type="text"
                                    name="documents"
                                    id="documents"
                                    placeholder="Documents"
                                    className="custom-input"
                                />
                            </FormGroup>
                        </Col>

                        <Col md={6} className="mb-4">
                            <h4 className="section-title">Treatment plan</h4>
                            <Card style={{backgroundColor:'#F5F5F5', borderRadius: '35px'}} className="treatment-plan-card  p-3">
                                <CardBody >
                                    <FormGroup className="mb-3">
                                        <Input
                                            type="text"
                                            placeholder="Plan title"
                                            className="custom-card-input"
                                        />
                                    </FormGroup>
                                    <FormGroup className="mb-3">
                                        <Input
                                            type="textarea"
                                            placeholder="Descriptions/notes"
                                            rows="3"
                                            className="custom-card-textarea-input"
                                        />
                                    </FormGroup>
                                    <Row className="mb-3">
                                        <Col>
                                            <Input
                                                type="text"
                                                placeholder="DD/MM/YY        --start date"
                                                className="custom-card-input"
                                            />
                                        </Col>
                                        
                                    </Row>
                                    <Row className="mb-3">
                                        <Col>
                                            <Input
                                                type="text"
                                                placeholder="DD/MM/YY         --end date"
                                                className="custom-card-input"
                                            />
                                        </Col>
                                    
                                    </Row>
                                    <FormGroup className="mb-3">
                                        <Input
                                            type="text"
                                            placeholder="Medications/procedures"
                                            className="custom-card-input"
                                        />
                                    </FormGroup>
                                    <FormGroup className="mb-3">
                                        <Input
                                            type="text"
                                            placeholder="Follow up"
                                            className="custom-card-input"
                                        />
                                    </FormGroup>
                                    <FormGroup className="mb-0">
                                        <Input
                                            type="text"
                                            placeholder="Status"
                                            className="custom-card-input"
                                        />
                                    </FormGroup>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </main>
            <footer style={{ backgroundColor: '#0A97B01A' }}>
                <Footer />
            </footer>
        </>
    );
};

export default MedicalRecords;