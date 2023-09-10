import React, { createContext, useContext, useState } from 'react';

// Create the context
const GameContext = createContext();

// Create a context provider component
export const GameProvider = ({ children }) => {
  // Define your config here or fetch it from somewhere
 const config = {
  // Default player position
  defaultPlayerPosition: {
    x: 300, // X-coordinate
    y: 400, // Y-coordinate
  },

  // Default map image source
  defaultMapImage: "/images/maps/GameMap.jpg",

  // Canvas dimensions
  canvasWidth: 800,
  canvasHeight: 600,

  // Map dimensions
  mapWidth: 600,
  mapHeight: 800,

  // Other configuration settings as needed
};
// You can define other context values here
  const contextValues = {
    config,
    // Other context values
  };

  return <GameContext.Provider value={contextValues}>{children}</GameContext.Provider>;
};

// Custom hook for using the context
export const useGameContext = () => {
  return useContext(GameContext);
};


export default GameContext;
