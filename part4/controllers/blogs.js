const blogsRouter = require('express').Router();
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const {userExtractor} = require('../utils/middleware');
const { findById } = require('../models/blog');

blogsRouter.get('/', async (request, response) => {

  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);

})

blogsRouter.get('/:id', async (request, response) => {

  const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 });
  response.json(blog);

})


/* const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
} */
  
blogsRouter.post('/', userExtractor ,async (request, response,next) => {

  
  const body = request.body
  
  try{
    //const token = getTokenFrom(request)
    //const decodedToken = jwt.verify(request.token, process.env.SECRET)
/*     if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    } */
    //const user = await User.findById(decodedToken.id)
    const user = request.user;

    const {userId,...blogAtt} = body
    //const user = await User.findById(userId)

    const blog = new Blog({ ...blogAtt, user: user._id, author : blogAtt.author || user.name, likes : blogAtt.likes || 0, comments : blogAtt.comments || [] })

    const savedBlog = await blog.save()
    savedBlog.populate('user', { username: 1, name: 1 })

    //.then(t => t.populate('user', { username: 1, name: 1 }).execPopulate())
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    //In the app I need the populated version...
    //const returnedBlog = await findById(savedBlog._id).populate('user', { username: 1, name: 1 });
    response.status(201).json(savedBlog)
  }catch(e){
    next(e)
  }
  
})



blogsRouter.delete('/:id', userExtractor ,async (request, response,next) => {

  try{
    //const decodedToken = jwt.verify(request.token, process.env.SECRET)
    //const user = await User.findById(decodedToken.id) //logged user
    const user = request.user
    const blogToDelete = await Blog.findById(request.params.id)

    console.log("user",user)
    console.log("author",blogToDelete.user)
    if(blogToDelete && blogToDelete.user.toString() === user._id.toString()){
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end();
    }else{
      response.status(400).json({ error : "Trying to delete a post that you didn't make or that doesn't exist"}) 
    }
  }catch(error){
    next(error)
/*     if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else {
      return response.status(400).json({ error: error.message })
    } */

  }

})


blogsRouter.put('/:id', async (request, response) => {
  
  try{
    console.log("Chega AQUI!!!")
    const updatedPerson = await Blog.findByIdAndUpdate(
      request.params.id, 
      request.body, 
      { new: true, runValidators: true, context: 'query' }
    ).populate('user', { username: 1, name: 1 });
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