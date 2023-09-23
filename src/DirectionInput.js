import React, { useState, useEffect } from 'react';

const DirectionInput = () => {
  const [heldDirections, setHeldDirections] = useState([]);
  
  const KeyMap = {
    "ArrowUp": "up",  
    "KeyW": "up",
    "ArrowDown": "down",
    "KeyS": "down",
    "ArrowLeft": "left",
    "KeyA": "left",
    "ArrowRight": "right",
    "KeyD": "right",
  };
  
  const handleKeyDown = (e) => {
    const dir = KeyMap[e.code];
    if (dir && !heldDirections.includes(dir)) {
      setHeldDirections([dir, ...heldDirections]);
      console.log(heldDirections);
    }
  };
  
  const handleKeyUp = (e) => {
    const dir = KeyMap[e.code];
    if (dir) {
      setHeldDirections(heldDirections.filter(d => d !== dir));
      console.log(heldDirections);
    }
  };
  
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [heldDirections]);
  
  return null; // This component doesn't render anything, so returning null
};

export default DirectionInput;
