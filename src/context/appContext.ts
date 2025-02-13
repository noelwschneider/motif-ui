import { createContext, useContext } from "react";


export const AppContext = createContext(null);


export function useSearchContext() {
    const { search } = useContext(AppContext);
    return search;
};


export function useUserContext() {
    const { user } = useContext(AppContext);
    return user;
};
