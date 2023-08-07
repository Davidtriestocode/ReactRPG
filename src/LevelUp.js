import React, { useEffect, useState } from 'react';
import CharacterCreation from './CharacterCreation';

const LevelUp = () => {
  const [allocationPoints, setAllocationPoints] = useState(10); // Number of points to allocate on level-up

  useEffect(() => {
    // Implement the logic for calculating allocation points based on current level/experience
    // For example, 10 points per level, you can adjust it according to your game's logic
    // For simplicity, we'll just set it to 10 for demonstration purposes.
    setAllocationPoints(10);
  }, []);

  return (
    <div>
      <h1>Level Up!</h1>
      <p>You have gained new experience and have {allocationPoints} points to allocate.</p>
      <CharacterCreation initialAllocationPoints={allocationPoints} />
    </div>
  );
};

export default LevelUp;
