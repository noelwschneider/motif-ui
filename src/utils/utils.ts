import api from "app/api";


export function formatDuration(ms: number): string {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export function getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
};


export function getSelectedItemData(
    itemId: string,
    // albumIndex: number | null,
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

    const albumIndex = getAlbumIndex(itemId, artistProfile);

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


export function getAlbumIndex(itemId: string, artistProfile): number | null {
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

// todo: reconcile id and spotifyArtistId stuff here


//* attempt to improve getArtist by executing both fetches concurrently
export async function fetchArtist(artistId: string) {
    try {
        const [artistProfileResponse, reviewsResponse] = await Promise.all([
            api.spotify.artistProfile(artistId),
            api.reviews.getArtist(artistId)
        ]);

        const artistProfile = artistProfileResponse;
        const reviews = reviewsResponse;

        if (!artistProfile) return;

        return { ...artistProfile, reviews };
    } catch (err) {
        console.error(err);
        return;
    };
};
