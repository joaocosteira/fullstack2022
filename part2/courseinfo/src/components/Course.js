export const Header = ({ course }) => <h1>{course}</h1>

export const Total = ({ sum }) => <p><b>Number of exercises {sum}</b></p>

export const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

export const Content = ({ parts }) => <>{parts.map( p => <Part key={p.id} part={p} />)}</>

const Course = ({course}) =>(
  <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={course.parts.reduce((t,c)=> t + c.exercises,0)} />
  </div>
)

export default Course;