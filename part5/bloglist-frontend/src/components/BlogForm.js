import PropTypes from 'prop-types'

const BlogForm = ({
  onSubmit,
  title, setTitle,
  author, setAuthor,
  url, setUrl, }) => {
  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={onSubmit}>
        <div>
            title: <input id='title'
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
            author: <input id='author'
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
            url: <input id='url'
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <button id="create-blog-button" type="submit">Create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  author: PropTypes.string.isRequired,
  setAuthor: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  setUrl: PropTypes.func.isRequired
}

export default BlogForm