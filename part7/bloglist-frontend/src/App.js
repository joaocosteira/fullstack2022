import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import Notification from "./components/Notification";
import { initializeBlogs } from "./reducers/blogReducer";
import { setNotification } from "./reducers/notificationReducer";
import { initializeUser } from "./reducers/userReducer";
import LoginAndNavbar from "./components/LoginAndNavbar";
import { Routes, Route,useMatch } from "react-router-dom";
import BlogsPage from "./components/BlogsPage";
import Users from "./components/Users";
import User from "./components/User";
import Blog from "./components/Blog";
import _ from 'lodash'

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => { dispatch(initializeBlogs()) }, []);
  useEffect(() => { dispatch(initializeUser()) }, []);

  /*
   Lazy solution:
    Instead of creating a user services, add them to the store etc
    I simply flipped the blogs by grouping them according to users.
    This is a simple solution and since we need the blogs anyways to route each
    blog page its fine, but has a small problem: You wont be able
    to list users with 0 posts, which I think its fine...
   */
  const blogs = useSelector( s => s.blogs);
  const users =  _.chain(blogs)
    .groupBy( blog => blog.user.username)
    .transform((r,v,k) => { r[k] = { blogs  : v , user : v[0].user } }).value();

  const sendNotification = (message, style = "err", delay = 2) => {
    dispatch(setNotification(message,style,delay))
  };


  const match = useMatch('/users/:id')
  const user = match ? Object.values(users).find( ({ user }) => user.id === match.params.id) : null

  const matchBlog = useMatch('/blogs/:id')
  const blog = matchBlog ? blogs.find(b => b.id === matchBlog.params.id) : null

  return (
    <div>
      <LoginAndNavbar sendNotification={sendNotification} />
      <Notification/>
      <Routes>
        <Route path="/" element={<BlogsPage sendNotification={sendNotification}/>}/>
        <Route path="/users" element={<Users users={users} />}/>
        <Route path="/users/:id" element={<User user={user} />}/>
        <Route path="/blogs/:id" element={<Blog blog={blog}/>}/>
      </Routes>
    </div>
  );
};

export default App;