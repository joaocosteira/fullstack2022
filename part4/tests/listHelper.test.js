const listHelper = require('../utils/list_helper')
const blogs = require('../data/blogs')

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const empt_blogs = []


test('dummy returns one', () => {

  const result = listHelper.dummy(empt_blogs)
  expect(result).toBe(1)
})


describe('total likes', () => {

  
    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })

    test('empty list has 0 likes', () => {
        const result = listHelper.totalLikes(empt_blogs)
        expect(result).toBe(0)
      })

    test('this big list should have ', () => {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(36)
    })
})


describe('Favourite blogs', () => {

  test('Empty List results in an empty blog post',()=>{
    const result = listHelper.favoriteBlog(empt_blogs)
    expect(result).toEqual({})
  })

  test('List with one Blog should return the only blog available',()=>{
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(listWithOneBlog[0])
  })

  test('List with alot of Blogs available',()=>{
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(blogs[2])
  })

})

describe('mostBlogs tests', () => {

  test('Empty List results in an empty blog post',()=>{
    const result = listHelper.mostBlogs(empt_blogs)
    expect(result).toEqual({})
  })


  test('List with alot of Blogs available',()=>{
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({
      author: "Robert C. Martin",
      blogs: 3
    })
  })

})


describe('mostLikes tests', () => {

  test('Empty List results in an empty blog post',()=>{
    const result = listHelper.mostLikes(empt_blogs)
    expect(result).toEqual({})
  })


  test('List with alot of Blogs available',()=>{
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17
    })
  })

})