const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.get('/', async (request, response) => {

    
    const users = await User.find({}).populate('blogs',{ title: 1, author: 1 });
    return response.status(201).json(users);

})
  

usersRouter.post('/', async (request, response) => {

  const { username, name, password } = request.body


  if(!username || !password || username.length < 3 || password.length < 3){
    return response.status(400).json({
      error: 'A username and password must be provided and both of them have to have at least 3 characters'
    })
  }
  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  }  

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/passwordhash', async (request, response) => {


    console.log("Route Correta!!!")
    const { password } = request.body
  
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const whatever = {
        password,
        saltRounds,
        passwordHash
    }
    response.status(201).json(whatever)
  })
  
module.exports = usersRouter