const App = () => {
  const course = 'Half Stack application development'
  const parts =[{
    name: 'Fundamentals of React',
   exercises: 10,
  },
  {
    name: 'Using props to pass data',
   exercises: 7,
  },
  {
    name: 'State of a component',
   exercises: 14,
  }];


  return (
    <div>
      <Header course={course} />
      <Content parts={parts}/>
      <Total parts={parts}/>
    </div>
  )
}

const Header = (props) => (
  <>
  <h1>{props.course}</h1>
  </>
);
const Content = ({parts}) => {
  return(
  <>
  {parts.map(part => (
    <Part key={part.name} info={part}/>
  ))}
  </>)
}

const Part = ({info}) => {
  return (
    <p>
      {info.name} {info.exercises}
    </p>
  )
}

const Total = ({parts}) => {
  const totalExercises = parts.map(x => x.exercises).reduce((prev,curr) => prev+curr,0);
  return (
   <>
    <p>Number of exercises: {totalExercises}</p>
    </>
  );
}

export default App