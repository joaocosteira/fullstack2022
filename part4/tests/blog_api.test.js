const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
//Case I want to insert some data before running the tests:
const Blog = require('../models/blog');
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


test('a valid blog can be added', async () => {


  const newBlog = {
      "title" : "Test Important Post",
      "author" : "costeira",
      "url" : "https://www.google.pt/",
      "likes" : 69
  }

  await api
    .post('/api/blogs')
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
  expect(author).toContain(newBlog.author)
  expect(url).toContain(newBlog.url)
  expect(likes).toContain(newBlog.likes)

})


test('blog without content is not added', async () => {

  const newBlog = {}

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})


test('New Blog with no likes, authomatically is set with 0 likes', async () => {


  const newBlog = {
      "title" : "Test Important Post",
      "author" : "costeira",
      "url" : "https://www.google.pt/"
  }

  const response = await api.post('/api/blogs').send(newBlog);

  expect(response.body.likes).toBe(0);

})


test('blog without title and url is not added', async () => {

  const newBlog = {author : "nobody"}

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})

 
afterAll(async () => {

    mongoose.connection.close()

})