import React, { createContext, useContext, useState } from 'react';

// Create the context
const GameContext = createContext();

// Custom hook for using the context
export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};

export default GameContext;
