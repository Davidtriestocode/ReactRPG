import React, { useState } from 'react';
import GameContext, { useGameContext } from './GameContext';

const GameProvider = ({ children }) => {
  const [monsters, setMonsters] = useState([]);
  const [maps, setMaps] = useState({
    // Define your maps here
    demoRoom: {
      name: 'Demo Room',
      lowerSrc: "/images/maps/DemoLower.png",
      upperSrc: "/images/maps/DemoUpper.png",
      // Add other map properties as needed
    },
    // Add more maps as needed
  });

  // Initialize the currentMap to a default map, e.g., 'demoRoom'
  const [currentMap, setCurrentMap] = useState('OverworldMap');

  // You can define other shared state variables as needed
  const [config, setConfig] = useState(/* initialConfig */);

  // Function to change the current map
  const changeMap = (newMap) => {
    // You can add validation here to ensure newMap exists in maps
    setCurrentMap(newMap);
  };

  return (
    <GameContext.Provider value={{ monsters, setMonsters, maps, currentMap, changeMap, config, setConfig }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
