import styles from './Explore.module.css';
import ArtistProfile from '../ArtistProfile/ArtistProfile';
import Search from '../Search/Search';
import api from '../../api/_api';
import { useState } from 'react';


export default function Explore() {
    const [artistId, setArtistId] = useState();
    const [itemId, setItemId] = useState();
    const [artistProfiles, setArtistProfiles] = useState({});

    // todo: accept tracks w/ multiple artists
    const handleSearchClick = async (selectedArtistId, selectedItemId) => {
        setArtistId(selectedArtistId);
        // if only 1 arg, assume user clicked the Artist's name
        setItemId(selectedItemId || selectedArtistId);

        if (artistProfiles[selectedArtistId]) return;
        try {
            const artistProfileResponse = await api.spotify.artistProfile(selectedArtistId);
            setArtistProfiles({
                ...artistProfiles, 
                [selectedArtistId]: artistProfileResponse?.data
            });
        } catch (err) {
            // todo: improve error handling
            console.error(err);
        };
    };

    return (
        <div className={styles['explore-container']}>
            <Search handleSearchClick={handleSearchClick} />
            <ArtistProfile 
                itemId={itemId}
                setItemId={setItemId}
                artistProfile={artistProfiles[artistId]}
            />
        </div>
    )
};
