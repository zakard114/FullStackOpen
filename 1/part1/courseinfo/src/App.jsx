import React from 'react'


const Header = (props) => <h1>{props.name}</h1>

const Content = (props) => {
  return (
    <div>
      {props.parts.map((part) => (
        <div key={part.name}>
          <p>
            {part.name} {part.exercises}
          </p>
        </div>
      ))}
    </div>
  )
}

const Total = (props) => {
  let total = 0
  props.parts.forEach(part => {
    total += part.exercises
  })
  return (
    <div>
      <p>
        Number of exercises {total}
      </p>
    </div>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }
  
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App