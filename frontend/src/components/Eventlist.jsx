import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

export default function Eventlist() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8000/events/');
        setEvents(response.data);
        console.log(response.data)
      } catch (err) {
        console.error('Error fetching events:', err.message);
        setError('There was a problem fetching the event data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    getEvents();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  
  const eventList = Array.isArray(events) ? events : [];

  return (
    <div className='Eventlist'>
      <h1>Upcoming Events</h1>
      <ul>
        {eventList.map(event => (
         <Link to = {`/events/${event.id}`}><li key={event.id}>{event.name}</li></Link>
        ))}
      </ul>
    </div>
  );
}
