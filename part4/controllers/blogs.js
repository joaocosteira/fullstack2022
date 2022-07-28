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



blogsRouter.delete('/:id', async (request, response) => {

  try{
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  }catch(error){
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else {
      return response.status(400).json({ error: error.message })
    }
  }

})


blogsRouter.put('/:id', async (request, response) => {
  
  try{

    const updatedPerson = await Blog.findByIdAndUpdate(
      request.params.id, 
      request.body, 
      { new: true, runValidators: true, context: 'query' }
    )
    response.json(updatedPerson)
  }catch(error){
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else {
      return response.status(400).json({ error: error.message })
    }
  }
})


module.exports = blogsRouter