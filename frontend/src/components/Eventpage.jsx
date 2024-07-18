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
<div className = 'eventpage'>
        <h1 className = 'event_name'>{event.name}</h1>
        <div className = 'eventdetails'>
           <img className = 'eventimage'src={event.image_url} alt={event.name} />
           <div className='eventinfo'>
            <div className='event-day'>
             <h3 className = 'event-date'><h2 className='text'>Date</h2> {event.date}</h3>
             <h3 className='event-time'><h2 className='text'>Time</h2>{event.time}</h3>
             </div>
             <div className='event-stats'>
             <h3 className ='event-price'><h2 className='text'>Ticket Price</h2>{event.ticket_price}</h3>
             <h3 className ='event-pop'><h2 className='text'>Popular?</h2>{event.is_popular ? '✅' : '❌'}</h3>
             </div>
             </div>
             
            
             <p className='description'><h2 className='event-description'>Description</h2> {event.description}</p>
             
     <button className = 'button' onClick={handleDelete}>Delete Event</button>
    </div>
    </div>
    );
}
             