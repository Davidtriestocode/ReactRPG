import React from 'react';
import styles from './css/SelectedItemWindow.module.css';

const SelectedItemWindow = ({ selectedItem }) => {
  return (
    <div className={styles.selectedItemWindow}>
      {selectedItem ? (
        // Display item details
        <>
          <img src={selectedItem.image} alt={selectedItem.name} />
          <h3>{selectedItem.name}</h3>
          {/* Display the item description if available */}
          {selectedItem.description && <p>{selectedItem.description}</p>}
          {/* Add more item details as needed */}
        </>
      ) : (
        // If no item is selected, show an empty window
        <p>No item selected</p>
      )}
    </div>
  );
};

export default SelectedItemWindow;
