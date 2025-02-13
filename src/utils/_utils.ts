import { Artist, SelectedItemData } from 'utils/types';
import api from 'api';



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


export function getAlbumIndex(itemId: string, artistProfile: Artist): number | null {
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


export function getSelectedItemData(
    artistProfile: Artist,
    itemId: string
): SelectedItemData | null {
    if (!artistProfile) return null;

    if (!itemId) {
        return {
            spotifyId: artistProfile?.spotifyId,
            spotifyArtistId: artistProfile?.spotifyId,
            title: artistProfile?.title,
            popularity: artistProfile?.popularity,
            imageUrl: artistProfile?.images?.[1]?.url ?? '',
            releaseYear: null,
            duration: null,
            explicit: null,
            isPlayable: null,
            albumType: null,
        };
    };

    const albumIndex = getAlbumIndex(itemId, artistProfile);
    if (!albumIndex) return null;

    const album = artistProfile.albums[albumIndex];
    if (itemId === album?.spotifyId) {
        const albumObj = artistProfile.albums[albumIndex];
        return {
            spotifyId: album?.spotifyId,
            spotifyArtistId: artistProfile?.spotifyId,
            title: album?.title,
            popularity: album?.popularity,
            imageUrl: albumObj?.images?.[1]?.url ?? '',
            releaseYear: album?.releaseDate.slice(0, 4),
            duration: formatDuration(album?.tracks?.reduce((acc, cur) => acc + cur.durationMs, 0)),
            explicit: null,
            isPlayable: null,
            albumType: album?.albumType,
        };
    }

    // item is a track
    for (const track of album.tracks) {
        if (track.spotifyId === itemId) {
            return {
                spotifyId: track.spotifyId,
                spotifyArtistId: artistProfile.spotifyId,
                title: track.title,
                popularity: 'todo',
                imageUrl: album.images[1]?.url ?? '',
                releaseYear: album.releaseDate.slice(0, 4),
                duration: formatDuration(track.durationMs),
                explicit: track.explicit,
                isPlayable: track.isPlayable,
                albumType: album.albumType,
            };
        };
    };
    
    return null;
};


// initial attempt at getArtist function using synchronous fetches
export async function getArtist(artistId: string): Promise<Artist> {
    let artistProfile;
    try {
        const artistProfileResponse = await api.spotify.artistProfile(artistId);
        artistProfile = artistProfileResponse?.data ?? null;
        console.log('artistProfile:', artistProfileResponse);
    } catch (err) {
        console.error(err);
    };

    if (!artistProfile) return;

    let reviews = [];
    try {
        const reviewsResponse = await api.reviews.getArtist(artistId);
        reviews = reviewsResponse?.data;
        console.log('reviews:', reviews);
    } catch (err) {
        console.error(err);
    };

    return {...artistProfile, reviews};
};


//* attempt to improve getArtist by executing both fetches concurrently
export async function getArtistConcurrent(artistId: string): Promise<Artist | undefined> {
    try {
        const [artistProfileResponse, reviewsResponse] = await Promise.all([
            api.spotify.artistProfile(artistId),
            api.reviews.getArtist(artistId)
        ]);

        const artistProfile = artistProfileResponse?.data ?? null;
        const reviews = reviewsResponse?.data ?? [];

        if (!artistProfile) return;

        return { ...artistProfile, reviews };
    } catch (err) {
        console.error(err);
        return;
    };
};


//* attempt at optimizing the function by executing the fetches concurrently, but not waiting for the reviews fetch to conclude before triggering an early return if the artist fetch fails.
export async function getArtistOptimized(artistId: string): Promise<Artist | undefined> {
    // Kick off both requests concurrently
    const artistPromise = api.spotify.artistProfile(artistId);
    const reviewsPromise = api.reviews.getArtist(artistId);

    try {
        // Wait for artistProfile to resolve first, but let reviews run in the background
        const artistProfileResponse = await artistPromise;
        const artistProfile = artistProfileResponse?.data ?? null;

        // If artistProfile is falsy, return early *without* waiting for reviewsPromise
        if (!artistProfile) return;

        // Now safely await the reviews response (it might have already finished)
        const reviewsResponse = await reviewsPromise.catch(() => null);
        const reviews = reviewsResponse?.data ?? [];

        return { ...artistProfile, reviews };
    } catch (err) {
        console.error(err);
        return;
    }
};
