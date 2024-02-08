const express = require('express');
const router = express.Router();

// GET all workouts
router.get('/', (req, res, next) => {
    res.json({msg: 'GET all workouts'});
});


// Get single workout
router.get('/:id', (req, res) => {
    res.json({msg: 'GET single workout'});
});

// POST new workout
router.post('/', (req, res) => {
    res.json({msg: 'POST new workout created'});
});

// DELETE workout
router.delete('/:id', (req, res) => {
    res.json({msg: 'DELETE a workout'});
});

// UPDATE workout
router.patch('/:id', (req, res) => {
    res.json({msg: 'Update workout'});
});

module.exports = router;