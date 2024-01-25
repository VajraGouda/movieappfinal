import styles from './styles.module.css'


const MovieDetail = (props) => {
    const { title, director, genre, description, image, trailer, language, rating, movie_length} = props.data;
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4 text-center">
                    <div className={styles.wrapper}>
                        <img src={image} alt="" className="img-fluid" />
                    </div>
                </div>
                <div className="col-md-8">
                    <div className={styles.wrapper}>
                        <h1 className={styles.h1}>{title}</h1>
                        <h2 className={styles.author}>{director}</h2>
                        <h2 className={styles.author}>{genre}</h2>
                        <h2 className={styles.author}>{language}</h2>
                        <h2 className={styles.author}>{rating}</h2>
                        <h2 className={styles.author}>{movie_length}</h2>
                        <p>{description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default MovieDetail;