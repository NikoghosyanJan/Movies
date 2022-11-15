import { useState } from "react";
import { Link } from "react-router-dom";
import { IMG_BASE_URL } from "../constants";
import HeartSvgIcon from "../resourses/icons/HeartSvgIcon";
import Cookie from "js-cookie"

export default function MovieItem({ movie, addToWishList, isWished }) {
    const [ownIsWished, setOwnisWished] = useState(isWished)

    return (
        <div key={movie.id} className="movie-item">
            <Link to={`/movie-details/?id=${movie.id}`}>
                <div className="image-area">
                    <div
                        onClick={(e) => {
                            e.preventDefault();
                            if(Cookie.get("auth")){
                                setOwnisWished(!ownIsWished)
                            addToWishList(movie)
                            }else{
                                document.querySelector(".to-wish-list").click()
                            }
                        }}
                        className={`heart ${ownIsWished ? "active" : ""}`}>
                        <HeartSvgIcon />
                    </div>
                    <img src={IMG_BASE_URL + movie.backdrop_path} alt={movie.name} />
                    <img className="poster" src={IMG_BASE_URL + movie.poster_path} alt={movie.name} />
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
    )
}