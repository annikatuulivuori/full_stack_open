import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import { ErrorNotification, SuccessNotification } from './components/Notification'
import BlogForm from './components/BlogForm.js'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(sortByLikes(blogs))
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

  const sortByLikes = (blogs) => {
    return blogs.sort((a, b) => b.likes - a.likes)
  }

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

      setSuccessMessage(`${user.username} logged in`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)

      blogService.setToken(user.token)
    } catch (exeption) {
      console.log('Wrong credentials')
      setErrorMessage('wrong username or password ')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    try {
      window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)
      blogService.setToken(null)

    } catch (exeption) {
      console.log('error in logging out')
    }
    
  }

  const addNewBlog = async (event) => {
    event.preventDefault()

    console.log("Form submitted")

    try {
      const newBlog = {
        title: title,
        author: author,
        url: url,
      }
      console.log('New Blog Data:', newBlog)

      const blogObject = await blogService.create(newBlog)
      console.log('Response from backend:', blogObject)
      setBlogs([...blogs, blogObject])

      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs)

      setSuccessMessage(`new blog ${title} by ${author} added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)

      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exeption) {
      console.log('error adding new blog')
      setErrorMessage('Error in adding new blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
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
        <ErrorNotification message={errorMessage} />
        <SuccessNotification message={successMessage} />
        {!user && loginForm()}
        {user && <div>
          <h2>Blogs</h2>
          <div>
            <p>{user.username} logged in</p>
            <button onClick={handleLogout}>logout</button>
          </div>
          <Togglable buttonLabel="new blog">
            <BlogForm
              onSubmit={addNewBlog}
              title={title}
              setTitle={setTitle}
              author={author}
              setAuthor={setAuthor}
              url={url}
              setUrl={setUrl}
            />
          </Togglable>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}  
        </div>}    
      </div>
    ) 
}

export default App