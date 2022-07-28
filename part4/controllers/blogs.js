const blogsRouter = require('express').Router();
const Blog = require('../models/blog')


/* blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
})
  
blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
        response.status(201).json(result)
        })
}) */

blogsRouter.get('/', async (request, response) => {

  const blogs = await Blog.find({});
  response.json(blogs);

})
  
blogsRouter.post('/', async (request, response) => {

    const blog = new Blog( { ...request.body , likes : request.body.likes || 0 })

    try{
      await blog.save();
      response.status(201).json(blog)
    }catch(e){ response.status(400).end() }

  })

module.exports = blogsRouter