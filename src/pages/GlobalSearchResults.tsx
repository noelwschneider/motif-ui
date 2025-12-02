import { useState } from 'react';
import { useArtist, useGlobalSearch } from '../utils/hooks';

// todo: simplify by just searching for artists right now, loop in track/album lookup after I've got MVP

// todo: get album popularity score into the return
// todo: pagination
// todo: display a few options in list below searchbar, only navigate to this page if user clicks "see more results" option
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
        <div className='search-container'>
            <fieldset className='content-type-radio-group'>
                { (['artists', 'albums', 'tracks'] as const).map((type, ix) => (
                    <div key={`content-radio-${type}-${ix}`}>
                        <input id={`content-choice-${type}`}
                            className='content-type-radio-btn'
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
                <div className='search-item'
                    key={`search-result-item-${item?.spotifyId}`}
                >
                    <img className='search-item-image clickable'
                        src={item?.images[2]?.url ?? ''}
                        alt={`Image for ${item?.title}`}
                        onClick={() => contentType === 'artists' ? handleClick(item?.spotifyId, item?.spotifyId) : handleClick(item?.artists[0].spotifyId, item?.spotifyId)}
                    />

                    <div className='search-item-text'>
                        <h2 className='search-item-title clickable'
                            onClick={() => contentType === 'artists' ? handleClick(item?.spotifyId, item?.spotifyId) : handleClick(item?.artists[0].spotifyId, item?.spotifyId)}
                        >
                            {item.title}
                        </h2>

                        { item.artists?.length > 0 && 
                            <h3 className='search-item-artists-list'>
                                <span className='search-item-plaintext'>
                                    {'by '}
                                </span>
                                
                                {item.artists.map((artist, ix) => (
                                    <span className='search-item-artist clickable'
                                        onClick={() => handleClick(item?.artists[ix].spotifyId, item?.artists[ix].spotifyId)}
                                        key={`artist-title-${artist.spotifyId}-${ix}`}
                                    >
                                        {artist.title}
                                        {ix + 1 !== item.artists.length && 
                                            <span className='search-item-plaintext'>, </span>
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
