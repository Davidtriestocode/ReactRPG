// OverworldMap.js
import React, { useEffect, useContext } from 'react';
import GameContext from './GameContext';
import Person from './Person';
import utils from './utils';
import { spawnMonsters } from './Monsters';


const OverworldMap = () => {
  const { setMonsters, setCurrentMapDimensions, setInitialPlayerPosition, changeMap } = useContext(GameContext);

  const mapWidth = 600; // Define map width for this specific map
  const mapHeight = 800; // Define map height for this specific map

  // Set the current map dimensions
  useEffect(() => {
    setCurrentMapDimensions({ width: mapWidth, height: mapHeight });
  }, [setCurrentMapDimensions]);

  // Create a Hero with initial position
  const hero = new Person({
    isPlayerControlled: true,
    x: utils.withGrid(5),
    y: utils.withGrid(6),
  });

// Set the initial player position
useEffect(() => {
  setInitialPlayerPosition({ x: hero.x, y: hero.y });
}, [setInitialPlayerPosition, hero]);

  // Define the number of monsters and locations
  useEffect(() => {
    const numberOfMonsters = 10;
    const locations = Array.from({ length: 10 }, () => ({
      x: Math.random() * mapWidth,
      y: Math.random() * mapHeight,
    }));

    // Spawn monsters and set them in the context
    const newMonsters = spawnMonsters(numberOfMonsters, locations);
    setMonsters(newMonsters);
  }, [setMonsters]);

  // Set this map as the active map
  useEffect(() => {
    changeMap('OverworldMap');
  }, [changeMap]);

  return (
    <div>
      {/* Your OverworldMap JSX content */}
    </div>
  );
};

export default OverworldMap;
