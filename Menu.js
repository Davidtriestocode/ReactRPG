import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from 'react-router-dom'

const Menu = () => {
  return (
    <div>
      <h1>Welcome to the Game Menu</h1>
      <Link to="/choose-class">Start New Game</Link>
      <button>Load Game</button>
    </div>
  );
};

export default Menu;
