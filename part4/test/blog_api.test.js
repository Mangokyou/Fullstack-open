const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('Blogs are returned as json and have the correct length', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('Blogs unique identifiert is named id', async () => {
  const response = await api.get('/api/blogs')
  const blog = response.body[0]

  assert.ok(blog.id)
  assert.ok(!blog._id)
})

test('Adding a blog is possible and is saved correctly', async () => {
  const newBlog = {
    title: "The newly added Blog",
    author: "New author",
    url: "newblog.com",
    likes: 2,
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  const blog = response.body
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
  assert.ok(blog.id && blog.title && blog.author && blog.likes && blog.url)
})

test('Adding a blog without a like property will default 0 likes', async () => {
  const newBlog = {
  title: "The newly added Blog",
  author: "New author",
  url: "newblog.com",
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blog = response.body
  assert.strictEqual(0, blog.likes)

})

test('Adding a blog without a title property will result in status 400 Bad Request', async () => {
  const newBlog = {
  author: "New author",
  url: "newblog.com",
  likes: 2,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('Adding a blog without a url property will result in status 400 Bad Request', async () => {
  const newBlog = {
  title: "The newly added Blog",
  author: "New author",
  likes: 2,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})






after(async () => {
  await mongoose.connection.close()
})