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

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  const likesByAuthor = blogs.reduce((likes, blog) => {
    likes[blog.author] = (likes[blog.author] || 0) + blog.likes
    return likes
  }, {})

  const topAuthor = Object.entries(likesByAuthor).reduce((max, [author, likes]) => {
    if (likes > max.likes) return { author, likes }
    return max
  }, { author: '', likes: -1 })

  return {
    author: topAuthor.author,
    likes: topAuthor.likes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}