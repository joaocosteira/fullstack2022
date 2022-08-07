import './App.css';
import { CoursePart, CoursePartBase } from './types';
import courseParts from './data/courseParts';


const PartBase = ({ part } : { part : CoursePartBase }) : JSX.Element => (
  <>
    <h3>{part.name} {part.exerciseCount}</h3>
  </>
)

const Part = ({ part } : { part : CoursePart}) : JSX.Element => {
  return(
    <>
      <PartBase part={part} />
      {(()=>{
        switch(part.type){
          case("normal"):
            return <p><i>{part.description}</i></p>
          case("groupProject"):
            return <p>project exercises {part.groupProjectCount}</p>
          case("submission"):
            return(
              <>
                <p><i>{part.description}</i></p>
                <p>submit to <a href={part.exerciseSubmissionLink} target="blank">{part.exerciseSubmissionLink}</a></p>
              </>)
          case("special"):
          return(
            <>
              <p><i>{part.description}</i></p>
              <p>required skills: {part.requirements.join(', ')}</p>
            </>)
        }
      })()}
    </>
  )
}

const Header = ({courseName} : { courseName : string }) : JSX.Element => <h1>{courseName}</h1>

const Total = ( { courseParts } : { courseParts : CoursePart []} ) : JSX.Element =>(
  <p>
    Number of exercises{" "}
    {courseParts.reduce((carry : number, part : CoursePart) => carry + part.exerciseCount, 0)}
  </p>
)

const Content = ({ courseParts } : {courseParts : CoursePart [] }) : JSX.Element => (
  <>
    { courseParts.map( part => <Part key={part.name} part={part} />)}
  </>
)

function App() {
  const courseName = "Half Stack application development";
  return (
    <div className="App">
      <Header courseName={courseName}/>
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
}

export default App;
