const calculateBmi = (height : number, weight : number): string => {
  const bmi = weight / ((height/100) ** 2);

  if (bmi > 0 && bmi < 18.5) return 'Underweight';
  else if (bmi >= 18.5 && bmi < 25.0) return 'Normal range';
  else if (bmi >= 25.0 && bmi < 30.0) return 'Overweight';
  else if (bmi >= 30.0) return 'Obese';
  else throw new Error('Error in calculating BMI! Chekc input values')

}

console.log(calculateBmi(180, 74));