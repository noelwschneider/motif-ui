import { AppContext } from "utils/contexts";
import { useSearch, useUser } from "utils/hooks";
import api from "api";


export default function AppProvider({ children }) {
    const user = useUser();
    const search = useSearch(api.spotify.search);

    return (
        <AppContext.Provider value={{
            search,
            user
        }}>
            { children }
        </AppContext.Provider>
    )
};
