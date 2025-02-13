import { useState } from "react";


// todo: login/logout functions?
export default function useUser() {
    const [user, setUser] = useState();

    return {
        setUser,
        user,
    };
};
