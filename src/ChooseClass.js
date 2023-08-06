import React from 'react';
import FighterImage from './img/Fighter.jpg';
import MagicUserImage from './img/MagicUser.jpg';
import ThiefImage from './img/Thief.jpg';
import { useNavigate } from 'react-router-dom';
import styles from './css/ChooseClass.module.css'; // Import the CSS module

const ChooseClass = () => {
  const navigate = useNavigate();

  const selectCharacter = (characterClass) => {
    console.log("Selected character class: " + characterClass);
    localStorage.setItem('chosenClass', characterClass);
    navigate('/character-creation');
  };

  return (
    <div>
      <h1>Choose Your Character Class</h1>
      <div className={styles['character-option']} onClick={() => selectCharacter('Fighter')}>
        <img src={FighterImage} alt="Fighter" />
        <p>Fighter</p>
      </div>
      <div className={styles['character-option']} onClick={() => selectCharacter('Magic User')}>
        <img src={MagicUserImage} alt="Magic User" />
        <p>Magic User</p>
      </div>
      <div className={styles['character-option']} onClick={() => selectCharacter('Thief')}>
        <img src={ThiefImage} alt="Thief" />
        <p>Thief</p>
      </div>
    </div>
  );
};

export default ChooseClass;
