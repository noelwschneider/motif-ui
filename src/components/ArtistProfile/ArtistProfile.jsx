import styles from './ArtistProfile.module.css';
import { Plus } from 'react-feather';
import { useState } from 'react';
import ReviewModal from '../ReviewModal/ReviewModal';
import AlbumList from './AlbumList';


// todo: support multiple artists by allowing user to toggle between them. Load both discographies / reviews / etc.

// todo: 
    // add action buttons
    // improve UI
    // stretch: add album sort buttons, object for sorting functions
    // stretch: add alternate track view
    // stretch: open in spotify
    // stretch: suspense/placeholder UI
export default function ArtistProfile({ 
    albumIndex,
    item,
    artistProfile,
    handleClick 
}) {
    const [modalOpen, setModalOpen] = useState(false);
    const [showAlbums, setShowAlbums] = useState('albums');
    
    return (
        <div className={styles['artist-profile-container']}>
            <div className={styles["artist-data-container"]}>
                <h1 className={ styles['artist-name'] + 
                    ' clickable' 
                    + (item?.spotifyId === artistProfile?.spotifyId ? ' text-primary' : '')}
                    onClick={() => { handleClick(artistProfile?.spotifyId) }}
                >
                    {artistProfile?.title}
                </h1>

                {['albums', 'singles', 'compilations'].map((albumType) => (<>
                    <h1 className={styles['album-type-header'] + ' clickable'}
                        onClick={() => {setShowAlbums(showAlbums === albumType ? null : albumType)}}
                    >
                        {albumType}
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
                <h1 className={styles['item-title']}>{item.title}</h1>

                { item.releaseYear && 
                    <span className={styles['item-year']}>{item.releaseYear}</span>
                }

                { item.duration && 
                    <span className={styles['item-duration']}>{item.duration}
                    </span>
                }
                
                { item.explicit && 
                    <span className={styles['item-explicit']}>explicit</span>
                }
                
                
                <Plus className={styles['add-review-button'] + ' clickable'} 
                    onClick={() => setModalOpen(true)}
                />
                <h2>Reviews</h2>

                { artistProfile?.reviews?.[item.spotifyId]?.map((review, ix) => (
                    <div key={`profile-item-${item.spotifyId}-review-${ix}`}>
                        <div className="review-id">{review.reviewId}</div>
                        <div className="spotify-id">{review.spotifyId}</div>
                        <div className="user-id">{review.userId}</div>
                        <div className="comment">{review.comment}</div>
                        <div className="rating">{review.rating}</div>
                        <div className="created-date">{review.createdDate}</div>
                        <div className="upvotes">{review.upvotes}</div>
                        <div>TODO: get username</div>
                    </div>
                ))}
            </div>
            
            <ReviewModal 
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                initialData={null}
            />
        </div>
    );
};