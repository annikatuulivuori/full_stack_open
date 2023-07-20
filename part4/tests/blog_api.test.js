const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

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

  await Blog.insertMany(initialBlogs)
})

describe('initial blogs saved', () => {
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
})

describe('addition of a new blog post', () => {
  let token = null

  beforeAll(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('1234', 10)
    const user = await new User({ username: 'username', passwordHash }).save()

    const testUser = { username: 'testUser', id: user.id }
    token = jwt.sign(testUser, process.env.SECRET)
    return token
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
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toMatchObject(testBlog)

    const blogsLengthAfter = (await Blog.find({})).length
    expect(blogsLengthAfter).toBe(blogsLengthBefore + 1)
  })

  test('POST, new blog has zero likes', async () => {
    const testBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html'
    }

    const response = await api
      .post('/api/blogs')
      .send(testBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    console.log(await Blog.find({}))
    expect(response.body.likes).toBe(0)
  })

  test('POST, new blog with missing tittle returns 400 Bad request', async () => {
    const testBlog = {
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12
    }

    await api
      .post('/api/blogs')
      .send(testBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)
  })

  test('POST, new blog with missing url returns 400 Bad request', async () => {
    const testBlog = {
      title: 'Edgar W. Dijkstra',
      author: 'Edsger W. Dijkstra',
      likes: 12
    }

    await api
      .post('/api/blogs')
      .send(testBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)
  })

  test('PUT, update likes of one post', async () => {
    const blogsBeforeUpdate = await Blog.find({})
    const blogToUpdate = blogsBeforeUpdate[0]
    const updatedLikes = Math.floor(Math.random() * 21)

    const response = await api
      .put(`/api/blogs/${blogToUpdate._id}`)
      .send({ likes: updatedLikes })
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAfterUpdate = await Blog.find({})

    const updatedPost = blogsAfterUpdate[0]
    expect(updatedPost.likes).toBe(updatedLikes)
    expect(response.body.likes).toBe(updatedLikes)
  })
})

describe('deletion of post', () => {
  let token = null
  let testUser = null

  beforeAll(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('1234', 10)
    const user = await new User({ username: 'username', passwordHash }).save()

    testUser = { username: 'testUser', id: user.id }
    token = jwt.sign(testUser, process.env.SECRET)
    return token
  })
  test('DELETE, remove specific blog post', async () => {
    const blogsBeforeDelete = await Blog.find({})
    const blogToDelete = blogsBeforeDelete[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAfterDelete = await Blog.find({})

    expect(blogsAfterDelete.length).toBe(blogsBeforeDelete.length - 1)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})