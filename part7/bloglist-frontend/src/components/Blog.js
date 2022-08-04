import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { likeBlog,removeBlog } from "../reducers/blogReducer";

const Blog = ({ blog }) => {

  const { user } = useSelector(s => s.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        navigate('/');
      }
    } catch (e) {
      console.log(e);
    }
  };


  if(!blog){
    return null;
  }

  return (
    <div className="blog-card">

      <h2><b>{blog.title}</b> by {blog.author}{" "}</h2>
      {blog.url && (<p>Page:{" "} <a href={blog.url} target="blank">{blog.url}</a></p>)}

      <p>
            Likes <span className="likeCounter">{blog.likes}</span>{" "}
        {user && <button onClick={()  => { vote(blog) }}>like</button>}
      </p>

      <p>Posted by {blog.user.username}</p>
      {
        user && user.username === blog.user.username && user.name === blog.user.name && (
          <button className="remove-blog-btn" onClick={() => { deleteBlog(blog) }}>
            remove
          </button>
        )
      }
    </div>
  );
};

export default Blog;
