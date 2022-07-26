import './App.css';

const Header =  ({course})  => <h1>{course}</h1>
const Total = ({parts}) => <p>Number of exercises <b>{parts.reduce((t,p) => t + p.exercises,0)}</b></p>
const Part = ({part}) => <p>{part.name} {part.exercises}</p>

const Content = ({parts}) => {
    return(
      <div>
        {parts.map(p => <Part key={p.name} part={p}/>)}
      </div>
    )
}
function App() {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]


  return(
    <div> 
      <Header course={course} />
      <Content parts={parts}/>
      <Total parts={parts} />
    </div>
  );
}

export default App;
