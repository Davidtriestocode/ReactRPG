import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './Menu';
import ChooseClass from './ChooseClass';
import CharacterCreation from './CharacterCreation';
import CharacterSheet from './CharacterSheet';
import MainMap from './MainMap'; // Import the GameMap component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/choose-class" element={<ChooseClass />} />
        <Route path="/character-creation" element={<CharacterCreation />} />
        <Route path="/character-sheet" element={<CharacterSheet />} />
        <Route path="/main-map" element={<MainMap />} /> {/* Add this route for the GameMap */}
      </Routes>
    </Router>
  );
};

export default App;
