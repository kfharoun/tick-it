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
             <h3>Address: {event.address}</h3>
             <h3>Date: {event.date}</h3>
             <h3>Email: {event.contact_email}</h3>
             <h3>Phone: {event.contact_phone}</h3>
             <h3>Accessible Seating: {event.accessible_seating}</h3>
             <h3>Capacity: {event.capacity}</h3>
             <h4>Parking: {event.parking}</h4>
             <p>Parking Specifics: {event.parking_specifics}</p>
           </div>
         {/* </li>
       ))}
     </ul> */}
    </div>
    );
}