import styles from './Explore.module.css';
import ArtistProfile from '../ArtistProfile/ArtistProfile';
import Search from '../Search/Search';
import api from '../../api/_api';
import { useState } from 'react';
import { formatDuration } from '../../util';


export default function Explore() {
    const [artistId, setArtistId] = useState();
    const [artistProfiles, setArtistProfiles] = useState({});
    const [itemData, setItemData] = useState(null);
    const [albumIndex, setAlbumIndex] = useState(null);

    // todo: accept tracks w/ multiple artists
    const handleClick = async (selectedArtistId, selectedItemId, ix) => {
        // if only 1 arg, assume user clicked the Artist's name
        const itemId = selectedItemId || selectedArtistId;
        let artistProfile;
        if (artistProfiles[selectedArtistId]) {
            artistProfile = artistProfiles[selectedArtistId];
        } else {
            try {
                const artistProfileResponse = await api.spotify.artistProfile(selectedArtistId);
                setArtistProfiles({
                    ...artistProfiles, 
                    [selectedArtistId]: artistProfileResponse?.data
                });
                artistProfile = artistProfileResponse?.data;
            } catch (err) {
                // todo: improve error handling
                console.error(err);
            };
        };
        if (!artistProfile) return null;
        const albumIx = ix || getAlbumIndex(itemId, artistProfile);
        setAlbumIndex(albumIx);
        setItemData(getSelectedItemData(itemId, albumIx, artistProfile));
        setArtistId(artistProfile.spotifyId);
    };

    return (
        <div className={styles['explore-container']}>
            <Search handleSearchClick={handleClick} />

            {itemData &&
                <ArtistProfile 
                    artistProfile={artistProfiles[itemData.artistId]}
                    albumIndex={albumIndex}
                    item={itemData}
                    handleClick={handleClick}
                />
            }
        </div>
    );
};


// HELPERS
function getSelectedItemData(itemId, albumIndex, artistProfile) {
    if (!artistProfile) return null;
    if (itemId === artistProfile?.spotifyId) {
        return {
            spotifyId: artistProfile.spotifyId,
            artistId: artistProfile.spotifyId,
            title: artistProfile.title,
            popularity: artistProfile.popularity,
            imageUrl: artistProfile.images[1].url,
            releaseYear: null,
            duration: null,
            explicit: null,
            isPlayable: null,
            albumType: null,
        };
    } else if (itemId === artistProfile?.albums[albumIndex]?.spotifyId) {
        const albumObj = artistProfile?.albums[albumIndex];
        return {
            spotifyId: albumObj?.spotifyId,
            artistId: artistProfile.spotifyId,
            title: albumObj?.title,
            popularity: albumObj?.popularity,
            imageUrl: albumObj?.images[1]?.url,
            releaseYear: albumObj?.releaseDate?.slice(0, 4),
            duration: formatDuration(albumObj.tracks.reduce((acc, cur) => acc + cur.durationMs, 0)),
            explicit: null,
            isPlayable: null,
            albumType: albumObj?.albumType,
        };
    } else {
        const albumObj = artistProfile?.albums[albumIndex];
        for (const track of albumObj.tracks) {
            if (track?.spotifyId === itemId) {
                return {
                    spotifyId: track?.spotifyId,
                    artistId: artistProfile.spotifyId,
                    title: track?.title,
                    popularity: 'todo',
                    imageUrl: albumObj?.images[1]?.url,
                    releaseYear: albumObj?.releaseDate.slice(0, 4),
                    duration: formatDuration(track?.durationMs),
                    explicit: track?.explicit,
                    isPlayable: track?.isPlayable,
                    albumType: albumObj?.albumType,
                };
            }
        };
    }
};


function getAlbumIndex(itemId, artistProfile) {
    if (!artistProfile) return null;
    if (itemId === artistProfile.spotifyId) return null;
    
    let count = 0
    for (const album of artistProfile.albums || []) {
        if (itemId === album.spotifyId) return count;
        for (const track of album.tracks || []) {
            if (itemId === track.spotifyId) return count;
        };
        count++;
    };
    return null;
}