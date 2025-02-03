import styles from './ArtistProfile.module.css';
import { Plus } from 'react-feather';
import { useState } from 'react';
import ReviewModal from '../ReviewModal/ReviewModal';
import AlbumList from './AlbumList';
import { Star } from 'react-feather';


// todo: support multiple artists by allowing user to toggle between them. Load both discographies / reviews / etc.
// stretch: add album sort buttons, object for sorting functions
// stretch: add alternate track view
// stretch: open in spotify
// stretch: suspense/placeholder UI
export default function ArtistProfile({ 
    albumIndex,
    artistProfile,
    handleClick,
    item,
}) {
    const [modalOpen, setModalOpen] = useState(false);
    const [showAlbums, setShowAlbums] = useState();
    
    return (
        <div className={styles['artist-profile-container']}>
            {item && <>
                <div className={styles["artist-data-container"]}>
                    <h1 className={ styles['artist-name'] + 
                        ' clickable' 
                        + (item?.spotifyId === artistProfile?.spotifyId ? ' text-primary' : '')}
                        onClick={() => { 
                            setShowAlbums(false);
                            handleClick(artistProfile?.spotifyId); 
                        }}
                    >
                        {artistProfile?.title}
                    </h1>

                    {['albums', 'singles', 'compilations'].map((albumType) => (<>
                        <h1 className={styles['album-type-header'] + ' clickable'}
                            onClick={() => {setShowAlbums(showAlbums === albumType ? null : albumType)}}
                        >
                            {albumType} 
                            <span className={styles['album-type-count']}>
                                ({artistProfile[albumType].length})
                            </span>
                        </h1>

                        { showAlbums === albumType &&
                            <AlbumList 
                                albums={artistProfile[albumType]}
                                albumIndex={albumIndex}
                                artistId={artistProfile.spotifyId}
                                handleClick={handleClick}
                                activeItemId={item.spotifyId}
                            />
                        }
                    </>))}
                </div>

                <div className={styles['motif-data-container']}>        
                    <img className={styles['item-image']}
                        src={item.imageUrl}
                    ></img>

                    <h1 className={styles['item-title']}>
                        {item.title}
                    </h1>
                    
                    <h2 className={styles['reviews-header']}>
                        Reviews
                    </h2>

                    {/* todo: average review score */}
                    {/* todo: total reviews */}

                    <Plus className={styles['add-review-button'] + ' clickable'} 
                        onClick={() => setModalOpen(true)}
                    />

                    { artistProfile?.reviews?.[item.spotifyId]?.map((review, ix) => (
                        <div className={styles['item-review']}
                            key={`profile-item-${item.spotifyId}-review-${ix}`}
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
                            spotifyArtistId: item.spotifyArtistId,
                            spotifyId: item.spotifyId,
                            title: item.title,
                        }}
                        onSubmit={() => handleClick(item.spotifyArtistId, item.spotifyId, albumIndex)}
                    />
                } 
            </>}
        </div>
    );
};
