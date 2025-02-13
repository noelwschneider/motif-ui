import styles from './Search.module.css';
import { Link } from 'react-router-dom';


export default function SearchItem({ item }) {
    const handleClick = () => {};

    console.log('searchItem:', item);
    return (
        <div className={styles['search-item']}
            key={`search-result-item-${item.spotifyId}`}
        >
            <img className={styles['search-item-image'] + ' clickable'}
                src={item?.images[2]?.url ?? ''}
                alt={`Image for ${item?.title}`}
                onClick={() => handleClick() }
            />

            <div className={styles['search-item-text']}>
                <h2 className={styles['search-item-title'] + ' clickable'}>
                    <Link to={`/artists/${item.artists[0].spotifyId}`}
                        state={{ itemId: item.spotifyId }}
                    >
                        {item.title}
                    </Link>
                </h2>

                { item.artists?.length > 0 && 
                    <h3 className={styles['search-item-artists-list']}>
                        <span className={styles['search-item-plaintext']}>
                            {'by '}
                        </span>
                        
                        {item.artists.map((artist, ix) => (
                            <span className={styles['search-item-artist'] + ' clickable'}
                                key={`artist-title-${artist.spotifyId}-${ix}`}
                            >
                                <Link to={`artist/${artist.spotifyId}`}>
                                    {artist.title}
                                </Link>
                                
                                {ix + 1 !== item.artists.length && 
                                    <span className={styles['search-item-plaintext']}>, </span>
                                }   
                            </span>
                        ))}
                    </h3>
                } 
            </div>
        </div>
    );
}