import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Artistpage from './Artistpage';
import Eventpage from './Eventpage';
import Venuepage from './Venuepage';
import Eventlist from './Eventlist';
import UpdateArtist from './UpdateArtist';

export default function Main() {
    return (
        <div className="Main">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/events" element={<Eventlist />} />
                <Route path="/events/:id" element={<Eventpage />} />
                <Route path="/venues/:id" element={<Venuepage />} />
                <Route path="/artists/:id" element={<Artistpage />} />
                <Route exact path="/artists/:id/update" element={<UpdateArtist />} />
            </Routes>
        </div>
    )
}