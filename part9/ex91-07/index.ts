import express from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});


app.get('/bmi', (req,res) => {

    const { weight, height } = req.query;

    console.log("weight",weight)
    console.log("height",height)

    if( weight && height && !isNaN(Number(weight)) && !isNaN(Number(height))){
        
        res.send({
            height,
            weight,
            bmi : calculateBmi(Number(height),Number(weight))
        })
    }else{
        res.status(400).send({
            error: "malformatted parameters"
          })
    }
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});