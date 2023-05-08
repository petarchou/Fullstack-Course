const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
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
      }
    ]
  }

  return <Course course={course} />
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