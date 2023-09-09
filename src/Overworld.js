import React, { useEffect, useRef, useState, useContext } from 'react';
import DirectionInput from './DirectionInput';
import GameMap from './img/GameMap.jpg';
import Person from './Person';
import OverworldMap from './OverworldMap'; // Import OverworldMap
import GameContext from './GameContext';

const Overworld = ({ config }) => {
  const { monsters } = useContext(GameContext); // Get monsters from the context
  const [map, setMap] = useState(null);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const directionInputRef = useRef(new DirectionInput());

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctxRef.current = ctx;

    // Load the image
    const image = new Image();
    image.src = GameMap;

    image.onload = () => {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      // Use the monsters data for rendering or other logic
      console.log(monsters);

      // Create a new instance of OverworldMap
      const newMap = new OverworldMap(config, canvas, directionInputRef.current);

      // Set the map state
      setMap(newMap);

      // Initialize direction input
      directionInputRef.current.init();

      // Start the game loop
      const startGameLoop = () => {
        const step = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          newMap.drawLowerImage(ctx);

          // Render monsters using the data from OverworldMap
          monsters.forEach((monster) => {
            // Render the monster here based on its data
          });

          requestAnimationFrame(step);
        };
        step();
      };

      startGameLoop();
    };
  }, [config, monsters]);

  return (
    <div>
      <div className="canvas-container" style={{ width: '800px', height: '600px' }}>
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
};

export default Overworld;
