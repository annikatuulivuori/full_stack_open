const blogsRouter = require('express').Router()
const Blog =  require('../models/blog')

blogsRouter.get('/', (request, response) => {
	Blog.find({}).then(blog => {
		response.json(blog)
	})
})

blogsRouter.post('/', (request, response, next) => {
  const body = new Blog(request.body)

  if (body.title === undefined) {
    return response.status(400).json({ error: 'title missing' })
  }
  if (body.author === undefined) {
    return response.status(400).json({ error: 'author missing' })
  }
  if (body.url === undefined) {
    return response.status(400).json({ error: 'url missing' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  })

  blog
    .save()
    .then(savedBlog => {
      response.json(savedBlog)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter