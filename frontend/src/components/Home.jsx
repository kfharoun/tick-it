import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Home() {
  const [events, setEvents] = useState([])
  const [eventInfo, setEventInfo] = useState({ names: [], ids: [] })

  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8000/events/')
        const eventsData = response.data

        const eventsWithArtists = await Promise.all(eventsData.map(async event => {
          const artistResponse = await axios.get(event.artist);
          const artistData = artistResponse.data
          return { ...event, artist: artistData }
        }))

        setEvents(eventsWithArtists)

        if (eventInfo.names.length === 0 && eventInfo.ids.length === 0) {
          setEventInfo({
            names: eventsWithArtists.map(event => event.name),
            ids: eventsWithArtists.map(event => event.id),
          })
        }
      } catch (error) {
        console.error('Cannot get events:', error)
      }
    }

    getEvents()
  }, [eventInfo.names.length, eventInfo.ids.length])

  return (
    <div className="Home">
      <h1 className='popularconcerts'>Popular Concerts!</h1>
      <div className='popevents'>
      {events.filter(event => event.is_popular).map(event => (
        <Link to={`/events/${event.id}`} key={event.id}>
          <div className='contenthome homepic'>
            <img className='homepic' src={event.artist.image_url} alt={event.name} />
            <h2 className='artistname'>{event.artist.name}</h2>
            </div>
        </Link>
      ))}
      </div>
      <div className='upevents'>
      <h1>Upcoming Events!</h1>
      <div className='upeventcont'>
        {events.map(event => (
          <Link to={`/events/${event.id}`}>
          
            <div className='upeventcont'>
            <h2 className='conttext'>{event.artist.name}</h2>
            <h2 className='conttext'>{event.name}</h2>
            
          </div></Link>
        ))}
      </div>
      </div>
    </div>
  )
}