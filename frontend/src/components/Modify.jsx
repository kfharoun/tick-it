import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Modify = () => {
        const { id } = useParams()
        const navigate = useNavigate()
        const [event, setEvent] = useState({
            name: '',
            venue: '',
            date: '',
            time: '',
        });
        const [updated, setUpdated] = useState(false)
        const [loading, setLoading] = useState(true);
    
    
        useEffect(() => {
            const eventDetails = async () => {
                try {
                    const response = await axios.get(`http://localhost:8000/events/${id}`)
                    setEvent(response.data)
                    setLoading(false)
                } catch (error) {
                    console.error('Error fetching event data:', error)
                }
            }
            if (id) {
                eventDetails()
            } else {
                setLoading(false)
            }
        }, [id]);
    
        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                const response = await axios.put(`http://localhost:8000/eventvenue/${id}`, event)
                console.log('Eventt updated successfully:', response.data)
                setUpdated(true);
            } catch (error) {
                console.error('Error updating artist:', error)
            }
        };
    
        const handleChange = (e) => {
            const { name, value } = e.target
            setEvent(prevEvent => ({
                ...prevEvent,
                [name]: value
            }));
        };
    
    
        useEffect(() => {
            if (updated) {
                navigate('/');
            }
        }, [updated, navigate]);
    
        if (loading) {
            return <div>Loading...</div>
        }
    
        return (
            <div>
            <h1>Edit Event</h1>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" name="name" value={event.name} onChange={handleChange} required />
                <label>Venue:</label>
                <input type="text" name="venue" value={event.venue} onChange={handleChange} />
                <label>Date:</label>
                <input type="date" name="date" value={event.date} onChange={handleChange} />
                <label>Time:</label>
                <input type="time" name="time" value={event.time} onChange={handleChange} />
                <button type="submit">Update</button>
            </form>
        </div>
    );
   
}
export default Modify