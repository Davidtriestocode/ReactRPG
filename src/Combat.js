import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMonsterStats } from './Monsters'; // Import the function to get monster stats from Monsters.js
import styles from './css/Combat.module.css'

const Combat = () => {
  const [playerStats, setPlayerStats] = useState(JSON.parse(localStorage.getItem('characterStats')));
  const [currentMonster, setCurrentMonster] = useState(null);
  const [combatLog, setCombatLog] = useState([]);
  const navigate = useNavigate();

  // Function to start combat when player encounters a monster
  const startCombat = (monsterName) => {
    // Get the stats of the encountered monster from Monsters.js
    const monsterStats = getMonsterStats(monsterName);
    setCurrentMonster({ name: monsterName, ...monsterStats });

    // Clear the combat log
    setCombatLog([]);
  };

  // Function to handle player's attack action
  const handleAttack = () => {
    // Calculate damage dealt by the player
    const playerAttackDamage = Math.ceil(Math.random() * playerStats.attack);

    // Reduce the monster's health by the damage dealt by the player
    const updatedMonsterHealth = currentMonster.health - playerAttackDamage;

    // Update the combat log
    setCombatLog((prevLog) => [
      ...prevLog,
      `Player attacks ${currentMonster.name} for ${playerAttackDamage} damage.`,
    ]);

    // Check if the monster is defeated
    if (updatedMonsterHealth <= 0) {
      setCombatLog((prevLog) => [...prevLog, `Player defeats ${currentMonster.name}!`]);

      // Award experience points to the player when the monster is defeated
      const experienceGained = currentMonster.experience;
      setPlayerStats((prevStats) => ({
        ...prevStats,
        experience: prevStats.experience + experienceGained,
      }));

      // Clear the current monster
      setCurrentMonster(null);
    } else {
      // If the monster is not defeated, update its health
      setCurrentMonster((prevMonster) => ({
        ...prevMonster,
        health: updatedMonsterHealth,
      }));
    }
  };

  // Function to handle player's defend action
  const handleDefend = () => {
    // Calculate the amount of damage absorbed when the player defends
    const damageAbsorbed = Math.ceil(Math.random() * playerStats.defence);

    // Reduce the player's health by the damage absorbed
    const updatedPlayerHealth = playerStats.health - damageAbsorbed;

    // Update the combat log
    setCombatLog((prevLog) => [
      ...prevLog,
      `Player defends and absorbs ${damageAbsorbed} damage from ${currentMonster.name}.`,
    ]);

    // Check if the player's health reaches 0 or below
    if (updatedPlayerHealth <= 0) {
      setCombatLog((prevLog) => [...prevLog, `Player is defeated by ${currentMonster.name}.`]);
      // Redirect to the main menu or game over screen
      navigate('/game-over');
    } else {
      // If the player is not defeated, update their health
      setPlayerStats((prevStats) => ({
        ...prevStats,
        health: updatedPlayerHealth,
      }));
    }
  };

  // Function to handle player's escape action
  const handleEscape = () => {
    // Calculate the chance of successfully escaping (50% success chance for simplicity)
    const escapeSuccess = Math.random() >= 0.5;

    // Update the combat log based on the escape result
    if (escapeSuccess) {
      setCombatLog((prevLog) => [...prevLog, 'Player successfully escapes from combat.']);
      // Clear the current monster
      setCurrentMonster(null);
    } else {
      setCombatLog((prevLog) => [...prevLog, 'Player fails to escape.']);
      // Monster attacks the player after failed escape
      const monsterAttackDamage = Math.ceil(Math.random() * currentMonster.attack);
      const updatedPlayerHealth = playerStats.health - monsterAttackDamage;
      setCombatLog((prevLog) => [
        ...prevLog,
        `${currentMonster.name} attacks the player for ${monsterAttackDamage} damage.`,
      ]);

      // Check if the player's health reaches 0 or below
      if (updatedPlayerHealth <= 0) {
        setCombatLog((prevLog) => [...prevLog, `Player is defeated by ${currentMonster.name}.`]);
        // Redirect to the main menu or game over screen
        navigate('/game-over');
      } else {
        // If the player is not defeated, update their health
        setPlayerStats((prevStats) => ({
          ...prevStats,
          health: updatedPlayerHealth,
        }));
      }
    }
  };

  return (
    <div>
      <h1>Combat</h1>
      {currentMonster ? (
        <div>
          <h2>Current Monster: {currentMonster.name}</h2>
          <p>Monster Health: {currentMonster.health}</p>
          <p>Player Health: {playerStats.health}</p>
          <button onClick={handleAttack}>Attack</button>
          <button onClick={handleDefend}>Defend</button>
          <button onClick={handleEscape}>Escape</button>
          <div>
            <h3>Combat Log</h3>
            {combatLog.map((log, index) => (
              <p key={index}>{log}</p>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Combat;
