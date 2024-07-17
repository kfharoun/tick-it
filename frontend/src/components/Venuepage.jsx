import Eventlist from './Eventlist';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';


export default function Venuepage() {
  const [venue, setVenue] = useState(null);
  const [artist, setArtist] = useState(null)
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const getVenueAndEvents = async () => {
      try {
        const venueResponse = await axios.get(`http://localhost:8000/venues/${id}`);
        const venueData = venueResponse.data;
        setVenue(venueData);
        console.log(venueData);

        const eventsResponse = await axios.get(`http://localhost:8000/events/`);
        const eventsData = eventsResponse.data;
        console.log(eventsData)
        
        const venueEvents = eventsData.filter(event => event.venues.some(venue => venue.id === parseInt(id)))
        setEvents(venueEvents);
        console.log(venueEvents)

        const artistResponse = await axios.get(`http://localhost:8000/artists/${id}`);
        const artistData = artistResponse.data;
        setArtist(artistData);
        console.log(artistData);


      } catch (err) {
        console.error('Error fetching venue', err.message);
        setError('There was a problem fetching venue data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    getVenueAndEvents();
  }, [id]);



  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  console.log(events)
    
  return (
    <div className='Venuepage'>
      <h1>Venue: {venue.name}</h1>
      {venue ? (
        <div className = 'venue-image'>
           <img src={venue.image_url} alt={venue.name} />
          {/* Add any other venue details you want to display */}
          <div className = 'venue-info'>
          <h2>{venue.address}</h2>
          <h2>{venue.contact_phone}</h2>
          <h2>Accessible seating? {venue.accessible_seating ? '✅' : '❌'}</h2>
          <h2>Is there parking? {venue.parking ? '✅' : '❌'}</h2>
          <a className="footerlink" href={`mailto:${venue.contact_email}`}>email</a>
    </div> 
          
    <div className = 'upcoming-events'>
          {/* <Eventlist venueId={venue.id} /> */}
          <h2>Upcoming Events</h2>
          {events.length > 0 ? (
            events.map(event => (
              <div key={event.id} className='event'>
                <p>{new Date(event.date).toLocaleDateString()}</p>
                <Link to = {`/events/${event.id}`}><h3>{event.name}</h3></Link>
                  <p>{artist.name}</p>
                  <img src={artist.image_url} alt={artist.name} />
              </div>
            ))
            ) : (
              <p>No events found</p>
            )}
          </div>
        </div>
      ) : (
        <p>No venue found</p>
      )}
    </div>
  );
}

         
           
        
          
          
          
         
       
        

