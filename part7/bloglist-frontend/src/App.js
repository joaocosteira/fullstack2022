import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { addBlog, initializeBlogs, likeBlog, removeBlog } from "./reducers/blogReducer";
import { setNotification } from "./reducers/notificationReducer";
import { initializeUser, logUser, logoutUser } from "./reducers/userReducer";
import loginService from "./services/login";
import blogService from './services/blogs'
import Navbar from "./components/Navbar";

const App = () => {

  const blogs = useSelector(s => s.blogs)
  const { user } = useSelector(s => s.user)

  const dispatch = useDispatch();

  const loginFormRef = useRef();
  const blogFormRef = useRef();

  useEffect(() => { dispatch(initializeBlogs()) }, []);
  useEffect(() => { dispatch(initializeUser()) }, []);

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
      dispatch(logUser(user))
      sendNotification(`Logged in as '${user.username}'`, "succ");
    } catch (exception) {
      sendNotification("Wrong credentials", "err");
    }
  };

  const logout = () => { dispatch(logoutUser()) };

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
      {
        !user ? (
          <Togglable buttonLabel="Login" ref={loginFormRef}>
            <LoginForm handleLogin={handleLogin} />
          </Togglable>
        ) :
          <Navbar  user={user} logout={logout} />
      }
      <Notification/>

      <h2 className="blog-header">blogs</h2>

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
