import React, { useState } from 'react';
import GameContext, { useGameContext } from './GameContext'; // Import useGameContext from GameContext

const GameProvider = ({ children }) => {
  const [monsters, setMonsters] = useState([]);
  const { config, setConfig } = useGameContext(); // Use useGameContext to access config

  // Add other shared state variables as needed

  return (
    <GameContext.Provider value={{ monsters, setMonsters, config, setConfig }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
