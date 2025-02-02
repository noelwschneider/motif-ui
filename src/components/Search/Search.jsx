import styles from './Search.module.css';
import { useEffect, useState } from 'react';
import api from '../../api/_api';
import { useLocation } from 'react-router-dom';


// todo: proper load state
// todo: get album popularity score into the return
// todo: pagination
export default function Search({ handleSearchClick }) {
    const location = useLocation();
    const querySearchParam = new URLSearchParams(location.search).get('q');

    const [query, setQuery] = useState(querySearchParam || '');
    const [searchResults, setSearchResults] = useState({
        metadata: {},
        artists: [],
        albums: [],
        tracks: [],
    });
    const [contentType, setContentType] = useState('artists');
    const [loading, setLoading] = useState(false);
    
    const handleSearch = async () => {
        if (!query.trim()) {
            setLoading(false);
            setSearchResults({
                metadata: {},
                artists: [],
                albums: [],
                tracks: [],
            });
            return;
        };

        setLoading(true);
        try {
            const response = await api.spotify.search({ 
                query, 
                type: 'album,artist,track', 
                limit: 10, 
                offset: 0 
            });
            setSearchResults({ ...response?.data });
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const delay = 500; // ms
        const handler = setTimeout(() => {
            handleSearch();
        }, delay);

        return () => clearTimeout(handler);
    }, [query]);

    return (
        <div className={styles['search-container']}>
            <input className={styles["searchbar-input"]}
                type="text"
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setLoading(true);
                }}
                placeholder="Search for music..."
            />

            <fieldset className={styles['content-type-radio-group']}>
                <legend className={styles['content-type-radio-legend']}>
                    Select Content Type
                </legend>

                { ['artists', 'albums', 'tracks'].map((type, ix) => (
                    <div key={`content-radio-${type}-${ix}`}>
                        <input id={`content-choice-${type}`}
                            className={styles['content-type-radio-btn']}
                            type="radio"
                            name="contentType"
                            value={type}
                            checked={contentType === type}
                            onChange={(e) => setContentType(e.target.value)}
                        />

                        <label htmlFor={`content-choice-${type}`}>
                            {type}
                        </label>
                    </div>
                ))}
            </fieldset>
            
            { !loading && searchResults[contentType].length === 0 &&
                <h1>Search results will display here</h1>
            }
    
            { loading ? Array.from({length: 10}, () => (
                <div className={styles['skeleton-item']}>
                    <div className={styles['skeleton-img']}></div>
                    <div className={styles['skeleton-text']}></div>
                </div>
            ))
        
            : searchResults[contentType].map((item) => (
                <div className={styles['search-item']}
                    key={`search-result-item-${item.spotifyId}`}
                >
                    <img className={styles['search-item-image'] + ' clickable'}
                        src={item?.images[2]?.url}
                        alt={`Image for ${item?.title}`}
                        onClick={() => handleSearchClick(contentType === 'artists' ? item.spotifyId : item.artists[0].spotifyId, item.spotifyId) }
                    />

                    <div className={styles['search-item-text']}>
                        <h2 className={styles['search-item-title'] + ' clickable'}
                            onClick={() => handleSearchClick(contentType === 'artists' ? item.spotifyId : item.artists[0].spotifyId, item.spotifyId)}
                        >
                            {item.title}
                        </h2>

                        { item.artists?.length > 0 && 
                            <h3 className={styles['search-item-artists-list']}>
                                <span className={styles['search-item-plaintext']}>
                                    {'by '}
                                </span>
                                
                                {item.artists.map((artist, ix) => (
                                    <span className={styles['search-item-artist'] + ' clickable'}
                                        onClick={() => handleSearchClick(artist.spotifyId)}
                                        key={`artist-title-${artist.spotifyId}-${ix}`}
                                    >
                                        {artist.title}
                                        {ix+1 !== item.artists.length && 
                                            <span className={styles['search-item-plaintext']}>, </span>
                                        }   
                                    </span>
                                ))}
                            </h3>
                        } 
                    </div>
                </div>
            ))
            }
        </div>
    );
};
