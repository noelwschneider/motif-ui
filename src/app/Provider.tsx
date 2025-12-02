import { AppContext } from "../utils/contexts";
import { useSearch, useAuthorizedUser } from "../utils/hooks";
import api from "./api";


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
