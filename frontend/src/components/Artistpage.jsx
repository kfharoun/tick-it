import React, { useState, useEffect } from 'react'
import axios from 'axios' 

export default function Artist() {
    const [artists, setArtists] = useState([])

    useEffect(() => {
        const artistData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/artists/')
                if (response.status !== 200) {
                    throw new Error('Not working')
                }
                setArtists(response.data)
            } catch (error) {
                console.error('Error grabbing artists:', error)
            }
        };
    artistData ();
    }, []);

    return (
    <div className = 'Artist'>
       <h1>Artist page</h1>
       <ul>
       {artists.map(artist => (
           <li key={artist.id}>
           <img src={artist.image_url} alt={artist.name} />
           <div>
             <h2>Name: {artist.name}</h2>
             <h3>Genre: {artist.genre}</h3>
             <h3>Members: {artist.members}</h3>
             <h4>Years Active: {artist.years_active}</h4>
             <p>Band Description: {artist.band_description}</p>
           </div>
         </li>
       ))}
     </ul>
    </div>
    );
}