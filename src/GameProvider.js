// GameProvider.js
import React, { useState } from 'react';
import GameContext from './GameContext';

const GameProvider = ({ children }) => {
  const [monsters, setMonsters] = useState([]);
  // Add other shared state variables as needed

  return (
    <GameContext.Provider value={{ monsters, setMonsters }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
