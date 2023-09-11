import React, { useEffect, useContext, useRef, useState } from 'react';
import DirectionInput from './DirectionInput';
import GameContext from './GameContext';

const mapWidth = 600;
const mapHeight = 800;

const Overworld = () => {
  const { maps, currentMap, changeMap } = useContext(GameContext);

  // Access the current map data
  const mapData = maps[currentMap];

  // Create a canvas reference
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // Initialize direction input
  DirectionInput();

  // State to keep track of player's location
  const [playerLocation, setPlayerLocation] = useState({
    x: 0, // Initial player x-coordinate
    y: 0, // Initial player y-coordinate
  });

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

        // Now you can safely proceed with the rest of your game loop logic

        // Load the upper layer image based on the current map
        const upperImage = new Image();
        upperImage.src = mapData.upperSrc;

        // Create a promise for the upper image
        const upperImagePromise = new Promise((resolve) => {
          upperImage.onload = () => resolve(upperImage);
        });

        // Wait for the upper image to load and draw it
        upperImagePromise.then((loadedUpperImage) => {
          ctx.drawImage(loadedUpperImage, 0, 0, canvas.width, canvas.height);

          // Call any other logic related to the current map
        });

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
  }, [mapData]); // Re-render when the mapData changes

  // Function to handle player movement and map switching
  const handlePlayerMove = (newLocation) => {
    // Logic to determine if the player has moved to a new location
    // For example, you can compare the newLocation with the player's current location

    if (newLocation.x !== playerLocation.x || newLocation.y !== playerLocation.y) {
      // Trigger a map switch based on your logic
      // For now, we'll switch to a map named 'otherMap'
      changeMap('otherMap');
      
      // Update the player's location
      setPlayerLocation(newLocation);
    }
  };

  // Simulate player movement by calling handlePlayerMove with a new location
  useEffect(() => {
    // Simulate player movement after 3 seconds (you can replace this with your actual logic)
    const movementTimeout = setTimeout(() => {
      handlePlayerMove({ x: 1, y: 1 });
    }, 3000);

    // Clear the timeout when the component unmounts
    return () => clearTimeout(movementTimeout);
  }, []);

  return (
    <div>
      <div className="canvas-container" style={{ width: '800px', height: '600px' }}>
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
};

export default Overworld;
