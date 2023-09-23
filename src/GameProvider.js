import React, { useState } from 'react';
import GameContext from './GameContext';

const GameProvider = ({ children }) => {
  const [monsters, setMonsters] = useState([]);
  const [maps, setMaps] = useState({
    OverworldMap: {
      name: 'Overworld Map',
      // Other default map properties as needed
    },
    // Add more maps here with their initial dimensions
    AnotherMap: {
      name: 'Another Map',
      // Other default map properties as needed
    },
  });

  const [currentMap, setCurrentMap] = useState('OverworldMap');
  const [config, setConfig] = useState(/* initialConfig */);
  const [initialPlayerPosition, setInitialPlayerPosition] = useState({ x: 0, y: 0 });
  const [currentPlayerPosition, setCurrentPlayerPosition] = useState(initialPlayerPosition);
  const [currentMapDimensions, setCurrentMapDimensions] = useState({ width: 0, height: 0 });

  const changeMap = (newMap) => {
    // You can add validation here to ensure newMap exists in maps
    setCurrentMap(newMap);

    // Retrieve the dimensions for the new map from your maps object
    setCurrentMapDimensions({ ...maps[newMap].dimensions });
  };

  return (
    <GameContext.Provider
      value={{
        monsters,
        setMonsters,
        maps,
        currentMap,
        changeMap,
        config,
        setConfig,
        initialPlayerPosition,
        currentPlayerPosition,
        currentMapDimensions,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
