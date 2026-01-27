const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) return null
  return blogs.reduce((sum, item) => sum + (item.likes || 0), 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null
   const max = blogs.reduce((prev, current) =>
    (prev.likes > current.likes) ? prev : current
  )
  return max
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null
  const counts = _.countBy(blogs, 'author')
  const authors = _.map(counts, (blogCount, author) => ({author, blogs: (blogCount) }))
  return _.maxBy(authors, 'blogs')
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null
  const authors = _.groupBy(blogs, 'author')
  const authorLikes = _.map(authors, (authorBlogs, author) => ({
    author,
    likes: _.sumBy(authorBlogs, blog => blog.likes || 0)
  }))
  return _.maxBy(authorLikes, 'likes')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}