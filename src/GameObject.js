import React from 'react';
import Sprite from './Sprite';
import AnimatedRanger from './img/AnimatedRanger.png';

const GameObject = ({ x = 0, y = 0, direction = "down" }) => {
  // Define an animation for the character based on their direction
  const animations = {
    'idle-down': [[0, 0]], // Idle animation (facing down)
    'walk-down': Array.from({ length: 10 }, (_, index) => [index, 1]), // Walking animation (facing down)
  };

  return (
    <Sprite
      config={{
        src: AnimatedRanger, // Path to your character's sprite image
        animations: animations, // Provide the animations object
        gameObject: { x, y },
        currentAnimation: `idle-${direction}`, // You can change this to 'walk-down' when character is walking
      }}
    />
  );
};

export default GameObject;
