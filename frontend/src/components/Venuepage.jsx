import Eventlist from './Eventlist';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

export default function Venuepage() {
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const getVenue = async () => {
      try {
        const venueResponse = await axios.get(`http://localhost:8000/venues/${id}`);
        const venueData = venueResponse.data;
        setVenue(venueData);
        console.log(venueData);
      } catch (err) {
        console.error('Error fetching venue', err.message);
        setError('There was a problem fetching venue data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    getVenue();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='Venuepage'>
      <h1>Venue</h1>
      {venue ? (
        <div className = 'venue-image'>
           <img src={venue.image_url} alt={venue.name} />
          {/* Add any other venue details you want to display */}
          <div className = 'venue-info'>
          <h2>{venue.name}</h2>
          <h2>{venue.address}</h2>
          <h2>{venue.contact_phone}</h2>
          <h2>Accessible seating? {venue.accessible_seating ? '✅' : '❌'}</h2>
          <h2>Is there parking? {venue.parking ? '✅' : '❌'}</h2>
          <a className="footerlink" href={`mailto:${venue.contact_email}`}>email</a>


          </div>
          <div className = 'upcoming-events'>
          <h3>Upcoming Events</h3>
          <Eventlist venueId={venue.id} />
          </div>
        </div>
      ) : (
        <p>No venue found</p>
      )}
    </div>
  );
}
