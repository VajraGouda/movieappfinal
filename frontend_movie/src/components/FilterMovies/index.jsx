import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import styles from './styles.module.css';
import Movie from '../MovieList/Movie';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [city, setCity] = useState('');
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [language, setLanguage] = useState('');
  const [minRating, setMinRating] = useState('');

  const fetchData = async () => {
    try {
      const url = `http://127.0.0.1:8000/api/filter/movies/${city}?title=${title}&gen=${genre}&lang=${language}&min=${minRating}`;
      const response = await fetch(url);
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  };

  const debouncedFetchData = _.debounce(fetchData, 800);

  useEffect(() => {
    debouncedFetchData();
  }, [city, title, genre, language, minRating]);

  return (
    <div>
      
      <div className={styles.filters}>
        <div className={styles.dabba}>
          <input
            className={styles.box}
            type="text"
            placeholder="City"
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div className={styles.dabba}>
          <input
            className={styles.box}
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className={styles.dabba}>
          <input
            className={styles.box}
            type="text"
            placeholder="Genre"
            onChange={(e) => setGenre(e.target.value)}
          />
        </div>

        <div className={styles.dabba}>
          <input
            className={styles.box}
            type="text"
            placeholder="Language"
            onChange={(e) => setLanguage(e.target.value)}
          />
        </div>

        <div className={styles.dabba}>
          <input
            className={styles.box}
            type="text"
            placeholder="Min Rating"
            onChange={(e) => setMinRating(e.target.value)}
          />
        </div>
      </div>

      <div className="row" style={{ padding: '30px', paddingRight: '30px', paddingLeft: '30px' }}>
        {movies.map((movie) => (
          <Movie key={movie.id} data={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
