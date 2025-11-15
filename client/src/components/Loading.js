import React from 'react';
import "../css/Loading.css";

const Loading = ({ message = "Initializing System", showProgress = true }) => (
  <div className="loading-container">
    {/* Animated background particles */}
    <div className="loading-particles">
      {[...Array(15)].map((_, i) => (
        <div 
          key={i} 
          className="loading-particle" 
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${4 + Math.random() * 3}s`
          }}
        />
      ))}
    </div>

    {/* Main loading content */}
    <div className="cyber-spinner"></div>
    
    <div className="loading-text">
      {message}
    </div>
    
    <div className="loading-dots">
      <span className="loading-dots"></span>
    </div>
    
    {showProgress && (
      <div className="progress-bar">
        <div className="progress-fill"></div>
      </div>
    )}
    
    <div className="status-message">
      Connecting to tournament servers...
    </div>
  </div>
);

export default Loading;
