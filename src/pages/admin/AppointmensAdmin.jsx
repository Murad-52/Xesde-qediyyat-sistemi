// src/pages/admin/AppointmentsPage.jsx
import React from 'react';
import { Row, Col, Container } from 'reactstrap';

const AppointmentsAdmin = () => {
  return (
    <Container>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Appointments Overview</h1>
      </div>
      <Row>
        <Col>
          <p>View and manage all patient appointments.</p>
          {/* Buraya görüşlərin siyahısı, təqvim və s. gələ bilər */}
        </Col>
      </Row>
    </Container>
  );
};

export default AppointmentsAdmin;