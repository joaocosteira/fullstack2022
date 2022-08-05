interface ExerciseReceipt { 
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

interface Rating {
    rating : number,
    ratingDescription : string
}

interface ExerciseValues {
    dailyExercise: Array<number>;
    target: number;
}

const parseExerciseArguments = (args: Array<string>): ExerciseValues => {

    if (args.length < 4) throw new Error('Not enough arguments');
    
    const daily = process.argv.slice(2,).map(Number);
    const target = daily.shift();

    if (daily.every(n => !isNaN(n)) && target && !isNaN(target)) {
      return {
        dailyExercise: daily,
        target: target
      };
    } else {
      throw new Error('Provided values were not numbers!');
    }

};

const zeroOneTwo = () : number => Math.round(Math.random() * 2);
const descs = ['not too bad but could be better', 'pretty good', 'you did great!'];

const generateRating = () : Rating => {

    const randRating = zeroOneTwo();

    return(
        {
            rating : randRating + 1,
            ratingDescription : descs[randRating]
        }
    );
};

export const exerciseCalculator = (dailyExercise : Array<number> , target : number ) : ExerciseReceipt => {

    const periodLength = dailyExercise.length;
    const average = dailyExercise.reduce((t,d) => t+d , 0) / periodLength;
    const { rating, ratingDescription } = generateRating();

    return({
        periodLength,
        trainingDays : dailyExercise.reduce((t,d) => d ? t + 1 : t, 0),
        success : average >= target,
        target,
        average,
        rating,
        ratingDescription
    });

};

//console.log(exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1],2))


try {
    
    const { dailyExercise, target } = parseExerciseArguments(process.argv);
    console.log(exerciseCalculator(dailyExercise, target));

  } catch (error: unknown) {

    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);

}


