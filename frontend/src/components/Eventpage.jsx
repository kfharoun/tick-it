import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios' 

export default function Event() {
    const [event, setEvent] = useState(null)
    const {id} = useParams()

    useEffect(() => {
        const eventData = async () => {
            try {
                const url = `http://localhost:8000/events/${id}`
                const response = await axios.get(url)
                if (response.status !== 200) {
                    throw new Error('Not working')
                }
                setEvent(response.data)
            } catch (error) {
                console.error('Error grabbing events:', error)
            }
        }
    eventData ()
    }, [id]);

    const handleDelete = async () => {
        try {
            const url = `http://localhost:8000/events/${id}`
            const response = await axios.delete(url);
            if (response.status === 204) {
                console.log('Event deleted successfully')
                window.location.href = '/events'
            }
        } catch (error) {
            console.error('Error deleting', error);
        }
    };

    if (!event) {
        return <div>Loading...</div>
    }

    return (
    <div className = 'Event'>
       <h1>Event page</h1>
       {/* <ul>
       {events.map(event => (
           <li key={event.id}> */}
           <img src={event.image_url} alt={event.name} />
           <div>
             <h2>Name: {event.name}</h2>
             <h3>Date: {event.date}</h3>
             <h3>Time: {event.time}</h3>
             <h3>Ticket Price: {event.ticket_price}</h3>
             <h3>Popular: {event.is_popular ? '✅' : '❌'}</h3>
             <p>Description: {event.description}</p>
           </div>
         {/* </li>
       ))}
     </ul> */}
     <button onClick={handleDelete}>Delete Event</button>
    </div>
    );
}