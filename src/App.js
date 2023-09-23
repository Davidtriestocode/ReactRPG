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
import Monsters from './Monsters'; 
import Inventory from './Inventory';
import MenuBar from './MenuBar';
import SelectedItemWindow from './SelectedItemWindow';
import Equipment from './Equipment';
import utils from './utils';
import LevelUp from './LevelUp';
import Combat from './Combat';
import GameObject from './GameObject';
import Person from './Person'
import Sprite from './Sprite';
import DirectionInput from './DirectionInput'
import OverworldMap from './OverworldMap'
import Overworld from './Overworld'
import StatusBars from './StatusBars'; // Import the StatusBar component
import GameContext from './GameContext';
import GameProvider from './GameProvider';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/main-menu" element={<Menu />} />
        <Route path="/choose-class" element={<ChooseClass />} />
        <Route path="/character-creation" element={<CharacterCreation />} />
        <Route path="/character-sheet" element={<CharacterSheet />} />
        <Route path="/combat" element={<Combat />} />
        {/* Wrap the Inventory component with DndProvider */}
        <Route path="/inventory" element={<DndProvider backend={HTML5Backend}><Inventory /></DndProvider>} />
        <Route path="/overworld" element={<Overworld />} /> {/* Add this route for the GameMap */}

      </Routes>
    </Router>
  );
};


ReactDOM.render(
  <React.StrictMode>
    {/* Wrap your entire app with GameProvider */}
    <GameProvider>
      <App />
    </GameProvider>
  </React.StrictMode>,
  document.getElementById('root')
  )
export default App;
