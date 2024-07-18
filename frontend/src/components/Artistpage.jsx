import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    const date = new Date(dateString)
    return date.toLocaleDateString(undefined, options)
}

export default function Artist() {
    const [artist, setArtist] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const artistData = async () => {
            try {
                const url = `http://localhost:8000/artists/${id}`
                const response = await axios.get(url)
                if (response.status !== 200) {
                    throw new Error('Not working')
                }
                setArtist(response.data);
            } catch (error) {
                console.error('Error grabbing artist', error)
            }
        }
        artistData()
    }, [id])

    if (!artist) {
        return <div>Loading...</div>;
    }

    return (
        <div className='Artist'>
            <div className='nameimggenreinfo'>
                <div className='nameimggenre'>
                    <img className='artistpageimg' src={artist.image_url} alt={artist.name} />
                    <h1 className='artistnamepage'>{artist.name}!</h1>
                    <h3 className='artistgenre'>{artist.genre}</h3>
                    <p>{artist.band_description}</p>
                </div>
                <div className='thirdbit'>
           <div className='cominup'>
            <h1 className='upcomingartist'>upcoming events!</h1>
                {artist.events.map(event => (
                    <Link to={`/events/${event.id}`} key={event.id}>
                        <div className='eventartistinfo'>
                            <img src={event.image_url} className='eventimg' />
                            <p className='eventname'>{event.name}</p>
                            <p className='eventdate'>{formatDate(event.date)}</p>
                        </div>
                    </Link>
                ))}
             </div>
             </div>
             </div>
            <Link to={`/artists/${id}/update`}>Update Artist</Link>
        </div>
    );
}