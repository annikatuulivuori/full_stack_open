
require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())



const Blog =  require('./models/blog')

app.get('/api/blogs', (request, response) => {
	Blog.find({}).then(blog => {
		response.json(blog)
	})
})

app.post('/api/blogs', (request, response, next) => {
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

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})