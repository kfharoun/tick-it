import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios' 

export default function Artist() {
    const [artist, setArtist] = useState(null)
    const {id} = useParams()

    useEffect(() => {
        const artistData = async () => {
            try {
                const url = `http://localhost:8000/artists/${id}`
                const response = await axios.get(url)
                // const response = await axios.get('http://localhost:8000/artists/${id}')
                if (response.status !== 200) {
                    throw new Error('Not working')
                }
                setArtist(response.data)
            } catch (error) {
                console.error('Error grabbing artist', error)
            }
        }
    artistData()
    }, [id]);

    if (!artist) {
        return <div>Loading...</div>
    }

    return (
    <div className = 'Artist'>
       <h1>Artist page</h1>
       {/* <ul>
       {artists.map(artist => (
           <li key={artist.id}> */}
           <img src={artist.image_url} alt={artist.name} />
           <div>
             <h2>Name: {artist.name}</h2>
             <h3>Genre: {artist.genre}</h3>
             <h3>Members: {artist.members}</h3>
             <h4>Years Active: {artist.years_active}</h4>
             <p>Band Description: {artist.band_description}</p>
           </div>
         {/* </li>
       ))}
     </ul> */}
    </div>
    );
}