import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import styles from './styles.module.css';
import { useParams, Link } from 'react-router-dom';
import tomato from './tomato.png';

const TheatreSelection = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState({});
    const [theatre, setTheatre] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const theatreResponse = await axios.get(`http://127.0.0.1:8000/api/theatre/${id}/`);
                console.log('Theatre API Response:', theatreResponse.data);
                setTheatre(theatreResponse.data);
                setMovie(theatreResponse.data.movie); 
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    const { title, director, genre, language, rating, movie_length, trailer, description, image } = movie;
    const { name, address, city, pincode, movie_timing } = theatre;

    

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="row">
                    <div className="col-md-4 text-center">
                        <div className={styles.wrapper}>
                            {image && <img src={image} alt={title} className="img-fluid" />}
                            <h1 className={styles.h1}>{title}</h1>
                            <h2 className={styles.author}>{director}</h2>
                            <h2 className={styles.author}>{genre}</h2>
                            <h2 className={styles.author}>{language}</h2>
                            <h2 className={styles.author}><img src={tomato} alt="tomato" style={{ maxWidth: '10%', height: 'auto' }} />{rating}/10</h2>
                            <h2 className={styles.author}>{movie_length} minutes</h2>

                            <p>{description}</p>
                        </div>
                    </div>


                    <div className="col-md-8">
                        <div className={styles.wrapper}>
                            <h1 className={styles.h1}>Select a theatre</h1>


                           

                            <div style={{ display: 'flex', margin: "10px", justifyContent: "space-between" }}>
                                <div className={styles.watch}>
                                    <Link className="btn btn-primary" style={{ background: "#E4D00A", border: "none", fontWeight: "bold" }} >
                                        {name}
                                    </Link>
                                </div>
                                <div >
                                    <Link to={`/seats/${movie.id}`} className="btn btn-primary " 
                                        style={{
                                            background: "#E4D00A",
                                            border: "none",
                                            fontWeight: "bold",
                                            marginLeft: "30px"
                                        }} >
                                        09:15
                                    </Link>

                                    <Link to={`/seats/${movie.id}`} className="btn btn-primary "
                                        style={{
                                            background: "#E4D00A",
                                            border: "none",
                                            fontWeight: "bold",
                                            marginLeft: "30px"
                                        }} >
                                        12:15
                                    </Link>

                                    <Link to={`/seats/${movie.id}`} className="btn btn-primary "
                                        style={{
                                            background: "#E4D00A",
                                            border: "none",
                                            fontWeight: "bold",
                                            marginLeft: "30px"
                                        }} >
                                        03:15
                                    </Link>

                                    <Link to={`/seats/${movie.id}`} className="btn btn-primary "
                                        style={{
                                            background: "#E4D00A",
                                            border: "none",
                                            fontWeight: "bold",
                                            marginLeft: "30px"
                                        }} >
                                        06:15
                                    </Link>

                                </div>
                            </div>

                            {/* irrelevant class */}


                            <div style={{ display: 'flex', marginTop: "30px", marginLeft: "10px", justifyContent: "space-between" }}>
                                <div className={styles.watch}>
                                    <Link className="btn btn-primary" style={{ background: "#C2B280", border: "none", fontWeight: "bold" }} title="Not Available">
                                        Vishal Movies
                                    </Link>
                                </div>
                                <div >
                                    <Link className="btn btn-primary "
                                        style={{
                                            background: "#C2B280",
                                            border: "none",
                                            fontWeight: "bold",
                                            marginLeft: "30px"
                                        }} title="Not Available">
                                        09:15
                                    </Link>

                                    <Link className="btn btn-primary "
                                        style={{
                                            background: "#C2B280",
                                            border: "none",
                                            fontWeight: "bold",
                                            marginLeft: "30px"
                                        }} title="Not Available">
                                        12:15
                                    </Link>

                                    <Link className="btn btn-primary "
                                        style={{
                                            background: "#C2B280",
                                            border: "none",
                                            fontWeight: "bold",
                                            marginLeft: "30px"
                                        }} title="Not Available">
                                        03:15
                                    </Link>

                                    <Link className="btn btn-primary "
                                        style={{
                                            background: "#C2B280",
                                            border: "none",
                                            fontWeight: "bold",
                                            marginLeft: "30px"
                                        }} title="Not Available">
                                        06:15
                                    </Link>

                                </div>
                            </div>

                            {/* irrelevant class */}


                            <div style={{ display: 'flex', marginTop: "30px", marginLeft: "10px", justifyContent: "space-between" }}>
                                <div className={styles.watch}>
                                    <Link className="btn btn-primary" style={{ background: "#C2B280", border: "none", fontWeight: "bold" }} title="Not Available">
                                        Alka Movies
                                    </Link>
                                </div>
                                <div >
                                    <Link className="btn btn-primary "
                                        style={{
                                            background: "#C2B280",
                                            border: "none",
                                            fontWeight: "bold",
                                            marginLeft: "30px"
                                        }} title="Not Available">
                                        09:15
                                    </Link>

                                    <Link className="btn btn-primary "
                                        style={{
                                            background: "#C2B280",
                                            border: "none",
                                            fontWeight: "bold",
                                            marginLeft: "30px"
                                        }} title="Not Available">
                                        12:15
                                    </Link>

                                    <Link className="btn btn-primary "
                                        style={{
                                            background: "#C2B280",
                                            border: "none",
                                            fontWeight: "bold",
                                            marginLeft: "30px"
                                        }} title="Not Available">
                                        03:15
                                    </Link>

                                    <Link className="btn btn-primary "
                                        style={{
                                            background: "#C2B280",
                                            border: "none",
                                            fontWeight: "bold",
                                            marginLeft: "30px"
                                        }} title="Not Available">
                                        06:15
                                    </Link>

                                </div>
                            </div>

                            {/* irrelevant class */}


                            <div style={{ display: 'flex', marginTop: "30px", marginLeft: "10px", justifyContent: "space-between" }}>
                                <div className={styles.watch}>
                                    <Link className="btn btn-primary" style={{ background: "#C2B280", border: "none", fontWeight: "bold" }} title="Not Available">
                                        Rex Cinemas
                                    </Link>
                                </div>
                                <div >
                                    <Link className="btn btn-primary "
                                        style={{
                                            background: "#C2B280",
                                            border: "none",
                                            fontWeight: "bold",
                                            marginLeft: "30px"
                                        }} title="Not Available">
                                        09:15
                                    </Link>

                                    <Link className="btn btn-primary "
                                        style={{
                                            background: "#C2B280",
                                            border: "none",
                                            fontWeight: "bold",
                                            marginLeft: "30px"
                                        }} title="Not Available">
                                        12:15
                                    </Link>

                                    <Link className="btn btn-primary "
                                        style={{
                                            background: "#C2B280",
                                            border: "none",
                                            fontWeight: "bold",
                                            marginLeft: "30px"
                                        }} title="Not Available">
                                        03:15
                                    </Link>

                                    <Link className="btn btn-primary "
                                        style={{
                                            background: "#C2B280",
                                            border: "none",
                                            fontWeight: "bold",
                                            marginLeft: "30px"
                                        }} title="Not Available">
                                        06:15
                                    </Link>

                                </div>
                            </div>

                            {/* irrelevant class */}


                            <div style={{ display: 'flex', marginTop: "30px", marginLeft: "10px", justifyContent: "space-between" }}>
                                <div className={styles.watch}>
                                    <Link className="btn btn-primary" style={{ background: "#C2B280", border: "none", fontWeight: "bold" }} title="Not Available">
                                        Rex Cinemas
                                    </Link>
                                </div>
                                <div >
                                    <Link className="btn btn-primary "
                                        style={{
                                            background: "#C2B280",
                                            border: "none",
                                            fontWeight: "bold",
                                            marginLeft: "30px"
                                        }} title="Not Available">
                                        09:15
                                    </Link>

                                    <Link className="btn btn-primary "
                                        style={{
                                            background: "#C2B280",
                                            border: "none",
                                            fontWeight: "bold",
                                            marginLeft: "30px"
                                        }} title="Not Available">
                                        12:15
                                    </Link>

                                    <Link className="btn btn-primary "
                                        style={{
                                            background: "#C2B280",
                                            border: "none",
                                            fontWeight: "bold",
                                            marginLeft: "30px"
                                        }} title="Not Available">
                                        03:15
                                    </Link>

                                    <Link className="btn btn-primary "
                                        style={{
                                            background: "#C2B280",
                                            border: "none",
                                            fontWeight: "bold",
                                            marginLeft: "30px"
                                        }} title="Not Available">
                                        06:15
                                    </Link>

                                </div>
                            </div>

                            {/* irrelevant class */}


                            <div style={{ display: 'flex', marginTop: "30px", marginLeft: "10px", justifyContent: "space-between" }}>
                                <div className={styles.watch}>
                                    <Link className="btn btn-primary" style={{ background: "#C2B280", border: "none", fontWeight: "bold" }} title="Not Available">
                                        Rex Cinemas
                                    </Link>
                                </div>
                                <div >
                                    <Link className="btn btn-primary "
                                        style={{
                                            background: "#C2B280",
                                            border: "none",
                                            fontWeight: "bold",
                                            marginLeft: "30px"
                                        }} title="Not Available">
                                        09:15
                                    </Link>

                                    <Link className="btn btn-primary "
                                        style={{
                                            background: "#C2B280",
                                            border: "none",
                                            fontWeight: "bold",
                                            marginLeft: "30px"
                                        }} title="Not Available">
                                        12:15
                                    </Link>

                                    <Link className="btn btn-primary "
                                        style={{
                                            background: "#C2B280",
                                            border: "none",
                                            fontWeight: "bold",
                                            marginLeft: "30px"
                                        }} title="Not Available">
                                        03:15
                                    </Link>

                                    <Link className="btn btn-primary "
                                        style={{
                                            background: "#C2B280",
                                            border: "none",
                                            fontWeight: "bold",
                                            marginLeft: "30px"
                                        }} title="Not Available">
                                        06:15
                                    </Link>

                                </div>
                            </div>

                            {/* irrelevant class */}


                            <div style={{ display: 'flex', marginTop: "30px", marginLeft: "10px", justifyContent: "space-between" }}>
                                <div className={styles.watch}>
                                    <Link className="btn btn-primary" style={{ background: "#C2B280", border: "none", fontWeight: "bold" }} title="Not Available">
                                        Rex Cinemas
                                    </Link>
                                </div>
                                <div >
                                    <Link className="btn btn-primary "
                                        style={{
                                            background: "#C2B280",
                                            border: "none",
                                            fontWeight: "bold",
                                            marginLeft: "30px"
                                        }} title="Not Available">
                                        09:15
                                    </Link>

                                    <Link className="btn btn-primary "
                                        style={{
                                            background: "#C2B280",
                                            border: "none",
                                            fontWeight: "bold",
                                            marginLeft: "30px"
                                        }} title="Not Available">
                                        12:15
                                    </Link>

                                    <Link className="btn btn-primary "
                                        style={{
                                            background: "#C2B280",
                                            border: "none",
                                            fontWeight: "bold",
                                            marginLeft: "30px"
                                        }} title="Not Available">
                                        03:15
                                    </Link>

                                    <Link className="btn btn-primary "
                                        style={{
                                            background: "#C2B280",
                                            border: "none",
                                            fontWeight: "bold",
                                            marginLeft: "30px"
                                        }} title="Not Available">
                                        06:15
                                    </Link>

                                </div>
                            </div>

                            {/* irrelevant class */}


                            <div style={{ display: 'flex', marginTop: "30px", marginLeft: "10px", justifyContent: "space-between" }}>
                                <div className={styles.watch}>
                                    <Link className="btn btn-primary" style={{ background: "#C2B280", border: "none", fontWeight: "bold" }} title="Not Available">
                                        Rex Cinemas
                                    </Link>
                                </div>
                                <div >
                                    <Link className="btn btn-primary "
                                        style={{
                                            background: "#C2B280",
                                            border: "none",
                                            fontWeight: "bold",
                                            marginLeft: "30px"
                                        }} title="Not Available">
                                        09:15
                                    </Link>

                                    <Link className="btn btn-primary "
                                        style={{
                                            background: "#C2B280",
                                            border: "none",
                                            fontWeight: "bold",
                                            marginLeft: "30px"
                                        }} title="Not Available">
                                        12:15
                                    </Link>

                                    <Link className="btn btn-primary "
                                        style={{
                                            background: "#C2B280",
                                            border: "none",
                                            fontWeight: "bold",
                                            marginLeft: "30px"
                                        }} title="Not Available">
                                        03:15
                                    </Link>

                                    <Link className="btn btn-primary "
                                        style={{
                                            background: "#C2B280",
                                            border: "none",
                                            fontWeight: "bold",
                                            marginLeft: "30px"
                                        }} title="Not Available">
                                        06:15
                                    </Link>

                                </div>
                            </div>

                            {/* irrelevant class */}


                            <div style={{ display: 'flex', marginTop: "30px", marginLeft: "10px", justifyContent: "space-between" }}>
                                <div className={styles.watch}>
                                    <Link className="btn btn-primary" style={{ background: "#C2B280", border: "none", fontWeight: "bold" }} title="Not Available">
                                        Rex Cinemas
                                    </Link>
                                </div>
                                <div >
                                    <Link className="btn btn-primary "
                                        style={{
                                            background: "#C2B280",
                                            border: "none",
                                            fontWeight: "bold",
                                            marginLeft: "30px"
                                        }} title="Not Available">
                                        09:15
                                    </Link>

                                    <Link className="btn btn-primary "
                                        style={{
                                            background: "#C2B280",
                                            border: "none",
                                            fontWeight: "bold",
                                            marginLeft: "30px"
                                        }} title="Not Available">
                                        12:15
                                    </Link>

                                    <Link className="btn btn-primary "
                                        style={{
                                            background: "#C2B280",
                                            border: "none",
                                            fontWeight: "bold",
                                            marginLeft: "30px"
                                        }} title="Not Available">
                                        03:15
                                    </Link>

                                    <Link className="btn btn-primary "
                                        style={{
                                            background: "#C2B280",
                                            border: "none",
                                            fontWeight: "bold",
                                            marginLeft: "30px"
                                        }} title="Not Available">
                                        06:15
                                    </Link>

                                </div>
                            </div>

                            {/* irrelevant class */}


                            <div style={{ display: 'flex', marginTop: "30px", marginLeft: "10px", justifyContent: "space-between" }}>
                                <div className={styles.watch}>
                                    <Link className="btn btn-primary" style={{ background: "#C2B280", border: "none", fontWeight: "bold" }} title="Not Available">
                                        Rex Cinemas
                                    </Link>
                                </div>
                                <div >
                                    <Link className="btn btn-primary "
                                        style={{
                                            background: "#C2B280",
                                            border: "none",
                                            fontWeight: "bold",
                                            marginLeft: "30px"
                                        }} title="Not Available">
                                        09:15
                                    </Link>

                                    <Link className="btn btn-primary "
                                        style={{
                                            background: "#C2B280",
                                            border: "none",
                                            fontWeight: "bold",
                                            marginLeft: "30px"
                                        }} title="Not Available">
                                        12:15
                                    </Link>

                                    <Link className="btn btn-primary "
                                        style={{
                                            background: "#C2B280",
                                            border: "none",
                                            fontWeight: "bold",
                                            marginLeft: "30px"
                                        }} title="Not Available">
                                        03:15
                                    </Link>

                                    <Link className="btn btn-primary "
                                        style={{
                                            background: "#C2B280",
                                            border: "none",
                                            fontWeight: "bold",
                                            marginLeft: "30px"
                                        }} title="Not Available">
                                        06:15
                                    </Link>

                                </div>
                            </div>

                            {/* irrelevant class */}


                            <div style={{ display: 'flex', marginTop: "30px", marginLeft: "10px", justifyContent: "space-between" }}>
                                <div className={styles.watch}>
                                    <Link className="btn btn-primary" style={{ background: "#C2B280", border: "none", fontWeight: "bold" }} title="Not Available">
                                        Rex Cinemas
                                    </Link>
                                </div>
                                <div >
                                    <Link className="btn btn-primary "
                                        style={{
                                            background: "#C2B280",
                                            border: "none",
                                            fontWeight: "bold",
                                            marginLeft: "30px"
                                        }} title="Not Available">
                                        09:15
                                    </Link>

                                    <Link className="btn btn-primary "
                                        style={{
                                            background: "#C2B280",
                                            border: "none",
                                            fontWeight: "bold",
                                            marginLeft: "30px"
                                        }} title="Not Available">
                                        12:15
                                    </Link>

                                    <Link className="btn btn-primary "
                                        style={{
                                            background: "#C2B280",
                                            border: "none",
                                            fontWeight: "bold",
                                            marginLeft: "30px"
                                        }} title="Not Available">
                                        03:15
                                    </Link>

                                    <Link className="btn btn-primary "
                                        style={{
                                            background: "#C2B280",
                                            border: "none",
                                            fontWeight: "bold",
                                            marginLeft: "30px"
                                        }} title="Not Available">
                                        06:15
                                    </Link>

                                </div>
                            </div>

                            {/* irrelevant class */}


                            <div style={{ display: 'flex', marginTop: "30px", marginLeft: "10px", justifyContent: "space-between" }}>
                                <div className={styles.watch}>
                                    <Link className="btn btn-primary" style={{ background: "#C2B280", border: "none", fontWeight: "bold" }} title="Not Available">
                                        Rex Cinemas
                                    </Link>
                                </div>
                                <div >
                                    <Link className="btn btn-primary "
                                        style={{
                                            background: "#C2B280",
                                            border: "none",
                                            fontWeight: "bold",
                                            marginLeft: "30px"
                                        }} title="Not Available">
                                        09:15
                                    </Link>

                                    <Link className="btn btn-primary "
                                        style={{
                                            background: "#C2B280",
                                            border: "none",
                                            fontWeight: "bold",
                                            marginLeft: "30px"
                                        }} title="Not Available">
                                        12:15
                                    </Link>

                                    <Link className="btn btn-primary "
                                        style={{
                                            background: "#C2B280",
                                            border: "none",
                                            fontWeight: "bold",
                                            marginLeft: "30px"
                                        }} title="Not Available">
                                        03:15
                                    </Link>

                                    <Link className="btn btn-primary "
                                        style={{
                                            background: "#C2B280",
                                            border: "none",
                                            fontWeight: "bold",
                                            marginLeft: "30px"
                                        }} title="Not Available">
                                        06:15
                                    </Link>

                                </div>
                            </div>

                            {/* irrelevant class */}


                            <div style={{ display: 'flex', marginTop: "30px", marginLeft: "10px", justifyContent: "space-between" }}>
                                <div className={styles.watch}>
                                    <Link className="btn btn-primary" style={{ background: "#C2B280", border: "none", fontWeight: "bold" }} title="Not Available">
                                        Rex Cinemas
                                    </Link>
                                </div>
                                <div >
                                    <Link className="btn btn-primary "
                                        style={{
                                            background: "#C2B280",
                                            border: "none",
                                            fontWeight: "bold",
                                            marginLeft: "30px"
                                        }} title="Not Available">
                                        09:15
                                    </Link>

                                    <Link className="btn btn-primary "
                                        style={{
                                            background: "#C2B280",
                                            border: "none",
                                            fontWeight: "bold",
                                            marginLeft: "30px"
                                        }} title="Not Available">
                                        12:15
                                    </Link>

                                    <Link className="btn btn-primary "
                                        style={{
                                            background: "#C2B280",
                                            border: "none",
                                            fontWeight: "bold",
                                            marginLeft: "30px"
                                        }} title="Not Available">
                                        03:15
                                    </Link>

                                    <Link className="btn btn-primary " 
                                        style={{
                                            background: "#C2B280",
                                            border: "none",
                                            fontWeight: "bold",
                                            marginLeft: "30px"
                                        }} title="Not Available">
                                        06:15
                                    </Link>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TheatreSelection;
