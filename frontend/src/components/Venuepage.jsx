import Eventlist from './Eventlist';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

export default function Venuepage() {
  const [venues, setVenues] = useState(null);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const getVenueAndEvents = async () => {
      try {
        const venueResponse = await axios.get(`http://localhost:8000/venues/${id}`);
        const venueData = venueResponse.data;
        setVenues(venueData);
        console.log(venueData.event_venues);

       
        const artistResponse = await axios.get(`http://localhost:8000/artists/`);
        const artistData = artistResponse.data;
        setArtists(artistData);
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

  // parsing through the data

  const get_event_date = (venue_name, event_name) => {
    if (venues && venues.name === venue_name) {
      for (let eventVenue of venues.event_venues) {
        if (eventVenue.event.name === event_name) {
          return eventVenue.event.date;
        }
      }
    }
    return null;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const venue_name = venues ? venues.name : '';
  
  const event_date = get_event_date(venue_name);
  console.log(artists.ev)
  return (
    <div className='Venuepage'>
      <h1 className='venue-title'>{venues.name}</h1>
      {venues ? (
        <div className='venue'>
          <div className='venue-info'>
            <img className='venue-image' src={venues.image_url} alt={venues.name} />
            <h2 className='venue-address'>{venues.address}</h2>
            <h2 className='venue-phone'>{venues.contact_phone}</h2>
            <div className='park-accessibility'>
              <h2 className='accessibility'>Accessible seating? {venues.accessible_seating ? '✅' : '❌'}</h2>
              <h2 className='parking'>Parking? {venues.parking ? '✅' : '❌'}</h2>
              <a className="footerlink" href={`mailto:${venues.contact_email}`}>Email Venue</a>
            </div>
          </div>
          <div className='upcoming-events'>
            <h1 className='events-title'>Upcoming Events!</h1>
            {venues.event_venues.length > 0 ? (
              venues.event_venues.map(eventVenue => (
                <div key={eventVenue.id} className='event'>
                  <Link to={`/events/${eventVenue.event.id}`}>
                  <img src={eventVenue.image_url}/>
                    <h3 className='event-name'>{eventVenue.event.name}</h3>
                  </Link>
                  <p className='date'>{eventVenue.event.date}</p>
                  
                  {artists.map(artist => (
                    // eventVenue.event.name.includes(artist.name) &&
                    <div key={artist.id} className='artist'>
                      <img className='artist-image' src={artist.image_url} alt={artist.name} />
                      {/* <h2 className='artist-name'>{artist.name}</h2> */}
                    </div>
                  ))}  
                </div>
              ))
            ) : (
              <p className='no-events'>No events found</p>
            )}
          </div>
        </div>
      ) : (
        <p className='no-venue'>No venue found</p>
      )}
    </div>
  );
}

          
          
          
         
       
        

