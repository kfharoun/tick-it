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
      <h1 className='comingsoon'>Coming Soon !</h1>
      <div className='eventlistcontent'>
        {eventList.map(event => (
          <div className='eventlistinfo'>
         <Link  to = {`/events/${event.id}`}>
          <img className="eventlistimage"src={event.image_url}/>
          <p className="eventlistname" key={event.id}>{event.name}</p></Link>
         </div>
        ))}
    </div>
    </div>
  )
}
