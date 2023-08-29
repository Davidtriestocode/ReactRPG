import React, { useState, useEffect, useRef } from 'react';

const Sprite = ({ config }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isShadowLoaded, setIsShadowLoaded] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState("idle-right"); // Set your initial animation state here
  const [currentAnimationFrame, setCurrentAnimationFrame] = useState(0);
  const [animationFrameProgress, setAnimationFrameProgress] = useState(config.animationFrameLimit);

  const imageRef = useRef(new Image());
  const shadowRef = useRef(new Image());

  // Configure your animations
  const animations = config.animations || {
    "idle-down" : [ [0,0] ],
    "idle-right": [ [0,1] ],
    "idle-up"   : [ [0,2] ],
    "idle-left" : [ [0,3] ],
    "walk-down" : [ [1,0],[0,0],[3,0],[0,0], ],
    "walk-right": [ [1,1],[0,1],[3,1],[0,1], ],
    "walk-up"   : [ [1,2],[0,2],[3,2],[0,2], ],
    "walk-left" : [ [1,3],[0,3],[3,3],[0,3], ]
  };

  useEffect(() => {
    imageRef.current.src = config.src;
    imageRef.current.onload = () => setIsLoaded(true);

    if (config.useShadow) {
      shadowRef.current.src = '/images/characters/shadow.png';
      shadowRef.current.onload = () => setIsShadowLoaded(true);
    }
  }, [config.src, config.useShadow]);

  const frame = animations[currentAnimation][currentAnimationFrame];

  const setAnimation = (key) => {
    if (currentAnimation !== key) {
      setCurrentAnimation(key);
      setCurrentAnimationFrame(0);
      setAnimationFrameProgress(config.animationFrameLimit);
    }
  };

  const updateAnimationProgress = () => {
    if (animationFrameProgress > 0) {
      setAnimationFrameProgress(animationFrameProgress - 1);
      return;
    }

    setAnimationFrameProgress(config.animationFrameLimit);
    setCurrentAnimationFrame((prevFrame) => {
      const nextFrame = prevFrame + 1;
      return nextFrame >= animations[currentAnimation].length ? 0 : nextFrame;
    });
  };
   // Calculate the position of the sprite on the sprite sheet
  const spriteX = frame[0] * 32; // Assuming each frame is 32x32 pixels
  const spriteY = frame[1] * 32; // Adjusted to get the Y position

  // Calculate the position of the sprite on the game screen
  const x = config.gameObject.x - 8;
  const y = config.gameObject.y - 18;

  return (
    <>
      {isShadowLoaded && <img src={shadowRef.current.src} alt="Shadow" style={{ position: 'absolute', left: x, top: y }} />}
      {isLoaded && (
        <img
          src={imageRef.current.src}
          alt="Sprite"
          style={{
            position: 'absolute',
            left: x,
            top: y,
            width: 128,
            height: 128,
            clip: `rect(${spriteY}px, ${spriteX + 16}px, ${spriteY + 16}px, ${spriteX}px)`,
          }}
        />
      )}
    </>
  );
};
export default Sprite;
