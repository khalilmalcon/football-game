import React, { createContext, useContext, useState } from "react";

const MatchContext = createContext();

export const MatchProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [matchStatus, setMatchStatus] = useState("Partido");

  const [modal, setModal] = useState({
    visible: false,
    content: null, // Puede ser "formacion", "entretiempo" o "finalizado"
  });

  // Estado para las estadísticas del partido
  const [matchStats, setMatchStats] = useState({
    goals: { teamA: 0, teamB: 0 },
    shots: { teamA: 0, teamB: 0 },
    shotsOnTarget: { teamA: 0, teamB: 0 },
    corners: { teamA: 0, teamB: 0 },
    offsides: { teamA: 0, teamB: 0 },
    passes: { teamA: 0, teamB: 0 },
    completedPasses: { teamA: 0, teamB: 0 },
    fouls: { teamA: 0, teamB: 0 },
    yellowCards: { teamA: 0, teamB: 0 },
    redCards: { teamA: 0, teamB: 0 },
    possession: { teamA: 50, teamB: 50 }, // Inicialmente 50% para cada equipo
  });

  // Función para actualizar estadísticas
  const updateStats = (stat, team, value) => {
    setMatchStats((prevStats) => {
      
      // Validar si la estadística existe en matchStats
      if (!Object.hasOwn(prevStats, stat)) {
        console.error(`Error: Estadística '${stat}' no es válida.`);
        return prevStats;
      }

      // Validar si el equipo es válido
      if (!Object.hasOwn(prevStats[stat], team)) {
        console.error(`Error: Equipo inválido en '${stat}': ${team}`);
        return prevStats;
      }
  
      // Asegurar que el valor no sea undefined antes de sumarlo
      const updatedStat = {
        ...prevStats?.[stat],
        [team]: (prevStats?.[stat]?.[team] ?? 0) + value,
      };
  
      return {
        ...prevStats,
        [stat]: updatedStat,
      };
    });
  };

  // Función para actualizar los eventos
  const updateEvents = (newEvents) => {
    setEvents((prevEvents) => 
      newEvents instanceof Function ? newEvents(prevEvents) : newEvents
    );
  };

  // Función para actualizar el marcador
  const updateScore = (updateFn) => {
    setScoreA((prevA) => {
      const newScores = updateFn instanceof Function ? updateFn([prevA, scoreB]) : updateFn;
      if (!Array.isArray(newScores)) {
        console.error("Error: updateScore espera un array pero recibió:", newScores);
        return prevA;
      }
      return newScores[0];
    });
  
    setScoreB((prevB) => {
      const newScores = updateFn instanceof Function ? updateFn([scoreA, prevB]) : updateFn;
      if (!Array.isArray(newScores)) {
        console.error("Error: updateScore espera un array pero recibió:", newScores);
        return prevB;
      }
      return newScores[1];
    });
  };

  // Función para actualizar el tiempo de partido
  const updateTime = (newTime) => {
    setCurrentTime((prevTime) => (newTime instanceof Function ? newTime(prevTime) : newTime));
  };

  return (
    <MatchContext.Provider value = {{ 
      events, scoreA, scoreB, running, paused, currentTime, matchStatus, modal, matchStats, 
      setRunning, setPaused, setCurrentTime: updateTime, updateEvents, updateScore, setMatchStatus, setModal, updateStats
    }}>
      {children}
    </MatchContext.Provider>
  );
};

// Hook para acceder al contexto
export const useMatch = () => useContext(MatchContext);
