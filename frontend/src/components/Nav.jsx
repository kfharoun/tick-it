
import { Link } from 'react-router-dom'
import Header from './Header'

export default function Nav() {
    return (
    <div>
        <Link to="/">
            <button>Home</button>   
        </Link>
        <Link to="/venues/:id">
            <button>Venues</button>
        </Link>
        <Link to="/artists/:id">
            <button>Artists</button>
        </Link>
        <Link to="/events">
            <button>Upcoming Events</button>
        </Link>
    </div>
    )
}