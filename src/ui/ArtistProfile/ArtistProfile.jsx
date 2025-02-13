import styles from './ArtistProfile.module.css';
import { Plus } from 'react-feather';
import { useState } from 'react';
import ReviewModal from '../ReviewModal/ReviewModal';
import AlbumList from './AlbumList';
import { Star } from 'react-feather';
import { useLocation, useParams } from 'react-router-dom';
import { getArtist, getSelectedItemData } from 'utils';


// bug: singles & compilations functionality is broken
// todo: support multiple artists by allowing user to toggle between them. Load both discographies / reviews / etc.
// ? lump 'albums' and 'compilations' together? (seems like a lot of compilations get categorized as albums anyways)
// stretch: add album sort buttons, object for sorting functions
// stretch: open in spotify
// stretch: suspense/placeholder UI
export default function ArtistProfile() {
    const location = useLocation();
    const itemId = location.state ? location.state.itemId : null;
    const { artistId } = useParams();
    const artist = artistId ? getArtist(artistId) : {};

    const [item, setItem] = useState(() => getSelectedItemData(artist, itemId));
    const [modalOpen, setModalOpen] = useState(false);

    const handleItem = (newItemId) => {
        const newItem = getSelectedItemData(newItemId);
        setItem({ ... newItem });
    };
    
    return (
        <div className={styles['artist-profile-container']}>
            <div className={styles["artist-data-container"]}>
                <h1 className={ styles['artist-name'] + 
                    ' clickable' 
                    + (item?.spotifyId === artist?.spotifyId ? ' text-primary' : '')}
                    onClick={() => { 
                        // setShowAlbums(false);
                        handleItem(artist?.spotifyId); 
                    }}
                >
                    {artist?.title}
                </h1>
                {artist &
                    <Albums 
                        artist={artist} 
                        handleItem={handleItem} 
                    />
                }
                
            </div>

            <div className={styles['motif-data-container']}>        
                <img className={styles['item-image']}
                    src={item?.imageUrl}
                ></img>

                <h1 className={styles['item-title']}>
                    {item?.title}
                </h1>
                
                <h2 className={styles['reviews-header']}>
                    Reviews
                </h2>

                {/* todo: average review score */}
                {/* todo: total reviews */}

                <Plus className={styles['add-review-button'] + ' clickable'} 
                    onClick={() => setModalOpen(true)}
                />

                { artist?.reviews?.[item?.spotifyId]?.map((review, ix) => (
                    <div className={styles['item-review']}
                        key={`profile-item-${item?.spotifyId}-review-${ix}`}
                    >
                        <div className={styles['review-stars-container']}>
                            { Array.from({length: review.rating}, () => (
                                <Star className={styles['review-star']} />
                            ))}
                            { Array.from({length: 5 - review.rating}, () => (
                                <Star className={styles['review-star-empty']} />
                            ))}
                        </div>

                        <h3 className={styles['review-username'] + ' clickable'}>
                            {review.displayName}
                        </h3>

                        { review.comment && 
                            <p className={styles['review-comment']}>
                                "{review.comment}"
                            </p>
                        }
                    
                    </div>
                ))}
            </div>
        
            {/* todo: check whether user already has a review saved for the item, set data prop accordingly */}
            { modalOpen &&
                <ReviewModal 
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    data={{
                        spotifyArtistId: item?.spotifyArtistId,
                        spotifyId: item?.spotifyId,
                        title: item?.title,
                    }}
                />
            } 
        </div>
    );
};


function Albums({ artist }) {
    const [showAlbums, setShowAlbums] = useState(null);
    const ALBUM_TYPES = ['albums', 'singles', 'compilations'];

    const handleClick = (albumType) => {
        setShowAlbums(showAlbums === albumType ? null : albumType);
    };

    return (
        <div className={styles['artist-albums']}>
            {ALBUM_TYPES.map((type) => (
                <div className={styles['album-type']} 
                    key={`album-types-${type}`}
                >
                    <h1 className={styles['album-type-header'] + ' clickable'}
                        onClick={handleClick}
                    >
                        {type} 
                        <span className={styles['album-type-count']}>
                            ({artist[type]?.length})
                        </span>
                    </h1>

                    <AlbumList 
                        albums={artist[type]}
                        albumIndex={albumIndex}
                        artistId={artist?.spotifyId}
                        expanded={showAlbums === type}
                        activeItemId={item?.spotifyId}
                    />
                </div>))}
        </div>
    )
}