import React, { useEffect, useContext, useRef, useState } from 'react';
import DirectionInput from './DirectionInput';
import GameContext from './GameContext';

const Overworld = () => {
  const {
    maps,
    currentMap,
    changeMap,
    monsters,
    initialPlayerPosition,
    currentPlayerPosition, // Access the current player position from the context
    setCurrentPlayerPosition, // Function to update the player's position
  } = useContext(GameContext);

  // Access the current map data
  const mapData = maps[currentMap];

  // Create a canvas reference
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // Initialize direction input
  DirectionInput();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const gameLoop = () => {
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Load the lower layer image based on the current map
      const lowerImage = new Image();
      lowerImage.src = mapData.lowerSrc;

      // Create a promise that resolves when the image is loaded
      const lowerImagePromise = new Promise((resolve) => {
        lowerImage.onload = () => resolve(lowerImage);
      });

      // Wait for the image to load, then draw it
      lowerImagePromise.then((loadedImage) => {
        ctx.drawImage(loadedImage, 0, 0, canvas.width, canvas.height);

        // Continue the game loop
        animationRef.current = requestAnimationFrame(gameLoop);
      });
    };

    // Start the game loop
    gameLoop();

    return () => {
      // Clean up the game loop when the component unmounts
      cancelAnimationFrame(animationRef.current);
    };
  }, [mapData, monsters]); // Re-render when the mapData or monsters change

  return (
    <div>
      <div className="canvas-container" style={{ width: '800px', height: '600px' }}>
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
};

export default Overworld;
