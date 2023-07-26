import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import { ErrorNotification, SuccessNotification } from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
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
    blogService.getAll().then(blogs => {
      setBlogs(sortByLikes(blogs))
    })
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

      console.log('App.js User object from login:', user)


      setUser(user)
      setUsername('')
      setPassword('')

      blogService.setToken(user.token)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      setSuccessMessage(`${user.username} logged in`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      console.log('error during login: ', exception)
      if (exception.response && exception.response.status === 401) {
        setErrorMessage('Wrong username or password')
      } else {
        setErrorMessage('An error occurred during login')
      }
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleUpdateLikes = async (blogToUpdate) => {
    try {
      const updatedBlog = {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 1
      }

      await blogService.update(blogToUpdate.id, updatedBlog)

      setBlogs((previousBlogs) =>
        previousBlogs.map((blog) =>
          blog.id === blogToUpdate.id ? {
            ...blog, likes: updatedBlog.likes
          } : blog))
    } catch (exception) {
      console.log('error updating blog: ', exception)
      setErrorMessage('error updating blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const removeBlog = async (blogIdToRemove) => {
    try {
      await blogService.remove(blogIdToRemove)
      setBlogs(blogs.filter((blog) => blog.id !== blogIdToRemove))
      setSuccessMessage('Blog removed successfully')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      console.log('error removing blog: ', exception)
      setErrorMessage('error removing blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  console.log('Blogs Array:', blogs)
  console.log('Logged-In User:', user)

  const handleLogout = async (event) => {
    event.preventDefault()

    try {
      window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)
      blogService.setToken(null)

    } catch (exception) {
      console.log('error in logging out')
    }

  }

  const addNewBlog = async (event) => {
    event.preventDefault()

    console.log('Form submitted')

    blogFormRef.current.toggleVisibility()

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
    } catch (exception) {
      console.log('error adding new blog')
      setErrorMessage('Error in adding new blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const blogFormRef = useRef()

  return (
    <div>
      <h2>Blogs</h2>
      <ErrorNotification message={errorMessage} />
      <SuccessNotification message={successMessage} />
      {!user &&
      <Togglable buttonLabel="log in">
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>}
      {user && <div>
        <div>
          <p>{user.username} logged in</p>
          <button onClick={handleLogout}>logout</button>
        </div>
        <Togglable id="new-blog-button" buttonLabel="new blog" ref={blogFormRef}>
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
      </div>}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} handleUpdateLikes={handleUpdateLikes} removeBlog={removeBlog}/>
      )}
    </div>
  )
}

export default App