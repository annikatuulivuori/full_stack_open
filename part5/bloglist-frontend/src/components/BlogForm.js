const BlogForm = ({ 
  addNewBlog,
  title, setTitle, 
  author, setAuthor, 
  url, setUrl, }) => {
    return (
      <div>
        <h2>Create new</h2>
        <form onSubmit={addNewBlog}>
          <div>
            title: <input 
                value={title} 
                onChange={setTitle}
            />
          </div>
          <div>
            author: <input 
                value={author} 
                onChange={setAuthor}
            />
          </div>
          <div>
            url: <input 
                value={url} 
                onChange={setUrl}
            />
          </div>
          <button type="submit">Create</button>
        </form>
    </div>
  )
}

export default BlogForm