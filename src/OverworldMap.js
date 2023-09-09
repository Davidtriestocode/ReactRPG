import React, { useEffect, useContext } from 'react';
import Overworld from './Overworld';
import GameContext from './GameContext';
import { spawnMonsters } from './Monsters'; // Import spawnMonsters function

const mapWidth = 600;
const mapHeight = 800;

const OverworldMap = ({ config, directionInput }) => {
  const { monsters, setMonsters } = useContext(GameContext);

  useEffect(() => {
    const numberOfMonsters = 10;
    const locations = Array.from({ length: 10 }, () => ({
      x: Math.random() * mapWidth,
      y: Math.random() * mapHeight,
    }));

    const newMonsters = spawnMonsters(numberOfMonsters, locations);
    
    setMonsters(newMonsters);
  }, [setMonsters]);

  return (
    <Overworld
      config={config}
      directionInput={directionInput}
      monsters={monsters}
    />
  );
};

export default OverworldMap;
