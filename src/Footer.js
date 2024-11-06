// Footer.jsx
import React from "react";
import { Instagram, Twitter, Facebook, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo and Social Links */}
        <div className="footer-brand">
          <h2 className="footer-logo">STUDIO HUB</h2>
          <div className="social-links">
            <a href="#" className="social-link">
              <Instagram size={20} />
            </a>
            <a href="#" className="social-link">
              <Twitter size={20} />
            </a>
            <a href="#" className="social-link">
              <Facebook size={20} />
            </a>
            <a href="#" className="social-link">
              <Youtube size={20} />
            </a>
          </div>
        </div>

        {/* Studio Categories */}
        <div className="footer-section">
          <h3 className="footer-heading">Studio Categories</h3>
          <ul className="footer-list">
            <li>
              <a href="#">Photo Studio</a>
            </li>
            <li>
              <a href="#">Conference Room</a>
            </li>
            <li>
              <a href="#">Dance Studio</a>
            </li>
            <li>
              <a href="#">Recording Studio</a>
            </li>
            <li>
              <a href="#">Film Studio</a>
            </li>
            <li>
              <a href="#">Corporate Events</a>
            </li>
          </ul>
        </div>

        {/* Popular Locations */}
        <div className="footer-section">
          <h3 className="footer-heading">Popular Locations</h3>
          <ul className="footer-list">
            <li>
              <a href="#">Hyderabad</a>
            </li>
            <li>
              <a href="#">Chennai</a>
            </li>
            <li>
              <a href="#">Bangalore</a>
            </li>
            <li>
              <a href="#">Mumbai</a>
            </li>
            <li>
              <a href="#">Gujrat</a>
            </li>
            <li>
              <a href="#">Kolkata</a>
            </li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div className="footer-section newsletter">
          <p className="newsletter-text">
            Stay in touch for weekly newsletters, travel tips, and deals.
          </p>
          <form className="newsletter-form">
            <input
              type="text"
              placeholder="Enter your First Name"
              className="footer-input"
            />
            <input
              type="email"
              placeholder="Enter your Email Address"
              className="footer-input"
            />
            <button type="submit" className="signup-button">
              Sign Up
            </button>
          </form>
        </div>
      </div>

      {/* Copyright */}
      <div className="copyright">
        <p>© Copyright 2024 Alokha. All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
