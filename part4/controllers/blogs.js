const blogsRouter = require('express').Router()
const Blog =  require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  console.log(blog)

  response.json(blog)
})

blogsRouter.post('/', async (request, response) => {
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
    likes: body.likes || 0,
  })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
  const { likes } = request.body
  const { id } = request.params

  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    { $set: { likes } },
    { new: true }
  )

  if (updatedBlog) {
    response.status(200).json(updatedBlog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter