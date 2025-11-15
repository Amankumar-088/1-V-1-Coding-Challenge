import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useEffect } from "react";
import "../css/CreateRoom.css";

const CreateRoom = () => {
  const [roomName, setRoomName] = useState("");
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

  const handleCreateRoom = async () => {
    if (roomName === "") {
      alert("Room Name input can't be empty");
      return;
    }
    if (userName === "") {
      alert("Your Name input can't be empty");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://code-1v1-tournament-platform-backend.vercel.app/api/rooms/create", 
        { roomName, userName, userID }
      );
      navigate(`/room/${response.data.roomId}`);
    } catch (error) {
      console.error("Error creating room:", error);
      alert("An error occurred while creating the room. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="create-room-container">
      <div className="create-room-background">
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

      <div className="create-room-content">
        <div className="title-section">
          <h1 className="main-title">
            <span className="title-glow">CREATE</span>
            <span className="title-accent">ROOM</span>
          </h1>
          <div className="subtitle">Host a Tournament</div>
        </div>

        <div className="glass-card create-room-card">
          <div className="card-header">
            <h2 className="card-title">Room Configuration</h2>
            <div className="status-indicator">
              <span className="status-dot"></span>
              <span className="status-text">Ready</span>
            </div>
          </div>

          <div className="form-section">
            <div className="input-group">
              <label className="input-label">Room Name</label>
              <input
                type="text"
                id="roomName"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="Enter room name"
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
              onClick={handleCreateRoom} 
              className={`neon-button create-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading-text">
                  Creating Room<span className="loading-dots"></span>
                </span>
              ) : (
                <>
                  <span className="button-icon">⚔️</span>
                  <span className="button-text">CREATE ROOM</span>
                </>
              )}
            </button>
          </div>

          <div className="room-info">
            <div className="info-item">
              <span className="info-label">Admin Privileges</span>
              <span className="info-value">You will be the tournament admin</span>
            </div>
            <div className="info-item">
              <span className="info-label">Room ID</span>
              <span className="info-value">Will be generated automatically</span>
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
            <span className="hud-label">ADMIN</span>
            <span className="hud-value">YOU</span>
          </div>
        </div>

        <div className="hud-corner bottom-right">
          <div className="hud-element">
            <span className="hud-label">MODE</span>
            <span className="hud-value">CREATE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;
