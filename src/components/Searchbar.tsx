import { useSearch } from '../utils/hooks';


export default function Searchbar({ fn, placeholder="", }) {
    const { query, setQuery } = useSearch(fn);

    return (
        <input className="searchbar-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
        />
    );
};
