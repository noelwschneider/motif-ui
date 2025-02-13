import { useCallback, useEffect, useState } from "react";


export function useSearch(fn, config={
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


// todo: login/logout functions?
export function useUser() {
    const [user, setUser] = useState();

    return {
        setUser,
        user,
    };
};
