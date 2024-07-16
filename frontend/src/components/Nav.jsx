
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
// import SearchBar from './SearchBar'
import Header from './Header'

export default function Nav() {

    // const [info, setInfo] = useState([])
    // const [searchQuery, setSearchQuery] = useState('')
  
    // const getInfo = async () => {
    //     try {
    //         const response = await axios.get(`http://localhost:5173/venues/${searchQuery}`);
    //         setInfo(response.data);
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // };
    
    // const handleChange = (e) => {
    //   setSearchQuery(e.target.value)
    // }

    return (
    <div>
        <Link to="/">
            <button>Home</button>   
        </Link>
        <Link to="/venues/:id">
            <button>Venues</button>
        </Link>
        <Link to="/artists/:id">
            <button>Artists</button>
        </Link>
        <Link to="/events">
            <button>Upcoming Events</button>
        </Link>
        {/* <SearchBar getInfo={getInfo} searchQuery={searchQuery} handleChange={handleChange} /> */}
    </div>
    )
}