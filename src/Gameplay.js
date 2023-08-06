import React, { useEffect, useState } from 'react';
import styles from './css/Gameplay.module.css';
import AnimatedRanger from './img/AnimatedRanger.png'

const Gameplay = () => {
  // State to track character position and movement
  const [characterPosition, setCharacterPosition] = useState({ x: 0, y: 0 });
  const [isWalking, setIsWalking] = useState(false);

  // Function to handle character movement
  const handleMovement = (direction) => {
    setIsWalking(true);

    // Update the character's position based on the movement direction
    switch (direction) {
      case 'up':
        setCharacterPosition((prevPosition) => ({ ...prevPosition, y: prevPosition.y - 10 }));
        break;
      case 'down':
        setCharacterPosition((prevPosition) => ({ ...prevPosition, y: prevPosition.y + 10 }));
        break;
      case 'left':
        setCharacterPosition((prevPosition) => ({ ...prevPosition, x: prevPosition.x - 32 }));
        break;
      case 'right':
        setCharacterPosition((prevPosition) => ({ ...prevPosition, x: prevPosition.x + 32 }));
        break;
      default:
        setIsWalking(false);
        break;
    }
  };

  // Function to handle when the character stops walking
  const handleStopWalking = () => {
    setIsWalking(false);
  };

  // Use useEffect to listen for arrow key presses
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          handleMovement('up');
          break;
        case 'ArrowDown':
          handleMovement('down');
          break;
        case 'ArrowLeft':
          handleMovement('left');
          break;
        case 'ArrowRight':
          handleMovement('right');
          break;
        default:
          break;
      }
    };

    const handleKeyUp = () => {
      handleStopWalking();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Clean up event listeners on unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []); // Empty dependency array to run the effect only once on mount

  // Define the animation styles inline based on the character's position
  const animationStyles = {
    top: characterPosition.y,
    left: characterPosition.x,
  };

  return (
    <div className={styles['character-container']}>
      <div
        className={`character-animation ${isWalking ? 'walking' : ''}`}
        style={animationStyles}
      >
        <img src={AnimatedRanger} alt="Character" />
      </div>
    </div>
  );
};

export default Gameplay;
