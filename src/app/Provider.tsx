import { createContext } from "react";
const useUser = 'todo';
const useSearch = 'todo';


const AppContext = createContext(null);


export default function AppProvider() {
    const user = useUser;
    const search = useSearch;

    return (
        <AppContext.Provider 
            search={search}    
            user={user}
        />
    )
}