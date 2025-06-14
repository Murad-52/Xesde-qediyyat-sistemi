import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import CustomButton from '../button/CustomButton';
import logo from '../../assets/images/logo/72b55081647424b650614f1ba0aa7584eb9ef940 (1).jpg';
import './Navbar.css';
import placeholderImage from '../../assets/images/placeholderImage.jpg';
import profileIcon from '../../assets/icons/profile.svg';
import calendarIcon from '../../assets/icons/calendar.svg';
import passwordIcon from '../../assets/icons/password.svg'; 
import logOutIcon from '../../assets/icons/logOut.svg';
import adminIcon from '../../assets/icons/admin.svg'

const Navbar = () => {
    const [user, setUser] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);
    const navigate = useNavigate();

    const getUserFromLocalStorage = () => {
        const storedUser = localStorage.getItem('user_data');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                if (parsedUser && parsedUser.id) {
                    return parsedUser;
                } else {
                    console.warn("Local storage-da 'user_data' tapıldı, lakin ID propertisi yoxdur. Məlumat təmizlənir.");
                    localStorage.removeItem('user_data');
                    localStorage.removeItem('token'); 
                    return null;
                }
            } catch (e) {
                console.error("Local storage-dakı 'user_data' JSON formatında deyil və ya zədələnib:", e);
                localStorage.removeItem('user_data');
                localStorage.removeItem('token'); 
                return null;
            }
        }
        return null;
    };

    useEffect(() => {
        setUser(getUserFromLocalStorage());

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleStorageChange = () => {
        setUser(getUserFromLocalStorage());
    };

    const profileLink = user?.role === 'doctor' ? '/profile/doctor' : user?.role === 'patient' ? '/profile/patient' : '/profile'; 

    const handleLogOut = () => {
        localStorage.removeItem('user_data');
        localStorage.removeItem('token');
        setUser(null); 
        navigate('/login');
    };

    const handleMouseEnter = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
            setTimeoutId(null);
        }
        setShowDropdown(true);
    };

    const handleMouseLeave = () => {
        const id = setTimeout(() => {
            setShowDropdown(false);
        }, 300);
        setTimeoutId(id);
    };

    const getLinkClass = ({ isActive }) => isActive ? 'active-link' : 'inactive-link';

    return (
        <nav className='d-flex align-items-center justify-content-between'
            style={{ borderBottom: '1px solid gray', padding: '24px 80px', fontSize: '24px' }}>

            <Link to='/'>
                <img src={logo} style={{ width: '96px', height: '120px' }} alt="logo" />
            </Link>

            <ul className='d-flex gap-5 list-unstyled mb-0'>
                <li><NavLink className={getLinkClass} to='/'>Home</NavLink></li>
                <li><NavLink className={getLinkClass} to='/doctors'>Doctors</NavLink></li>
                <li><NavLink className={getLinkClass} to='/hospitals'>Hospitals</NavLink></li>
                <li><NavLink className={getLinkClass} to='/contactUs'>Contact Us</NavLink></li>
            </ul>

            <div className='d-flex gap-3 align-items-center'>
                {user ? ( 
                    <div
                        className='profile-container'
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <img
                            src={user?.image || placeholderImage} 
                            style={{ width: '60px', border: '1px solid', padding: '5px', borderRadius: '50%', cursor: 'pointer' }}
                            alt="pp"
                        />

                        {showDropdown && (
                            <div className='dropdown-menu-custom'>
                                <Link to={profileLink}> <img src={profileIcon} style={{ marginRight: '12px' }} alt="profile icon" />Profile</Link>

                                {user.role === 'admin' && (
                                    <Link to='/admin-dashboard'><img src={adminIcon} style={{ marginRight: '12px' }} alt="admin icon" />Admin Panel</Link>
                                )}

                                {user.role !== 'admin' && (
                                    <Link to='/appointments'><img src={calendarIcon} style={{ marginRight: '12px' }} alt="calendar icon" />Appointments</Link>
                                )}

                                <Link to='/change-password'><img src={passwordIcon} style={{ marginRight: '12px' }} alt="password icon" /> Change Password</Link>
                                <span onClick={handleLogOut} style={{ cursor: 'pointer', color: 'red' }}> <img src={logOutIcon} style={{ marginRight: '12px' }} alt="logout icon" /> Log out</span>
                            </div>
                        )}
                    </div>
                ) : ( 
                    <>
                        <Link to='/login'>
                            <CustomButton className='log-in'>Log in</CustomButton>
                        </Link>
                        <Link to='/register'>
                            <CustomButton className='sign-up'>Sign up</CustomButton>
                        </Link>
                    </>
                )}

            </div>

        </nav>
    );
};

export default Navbar;