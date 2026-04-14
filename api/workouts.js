import mongoose from 'mongoose';

const MONGO_URI = "YOUR_MONGODB_ATLAS_URL";

// connect once
if (!mongoose.connections[0].readyState) {
  mongoose.connect(MONGO_URI);
}

// model
const Workout = mongoose.models.Workout || mongoose.model('Workout', {
  name: String,
  reps: Number,
  weight: Number,
});

// handler
export default async function handler(req, res) {
  if (req.method === 'GET') {
    const workouts = await Workout.find();
    return res.status(200).json(workouts);
  }

  if (req.method === 'POST') {
    const workout = await Workout.create(req.body);
    return res.status(201).json(workout);
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
