import styles from './GlobalSearchResults.module.css';
import { useState } from 'react';
import { useArtist, useGlobalSearch } from 'hooks';


// todo: get album popularity score into the return
// todo: pagination
export default function GlobalSearchResults() {
    const [contentType, setContentType] = useState<'artists' | 'albums' | 'tracks'>('artists');
    const { searchResults } = useGlobalSearch();
    const { setContentId, setArtistId } = useArtist();

    // todo: accept tracks w/ multiple artists
    const handleClick = async (selectedArtistId: string, selectedItemId?: string) => {
        setContentId(selectedItemId);
        setArtistId(selectedArtistId);
    };

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
                        onClick={() => contentType === 'artists' ? handleClick(item?.spotifyId, item?.spotifyId) : handleClick(item?.artists[0].spotifyId, item?.spotifyId)}
                    />

                    <div className={styles['search-item-text']}>
                        <h2 className={styles['search-item-title'] + ' clickable'}
                            onClick={() => contentType === 'artists' ? handleClick(item?.spotifyId, item?.spotifyId) : handleClick(item?.artists[0].spotifyId, item?.spotifyId)}
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
                                        onClick={() => handleClick(item?.artists[ix].spotifyId, item?.artists[ix].spotifyId)}
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
