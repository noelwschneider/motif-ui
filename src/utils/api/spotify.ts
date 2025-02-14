import { MotifApiInstance } from "app/api";


export default function addSpotify(api: MotifApiInstance) {
    const urlPrefix = '/spotify';
    
    api.spotify = {
        artistProfile: async (id: string): Promise<Artist | null> => {
            if (!id) return null;
            
            const response = await api.get(urlPrefix + '/artist-profile', {
                params: { id }
            });

            return response?.data || response || null;
        },

        search: async ({
            query = '', 
            type = 'album,artist,track', 
            limit = 20, 
            offset = 0, 
            market = "US", 
            album = "", 
            artist = "", 
            track = "", 
            genre = ""
        }: SpotifySearchArgs): Promise<SpotifySearchResponse | null> => {
            let q = query;
            q += album ? ` album:${album}` : '';
            q += artist ? ` artist:${artist}` : '';
            q += genre ? ` genre:${genre}` : '';
            q += track ? ` track:${track}` : '';

            if (!q) return null;

            const response = await api.get(urlPrefix + '/search', {
                params: { q, type, limit, market, offset },
            });
            return response?.data || response || null;
        },
    } as SpotifyApi;
};


export interface Track {
    discNumber: number;
    durationMs: number;
    explicit: boolean;
    isPlayable: boolean;
    spotifyId: string;
    title: string;
    trackNumber: number;
};

export interface Album {
    albumType: string;
    artists: Artist[];
    images: { url: string }[];
    popularity: number;
    releaseDate: string;
    spotifyId: string;
    title: string;
    tracks: Track[];
    tracksCount: number;
};

export interface Artist {
    albums: Album[];
    images: { url: string }[];
    popularity: number;
    title: string;
    spotifyId: string;
};

export interface SpotifySearchArgs {
    album: string;
    artist: string;
    genre: string;
    limit: number;
    offset: number;
    market: string;
    query: string;
    track: string;
    type: string;  // todo: improve handling for enum
};

export interface SpotifySearchItem {
    spotifyId: string;
    title: string;
    images: { url: string }[];
    artists: { spotifyId: string; title: string }[];
};

export interface SpotifySearchResponse {
    albums: SpotifySearchItem[];
    artist: SpotifySearchItem[];
    requestArgs: SpotifySearchArgs;
    tracks: SpotifySearchItem[];
};

export interface SpotifyApi {
    artistProfile: (id: string) => Promise<Artist | null>;
    search: (args: SpotifySearchArgs) => Promise<SpotifySearchResponse | null>;
};