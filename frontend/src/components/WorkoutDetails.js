import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import formatDisatanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();

    // Convert timestamp
    const createdAtDate = new Date(workout.createdAt);

    const options = { 
        year: 'numeric', 
        month: 'short', 
        day: '2-digit' 
    };

    const handleDeleteClick = async () => {
        if (!user){
            return
        }

        const response = await fetch('/api/workouts/' + workout._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
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
            <p><strong>Load (lbs): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{formatDisatanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
            <p>{ formattedDate }</p>
            <span class="delete-icon" onClick={handleDeleteClick}></span>
        </div>
    );
}

export default WorkoutDetails;
