import React from 'react';
import { FaPhone, FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import "../css/ContactUs.css";

const ContactUs = () => {
  return (
    <div className="contact-container">
      <div className="contact-background">
        {/* Animated particles background */}
        <div className="particles">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }} />
          ))}
        </div>
      </div>

      <div className="contact-content">
        <div className="title-section">
          <h1 className="main-title">
            <span className="title-glow">CONTACT</span>
            <span className="title-accent">US</span>
          </h1>
          <div className="subtitle">Get in Touch</div>
        </div>

        <div className="glass-card contact-card">
          <div className="card-header">
            <h2 className="card-title">Connect With Us</h2>
            <div className="status-indicator">
              <span className="status-dot"></span>
              <span className="status-text">Online</span>
            </div>
          </div>

          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">
                <FaPhone />
              </div>
              <div className="contact-details">
                <span className="contact-label">Phone</span>
                <span className="contact-value">+91 6205712170</span>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <FaEnvelope />
              </div>
              <div className="contact-details">
                <span className="contact-label">Email</span>
                <a href="mailto:raviranjan1862002@gmail.com" className="contact-value contact-link">
                  raviranjan1862002@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="social-links">
            <h3 className="social-title">Follow Us</h3>
            <div className="social-grid">
              <a 
                href="https://github.com/raviranjan1618" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-link github-link"
              >
                <FaGithub className="social-icon" />
                <span className="social-text">GitHub</span>
              </a>
              
              <a 
                href="https://www.linkedin.com/in/raviranjan18/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-link linkedin-link"
              >
                <FaLinkedin className="social-icon" />
                <span className="social-text">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* HUD Elements */}
        <div className="hud-corner top-left">
          <div className="hud-element">
            <span className="hud-label">STATUS</span>
            <span className="hud-value">ONLINE</span>
          </div>
        </div>
        
        <div className="hud-corner top-right">
          <div className="hud-element">
            <span className="hud-label">SUPPORT</span>
            <span className="hud-value">24/7</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
