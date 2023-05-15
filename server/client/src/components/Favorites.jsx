import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

//import assets
import appleIcon from '../assets/apple-icon.png';

const Favorite = () => {

  //define state of favorites and set it to an empty array
  const [favorites, setFavorites] = useState([]);

  //use effect is used to call fetchFavorites function once when component mounts
  useEffect(() => {
    fetchFavorites();
  }, []);

//using axios to make a GET request to /search/Favorites and returns the data as the state
// of favorites + error handling
  async function fetchFavorites() {
    try {
      const response = await axios.get('/search/favorites');
      setFavorites(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  //using axios to make delete request tp /search/favorites/id and deletes
  // the data from favorites list, fetch favorite then updates the state
  async function removeFromFavorites(id) {
    try {
      const response = await axios.delete(`/search/favorites/${id}`);
      console.log(response.data); // should log { message: 'Favorite item removed successfully!' }
      fetchFavorites();
    } catch (error) {
      console.error(error);
    }
  }

  
  return (
    <div>

       <div className='topBar'>
        <img src={appleIcon} alt='My Image' className='apple-icon' />
        <h1>iFavorites</h1>
        <Link to='/'>
          <button className='home-btn-faves'>Homepage</button>
        </Link>
        </div>

        <div className='header'>
        <h3>Find your Favorites all in one place.</h3>
      </div>
      
      {/* using .map to map over the favorites state array and creates a list item
      for each item and displays name of artist, track name and image */}
      <ul className='fave-list'>
        {favorites.map((item) => (
          <li className='fave-list-item' key={item.trackId}>
            {item.trackName && item.trackName} - {item.artistName}{' '}
            <button onClick={() => removeFromFavorites(item.trackId)}>
              Remove 
            </button>
            {favorites.length > 0 && item.artworkUrl100 && (
              <img src={item.artworkUrl100} alt={item.trackName} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorite;

