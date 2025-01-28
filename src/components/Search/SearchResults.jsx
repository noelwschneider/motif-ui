import styles from './Search.module.css';
import { formatDuration } from '../../util';
import { Link } from 'react-router-dom';


export default function SearchResults({ results=[] }) {

    return (
        <div className={styles['search-results-container']}>
            <h1>Search Results</h1>
            <div className={styles['search-results']}>
                {results.map((result) => (
                    <div className={styles['search-item']}
                        key={result.id}
                    >
                        <img className={styles['album-image']}
                            src={result.album.images[1]?.url}  // medium size image
                            alt={`${result.album.name} cover`}
                        />

                        <div className={styles['item-details']}>
                            <h2>{result.name}</h2>
                            <span>{formatDuration(result.duration_ms)}</span>
                            <p>
                                {/* <Link to='/artist-profile'
                                    state={{
                                        activeItem: {
                                            type: "artist",
                                            spotifyId: result.id,
                                        },
                                        artist: {
                                            title: result.artists[0]?.name,
                                            spotifyId: result.artists[0]?.id
                                        },
                                    }}
                                >
                                    {result.artists[0]?.name}
                                </Link> */}
                                {result.artists[0]?.name}
                            </p>

                            <p>
                                <a
                                    href={result.album.external_urls.spotify}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {result.album.name}
                                </a>{" "}
                                ({new Date(result.album.release_date).getFullYear()})
                            </p>
                            <p>
                                <strong>Popularity:</strong> {result.popularity}/100
                            </p>
                            <p>
                                <strong>Duration:</strong> {formatDuration(result.duration_ms)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
