import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import formatDisatanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutsContext();

    // Convert timestamp
    const createdAtDate = new Date(workout.createdAt);

    const options = { 
        year: 'numeric', 
        month: 'short', 
        day: '2-digit' 
    };

    const handleDeleteClick = async () => {
        const response = await fetch('/api/workouts/' + workout._id, {
            method: 'DELETE'
        });

        const json = await response.json();

        if (response.ok) {
            dispatch({type: 'DELETE_WORKOUT', payload: json});
        }
    }

    // Format the createdAt date using toLocaleDateString
    const formattedDate = createdAtDate.toLocaleDateString('en-US', options);

    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load: </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{formatDisatanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
            <p>{ formattedDate }</p>
            <span class="delete-icon" onClick={handleDeleteClick}></span>
        </div>
    );
}

export default WorkoutDetails;
