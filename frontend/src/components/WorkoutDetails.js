const WorkoutDetails = ({ workout }) => {
    // Convert timestamp
    const createdAtDate = new Date(workout.createdAt);

    const options = { 
        year: 'numeric', 
        month: 'short', 
        day: '2-digit' 
    };

    // Format the createdAt date using toLocaleDateString
    const formattedDate = createdAtDate.toLocaleDateString('en-US', options);

    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load: </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{formattedDate}</p>
        </div>
    );
}

export default WorkoutDetails;
