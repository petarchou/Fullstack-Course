const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
   exercises: 10,
  }
  const part2 = {
    name: 'Using props to pass data',
   exercises: 7,
  }
  const part3 = {
    name: 'State of a component',
   exercises: 14,
  }

  const totalExercises = part1.exercises + part2.exercises + part3.exercises;

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3}/>
      <Total exercises={totalExercises}/>
    </div>
  )
}

const Header = (props) => (
  <>
  <h1>{props.course}</h1>
  </>
);
const Content = (props) => {
  console.log(props);
  return(
  <>
  <Part info={props.part1} />
  <Part info={props.part2} />
  <Part info={props.part3} />
  </>)
}

const Part = (props) => {
  return (
    <p>
      {props.info.name} {props.info.exercises}
    </p>
  )
}

const Total = (props) => {
  return (
   <>
    <p>Number of exercises: {props.exercises}</p>
    </>
  );
}

export default App