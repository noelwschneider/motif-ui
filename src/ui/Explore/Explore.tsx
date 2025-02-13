import styles from './Explore.module.css';
import ArtistProfile from '../ArtistProfile/ArtistProfile';
import Search from '../Search/Search';
import SearchBar from 'ui/Search/SearchBar';
import SearchResults from 'ui/Search/SearchResults';
import api from 'api';
import { useState } from 'react';
import { getAlbumIndex, getSelectedItemData } from 'utils';
import { Artist, HandleSearchClick, SelectedItemData } from 'utils/types';


export default function Explore() {
    const [artistProfiles, setArtistProfiles] = useState<Record<string, Artist>>({});
    const [itemData, setItemData] = useState<SelectedItemData | null>(null);
    const [albumIndex, setAlbumIndex] = useState<number | null>(null);
    const [searchOpen, setSearchOpen] = useState<boolean>(true);

    // todo: accept tracks w/ multiple artists
    const handleClick: HandleSearchClick = async (selectedArtistId: string, selectedItemId?: string, ix?: number) => {
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

    const fetchReviews = async (artistId: string): Promise<any> => {
        try {
            const reviews = await api.reviews.getArtist(artistId);
            return reviews?.data;
        } catch (err) {
            console.error(err);
            return null;
        }
    };

    const fetchArtistProfile = async (artistId: string): Promise<Artist | null> => {
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
            {/* <Search
                handleSearchClick={handleClick}
                searchOpen={searchOpen}
                setSearchOpen={setSearchOpen}
            /> */}

            <SearchResults />

            <ArtistProfile
                artistProfile={artistProfiles[itemData?.spotifyArtistId || '']}
                albumIndex={albumIndex}
                item={itemData}
                handleClick={handleClick}
            />
        </div>
    );
};
