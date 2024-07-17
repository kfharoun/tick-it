import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';


const CreateEverything = () => {
const [artistName, setArtistName] = useState('')
const [genre, setGenre] = useState('')
const [members, setMembers] = useState('')
const [yearsActive, setYearsActive] = useState('')
const [bandDescription, setBandDescription] = useState('')
const [artistImage, setArtistImage] = useState('')

const [artist,setArtist] = useState('')
const [eventName, setEventName] = useState('')
const [eventDate, setEventDate] = useState('')
const [eventTime, setEventTime] = useState('')
const [eventDescription, setEventDescription] = useState('')
const [ticketPrice, setTicketPrice] = useState('')
const [isPopular, setIsPopular] = useState('')
const [eventImage, setEventImage] = useState('')

const [nameEvent, setNameEvent] = useState('')
const [venueName, setVenueName] = useState('')
const [venueAddress, setVenueAddress] = useState('')
const [hasParking, setHasParking] = useState(false);
const [parkingSpecifics, setParkingSpecifics] = useState('')
const [venueDate, setVenueDate] = useState('')
const [contactEmail, setContactEmail] = useState('')
const [contactPhone, setContactPhone] = useState('')
const [capacity, setCapacity] = useState('')
const [accessibleSeating, setAccessibleSeating] = useState(false)
const [venueImage, setVenueImage] = useState('')

const [loading, setLoading] = useState(false)
const [artists, setArtists] = useState([])
const [venues, setVenues] = useState([])
const [events, setEvents] = useState([])

// useEffect(() => {
//     const getArtistResponse = async () => {
//         try {
//             const artistResponse = await axios.get('http://localhost:8000/artists')
//         } catch (error) {
//             console.error('Error fetching user data:', error)
//         } finally {
//             setLoading(false)
//         }
//     };
//     getArtistResponse()
//     }, [])
// useEffect(() => {
//         const getVenueResponse = async () => {
//             try {
//                 const venueResponse = await axios.get('http://localhost:8000/venues',)
//             } catch (error) {
//                 console.error('Error fetching user data:', error)
//             } finally {
//                 setLoading(false);
//             }
//         };
//     getVenueResponse()
//     }, [])
// useEffect(() => {
//         const getEventResponse = async () => {
//             try {
//                 const eventResponse = await axios.get('http://localhost:8000/events',)
//             } catch (error) {
//                 console.error('Error fetching user data:', error)
//             } finally {
//                 setLoading(false)
//             }
//         };
//         getEventResponse()
//         }, [])
useEffect(() => {
const renderData = async () => {
    try {
      const artistsResponse = await axios.get('http://localhost:8000/artists')
      setArtists(artistsResponse.data);

      const venuesResponse = await axios.get('http://localhost:8000/venues')
      setVenues(venuesResponse.data);

      const eventsResponse = await axios.get('http://localhost:8000/events')
      setEvents(eventsResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }
  renderData();
}, [])

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // Create Artist
    if (artistName && genre && members && yearsActive && bandDescription && artistImage) {
      const newArtist = {
        name: artistName,
        genre,
        members,
        years_active: yearsActive,
        band_description: bandDescription,
        image_url: artistImage,
      }
      const artistResponse = await axios.post('http://localhost:8000/artists/', newArtist);
      console.log('New Artist created:', artistResponse.data);
    }

    // Create Event
    if (eventName && eventDate && eventTime && eventDescription && ticketPrice && isPopular !== '' && eventImage) {
      const newEvent = {
        artist: artist, 
        name: eventName,
        date: eventDate,
        time: eventTime,
        description: eventDescription,
        ticket_price: parseFloat(ticketPrice),
        is_popular: Boolean(isPopular),
        image_url: eventImage,
      }
      const eventResponse = await axios.post('http://localhost:8000/events/', newEvent)
      console.log('New Event created:', eventResponse.data)
    }

    // Create Venue
    if (venueName && venueAddress && venueDate && contactEmail && contactPhone && capacity && venueImage) {
      const newVenue = {
        event: nameEvent, // Use event ID here
        name: venueName,
        address: venueAddress,
        parking: hasParking,
        parking_specifics: parkingSpecifics,
        date: venueDate,
        contact_email: contactEmail,
        contact_phone: contactPhone,
        capacity,
        accessible_seating: accessibleSeating,
        image_url: venueImage,
      }
      const venueResponse = await axios.post('http://localhost:8000/venues/', newVenue)
      console.log('New Venue created:', venueResponse.data)
    }
  } catch (error) {
    console.error('Error creating record:', error)
  }
}

if (loading) {
  return <div>Loading...</div>;
}

return (
  <div>
    <h1>Create Form</h1>
    <Form onSubmit={handleSubmit}>
      <h2>Artist</h2>
      <Form.Group controlId="artistName">
        <Form.Label>Name:</Form.Label>
        <Form.Control type="text" value={artistName} onChange={(e) => setArtistName(e.target.value)} placeholder="Artist Name" />
      </Form.Group>
      <Form.Group controlId="genre">
        <Form.Label>Genre:</Form.Label>
        <Form.Control type="text" value={genre} onChange={(e) => setGenre(e.target.value)} placeholder="Genre" />
      </Form.Group>
      <Form.Group controlId="members">
        <Form.Label>Members:</Form.Label>
        <Form.Control type="text" value={members} onChange={(e) => setMembers(e.target.value)} placeholder="Members" />
      </Form.Group>
      <Form.Group controlId="yearsActive">
        <Form.Label>Years Active:</Form.Label>
        <Form.Control type="text" value={yearsActive} onChange={(e) => setYearsActive(e.target.value)} placeholder="Years Active" />
      </Form.Group>
      <Form.Group controlId="bandDescription">
        <Form.Label>Band Description:</Form.Label>
        <Form.Control type="text" value={bandDescription} onChange={(e) => setBandDescription(e.target.value)} placeholder="Band Description" />
      </Form.Group>
      <Form.Group controlId="artistImage">
        <Form.Label>Artist Photo:</Form.Label>
        <Form.Control type="text" value={artistImage} onChange={(e) => setArtistImage(e.target.value)} placeholder="Image URL" />
      </Form.Group>

      <h2>Event</h2>
      <Form.Group controlId="artist">
        <Form.Label>Artist:</Form.Label>
        <Form.Control as="select" value={artist} onChange={(e) => setArtist(e.target.value)}>
          <option value="">Select Artist</option>
          {artists.map((artist) => (
            <option key={artist.id} value={artist.id}>
              {artist.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="eventName">
        <Form.Label>Event Name:</Form.Label>
        <Form.Control type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} placeholder="Event Name" />
      </Form.Group>
      <Form.Group controlId="eventDate">
        <Form.Label>Event Date:</Form.Label>
        <Form.Control type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="eventTime">
        <Form.Label>Event Time:</Form.Label>
        <Form.Control type="time" value={eventTime} onChange={(e) => setEventTime(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="eventDescription">
        <Form.Label>Description:</Form.Label>
        <Form.Control as="textarea" rows={3} value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} placeholder="Event Description" />
      </Form.Group>
      <Form.Group controlId="ticketPrice">
        <Form.Label>Ticket Price:</Form.Label>
        <Form.Control type="text" value={ticketPrice} onChange={(e) => setTicketPrice(e.target.value)} placeholder="Ticket Price" />
      </Form.Group>
      <Form.Group controlId="isPopular">
        <Form.Label>Popular:</Form.Label>
        <Form.Control type="text" value={isPopular} onChange={(e) => setIsPopular(e.target.value)} placeholder="Is Popular" />
      </Form.Group>
      <Form.Group controlId="eventImage">
        <Form.Label>Event Photo:</Form.Label>
        <Form.Control type="text" value={eventImage} onChange={(e) => setEventImage(e.target.value)} placeholder="Event Image URL" />
      </Form.Group>

      <h2>Venue</h2>
      <Form.Group controlId="nameEvent">
        <Form.Label>Event Name:</Form.Label>
        <Form.Control as="select" value={nameEvent} onChange={(e) => setNameEvent(e.target.value)}>
          <option value="">Select Event</option>
          {events.map((event) => (
            <option key={event.id} value={event.id}>
              {event.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="venueName">
        <Form.Label>Venue Name:</Form.Label>
        <Form.Control type="text" value={venueName} onChange={(e) => setVenueName(e.target.value)} placeholder="Venue Name" />
      </Form.Group>
      <Form.Group controlId="venueAddress">
        <Form.Label>Address:</Form.Label>
        <Form.Control as="textarea" rows={3} value={venueAddress} onChange={(e) => setVenueAddress(e.target.value)} placeholder="Venue Address" />
      </Form.Group>
      <Form.Group controlId="hasParking">
        <Form.Check
          type="checkbox"
          label="Has Parking"
          checked={hasParking}
          onChange={(e) => setHasParking(e.target.checked)}
        />
      </Form.Group>
      {hasParking && (
        <Form.Group controlId="parkingSpecifics">
          <Form.Label>Parking Specifics:</Form.Label>
          <Form.Control type="text" value={parkingSpecifics} onChange={(e) => setParkingSpecifics(e.target.value)} placeholder="Parking Specifics" />
        </Form.Group>
      )}
      <Form.Group controlId="venueDate">
        <Form.Label>Event Date:</Form.Label>
        <Form.Control type="date" value={venueDate} onChange={(e) => setVenueDate(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="contactEmail">
        <Form.Label>Contact Email:</Form.Label>
        <Form.Control type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} placeholder="Contact Email" />
      </Form.Group>
      <Form.Group controlId="contactPhone">
        <Form.Label>Contact Phone:</Form.Label>
        <Form.Control type="text" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} placeholder="Contact Phone" />
      </Form.Group>
      <Form.Group controlId="capacity">
        <Form.Label>Capacity:</Form.Label>
        <Form.Control type="text" value={capacity} onChange={(e) => setCapacity(e.target.value)} placeholder="Capacity" />
      </Form.Group>
      <Form.Group controlId="accessibleSeating">
        <Form.Check
          type="checkbox"
          label="Accessible Seating"
          checked={accessibleSeating}
          onChange={(e) => setAccessibleSeating(e.target.checked)}
        />
      </Form.Group>
      <Form.Group controlId="venueImage">
        <Form.Label>Venue Photo:</Form.Label>
        <Form.Control type="text" value={venueImage} onChange={(e) => setVenueImage(e.target.value)} placeholder="Venue Image URL" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Create
      </Button>
    </Form>
  </div>
)
}

export default CreateEverything