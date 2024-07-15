import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Bandpage from './Bandpage';
import Eventpage from './Eventpage';
import Venuepage from './Venuepage';
import Eventlist from './Eventlist';

export default function Main() {
    return (
        <div className="Main">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/events" element={<Eventlist />} />
            </Routes>
        </div>
    );
}