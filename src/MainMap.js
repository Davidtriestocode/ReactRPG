import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GameMapImage from './img/GameMap.jpg';
import Gameplay from './Gameplay'; // Update the import
import MenuBar from './MenuBar'; // Import the MenuBar component
import styles from './css/MainMap.module.css';
import { spawnMonsters } from './Monsters'; // Import the spawnMonsters function

const MainMap = () => {
  const mapWidth = 1000; // Adjust the width of the game map as needed
  const mapHeight = 800; // Adjust the height of the game map as needed

// Set the player's starting position
  const initialPlayerPosition = { x: 100, y: 100 }; // Customize this as needed

  // Refs for status bars
  const healthFillRef = useRef(null);
  const staminaFillRef = useRef(null);
  const manaFillRef = useRef(null);
  const healthTextRef = useRef(null);
  const staminaTextRef = useRef(null);
  const manaTextRef = useRef(null);

  // Function to update the character's status bars
  const updateStatusBars = () => {
    const characterStats = JSON.parse(localStorage.getItem('characterStats'));

    const currentHealthPercentage = (characterStats.health / characterStats.maxHealth) * 100;
    const currentStaminaPercentage = (characterStats.stamina / characterStats.maxStamina) * 100;
    const currentManaPercentage = (characterStats.mana / characterStats.maxMana) * 100;

    healthFillRef.current.style.width = `${currentHealthPercentage}%`;
    staminaFillRef.current.style.width = `${currentStaminaPercentage}%`;
    manaFillRef.current.style.width = `${currentManaPercentage}%`;

    healthTextRef.current.textContent = `${characterStats.health} HP`;
    staminaTextRef.current.textContent = `${characterStats.stamina} Stamina`;
    manaTextRef.current.textContent = `${characterStats.mana} Mana`;
  };

  // Effect to call updateStatusBars on mount
  useEffect(() => {
    updateStatusBars();
  }, []);

  // Use useNavigate to get the navigate function
  const navigate = useNavigate();

  // State for monsters
  const [monsters, setMonsters] = useState([]);

  // Function to spawn monsters on mount
  useEffect(() => {
    // Define the number of monsters and locations
    const numberOfMonsters = 10;
    const locations = Array.from({ length: 10 }, () => ({
      x: Math.random() * mapWidth,
      y: Math.random() * mapHeight,
    }));

    // Spawn monsters
    const newMonsters = spawnMonsters(numberOfMonsters, locations);
    setMonsters(newMonsters);
  }, []);

  return (
    <div>
      {/* Display the menu bar on top */}
      <MenuBar />

      <div className={styles.statusContainer}>
        {/* Status bars */}
        <div id="healthBar" className={styles.statusBar}>
          <div ref={healthFillRef} className={styles.healthFill}></div>
          <div id="healthText" className={styles.statusText} ref={healthTextRef}></div>
        </div>
        <div id="staminaBar" className={styles.statusBar}>
          <div ref={staminaFillRef} className={styles.staminaFill}></div>
          <div id="staminaText" className={styles.statusText} ref={staminaTextRef}></div>
        </div>
        <div id="manaBar" className={styles.statusBar}>
          <div ref={manaFillRef} className={styles.manaFill}></div>
          <div id="manaText" className={styles.statusText} ref={manaTextRef}></div>
        </div>
      </div>

      <img src={GameMapImage} alt="Game Map" style={{ width: '100%', height: '100%' }} />

    {/* Render the player character at the specified position */}
      <Gameplay
        initialPosition={initialPlayerPosition}
        mapWidth={mapWidth}
        mapHeight={mapHeight}
      />

      {/* Render monsters at their specified locations */}
      {monsters.map((monster, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            top: monster.location.y,
            left: monster.location.x,
          }}
        >
          <img src={monster.image} alt={monster.name} />
        </div>
      ))}
    </div>
  );
};

export default MainMap;
