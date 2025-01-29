import styles from './ArtistProfile.module.css';
import { PlusCircle } from 'react-feather';
import { useEffect, useState } from 'react';


// todo: support multiple artists by allowing user to toggle between them. Load both discographies / reviews / etc.

// todo: 
    // add action buttons
    // improve UI
    // stretch: add album sort buttons, object for sorting functions
    // stretch: add alternate track view
    // stretch: open in spotify
    // stretch: suspense/placeholder UI
export default function ArtistProfile({ itemId, setItemId, artistProfile }) {
    const [expandedAlbumIndex, setExpandedAlbumIndex] = useState(null);

    const handleItemClick = (selectedItemId, albumIndex) => {
        if (selectedItemId === itemId) return;
        if (selectedItemId === artistProfile.spotifyId) setExpandedAlbumIndex(null);
        setItemId(selectedItemId);
    };
    

    return (
        <div className={styles['artist-profile']}>
            { artistProfile && 
                <>
                    <div className={styles["artist-data-container"]}>
                        <h1 className={ styles['artist-name'] +
                                (itemId === artistProfile.spotifyId ? ' ' + styles['active'] : '')
                            }
                            onClick={() => handleItemClick(artistProfile?.spotifyId)}
                        >
                            {artistProfile?.title}
                        </h1>

                        {artistProfile?.albums &&
                            <div className={styles['album-list']}>
                                {artistProfile?.albums?.sort(
                                    (a, b) => a.releaseDate > b.releaseDate ? -1 : 1
                                )?.map((album, albumIndex) => (
                                    <div className={styles['album-container']}
                                        key={albumIndex}
                                    >
                                        <div className={styles['album-row']}
                                            onClick={() => {
                                                handleItemClick(album.spotifyId, albumIndex);
                                                setExpandedAlbumIndex(albumIndex);  
                                            }}
                                        >
                                            <img src={album.images[0]?.url} height='64' width='64'></img>
                                            <h2 className={ styles['album-title'] + (
                                                itemId === album.spotifyId ? 
                                                    ' ' + styles['active']
                                                    : ''
                                            )}>
                                                {album.title}
                                            </h2>
                                            <p className={styles['album-year']}>{album.releaseDate.slice(0,4)}</p>
                                        </div>

                                        {expandedAlbumIndex === albumIndex && (
                                            <div className={styles['track-list']}>
                                                {album.tracks.sort(
                                                    (a,b) => a.trackNumber - b.trackNumber
                                                ).map((track, trackIndex) => (
                                                    <div className={styles['track-row']}
                                                        key={trackIndex}
                                                        onClick={() => handleItemClick(track.spotifyId, albumIndex)}
                                                    >
                                                        <span className={styles['track-order']}>
                                                            {track.trackNumber}
                                                        </span>
                                                        <span className={styles['track-title'] + (         
                                                            itemId === track.spotifyId ? 
                                                                ' ' + styles['active']
                                                                : ''
                                                        )}>
                                                            {track.title}
                                                        </span>
                                                        <span className={styles['track-duration']}>
                                                            {`${Math.floor(track.durationMs / 60000)}:${Math.floor(track.durationMs % 60000 / 1000)}`}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        }
                    </div>

                    <div className={styles['motif-data-container']}>
                        { artistProfile?.reviews?.[itemId]?.map((review, i) => (
                            <div key={i}>
                                <div className="review-id">{review.reviewId}</div>
                                <div className="spotify-id">{review.spotifyId}</div>
                                <div className="user-id">{review.userId}</div>
                                <div className="comment">{review.comment}</div>
                                <div className="rating">{review.rating}</div>
                                <div className="created-date">{review.createdDate}</div>
                                <div className="upvotes">{review.upvotes}</div>
                            </div>
                        ))}

                        { !artistProfile?.reviews?.[itemId] &&
                            <div>
                                No reviews for this content!
                            </div>
                        }
                    </div>
                </> 
            }
        </div>
    );
};