import React, { useState, useEffect } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import InventorySlot from './InventorySlot';
import StarterSword from './img/StarterSword.jpg';
import StarterStaff from './img/StarterStaff.jpg';
import StarterDagger from './img/StarterDagger.jpg';
import CoinPurse from './img/CoinPurse.jpg';
import MenuBar from './MenuBar';
import SelectedItemWindow from './SelectedItemWindow';
import Equipment from './Equipment';
import styles from './css/Inventory.module.css';
import { ItemTypes } from './constants';

const Inventory = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [equipmentSlots, setEquipmentSlots] = useState([
    { name: 'head', item: null },
    { name: 'chest', item: null },
    { name: 'weapon', item: null },
    // Add more equipment slots here as needed
  ]);

  const generateStartingItems = (selectedClass) => {
    switch (selectedClass) {
      case 'Thief':
        return [
          { id: 1, name: 'Dagger', image: StarterDagger, description: 'A sharp dagger for sneaky attacks.' },
          { id: 4, name: 'Coin Purse', image: CoinPurse, quantity: 10, description: 'A small purse to store coins.' },
          // Add more starting items for the thief if needed
        ];
      case 'Magic User':
        return [
          { id: 2, name: 'Staff', image: StarterStaff, description: 'A magical staff for casting spells.' },
          { id: 4, name: 'Coin Purse', image: CoinPurse, quantity: 10, description: 'A small purse to store coins.' },
          // Add more starting items for the wizard if needed
        ];
      case 'Fighter':
        return [
          { id: 3, name: 'Basic Sword', image: StarterSword, description: 'A basic sword for close combat.' },
          { id: 4, name: 'Coin Purse', image: CoinPurse, quantity: 10, description: 'A small purse to store coins.' },
          // Add more starting items for the fighter if needed
        ];
      default:
        return [];
    }
  };

 
  useEffect(() => {
    // Get the selected class from local storage
    const storedSelectedClass = localStorage.getItem('chosenClass');

    // Set the selectedClass state if not null
    if (storedSelectedClass !== null) {
      setSelectedClass(storedSelectedClass);
    }
  }, []);

  useEffect(() => {
    // Update the inventory items when the selected class changes
    const startingItems = generateStartingItems(selectedClass);
    setInventoryItems(startingItems);
  }, [selectedClass]);

  const handleDropToEquipment = (slotName, item) => {
    // Filter out the dropped item from the inventory
    const updatedInventory = inventoryItems.filter((inventoryItem) => inventoryItem.id !== item.id);
    setInventoryItems(updatedInventory);
    setSelectedItem(null); // Clear the selected item after dropping

    // Update the equipment slots
    setEquipmentSlots((prevSlots) =>
      prevSlots.map((slot) => (slot.name === slotName ? { ...slot, item } : slot))
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        {/* Display the menu bar on top */}
        <MenuBar />

        {/* Display selected item window */}
        <SelectedItemWindow selectedItem={selectedItem} />

        {/* Wrapper for Inventory and Equipment sections */}
        <div className={styles.inventoryWrapper}>
          {/* Inventory section */}
          <div className={styles.inventoryContainer}>
            <div className={styles.inventorySlots}>
              {inventoryItems.map((item) => (
                <InventorySlot
                  key={item.id}
                  item={item}
                  setSelectedItem={setSelectedItem}
                  inventoryItems={inventoryItems}
                  setInventoryItems={setInventoryItems}
                />
              ))}
            </div>
          </div>

          {/* Equipment section */}
          <div className={styles.equipmentWrapper}>
            <Equipment
              inventoryItems={inventoryItems}
              setInventoryItems={setInventoryItems}
              equipmentSlots={equipmentSlots}
              setEquipmentSlots={setEquipmentSlots}
              handleDropToEquipment={handleDropToEquipment}
            />
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default Inventory;
