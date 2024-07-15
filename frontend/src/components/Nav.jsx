import Header from './Header'

export default function Nav() {
    return (
    <div>
        <h1>this is the nav</h1>
        <Link to="/events">
            <button>Upcoming Events</button>
          </Link>
          <Link to="/artists">
            <button>Artists</button>
          </Link>
    </div>
    )
}