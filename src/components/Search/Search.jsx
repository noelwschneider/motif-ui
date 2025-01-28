import styles from './Search.module.css';
import { useState } from 'react';
import { formatDuration } from '../../util';
import PopularityIcon from '../Icon/PopularityIcon';
import api from '../../api/_api';
import { useLocation } from 'react-router-dom';


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
    const [contentType, setContentType] = useState('albums');
    const [error, setError] = useState(null);
    

    // todo: load state
    // todo: search w/o requiring user submit
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
                type: 'album,artist,track', 
                limit: 50, 
                offset: 0 
            });
            setSearchResults(response?.data || {});
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className={styles['search-container']}>
            <form className={styles['searchbar']}
                onSubmit={handleSearch}
            >
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

            <fieldset>
                <legend>Select Content Type</legend>
                { ['albums', 'artists', 'tracks'].map((type, ix) => (
                    <div key={`content-${type}-${ix}`}>
                        <input id={`content-choice-${type}`}
                            className={styles['content-type-radio']}
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

            {searchResults[contentType].map((item) => (
                <div className={styles['search-item']}
                    key={item.id}
                >
                    <img className={styles['search-item-image'] + ' clickable'}
                        src={item?.images[0]?.url}
                        alt={`Image for ${item?.title}`}
                    />

                    <div className={styles['search-item-data']}>
                        <div className={styles['search-item-topline']}>
                            {item.popularity !== undefined &&
                                <PopularityIcon popularity={item.popularity} />
                            }

                            <h2 className={styles['search-item-title'] + ' clickable'}
                                onClick={() => handleSearchClick(contentType === 'artists' ? item.spotifyId : item.artists[0].spotifyId, item.spotifyId, )}
                            >
                                {item.title}
                            </h2>

                            {item.durationMs &&
                                <h3 className={styles['search-item-duration']}>
                                    {formatDuration(item.durationMs)}
                                </h3>
                            }

                            {item.albumType && item.albumType !== 'album' &&
                                <sup className={styles['search-item-album-type']}>
                                    {item.albumType}
                                </sup>
                            }
                        </div>

                        <div className={styles['search-item-details']}>
                            {item.artists?.length > 0 && 
                                <h3 className={styles['search-item-artists-list']}>
                                    <span className={styles['search-item-plaintext']}>{'by '}</span>
                                    {item.artists.map((artist, ix) => (<>
                                        <span className={styles['search-item-artist'] + ' clickable'}
                                            onClick={() => handleSearchClick(artist.spotifyId)}
                                        >
                                            {artist.title}
                                        </span>

                                        {ix+1 !== item.artists.length && 
                                            <span className={styles['search-item-plaintext']}>, </span>
                                        }                                        
                                        </>))}
                                    
                                </h3>
                            }

                            {item.album?.title &&
                                <h3 className={styles['search-item-album-title'] + ' clickable'}
                                    onClick={() => handleSearchClick(album.artists[0].spotifyId, album.spotifyId)}
                                >
                                    {'| ' + item.album.title}
                                </h3>
                            }

                            {item.releaseDate &&
                                <h4 className={styles['search-item-year']}>
                                    {item.releaseDate.slice(0,4)}
                                </h4>
                            }

                            {item.genres?.length > 0 && 
                                <h3 className={styles['search-item-genres']}>
                                    {item.genres.join(', ')}
                                </h3>
                            }
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
