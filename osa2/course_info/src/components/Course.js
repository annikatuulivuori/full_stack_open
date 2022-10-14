const Course = ({ course }) => {
  return (
      <div>
          <Header course={course}/>
          <Content parts={course.parts}/>
          <Total parts={course.parts}/>
      </div>
  )
}

const Header = ({ course }) => {
  return (
      <h2>{course.name}</h2>
  )
}

const Part = ({ part }) => {
  return (
    <div>
      <p>
        {part.name} {part.exercises}
      </p>
    </div>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part =>
        <Part key={part.id} part={part} />
      )}
    </div>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => {
    return sum + part.exercises
  }, 0)
  return (
    <div>
      <strong>total of {total} exercises</strong>
    </div>
  )
}


export default Course