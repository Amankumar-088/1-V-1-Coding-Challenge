import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import "../css/Round.css";

async function combinePairsAsync(arr) {
    let combinedPairs = [];
    for (let i = 0; i < arr.length; i += 2) {
        let pair = [arr[i], arr[i + 1] || null];
        combinedPairs.push(pair);
    }
    return combinedPairs;
}

const Round = () => {
  let { user } = useAuth();
  const [userID,setUserID] = useState("");
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [match, setMatches] = useState([]);
  const [gamer,setGamer] = useState("");
  const [rnd, setRnd] = useState(null);
  const [timeLeft, setTimeLeft] = useState(5);

  const updateTime = async () => {
    try {
      const response = await axios.get("https://code-1v1-tournament-platform-backend.vercel.app/api/tournament/getTime", { params: { roomId }});

      const { startTime } = response.data;

      const currentTime = new Date();

      const differenceInMilliseconds = Math.abs(currentTime - new Date(startTime));

      const differenceInSeconds = differenceInMilliseconds / 1000;

      const timeLeftInSeconds = Math.floor(60 - differenceInSeconds);

      setTimeLeft(timeLeftInSeconds >= 0 ? timeLeftInSeconds : 0);
  
      if (timeLeftInSeconds <= 0) {
        navigate(`/room/${roomId}/tournament/match`);
      }

    } catch (error) {
      console.error('Error fetching match:', error);
    }
  }; 

  useEffect(() => {
    user = JSON.parse(localStorage.getItem("user"));
    setUserID(user.id);
    if (!user) {
      navigate("/login");
    } else {
      const fetchData = async () => {
        try {
          const response = await axios.get("https://code-1v1-tournament-platform-backend.vercel.app/api/tournament/getTournamentDetails", { params: { roomId }});
          const { Players, roundNo } = response.data;
          setRnd(roundNo);
          const userIndex = Players.findIndex(player => player.id === user.id);
          if (userIndex === -1) {
            navigate(`/room/${roomId}/tournament`);
            return;
          }
          setGamer(Players[userIndex]);
          const combined = await combinePairsAsync(Players);
          setMatches(combined);
          
        } catch (error) {
          console.error('Error fetching round:', error);
        }
      };
      
      fetchData();

      const intervalId = setInterval(updateTime, 2000);
      return () => clearInterval(intervalId);
      
    }
  }, []);

  return (
    <div className="round-container">
      <div>
        {rnd && <h1 className="round-title">Round No. - {rnd}</h1>}
      </div>
      <div>
        {gamer && <h1 className="round-subtitle">All the best, {gamer?.name}!</h1>}
      </div>
      <div className="countdown">
        <p>Match will start in : {timeLeft} seconds (Time changes every 2 seconds)</p>
      </div>
      <div className="matches-section">
        <h2>1v1 Matches:</h2>
        <div className="matches-list">
          <ul className="matches-grid">
            {match && match.map((pair, index) => (
                <li key={index} className="match-item">
                    {(pair[0]?.id === userID || pair[1]?.id === userID) ? 
                        <h3>{pair[0]?.name || 'Bot'} vs {pair[1]?.name || 'Bot'}</h3> :
                        <h4>{pair[0]?.name || 'Bot'} vs {pair[1]?.name || 'Bot'}</h4>}
                </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Round;
