import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { addBlog, initializeBlogs, likeBlog, removeBlog } from "./reducers/blogReducer";
import { setNotification } from "./reducers/notificationReducer";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {

  const blogs = useSelector(s => s.blogs)
  const [user, setUser] = useState(null);


  const dispatch = useDispatch();


  const loginFormRef = useRef();
  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs())
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const sendNotification = (message, style = "err", delay = 2) => {
    dispatch(setNotification(message,style,delay))
  };

  const handleNewBlog = async (blogObject) => {

    try {
      dispatch(addBlog(blogObject))
      sendNotification(`Added '${blogObject.title}' by '${blogObject.author}'`,"succ");
      blogFormRef.current.toggleVisibility();
    } catch (e) {
      console.log(e);
      sendNotification(e.message, "err");
    }
  };
  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials);

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      sendNotification(`Logged in as '${user.username}'`, "succ");
    } catch (exception) {
      sendNotification("Wrong credentials", "err");
    }
  };

  const logout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    blogService.setToken(null);
    setUser(null);
  };

  console.log("user", user);

  const vote = async (blog) => {

    try {
      dispatch(likeBlog(blog));
    } catch (e) {
      console.log(e);
    }
  };

  const deleteBlog = async (blog) => {
    try {
      if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}`)) {
        dispatch(removeBlog(blog.id))
      }
    } catch (e) {
      console.log(e);
    }
  };

  const blogsToShow = blogs.slice().sort((a, b) => b.likes - a.likes);
  return (
    <div>
      <Notification/>
      {!user && (
        <Togglable buttonLabel="Login" ref={loginFormRef}>
          <LoginForm handleLogin={handleLogin} />
        </Togglable>
      )}
      <h2 className="blog-header">blogs</h2>
      {user && (
        <p>
          {user.username} logged in <button onClick={logout}>Logout</button>
        </p>
      )}
      {blogsToShow.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          vote={() => {
            vote(blog);
          }}
          deleteBlog={() => {
            deleteBlog(blog);
          }}
        />
      ))}
      {user && (
        <Togglable buttonLabel="Add a new blog" ref={blogFormRef}>
          <BlogForm handleNewBlog={handleNewBlog} />
        </Togglable>
      )}
    </div>
  );
};

export default App;
