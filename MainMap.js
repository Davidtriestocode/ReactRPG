import React, { useEffect, useRef } from 'react';
import GameMapImage from './img/GameMap.jpg';
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

    const healthPoints = characterStats.health;
    const staminaPoints = characterStats.stamina;
    const manaPoints = characterStats.mana;

    const currentHealthPercentage = (healthPoints / characterStats.maxHealth) * 100;
    const currentStaminaPercentage = (staminaPoints / characterStats.maxStamina) * 100;
    const currentManaPercentage = (manaPoints / characterStats.maxMana) * 100;

    healthFillRef.current.style.width = `${currentHealthPercentage}%`;
    staminaFillRef.current.style.width = `${currentStaminaPercentage}%`;
    manaFillRef.current.style.width = `${currentManaPercentage}%`;

    healthTextRef.current.textContent = `${healthPoints} HP`;
    staminaTextRef.current.textContent = `${staminaPoints} Stamina`;
    manaTextRef.current.textContent = `${manaPoints} Mana`;
  };

  // Effect to call updateStatusBars on mount
  useEffect(() => {
    updateStatusBars();
  }, []);

  return (
    <div>
      {/* Status bars */}
      <div id="statusContainer">
        <div id="healthBar" className="statusBar">
          <div ref={healthFillRef} className="statusFill healthFill"></div>
          <div id="healthText" className="statusText" ref={healthTextRef}></div>
        </div>
        <div id="staminaBar" className="statusBar">
          <div ref={staminaFillRef} className="statusFill staminaFill"></div>
          <div id="staminaText" className="statusText" ref={staminaTextRef}></div>
        </div>
        <div id="manaBar" className="statusBar">
          <div ref={manaFillRef} className="statusFill manaFill"></div>
          <div id="manaText" className="statusText" ref={manaTextRef}></div>
        </div>
      </div>

      <img src={GameMapImage} alt="Game Map" />
    </div>
  );
};

export default GameMap;
