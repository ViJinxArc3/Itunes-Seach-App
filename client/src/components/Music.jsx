import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'

//import assets
import appleIcon from '../assets/apple-icon.png';
import searchIcon from '../assets/search-icon.png';
import heartIcon from '../assets/heart-icon.png';

const Music = () => {

 // define three state variables using the useState hook: 
 // searchSong, searchResults, and searchClicked.
const [searchSong, setSearchSong] = useState('');
const [searchResults, setSearchResults] = useState([]);
const [searchClicked, setSearchClicked] = useState(false);

  
// define function to add item to favorites by using axios to do a POST 
// request to the server with data when the 'like' button is clicked. 
const addToFavorites = async (item) => {
  console.log(item)
  try {
    const response = await axios.post('/search/favorites', item);
    console.log(response.data); // should log { message: 'Favorite item added successfully!' }
  } catch (error) {
    console.error(error);
  }
}

// call addToFavorites function with the liked item data when the 
// like button is clicked
const handleLikeButtonClick = (result) => {
 
  const likedItem = {
    trackId: result.trackId,
    artworkUrl100: result.artworkUrl100,
    trackName: result.trackName,
    artistName: result.artistName
  };
  addToFavorites(likedItem);
}



const handleSearchChange = (event) => {
  setSearchSong(event.target.value);
}

// sends get request to server with search term when the search btn is
// clicked and updates the searchResults and search Clicked state variables
const handleSearchClick = async () => {
  const response = await fetch(`/search?term=${searchSong}`);
  const data = await response.json();
  setSearchResults(data.results || [])
  setSearchClicked(true);
}

  
  return (
    <div>
      <div className='topBar'>
        <img src={appleIcon} alt='My Image' className='apple-icon' />
        <h1>Music</h1>
        <Link to='/'>
          <button className='home-btn-music'>Homepage</button>
        </Link>
      </div>
      <div className='header'>
        <h2>Discover new music every day.</h2>
      </div>
      <div className='header'>
        <p>
          Apple Music is the single destination for all the audio entertainment
          you love — and all the ones you will love next. Browse the Music Store
          to find the audio book to listen or dance to. Track what you have
          listened and want to listen to, and set your own Vibing Goals — all in
          one app and across all your Apple devices.
        </p>
      </div>
      <div className='search-bar'>
        <input
          type='text'
          placeholder='Search..'
          value={searchSong}
          onChange={handleSearchChange}
        />
        <img
          src={searchIcon}
          alt='My-icon'
          className='search-button-music'
          onClick={handleSearchClick}
        />
      </div>
      

      {/* display results */}
      <div className='search-results'>
       
      {/* using .map to map over the searchResults state array and creates a header and <p> tag
      for each item and displays name of artist, track name and image */}
        {searchResults.map((result) => (
          <div key={result.trackId} className='result-card'>
            <img src={result.artworkUrl100} alt='' className='result-image' />
            <div className='result-details'>
              <h3>{result.trackName}</h3>
              <p>{result.artistName}</p>
              <div>
              </div>
              <img
              src={heartIcon}
              alt='My-icon'
              className='heart'
              onClick={() => handleLikeButtonClick(result)}
              />
            </div>
           
          </div>
        ))}
</div>

    </div>
  );
};

export default Music