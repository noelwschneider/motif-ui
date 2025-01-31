import styles from './ArtistProfile.module.css';


export default function AlbumList({
    activeItemId,
    albumIndex,
    albums=[],
    artistId,
    handleClick,
}) {
    return (
        <div className={styles['album-list']}>
            {albums.sort(
                (a, b) => a.releaseDate > b.releaseDate ? -1 : 1
            )?.map((album, ix) => (
                <div className={styles['album-container']}
                    key={`artist-album-list-${ix}`}
                >
                    <div className={styles['album-row']}>
                        <img className={styles['album-image'] + ' clickable'}
                            src={album.images[2]?.url}
                            onClick={() => (albumIndex === ix ?
                                handleClick(artistId)
                                : handleClick(artistId, album.spotifyId, ix)
                           )}
                        ></img>

                        <div className={styles['album-text']}>
                            <h2 className={ styles['album-title'] 
                                    + ' clickable' 
                                    + ( activeItemId === album.spotifyId ? 
                                        ' ' + styles['active']
                                        : ''
                                    )}
                                onClick={() => (albumIndex === ix ?
                                    handleClick(artistId)
                                    : handleClick(artistId, album.spotifyId, ix)
                                )}
                            >
                                {album.title}
                            </h2>

                            <h3 className={styles['album-year']}>
                                {album.releaseDate.slice(0,4)}
                            </h3>
                        </div>
                    </div>

                    {albumIndex === ix && (
                        <div className={styles['track-list']}>
                            {album.tracks.sort(
                                (a,b) => a.trackNumber - b.trackNumber
                            ).map((track, trackIndex) => (
                                <div className={styles['track-row']}
                                    key={`album-${ix}-track-${trackIndex}`}
                                >
                                    <span className={styles['track-order']}>
                                        {track.trackNumber}
                                    </span>
                                    <span className={styles['track-title'] 
                                        + ' clickable' 
                                        + ( activeItemId === track.spotifyId ? 
                                            ' ' + styles['active']
                                            : ''
                                        )}
                                        onClick={() => {handleClick(artistId, track.spotifyId, ix)}}
                                    >
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
    )
};
