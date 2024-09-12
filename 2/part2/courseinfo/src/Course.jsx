import React from 'react'

const Header = ({ course }) => <h2>{course.name}</h2>

const Content = ({parts}) => {
    return (
      <div>
        {parts.map((part) => (
          <div key={part.id}>
            <p>
              {part.name} {part.exercises}
            </p>
          </div>
        ))}
      </div>
    )
  }

  const Total = ({parts}) => {
    const total = parts.reduce((sum, part) =>
      sum + part.exercises, 0)
    return (
      <div>
        <p>
          <strong>Total of {total} exercises</strong>
        </p>
      </div>
    )
  }

  const Course = ({ course }) => (
    <div>
      <Header course={course} />
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
  
  export default Course