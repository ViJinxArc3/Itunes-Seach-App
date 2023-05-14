import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//import components
import Homepage from './components/Homepage';
import Music from './components/Music';
import Books from './components/Books';
import Favorite from './components/Favorites';

import './App.css';

function App() {
  const [favorites, setFavorites] = useState([]);

  const handleFavoriteClick = (favorite) => {
    setFavorites([...favorites, favorite]);
  };

  return (
    <div className="App">
      
      <Router>
      <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/music" element={<Music handleFavoriteClick={handleFavoriteClick}/>} />
          <Route path="/books" element={<Books handleFavoriteClick={handleFavoriteClick}/>} />
          <Route path="/favorite" element={<Favorite favorites={favorites}/>} />
        </Routes>
      </Router>
  
    </div>
  );
}


export default App;
