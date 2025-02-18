import { useContext, useEffect, useState } from "react";
import api from "app/api";
import { AppContext } from "contexts";
import { formatDuration } from "./utils";
import { useNavigate } from "react-router-dom";


export function useCurrentUser() {
    const { currentUser } = useContext(AppContext);
    return currentUser;
};

export function useGlobalSearch() {
    const { search } = useContext(AppContext);
    return search;
};

const DEBOUNCE_MS = 500;
const EMPTY_SEARCH_RESULTS = {
    albums: [],
    artists: [],
    tracks: [],
};

export function useSearch(fn, config={
    loading: false,
    query: '',
    reqBody: {},
}) {
    const [query, setQuery] = useState<string>(config.query);
    const [reqBody, setReqBody] = useState(config.reqBody);
    const [searchResults, setSearchResults] = useState(EMPTY_SEARCH_RESULTS);
    const [loading, setLoading] = useState<boolean>(config.loading);

    const clearSearch = () => {
        setQuery('');
        setLoading(false);
        setSearchResults(EMPTY_SEARCH_RESULTS);
    };

    useEffect(() => {
        const handleSearch = async () => {
            setLoading(true);
            try {
                const response = await fn({ query, ...reqBody });
                setSearchResults(response || EMPTY_SEARCH_RESULTS);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            };
        };

        const handler = setTimeout(async () => {
            handleSearch();
        }, DEBOUNCE_MS);

        return () => clearTimeout(handler);
    }, [fn, reqBody, query]);

    return { 
        clearSearch,
        loading,
        query,
        reqBody,
        searchResults,
        setLoading,
        setQuery,
        setReqBody,
        setSearchResults, 
    };
};


export function useAuthorizedUser() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const verifyUser = async () => {
          try {
            const userResponse = await api.auth.verify();
            setUser(userResponse);
          } catch (err) {
            console.error(err);
            setUser(null);
          };
        };

        verifyUser();
    }, []);

    const handleLogin = async (email, password) => {
        try {
            const loginResponse = await api.auth.login({ email, password });
            setUser(loginResponse);
        } catch (err) {
          console.error(err);
        };
    };

    const handleLogout = async () => {
        try {
            await api.auth.logout();
        } catch (err) {
            console.error('Logout failed', err);
        } finally {
            setUser(null);
        };
    };

    return {...user, handleLogin, handleLogout};
};

export function useUser(id=null) {
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(id);

    useEffect(() => {
        const fetchUser = async () => {
            if (!userId) return;

            try {
                const [userResponse, reviews, catalogs] = await Promise.all([
                    api.user.fetchUser(userId),
                    api.reviews.getUser(userId),
                    api.catalogs.getUserPublicCatalogs(userId)
                ]);
                setUser({...userResponse, reviews, catalogs});
            } catch (err) {
                console.error(err);
            }
        };
        fetchUser();
    }, [userId]);

    return {
        setUserId,
        user,
    };
};


export function useArtist(id=null) {
    const [artistId, setArtistId] = useState(id);
    const [artist, setArtist] = useState(null);
    const [contentId, setContentId] = useState(null);
    const [content, setContent] = useState(null);
    // const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchArtist = async () => {
            try {
                const [artistProfile, reviews] = await Promise.all([
                    api.spotify.artistProfile(artistId),
                    api.reviews.getArtist(artistId)
                ]);
                setArtist({...artistProfile, reviews})
            } catch (err) {
                console.error(err);
            };
        };
        if (artistId) fetchArtist();

        return () => setArtist(null);
    }, [artistId]);

    useEffect(() => {
        const selectedContent = getArtistContent(artist, contentId);
        setContent(selectedContent);
    }, [artist, contentId]);

    return {
        artist,
        content,
        setArtistId,
        setContentId,
    };
};


function getArtistContent(artist, itemId = null) {
    if (!artist) return null;

    if (itemId === artist.spotifyId || itemId === null) return {
        spotifyId: artist.spotifyId,
        spotifyArtistId: artist.spotifyId,
        title: artist.title,
        popularity: artist.popularity,
        imageUrl: artist.images[1]?.url ?? '',
        releaseYear: null,
        duration: null,
        explicit: null,
        isPlayable: null,
        albumType: null,
        albumIndex: null,
    };

    let count = 0;
    for (const album of artist?.albums || []) {
        if (itemId === album?.spotifyId) return {
            spotifyId: album?.spotifyId,
            spotifyArtistId: artist?.spotifyId,
            title: album?.title,
            popularity: album?.popularity,
            imageUrl: album?.images[1]?.url ?? '',
            releaseYear: album?.releaseDate.slice(0, 4),
            duration: formatDuration(album?.tracks?.reduce((acc, cur) => acc + cur.durationMs, 0)),
            explicit: null,
            isPlayable: null,
            albumType: album?.albumType,
            albumIndex: count,
        };

        for (const track of album?.tracks || []) {
            if (itemId === track?.spotifyId) return {
                spotifyId: track?.spotifyId,
                spotifyArtistId: artist?.spotifyId,
                title: track?.title,
                popularity: 'todo',
                imageUrl: album?.images[1]?.url ?? '',
                releaseYear: album?.releaseDate.slice(0, 4),
                duration: formatDuration(track?.durationMs),
                explicit: track?.explicit,
                isPlayable: track?.isPlayable,
                albumType: album?.albumType,
                albumIndex: count,
            };
        };
        count++;
    };

    return null;
}