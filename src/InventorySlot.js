import React from 'react';
import styles from './css/InventorySlot.module.css';
import { useDrag } from 'react-dnd';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './constants';

const InventorySlot = ({ item, setSelectedItem, inventoryItems, setInventoryItems }) => {
  const handleItemClick = () => {
    setSelectedItem(item); // Set the selected item when the slot is clicked
  };

  // Use the useDrag hook to make the item draggable
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.ITEM,
    item: { id: item.id, name: item.name, image: item.image },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const opacity = isDragging ? 0.4 : 1;

  // Use the useDrop hook to handle the drop event
  const handleDrop = () => {
    // Filter out the dropped item from the inventory
    const updatedInventory = inventoryItems.filter((inventoryItem) => inventoryItem.id !== item.id);
    setInventoryItems(updatedInventory);
  };

  // Attach the drag and drop functionality to the inventory slot
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.ITEM,
    drop: handleDrop,
  }));

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={styles.inventorySlot}
      onClick={handleItemClick}
      style={{ opacity }}
    >
      {item && <img src={item.image} alt={item.name} />}
    </div>
  );
};

export default InventorySlot;
