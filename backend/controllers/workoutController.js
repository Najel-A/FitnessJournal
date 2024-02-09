const Workout = require('../models/workoutModel')
const mongoose = require('mongoose');

// Get all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1}); // Empty bracket gets all workouts
    res.status(200).json(workouts);
}

// Get single workout
const getSingleWorkout = async (req, res) => {
    const { id } = req.params.id;
    const workout = await Workout.find({id});
    
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Workout does not exist.'})
    }

    // Breaks function if not found
    if (!workout){
        return res.status(404).json({error: 'Does not exist.'})
    }

    console.log(workout);
    res.status(200).json(workout);
}

// Create new workout
const createWorkout = async(req, res) => {
    const {title, load, reps} = req.body;
    
    // add doc to DB
    try {
        const workout = await Workout.create({title, load, reps});
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Delete a workout


// Update workout

module.exports = {
    getWorkouts,
    getSingleWorkout,
    createWorkout,
}