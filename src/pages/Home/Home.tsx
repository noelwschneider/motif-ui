import styles from './Home.module.css';
import ArtistProfile from 'components/ArtistProfile/ArtistProfile';
import GlobalSearchResults from 'pages/GlobalSearchResults/GlobalSearchResults';
import { useArtist } from 'hooks';


export default function Home() {
    const { artist, content, setContentId, setArtistId } = useArtist();

    // todo: accept tracks w/ multiple artists
    const handleClick = async (selectedArtistId: string, selectedItemId?: string) => {
        setContentId(selectedItemId);
        setArtistId(selectedArtistId);
    };

    return (
        <div className={styles['explore-container']}>
            <GlobalSearchResults handleSearchClick={handleClick} />

            <ArtistProfile 
                artistProfile={artist}
                albumIndex={content?.albumIndex}
                item={content}
                handleClick={handleClick}
            />
        </div>
    );
};
