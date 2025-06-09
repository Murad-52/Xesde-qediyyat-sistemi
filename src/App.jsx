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
      </Routes>
    </>
  );
}

export default App;

