import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [user])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')

      blogService.setToken(user.token)
    } catch (exeption) {
      console.log('Wrong credentials')
    }
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
          </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
    
  return (
      <div>
        {!user && loginForm()}
        {user && <div>
          <h2>Blogs</h2>
          <div>
            <p>{user.username} logged in</p>
          </div>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}  
        </div>}      
      </div>
    ) 
}

export default App