import { useState } from 'react'
import './../index.css'

const Blog = ({ blog, user, handleUpdateLikes, handleRemove }) => {
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

  const canBeRemoved = user && user.username === blog.user.username

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
        {canBeRemoved && (
          <button onClick={() => handleRemove(blog)}>remove</button>)}
      </div>}
    </div>
  )

}

export default Blog