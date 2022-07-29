const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
//Case I want to insert some data before running the tests:
const Blog = require('../models/blog');
const User = require('../models/user');
const api = supertest(app)


const initialBlogs = [
  {
    title:"My Very First Post",
    author:"costeira",
    url:"https://www.google.com",
    likes:33
  },
  {
    title:"My Second Post",
    author:"costeira",
    url:"https://www.google.pt",
    likes:33
  },
  {
    title:"Very Important Post",
    author:"costeira",
    url:"https://www.google.pt",
    likes:33
  }
];


beforeEach(async () => {

  await Blog.deleteMany({})

  const blogObject = initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObject.map(blog => blog.save())
  await Promise.all(promiseArray)

})

describe('when there is initially some notes saved', () => {

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  });
  //, 100000); //Optional log timeout, the idea is to prevent finishing the test before getting the result. Might be usefull in heavy scenarios
  
  test('there are three blogs', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(3)
  });


  test('All Blogs are returned', async () => {
  
      const response = await api.get('/api/blogs')
    
      expect(response.body).toHaveLength(initialBlogs.length)
  })
  
  test('a specific Blog is within the returned Blogs', async () => {
      const response = await api.get('/api/blogs')
    
      const titles = response.body.map(r => r.title)
      expect(titles).toContain(
        'Very Important Post'
      )
    })

    test('All Blogs have an ID', async () => {
    
        const response = await api.get('/api/blogs')
    
        response.body.forEach(
          b  => expect(b.id).toBeDefined()
        )
    })
      
    
    test('there are three blogs', async () => {
        const response = await api.get('/api/blogs')
      
        expect(response.body).toHaveLength(3)
      })
      
    test('the first Blog is concerns the very first blog of an user', async () => {
        const response = await api.get('/api/blogs')
      
        expect(response.body[0].title).toBe("My Very First Post")
    })


    test('New Blog with no likes, authomatically is set with 0 likes', async () => {

      const user = {username : "costeira", password : "password"}
      const tokenResponse = await api.post(`/api/login`).send(user)

      const newBlog = {
          "title" : "Test Important Post",
          "url" : "https://www.google.pt/"
      }
    
      const response = await api.post('/api/blogs').set('Authorization', `bearer ${tokenResponse.body.token}`).send(newBlog);
      //console.log("Response",response.body);

      expect(response.body.likes).toBe(0);
    
    })    
})

describe('Add Blogs:', () => {

  test('a valid blog can be added', async () => {
    
    const user = {username : "costeira", password : "password"}
    const tokenResponse = await api.post(`/api/login`).send(user)
    const newBlog = {
        "title" : "Test Important Post",
        "url" : "https://www.google.pt/",
        "likes" : 69
    }
  
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${tokenResponse.body.token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
  
    const title = response.body.map(r => r.title)
    const author = response.body.map(r => r.author)
    const url = response.body.map(r => r.url)
    const likes = response.body.map(r => r.likes)
  
    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(title).toContain(newBlog.title)
    expect(author).toContain(user.username)
    expect(url).toContain(newBlog.url)
    expect(likes).toContain(newBlog.likes)
  
  })

  test('a blog without a valid token is not added', async () => {
    
    const user = {username : "costeira", password : "password"}
    const tokenResponse = await api.post(`/api/login`).send(user)
    const newBlog = {
        "title" : "Test Important Post",
        "url" : "https://www.google.pt/",
        "likes" : 69
    }
    
    const token = tokenResponse.body.token
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token.slice(0,token.length-1)}`)
      .send(newBlog)
      .expect(401)

  })


  test('a blog without Authorization is not added', async () => {
    
    const newBlog = {
        "title" : "Test Important Post",
        "url" : "https://www.google.pt/",
        "likes" : 69
    }
    
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

  })
  
  
  test('blog without content is not added', async () => {
  
    const newBlog = {}
    const tokenResponse = await api.post(`/api/login`).send({username : "costeira", password : "password"})
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${tokenResponse.body.token}`)
      .send(newBlog)
      .expect(400)
  
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(initialBlogs.length)
  })
  
  
  
  
  test('blog without title and url is not added', async () => {
    
    const tokenResponse = await api.post(`/api/login`).send({username : "costeira", password : "password"})
    const newBlog = {author : "nobody"}
  
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${tokenResponse.body.token}`)
      .send(newBlog)
      .expect(400)
  
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(initialBlogs.length)
  })
})


describe('deletion of a blog', () => {

  test('succeeds with status code 204 if id is valid', async () => {

    //const validUser = await User.find({ name : 'costeira'});
    //login a user

    const tokenResponse = await api.post(`/api/login`).send({username : "costeira", password : "password"})
    const token = tokenResponse.body.token;

    const newPost = {
      "title" : "doesn't matter",
      "url" : "https://www.doentmatter.com/",
      "likes" : 1
    }

    
    const responsePost = await api.post('/api/blogs').set('Authorization', `bearer ${token}`).send(newPost)

  
    const blogsAtStart = await Blog.find({});

    //const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${responsePost.body.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await Blog.find({});

    expect(blogsAtEnd).toHaveLength(
      blogsAtStart.length - 1
    )

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(newPost.title)
  })
})

describe('Update a Blog', () => {

  test('Updating a Blog ', async () => {

    const blogsAtStart = await Blog.find({});

    const {title, author, likes, url, _id } = blogsAtStart[0]
    const updatedBlog = { title,author,url, likes : likes + 1 } 

    const response = await api.put(`/api/blogs/${_id}`).send(updatedBlog)

    //The same amount of posts.
    const blogsAtEnd = await Blog.find({});
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)

    expect(response.body.likes).toBe(updatedBlog.likes)
  })
})
 
afterAll(async () => {

    mongoose.connection.close()

})