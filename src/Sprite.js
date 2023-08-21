import React, { useState, useEffect, useRef } from 'react';

const Sprite = ({ config }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isShadowLoaded, setIsShadowLoaded] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState('idle-right');
  const [currentAnimationFrame, setCurrentAnimationFrame] = useState(0);
  const [animationFrameProgress, setAnimationFrameProgress] = useState(config.animationFrameLimit);

  const imageRef = useRef(new Image());
  const shadowRef = useRef(new Image());

  useEffect(() => {
    imageRef.current.src = config.src;
    imageRef.current.onload = () => setIsLoaded(true);

    if (config.useShadow) {
      shadowRef.current.src = '/images/characters/shadow.png';
      shadowRef.current.onload = () => setIsShadowLoaded(true);
    }
  }, [config.src, config.useShadow]);

  // Check if the current animation exists in config.animations
  const animationFrames = config.animations[currentAnimation] || [];
  const frame = animationFrames[currentAnimationFrame] || [0, 0]; // Default frame to [0, 0] if not found

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
      return nextFrame >= animationFrames.length ? 0 : nextFrame;
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
