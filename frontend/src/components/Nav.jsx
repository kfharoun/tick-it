import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { NavDropdown } from 'react-bootstrap'
import axios from 'axios'

export default function Nav() {
  const [venues, setVenues] = useState([])
  const [events, setEvents] = useState([])

  useEffect(() => {
    const getVenues = async () => {
      try {
        const response = await axios.get('http://localhost:8000/venues/')
        setVenues(response.data);
      } catch (error) {
        console.error('cant get venues:', error)
      }
    }

    const getEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8000/events/')
        setEvents(response.data)


        const upcomingEvents = response.data.filter(event => {
          const eventDate = new Date(event.date)
          const currentDate = new Date()
          return eventDate >= currentDate
        }).sort((a, b) => new Date(a.date) - new Date(b.date))

        setEvents(upcomingEvents)
      } catch (error) {
        console.error('cant get events:', error)
      }
    }

    getVenues()
    getEvents()
  }, [])

  return (
    <div className='Nav'>
      {/* <Link className='PageTitle' to='/'>Tick-It!</Link>
      <div className='navGroup'>
        <NavDropdown title="Venues" id="venues-dropdown">
          <NavDropdown.Item as={Link} to="/venues">All Venues</NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/venues/by-location">By Location</NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/venues/by-name">By Venue Name</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Upcoming" id="upcoming-dropdown">
          {events.slice(0, 5).map(event => (
            <NavDropdown.Item key={event.id} as={Link} to={`/event/${event.id}`}>
              {event.name} - {event.date}
            </NavDropdown.Item>
          ))}
        </NavDropdown>
      </div> */}
    </div>
  )
}