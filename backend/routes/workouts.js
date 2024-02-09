const express = require('express');
const {
    getWorkouts,
    getSingleWorkout,
    createWorkout,
} = require('../controllers/workoutController')

const router = express.Router();

// GET all workouts
router.get('/', getWorkouts);

// Get single workout
router.get('/:id', getSingleWorkout);

// POST new workout
router.post('/', createWorkout)
// DELETE workout
router.delete('/:id', (req, res) => {
    res.json({msg: 'DELETE a workout'});
});

// UPDATE workout
router.patch('/:id', (req, res) => {
    res.json({msg: 'Update workout'});
});

module.exports = router;