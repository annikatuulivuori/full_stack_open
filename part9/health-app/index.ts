import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  const heightNumber = Number(height);
  const weightNumber = Number(weight);

  if (isNaN(heightNumber) || isNaN(weightNumber)) {
    res.status(400).json({ error: 'malformatted parameters' });
  } else {
    const bmi = calculateBmi(heightNumber, weightNumber);
    res.json({ height: heightNumber, weight: weightNumber, bmi });
  }
  
});

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body as { daily_exercises: number[], target: number };

  if (!daily_exercises || !target) {
    res.status(400).json({ error: 'parameters missing' });
  }
  if (!Array.isArray(daily_exercises) || daily_exercises.some((hours) => isNaN(hours)) || isNaN(target)) {
    res.status(400).json({ error: 'malformatted parameters' });
  }

  const exercises = calculateExercises(daily_exercises, target);
  res.json({
    periodLength: exercises.periodLength,
    trainingDays: exercises.trainingDays,
    success: exercises.success,
    rating: exercises.rating,
    ratingDescription: exercises.ratingDescription,
    target: exercises.target,
    average: exercises.average,
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});