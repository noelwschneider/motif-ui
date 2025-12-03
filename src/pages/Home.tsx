import { useEffect, useRef, useState } from "react";
import api from "../app/api";
import { Link, useSearchParams } from "react-router-dom";


const DEBOUNCE_MS = 500;

const EMPTY_SEARCH_ARGS = {
    query: "",
    type: "album,artist,track",
    limit: 20,
    offset: 0,
    market: "US",
    album: "",
    artist: "",
    track: "",
    genre: "",
};


export default function Home() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState(searchParams.get("q") || "");
    const [searchResults, setSearchResults] = useState([]);

    // only use latest if multiple requests are sent
    const lastRequestId = useRef(0);

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        if (!query.trim()) {
            setSearchResults([]);
            setLoading(false);
            params.delete("q");
            setSearchParams(params, { replace: true });
            return;
        } else {
            params.set("q", query);
            setSearchParams(params, { replace: true });
        };

        const timeoutId = setTimeout(() => {
            const currentRequestId = ++lastRequestId.current;

            const doSearch = async () => {
                setLoading(true);
                try {
                    const data = await api.spotify.search({
                        ...EMPTY_SEARCH_ARGS,
                        query: query.trim(),
                        type: "artist",
                    });
                    if (currentRequestId !== lastRequestId.current) return;
                    setSearchResults(data?.artists ?? []);
                } catch (err) {
                    console.error(err);
                } finally {
                    if (currentRequestId === lastRequestId.current) {
                        setLoading(false);
                    };
                };
            };
            doSearch();
        }, DEBOUNCE_MS);

        return () => clearTimeout(timeoutId);
    }, [query]);

    return (
        <div className="home-container">
            <input
                className="artist-searchbar"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for your favorite artists"
            />

            {loading && <p>Loading…</p>}

            <ul>
                {searchResults.map((artist, ix) => (
                    <li key={`${artist.spotifyId}-${ix}`}
                        className="clickable"
                    >
                        <Link to={`/artist/${artist.spotifyId}`}
                            state={ artist }
                        >
                            <img className='item-image' src={artist.images[1].url}></img>
                            <h2>{artist.title}</h2>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
