import { useLocation, useParams } from "react-router-dom";
import api from "../app/api";
import { useEffect, useState } from "react";


export default function ArtistProfile() {
    const { artistId } = useParams();
    const { state } = useLocation();
    const [artist, setArtist] = useState({
        albums: [],
        images: state?.images || [],
        popularity: state?.popularity || 0,
        spotifyId: state?.spotifyId || '',
        title: state?.title || '',
    });

    useEffect(() => {
        const fetchArtist = async () => {
            try {
                const data = await api.spotify.artistProfile(artistId);
                setArtist(data);
            } catch (err) {
                console.error(err);
            };
        };
        if (artistId) fetchArtist();
    }, []);

    return (
        <div>
            <h1>{artist?.title || ""}</h1>
            <img className="item-image"
                src={artist?.images[1]?.url}
            ></img>

            {artist.albums.sort(
                (a, b) => a.releaseDate > b.releaseDate ? -1 : 1
            ).map((album, ix) => (
                <div key={`album-${ix}`}>
                    <img className='album-image'
                        src={album.images[2]?.url}
                    ></img>

                    <div className="album-text">
                        <h2 className='album-title clickable'>{album.title}</h2>
                        <h3>{album.releaseDate.slice(0,4)}</h3>
                        <div className="track-list">
                            {album.tracks?.sort(
                                (a,b) => a.trackNumber - b.trackNumber
                            ).map((track, trackIx) => (
                                <div className="track-row" key={`album-${ix}-track-${trackIx}`}>
                                    <span className="track-order">{track.trackNumber}</span>
                                    <span className="track-title ">{track.title}</span>
                                    <span className='track-duration'>
                                        {`${Math.floor(track.durationMs / 60000)}:${Math.floor(track.durationMs % 60000 / 1000)}`}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
