import './App.css';

interface CoursePart { 
  name : string, 
  exerciseCount : number
}

const Header = ({courseName} : { courseName : string }) : JSX.Element => <h1>{courseName}</h1>
const Content = ({name , exerciseCount} : CoursePart) : JSX.Element => <p>{name} {exerciseCount}</p>
const Total = ( { courseParts } : { courseParts : CoursePart []} ) : JSX.Element =>(
  <p>
    Number of exercises{" "}
    {courseParts.reduce((carry : number, part : CoursePart) => carry + part.exerciseCount, 0)}
  </p>
)

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header courseName={courseName}/>
      { courseParts.map( c => <Content key={c.name} name={c.name} exerciseCount={c.exerciseCount} />)}
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;
