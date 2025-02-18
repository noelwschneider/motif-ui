import styles from './Home.module.css';
import ArtistProfile from 'components/ArtistProfile/ArtistProfile';
import Search from 'components/Search/Search';
import { useState } from 'react';
import { fetchArtist, getAlbumIndex, getSelectedItemData, } from 'utils/utils';


export default function Home() {
    const [artistProfiles, setArtistProfiles] = useState({});
    const [itemData, setItemData] = useState(null);
    const [albumIndex, setAlbumIndex] = useState<number | null>(null);

    // todo: accept tracks w/ multiple artists
    const handleClick = async (selectedArtistId: string, selectedItemId?: string, ix?: number) => {
        const itemId = selectedItemId || selectedArtistId;
        const artistProfile = await fetchArtist(selectedArtistId);
        
        if (!artistProfile) return;

        setArtistProfiles(prev => ({
            ...prev,
            [selectedArtistId]: artistProfile
        }));

        const albumIx = ix ?? getAlbumIndex(itemId, artistProfile);
        setAlbumIndex(albumIx);
        setItemData(getSelectedItemData(itemId, albumIx, artistProfile));
    };

    return (
        <div className={styles['explore-container']}>
            <Search handleSearchClick={handleClick} />

            <ArtistProfile
                artistProfile={artistProfiles[itemData?.spotifyArtistId || '']}
                albumIndex={albumIndex}
                item={itemData}
                handleClick={handleClick}
            />
        </div>
    );
};
