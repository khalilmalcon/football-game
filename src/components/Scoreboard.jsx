import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { teamA, teamB } from "../game/matchTeams";
import useMatchStore from "../game/matchStore";

function Scoreboard() {

  const { scoreA = 0, scoreB = 0, currentTime = 0, matchStatus = "Partido" } = useMatchStore();

  const scoreARef = useRef(null);
  const scoreBRef = useRef(null);

  // Animación cuando cambia scoreA
  useEffect(() => {
    if (scoreARef.current && scoreA > 0) {
      gsap.to(scoreARef.current, {
        scale: 1.3,
        backgroundColor: "#ff5555",
        duration: 0.3,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
        clearProps: "all",
      });
    }
  }, [scoreA]);

  // Animación cuando cambia scoreB
  useEffect(() => {
    if (scoreBRef.current && scoreB > 0) {
      gsap.to(scoreBRef.current, {
        scale: 1.3,
        backgroundColor: "#ff5555",
        duration: 0.3,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
        clearProps: "all",
      });
    }
  }, [scoreB]);

  return (
    <div className="scoreboard">

      <div className="scoreboard-team scoreboard-team-local">
        <span className="scoreboard-team-score" ref={scoreARef}>{scoreA ?? 0}</span>
        <div className="scoreboard-team-name">{teamA.shortName}</div>
      </div>

      <div className="scoreboard-timer">
        <span className="scoreboard-timer-halftime">{matchStatus}</span>
        <span className="scoreboard-timer-time">{String(currentTime).padStart(2, "0")}:00</span>
      </div>

      <div className="scoreboard-team scoreboard-team-visitor">
        <div className="scoreboard-team-name">{teamB.shortName}</div>
        <span className="scoreboard-team-score" ref={scoreBRef}>{scoreB ?? 0}</span>
      </div>

    </div>
  );
}

export default Scoreboard;
