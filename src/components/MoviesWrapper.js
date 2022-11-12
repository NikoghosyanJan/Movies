import React from "react";
import { Link } from "react-router-dom";
import { IMG_BASE_URL } from "../constants"

function MoviesWrapper({ movies, loadMore, total }) {
    
    return (
        <div className="wrapper">
            <div className="container">
                {movies.map(movie => (
                    <div key={movie.id} className="movie-item">
                        <Link to={`/movie-details/?id=${movie.id}`}>
                            <div className="image-area">
                                <img src={IMG_BASE_URL + movie.backdrop_path} alt={movie.name} />
                                <img className="poster" src={IMG_BASE_URL + movie.poster_path} alt={movie.name}/>
                            </div>
                            <div className="description">
                                <p className="title">{movie.title}</p>
                                <div className="d-flex">
                                    <span>★ {movie.vote_average}</span>
                                    <span></span>
                                </div>
                                <div className="d-flex">
                                    <span>First release: </span>
                                    <span>{movie.release_date}</span>
                                </div>
                                <p className="overview">
                                    {movie.overview}
                                </p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            <div className="showed">
                <button
                    onClick={loadMore}
                >Load more</button>
                <p>Showed {movies.length} of {total}</p>
            </div>
        </div>
    )
}

export default React.memo(MoviesWrapper)