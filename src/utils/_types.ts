import { AxiosInstance } from 'axios';


// auth api
export interface AuthApi {
    login: (args: AuthLoginArgs) => Promise<UserResponse | null>;
    register: (args: AuthRegisterArgs) => Promise<string | null>;
    logout: () => Promise<string | null>;
    verify: () => Promise<UserResponse | null>;
};

export interface AuthLoginArgs {
    email: string;
    password: string;
};

export interface AuthRegisterArgs {
    email: string;
    password: string;
    username: string;
};


// user api
export interface UserResponse {
    id: number;
    username: string;
    displayName: string;
    profilePicUrl: string;
    createDate: string;
};

export interface UserApi {
    fetchUser: (userId: string) => Promise<UserResponse | null>;
};


// api instance
export interface MotifApiInstance extends AxiosInstance {
    auth?: AuthApi;
    user?: UserApi;
};


export type HandleSearchClick = (artistId: string, itemId?: string) => void;


export interface Artist {
    spotifyId: string;
    title: string;
    popularity: number;
    images: { url: string }[];
    albums: Album[];
    reviews?: Review[];
};

export interface Album {
    spotifyId: string;
    title: string;
    popularity: number;
    images: { url: string }[];
    releaseDate: string;
    tracks: Track[];
    albumType: string;
};

export interface Track {
    spotifyId: string;
    title: string;
    durationMs: number;
    explicit: boolean;
    isPlayable: boolean;
};

export interface SelectedItemData {
    spotifyId: string;
    spotifyArtistId: string;
    title: string;
    popularity: number | string;
    imageUrl: string;
    releaseYear: string | null;
    duration: string | null;
    explicit: boolean | null;
    isPlayable: boolean | null;
    albumType: string | null;
};

export interface Review {
    id: number;
    spotifyId: string;
    spotifyArtistId: string;
    comment: string;
    rating: number;
};

export interface SearchProps {
    handleSearchClick: HandleSearchClick,
    searchOpen: boolean;
    setSearchOpen: (open: boolean) => void;
};

export interface SearchResultItem {
    spotifyId: string;
    title: string;
    images: { url: string }[];
    artists: { spotifyId: string; title: string }[];
};

export interface SearchResults {
    metadata: Record<string, any>;
    artists: SearchResultItem[];
    albums: SearchResultItem[];
    tracks: SearchResultItem[];
};
