import styles from './Search.module.css';


export default function SearchResults({ results }) {
    const formatDuration = (ms) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

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
                            <p>
                                <strong>Artist:</strong>{" "}
                                <a
                                    href={result.artists[0]?.external_urls.spotify}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {result.artists[0]?.name}
                                </a>
                            </p>
                            <p>
                                <strong>Album:</strong>{" "}
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
