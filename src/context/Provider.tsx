import useUser from "hooks/user";
import useSearch from "hooks/search";
import { AppContext } from "hooks";


export default function AppContextProvider({ children }) {
    const search = useSearch();
    const user = useUser();

    // // proof of concept implementation for refactored search hook
    // const search = useSearch(api.spotify.search, { 
    //     metadata: {}, 
    //     artists: [], 
    //     albums: [], 
    //     tracks: [] 
    // });

    return (
        <AppContext.Provider value={{
            search,
            user,
        }}>
            { children }
        </AppContext.Provider>
    )
};
