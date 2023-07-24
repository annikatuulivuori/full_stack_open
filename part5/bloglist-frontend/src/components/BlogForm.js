const BlogForm = ({ 
  onSubmit,
  title, setTitle, 
  author, setAuthor, 
  url, setUrl, }) => {
    const handleTitleChange = (event) => {
      setTitle(event.target.value);
    }
  
    const handleAuthorChange = (event) => {
      setAuthor(event.target.value);
    }
  
    const handleUrlChange = (event) => {
      setUrl(event.target.value);
    }

    return (
      <div>
        <h2>Create new</h2>
        <form onSubmit={onSubmit}>
          <div>
            title: <input 
                value={title} 
                onChange={handleTitleChange}
            />
          </div>
          <div>
            author: <input 
                value={author} 
                onChange={handleAuthorChange}
            />
          </div>
          <div>
            url: <input 
                value={url} 
                onChange={handleUrlChange}
            />
          </div>
          <button type="submit">Create</button>
        </form>
    </div>
  )
}

export default BlogForm