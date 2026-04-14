const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// connect DB
mongoose.connect('mongodb://127.0.0.1:27017/fitlife');

// model
const Workout = mongoose.model('Workout', {
  name: String,
  reps: Number,
  weight: Number,
});

// routes
app.post('/workouts', async (req, res) => {
  const workout = await Workout.create(req.body);
  res.json(workout);
});

app.get('/workouts', async (req, res) => {
  const workouts = await Workout.find();
  res.json(workouts);
});

app.listen(5000, () => console.log('Server running on port 5000'));
