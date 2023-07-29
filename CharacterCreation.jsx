import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FighterImage from './img/Fighter.jpg';
import MagicUserImage from './img/MagicUser.jpg';
import ThiefImage from './img/Thief.jpg';

// Set minimum and maximum attributes and allocation points available.
const MIN_ATTRIBUTE_VALUE = 10;
const MAX_ATTRIBUTE_VALUE = 100;
const INITIAL_ALLOCATION_POINTS = 150;

const CharacterCreation = () => {
  const [selectedClass, setSelectedClass] = useState('None');
  const [attributes, setAttributes] = useState({
    strength: 10,
    endurance: 10,
    agility: 10,
    attack: 10,
    defence: 10,
    intelligence: 10,
    magic: 10,
    health: 10,
    stamina: 10,
    mana: 10,
  });
  const [allocationPoints, setAllocationPoints] = useState(INITIAL_ALLOCATION_POINTS);

  const navigate = useNavigate();

  // Get the chosen class and display it
  useEffect(() => {
    const chosenClass = localStorage.getItem('chosenClass');
    console.log("Selected character class: " + chosenClass);
    setSelectedClass(chosenClass);
    updateAllocationPoints();
  }, []);

  useEffect(() => {
    updateAllocationPoints();
  }, [attributes]);

  // Buttons for increasing and decreasing attributes
  const updateAllocationPoints = () => {
    const totalAllocatedPoints = Object.values(attributes).reduce((total, attribute) => total + attribute, 0);
    const remainingPoints = INITIAL_ALLOCATION_POINTS - totalAllocatedPoints;
    setAllocationPoints(remainingPoints);
  };

  const handleAttributeChange = (attribute, value) => {
    const newValue = Math.min(Math.max(value, MIN_ATTRIBUTE_VALUE), MAX_ATTRIBUTE_VALUE);
    setAttributes((prevAttributes) => ({
      ...prevAttributes,
      [attribute]: newValue,
    }));
  };

  // Confirm stats button
  const confirmStats = () => {
    const characterStats = {
      class: selectedClass,
      ...attributes,
      // Add other data as needed
    };

    localStorage.setItem('characterStats', JSON.stringify(characterStats));
    navigate("/MainMap");
  };

  // Get the image associated with the selected class
  let classImage = null;
  switch (selectedClass) {
    case 'Warrior':
      classImage = FighterImage;
      break;
    case 'Mage':
      classImage = MagicUserImage;
      break;
    // Add cases for other classes with their respective images
    default:
      classImage = null;
      break;
  }

  return (
    <div>
      <h1>Character Creation Screen</h1>
      <div id="classContainer">
        <h2>Selected Class: {selectedClass}</h2>
      </div>

      <div className="character-image">
        <img id="classImage" src={classImage} alt="Character Image" />
      </div>

      {/* Add JSX code for the attributes and buttons */}
      {Object.entries(attributes).map(([attribute, value]) => (
        <AttributeInput
          key={attribute}
          attribute={attribute}
          value={value}
          onChange={(value) => handleAttributeChange(attribute, value)}
          min={MIN_ATTRIBUTE_VALUE}
          max={MAX_ATTRIBUTE_VALUE}
        />
      ))}

      <div className="button-container">
        <p id="allocationPoints" data-points={allocationPoints}>Remaining Allocation Points: {allocationPoints}</p>
        <button id="confirmButton" onClick={confirmStats}>Confirm</button>
      </div>
    </div>
  );
};

const AttributeInput = ({ attribute, value, onChange, min, max }) => {
  return (
    <div className="attribute">
      <span>{attribute.charAt(0).toUpperCase() + attribute.slice(1)}:</span>
      <button onClick={() => onChange(value - 1)}>-</button>
      <input type="number" min={min} max={max} value={value} onChange={(e) => onChange(parseInt(e.target.value))} />
      <button onClick={() => onChange(value + 1)}>+</button>
    </div>
  );
};

export default CharacterCreation;
