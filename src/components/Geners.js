
export default function Genres({ genres, activeGenr, setActiveGenr }) {

    return (
        <nav className="geners">
            <ul>
                {genres?.map(genre => (
                    <li
                        className={activeGenr === genre.id ? "active" : ""}
                        key={genre.id}
                        onClick={() => { 
                            window.scrollTo(0, 0)
                            setActiveGenr(genre.id)
                             }}
                    >
                        {genre.name}
                    </li>
                ))}
            </ul>
        </nav>
    )
}