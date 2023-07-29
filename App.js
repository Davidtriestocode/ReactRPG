import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './Menu';
import ChooseClass from './ChooseClass';
import CharacterCreation from './CharacterCreation';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/choose-class" element={<ChooseClass />} />
        <Route path="/character-creation" element={<CharacterCreation />} />
      </Routes>
    </Router>
  );
};

export default App;
