import { useState } from 'react';
import api from '../../api/_api';
import SearchResults from './SearchResults';
import styles from './Search.module.css';


// todo: checkbox for artist/album/song
export default function Searchbar() {
    const [query, setQuery] = useState('');
    const [searchType, setSearchType] = useState({
        artist: false,
        album: false,
        track: true,
    });
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);

    const getSearchType = () => {
        let str = '';
        if (searchType.artist) str += 'artist,';
        if (searchType.album) str += 'album,';
        if (searchType.track) str += 'track,';
        return str;
    };

    // todo: load state
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query) {
            setError('Please enter a search query.');
            return;
        }
        setError(null);

        try {
            const response = await api.spotify.search({ 
                query, 
                type: getSearchType(), 
                limit: 20, 
                offset: 0 
            });
            const data = response.data;
            // todo: refactor for artist/albums too
            setResults(data.tracks?.items || []);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input className={styles["searchbar-input"]}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for music..."
                />
                <button className={styles["searchbar-btn"]} 
                    type="submit"
                >
                    Search
                </button>
            </form>
            
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            {/* <div>
                {results.length > 0 ? (
                    <SearchResults results={results} />
                ) : (
                    <p>No results found.</p>
                )}
            </div> */}
        </div>
    );
};
