import './App.css';
import courses from './data/courses';
import Course from './components/Course';

const App = () => {

  return (
    <div>
      { courses.map(c => <Course key={c.id} course={c} />) }
    </div>
  )
}

export default App;
