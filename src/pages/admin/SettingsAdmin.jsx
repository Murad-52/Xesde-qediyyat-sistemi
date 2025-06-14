import React from 'react';
import { Row, Col, Container } from 'reactstrap';

const SettingsAdmin = () => {
  return (
    <Container>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Admin Settings</h1>
      </div>
      <Row>
        <Col>
          <p>Configure general settings for the administration panel.</p>
        </Col>
      </Row>
    </Container>
  );
};

export default SettingsAdmin;