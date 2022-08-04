import { useState } from "react";
import { Button, Form } from "react-bootstrap";

const BlogForm = ({ handleNewBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    handleNewBlog({
      title,
      author,
      url,
    });

    setTitle("");
    setAuthor("");
    setUrl("");
  };
  return (
    <div className="blogFormDiv">
      <h2>create new</h2>
      <Form onSubmit={addBlog}>
        <Form.Group>

          <Form.Label>title</Form.Label>
          <Form.Control
            value={title}
            id="title"
            onChange={({ target }) => {
              setTitle(target.value);
            }}
          />


          <Form.Label>author</Form.Label>
          <Form.Control
            value={author}
            id="author"
            onChange={({ target }) => {
              setAuthor(target.value);
            }}
          />


          <Form.Label>url</Form.Label>
          <Form.Control
            value={url}
            id="url"
            onChange={({ target }) => {
              setUrl(target.value);
            }}
          />

        </Form.Group>
        <Button varient="Primary" id="createBlog" type="submit">
          create
        </Button>
      </Form>
    </div>
  );
};

export default BlogForm;
