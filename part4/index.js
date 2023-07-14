const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')

const url = `mongodb+srv://annika:<password>@cluster0.ypixfhw.mongodb.net/blogApp?retryWrites=true&w=majority`
mongoose.set('strictQuery', false)
mongoose.connect(url)

app.use(cors())
app.use(express.json())

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog =  mongoose.model('Blog', blogSchema)

app.get('/api/blogs', (request, response) => {
	Blog.find({}).then(blog => {
		response.json(blog)
    mongoose.connection.close()
	})
})

app.post('/api/blogs', (request, response) => {
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
})

const PORT = process.env.PORT ||3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})