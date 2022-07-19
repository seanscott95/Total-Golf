import React, { useState } from 'react'
import './Navbar.css'

const Navbar = () => {

    // Changes classes for burger
    const [burger_class, setBurgerClass] = useState('burger-bar unclicked')
    const [menu_class, setMenuClass] = useState('menu hidden')
    const [isMenuClicked, setIsMenuClicked] = useState(false)

    // Toggles burger menu
    const updateMenu = () => {
      if(!isMenuClicked) {
        setBurgerClass('burger-bar clicked')
        setMenuClass('menu visible')
      } else {
        setBurgerClass('burger-bar unclicked')
        setMenuClass('menu hidden')
      }
      setIsMenuClicked(!isMenuClicked)
    }

  return (
    <div className='navbarContainer'>
        <nav className="navbar">
            <div className='burger-menu' onClick={updateMenu}>
                <div className={burger_class}></div>
                <div className={burger_class}></div>
                <div className={burger_class}></div>
            </div>
        </nav>

        <div className={menu_class}></div>
    </div>
  )
}

export default Navbar