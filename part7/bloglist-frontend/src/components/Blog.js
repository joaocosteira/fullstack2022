import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { likeBlog,removeBlog,addCommentToBlog } from "../reducers/blogReducer";

const Blog = ({ blog }) => {

  const { user } = useSelector(s => s.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [comment,setComment] = useState('');

  const vote = async (blog) => {

    try {
      dispatch(likeBlog(blog));
    } catch (e) {
      console.log(e);
    }
  };

  const addComment = async (e) => {
    e.preventDefault();
    try {
      dispatch(addCommentToBlog(blog,comment));
      setComment('')
    } catch (e) {
      console.log(e);
    }
  }

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

  console.log(blog)
  return (
    <div className="blog-card">

      <h2><b>{blog.title}</b> by {blog.author}{" "}</h2>
      {blog.url && (<p>Page:{" "} <a href={blog.url} target="blank">{blog.url}</a></p>)}

      <p>
            Likes <span className="likeCounter">{blog.likes}</span>{" "}
        {user && <button onClick={()  => { vote(blog) }}>like</button>}
      </p>
      <p>Posted by {blog.user.username}</p>

      <h3>Comments</h3>
      {
        user &&
        <Form onSubmit={addComment}>
          <Form.Group>
            <Form.Control value={comment} onChange={ ({ target }) => { setComment(target.value) }} ></Form.Control>
            <Button type="submit">add comment</Button>
          </Form.Group>
        </Form>
      }
      {
        blog.comments.length === 0 ?
          <p>No comments available</p>
          :
          <ul>
            {blog.comments.map(c => <li key={c}>{c}</li>)}
          </ul>
      }

      {
        user && user.username === blog.user.username && user.name === blog.user.name && (
          <Button className="remove-blog-btn btn-danger" onClick={() => { deleteBlog(blog) }}>
            Remove Blog
          </Button>
        )
      }
    </div>
  );
};

export default Blog;
