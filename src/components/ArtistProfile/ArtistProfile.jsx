import styles from './ArtistProfile.module.css';
import SpotifyIcon from '../SpotifyIcon';
import api from '../../api/_api';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';


// todo: 
    // add action buttons
    // improve UI
    // stretch: add album sort buttons, object for sorting functions
    // stretch: add alternate track view
    // stretch: open in spotify
    // stretch: suspense/placeholder UI
export default function ArtistProfile() {
    const location = useLocation();

    const [activeItem, setActiveItem] = useState(location.state.activeItem);
    const [artistProfile, setArtistProfile] = useState({});
    const [expandedAlbum, setExpandedAlbum] = useState(null);

    const fetchArtistData = async () => {
        try {
            const artistProfileResponse = await api.spotify.artistProfile(location.state.artist.spotifyId);
            const artistProfileData = artistProfileResponse.data;
            setArtistProfile(artistProfileData);
        } catch (err) {
            console.log('error:', err);
        }
    };

    useEffect(() => {
        fetchArtistData();
    }, []);

    const handleClick = (type, data) => {
        if (type === 'artist') setExpandedAlbum(null);
        setActiveItem({ type, data });
    };


    return (
        <div className={styles['artist-profile']}>
            <div className="artist-data-container">
                <h1 className={ styles['artist-name'] +
                        (activeItem.type === 'artist' ? ' ' + styles['active'] : '')
                    }
                    onClick={() => handleClick('artist', artistProfile)}
                >
                    {artistProfile?.title}
                </h1>

                {artistProfile?.albums &&
                    <div className={styles['album-list']}>
                        {artistProfile?.albums?.sort(
                            (a, b) => a.releaseDate > b.releaseDate ? -1 : 1
                        )?.map((album, index) => (
                            <div className={styles['album-container']}
                                key={index}
                            >
                                <div className={styles['album-row']}
                                    onClick={() => {
                                        handleClick('album', album);
                                        setExpandedAlbum(index);  
                                    }}
                                >
                                    <img src={album.images[0]?.url} height='64' width='64'></img>
                                    <h2 className={ styles['album-title'] + (
                                        activeItem.type === 'album' && activeItem.data === album ? 
                                            ' ' + styles['active']
                                            : ''
                                    )}>
                                            {album.title}
                                            
                                    </h2>
                                    <p className={styles['album-year']}>{album.releaseDate.slice(0,4)}</p>
                                </div>

                                {expandedAlbum === index && (
                                    <div className={styles['track-list']}>
                                        {album.tracks.sort(
                                            (a,b) => a.trackNumber - b.trackNumber
                                        ).map((track, trackIndex) => (
                                            <div className={styles['track-row']}
                                                key={trackIndex}
                                                onClick={() => handleClick('track', track)}
                                            >
                                                <span className={styles['track-order']}>
                                                    {track.trackNumber}
                                                </span>
                                                <span className={styles['track-title'] + (         
                                                    activeItem.type === 'track' &&
                                                    activeItem.data === track ? 
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
                {/* todo: placeholder for items w/o reviews */}
                { artistProfile?.reviews?.activeItem?.map((review, i) => (
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
            </div>
        </div>
    );
};
