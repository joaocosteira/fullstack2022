import { useState } from 'react'

const Blog = ({ blog,user,vote,deleteBlog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showMore, setShowMore] = useState(false)

  //console.log('Blog', blog)
  //console.log('user', user)

  return (
    <div className='blog' style={blogStyle}>
      {
        !showMore ?
          <div>{blog.title} {blog.author} <button onClick={() => { setShowMore(!showMore) }}>view</button></div>
          :
          <div>
            <p><b>{blog.title}</b> by {blog.author} <button onClick={() => { setShowMore(!showMore) }}>hide</button></p>
            { blog.url && <p>Page: <a href={blog.url} target="blank">{blog.url}</a></p>}
            <p>Likes {blog.likes} {user && <button onClick={vote}>like</button>}</p>
            <p>Posted by {blog.user.username}</p>
            {
            //probably comparing the id is better, but I don't want to change nor expose the id in the frontend...
              user && user.username === blog.user.username && user.name === blog.user.name &&
            <button onClick={deleteBlog}>remove</button>
            }
          </div>
      }
    </div>
  )
}

export default Blog