import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [user])

  useEffect(() => {
    const loggedUserJSON =
    window.localStorage.getItem(
        'loggedBlogappUser', JSON.stringify(user)
    )
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      setUser(user)
      setUsername('')
      setPassword('')

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
    } catch (exeption) {
      console.log('Wrong credentials')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
  }

  const addNewBlog = async (event) => {
    event.preventDefault()

    try {
      const newBlog = {
      title: title,
      author: author,
      url: url,
    }

    const blogObject = await blogService.create(newBlog)
    setBlogs([...blogs, blogObject])
    setTitle('')
    setAuthor('')
    setUrl('')
    } catch (exeption) {
    console.log('error adding new blog')
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

  const blogForm = () => (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addNewBlog}>
        <div>
          title: <input 
                  value={title} 
                  onChange={({ target }) => setTitle(target.value)}
                />
        </div>
        <div>
          author: <input 
                  value={author} 
                  onChange={({ target }) => setAuthor(target.value)}
                />
        </div>
        <div>
          url: <input 
                  value={url} 
                  onChange={({ target }) => setUrl(target.value)}
                />
        </div>
        <button type={"submit"}>Create</button>
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
            <button onClick={handleLogout}>logout</button>
          </div>
          {blogForm()}
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}  
        </div>}    
      </div>
    ) 
}

export default App