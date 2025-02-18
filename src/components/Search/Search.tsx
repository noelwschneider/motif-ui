import styles from './Search.module.css';
import { useState } from 'react';
import { useGlobalSearch } from 'hooks';


// todo: get album popularity score into the return
// todo: pagination
export default function Search({ handleSearchClick }) {
    const [contentType, setContentType] = useState<'artists' | 'albums' | 'tracks'>('artists');
    const { searchResults } = useGlobalSearch();

    console.log('searchResults;', searchResults);
    return (
        <div className={styles['search-container']}>
            <fieldset className={styles['content-type-radio-group']}>
                { (['artists', 'albums', 'tracks'] as const).map((type, ix) => (
                    <div key={`content-radio-${type}-${ix}`}>
                        <input id={`content-choice-${type}`}
                            className={styles['content-type-radio-btn']}
                            type="radio"
                            name="contentType"
                            value={type}
                            checked={contentType === type}
                            onChange={(e) => setContentType(e.target.value as 'artists' | 'albums' | 'tracks')}
                        />

                        <label htmlFor={`content-choice-${type}`}>
                            {type}
                        </label>
                    </div>
                ))}
            </fieldset>
                    
            {searchResults[contentType].map((item) => (
                <div className={styles['search-item']}
                    key={`search-result-item-${item?.spotifyId}`}
                >
                    <img className={styles['search-item-image'] + ' clickable'}
                        src={item?.images[2]?.url ?? ''}
                        alt={`Image for ${item?.title}`}
                        onClick={() => handleSearchClick(contentType === 'artists' ? item.spotifyId : item?.artists[0]?.spotifyId, item.spotifyId) }
                    />

                    <div className={styles['search-item-text']}>
                        <h2 className={styles['search-item-title'] + ' clickable'}
                            onClick={() => handleSearchClick(contentType === 'artists' ? item.spotifyId : item?.artists[0]?.spotifyId, item.spotifyId)}
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
                                        {ix + 1 !== item.artists.length && 
                                            <span className={styles['search-item-plaintext']}>, </span>
                                        }   
                                    </span>
                                ))}
                            </h3>
                        } 
                    </div>
                </div>
            ))}    
        </div>
    );
};
