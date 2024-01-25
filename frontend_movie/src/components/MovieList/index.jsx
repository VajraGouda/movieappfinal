import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Movie from './Movie';


const MovieList = () => {

    const [movies, setMovies] = useState([]);

    const getData = () => {
        axios
            .get('http://127.0.0.1:8000/api/addmovie/')
            .then((response) => {
                console.log(response.data)
                setMovies(response.data)
            })
            .catch((error) => {
                console.log(error)
            })

    };

    useEffect(() => {
        getData();
    }, [])

    return (
      
            <div className="row" style={{ padding: '30px', paddingRight: '30px', paddingLeft: '30px' }}>

                {movies.map((movie) => (
                    <Movie key={movie.id} data={movie} />
                ))}
            </div>
       


    )
}

export default MovieList;