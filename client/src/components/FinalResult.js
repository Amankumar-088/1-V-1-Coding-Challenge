import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import "../css/FinalResult.css";

const FinalResult = () => {
  let { user } = useAuth();
  const navigate = useNavigate();
  const [newPlayers, setNewPlayers] = useState([]);
  const [userID,setUserID] = useState("");
  const [oldPlayers, setOldPlayers] = useState([]);
  const [matchResults, setMatchResults] = useState([]);
  const { roomId } = useParams();
  const [isAdmin,setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        user = JSON.parse(localStorage.getItem("user"));
        setUserID(user.id);
        if (!user) {
          navigate("/login");
        }
        const response = await axios.get("https://code-1v1-tournament-platform-backend.vercel.app/api/tournament/getTournamentDetails", { params: { roomId }});
        const { OldPlayers, Players, Admin } = response.data;
        if (Admin === user.id) {
          setIsAdmin(true);
        }
        setOldPlayers(OldPlayers);
        setNewPlayers(Players);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };
  
    fetchData();
  }, [userID, navigate, roomId]);

  useEffect(() => {
    const checkEnd = async () => {
      try {
        const response = await axios.get("https://code-1v1-tournament-platform-backend.vercel.app/api/tournament/getTournamentDetails", { params: { roomId }});
        const { isRunning } = response.data;
        if(!isRunning){
          navigate(`/room/${roomId}`);
          return;
        }
      } catch (error) {
        navigate(`/room/${roomId}`);
        console.error('Error checking end:', error);
      }
    };
  
    checkEnd();
  
    const interval = setInterval(checkEnd, 2000);
  
    return () => clearInterval(interval);

  }, [userID, navigate, roomId]);

  useEffect(() => {
    const calculateMatchResults = () => {
      const results = [];
      const newPlayersSet = new Set(newPlayers.map(player => player.name));
      const numPlayers = oldPlayers.length;
    
      for (let i = 0; i < numPlayers; i += 2) {
        const player1 = oldPlayers[i];
        const player2 = i + 1 < numPlayers ? oldPlayers[i + 1] : null;
        const winner = newPlayersSet.has(player1.name) ? player1.name :
                       player2 && newPlayersSet.has(player2.name) ? player2.name : 'Bot';
        results.push([player1.name, player2 ? player2.name : 'Bot', winner]);
      }
    
      setMatchResults(results);
    };

    calculateMatchResults();
  }, [oldPlayers, newPlayers]);

  const leaveTournament = async () => {
    try {
      await axios.post("https://code-1v1-tournament-platform-backend.vercel.app/api/tournament/leaveTournament", { roomId, userID });
      navigate(`/room/${roomId}`);
    } catch (error) {
      console.error("Error leaving tournament:", error);
    }
  };

  const endTournament = async () => {
    try {
      await axios.post("https://code-1v1-tournament-platform-backend.vercel.app/api/tournament/endTournament", { roomId });
      navigate(`/room/${roomId}`);
    } catch (error) {
      console.error("Error ending tournament:", error);
    }
  };

  return (
    <div className="final-result-container">
      {matchResults && (
        <h1 className="congratulations-title">
          Congratulations to{" "}
          {matchResults
            .filter(match => match[2] !== 'Bot')
            .map((match, index) => (
              <span key={index} className="winner-name">
                {match[2]}
                {index !== matchResults.length - 1 ? (
                  index === matchResults.length - 2 ? " and " : ", "
                ) : "!"}
              </span>
            ))}
        </h1>
      )}

      <div className="results-section">
        <h2 className="results-title">Final Round Results:</h2>
      </div>
      
      <div className="match-results-table">
        <table className="match-results-table__table">
          <thead>
            <tr>
              <th className="match-results-table__header">Match</th>
              <th className="match-results-table__header">Winner</th>
            </tr>
          </thead>
          <tbody>
            {matchResults?.map((match, index) => (
              <tr key={index}>
                <td className="match-results-table__cell">{match[0]} vs {match[1]}</td>
                <td className="match-results-table__cell">{match[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {isAdmin ? (
        <div className="admin-buttons">
          <button className="final-result-button" onClick={endTournament}>
            End Tournament
          </button>
        </div>
      ) : (
        <div className="player-buttons">
          <button className="final-result-button" onClick={leaveTournament}>
            Leave Tournament
          </button>
        </div>
      )}
    </div>
  );
};

export default FinalResult;
