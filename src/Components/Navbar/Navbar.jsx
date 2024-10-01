import React, { useEffect, useState, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'
import logo from '../../assets/logo.png'
import menu_icon from '../../assets/menu-icon.png'
import qr_code from '../../assets/qr_code.png'

const DonationModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={qr_code} alt="Donation QR Code" className="qr-code" />
        <button onClick={onClose} className="close-button">Close</button>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [sticky, setSticky] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 50);
    };

    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMobileMenu(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setMobileMenu(!mobileMenu);
  }

  const openDonationModal = () => {
    setIsModalOpen(true);
    setMobileMenu(false);
  }

  const closeDonationModal = () => {
    setIsModalOpen(false);
  }

  const handleNavItemClick = () => {
    setMobileMenu(false);
  }

  return (
    <>
      <nav ref={navRef} className={`container ${sticky ? 'dark-nav' : ''}`}>
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
        <ul className={mobileMenu ? 'mobile-menu-active' : 'hide-mobile-menu'}>
          <li><Link to="/" onClick={handleNavItemClick}>Home</Link></li>
          <li><Link to="/programs" onClick={handleNavItemClick}>Program</Link></li>
          <li><Link to="/about" onClick={handleNavItemClick}>About us</Link></li>
          <li><Link to="/campus" onClick={handleNavItemClick}>Campus</Link></li>
          <li><Link to="/testimonials" onClick={handleNavItemClick}>Testimonials</Link></li>
          <li><Link to="/contact" className="btn" onClick={handleNavItemClick}>Contact us</Link></li>
          <li><button onClick={openDonationModal} className="btn donate-btn">Donate</button></li>
        </ul>
        <img src={menu_icon} alt="Menu" className="menu-icon" onClick={toggleMenu} />
      </nav>
      <DonationModal isOpen={isModalOpen} onClose={closeDonationModal} />
    </>
  )
}

export default Navbar