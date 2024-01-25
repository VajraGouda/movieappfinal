import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import styles from './styles.module.css';
import { useParams, Link, useNavigate } from 'react-router-dom';
import tomato from './tomato.png';

const MovieDetailPage = () => {
    const navigate = useNavigate();
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

    const handleBookTickets = () => {

        const isLoggedIn = localStorage.getItem("access_token");
        if (isLoggedIn) {
            console.log(isLoggedIn)

            navigate(`/theatre/${id}`);

        } else {

            navigate('/login');
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    const { title, director, genre, language, rating, movie_length, trailer, description, image } = movie;
    const { id: theatreId } = theatre; 

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="row">
                    <div className="col-md-4 text-center">
                        <div className={styles.wrapper}>
                            {image && <img src={image} alt={title} className="img-fluid" />}
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className={styles.wrapper}>
                            <h1 className={styles.h1}>{title}</h1>
                            <h2 className={styles.author}>{director}</h2>
                            <h2 className={styles.author}>{genre}</h2>
                            <h2 className={styles.author}>{language}</h2>
                            <h2 className={styles.author}><img src={tomato} alt="tomato" style={{ maxWidth: '4.5%', height: 'auto' }} />{rating}</h2>
                            <h2 className={styles.author}>{movie_length} minutes</h2>

                            <p>{description}</p>
                            {/* <p>Theatre: {theatreId}</p> */}

                            <div className={styles.buttons}>
                                <div className={styles.watch}>
                                    <Link to={trailer} className="btn btn-primary" style={{ background: "#E4D00A", border: "none", fontWeight: "bold" }} >
                                        Watch Trailer
                                    </Link>
                                </div>


                                <div className={styles.watch}>
                                    <button onClick={handleBookTickets} className="btn btn-primary" style={{
                                        background: "#E4D00A",
                                        border: "none",
                                        fontWeight: "bold"
                                    }}>
                                        Book Tickets
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MovieDetailPage;
