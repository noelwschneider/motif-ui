import styles from './Searchbar.module.css';
import { useSearch } from 'hooks';


export default function Searchbar({ fn, placeholder="", }) {
    const { query, setQuery } = useSearch(fn);

    return (
        <input className={styles["searchbar-input"]}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
        />
    );
};
