import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/Signup.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("user");
    if (isLoggedIn) {
      navigate("/home");
    }
  }, [navigate]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await axios.post(
        "https://code-1v1-tournament-platform-backend.vercel.app/api/auth/signup", 
        { name, email, password }
      );
      navigate("/login");
    } catch (error) {
      console.error("Error signing up:", error);
      alert("An error occurred during signup. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-background">
        {/* Animated particles background */}
        <div className="particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }} />
          ))}
        </div>
      </div>

      <div className="signup-content">
        <div className="title-section">
          <h1 className="main-title">
            <span className="title-glow">CODE</span>
            <span className="title-accent">1v1</span>
            <span className="title-glow">TOURNAMENT</span>
          </h1>
          <div className="subtitle">Join the Arena</div>
        </div>

        <div className="glass-card signup-card">
          <div className="card-header">
            <h2 className="card-title">Create Account</h2>
            <div className="status-indicator">
              <span className="status-dot"></span>
              <span className="status-text">Ready</span>
            </div>
          </div>

          <form onSubmit={handleSignup} className="signup-form">
            <div className="input-group">
              <label className="input-label">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="neon-input"
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="neon-input"
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="neon-input"
                required
              />
            </div>

            <button 
              type="submit" 
              className={`neon-button signup-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading-text">
                  Creating Account<span className="loading-dots"></span>
                </span>
              ) : (
                'CREATE ACCOUNT'
              )}
            </button>
          </form>

          <div className="signup-footer">
            <p className="footer-text">
              Already have an account? 
              <a href="/login" className="link-neon"> Login Here</a>
            </p>
          </div>
        </div>

        {/* HUD Elements */}
        <div className="hud-corner top-left">
          <div className="hud-element">
            <span className="hud-label">STATUS</span>
            <span className="hud-value">READY</span>
          </div>
        </div>
        
        <div className="hud-corner top-right">
          <div className="hud-element">
            <span className="hud-label">NEW</span>
            <span className="hud-value">USERS</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
