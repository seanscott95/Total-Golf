import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import './Navbar.css'
import Logo from '../../assets/images/Logo.png'

const Navbar = () => {

  // Changes classes for burger
  const [burger_class, setBurgerClass] = useState('burger')
  const [menu_class, setMenuClass] = useState('menu')
  const [isMenuClicked, setIsMenuClicked] = useState(false)

  // Toggles burger menu
  const updateMenu = () => {
    if (!isMenuClicked) {
      setMenuClass('menu active')
      setBurgerClass('burger toggle')
    } else {
      setMenuClass('menu')
      setBurgerClass('burger')
    }
    setIsMenuClicked(!isMenuClicked)
  }

  return (
    <nav className="navbar">
      <Link to='/'>
        <img src={Logo} alt='Logo' />
      </Link>

      <ul className={menu_class}>
        <li className='nav-item'>
          <Link to="/personal" className='nav-link'>Personal</Link>
        </li>
        <li className='nav-item'>
          <Link to="/leaderboard" className='nav-link'>Leaderboard</Link>
        </li>
        <li className='nav-item'>
          <Link to="/login" className='nav-link'>Login</Link>
        </li>
        <li className='nav-item'>
          <Link to="/signup" className='nav-link'>Sign Up</Link>
        </li>
      </ul>

      <div className={burger_class} onClick={updateMenu}>
        <div className='line1'></div>
        <div className='line2'></div>
        <div className='line3'></div>
      </div>
    </nav>
  )
}

export default Navbar