import { create } from "zustand";

const useMatchStore = create((set) => ({

  // Estado del partido
  events: [],
  scoreA: 0,
  scoreB: 0,
  running: false,
  paused: false,
  currentTime: 0,
  matchStatus: "Partido",

  // Estado del modal
  modal: {
    visible: false,
    content: null, // Puede ser "formacion", "entretiempo" o "finalizado"
  },

  // Estado para las estadísticas del partido
  matchStats: {
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
  },

  // Métodos para actualizar el estado
  setMatchStatus: (status) => set({ matchStatus: status }),
  setRunning: (isRunning) => set({ running: isRunning }),
  setPaused: (isPaused) => set({ paused: isPaused }),
  //setCurrentTime: (time) => set({ currentTime: time }),
  setCurrentTime: (time) =>
    set((state) => ({
      currentTime: typeof time === "function" ? time(state.currentTime) : time,
    })),

  // Función para actualizar el marcador
  updateScore: (updateFn) =>
    set((state) => {
      const newScores =
        updateFn instanceof Function
          ? updateFn([state.scoreA, state.scoreB])
          : updateFn;
      if (!Array.isArray(newScores)) {
        console.error("Error: updateScore espera un array pero recibió:", newScores);
        return state;
      }
      return { scoreA: newScores[0], scoreB: newScores[1] };
    }),

  // Función para actualizar los eventos
  updateEvents: (newEvents) =>
    set((state) => ({
      events: newEvents instanceof Function ? newEvents(state.events) : newEvents,
    })),

  setModal: (modal) => set({ modal }),

  // Función para actualizar estadísticas
  updateStats: (stat, team, value) =>
    set((state) => {

      // Validar si la estadística existe en matchStats
      if (!Object.hasOwn(state.matchStats, stat)) {
        console.error(`Error: Estadística '${stat}' no es válida.`);
        return state;
      }
      // Validar si el equipo es válido
      if (!Object.hasOwn(state.matchStats[stat], team)) {
        console.error(`Error: Equipo inválido en '${stat}': ${team}`);
        return state;
      }
      return {
        matchStats: {
          ...state.matchStats,
          [stat]: {
            ...state.matchStats[stat],
            [team]: (state.matchStats[stat][team] ?? 0) + value,
          },
        },
      };
    }),
}));

export default useMatchStore;
