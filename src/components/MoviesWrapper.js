import React from "react";
import MovieItem from "./MovieItem";

export default function MoviesWrapper({ movies, loadMore, total }) {
    const wishList = JSON.parse(localStorage.getItem("wishList")) || [];

    const addToWishList = (movie) => {
    const wishList = JSON.parse(localStorage.getItem("wishList")) || [];

        if (wishList.length) {
            if (!wishList.some(item => item.id === movie.id)) {
                wishList.push(movie);
                localStorage.setItem("wishList", JSON.stringify(wishList))
            } else {
                const index = wishList.findIndex(item => item.id === movie.id);
                wishList.splice(index, 1);
                localStorage.setItem("wishList", JSON.stringify(wishList))
            }
        } else {
            localStorage.setItem("wishList", JSON.stringify([...JSON.parse(localStorage.getItem('wishList') )|| [], movie]))
        }
    }

    return (
        <div className="wrapper">
            <div className="container">
                {movies.map(movie => (
                    <MovieItem
                        key={movie.id}
                        isWished={wishList.some(item => item.id === movie.id)}
                        addToWishList={addToWishList}
                        movie={movie}
                    />
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