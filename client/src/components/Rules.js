import React from 'react';
import "../css/Rules.css";

const Rules = () => {
  return (
    <div className="rules-container">
      <div className="rules-background">
        {/* Animated particles background */}
        <div className="particles">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }} />
          ))}
        </div>
      </div>

      <div className="rules-content">
        <div className="title-section">
          <h1 className="main-title">
            <span className="title-glow">KNOW</span>
            <span className="title-accent">THE</span>
            <span className="title-glow">GAME</span>
          </h1>
          <div className="subtitle">Tournament Manual</div>
        </div>

        <div className="glass-card rules-card">
          <div className="card-header">
            <h2 className="card-title">Comprehensive Guide</h2>
            <div className="status-indicator">
              <span className="status-dot"></span>
              <span className="status-text">Updated</span>
            </div>
          </div>

          <div className="rules-content-text">
            <p className="intro-text">
              Below is a comprehensive manual to help you understand our platform and the game in detail:
            </p>

            <div className="rules-list">
              <div className="rule-item">
                <h3 className="rule-title">Room Creation and Joining</h3>
                <ul className="rule-details">
                  <li>To initiate a tournament, users can create a room by clicking on the "Create Room" button.</li>
                  <li>Upon creation, a unique room ID will be generated, which can be shared with other users.</li>
                  <li>Participants can join a room by entering the provided room ID in the designated field and clicking on "Join Room".</li>
                </ul>
              </div>

              <div className="rule-item">
                <h3 className="rule-title">Admin Privileges</h3>
                <ul className="rule-details">
                  <li>The user who creates the room will be designated as the admin.</li>
                  <li>Admins have exclusive access to start the tournament and manage its progression.</li>
                </ul>
              </div>

              <div className="rule-item">
                <h3 className="rule-title">Tournament Structure</h3>
                <ul className="rule-details">
                  <li>The tournament is organized into rounds, each comprising multiple 1v1 matchups between active players.</li>
                </ul>
              </div>

              <div className="rule-item">
                <h3 className="rule-title">Starting Rounds</h3>
                <ul className="rule-details">
                  <li>Only the admin has the authority to start a new round.</li>
                  <li>Admins can initiate a round when all participants are ready to compete.</li>
                </ul>
              </div>

              <div className="rule-item">
                <h3 className="rule-title">Player Pairing</h3>
                <ul className="rule-details">
                  <li>In each round, players are randomly paired for 1v1 matchups.</li>
                  <li>If the number of players is odd, a bot is paired with one randomly chosen player to ensure fair competition.</li>
                </ul>
              </div>

              <div className="rule-item">
                <h3 className="rule-title">Problem Presentation</h3>
                <ul className="rule-details">
                  <li>Once paired, participants are presented with a coding problem to solve within a specified time limit.</li>
                </ul>
              </div>

              <div className="rule-item">
                <h3 className="rule-title">Determining Winners</h3>
                <ul className="rule-details">
                  <li>The winner of each 1v1 matchup is determined based on the correctness of their code or submission time (if number of testcases passed are equal).</li>
                </ul>
              </div>

              <div className="rule-item">
                <h3 className="rule-title">Advancing to Next Round</h3>
                <ul className="rule-details">
                  <li>Winners of each round proceed to the next round, provided the admin initiates another round.</li>
                </ul>
              </div>

              <div className="rule-item">
                <h3 className="rule-title">Inactive Players</h3>
                <ul className="rule-details">
                  <li>Players who lose a round become inactive and are unable to progress to subsequent rounds.</li>
                </ul>
              </div>

              <div className="rule-item">
                <h3 className="rule-title">Final Winner</h3>
                <ul className="rule-details">
                  <li>The tournament progresses as a binary tree structure, culminating in the declaration of a final winner when only one active player remains.</li>
                </ul>
              </div>

              <div className="rule-item">
                <h3 className="rule-title">Fairness and Transparency</h3>
                <ul className="rule-details">
                  <li>Our platform ensures fairness through random pairing, unbiased problem selection, and transparent determination of winners.</li>
                </ul>
              </div>
            </div>

            <p className="outro-text">
              We hope this manual provides you with a comprehensive understanding of our Code 1v1 Tournament. If you have any further questions or feedback, please don't hesitate to contact us.
            </p>

            <div className="final-message">
              <span className="message-text">Happy coding and may the best coder win!</span>
            </div>
          </div>
        </div>

        {/* HUD Elements */}
        <div className="hud-corner top-left">
          <div className="hud-element">
            <span className="hud-label">RULES</span>
            <span className="hud-value">ACTIVE</span>
          </div>
        </div>
        
        <div className="hud-corner top-right">
          <div className="hud-element">
            <span className="hud-label">VERSION</span>
            <span className="hud-value">1.0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rules;
