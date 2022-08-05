interface BmiValues {
    height_cm: number;
    weight_kg: number;
  }
  
  const parseBmiArguments = (args: Array<string>): BmiValues => {

    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        height_cm: Number(args[2]),
        weight_kg: Number(args[3])
      }
    } else {
      throw new Error('Provided values were not numbers!');
    }

  }
  
export const calculateBmi = (height_cm : number , weight_kg : number) : string => {

    const bmi = weight_kg / (height_cm / 100) ** 2

    switch(true){
        case bmi < 15 :
            return "You're underweight"
        case bmi >= 15 && bmi < 25 :
            return "You're normal weight"
        case bmi >= 25 && bmi < 30:
            return "You're overweight"
        case bmi >= 30:
            return "You're obese"
        default:
          return "Something went wrong..."

    }
}

  
  try {
    
    const { height_cm, weight_kg } = parseBmiArguments(process.argv);
    console.log(calculateBmi(height_cm, weight_kg));

  } catch (error: unknown) {

    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);

}