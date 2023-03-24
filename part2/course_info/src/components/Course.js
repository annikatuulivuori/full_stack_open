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
      <div>
        <h1>
          {course.name}
        </h1>
        <div>
          {course.course}
        </div>
      </div>
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
          <Part key={part.id} part={part}/>
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
        <p>
          <strong>total of {total} exercises</strong>
        </p>
      </div>
    )
  }

  export default Course