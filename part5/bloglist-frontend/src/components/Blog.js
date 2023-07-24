import { useState } from 'react'
import './../index.css'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const handleDetailToggle = () => {
    setShowDetails(!showDetails)
  }

  const handleLike = async () => {
    try {
      const updatedBlog = {
        ...blog,
        likes: blog.likes + 1
      }
      
      await blogService.update(blog.id, updatedBlog)
    } catch (exeption) {
      console.log('error updating likes (/components/Blog.js):', exeption)
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
        </div>}
    </div>
  )
   
}

export default Blog