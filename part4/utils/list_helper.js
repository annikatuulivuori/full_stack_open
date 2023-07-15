const dummy = (blogs) => {
  return 1
}

module.exports = {
  dummy
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  return blogs.reduce((max, blog) => (blog.likes > max.likes ? blog : max))
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const numOfBlogs = blogs.reduce((counts, blog) => {
    counts[blog.author] = (counts[blog.author] || 0) + 1
    return counts
  }, {})

  const topAuthor = Object.entries(numOfBlogs).reduce((max, [author, count]) => {
    if (count > max.count) return { author, count }
    return max
  }, { author: '', count: -1 })

  return {
    author: topAuthor.author,
    blogs: topAuthor.count
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}