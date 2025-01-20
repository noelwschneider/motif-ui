import { useState } from 'react';
import api from '../../api/_api';
import SearchResults from './SearchResults';
import styles from './Search.module.css';


export default function Searchbar() {
    const [query, setQuery] = useState('');

    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query) {
            setError('Please enter a search query.');
            return;
        }
        setError(null);

        try {
            const response = await api.spotify.search({ query, type: 'track', limit: 20, offset: 0 });
            const data =  response.data;
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
            
            <div>
                {results.length > 0 ? (
                    <SearchResults results={results} />
                ) : (
                    <p>No results found.</p>
                )}
            </div>

            <div>
                { results.length ? <SearchResults results={results} /> : null }
            </div>
        </div>
    );
};
