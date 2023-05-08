const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <>
    {courses.map(course => <Course key={course.id} course={course}/>)}
    </>
  )
}

const Course = ({ course }) => {

  return (
    <div>
      <Header title={course.name} />
      <Content parts={course.parts} />
    </div>
  )
}


const Header = ({ title }) => {

  return (
    <header>
      <h1>{title}</h1>
    </header>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => <Part key={part.id} part={part} />)}
      <Aggregations parts={parts} />
    </div>
  )
}

const Aggregations = ({ parts }) => {
  const totalExercises = parts.map(part => part.exercises)
    .reduce((prev, curr) => prev + curr, 0);

  return (
    <div>
      <h4>Total exercises: {totalExercises}</h4>
    </div>
  )
}

const Part = ({ part }) => {
  return (
    <div>
      <h3>
        {part.name}
      </h3>
      <p>Exercises: {part.exercises}</p>
      <hr></hr>
    </div>
  )
}

export default App