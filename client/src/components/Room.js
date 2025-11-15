import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import "../css/Room.css";

const Room = () => {
  const { roomId } = useParams();
  const [gamer, setGamer] = useState("");
  const [roomName, setRoomName] = useState("");
  const [userID, setUserID] = useState("");
  const [participants, setParticipants] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [admi, setAdmi] = useState("");
  const [started, setStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let { user } = useAuth();
  const navigate = useNavigate();

  let errorShown = false;

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        user = JSON.parse(localStorage.getItem("user"));
        setUserID(user.id);
        if (!user) {
          navigate("/login");
        }
        const response = await axios.get("https://code-1v1-tournament-platform-backend.vercel.app/api/rooms/getRoomDetails", { params: { roomId } });
        const { name, admin, participants, isStarted, players } = response.data.room;

        setAdmi(admin);
        setRoomName(name);
        setStarted(isStarted);
        setParticipants(participants);

        const gamr = participants.find(participant => participant.id === user.id);
        setGamer(gamr);
        if(admin === user.id){
          setIsAdmin(true);
        }
        const isThere = players.findIndex(player => player.id === user.id);
        if(started && !(isThere===-1 && players.length>0)){
          navigate(`/room/${roomId}/tournament`);
          return;
        }
      } catch (error) {
        if (!errorShown) {
          errorShown = true;
          alert("Room doesn't exist");
          navigate("/home");
        }
      }
    };

    fetchRoomDetails();
    const interval = setInterval(fetchRoomDetails, 5000);
    return () => clearInterval(interval);
  }, [userID, started]);

  const handleLeaveRoom = async () => {
    setIsLoading(true);
    try {
      await axios.post("https://code-1v1-tournament-platform-backend.vercel.app/api/rooms/leave", { roomId, userID });
      navigate(`/home`);
    } catch (error) {
      console.error("Error leaving room:", error);
      alert("Error leaving room. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteRoom = async () => {
    if (!window.confirm("Are you sure you want to delete this room? This action cannot be undone.")) {
      return;
    }
    
    setIsLoading(true);
    try {
      await axios.delete("https://code-1v1-tournament-platform-backend.vercel.app/api/rooms/deleteRoom", { data: { roomId } });
      navigate(`/home`);
    } catch (error) {
      console.error("Error deleting room:", error);
      alert("Error deleting room. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const startTournament = async () => {
    if(participants.length === 1){
      alert("You need at least 2 players!");
      return;
    }
    
    setIsLoading(true);
    try {
      await axios.post("https://code-1v1-tournament-platform-backend.vercel.app/api/tournament/startTournament", { roomId });
      navigate(`/room/${roomId}/tournament`);
    } catch (error) {
      console.error("Error starting tournament:", error);
      alert("Error starting tournament. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyRoomId = () => {
    const roomIdText = document.querySelector('#room-id-span');
    navigator.clipboard.writeText(roomIdText.innerText).then(() => {
      alert("Room ID copied to clipboard: " + roomIdText.innerText);
    }).catch(() => {
      // Fallback for older browsers
      const tempInput = document.createElement("input");
      document.body.appendChild(tempInput);
      tempInput.value = roomIdText.innerText;
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
      alert("Room ID copied to clipboard: " + roomIdText.innerText);
    });
  };
  
  return (
    <div className="room-container">
      <div className="room-background">
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

      <div className="room-content">
        <div className="title-section">
          <h1 className="main-title">
            <span className="title-glow">ROOM</span>
            <span className="title-accent">ARENA</span>
          </h1>
          <div className="subtitle">Tournament Lobby</div>
        </div>

        <div className="glass-card room-card">
          <div className="card-header">
            <h2 className="card-title">Room Information</h2>
            <div className="status-indicator">
              <span className="status-dot"></span>
              <span className="status-text">Active</span>
            </div>
          </div>

          <div className="room-info-section">
            <div className="welcome-message">
              <h3 className="welcome-text">Hello, <span className="player-name">{gamer?.name}</span></h3>
              <h3 className="room-name">Welcome to <span className="room-name-highlight">{roomName}</span></h3>
            </div>

            <div className="room-id-section">
              <div className="room-id-container">
                <span className="room-id-label">Room ID:</span>
                <span id="room-id-span" className="room-id-value">{roomId}</span>
                <button onClick={copyRoomId} className="copy-button">
                  <span className="copy-icon">📋</span>
                  <span className="copy-text">Copy</span>
                </button>
              </div>
              <div className="share-text">Share this ID with others to join the tournament</div>
            </div>
          </div>

          <div className="participants-section">
            <h3 className="section-title">Participants ({participants?.length})</h3>
            <div className="participants-grid">
              {participants?.map((participant, index) => (
                <div key={index} className={`participant-card ${participant.id === userID ? 'current-player' : ''} ${participant.id === admi ? 'admin-player' : ''}`}>
                  <div className="participant-name">{participant.name}</div>
                  <div className="participant-badges">
                    {participant.id === userID && <span className="badge you-badge">YOU</span>}
                    {participant.id === admi && <span className="badge admin-badge">ADMIN</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="action-buttons">
            {isAdmin ? (
              <>
                <button 
                  onClick={startTournament} 
                  className={`neon-button start-button ${isLoading ? 'loading' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="loading-text">
                      Starting Tournament<span className="loading-dots"></span>
                    </span>
                  ) : (
                    <>
                      <span className="button-icon">⚔️</span>
                      <span className="button-text">START TOURNAMENT</span>
                    </>
                  )}
                </button>
                <button 
                  onClick={handleDeleteRoom} 
                  className={`neon-button delete-button ${isLoading ? 'loading' : ''}`}
                  disabled={isLoading}
                >
                  <span className="button-icon">🗑️</span>
                  <span className="button-text">DELETE ROOM</span>
                </button>
              </>
            ) : (
              <button 
                onClick={handleLeaveRoom} 
                className={`neon-button leave-button ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="loading-text">
                    Leaving Room<span className="loading-dots"></span>
                  </span>
                ) : (
                  <>
                    <span className="button-icon">🚪</span>
                    <span className="button-text">LEAVE ROOM</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* HUD Elements */}
        <div className="hud-corner top-left">
          <div className="hud-element">
            <span className="hud-label">ROOM</span>
            <span className="hud-value">{roomId?.slice(0, 8)}</span>
          </div>
        </div>
        
        <div className="hud-corner top-right">
          <div className="hud-element">
            <span className="hud-label">PLAYERS</span>
            <span className="hud-value">{participants?.length || 0}</span>
          </div>
        </div>

        <div className="hud-corner bottom-left">
          <div className="hud-element">
            <span className="hud-label">STATUS</span>
            <span className="hud-value">{started ? 'STARTED' : 'WAITING'}</span>
          </div>
        </div>

        <div className="hud-corner bottom-right">
          <div className="hud-element">
            <span className="hud-label">ROLE</span>
            <span className="hud-value">{isAdmin ? 'ADMIN' : 'PLAYER'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
