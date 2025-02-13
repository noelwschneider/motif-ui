import styles from './Search.module.css';
import { useSearch } from 'hooks';


export default function SearchBar() {
    const { query, setQuery } = useSearch();

    return (
        <div className={styles['searchbar']}>
            <input className={styles["searchbar-input"]}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for music..."
            />
        </div>
    );
};
