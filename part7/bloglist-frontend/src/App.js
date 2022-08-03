import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({
    message: null,
    style: null,
  });

  const loginFormRef = useRef();
  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const sendNotification = (message, style = "err", delay = 2000) => {
    setNotification({ message, style });
    setTimeout(() => {
      setNotification({ message: null, style: null });
    }, delay);
  };

  const handleNewBlog = async (blogObject) => {
    console.log("blogObject", blogObject);
    try {
      const newBlog = await blogService.create(blogObject);
      console.log("newBlog", newBlog);
      setBlogs([...blogs, newBlog]);
      sendNotification(
        `Added '${newBlog.title}' by '${newBlog.author}'`,
        "succ"
      );
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
      const updatedBlog = await blogService.update(blog.id, {
        ...blog,
        likes: blog.likes + 1,
        user: blog.user.id,
      });
      setBlogs(blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b)));
    } catch (e) {
      console.log(e);
    }
  };

  const deleteBlog = async (blog) => {
    try {
      if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}`)) {
        await blogService.deleteBlog(blog.id);
        setBlogs(blogs.filter((b) => b.id !== blog.id));
      }
    } catch (e) {
      console.log(e);
    }
  };
  const blogsToShow = blogs.sort((a, b) => b.likes - a.likes);
  return (
    <div>
      <Notification notification={notification} />
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
