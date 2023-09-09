// MenuBar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/MenuBar.module.css';

const MenuButton = ({ path, label }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(path);
  };

  return (
    <button className={styles.menuButton} onClick={handleNavigation}>
      {label}
    </button>
  );
};

const MenuBar = () => {
  return (
    <div>
      <nav className={styles.menuBar}>
        <ul className={styles.menuList}>
          <li>
            <MenuButton path="/overworld-map" label="Main Map" />
          </li>
          <li>
            <MenuButton path="/inventory" label="Inventory" />
          </li>
          <li>
            {/* Button for Main Menu */}
            <MenuButton path="/main-menu" label="Main Menu" />
          </li>
          {/* Add more menu items as needed */}
        </ul>
      </nav>
    </div>
  );
};

export default MenuBar;
