import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

// Passes all the conntext using this hook
export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw Error('useAuthContext must be in an AuthContextProvider');
    }

    return context;
}