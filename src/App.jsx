import React from "react";
import { useMatch } from "./context/MatchContext";
import EventLog from "./components/EventLog";
import Scoreboard from "./components/Scoreboard";
import Field from "./components/Field";
import MatchControls from "./components/MatchControls";
import MatchModal from "./components/MatchModal";

const App = () => {
  const {
    events,
    scoreA,
    scoreB,
    running,
    paused,
    currentTime,
    startMatch,
    pauseMatch,
  } = useMatch();

  return (
    <div className="match-layout">
      <Scoreboard />
      <Field />
      <EventLog />
      <MatchControls handleStartMatch={startMatch} handlePauseMatch={pauseMatch} running={running} paused={paused} />
      <MatchModal />
    </div>
  );
};

export default App;
