const express = require('express');

const {
    getWorkouts,
    getSingleWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController')

// protects routes, need auth to see data
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();
router.use(requireAuth);

// GET all workouts
router.get('/', getWorkouts);

// Get single workout
router.get('/:id', getSingleWorkout);

// POST new workout
router.post('/', createWorkout)

// DELETE workout
router.delete('/:id', deleteWorkout);

// UPDATE workout
router.patch('/:id', updateWorkout);

module.exports = router;