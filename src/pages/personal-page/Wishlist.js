import MovieItem from "../../components/MovieItem";
import "../home/style.scss"

export default function Wishlist() {
    const wishList = JSON.parse(localStorage.getItem("wishList")) || [];

    const addToWishList = (movie) => {
        const wishList = JSON.parse(localStorage.getItem("wishList")) || [];

        if (wishList.length) {
            if (!wishList.some(item => item.id === movie.id)) {
                wishList.push(movie);
                console.log('mtav');
                localStorage.setItem("wishList", JSON.stringify(wishList))
            } else {
                const index = wishList.findIndex(item => item.id === movie.id);
                 wishList.splice(index, 1);
                localStorage.setItem("wishList", JSON.stringify(wishList));
            }
        } else {
            console.log('mtanq ste');
            localStorage.setItem("wishList", JSON.stringify([movie]))
        }
    }

    return (
        <div className="container">
            {wishList && wishList.map(movie =>
                <MovieItem
                    isWished={JSON.parse(localStorage.getItem('wishList')).some(item => item.id === movie.id)}
                    addToWishList={addToWishList}
                    movie={movie}
                />
            )}
        </div>
    )
}