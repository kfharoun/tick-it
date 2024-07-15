import { Route, Routes } from 'react-router-dom';
import Home from './Home';

export default function Main() {
    return (
        <div className="Main">
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </div>
    );
}