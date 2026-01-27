const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const emptyBlogList = []

const oneBlogList = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
]

const manyBlogList = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

describe('dummy test', () => {
  test('dummy returns one', () => {
    const blogs = []
  
    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
  })
})


describe('total likes',() => {

  test('when list of blogs is empty', () => {
    const result = listHelper.totalLikes(emptyBlogList)
    assert.strictEqual(result, null)
  })


  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(oneBlogList)
    assert.strictEqual(result, 7)
  })

  test('when list has many blogs, equals the likes of that', () => {
    const result = listHelper.totalLikes(manyBlogList)
    assert.strictEqual(result, 36)
  })

})

describe('most popular blog', () => {

  test('when list of blogs is empty', () => {
    const result = listHelper.favoriteBlog(emptyBlogList)
    assert.strictEqual(result, null)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.favoriteBlog(oneBlogList)
    assert.deepStrictEqual(result, {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  })
  })

  test('when list has many blogs, equals the likes of that', () => {
    const result = listHelper.favoriteBlog(manyBlogList)
    assert.deepStrictEqual(result, {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  })
  })
})


describe('author with most blogs', () => {

  test('when list of blogs is empty', () => {
    const result = listHelper.mostBlogs(emptyBlogList)
    assert.strictEqual(result, null)
  }) 

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.mostBlogs(oneBlogList)
    assert.deepStrictEqual(result, {author: "Michael Chan", blogs: 1 })
  })

  test('when list has many blogs, equals the likes of that', () => {
    const result = listHelper.mostBlogs(manyBlogList)
    assert.deepStrictEqual(result, {author: "Robert C. Martin", blogs: 3})
  })

})

describe('author with most likes across all blogs', () => {

  test('when list of blogs is empty', () => {
    const result = listHelper.mostLikes(emptyBlogList)
    assert.strictEqual(result, null)
  }) 

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.mostLikes(oneBlogList)
    assert.deepStrictEqual(result, {author: "Michael Chan", likes: 7 })
  })

  test('when list has many blogs, equals the likes of that', () => {
    const result = listHelper.mostLikes(manyBlogList)
    assert.deepStrictEqual(result, {author: "Edsger W. Dijkstra", likes: 17})
  })

})