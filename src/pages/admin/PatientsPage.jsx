import React from 'react';
import { Row, Col, Button, Container } from 'reactstrap';

const PatientsPage = () => {
  return (
    <>
 <Container>
       <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Patients Management</h1>
        <Button color="primary">Add New Patient</Button>
      </div>
      <Row>
        <Col>
          <p>This is where you would list all patients, with options to view/edit/delete.</p>
        </Col>
      </Row>
 </Container>
    </>
  );
};

export default PatientsPage;