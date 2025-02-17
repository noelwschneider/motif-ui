import styles from './Home.module.css';
import ArtistProfile from 'components/ArtistProfile/ArtistProfile';
import Search from 'components/Search/Search';
import api from 'app/api';
import { useState } from 'react';
import { formatDuration } from 'utils/utils';


export default function Home() {
    const [artistProfiles, setArtistProfiles] = useState({});
    const [itemData, setItemData] = useState(null);
    const [albumIndex, setAlbumIndex] = useState<number | null>(null);
    const [searchOpen, setSearchOpen] = useState<boolean>(true);

    // todo: accept tracks w/ multiple artists
    const handleClick = async (selectedArtistId: string, selectedItemId?: string, ix?: number) => {
        const itemId = selectedItemId || selectedArtistId;
        const artistProfile = await fetchArtistProfile(selectedArtistId);

        if (!artistProfile) return;

        artistProfile.reviews = await fetchReviews(selectedArtistId);

        setArtistProfiles(prev => ({
            ...prev,
            [selectedArtistId]: artistProfile
        }));

        const albumIx = ix ?? getAlbumIndex(itemId, artistProfile);
        setAlbumIndex(albumIx);
        setItemData(getSelectedItemData(itemId, albumIx, artistProfile));
        setSearchOpen(false);
    };

    const fetchReviews = async (artistId: string) => {
        try {
            const reviews = await api.reviews.getArtist(artistId);
            return reviews?.data;
        } catch (err) {
            console.error(err);
            return null;
        }
    };

    const fetchArtistProfile = async (artistId: string) => {
        if (artistProfiles[artistId]) {
            return artistProfiles[artistId];
        }

        try {
            const artistProfileResponse = await api.spotify.artistProfile(artistId);
            return artistProfileResponse?.data ?? null;
        } catch (err) {
            console.error(err);
            return null;
        }
    };

    return (
        <div className={styles['explore-container']}>
            <Search
                handleSearchClick={handleClick}
                searchOpen={searchOpen}
                setSearchOpen={setSearchOpen}
            />

            <ArtistProfile
                artistProfile={artistProfiles[itemData?.spotifyArtistId || '']}
                albumIndex={albumIndex}
                item={itemData}
                handleClick={handleClick}
            />
        </div>
    );
};

// HELPERS
function getSelectedItemData(
    itemId: string,
    albumIndex: number | null,
    artistProfile,
) {
    if (!artistProfile) return null;

    if (itemId === artistProfile.spotifyId) {
        return {
            spotifyId: artistProfile.spotifyId,
            spotifyArtistId: artistProfile.spotifyId,
            title: artistProfile.title,
            popularity: artistProfile.popularity,
            imageUrl: artistProfile.images[1]?.url ?? '',
            releaseYear: null,
            duration: null,
            explicit: null,
            isPlayable: null,
            albumType: null,
        };
    }

    if (albumIndex !== null && itemId === artistProfile.albums[albumIndex]?.spotifyId) {
        const albumObj = artistProfile.albums[albumIndex];
        return {
            spotifyId: albumObj.spotifyId,
            spotifyArtistId: artistProfile.spotifyId,
            title: albumObj.title,
            popularity: albumObj.popularity,
            imageUrl: albumObj.images[1]?.url ?? '',
            releaseYear: albumObj.releaseDate.slice(0, 4),
            duration: formatDuration(albumObj.tracks.reduce((acc, cur) => acc + cur.durationMs, 0)),
            explicit: null,
            isPlayable: null,
            albumType: albumObj.albumType,
        };
    }

    if (albumIndex !== null) {
        const albumObj = artistProfile.albums[albumIndex];
        for (const track of albumObj.tracks) {
            if (track.spotifyId === itemId) {
                return {
                    spotifyId: track.spotifyId,
                    spotifyArtistId: artistProfile.spotifyId,
                    title: track.title,
                    popularity: 'todo',
                    imageUrl: albumObj.images[1]?.url ?? '',
                    releaseYear: albumObj.releaseDate.slice(0, 4),
                    duration: formatDuration(track.durationMs),
                    explicit: track.explicit,
                    isPlayable: track.isPlayable,
                    albumType: albumObj.albumType,
                };
            }
        }
    }

    return null;
};


function getAlbumIndex(itemId: string, artistProfile): number | null {
    if (!artistProfile) return null;
    if (itemId === artistProfile.spotifyId) return null;

    let count = 0;
    for (const album of artistProfile.albums || []) {
        if (itemId === album.spotifyId) return count;
        for (const track of album.tracks || []) {
            if (itemId === track.spotifyId) return count;
        }
        count++;
    }
    return null;
};
