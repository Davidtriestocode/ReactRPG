import React, { useEffect, useState } from 'react';

const Person = ({ config, updatePosition, updateSprite }) => {
  const {
    isPlayerControlled = false,
    directionUpdate = {
      "up": { x: 0, y: -1 },
      "down": { x: 0, y: 1 },
      "left": { x: -1, y: 0 },
      "right": { x: 1, y: 0 },
    },
  } = config;

  const [movingProgressRemaining, setMovingProgressRemaining] = useState(0);
  const [direction, setDirection] = useState("down");

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (isPlayerControlled) {
        if (movingProgressRemaining === 0 && e.key in directionUpdate) {
          setDirection(e.key);
          setMovingProgressRemaining(16);
        }
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isPlayerControlled, directionUpdate]);

  useEffect(() => {
    updatePosition(directionUpdate[direction]);
    updateSprite(movingProgressRemaining, direction);
  }, [direction, movingProgressRemaining, updatePosition, updateSprite]);

  return null; // This component doesn't render anything, so returning null
};

export default Person;
