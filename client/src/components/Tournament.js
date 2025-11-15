import React, { useState, useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import Result from "./Result";
import "../css/Tournament.css";

const Tournament = () => {
  let { user } = useAuth();
  const [userID,setUserID] = useState("");
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [players, setPlayers] = useState([]);
  const [gamer,setGamer] = useState("");
  const [rnd, setRnd] = useState(null);
  const [outPlayers,setOutPlayers] = useState([]);
  const [roomName,setRoomName] = useState("");
  const [admin,setAdmin] = useState("");
  const [isAdmin,setIsAdmin] = useState(false);
  const [isPlaying,setIsPlaying] = useState(true);
  const [started,setStarted] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        user = JSON.parse(localStorage.getItem("user"));
        setUserID(user.id);
        if (!user) {
          navigate("/login");
        }
        const response = await axios.get("https://code-1v1-tournament-platform-backend.vercel.app/api/tournament/getTournamentDetails", { params: { roomId }});
        const { Participants, Players, roundNo, RoomName, Admin, isStarted, isDeclared, isRunning } = response.data;

        setStarted(isStarted);
        
        if(!isRunning){
          navigate(`/room/${roomId}`);
          return;
        }

        if(Players.length==1){
          navigate(`/room/${roomId}/tournament/finalresult`);
          return;
        }

        const out = Participants.filter(participant => !Players.some(player => player.id === participant.id));

        setAdmin(Admin);
        setRoomName(RoomName);
        setOutPlayers(out);
        setPlayers(Players);
        if(!isStarted){
          setRnd(roundNo);
        }
        
        if (Admin === user.id) {
          setIsAdmin(true);
        }
  
        const userIndex = Participants.findIndex(player => player.id === user.id);
        if (userIndex === -1) {
          return;
        }
  
        const userParticipant = Participants[userIndex];
        setGamer(userParticipant);

        const Index = Players.findIndex(player => player.id === user.id);
        if(Index===-1){
          setIsPlaying(false);
        }
  
        if (isStarted && Index!==-1) {
          navigate(`/room/${roomId}/tournament/round`);
        }
  
        if (isDeclared) {
          navigate(`/room/${roomId}/tournament/finalresult`);
        }
      } catch (error) {
        navigate(`/room/${roomId}`);
        console.error('Error fetching tournament details:', error);
      }
    };
  
    fetchData();
  
    const interval = setInterval(fetchData, 2000);
  
    return () => clearInterval(interval);
    
  }, []);  

  const leaveTournament = async () => {
    try {
      await axios.post("https://code-1v1-tournament-platform-backend.vercel.app/api/tournament/leaveTournament", { roomId, userID });
      navigate(`/room/${roomId}`);
    } catch (error) {
      console.error("Error leaving tournament:", error);
    }
  };

  const endTournament = async () => {
    if(started){
      alert("A Round is running. Wait for it to end!");
      return;
    }
    try {
      await axios.post("https://code-1v1-tournament-platform-backend.vercel.app/api/tournament/endTournament", { roomId });
      navigate(`/room/${roomId}`);
    } catch (error) {
      console.error("Error ending tournament:", error);
    }
  };

  const startRound = async () => {
    if(started){
      alert("Already a Round is running. Wait for it to end!");
      return;
    }
    try {
      await axios.post("https://code-1v1-tournament-platform-backend.vercel.app/api/tournament/startRound", { roomId });
      if(isPlaying) {
        navigate(`/room/${roomId}/tournament/round`);
      }
    } catch (error) {
      console.error("Error starting tournament:", error);
    }
  };

  const declareResult = async () => {
    if(rnd!==null){
      if(rnd===0){
        alert("You need to conduct atleast one round before declaring results!");
        return;
      }
    }
    if(started){
      alert("A Round is running. Wait for it to end!");
      return;
    }
    try {
      await axios.post("https://code-1v1-tournament-platform-backend.vercel.app/api/tournament/declareResult", { roomId });
      navigate(`/room/${roomId}/tournament/finalresult`);
    } catch (error) {
      console.error("Error declaring results:", error);
    }
  };

  return (
    <div className="tournament-container">
      <div>
        <h1 className="tournament-title">The Tournament of {roomName}</h1>
      </div>
    
      {isPlaying ? (
        <h2 className="tournament-subtitle">Best of luck, {gamer?.name}!</h2>
      ) : (
        <h2 className="tournament-subtitle">Better luck next time, {gamer?.name}!</h2>
      )}

      {rnd && roomId && rnd > 0 ? (
        <div className="tournament-content">
          <div className="tournament-section">
            <div>
              <h2>Active players:</h2>
              <div className="players-list">
                <ul className="players-grid">
                  {players?.map((player, index) => (
                    <li key={index} className="player-item">
                      {player.name} {player.id === userID ? "(You)" : ""}{" "}
                      {player.id === admin ? "(Admin)" : ""}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h2>Out of the tournament players:</h2>
              <div className="players-list">
                <ul className="players-grid">
                  {outPlayers?.map((player, index) => (
                    <li key={index} className="player-item">
                      {player.name} {player.id === userID ? "(You)" : ""}{" "}
                      {player.id === admin ? "(Admin)" : ""}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="tournament-section">
            <Result roomId={roomId} rnd={rnd}/>
          </div>
        </div>
      ) : (
        <div className="tournament-content">
          <div className="tournament-section">
            <div>
              <h2>Active players:</h2>
              <div className="players-list">
                <ul className="players-grid">
                  {players?.map((player, index) => (
                    <li key={index} className="player-item">
                      {player.name} {player.id === userID ? "(You)" : ""}{" "}
                      {player.id === admin ? "(Admin)" : ""}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h2>Out of the tournament players:</h2>
              <div className="players-list">
                <ul className="players-grid">
                  {outPlayers?.map((player, index) => (
                    <li key={index} className="player-item">
                      {player.name} {player.id === userID ? "(You)" : ""}{" "}
                      {player.id === admin ? "(Admin)" : ""}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    
      {isAdmin ? (
        <div className="admin-buttons">
          <button className="tournament-button start-round-button" onClick={startRound}>
            Start Round {rnd + 1} !
          </button>
          <button className="tournament-button declare-result-button" onClick={declareResult}>
            Declare all active players as Winners
          </button>
          <button className="tournament-button end-tournament-button" onClick={endTournament}>
            End Tournament
          </button>
        </div>
      ) : (
        <div className="player-buttons">
          <button className="tournament-button leave-tournament-button" onClick={leaveTournament}>
            Leave Tournament
          </button>
        </div>
      )}
    </div>
  );
};

export default Tournament;
