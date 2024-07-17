import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import axios from 'axios';


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
      const artistsResponse = await axios.get('http://localhost:5173/artists')
      setArtists(artistsResponse.data);

      const venuesResponse = await axios.get('http://localhost:5173/venues')
      setVenues(venuesResponse.data);

      const eventsResponse = await axios.get('http://localhost:5173/events')
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
    e.preventDefault()

    try {
        if (artistName && genre && members && yearsActive && bandDescription && artistImage) {
        const newArtist = {
          name: artistName,
          genre,
          members,
          years_active: yearsActive,
          band_description: bandDescription,
          image_url: artistImage,
        };
        const artistResponse = await axios.post('http://localhost:8000/artists/', newArtist)
        console.log('New Artist created:', artistResponse.data)
        }
        if (eventName && eventDate && eventTime && eventDescription && ticketPrice && isPopular !== '' && eventImage) {
        const newEvent = {
          artists: artist,
          name: eventName,
          date: eventDate,
          time: eventTime,
          description: eventDescription,
          ticket_price: parseFloat(ticketPrice),
          is_popular: Boolean(isPopular),
          image_url: eventImage,
        };
        const eventResponse = await axios.post('http://localhost:8000/events/', newEvent)
        console.log('New Event created:', eventResponse.data)
        }
        if (venueName && venueAddress && venueDate && contactEmail && contactPhone && capacity && venueImage) {
        const newVenue = {
          event: nameEvent,
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
        };
        const venueResponse = await axios.post('http://localhost:8000/venues/', newVenue)
        console.log('New Venue created:', venueResponse.data)
        }    
    } catch (error) {
        console.error('Error creating record:', error)
      }
    };
    
    if (loading) {
        return <div>Loading...</div>
      }

//     const newArtist= {
//       user_id,
//       name,
//       genre,
//       members,
//       years_active,
//       band_description,
//       image_url,
//     };
//     const newEvent= {
//         artist,
//         name,
//         date,
//         time,
//         description,
//         ticket_price,
//         is_popular,
//         image_url,
//     };
//     const newVenue= {
//         event,
//         name,
//         address,
//         parking,
//         parking_specifics,
//         date,
//         contact_email,
//         contact_phone,
//         capacity,
//         accessible_seating,
//         image_url,
//     };
// }

return (
    <div>
    <h1>Create Form</h1>
        <form onSubmit={handleSubmit}>
        <h2>Artist</h2>
        Name: <input type="text" value={artistName} onChange={(e) => setArtistName(e.target.value)} placeholder="Artist Name" />
        Genre: <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} placeholder="Genre" />
        Members: <input type="text" value={members} onChange={(e) => setMembers(e.target.value)} placeholder="Members" />
        Years Active: <input type="text" value={yearsActive} onChange={(e) => setYearsActive(e.target.value)} placeholder="Years Active" />
        Band Description: <input type="text" value={bandDescription} onChange={(e) => setBandDescription(e.target.value)} placeholder="Band Description" />
        Artist Photo: <input type="text" value={artistImage} onChange={(e) => setArtistImage(e.target.value)} placeholder="Image URL" />
        <h2>Event</h2>
        Artist Name: <input type="text" value={artist} onChange={(e) => setArtist(e.target.value)} placeholder="Artist Name" />
        Event Name: <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} placeholder="Event Name" />
        Event Date: <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
        Event Time: <input type="time" value={eventTime} onChange={(e) => setEventTime(e.target.value)} />
        Description: <textarea value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} placeholder="Event Description" />
        Ticket Price: $<input type="text" value={ticketPrice} onChange={(e) => setTicketPrice(e.target.value)} placeholder="Ticket Price" />
        Popular: <input type="text" value={isPopular} onChange={(e) => setIsPopular(e.target.value)} placeholder="Is Popular" />
        Event Photo: <input type="text" value={eventImage} onChange={(e) => setEventImage(e.target.value)} placeholder="Event Image URL" />
        <h2>Venue</h2>
        Event Name: <input type="text" value={nameEvent} onChange={(e) => setNameEvent(e.target.value)} placeholder="Event Name" />
        Venue Name: <input type="text" value={venueName} onChange={(e) => setVenueName(e.target.value)} placeholder="Venue Name" />
        Address: <textarea value={venueAddress} onChange={(e) => setVenueAddress(e.target.value)} placeholder="Venue Address" />
        Check if Parking Available: <input type="checkbox" checked={hasParking} onChange={(e) => setHasParking(e.target.checked)} />
        Parking Instructions: <input type="text" value={parkingSpecifics} onChange={(e) => setParkingSpecifics(e.target.value)} placeholder="Parking Specifics" />
        Venue Dates: <input type="date" value={venueDate} onChange={(e) => setVenueDate(e.target.value)} />
        Email: <input type="text" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} placeholder="Contact Email" />
        Phone: <input type="text" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} placeholder="Contact Phone" />
        Capacity: <input type="text" value={capacity} onChange={(e) => setCapacity(e.target.value)} placeholder="Capacity" />
        Check if Accessible: <input type="checkbox" checked={accessibleSeating} onChange={(e) => setAccessibleSeating(e.target.checked)} />
        Venue Photo: <input type="text" value={venueImage} onChange={(e) => setVenueImage(e.target.value)} placeholder="Venue Image URL" />
        <button type="submit">Submit</button>
      </form>
    </div>
    );
}
    export default CreateEverything