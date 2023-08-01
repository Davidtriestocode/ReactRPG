import React from 'react';
import ReactDOM from 'react-dom';
import { DndProvider } from 'react-dnd';
import { useDrag } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './Menu';
import ChooseClass from './ChooseClass';
import CharacterCreation from './CharacterCreation';
import CharacterSheet from './CharacterSheet';
import MainMap from './MainMap'; // Import the GameMap component
import Gameplay from './Gameplay';
import Monsters from './Monsters'; 
import Inventory from './Inventory';
import MenuBar from './MenuBar';
import SelectedItemWindow from './SelectedItemWindow';
import Equipment from './Equipment';
import constants from './constants';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/main-menu" element={<Menu />} />
        <Route path="/choose-class" element={<ChooseClass />} />
        <Route path="/character-creation" element={<CharacterCreation />} />
        <Route path="/character-sheet" element={<CharacterSheet />} />
        {/* Wrap the Inventory component with DndProvider */}
        <Route path="/inventory" element={<DndProvider backend={HTML5Backend}><Inventory /></DndProvider>} />
        {/* Wrap the Equipment component with DndProvider */}
        <Route path="/equipment" element={<DndProvider backend={HTML5Backend}><Equipment /></DndProvider>} />
        <Route path="/main-map" element={<MainMap />} /> {/* Add this route for the GameMap */}
      </Routes>
    </Router>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
export default App;
