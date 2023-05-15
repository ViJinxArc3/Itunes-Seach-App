import React from 'react'
import { Link } from 'react-router-dom';
import '../App.css'

//import assets
import appleIcon from '../assets/apple-icon.png';
import musicIcon from '../assets/music-icon.png';
import ibookIcon from '../assets/ibooks-icon.png';
import heartIcon from '../assets/heart-icon.png';

const Homepage = () => {


  return (
    <div>
      
        <div className='topBar'>
        <img src={appleIcon} alt="My Image" className='apple-icon'/>
        <h1>Itunes</h1>
      
        </div>

        {/* Display route buttons to apple music and apple books + a heart 
        button to favorites */}
        
        <div className='btn-container'>
        <Link to='/music'>
        <div>
        <img src={musicIcon} alt="My Icon" className="music-button" />
        </div>
        </Link>
        <Link to='/books'>
        <div>
        <img src={ibookIcon} alt="My Icon" className="ibook-button" />
        </div>
        </Link>
        </div>
        <Link to='/favorite'>
        <div>
        <img src={heartIcon} alt="My Icon" className="heart-home" />
        </div>
        </Link>
       

    </div>
  )
}

export default Homepage