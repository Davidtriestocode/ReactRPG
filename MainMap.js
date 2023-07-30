import React, { useEffect, useRef, useState } from 'react';
import GameMapImage from './img/GameMap.jpg';
import PlayerImage from './img/RangerWalk.gif';
import PlayerMovement from './Gameplay'; // Import the PlayerMovement component
import styles from './css/MainMap.module.css'; // Import the CSS module

const GameMap = () => {
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

    const maxHealthPoints = characterStats.maxHealth;
    const maxStaminaPoints = characterStats.maxStamina;
    const maxManaPoints = characterStats.maxMana;

    const currentHealthPercentage = (characterStats.health / maxHealthPoints) * 100;
    const currentStaminaPercentage = (characterStats.stamina / maxStaminaPoints) * 100;
    const currentManaPercentage = (characterStats.mana / maxManaPoints) * 100;

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

  // Function to handle player movement
  const handlePlayerMovement = (direction) => {
    // Adjust the movement step as needed
    const step = 10;
    setPlayerPosition((prevPosition) => ({
      x: prevPosition.x + direction.x * step,
      y: prevPosition.y + direction.y * step,
    }));
  };

  // Call PlayerMovement component and pass the necessary props
  return (
    <div>
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
      <PlayerMovement handlePlayerMovement={handlePlayerMovement} playerPosition={playerPosition} />
    </div>
  );
};

export default GameMap;
