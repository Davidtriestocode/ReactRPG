// MainMap.js
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GameMapImage from './img/GameMap.jpg';
import PlayerMovement from './Gameplay';
import MenuBar from './MenuBar'; // Import the MenuBar component
import styles from './css/MainMap.module.css';

const MainMap = () => {
  const mapWidth = 1000; // Adjust the width of the game map as needed
  const mapHeight = 800; // Adjust the height of the game map as needed

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

  // State for player position
  const [playerPosition, setPlayerPosition] = useState({ x: 100, y: 100 });

  // Function to handle player movement with boundary check
  const handlePlayerMovement = (direction) => {
    // Adjust the movement step as needed
    const step = 10;

    // Calculate the new position after movement
    const newPosition = {
      x: playerPosition.x + direction.x * step,
      y: playerPosition.y + direction.y * step,
    };

    // Check boundaries to prevent the character from moving off the map
    if (
      newPosition.x >= 0 &&
      newPosition.x <= mapWidth &&
      newPosition.y >= 0 &&
      newPosition.y <= mapHeight
    ) {
      setPlayerPosition(newPosition);
    }
  };

  // Use useNavigate to get the navigate function
  const navigate = useNavigate();

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
      <PlayerMovement
        handlePlayerMovement={handlePlayerMovement}
        playerPosition={playerPosition}
        mapWidth={mapWidth}
        mapHeight={mapHeight}
      />
    </div>
  );
};

export default MainMap;
