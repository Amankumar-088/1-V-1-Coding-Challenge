import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import IDE from "./IDE";
import Problem from "./Problem";
import "../css/Match.css";

const Round = () => {
  let { user } = useAuth();
  const [userID,setUserID] = useState("");
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [gamer,setGamer] = useState("");
  const [opponentName,setOpponentName] = useState("");
  const [rnd, setRnd] = useState(null);
  const [pID,setPID] = useState("");
  const [isAdmin,setIsAdmin] = useState(false);
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("30");
  const [resultCalculated,setResultCalculated] = useState(true);

  useEffect(() => {
    user = JSON.parse(localStorage.getItem("user"));
    setUserID(user.id);
    if (!user) {
      navigate("/login");
    } else {
      const fetchData = async () => {
        try {
          const response = await axios.get("https://code-1v1-tournament-platform-backend.vercel.app/api/tournament/getTournamentDetails", { params: { roomId }});
          const { Players, roundNo, Admin,isResultCalculated } = response.data;
          setResultCalculated(isResultCalculated);
          if(Admin === user.id){
            setIsAdmin(true);
          }
          setRnd(roundNo);
          const userIndex = Players.findIndex(player => player.id === user.id);
          if (userIndex === -1) {
            navigate(`/room/${roomId}/tournament`);
            return;
          }
          setGamer(Players[userIndex]);
          const oppoIndex = (userIndex%2==0? userIndex+1:userIndex-1);
          setOpponentName(Players[oppoIndex]?.name || 'Bot');

          const ID=user.id;
          const res = await axios.get("https://code-1v1-tournament-platform-backend.vercel.app/api/tournament/match/getProblemID",  { params: { ID }});
          const {problemID} = res.data;
          setPID(problemID);

        } catch (error) {
          console.error('Error fetching match:', error);
        }
      };

      fetchData();
      
    }
  }, []);
  
  useEffect(() => {
    const fetchTime = async () => {
      try {
        const response = await axios.get("https://code-1v1-tournament-platform-backend.vercel.app/api/tournament/getTime", { params: { roomId } });
        const { startTime } = response.data;
        const currentTime = new Date();
        const differenceInMilliseconds = Math.abs(currentTime - new Date(startTime));
        const fifteenMinutesInMilliseconds = 10 * 60 * 1000;
        const timeLeftInMilliseconds = fifteenMinutesInMilliseconds - differenceInMilliseconds;
        if (timeLeftInMilliseconds <= 0) {
          if (!resultCalculated) {
            try {
              await axios.post("https://code-1v1-tournament-platform-backend.vercel.app/api/tournament/match/calculateResult", { roomId });
              setResultCalculated(true);
            } catch (error) {
              console.error('Error:', error);
            }
          }
          navigate(`/room/${roomId}/tournament`);
        } else {
          const minutesLeft = Math.floor(timeLeftInMilliseconds / (60 * 1000)).toString().padStart(2, '0');
          const secondsLeft = Math.floor((timeLeftInMilliseconds % (60 * 1000)) / 1000).toString().padStart(2, '0');
          setMinutes(minutesLeft);
          setSeconds(secondsLeft);
        }
      } catch (error) {
        console.error('Error fetching match:', error);
      }
    };
  
    fetchTime();
  
    const intervalId = setInterval(fetchTime, 5000);
    return () => clearInterval(intervalId);
  }, [roomId, resultCalculated]);

  return (
    <div className="match-container">
      <div className="match-header">
        {rnd && <h1 className="match-title">Round No. - {rnd}</h1>}
        <div className="timer">
          <p>Time Left- {minutes}:{seconds} (Time changes every 5 seconds)</p>
        </div>
      </div>
      
      <div className="match-info">
        <span className="player-name">{gamer?.name}</span> 
        <span className="vs-text">vs</span> 
        <span className="opponent-name">{opponentName}</span>
      </div>

      {pID === "" ? (
        <></>
      ) : (
        <div className="match-content">
          <div className="problem-section">
            <Problem problemId={pID} />
          </div>
          <div className="ide-section">
            {userID !== "" && <IDE userID={userID} problemID={pID} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default Round;
