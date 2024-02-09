require('dotenv').config();

const express = require('express');
const workoutRoutes = require('./routes/workouts');
const mongoose = require('mongoose');

// Express app;
const app = express();

// Middleware
app.use(express.json()); // checks for body

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Route handler and uses
app.use('/api/workouts/', workoutRoutes);

// Connecting to Database
// If connection fails see error
// Else Listen for requests
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Listen for requests
        app.listen(process.env.PORT, () =>{
            console.log('Connected to DB and Listening on port', process.env.PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    })


