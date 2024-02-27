const Workout = require('../models/workoutModel')
const mongoose = require('mongoose');

// Get all workouts
const getWorkouts = async (req, res) => {
    const user_id = req.user._id;

    const workouts = await Workout.find({ user_id }).sort({createdAt: -1}); // Empty bracket gets all workouts
    res.status(200).json(workouts);
}

// Get single workout
const getSingleWorkout = async (req, res) => {
    const { id } = req.params;
    try {
        console.log("Received ID:", id); // Log the received ID

        // Check if the id is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: 'Invalid workout ID.'})
        }

        // Find the workout by its id
        const workout = await Workout.findById(id);
        
        console.log("Found Workout:", workout); // Log the found workout

        // If workout not found, return 400
        if (!workout){
            return res.status(400).json({error: 'Workout not found.'})
        }

        res.status(200).json(workout);

    } catch (error) {
        console.error("Error in getSingleWorkout:", error);
        res.status(500).json({error: 'Server error.'});
    }
}


// Create new workout
const createWorkout = async(req, res) => {
    const {title, load, reps} = req.body;

    let emptyFields = []

    if (!title) {
        emptyFields.push('title');
    }
    if (!load) {
        emptyFields.push('load');
    }
    if (!reps) {
        emptyFields.push('reps');
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all fields', emptyFields});
    }
    
    // add doc to DB
    try {
        const user_id = req.user._id;
        const workout = await Workout.create({title, load, reps, user_id});
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Delete a workout
const deleteWorkout = async(req, res) => {
    const { id } = req.params;
    try {
        console.log("Received ID:", id); // Log the received ID

        // Check if the id is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: 'Invalid workout ID.'})
        }

        const workout = await Workout.findOneAndDelete({_id: id});

        if (!workout){
            return res.status(400).json({error: 'Workout not found.'})
        }

        res.status(200).json(workout);


    } catch (error) {
        console.error("Error in deleteWorkout:", error);
        res.status(500).json({error: 'Server error.'});
    }

}

// Update workout
const updateWorkout = async (req, res) => {
    const { id } = req.params;
    try {
        console.log("Received ID:", id); // Log the received ID

        // Check if the id is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: 'Invalid workout ID.'})
        }

        const workout = await Workout.findOneAndUpdate({_id: id}, {
            ...req.body
        });

        if (!workout){
            return res.status(400).json({error: 'Workout not found.'})
        }

        res.status(200).json(workout);


    } catch (error) {
        console.error("Error in updateWorkout:", error);
        res.status(500).json({error: 'Server error.'});
    }
}


module.exports = {
    getWorkouts,
    getSingleWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}