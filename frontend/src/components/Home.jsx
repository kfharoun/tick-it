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
      <h1>Popular Concerts!</h1>
      {events.filter(event => event.is_popular).map(event => (
        <Link to={`/events/${event.id}`} key={event.id}>
          <div> 
            <img src={event.image_url} alt={event.name} style={{ width: '200px', height: 'auto' }} />
            <h2>{event.artist.name}</h2>
          </div>
        </Link>
      ))}
      <h1>Upcoming Events!</h1>
      <ul>
        {events.map(event => (
          <Link to={`/events/${event.id}`}>
          <div key={event.id}>
            <h2>{event.name}</h2>
          </div></Link>
        ))}
      </ul>
    </div>
  )
}