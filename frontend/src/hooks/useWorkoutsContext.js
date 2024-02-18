import { WorkoutsContext } from "../context/WorkoutContext";
import { useContext } from "react";

// Passes all the conntext using this hook
export const useWorkoutsContext = () => {
    const context = useContext(WorkoutsContext);

    if (!context) {
        throw Error('useWorkoutsContext must be inn an WorkoutsContextProvider');
    }

    return context;
}