import React from 'react';
import styles from './css/Equipment.module.css';
import FighterImage from './img/Fighter.jpg';
import MagicUserImage from './img/MagicUser.jpg';
import ThiefImage from './img/Thief.jpg';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './utils';

const Equipment = ({ equipmentSlots, setEquipmentSlots, handleDropToEquipment }) => {
  const selectedClass = localStorage.getItem('chosenClass');

  let classImageSrc;
  switch (selectedClass) {
    case 'Fighter':
      classImageSrc = FighterImage;
      break;
    case 'Magic User':
      classImageSrc = MagicUserImage;
      break;
    case 'Thief':
      classImageSrc = ThiefImage;
      break;
    default:
      classImageSrc = '/path/to/default-image.png';
  };

  const renderEquipmentSlot = (slot) => {
    const [{ isOver }, drop] = useDrop(() => ({
      accept: ItemTypes.ITEM,
      drop: (item) => handleDropToEquipment(slot.name, item),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }));

    return (
      <div
        ref={drop}
        className={`${styles.equipmentSlot} ${isOver ? styles.equipmentSlotHover : ''}`}
      >
        <p>{slot.name}</p>
        {slot.item && <img src={slot.item.image} alt={slot.item.name} />} {/* Display the equipped item */}
      </div>
    );
  };

  return (
    <div className={styles.equipmentContainer}>
      <div className={styles.characterImage}>
        <img src={classImageSrc} alt="Character" />
      </div>
      <div className={styles.equipmentSlots}>
        {equipmentSlots.map((slot) => renderEquipmentSlot(slot))}
      </div>
    </div>
  );
};

export default Equipment;
