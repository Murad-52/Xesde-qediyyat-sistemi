import React from 'react';
import { Container, Row } from 'reactstrap';
import './AdminDashboard.css'

const AdminDashboard = () => {
  return (
    <>
    <Container>
        <Row >
          <nav className="col-md-2 d-none d-md-block bg-light sidebar">
            <div className="sidebar-sticky pt-3">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <a className="nav-link active" href="/admin-dashboard">
                    Dashboard
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/admin/patients"> 
                    Patients
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/admin/doctors"> 
                    Doctors
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/admin/appointments"> 
                    Appointments
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/admin/settings">
                    Settings
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Admin Dashboard</h1>
            </div>

            <div className="row">
              <div className="col-md-6 col-lg-4 mb-4">
                <div className="card text-white bg-primary mb-3">
                  <div className="card-body">
                    <h5 className="card-title">Total patients</h5>
                    <p className="card-text h1">150</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 mb-4">
                <div className="card text-white bg-success mb-3">
                  <div className="card-body">
                    <h5 className="card-title">Total doctors</h5>
                    <p className="card-text h1">30</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 mb-4">
                <div className="card text-white bg-warning mb-3">
                  <div className="card-body">
                    <h5 className="card-title">Expected Appointments</h5>
                    <p className="card-text h1">25</p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </Row>
    </Container>
    </>
  );
};

export default AdminDashboard;