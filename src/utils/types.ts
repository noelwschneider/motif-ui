

export type HandleSearchClick = (artistId: string, itemId?: string) => void;




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

export interface SearchProps {
    handleSearchClick: HandleSearchClick,
    searchOpen: boolean;
    setSearchOpen: (open: boolean) => void;
};
