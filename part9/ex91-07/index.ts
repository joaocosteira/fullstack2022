import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { exerciseCalculator } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});


app.get('/bmi', (req,res) => {

    const { weight, height } = req.query;

    console.log("weight",weight);
    console.log("height",height);

    if( weight && height && !isNaN(Number(weight)) && !isNaN(Number(height))){
        
        res.send({
            height,
            weight,
            bmi : calculateBmi(Number(height),Number(weight))
        });
    }else{
        res.status(400).send({
            error: "malformatted parameters"
          });
    }
});

app.post("/exercises", (req,res) => {

    const { daily_exercises , target } = req.body;

 
    const validArguments =  target && 
                            daily_exercises && 
                            !isNaN(Number(target)) && 
                            Array.isArray(daily_exercises) &&
                            daily_exercises.every( d => !isNaN(Number(d)));

    switch(true){
        case(!target || !daily_exercises):
            res.status(400).send({
                error: "parameters missing"
            });
            break;
        case(validArguments):
            res.send(exerciseCalculator(daily_exercises.map(Number),Number(target)));
            break;
        default:
            res.status(400).send({
                error: "malformatted parameters"
              });
    }

});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});