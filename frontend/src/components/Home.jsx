import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Home() {
  const [events, setEvents] = useState([])
  const [eventInfo, setEventInfo] = useState({ names: [], ids: [] })

  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8000/events/')
        const eventNames = response.data.map(event => ({
          name: event.event_name,
          id: event._id,
        }))
        setEvents(response.data)

        if (eventInfo.names.length === 0 && eventInfo.ids.length === 0) {
          setEventInfo({
            names: eventNames.map(event => event.name),
            ids: eventNames.map(event => event.id),
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
      <h1>Popular Events!</h1>
      <ul>
        {events.filter(event => event.is_popular).map(event => (
          <div key={event.id}>
            <h2>{event.name}</h2>
            <p>Artist: {event.artist_id}</p>
            <p>Date: {event.date}</p>
            <p>Time: {event.time}</p>
            <p>Description: {event.description}</p>
            <p>Ticket Price: ${event.ticket_price}</p>
            <img src={event.image_url} alt={event.name} style={{ width: '200px', height: 'auto' }} />
          </div>
        ))}
      </ul>
      <h1>Upcoming Events!</h1>
      <ul>
        {events.map(event => (
          <div key={event.id}>
            <h2>{event.name}</h2>
          </div>
        ))}
      </ul>
    </div>
  );
}