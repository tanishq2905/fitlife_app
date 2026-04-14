import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [workouts, setWorkouts] = useState([]);
  const [form, setForm] = useState({
    name: '',
    reps: '',
    weight: ''
  });

  const fetchWorkouts = async () => {
    const res = await axios.get('/api/workouts');
    setWorkouts(res.data);
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/workouts', form);
    setForm({ name: '', reps: '', weight: '' });
    fetchWorkouts();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>FitLife</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Exercise"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Reps"
          value={form.reps}
          onChange={(e) => setForm({ ...form, reps: e.target.value })}
        />
        <input
          placeholder="Weight"
          value={form.weight}
          onChange={(e) => setForm({ ...form, weight: e.target.value })}
        />
        <button>Add</button>
      </form>

      <h2>Workouts</h2>
      {workouts.map((w) => (
        <div key={w._id}>
          {w.name} — {w.reps} reps @ {w.weight}kg
        </div>
      ))}
    </div>
  );
}

export default App;
