import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../utils/auth/authSlice';
import { useNavigate } from 'react-router-dom';

import './Navbar.css'
import Logo from '../../assets/images/Logo.png'

const Navbar = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // Changes classes for burger
  const [burger_class, setBurgerClass] = useState('burger');
  const [menu_class, setMenuClass] = useState('menu');
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  // Toggles burger menu
  const updateMenu = () => {
    if (!isMenuClicked) {
      setMenuClass('menu active');
      setBurgerClass('burger toggle');
    } else {
      setMenuClass('menu');
      setBurgerClass('burger');
    };
    setIsMenuClicked(!isMenuClicked);
  };

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <nav className='navbar'>
      <Link to='/'>
        <img src={Logo} alt='Logo' />
      </Link>

      <ul className={menu_class}>
        {user ? (
          <>
            <li className='nav-item' onClick={updateMenu}>
              <Link to='/leaderBoard' className='nav-link' >Leaderboard</Link>
            </li>
            <li className='nav-item' onClick={updateMenu}>
              <Link to='/personal' className='nav-link'>Personal</Link>
            </li>
            <li className='nav-item' onClick={updateMenu}>
              <Link to='/scores' className='nav-link'>Scores</Link>
            </li>
            <li className='nav-item' onClick={updateMenu}>
              <button to='/logout' className='logout-btn' onClick={onLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li className='nav-item'>
              <Link to='/signin' className='nav-link'>Sign in</Link>
            </li>
            <li className='nav-item'>
              <Link to='/signup' className='nav-link'>Sign up</Link>
            </li>
          </>
        )}
      </ul>

      <div className={burger_class} onClick={updateMenu}>
        <div className='line1'></div>
        <div className='line2'></div>
        <div className='line3'></div>
      </div>
    </nav>
  );
};

export default Navbar;