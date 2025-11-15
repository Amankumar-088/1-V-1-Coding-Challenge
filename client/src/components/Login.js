import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("user");
    if (isLoggedIn) {
      navigate("/home");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await axios.post(
        "https://code-1v1-tournament-platform-backend.vercel.app/api/auth/login",
        { email, password }
      );
      const userData = response.data;
      login(userData);
      navigate("/home");
    } catch (error) {
      console.error("Error logging in:", error);
      if (error.response?.status === 401) {
        alert("Invalid email or password!");
      } else {
        alert("An error occurred. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-background">
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

      <div className="login-content">
        <div className="title-section">
          <h1 className="main-title">
            <span className="title-glow">CODE</span>
            <span className="title-accent">1v1</span>
            <span className="title-glow">TOURNAMENT</span>
          </h1>
          <div className="subtitle">Enter the Arena</div>
        </div>

        <div className="glass-card login-card">
          <div className="card-header">
            <h2 className="card-title">System Access</h2>
            <div className="status-indicator">
              <span className="status-dot"></span>
              <span className="status-text">Ready</span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="login-form">
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
                placeholder="Enter your password"
                className="neon-input"
                required
              />
            </div>

            <button 
              type="submit" 
              className={`neon-button login-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading-text">
                  Authenticating<span className="loading-dots"></span>
                </span>
              ) : (
                'ACCESS SYSTEM'
              )}
            </button>
          </form>

          <div className="login-footer">
            <p className="footer-text">
              New to the arena? 
              <a href="/signup" className="link-neon"> Create Account</a>
            </p>
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
            <span className="hud-label">USERS</span>
            <span className="hud-value">ACTIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
