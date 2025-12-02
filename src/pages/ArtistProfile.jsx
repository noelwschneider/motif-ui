import { Plus } from 'react-feather';
import { useState } from 'react';
import ReviewModal from '../components/ReviewModal';
import { Star } from 'react-feather';


// bug: singles & compilations functionality is broken
// todo: support multiple artists by allowing user to toggle between them. Load both discographies / reviews / etc.
// ? lump 'albums' and 'compilations' together? (seems like a lot of compilations get categorized as albums anyways)
// stretch: add album sort buttons, object for sorting functions
// stretch: add alternate track view
// stretch: open in spotify
// stretch: suspense/placeholder UI
export default function ArtistProfile() {
    const [modalOpen, setModalOpen] = useState(false);
    const [showAlbums, setShowAlbums] = useState();
    
    return (
        <div className='artist-profile-container'>
            {item && <>
                <div className="artist-data-container">
                    <h1 className={'artist-name clickable ' 
                        + (item?.spotifyId === artistProfile?.spotifyId ? ' text-primary' : '')}
                        onClick={() => { 
                            setShowAlbums(false);
                            handleClick(artistProfile?.spotifyId); 
                        }}
                    >
                        {artistProfile?.title}
                    </h1>

                    {['albums', 'singles', 'compilations'].map((albumType) => (<>
                        <h1 className='album-type-header clickable'
                            onClick={() => {setShowAlbums(showAlbums === albumType ? null : albumType)}}
                        >
                            {albumType} 
                            <span className='album-type-count'>
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

                <div className='motif-data-container'>        
                    <img className='item-image'
                        src={item.imageUrl}
                    ></img>

                    <h1 className='item-title'>
                        {item.title}
                    </h1>
                    
                    <h2 className='reviews-header'>
                        Reviews
                    </h2>

                    {/* todo: average review score */}
                    {/* todo: total reviews */}

                    <Plus className='add-review-button clickable'
                        onClick={() => setModalOpen(true)}
                    />

                    { artistProfile?.reviews?.[item.spotifyId]?.map((review, ix) => (
                        <div className='item-review'
                            key={`profile-item-${item.spotifyId}-review-${ix}`}
                        >
                            <div className='review-stars-container'>
                                { Array.from({length: review.rating}, () => (
                                    <Star className={styles['review-star']} />
                                ))}
                                { Array.from({length: 5 - review.rating}, () => (
                                    <Star className={styles['review-star-empty']} />
                                ))}
                            </div>

                            <h3 className='review-username clickable'>
                                {review.displayName}
                            </h3>

                            { review.comment && 
                                <p className='review-comment'>
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


function AlbumList({
    activeItemId,
    albumIndex,
    albums=[],
    artistId,
    handleClick,
}) {
    return (
        <div className='album-list'>
            {albums.sort(
                (a, b) => a.releaseDate > b.releaseDate ? -1 : 1
            )?.map((album, ix) => (
                <div className='album-container'
                    key={`artist-album-list-${ix}`}
                >
                    <div className='album-row'>
                        <img className='album-image clickable'
                            src={album.images[2]?.url}
                            onClick={() => (albumIndex === ix ?
                                handleClick(artistId)
                                : handleClick(artistId, album.spotifyId, ix)
                           )}
                        ></img>

                        <div className='album-text'>
                            <h2 className={'album-title clickable' + (activeItemId === album.spotifyId ? ' text-primary' : '')}
                                onClick={() => (albumIndex === ix ?
                                    handleClick(artistId)
                                    : handleClick(artistId, album.spotifyId, ix)
                                )}
                            >
                                {album.title}
                            </h2>

                            <h3 className='album-year'>
                                {album.releaseDate.slice(0,4)}
                            </h3>
                        </div>
                    </div>

                    {albumIndex === ix && (
                        <div className='track-list'>
                            {album.tracks.sort(
                                (a,b) => a.trackNumber - b.trackNumber
                            ).map((track, trackIndex) => (
                                <div className='track-row'
                                    key={`album-${ix}-track-${trackIndex}`}
                                >
                                    <span className='track-order'>
                                        {track.trackNumber}
                                    </span>
                                    <span className={'track-title clickable' + ( activeItemId === track.spotifyId ? ' text-primary' : '' )}
                                        onClick={() => {handleClick(artistId, track.spotifyId, ix)}}
                                    >
                                        {track.title}
                                    </span>
                                    <span className='track-duration'>
                                        {`${Math.floor(track.durationMs / 60000)}:${Math.floor(track.durationMs % 60000 / 1000)}`}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
};
