import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FighterImage from './img/Fighter.jpg';
import MagicUserImage from './img/MagicUser.jpg';
import ThiefImage from './img/Thief.jpg';

const experience = 0;

const CharacterSheet = () => {
  // Use the navigate hook
  const navigate = useNavigate();

  // Retrieve characterClass and characterStats from localStorage
  const characterClass = localStorage.getItem('chosenClass') ?? 'None';
  const characterStats = JSON.parse(localStorage.getItem('characterStats'));

  // If characterClass or characterStats is not available, handle the case gracefully
  if (!characterStats) {
    return (
      <div>
        <h1>Character Sheet</h1>
        <p>No character class or stats found. Please go back and create your character.</p>
      </div>
    );
  }

  // If characterClass and characterStats are available, display the character sheet
  const {
    strength,
    agility,
    endurance,
    intelligence,
    magic,
    attack,
    defence,
    health,
    stamina,
    mana,
    // Add other attributes here
  } = characterStats;

  // Get the image associated with the selected class
  let classImage = null;
  switch (characterClass) {
    case 'Fighter':
      classImage = FighterImage;
      break;
    case 'Magic User':
      classImage = MagicUserImage;
      break;
    case 'Thief':
      classImage = ThiefImage;
      break;
    default:
      classImage = null;
      break;
  }

  // Function to handle the confirm button click
  const handleConfirmClick = () => {
    // You can perform any necessary logic here before navigating
    console.log("Confirm button clicked!");

    // Navigate to the main-map route
    navigate('/main-map');
  };

  return (
    <div>
      <h1>Character Sheet</h1>
      <div className="character-image">
        {classImage && <img id="classImage" src={classImage} alt="Character Image" />}
      </div>
      <div>
        <p>Selected Class: {characterClass}</p>
        <p>Strength: {strength}</p>
        <p>Agility: {agility}</p>
        <p>Endurance: {endurance}</p>
        <p>Intelligence: {intelligence}</p>
        <p>Magic: {magic}</p>
        <p>Attack: {attack}</p>
        <p>Defence: {defence}</p>
        <p>Health: {health}</p>
        <p>Stamina: {stamina}</p>
        <p>Mana: {mana}</p>
      </div>
      {/* Add any other character information or stats here */}
      <button onClick={handleConfirmClick}>Confirm</button>
    </div>
  );
};

export default CharacterSheet;
