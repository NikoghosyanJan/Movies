import { useEffect, useState } from "react";
import Genres from "../../components/Geners";
import { Loader } from "../../components/Loader";
import MoviesWrapper from "../../components/MoviesWrapper";
import { getData } from "../../helpers";
import { API_KEY } from "../../constants"
import "./style.scss"

export default function Home() {
    const [loader, setLoader] = useState(true)
    const [genres, setGenres] = useState(null);
    const [activeGenr, setActiveGenr] = useState("");
    const [moviesData, setMoviesData] = useState(null);
    const [movies, setMovies] = useState([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        getData(`genre/movie/list?api_key=${API_KEY}&language=en-US`)
            .then(res => {
                setGenres(res.genres);
                setActiveGenr(res.genres[0].id)
            })
    }, []);

    useEffect(() => {
        setLoader(true)
        setPage(1)
        if (activeGenr) {
            getData(`discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${activeGenr}&page=${1}`)
                .then(res => {
                    setMovies(res.results);
                    setMoviesData(res);
                    setLoader(false)
                })
        }
    }, [activeGenr])

    const loadMore = () => {
        setLoader(true)
        setPage(page + 1)
        getData(`discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${activeGenr}&page=${page + 1}`)
            .then(res => {
                setMovies([
                    ...movies,
                    ...res.results
                ])
                setMoviesData(res);
                setLoader(false)
            })
    }

    return (
        <section>
            {loader ? <Loader /> : ""}
            <div className="home-main">
                {genres ? <Genres
                    activeGenr={activeGenr}
                    setActiveGenr={setActiveGenr}
                    genres={genres}
                /> : ""}
                {movies.length ? <MoviesWrapper
                    movies={movies}
                    loadMore={loadMore}
                    total={moviesData.total_results}
                /> : ""}
            </div>
        </section>
    )
}