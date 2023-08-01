import React, { useEffect, useState } from 'react';
import PlayerImage from './img/RangerWalk.gif'; // Import the character image

const PlayerMovement = ({ handlePlayerMovement, playerPosition, mapWidth, mapHeight }) => {
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

  // Effect to update position when playerPosition prop changes
  useEffect(() => {
    setPosition(playerPosition);
  }, [playerPosition]);

  // Effect to prevent player from moving off the map
  useEffect(() => {
    const handleBoundaryCheck = () => {
      // Ensure player cannot move off the left edge
      if (position.x < 0) {
        setPosition((prevPosition) => ({ ...prevPosition, x: 0 }));
      }
      // Ensure player cannot move off the right edge
      if (position.x > mapWidth) {
        setPosition((prevPosition) => ({ ...prevPosition, x: mapWidth }));
      }
      // Ensure player cannot move off the top edge
      if (position.y < 0) {
        setPosition((prevPosition) => ({ ...prevPosition, y: 0 }));
      }
      // Ensure player cannot move off the bottom edge
      if (position.y > mapHeight) {
        setPosition((prevPosition) => ({ ...prevPosition, y: mapHeight }));
      }
    };

    handleBoundaryCheck();

    // Add event listener for boundary check on arrow key release
    window.addEventListener('keyup', handleBoundaryCheck);

    return () => {
      window.removeEventListener('keyup', handleBoundaryCheck);
    };
  }, [position, mapWidth, mapHeight]);

  return (
    <img
      src={PlayerImage}
      alt="Player Character"
      style={{ position: 'absolute', top: position.y, left: position.x, width: '40px', height: '40px' }}
    />
  );
};

export default PlayerMovement;
