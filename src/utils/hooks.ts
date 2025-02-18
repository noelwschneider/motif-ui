import { useContext, useEffect, useState } from "react";
import api from "app/api";
import { AppContext } from "contexts";

export function useCurrentUser() {
    const { user } = useContext(AppContext);
    return user;
};

export function useGlobalSearch() {
    const { search } = useContext(AppContext);
    return search;
};

const DEBOUNCE_MS = 500;
const EMPTY_SEARCH_RESULTS = {
    albums: [],
    artists: [],
    tracks: [],
};

export function useSearch(fn, config={
    loading: false,
    query: '',
    reqBody: {},
}) {
    const [query, setQuery] = useState<string>(config.query);
    const [reqBody, setReqBody] = useState(config.reqBody);
    const [searchResults, setSearchResults] = useState(EMPTY_SEARCH_RESULTS);
    const [loading, setLoading] = useState<boolean>(config.loading);

    const clearSearch = () => {
        setQuery('');
        setLoading(false);
        setSearchResults(EMPTY_SEARCH_RESULTS);
    };

    useEffect(() => {
        const handleSearch = async () => {
            setLoading(true);
            try {
                const response = await fn({ query, ...reqBody });
                setSearchResults(response);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            };
        };

        const handler = setTimeout(async () => {
            handleSearch();
        }, DEBOUNCE_MS);

        return () => clearTimeout(handler);
    }, [fn, reqBody, query]);

    return { 
        clearSearch,
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

    useEffect(() => {
        const verifyUser = async () => {
          try {
            const userResponse = await api.auth.verify();
            // todo: convert userResponse.data.userId to number instead of string
            setUser(userResponse?.data);
          } catch (err) {
            console.error(err);
            setUser(null);
          }
        };

        verifyUser();
    }, []);
    return {
        setUser,
        user,
    };
};
