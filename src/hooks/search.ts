import { useCallback, useEffect, useState } from 'react';
import api from 'api';
import { SearchResults } from 'utils/types';


// todo: get album popularity score into the return
// todo: pagination
/** Hook for managing search state
 * - query used by input elements
 * - request body 
 * - search results
 * - load state
 * 
 * Also handles common functionality:
 * - debouncing
 * - resetting state
 * - query validation
 * - async crap writ large
 */
export default function useSearch() {
    const [query, setQuery] = useState<string>('');
    const [reqBody, setReqBody] = useState({});
    const [searchResults, setSearchResults] = useState<SearchResults>({
        metadata: {},
        artists: [],
        albums: [],
        tracks: [],
    });
    const [loading, setLoading] = useState<boolean>(false);
    
    const clearSearch = () => {
        setLoading(false);
        setSearchResults({
            metadata: {},
            artists: [],
            albums: [],
            tracks: [],
        });
    };

    // todo: refactor so the actual search function is passed in as an arg when the hook is called, making it applicable to any search functionality I might need
    const handleSearch = useCallback(async () => {
        if (!query?.trim()) {
            // setLoading(false);
            // setSearchResults({
            //     metadata: {},
            //     artists: [],
            //     albums: [],
            //     tracks: [],
            // });
            clearSearch();
            return;
        };

        setLoading(true);

        try {
            const response = await api.spotify.search({ 
                query,
                type: 'album,artist,track',
                limit: 10,
                offset: 0
            });
            return response?.data;
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        };
    }, [query]);

    useEffect(() => {
        const delay = 500; // ms
        const handler = setTimeout(async () => {
            const response = await handleSearch();
            setSearchResults({ ...response ?? { metadata: {}, artists: [], albums: [], tracks: [] } });
        }, delay);

        return () => clearTimeout(handler);
    }, [handleSearch, query]);

    return { 
        loading,
        query,
        searchResults,
        setLoading,
        setQuery,
        setSearchResults, 
    };
};



/* refactor brainstorm

    # ARGS
    ## fn: the search request function
    - executed in the handleSearch try block
    - presumably a function attached to the global api instance

    ## config: possible config object for optional args

    ## defaultResults: 
    - used as default state for the searchResults value
    - used by clearResults and as the debounce fallback value
    - probably an empty object if not included

    ## defaultState: object w/ default values for all state objects
    - likely implemented as 'state' or 'defaults' property on 'config' arg

    ## debounceMs: set timer for debounce function

    ## queryRegex: regex to define rules for valid query

*/


export  function useSearchREFACTOR(fn, config={
    debounceMs: 500,
    defaultResults: {},
    loading: false,
    query: '',
    reqBody: {},
}) {
    const [query, setQuery] = useState<string>(config.query);
    const [reqBody, setReqBody] = useState(config.reqBody);
    const [searchResults, setSearchResults] = useState(config.defaultResults);
    const [loading, setLoading] = useState<boolean>(config.loading);
    
    const clearSearch = useCallback(() => {
        setQuery('');
        setLoading(false);
        setSearchResults({});
    }, []);

    const handleSearch = useCallback(async () => {
        if (!query?.trim()) {
            clearSearch();
            return;
        };

        setLoading(true);

        try {
            const response = await fn({ query, ...reqBody });
            return response;
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        };
    }, [fn, query, reqBody, clearSearch]);

    useEffect(() => {
        const handler = setTimeout(async () => {
            const response = await handleSearch();
            setSearchResults({ ...response ?? config.defaultResults});
        }, config.debounceMs);

        return () => clearTimeout(handler);
    }, [
        config.debounceMs, 
        config.defaultResults, 
        handleSearch, 
        query
    ]);

    return { 
        loading,
        query,
        reqBody,
        searchResults,
        setLoading,
        setQuery,
        setReqBody,
        setSearchResults, 
    };
};