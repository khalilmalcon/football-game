import React from "react";

import EventLog from "./components/EventLog";
import Scoreboard from "./components/Scoreboard";
import Field from "./components/Field";
import MatchControls from "./components/MatchControls";
import MatchModal from "./components/MatchModal";

const App = () => {
  return (
    <div className="match-layout">
      <Scoreboard />
      <Field />
      <EventLog />
      <MatchControls />
      <MatchModal />
    </div>
  );
};

export default App;
