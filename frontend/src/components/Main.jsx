import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Artistpage from './Artistpage';
import Eventpage from './Eventpage';
import Venuepage from './Venuepage';
import Eventlist from './Eventlist';
import UpdateArtist from './UpdateArtist';
import CreateEverything from './CreateEverything';

export default function Main() {
    return (
        <div className="Main">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/events" element={<Eventlist />} />
                <Route path="/events/:id" element={<Eventpage />} />
                <Route path="/venues/:id" element={<Venuepage />} />
                <Route path="/artists/:id" element={<Artistpage />} />
                <Route path="/artists/:id/update" element={<UpdateArtist />} />
                <Route path="/create" element={<CreateEverything/>} />
            </Routes>
        </div>
    )
}