import { useState } from 'react'
import './../index.css'

const Blog = ({ blog, user, handleUpdateLikes, removeBlog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const handleDetailToggle = () => {
    setShowDetails(!showDetails)
  }

  const handleLike = async () => {
    try {
      await handleUpdateLikes(blog)
    } catch (exeption) {
      console.log('error updating likes (/components/Blog.js):', exeption)
    }
  }

  const handleRemove = async () => {
    if (window.confirm(`Remove "${blog.title}" by ${blog.author}?`)) {
      removeBlog(blog.id)
    }
  }

  return (
    <div className="blogStyle">
      <div>
        {blog.title} by {blog.author}
        <button onClick={handleDetailToggle}>
          {showDetails ? 'hide' : 'view'}
        </button>
      </div>
      {showDetails && <div>
        <p>URL: {blog.url}</p>
        <p>Likes: {blog.likes}</p><button onClick={handleLike}>like</button>
        <p>By user: {blog.user.username}</p>
        {blog.user.username === user.username && (
          <button onClick={handleRemove}>remove</button>)}
      </div>}
    </div>
  )

}

export default Blog