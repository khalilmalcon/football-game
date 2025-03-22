import React from "react";
import { createRoot } from 'react-dom/client'
import './index.scss'
import './App.scss'
import App from "./App";
import { MatchProvider } from "./context/MatchContext";

createRoot(document.getElementById('root')).render(
  <MatchProvider>
    <App />
  </MatchProvider>
);