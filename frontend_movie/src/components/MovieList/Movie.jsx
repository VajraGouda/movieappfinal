import tomato from './tomato.png';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

const Movie = (props) => {
    const { id, title, image, rating, movie_length } = props.data;
    return (
        <div className="col-md-3">
            <div className={`card ${styles.box}`}>
                <div className={styles.wrapper}>
                    <img src={image} className="card-img-top" alt="Movie Poster" style={{ maxWidth: '100%', height: 'auto' }} />
                </div>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <h5 className="card-title">
                        <img src={tomato} alt="tomato" style={{ maxWidth: '8%', height: 'auto' }} />
                        {rating}/10
                    </h5>
                    <h5 className="card-title">Runtime: {movie_length} minutes</h5>
                    <Link to={`/movie/${id}`} className="btn btn-primary btn-block" style={{background: "#E4D00A", border: "none", fontWeight:"bold"}} >
                        Show Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Movie;
