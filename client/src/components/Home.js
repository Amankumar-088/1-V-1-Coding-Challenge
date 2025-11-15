import React, { useEffect } from "react";
import { useAuth } from "./AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "../css/Home.css";

const Home = () => {
  let { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="home-container">
      <div className="home-background">
        {/* Animated particles background */}
        <div className="particles">
          {[...Array(25)].map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }} />
          ))}
        </div>
      </div>

      <div className="home-content">
        <div className="title-section">
          {user && (
            <h1 className="main-title">
              <span className="title-glow">WELCOME,</span>
              <span className="title-accent">{user.name.toUpperCase()}</span>
            </h1>
          )}
          <div className="subtitle">Choose Your Battle</div>
        </div>

        <div className="action-buttons">
          <Link to="/create-room" className="neon-button home-button create-button">
            <span className="button-icon">⚔️</span>
            <span className="button-text">CREATE ROOM</span>
            <span className="button-subtitle">Host a Tournament</span>
          </Link>

          <Link to="/join-room" className="neon-button home-button join-button">
            <span className="button-icon">🏆</span>
            <span className="button-text">JOIN ROOM</span>
            <span className="button-subtitle">Enter the Arena</span>
          </Link>
        </div>

        <div className="user-stats">
          <div className="glass-card stats-card">
            <h3 className="stats-title">Player Stats</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-label">Rank</span>
                <span className="stat-value">#1</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Wins</span>
                <span className="stat-value">42</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Losses</span>
                <span className="stat-value">7</span>
              </div>
            </div>
          </div>
        </div>

        <button onClick={handleLogout} className="neon-button logout-button">
          <span className="button-icon">🚪</span>
          <span className="button-text">LOGOUT</span>
        </button>

        {/* HUD Elements */}
        <div className="hud-corner top-left">
          <div className="hud-element">
            <span className="hud-label">STATUS</span>
            <span className="hud-value">ONLINE</span>
          </div>
        </div>
        
        <div className="hud-corner top-right">
          <div className="hud-element">
            <span className="hud-label">PLAYERS</span>
            <span className="hud-value">ACTIVE</span>
          </div>
        </div>

        <div className="hud-corner bottom-left">
          <div className="hud-element">
            <span className="hud-label">ROOMS</span>
            <span className="hud-value">12</span>
          </div>
        </div>

        <div className="hud-corner bottom-right">
          <div className="hud-element">
            <span className="hud-label">MATCHES</span>
            <span className="hud-value">8</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
