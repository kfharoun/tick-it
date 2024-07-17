import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';


const UpdateArtist= () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [artist, setArtist] = useState({
        name: '',
        genre: '',
        members: '',
        years_active: '',
        band_description: ''
    });
    const [updated, setUpdated] = useState(false)
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const artistDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/artists/${id}`)
                setArtist(response.data)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching artist data:', error)
            }
        }
        artistDetails()
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8000/artists/${id}`, artist)
            console.log('Artist updated successfully:', response.data)
            setUpdated(true);
        } catch (error) {
            console.error('Error updating artist:', error)
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setArtist(prevArtist => ({
            ...prevArtist,
            [name]: value
        }));
    };


    useEffect(() => {
        if (updated) {
            navigate('/');
        }
    }, [updated, navigate]);

    if (loading) {
        return <div>Loading...</div>
    }
    

    return (
        <div>
        <h1>Edit Artist</h1>
        <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input type="text" name="name" value={artist.name} onChange={handleChange} required />
            <label>Genre:</label>
            <input type="text" name="genre" value={artist.genre} onChange={handleChange} />
            <label>Members:</label>
            <input type="text" name="members" value={artist.members} onChange={handleChange} />
            <label>Years Active:</label>
            <input type="text" name="years_active" value={artist.years_active} onChange={handleChange} />
            <label>Band Description:</label>
            <textarea name="band_description" value={artist.band_description} onChange={handleChange} />
            <button type="submit">Update</button>
        </form>
    </div>
);
};

export default UpdateArtist;