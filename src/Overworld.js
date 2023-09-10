import React, { useEffect, useContext, useRef } from 'react';
import DirectionInput from './DirectionInput';
import GameMap from './img/GameMap.jpg';
import OverworldMap from './OverworldMap';
import GameContext from './GameContext';

const mapWidth = 600;
const mapHeight = 800;

const Overworld = () => {
  const { config, monsters } = useContext(GameContext);

  // Create a canvas reference
  const canvasRef = useRef(null);

  // Initialize direction input
  DirectionInput();

  useEffect(() => {
    // Access the current property of the canvasRef
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Load the image
    const image = new Image();
    image.src = GameMap;

    image.onload = () => {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      // You can render OverworldMap components directly here on the canvas using ctx
      // For example:
      const overworldMap = new OverworldMap(config);

      // Call the draw method of OverworldMap to render it on the canvas
      overworldMap.draw(ctx);
    };
  }, [config, monsters]);

  return (
    <div>
      <div className="canvas-container" style={{ width: '800px', height: '600px' }}>
        {/* Use canvasRef as the ref */}
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
};

export default Overworld;
