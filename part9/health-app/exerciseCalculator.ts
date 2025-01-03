interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string
  target: number,
  average: number
}

enum Rating {
  OK = 1,
  GOOD = 2,
  GREAT = 3
}

enum Description {
  OK = "You can do better!",
  GOOD = "You did good!",
  GREAT = "You are awesome!" 
}

const calculateRating = (average: number, dailyGoal: number): Rating => {
  const ratio = average / dailyGoal;

  if (ratio >= 1) return Rating.GREAT;
  else if (ratio >= 0.8) return Rating.GOOD;
  else return Rating.OK;
};

const getDescription = (rating: number): Description => {
  if (rating == 3) return Description.GREAT;
  else if (rating == 2) return Description.GOOD;
  else return Description.OK;
};

const calculateExercises = (dailyExerciseHours: number[], dailyGoal: number): Result => {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.reduce((accumulator, currentValue) => {
    if (currentValue != 0) {
      accumulator += 1;
    }
    return accumulator;
  },0);
  const success = dailyExerciseHours.every(hours => hours >= dailyGoal);
  const average =  dailyExerciseHours.reduce((sum, currentValue) => sum + currentValue, 0) / dailyExerciseHours.length;
  const rating = calculateRating(average, dailyGoal);
  const ratingDescription = getDescription(rating);
  const target = dailyGoal;

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

try {
  const dailyGoal: number = Number(process.argv[2]);
  const dailyExerciseHours: number[] = process.argv.slice(3).map(arg => Number(arg));

  console.log(calculateExercises(dailyExerciseHours, dailyGoal));
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log("Error: " + error.message);
  }
}