import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notification,setNotification] = useState({ message : null , style : null })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const sendNotification = (message,style="err",delay=2000) =>{

    setNotification({ message, style })
    setTimeout(() => {
      setNotification({ message : null , style : null })
    }, delay)

  }

  const handleNewBlog = async (blogObject) =>{
    
    console.log("blogObject",blogObject);
    try{
      const newBlog = await blogService.create(blogObject);
      console.log("newBlog",newBlog);
      setBlogs([...blogs,newBlog]);
      sendNotification(`Added '${newBlog.title}' by '${newBlog.author}'`, 'succ');
    }catch(e){
      sendNotification(e.message.error,'err')
    }
  }
  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token);
      setUser(user)
      setUsername('')
      setPassword('')
      sendNotification(`Logged in as '${user.username}'`,'succ')
    } catch (exception) {
      sendNotification('Wrong credentials','err');
    }
  }


  const loginForm = () =>(
    <form onSubmit={handleLogin}>
    <div>
      username
        <input
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      password
        <input
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button type="submit">login</button>
  </form>
  )

  const logout = () =>{

    window.localStorage.removeItem('loggedBlogAppUser');
    blogService.setToken(null);
    setUser(null);
  }

  console.log("user",user);

  return (
    <div>
      <Notification notification={notification}/>
      { !user && loginForm() }
      <h2>blogs</h2>
      { user && <p>{user.username} logged in <button onClick={logout}>Logout</button></p>}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}

      { user && <BlogForm handleNewBlog={handleNewBlog}/> }
    </div>
  )
}

export default App
