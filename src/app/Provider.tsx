import { AppContext } from "contexts";
import { useSearch, useAuthorizedUser } from "hooks";
import api from "app/api";


export default function AppProvider({ children }) {
    const currentUser = useAuthorizedUser();
    const search = useSearch(api.spotify.search);

    return (
        <AppContext.Provider value={{
            search,
            currentUser
        }}>
            { children }
        </AppContext.Provider>
    )
};
