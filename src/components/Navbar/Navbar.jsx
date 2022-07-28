import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import './Navbar.css'

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
      <ul className={menu_class}>
        <li className='nav-item'>
          <Link to="/Profile" className='nav-link'>Profile</Link>
        </li>
        <li className='nav-item'>
          <Link to="/History" className='nav-link'>History</Link>
        </li>
        <li className='nav-item'>
          <Link to="/Leaderboard" className='nav-link'>Leaderboard</Link>
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