import mongoose from 'mongoose';

const MONGO_URI = "your_mongodb_connection_string";

if (!mongoose.connections[0].readyState) {
  mongoose.connect(MONGO_URI);
}

const Workout = mongoose.models.Workout || mongoose.model('Workout', {
  name: String,
  reps: Number,
  weight: Number,
});

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const workouts = await Workout.find();
    return res.status(200).json(workouts);
  }

  if (req.method === 'POST') {
    const workout = await Workout.create(req.body);
    return res.status(201).json(workout);
  }

  res.status(405).json({ message: 'Method not allowed' });
}
