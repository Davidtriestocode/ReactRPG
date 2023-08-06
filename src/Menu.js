import React from 'react';
import { Link } from 'react-router-dom';
import styles from './css/Menu.module.css'; // Import the CSS module

const Menu = () => {
  return (
    <div className={styles.menuContainer}>
      <h1 className={styles.menuTitle}>Welcome to the Game Menu</h1>
      <div className={styles.menuButtons}>
        <Link to="/choose-class" className={styles.startGameButton}>
          Start New Game
        </Link>
        <button className={styles.loadGameButton}>Load Game</button>
      </div>
    </div>
  );
};

export default Menu;
