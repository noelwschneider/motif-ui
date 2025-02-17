import { AppContext } from "contexts";
import { useSearch, useUser } from "hooks";
import api from "app/api";


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
