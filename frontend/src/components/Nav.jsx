import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { NavDropdown } from 'react-bootstrap'

export default function Nav() {
  const [artists, setArtists] = useState([])
  const [venues, setVenues] = useState([])

  useEffect(() => {
    const getArtists = async () => {
      try {
        const response = await axios.get('http://localhost:8000/artists/')
        setArtists(response.data)
      } catch (error) {
        console.error('Cannot get artists:', error)
      }
    }

    const getVenues = async () => {
      try {
        const response = await axios.get('http://localhost:8000/venues/');
        setVenues(response.data);
      } catch (error) {
        console.error('cant get venues:', error)
      }
    }

    getArtists()
    getVenues()
  }, [])

  return (
    <div className='Nav'>
      <Link className='PageTitle' to='/'>
      <div className='pagetitle'>
        Tick-It!
        </div></Link>
        <Link to="/events/" className='nav, nav-link'>Upcoming</Link>
        <NavDropdown title="Venues" id="venues-dropdown">
          {venues.map(venue => (
            <NavDropdown.Item key={venue.id} as={Link} to={`/venues/${venue.id}`}>
              {venue.name}
            </NavDropdown.Item>
          ))}
        </NavDropdown>
        <NavDropdown title="Artists" id="artists-dropdown">
          {artists.map(artist => (
            <NavDropdown.Item key={artist.id} as={Link} to={`/artists/${artist.id}`}>
              {artist.name}
            </NavDropdown.Item>
          ))}
        </NavDropdown>
        <NavDropdown title="Administrator" id="artists-dropdown">
            <NavDropdown.Item key={artist.id} as={Link} to={`/create`}>
              create form
            </NavDropdown.Item>
        </NavDropdown>
    </div>
  )
}