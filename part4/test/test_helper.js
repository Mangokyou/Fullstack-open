const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "A Blog About Blogs",
    author: "Mr Blog",
    url: "blogaboutblogs.com",
    likes: 7,
  },
  {
  title: "The only blog needed",
  author: "Best Blogger",
  url: "onlyblog.com",
  likes: 11,
  },
  {
  title: "Blogging is easy",
  author: "The coolest Blogger",
  url: "easyblog.com",
  likes: 5,
  }
]


const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}