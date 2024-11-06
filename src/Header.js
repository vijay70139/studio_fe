import React, { useState } from "react";
import { Search } from "lucide-react";
import AddPhotoStudioForm from "./AddPhotoStudioForm";
import LoginPopup from "./LoginPopup";
import SignupForm from "./SignupForm";
import axios from "axios";
import Profile from "./assets/image/profile.png";

const Header = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);

  const handlePopupOpen = () => setShowPopup(true);
  const handlePopupClose = () => setShowPopup(false);

  const handleLoginPopupOpen = () => setShowLoginPopup(true);
  const handleLoginPopupClose = () => setShowLoginPopup(false);

  const handleSignupPopupOpen = () => setShowSignupPopup(true);
  const handleSignupPopupClose = () => setShowSignupPopup(false);

  const isAuthenticated =
    !!localStorage.getItem("accessToken") ||
    !!localStorage.getItem("refreshToken");

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_USER_DOMAIN_API}/logout`,
        { refreshToken }
      );

      console.log("Logout successful:", response.data);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">STUDIO HUB</div>

        <div className="nav-links">
          <a href="#" className="nav-link">
            Home
          </a>
          <a href="#" className="nav-link">
            Categories
          </a>
          <a href="#" className="nav-link">
            Contact Us
          </a>
        </div>

        <div className="search-container">
          <Search className="search-icon" size={20} />
          <input type="text" placeholder="Search" className="search-input" />
        </div>

        <div className="action-buttons">
          <button className="list-studio-btn" onClick={handlePopupOpen}>
            List Your Studio
          </button>
          {/* <button className="book-now-btn" onClick={handleLoginPopupOpen}>
            Book Now
          </button> */}
          {!isAuthenticated && (
            <>
              <button className="book-now-btn" onClick={handleLoginPopupOpen}>
                Login
              </button>
              <button className="book-now-btn" onClick={handleSignupPopupOpen}>
                Sign Up
              </button>
            </>
          )}
          <div className="avatar">
            <img src={Profile} alt="Avatar" className="avatar-img" />
          </div>
          {isAuthenticated && (
            <button className="book-now-btn logout" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="close-button" onClick={handlePopupClose}>
              ×
            </button>
            <AddPhotoStudioForm onClose={handlePopupClose} />
          </div>
        </div>
      )}
      {!isAuthenticated && (
        <LoginPopup isOpen={showLoginPopup} onClose={handleLoginPopupClose} />
      )}
      {showSignupPopup && !isAuthenticated && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="close-button" onClick={handleSignupPopupClose}>
              ×
            </button>
            <SignupForm closeSignup={handleSignupPopupClose} />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
