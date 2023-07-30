import React, { useEffect, useState } from 'react';
import PlayerImage from './img/RangerWalk.gif'; // Import the character image

const PlayerMovement = ({ handlePlayerMovement, playerPosition }) => {
  // State for player movement
  const [position, setPosition] = useState(playerPosition);

  // Function to handle arrow key movements
  const handleArrowKeyMovement = (event) => {
    const step = 10; // Adjust the movement step as needed

    switch (event.key) {
      case 'ArrowUp':
        setPosition((prevPosition) => ({ ...prevPosition, y: prevPosition.y - step }));
        break;
      case 'ArrowDown':
        setPosition((prevPosition) => ({ ...prevPosition, y: prevPosition.y + step }));
        break;
      case 'ArrowLeft':
        setPosition((prevPosition) => ({ ...prevPosition, x: prevPosition.x - step }));
        break;
      case 'ArrowRight':
        setPosition((prevPosition) => ({ ...prevPosition, x: prevPosition.x + step }));
        break;
      default:
        break;
    }
  };

  // Effect to add event listener for arrow key movements
  useEffect(() => {
    window.addEventListener('keydown', handleArrowKeyMovement);
    return () => {
      window.removeEventListener('keydown', handleArrowKeyMovement);
    };
  }, []); // Only run this effect once on mount

  // Update position when playerPosition prop changes
  useEffect(() => {
    setPosition(playerPosition);
  }, [playerPosition]);

  return (
    <img
      src={PlayerImage}
      alt="Player Character"
      style={{ position: 'absolute', top: position.y, left: position.x, width: '40px', height: '40px' }}
    />
  );
};

export default PlayerMovement;
