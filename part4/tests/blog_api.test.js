const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})

test('the unique indetifier property is named id', async () => {
  const response = await api.get('/api/blogs')

  response.body.forEach((blog) => {
    expect(blog.id).toBeDefined()
    expect(blog._id).toBeUndefined()
  })
})

test('POST, new blog post', async () => {
    const testBlog = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  }

  const blogsLengthBefore = (await Blog.find({})).length

  const response = await api
    .post('/api/blogs')
    .send(testBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(response.body).toMatchObject(testBlog)

  const blogsLengthAfter = (await Blog.find({})).length
  expect(blogsLengthAfter).toBe(blogsLengthBefore + 1)
})

afterAll(async () => {
  await mongoose.connection.close()
})