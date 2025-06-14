import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './assets/styles/variables.css'
import Register from './pages/register/Register';
import Login from './pages/login/LogIn'; 
import Home from './pages/home/Home'; 
import Profile from './pages/profile-patient/Profile'
import DoctorProfile from './pages/profile-doctor/DoctorProfile';
import Doctors from './pages/doctors/Doctors';
import Hospitals from './pages/hospitals/Hospitals';
import ContactUs from './pages/contact/ContactUs';
import Appointments from './pages/appointments/Appointments';
import ChangePassword from './pages/change-password/ChangePassword';
import AdminDashBoard from './pages/admin/AdminDashBoard';
import HospitalInfo from './pages/hospitals/HospitalInfo';
import MedicalRecords from './pages/medical-records/MedicalRecords';
import PatientsPage from './pages/admin/PatientsPage';
import DoctorsPage from './pages/admin/DoctorsPage';
import AppointmentsAdmin from './pages/admin/AppointmensAdmin';
import SettingsAdmin from './pages/admin/SettingsAdmin';

function App() {
  return (
    <>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path='/profile/patient' element={<Profile/>}/>
        <Route path='/profile/doctor' element={<DoctorProfile/>}/>
        <Route path='/doctors' element={<Doctors/>}/>
        <Route path='/hospitals' element={<Hospitals/>}/>
        <Route path='/contactUs' element={<ContactUs/>}/>
        <Route path='/appointments' element={<Appointments/>}/>
        <Route path='/change-password' element={<ChangePassword/>}/>
        <Route path='/hospitals/:id' element={<HospitalInfo/>}/>
        <Route path='/records' element={<MedicalRecords/>}/>


        <Route path='/admin-dashboard' element={<AdminDashBoard/>}/>
        <Route path='/admin/patients' element={<PatientsPage/>}/>
        <Route path='/admin/doctors' element={<DoctorsPage/>}/>
        <Route path='/admin/appointments' element={<AppointmentsAdmin/>}/>
        <Route path='/admin/settings' element={<SettingsAdmin/>}/>
      </Routes>
    </>
  );
}

export default App;

