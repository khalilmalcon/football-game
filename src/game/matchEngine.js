import { teamA, teamB } from "./matchTeams";
import { eventFlow, eventDescriptions } from "./matchEvents";
import useMatchStore from "./matchStore";

// Función para establecer la posesión del balón
function setPossession(team) {
  if (team === teamA || team === teamB) {
    currentPossession = team;
  } else {
    console.log("No existe el equipo para cambiar la posesión: ", team);
  }
}
// Función para alternar la posesión del balón
function switchPossession() {
  currentPossession = currentPossession === teamA ? teamB : teamA;
}
// Función para obtener la posesión del balón
function getPossession() {
  return currentPossession;
}

// Función para determinar el próximo evento
const getNextEvent = (lastEvent) => {
  let possibleEvents = eventFlow[lastEvent] || console.log('El evento no existe: ${lastEvent}');
  possibleEvents = possibleEvents.filter(event => event !== lastEvent);
  return possibleEvents[Math.floor(Math.random() * possibleEvents.length)];
};

// Función para formatear el tiempo (mm:ss)
const formatEventTime = (minutes) => {
  return `${String(minutes).padStart(2, "0")}:00`;
};


let matchInterval = null;
let lastEvent = "inicio"; // Empezamos con el evento "inicio"
let currentPossession = teamA; // El Equipo A inicia con la posesión del balón
let team = "teamA";

export const useMatchEngine = () => {
  const { updateEvents, updateScore, setRunning, setPaused, setCurrentTime, setMatchStatus, setModal, updateStats } = useMatchStore();

  const startMatch = () => {

    setRunning(true);
    setPaused(false);

    matchInterval = setInterval(() => {
      setCurrentTime((prevTime) => {

        let newTime = prevTime + 1;
        const eventTime = formatEventTime(newTime);

        team = currentPossession === teamA ? "teamA" : "teamB"; // La posesión determina qué equipo realiza la acción de los eventos
        const teamPossession = getPossession() === teamA ? teamA.name : teamB.name;


        // Inicio del partido ('00)
        if (prevTime === 0) { // Solo si es un nuevo partido
          lastEvent = "inicio"; 
          currentPossession = teamA; 
          team = "teamA";
  
          updateEvents([
            { time: "00:00", text: eventDescriptions["inicio"](teamPossession) }, // Inicio del partido
          ]);
          updateScore([0, 0]); // Reinicia el marcador
          setMatchStatus("1er Tiempo");
        }

        // Final del primer tiempo ('45)
        if (newTime === 45) {
          updateEvents((prevEvents) => [{ time: eventTime, text: eventDescriptions["final primer tiempo"](teamPossession) }, ...prevEvents]);
          setPaused(true); // Pausa el partido
          clearInterval(matchInterval); // Detiene la simulación temporalmente
          setMatchStatus("Entretiempo");
          lastEvent = "inicio segundo tiempo"; // Actualiza el último evento
          
          setTimeout(() => {
            setModal({ visible: true, content: "entretiempo" }); // Mostrar estadísticas del entretiempo
          }, 1500);

          return newTime;
        }

        // Comienzo segundo tiempo ('46)
        if (newTime === 46) {
          setMatchStatus("2do Tiempo");
        }

        // Final del partido ('90)
        if (newTime >= 90) {
          updateEvents((prevEvents) => [{ time: eventTime, text: eventDescriptions["final partido"](teamPossession) }, ...prevEvents]);
          setRunning(false);
          clearInterval(matchInterval);
          setMatchStatus("Finalizado");
          newTime = 0;

          setTimeout(() => {
            setModal({ visible: true, content: "finalizado" }); // Mostrar estadísticas del entretiempo
          }, 1500);

          return newTime;
        }


        const nextEvent = getNextEvent(lastEvent);
        lastEvent = nextEvent; // Guarda el último evento


        // Recolección de estadísticas según el evento
        switch (nextEvent) {

          case "gol":
            updateScore(([prevScoreA, prevScoreB]) => (
              team === "teamA" ? [prevScoreA + 1, prevScoreB] : [prevScoreA, prevScoreB + 1]
            ));
            //updateStats("shotsOnTarget", team, 1);
            updateStats("goals", team, 1);
            switchPossession();
            break;
          
          case "tiro a puerta":
            updateStats("shots", team, 1);
            break;

          case "tiro desviado":
            updateStats("shots", team, 1);
            switchPossession();
            break;

          case "parada del portero":
          case "tiro al poste":
            updateStats("shotsOnTarget", team, 1);
            switchPossession();
            break;
        
          case "corner":
            updateStats("corners", team, 1);
            break;
        
          case "fuera de juego":
            updateStats("offsides", team, 1);
            switchPossession();
            break;
        
          case "pase":
            updateStats("passes", team, 1);
            break;
        
          case "pase completado":
            updateStats("passes", team, 1);
            updateStats("completedPasses", team, 1);
            break;
        
          case "falta":
            switchPossession();
            updateStats("fouls", team, 1);
            break;
          
          case "tiro libre directo":
          case "tiro libre indirecto":
            //switchPossession();
            break;
        
          case "tarjeta amarilla":
            updateStats("yellowCards", team, 1);
            break;
        
          case "segunda amarilla":
            updateStats("yellowCards", team, 1);
            updateStats("redCards", team, 1);
            break;
        
          case "tarjeta roja":
            updateStats("redCards", team, 1);
            break;

          case "pérdida de balón":
            switchPossession();
            break;
        
          default:
            break;
        }

        // Genera la descripción del evento
        const eventDescription = eventDescriptions[nextEvent]
          ? eventDescriptions[nextEvent](teamPossession) // Pasa el equipo actual
          : nextEvent; // Si no hay descripción usa el nombre del evento
       
        // Muestra el evento
        updateEvents((prevEvents) => [{ time: eventTime, text: eventDescription }, ...prevEvents]);
        
        console.log(`${newTime} - ${team}: ${nextEvent}`);

        return newTime;
      });
    }, 1000);
  };

  const pauseMatch = () => {
    setPaused(true);
    clearInterval(matchInterval);
  };

  return { startMatch, pauseMatch };
};
