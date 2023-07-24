import { useState } from 'react'
import './../index.css'

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const handleDetailToggle = () => {
    setShowDetails(!showDetails)
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
          <p>Likes: {blog.likes}</p><button>like</button>
          <p>By user: {blog.user.username}</p>
        </div>}
    </div>
  )
   
}

export default Blog