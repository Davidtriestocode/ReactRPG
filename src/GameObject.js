import React from 'react';
import Sprite from './Sprite';

const GameObject = ({ x = 0, y = 0, direction = "down", spriteSrc }) => {
  // Check if a sprite source is provided
  if (!spriteSrc) {
    return null; // If no sprite source is provided, return null (or handle it differently)
  }

  // Define an empty animations object by default
  const animations = {};

  return (
    <Sprite
      config={{
        src: spriteSrc, // Path to your character's sprite image
        animations: animations, // Provide the animations object (empty in this case)
        gameObject: { x, y },
        currentAnimation: `idle-${direction}`, // You can change this to 'walk-down' when the character is walking
      }}
    />
  );
};

export default GameObject;
