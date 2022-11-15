import { useEffect, useState } from "react"
import { Loader } from "../../components/Loader";
import { getData } from "../../helpers";
import { API_KEY, IMG_BASE_URL } from "../../constants";
import "./style.scss";

export default function MovieDetails() {
    const queryParams = new URLSearchParams(window.location.search)
    const id = queryParams.get("id");
    const [loader, setLoader] = useState(true);
    const [details, setDetails] = useState(null);


    useEffect(() => {
        id && getData(`movie/${id}?api_key=${API_KEY}&language=en-US`)
            .then(res => {
                setDetails(res);
                setLoader(false)
            })
    }, [id]);


    return (
        <>
            {loader ? <Loader /> : ""}
            {details && <section className="movie-details">
                <div className="image-area">
                    <img src={IMG_BASE_URL + details.poster_path} alt={details.name} />
                </div>
                <div className="description-area">
                    <h1>{details.title}</h1>
                    <p className="overvew">{details.tagline}</p>
                    <p className="overvew">{details.overview}</p>
                    <a href={details.homepage} target="_blank" className="play-triller">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            viewBox="0 0 64 64"
                            xmlSpace="preserve"
                        >
                            <path d="M46.014 31.105L25.197 20.697a1.003 1.003 0 00-1.447.895v20.816a1 1 0 001.447.895l20.817-10.408a1 1 0 000-1.79zM25.75 40.79V23.21L43.33 32l-17.58 8.79z" />
                            <path d="M32 0C14.327 0 0 14.327 0 32s14.327 32 32 32 32-14.327 32-32S49.673 0 32 0zm0 62C15.458 62 2 48.542 2 32S15.458 2 32 2s30 13.458 30 30-13.458 30-30 30z" />
                        </svg>
                        <span>Play triller</span>
                    </a>
                    <div className="d-flex">
                        <span>Genres:</span>
                        <div className="d-flex">
                            {details.genres.map((gen, i) => <span key={gen.id}>
                                {gen.name}
                                {details.genres[i+1] ? "," : ""}
                            </span>)}
                        </div>
                    </div>
                    <div className="d-flex">
                        <span>languages:</span>
                        <div className="d-flex">
                            {details.spoken_languages.map((ln, i) => <span key={ln.id}>
                                {ln.name}
                                {details.spoken_languages[i+1] ? "," : ""}
                            </span>)}
                        </div>
                    </div>
                </div>
            </section>}
        </>
    )
}