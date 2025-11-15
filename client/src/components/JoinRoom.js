import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useEffect } from "react";
import "../css/JoinRoom.css";

const JoinRoom = () => {
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");
  const [userID, setUserID] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    user = JSON.parse(localStorage.getItem("user"));
    setUserID(user.id);
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleJoinRoom = async () => {
    if (roomId === "") {
      alert("Room ID input can't be empty");
      return;
    }
    if (userName === "") {
      alert("Your Name input can't be empty");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://code-1v1-tournament-platform-backend.vercel.app/api/rooms/join", 
        { roomId, userName, userID }
      );
      navigate(`/room/${roomId}`);
    } catch (error) {
      console.error("Error joining room:", error);
      alert("Room not found or error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="join-room-container">
      <div className="join-room-background">
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

      <div className="join-room-content">
        <div className="title-section">
          <h1 className="main-title">
            <span className="title-glow">JOIN</span>
            <span className="title-accent">ROOM</span>
          </h1>
          <div className="subtitle">Enter the Arena</div>
        </div>

        <div className="glass-card join-room-card">
          <div className="card-header">
            <h2 className="card-title">Room Access</h2>
            <div className="status-indicator">
              <span className="status-dot"></span>
              <span className="status-text">Ready</span>
            </div>
          </div>

          <div className="form-section">
            <div className="input-group">
              <label className="input-label">Room ID</label>
              <input
                type="text"
                id="roomId"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                placeholder="Enter room ID"
                className="neon-input"
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">Your Name</label>
              <input
                type="text"
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name"
                className="neon-input"
                required
              />
            </div>

            <button 
              onClick={handleJoinRoom} 
              className={`neon-button join-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading-text">
                  Joining Room<span className="loading-dots"></span>
                </span>
              ) : (
                <>
                  <span className="button-icon">🏆</span>
                  <span className="button-text">JOIN ROOM</span>
                </>
              )}
            </button>
          </div>

          <div className="room-info">
            <div className="info-item">
              <span className="info-label">Room Status</span>
              <span className="info-value">Will be checked on join</span>
            </div>
            <div className="info-item">
              <span className="info-label">Player Role</span>
              <span className="info-value">You will be a participant</span>
            </div>
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
            <span className="hud-label">ROOMS</span>
            <span className="hud-value">ACTIVE</span>
          </div>
        </div>

        <div className="hud-corner bottom-left">
          <div className="hud-element">
            <span className="hud-label">ROLE</span>
            <span className="hud-value">PLAYER</span>
          </div>
        </div>

        <div className="hud-corner bottom-right">
          <div className="hud-element">
            <span className="hud-label">MODE</span>
            <span className="hud-value">JOIN</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinRoom;
