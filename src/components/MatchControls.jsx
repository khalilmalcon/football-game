import React from "react";
import { useMatch } from "../context/MatchContext";
import { useMatchEngine } from "../game/matchEngine";

const MatchControls = () => {
    
  const { running, paused } = useMatch();
  const { startMatch, pauseMatch } = useMatchEngine();

  return (
    <div className="match-controls">
      {!running || paused ? (
        <button onClick={startMatch}>
          {paused ? "Reanudar Partido" : "Iniciar Partido"}
        </button>
      ) : (
        <button onClick={pauseMatch}>Pausar Partido</button>
      )}
    </div>
  );
};

export default MatchControls;
