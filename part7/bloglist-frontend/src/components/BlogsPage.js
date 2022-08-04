import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import { addBlog } from "../reducers/blogReducer";
import { Link } from "react-router-dom";




const BlogsPage = ({ sendNotification }) => {

  const { user } = useSelector(s => s.user)
  const blogs = useSelector(s => s.blogs)
  const dispatch = useDispatch();
  const blogFormRef = useRef();

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


  const sortedBlogs = blogs.slice().sort((a, b) => b.likes - a.likes);

  return(
    <>
      <h2 className="blog-header">blogs</h2>
      {sortedBlogs.map((blog) => (
        <div className="card mt-2" key={blog.id}>
          <Link className="card-body" to={`/blogs/${blog.id}`}><b>{blog.title}</b> by {blog.author}</Link>
        </div>
      ))}
      {user && (
        <Togglable buttonLabel="Add a new blog" ref={blogFormRef}>
          <BlogForm handleNewBlog={handleNewBlog} />
        </Togglable>
      )}
    </>
  )
}

export default BlogsPage