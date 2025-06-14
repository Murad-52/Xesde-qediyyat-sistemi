// src/pages/admin/DoctorsPage.jsx
import React from 'react';
import { Row, Col, Button, Container } from 'reactstrap';

const DoctorsPage = () => {
  return (
    <Container>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Doctors Management</h1>
        <Button color="success">Add New Doctor</Button>
      </div>
      <Row>
        <Col>
          <p>Manage all doctors, their specialities, and contact information.</p>
          {/* Buraya həkimlərin siyahısını göstərən cədvəl gələ bilər */}
        </Col>
      </Row>
    </Container>
  );
};

export default DoctorsPage;