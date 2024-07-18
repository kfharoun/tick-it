import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import {Form } from 'react-bootstrap'

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
        <div className="container mt-5 updateArtist">
        <h1 className='editartist'>Edit Artist</h1>
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Name:</Form.Label>
                <Form.Control type="text" name="name" value={artist.name} onChange={handleChange} required />
            </Form.Group>
            <Form.Group>
                <Form.Label>Genre:</Form.Label>
                <Form.Control type="text" name="genre" value={artist.genre} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Members:</Form.Label>
                <Form.Control type="text" name="members" value={artist.members} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Years Active:</Form.Label>
                <Form.Control type="text" name="years_active" value={artist.years_active} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Band Description:</Form.Label>
                <Form.Control as="textarea" className="text-area" name="band_description" value={artist.band_description} onChange={handleChange} />
            </Form.Group>
            <button className="buttonsubmitupdate" variant="primary" type="submit">Update</button>
        </Form>
    </div>
);
};

export default UpdateArtist;