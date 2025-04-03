import React from "react";
import { useMatchEngine } from "../game/matchEngine";
import useMatchStore from "../game/matchStore";

const MatchControls = () => {
    
  const { running, paused } = useMatchStore();
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
