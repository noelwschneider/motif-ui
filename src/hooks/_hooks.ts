import { createContext, useContext } from "react";


export const AppContext = createContext(null);


export function useSearch() {
    const { search } = useContext(AppContext);
    return search;
};


export function useUser() {
    const { user } = useContext(AppContext);
    return user;
};
